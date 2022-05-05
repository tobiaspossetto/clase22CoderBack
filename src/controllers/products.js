
class ControllerProducts {
    constructor(config, table){
        this.knex = config
        this.table = table
    }
    async saveProduct(prod){
        const product = {
            'title':prod.title, 
            "price": prod.price,
            "thumbnail": prod.thumbnail
        }
        
        try {
            let res = await this.knex(this.table).insert(product)
       
        } catch (error) {
            console.error(error)
        }finally {
           // this.knex.destroy()
        }
    }
  
    async getProducts(){
        try {
            let data = await this.knex(this.table).select('*')
          
          console.log(data)
            return data
        } catch (error) {
            console.error(error)
            
        } finally {
           // this.knex.destroy()
        }
       
    } 
}


//SI USO DESTROY COMO DECIA EL PROFE ME DA ESTE ERROR Error: Unable to acquire a connection
module.exports = ControllerProducts;