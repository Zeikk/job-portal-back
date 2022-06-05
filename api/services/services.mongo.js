const mongoose = require('mongoose');

class ServicesMongo {

    switchDatabase = (theme) => {
        return mongoose.connection.useDb(theme);
    }
}

module.exports = new ServicesMongo();