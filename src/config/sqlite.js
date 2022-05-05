const sqlite = {
    client: 'sqlite3',
    connection: {
        filename: './src/ecommerce/db.sqlite'
    },
    useNullAsDefault: true,
}

module.exports = {sqlite}