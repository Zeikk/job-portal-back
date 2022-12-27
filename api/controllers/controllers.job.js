const ServicesMongo = require('../services/services.mongo');
const JobSchema = require('../models/models.job');

class ControllerJob {

    getJobs = async (theme, date, sources) => {
        const db = ServicesMongo.switchDatabase(theme);
        const JobModel = db.model('jobs', JobSchema);

        return await JobModel.find({
            date: {
                $gt: date
            },
            source: {
                $in: sources
            }
        }).sort({ date: -1 });
    }
}

module.exports = new ControllerJob();