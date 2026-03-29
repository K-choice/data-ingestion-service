
import { ExternalApiClient } from '../api/externalApiClient';
import { Database } from '../db';

const apiBaseUrl = process.env.API_BASE_URL || 'https://jsonplaceholder.typicode.com';

export async function ingestData() {
    const externalApiClient = new ExternalApiClient(apiBaseUrl);
    const database = new Database();

    try {
        // Fetch users from the external API
        const users = await externalApiClient.fetchUsers();

        // Filter users if necessary (e.g., remove duplicates or invalid entries)
        const filteredUsers = users.filter((user: any) => user.name && user.email);

        // Insert filtered users into the database using insertUser
        for (const user of filteredUsers) {
            await database.insertUser({
                name: user.name,
                email: user.email,
                name_character_count: user.name.length
            });
        }
    } catch (error) {
        console.error("Error during data ingestion:", error);
    }
}