import { Database } from './db';
import { ingestData } from './ingestion/ingestData';

async function main() {
    const db = new Database();

    try {
        // Database is initialized in the constructor
        console.log('Database initialized successfully.');

        await ingestData();
        console.log('Data ingestion completed successfully.');
    } catch (error) {
        console.error('Error during application startup:', error);
    }
}

main();