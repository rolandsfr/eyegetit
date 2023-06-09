const db = require('./db')

function getAll() {
    const query = 'select * from images'
    return db.getConnection().then((conn) => {
        return conn.query(query).finally(() => {conn.release()})
    }).catch((err) => {
        console.error(err)
    })
}

function getAllForCategory(category) {
    const query = 'select * from images where category = ?'
    return db.getConnection().then((conn) => {
        return conn.query(query, [category]).finally(() => {conn.release()})
    }).catch((err) => {
        console.error(err)
    })
}

function getCategories() {
    const query = 'SELECT category, count(*) as count FROM images GROUP BY category;'
    return db.getConnection().then((conn) => {
        return conn.query(query).finally(() => {conn.release()})
    }).catch((err) => {
        console.error(err)
    })
}

function getCategoriesCount() {
    const query = 'SELECT COUNT (*) as total FROM  (SELECT * FROM images GROUP BY category) t;'
    return db.getConnection().then((conn) => {
        return conn.query(query).finally(() => {conn.release()})
    }).catch((err) => {
        console.error(err)
    })
}

module.exports = {
    getAll,
    getCategories,
    getCategoriesCount,
    getAllForCategory
}