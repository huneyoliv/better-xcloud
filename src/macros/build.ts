import stylus from 'stylus';

export const isFullVersion = () => {
    const variant = process.env.BUILD_VARIANT || Bun.env.BUILD_VARIANT;
    return variant ? variant === 'full' : true;
};

export const isLiteVersion = () => {
    const variant = process.env.BUILD_VARIANT || Bun.env.BUILD_VARIANT;
    return variant === 'lite';
};

export const renderStylus = async () => {
    const file = Bun.file('./src/assets/css/styles.styl');
    const cssStr = await file.text();

    const generatedCss = await (stylus(cssStr, {})
        .set('filename', 'styles.css')
        .set('compress', true)
        .include('src/assets/css/'))
        .render();

    return generatedCss;
};


export const compressCss = (css: string) => {
    return (stylus(css, {}).set('compress', true)).render();
};

export const compressCode = (code: string): string => {
    return code.split('\n') // Split into lines
        .map(line => line.startsWith('#') || line.startsWith('@') ? line + '\n' : line.trim()) // Trim spaces, with exceptions for shader files
        .filter(line => line && !line.startsWith('//')) // Remove empty and commented lines
        .join(''); // Join into a single line
};

export const compressCodeFile = async (path: string) => {
    const file = Bun.file(path);
    const code = await file.text();

    return compressCode(code);
};
