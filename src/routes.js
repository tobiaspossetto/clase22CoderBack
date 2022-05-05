const express = require('express');
const router = express.Router();

const faker = require('faker');



router.get('/', (req, res) => {
    res.render('products.pug');
})

router.get('/api/productos-test'), (req, res) => {
    //generate 5 ramdom products with faker
try {
    const data = [];
    for (let i = 0; i < 5; i++) {
        data.push({
            id: faker.random.uuid(),
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
    
            image: faker.image.image()
        });
    }
    console.log(data);
    res.render('test.pug',data);
} catch (error) {
    console.log(error);
}
  
}





module.exports = router;