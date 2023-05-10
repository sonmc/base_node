export async function permSeed(connection) {
    try {
        const id = 2;
        const username = 'sonmc';
        const email = 'sonmc@gmail.com';
        const dateDefault = '2020-02-02 00:00:00';
        const passwordHashed = '$2b$12$3.7JhJKdBP8Lnoore/aMuOjBt8oiIPwyc1X5JLL6AB9oP2Mh1ato2';
        const query = `INSERT INTO permissions VALUES (${id},"${dateDefault}","${dateDefault}", "${username}", null,null,null,"${email}", "0335822399","${passwordHashed}", 1,1,null,"${dateDefault}","hn",null,"${dateDefault}", null,null,1,null)`;
        await connection.query(query);
        console.log('Permission Seed data inserted successfully');

        // Get all router
        // Convert to object
        // Insert
    } catch (error) {
        console.error('Error seeding the database:', error);
    } finally {
        await connection.close();
    }
}
export default permSeed;
