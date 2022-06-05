const mongoose = require('mongoose');

/**
 * @typedef Job
 * @property {string} title.required
 * @property {string} href.required
 * @property {string} company.required
 * @property {data} date.required
 */

const schema = new mongoose.Schema(
    {
        title: String,
        href: String,
        company: String,
        date: Date
    }
);

module.exports = schema;
