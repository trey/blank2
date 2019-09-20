// https://gist.github.com/liamfiddler/07e2878755a0a631a584b6420866424e
const util = require('util');
const sass = require('sass'); // `npm i -D sass`
const renderSass = util.promisify(sass.render);
const inputFile = 'src/_includes/scss/main.scss'; // the path to your main SCSS file
const outputFile = 'css/main.css'; // the filename you want this template to be saved as

module.exports = class {
    data() {
        return {
            permalink: outputFile,
            eleventyExcludeFromCollections: true,
        };
    }
    async render() {
        const result = await renderSass({
            file: inputFile,
        });

        return result.css;
    }
};
