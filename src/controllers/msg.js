const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
class ControllerMsg {
    constructor(config, table){
        this.knex = config
        this.table = table
    }
    async saveMessage(msg){
        const date = new Date();
        const message = {
            'email':msg.email, 
            "message": msg.message,
            "created_at": date.toLocaleDateString("es-ES", dateOptions)
        }
        console.log('MENSAJE A GUARDAR ',message)
        try {
            let res = await this.knex(this.table).insert(message)
       
        } catch (error) {
            console.error(error)
        }finally {
           // this.knex.destroy()
        }
    }
  
    async getMessages(){
        try {
            let data = await this.knex(this.table).select('*')
          
          console.table(data)
            return data
        } catch (error) {
            console.error(error)
            
        } finally {
           // this.knex.destroy()
        }
       
    } 
}


//SI USO DESTROY COMO DECIA EL PROFE ME DA ESTE ERROR Error: Unable to acquire a connection
module.exports = ControllerMsg;