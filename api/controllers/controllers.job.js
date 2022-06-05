const ServicesMongo = require('../services/services.mongo');
const JobSchema = require('../models/models.job');

class ControllerJob {

    getJobs = async (theme) => {
        const db = ServicesMongo.switchDatabase(theme);
        const JobModel = db.model('jobs', JobSchema);

        return await JobModel.find({
            date: {
                $gt: new Date(new Date().getTime() - (60 * 60 * 24 * 15 * 1000))
            }
        });
    }

    getNbOffers = async (theme) => {
        const db = ServicesMongo.switchDatabase(theme);
        const JobModel = db.model('jobs', JobSchema);

        return await JobModel.aggregate(
            [
                {
                    "$match": {
                        "date": {
                            "$gt": new Date(new Date().getTime() - (60 * 60 * 24 * 15 * 1000))
                        }
                    }
                },
                {
                    "$group": {
                        "_id": {
                            "$dateToString": {
                                "format": "%m/%d/%Y",
                                "date": "$date"
                            }
                        },
                        "count": {
                            "$sum": 1.0
                        }
                    }
                },
                {
                    "$project": {
                        "_id": 0.0,
                        "date": "$_id",
                        "count": "$count"
                    }
                }
            ]
        );;
    }

    getCompanyOffers = async (theme) => {
        const db = ServicesMongo.switchDatabase(theme);
        const JobModel = db.model('jobs', JobSchema);

        return await JobModel.aggregate(
            [
                {
                    "$match": {
                        "date": {
                            "$gt": new Date(new Date().getTime() - (60 * 60 * 24 * 15 * 1000))
                        }
                    }
                },
                {
                    "$group": {
                        "_id": { $toUpper: "$company" },
                        "count": {
                            "$sum": 1.0
                        }
                    }
                },
                {
                    "$project": {
                        "_id": 0.0,
                        "company": "$_id",
                        "count": "$count"
                    }
                }
            ]
        );;
    }
}

module.exports = new ControllerJob();