const ContenedorMsg = require('./ContenedorMsg');
const fs = require('fs');
const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
class MsgFs {
    constructor(){}




  async getMessages() {
    try {
      try {
        let data = await fs.promises.readFile("src/dbFs/msg.txt");
        data = await JSON.parse(data);

        return  data ;
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.log(error);
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


      //Si pudo leer el archivo, es porque existe, sino pasa al catch
      try {
        await fs.promises.readFile("src/dbFs/msg.txt");
        console.log(" existe el archivo");
        let data = await fs.promises.readFile("src/dbFs/msg.txt");
        data = await JSON.parse(data);
    

        data.push(message);
        // this.deleteAll()
        await fs.promises.writeFile(
          "src/dbFs/msg.txt",
          JSON.stringify(data)
        );
      } catch (error) {
        console.log("No existe el archivo");
        message.id = 1;

        //@ts-ignore
        message.timestamp = new Date().toISOString();
        const messages = [];
        messages.push(message);
        await fs.promises.writeFile(
          "src/dbFs/msg.txt",
          JSON.stringify(messages)
        );
      }

      return { status: 1 };
    } catch (error) {
      console.log(error);
      
      return { status: -1 };
    }
}

module.exports = MsgFs;