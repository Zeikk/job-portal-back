const express = require('express');
const ControllerJob = require('../controllers/controllers.job');

const router = express.Router();

module.exports = (app) => {

    /** 
     * Retourne toutes les offres d'emploi pour un thème
     * @route GET /job/{theme}/all
     * @group job
     * @param {string} theme.path.required
     * @param {string} date.query.required
     * @returns {Array.<string>} 200 - Tableau des noms de jeux
     * @returns {Error} default - Unexpected error
     */
    router.get('/:theme/all', async (req, res) => {
        try {
            const { theme } = req.params;
            const { date } = req.query;

            const parsedDate = new Date()
            if (date) {
                parsedDate.setTime(Date.parse(date))
            } else {
                parsedDate.setTime(0);
            }

            res.json(await ControllerJob.getJobs(theme, parsedDate));
        } catch (err) {
            console.log("Err : " + err.stack);
            res.status(400).json({ error: err.message });
        }
    });

    app.use('/job', router);
}