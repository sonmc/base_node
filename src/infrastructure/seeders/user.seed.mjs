export async function userSeed(connection) {
    try {
        const id = 2;
        const username = 'sonmc';
        const email = 'sonmc@gmail.com';
        const dateDefault = '2020-02-02 00:00:00';
        const passwordHashed = '$2b$12$3.7JhJKdBP8Lnoore/aMuOjBt8oiIPwyc1X5JLL6AB9oP2Mh1ato2';
        const query = `INSERT INTO users VALUES (${id},"${dateDefault}","${dateDefault}", "${username}", null,null,null,"${email}", "0335822399","${passwordHashed}", 1,1,null,"${dateDefault}","hn",null,"${dateDefault}", null,null,1,null)`;
        await connection.query(query);
        console.log('User Seed data inserted successfully');
    } catch (error) {
        console.error('Error seeding user the database:', error);
    } finally {
        await connection.close();
    }
}
export default userSeed;
