const mariadb = require('mariadb');
const fs = require('fs');
require('dotenv').config()

const DOMAIN = process.env.IMAGE_BASE_URL
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const getConnection = function(){
    return new Promise(function(resolve,reject){
        pool.getConnection().then(function(connection){
            resolve(connection);
        }).catch(function(error){
            reject(error);
        });
    });
}

const content = fs.readFileSync('./words.json', 'utf8')
const collection = JSON.parse(content)
Object.keys(collection).forEach((key) => {
    const word = key
    const category = collection[key][0]
    const imgName = key.charAt(0).toUpperCase() + key.slice(1)

    const url = `${DOMAIN}/${imgName}/${imgName}.jpg`
    console.log(key, ":", category, ' -> ', url)
    getConnection().then((conn) => {
        conn.query('insert into images (word, category, url) values (?, ?, ?)', [word, category, url]).then((res) => {
            console.log('OK', res)
        }).catch((err) => {
            console.error(err)
        })
    })
})