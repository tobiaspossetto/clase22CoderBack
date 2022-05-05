const ContenedorMsg = require("./ContenedorMsg");
const admin = require("firebase-admin");

var serviceAccount = require("../key/node-test-329a9-firebase-adminsdk-i5m50-6d1908233a.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://node-test-329a9.firebaseio.com",
});


const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };


class MsgFirebase{
    constructor(){
        this.FirebaseDb = admin.firestore();
        this.FirebaseQuery = this.FirebaseDb.collection("msg");
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
      let res = await this.FirebaseDb.collection("msg").add(message);

      return res;
    } catch (error) {
      console.error(error);
    }
  }

  async getMessages() {
    try {
      let result = [];
      let data = await this.FirebaseQuery.get();
      data.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() });
      });
      return result;
    } catch (error) {
      console.error(error);
    }
  }


}

module.exports = MsgFirebase;