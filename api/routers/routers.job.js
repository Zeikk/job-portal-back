const express = require('express');
const controllerJob = require('../controllers/controllers.job');

const router = express.Router();

module.exports = (app) => {

    /** 
     * Retourne toutes les offres d'emploi pour un thème
     * @route GET /job/:theme/all
     * @group job
     * @returns {Array.<string>} 200 - Tableau des noms de jeux
     * @returns {Error} default - Unexpected error
     */
    router.get('/:theme/all', async (req, res) => {
        try {
            const { theme } = req.params;
            res.json(await controllerJob.getJobs(theme));
        } catch (err) {
            console.log("Err : " + err.stack);
            res.status(400).json({ error: err.message });
        }
    });

    /** 
     * Retourne l'évolution du nombre d'offres
     * @route GET /job/:theme/offers
     * @group job
     * @returns {Array.<string>} 200 - Tableau des noms de jeux
     * @returns {Error} default - Unexpected error
     */
    router.get('/:theme/offers', async (req, res) => {
        try {
            const { theme } = req.params;
            res.json(await controllerJob.getNbOffers(theme));
        } catch (err) {
            console.log("Err : " + err.stack);
            res.status(400).json({ error: err.message });
        }
    });

    /** 
     * Retourne le nombre d'offres par entreprise
     * @route GET /job/:theme/company
     * @group job
     * @returns {Array.<string>} 200 - Tableau des noms de jeux
     * @returns {Error} default - Unexpected error
     */
    router.get('/:theme/company', async (req, res) => {
        try {
            const { theme } = req.params;
            res.json(await controllerJob.getCompanyOffers(theme));
        } catch (err) {
            console.log("Err : " + err.stack);
            res.status(400).json({ error: err.message });
        }
    });

    app.use('/job', router);
}