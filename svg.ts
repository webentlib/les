export function svg(size, width, height, stroke=1, style='', cls, title, attrs, content) {
    /**
    1) We add width and height to styles if passed explicetly — because it must override some global styles e.g. .BUTTON svg {height: 70%}
    2) This attrs added not very consciously: stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"
    3) We want stroke-width to be in pixels. However SVGs are vectors, so "stroke-width" attr adjust actual stroke width to the size of an image. Let's prevent that behaviour
    */

    stroke = stroke / ((width || size || height || 24) / 24)

    if (width || height || size ) {
        style = `width:${width || size || 24}px;height:${height || size || 24}px;` + style;
    }

    title = title ? '<title>' + title + '</title>' : '';

    return `
        <svg
             xmlns="http://www.w3.org/2000/svg"
             width="${width || size || 24}px"
             height="${height || size || 24}px"
             viewBox="0 0 24 24"
             stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"
             stroke-width="${stroke}"
             style="${style}"
             ${attrs || ''}
             ${(cls) ? 'class="' + cls + '"' : ''}
        >
            ${title}
            ${content}
        </svg>`
}
