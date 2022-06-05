const config = {
    HOST: process.env.HOST || "localhost",
    PORT: process.env.PORT || "3000",
    DB_URI: process.env.DB_URI,
}

module.exports = config;
