export async function roleSeed(connection) {
    try {
        const id = 1;
        const query = `INSERT INTO roles VALUES (${id}`;
        await connection.query(query);
        console.log('Permission Seed data inserted successfully');
    } catch (error) {
        console.error('Error seeding the database:', error);
    } finally {
        await connection.close();
    }
}
export default roleSeed;
