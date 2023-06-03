const db = require('./db')

function getAll()
{
    const query = 'select * from images'
    return db.getConnection().then((conn) => {
        const res = conn.query(query)
        console.log(res)
        return res
    }).catch((err) => {
        console.error(err)
    })
}

module.exports = {
    getAll,
}