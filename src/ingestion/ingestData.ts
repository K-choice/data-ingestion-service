
import { ExternalApiClient } from '../api/externalApiClient';
import { Database } from '../db';
import { retryHandler } from '../reliability/retryHandler';

const apiBaseUrl = process.env.API_BASE_URL || 'https://jsonplaceholder.typicode.com';
const retryCount = parseInt(process.env.RETRY_COUNT || '3', 10);
const retryDelay = parseInt(process.env.RETRY_DELAY || '1000', 10);

export async function ingestData() {
    const externalApiClient = new ExternalApiClient(apiBaseUrl);
    const database = new Database();

    try {
        // Fetch users from the external API with retry
        const users = await retryHandler(
            () => externalApiClient.fetchUsers(),
            retryCount,
            retryDelay
        );

        // Filter users - keep only those with valid name and email
        const filteredUsers = users.filter((user: any) => user.name && user.email);

        // Insert filtered users into the database using insertUser
        for (const user of filteredUsers) {
            await retryHandler(
                () => database.insertUser({
                    name: user.name,
                    email: user.email,
                    name_character_count: user.name.length
                }),
                retryCount,
                retryDelay
            );
        }
    } catch (error) {
        console.error("Error during data ingestion:", error);
    }
}