const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
// Middleware
app.use(bodyParser.json());  
app.use(morgan('tiny'));

require('dotenv/config');

const api = process.env.API_URL;

app.get(`${api}/productos`, (req, res) => {
    const producto = {
        id: 1,
        name: 'Camisuli',
        image: 'some_url',
    }
    
    res.send(producto);
});

app.post(`${api}/productos`, (req, res) => {
    const newProducto = req.body;
    console.log(newProducto);
    res.send(newProducto)
});

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'ecommerce'

})
.then(()=>{
    console.log('Conectado a la base de datos')
})
.catch((err)=>{
    console.log(err);
})


app.listen(3000, () => {
    console.log('El server esta corriendo en el puerto 3000');
})