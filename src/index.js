const express = require('express');
const morgan = require('morgan');
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const {mariadb} = require('./config/mariadb')


const MsgFs = require('./controllers/MsgFs');
const MsgFirebase = require('./controllers/MsgFirebase');
const MsgMongo = require('./controllers/MsgMongo');

//BASE DE DATOS A USAR
//FS - FIREBASE - MONGO
let db = 'FS'

if(db == 'FS'){
    var msgController = new MsgFs()}
else if(db == 'FIREBASE'){
    var msgController = new MsgFirebase()}
else if(db == 'MONGO'){
    var msgController = new MsgMongo('mongodb://localhost:27017/ecommerce')}





const ControllerProducts = require('./controllers/products')

const prodController = new ControllerProducts(require('knex')(mariadb), 'products')

//settings 
app.set('port', process.env.PORT || 4000);
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', './src/views')
app.set('view engine', 'pug');
// Routes
app.use('/', require('./routes'))

//start
httpServer.listen(4000, function () {
    console.log("Servidor corriendo en http://localhost:4000");
  });




const callMsg = async () => {
    try {
        const mesagges = await msgController.getMessages()
        console.log(mesagges)
        return mesagges
    } catch (error) {
        console.error(error)
    }
   
}
callMsg()

//websockets 
io.on('connection', async (socket) => {
    console.log('new connection')
    
    socket.emit('PRODUCTS', await prodController.getProducts())
    socket.on('NEW_PRODUCT', async (data) =>{
       // console.log('llego nuevo prod')
       await prodController.saveProduct(data)
        io.sockets.emit('PRODUCTS',  await prodController.getProducts())
    })

    
    //chat

    socket.emit('MESSAGES', await callMsg())

    socket.on('NEW_MESSAGE', async (data) =>{
        //console.log(data)
        //console.log('llego nuevo mensaje')
       await msgController.saveMessage(data)
      // const msg = await Controller.getMessages()

        io.sockets.emit('MESSAGES',await  callMsg())
    })
    
})

