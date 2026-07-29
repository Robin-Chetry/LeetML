const { createClient }  = require('redis');

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'redis-10764.crce292.ap-south-1-2.ec2.cloud.redislabs.com',
        port: 10764
    }
});

module.exports = redisClient;








// import { createClient } from 'redis';

// const client = createClient({
//     username: 'default',
//     password: 'nV7LG35iaVI8VHMUWgeGm4KfKzNKxRqZ',
//     socket: {
//         host: 'redis-10764.crce292.ap-south-1-2.ec2.cloud.redislabs.com',
//         port: 10764
//     }
// });

// client.on('error', err => console.log('Redis Client Error', err));

// await client.connect();

// await client.set('foo', 'bar');
// const result = await client.get('foo');
// console.log(result)  // >>> bar

