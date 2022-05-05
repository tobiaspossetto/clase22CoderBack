// este archivo lo ejecuto solo una vez para crear las tablas desde knex

const {mariadb} = require('./config/mariadb')
const {sqlite} = require('./config/sqlite')

const knex1 = require('knex')(mariadb)
const knex2 = require('knex')(sqlite)

/* knex1.schema.createTable('products', (table) => {
    table.increments('id')
    table.string('title')
    table.string('thumbnail')
    table.string('price')
})
.then(() => console.log('tabla creada'))
.catch((error) => console.error(error))
.finally(() => knex1.destroy())
 */
knex2.schema.createTable('messages', (table) => {
    table.increments('id')
    table.string('email')
    table.string('message')
    table.string('created_at')
})
.then(() => console.log('tabla creada'))
.catch((error) => console.error(error))
.finally(() => knex2.destroy())
