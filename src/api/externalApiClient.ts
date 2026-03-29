import fetch from 'node-fetch';

export class ExternalApiClient {
    private apiUrl: string;

    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    public async fetchUsers(): Promise<any[]> {
        try {
            const response = await fetch(`${this.apiUrl}/users`);
            if (!response.ok) {
                throw new Error(`Error fetching users: ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Failed to fetch users:', error);
            throw error;
        }
    }
}