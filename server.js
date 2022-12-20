require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const glob = require('glob');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan')
const swaggerDoc = require('./common/swagger')
const config = require('./common/config');

const app = express();
const expressSwagger = require('express-swagger-generator')(app);

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('tiny'));

expressSwagger(swaggerDoc);

// Connexion MongoDB
try {
    mongoose.connect(config.DB_URI);
} catch (err) {
    console.error(err);
}

// Définition des routers
files = glob.sync('api/routers/routers.*.js');
if (!files)
    console.error(`Error glob : ${files}`)
else {
    for (const file of files)
        require(`./${file}`)(app);
}

app.listen(config.PORT, '0.0.0.0', (err) => {
    if (err)
        console.err(`Error launch : ${err}`);
    else
        console.log(`Serveur launch on : ${config.PORT}`);
});
