const ContenedorMsg = require('./ContenedorMsg')
const mongoose = require('mongoose');
const {msg} = require('./models/msg');
const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
class MsgMongo {
    constructor(ruta){
        this.ruta = ruta;
        this.model = msg;
        this.getConnectionMongo()
    }

    async getConnectionMongo() {
        try {
          mongoose.connect(this.ruta, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
          console.log("MongoDB Connected");
          console.log(this.ruta);
    
          return mongoose;
        } catch (error) {
          console.log(error);
          return -1;
        }
      }



    
  async getMessages() {
    try {
      let data = await this.model.find();

      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async saveMessage(msg) {
    const date = new Date();
    const message = {
      author: {
        ...msg.author,
      },

      message: msg.message,
      created_at: date.toLocaleDateString("es-ES", dateOptions),
    };
    console.log("MENSAJE A GUARDAR ", message);
    try {
      const msgSaved = new this.model(message);
      let res = await msgSaved.save(message);
      return res;
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = MsgMongo;