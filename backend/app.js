const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv/config');

app.use(cors());
app.options('*', cors());

// Middleware
app.use(bodyParser.json());  
app.use(morgan('tiny'));


// Rutas
const categoriasRutas = require('./routers/categorias');
const productosRutas = require('./routers/productos');
const ordenesRutas = require('./routers/ordenes');

const api = process.env.API_URL;

app.use(`${api}/categorias`, categoriasRutas);
app.use(`${api}/productos`, productosRutas);
app.use(`${api}/ordenes`, ordenesRutas);

// Database
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