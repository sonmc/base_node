import { createConnection } from 'typeorm';
import permSeed from './perm.seed.mjs';
import userSeed from './user.seed.mjs';

async function runSeedFiles() {
    try {
        const connection = await createConnection({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '123456',
            database: 'z8l_tool',
            synchronize: false,
            logging: true,
        });
        await permSeed(connection);
        await userSeed(connection);
    } catch (error) {
        console.error('Error running create connection', error);
    }
}

runSeedFiles()
    .then(() => {
        console.log('Seed files executed successfully');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Error running seed files:', error);
        process.exit(1);
    });
