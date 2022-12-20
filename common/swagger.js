const config = require('./config')

const swaggerDoc = {
    swaggerDefinition: {
        info: {
            description: 'Back Job Portal',
            title: 'Swagger',
            version: '1.0.0',
        },
        host: `${config.HOST}:${config.PORT}`,
        basePath: '',
        produces: [
            "application/json",
        ],
        schemes: ['http', 'https'],
    },
    basedir: __dirname, //app absolute path
    files: ['../api/routers/**/*.js', '../api/models/**/*.js'] //Path to the API handle folder
};

module.exports = swaggerDoc;
