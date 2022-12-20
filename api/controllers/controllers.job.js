const ServicesMongo = require('../services/services.mongo');
const JobSchema = require('../models/models.job');

class ControllerJob {

    getJobs = async (theme, date) => {
        const db = ServicesMongo.switchDatabase(theme);
        const JobModel = db.model('jobs', JobSchema);

        return await JobModel.find({
            date: {
                $gt: date
            }
        }).sort({ date: -1 });
    }
}

module.exports = new ControllerJob();