const ServicesMongo = require('../services/services.mongo');
const JobSchema = require('../models/models.job');

class ControllerStats {

    countJobs = async (theme, date, sources) => {
        const db = ServicesMongo.switchDatabase(theme);
        const JobModel = db.model('jobs', JobSchema);

        return await JobModel.count({
            date: {
                $gt: date
            },
            source: {
                $in: sources
            }
        });
    }

    getNbOffers = async (theme, date, sources) => {
        const db = ServicesMongo.switchDatabase(theme);
        const JobModel = db.model('jobs', JobSchema);

        return await JobModel.aggregate(
            [
                {
                    "$match": {
                        "date": {
                            "$gt": date
                        },
                        "source": {
                            "$in": sources
                        }
                    }
                },
                {
                    "$group": {
                        "_id": {
                            "$dateToString": {
                                "format": "%d/%m/%Y",
                                "date": "$date"
                            }
                        },
                        "offers": {
                            "$sum": 1.0
                        }
                    }
                },
                {
                    "$project": {
                        "_id": 0.0,
                        "date": "$_id",
                        "offers": "$offers"
                    }
                },
                {
                    "$sort": {
                        "date": 1.0
                    }
                }
            ]
        );
    }

    getCompanyOffers = async (theme, date, sources) => {
        const db = ServicesMongo.switchDatabase(theme);
        const JobModel = db.model('jobs', JobSchema);

        return await JobModel.aggregate(
            [
                {
                    "$match": {
                        "date": {
                            "$gt": date
                        },
                        "source": {
                            "$in": sources
                        }
                    }
                },
                {
                    "$group": {
                        "_id": { $toUpper: "$company" },
                        "offers": {
                            "$sum": 1.0
                        }
                    }
                },
                {
                    "$project": {
                        "_id": 0.0,
                        "company": "$_id",
                        "offers": "$offers"
                    }
                },
                {
                    "$sort": {
                        "offers": -1.0
                    }
                }
            ]
        );
    }
}

module.exports = new ControllerStats();