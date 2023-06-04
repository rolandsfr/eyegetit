// here we import the mariadb
const mariadb = require('mariadb');

// here we create a new connection pool
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    bigIntAsNumber: true,
    decimalAsNumber: true,
});

// here we are exposing the ability to creating new connections
module.exports={
    getConnection: function(){
        return new Promise(function(resolve,reject){
            pool.getConnection().then(function(connection){
                resolve(connection);
            }).catch(function(error){
                reject(error);
            });
        });
    }
}