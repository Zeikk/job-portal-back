const express = require('express');
const ControllerStats = require('../controllers/controllers.stats');

const router = express.Router();

const SOURCES = ['INDEED', 'LINKEDIN', 'WELCOME TO THE JUNGLE']

module.exports = (app) => {

    /** 
     * Retourne le nombre d'offres d'emploi pour un thème
     * @route GET /stats/{theme}/count
     * @group stats
     * @param {string} theme.path.required
     * @param {string} date.query
     * @param {string} source.query
     * @returns {Array.<string>} 200 - Tableau des noms de jeux
     * @returns {Error} default - Unexpected error
     */
    router.get('/:theme/count', async (req, res) => {
        try {
            const { theme } = req.params;
            const { date, source } = req.query;

            const parsedDate = new Date()
            if (date) {
                parsedDate.setTime(Date.parse(date))
            } else {
                parsedDate.setTime(0);
            }

            let sources = SOURCES
            if (source)
                sources = [source]

            res.json(await ControllerStats.countJobs(theme, parsedDate, sources));
        } catch (err) {
            console.log("Err : " + err.stack);
            res.status(400).json({ error: err.message });
        }
    });

    /** 
     * Retourne l'évolution du nombre d'offres
     * @route GET /stats/{theme}/offers
     * @group stats
     * @param {string} theme.path.required
     * @param {string} date.query
     * @param {string} source.query
     * @returns {Array.<string>} 200 - Tableau des noms de jeux
     * @returns {Error} default - Unexpected error
     */
    router.get('/:theme/offers', async (req, res) => {
        try {
            const { theme } = req.params;
            const { date, source } = req.query;

            const parsedDate = new Date()
            if (date) {
                parsedDate.setTime(Date.parse(date))
            } else {
                parsedDate.setTime(0);
            }

            let sources = SOURCES
            if (source)
                sources = [source]

            res.json(await ControllerStats.getNbOffers(theme, parsedDate, sources));
        } catch (err) {
            console.log("Err : " + err.stack);
            res.status(400).json({ error: err.message });
        }
    });

    /** 
     * Retourne le nombre d'offres par entreprise
     * @route GET /stats/{theme}/company
     * @group stats
     * @param {string} theme.path.required
     * @param {string} date.query
     * @param {string} source.query
     * @returns {Array.<string>} 200 - Tableau des noms de jeux
     * @returns {Error} default - Unexpected error
     */
    router.get('/:theme/company', async (req, res) => {
        try {
            const { theme } = req.params;
            const { date, source } = req.query;

            const parsedDate = new Date()
            if (date) {
                parsedDate.setTime(Date.parse(date))
            } else {
                parsedDate.setTime(0);
            }

            let sources = SOURCES
            if (source)
                sources = [source]

            res.json(await ControllerStats.getCompanyOffers(theme, parsedDate, sources));
        } catch (err) {
            console.log("Err : " + err.stack);
            res.status(400).json({ error: err.message });
        }
    });

    app.use('/stats', router);
}