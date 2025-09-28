/*
https://tabler.io/icons
https://heroicons.com/
https://feathericons.com/
*/

import { svg } from '/lab/'

export const LesIcons = {
    go_top_up: ({size, width, height, stroke, style, cls, title, attrs}={}) => svg(size, width, height, stroke, style, cls, title, attrs,`
        <path d="m4.5 15.75 7.5-7.5 7.5 7.5" />
    `),
    modal_close: ({size, width, height, stroke, style, cls, title, attrs}={}) => svg(size, width, height, stroke, style, cls, title, attrs,`
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" />
    `),
}
