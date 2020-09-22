const Image = require('@11ty/eleventy-img');

module.exports = async (src, alt, title, width, height) => {
    if (alt === undefined) {
        throw new Error(`Missing alt on responsiveImage from: ${src}`);
    }
    const options = {
        inputDir: 'src/img/gallery',
        outputDir: 'public/img/gallery',
        urlPath: '/img/gallery',
        widths: [800, 1600, 2200, null],
        formats: 'jpeg',
    };

    let stats = await Image(`${options.inputDir}/${src}`, options);
    let lowestSrc = stats.jpeg[0];
    let titleAttribute = (title) ? `title="${title}"` : '';
    let props = stats[options.formats].pop();

    // If sizes are passed in, use them. Otherwise, analyze the files.
    let definedWidth = (width) ? width : props.width;
    let definedHeight = (height) ? height : props.height;

    const imgTag = `<img ${titleAttribute}
                        alt="${alt}"
                        src="${lowestSrc.url}"
                        width="${definedWidth}"
                        height="${definedHeight}"
                        srcset="${stats.jpeg.map(entry => `${entry.url} ${entry.width}w`)}" />`;

    // Remove extraneous spaces and newlines.
    return imgTag.replace(/\n/g, '').replace(/\s+/g, ' ');
};
