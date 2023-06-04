const mariadb = require('mariadb');
const fs = require('fs');
require('dotenv').config()
const async = require('async')

const DOMAIN = process.env.IMAGE_BASE_URL
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});



const args = process.argv
if (args.length < 3) {
    console.log('Please provide a file name')
    process.exit(9)
}

const fileName = args[2]
console.log('Importing file: ' + fileName)

const getConnection = function(){
    return new Promise(function(resolve,reject){
        pool.getConnection().then(function(connection){
            resolve(connection);
        }).catch(function(error){
            reject(error);
        });
    });
}

const content = fs.readFileSync(`./${fileName}`, 'utf8')
const collection = JSON.parse(content)

const insertQueue = []

Object.keys(collection).forEach((key) => {
    const word = key
    const category = collection[key][0]
    const imgName = key.charAt(0).toUpperCase() + key.slice(1)
    const url = `${DOMAIN}/${imgName}/${imgName}.jpg`

    insertQueue.push({word: word, category: category, url: url});
})

async.eachSeries(insertQueue, function(item, callback) {
    getConnection().then(function(connection){
        connection.query(`INSERT INTO images (word, category, url) VALUES ('${item.word}', '${item.category}', '${item.url}')`).then(function(result){
            console.log(result);
            connection.release();
            callback();
        }).catch(function(error){
            console.log(error);
            connection.release();
            callback();
        });
    }).catch(function(error){
        console.log(error);
        callback();
    });
}).then(() => process.exit(0));