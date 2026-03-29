import { Pool } from 'pg';

export class Database {
    private pool: Pool;

    constructor() {
        this.pool = new Pool({
            connectionString: process.env.DATABASE_URL,
        });
        this.initializeAsync();
    }

    private async initializeAsync() {
        try {
            await this.createTables();
        } catch (error) {
            console.error('Error initializing database:', error);
        }
    }

    private async createTables() {
        try {
            // Table is already created by init.sql during database initialization
            // Just verify the connection works
            await this.pool.query('SELECT 1');
        } catch (error) {
            console.error('Error verifying tables:', error);
            throw error;
        }
    }

    public async insertUser(user: { name: string; email: string; name_character_count: number }) {
        const insertQuery = `
            INSERT INTO users (name, email, name_character_count)
            VALUES ($1, $2, $3)
            ON CONFLICT (email) DO NOTHING;
        `;
        await this.pool.query(insertQuery, [user.name, user.email, user.name_character_count]);
    }
}