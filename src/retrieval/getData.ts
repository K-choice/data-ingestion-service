export async function getData(db) {
    try {
        const users = await db.query('SELECT * FROM users');
        return users.rows;
    } catch (error) {
        console.error('Error retrieving data from the database:', error);
        throw new Error('Data retrieval failed');
    }
}