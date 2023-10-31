const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv/config');
const api = process.env.API_URL;


const productosRouter = require('./routers/productos')


// Middleware
app.use(bodyParser.json());  
app.use(morgan('tiny'));


//Routers
app.use(`${api}/productos`, productosRouter)

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