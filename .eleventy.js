const fs = require('fs');
const markdownIt = require('markdown-it');
const markdownLib = markdownIt({ html: true, typographer: true });
const md = new markdownIt();
const responsiveImage = require('./src/_includes/shortcodes/responsive-image');

module.exports = function(eleventyConfig) {
    eleventyConfig.setLibrary('md', markdownLib);

    eleventyConfig.addFilter('markdown', value => md.renderInline(value));

    eleventyConfig.addShortcode('responsiveImage', responsiveImage);

    // Make 404 page work with `eleventy --serve`
    eleventyConfig.setBrowserSyncConfig({
        callbacks: {
            ready: function(err, browserSync) {
                const content_404 = fs.readFileSync('dist/404.html');

                browserSync.addMiddleware('*', (req, res) => {
                    // Provides the 404 content without redirect.
                    res.write(content_404);
                    res.end();
                });
            }
        }
    });

    return {
        dir: {
            input: 'src',
            output: 'dist',
        },
    };
};
