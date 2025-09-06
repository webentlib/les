import { browser } from '$app/environment';
import { Notyf } from './notyf/notyf.min.js';

// https://github.com/caroso1222/notyf

let notyf = {};

if (browser) {
    notyf = new Notyf({
        duration: 5000,
        position: {
            y: 'bottom',
            x: 'left',
        },
        dismissible: true,
        types: [
            {
                type: 'info',
                className: 'Toast',
            }
        ]
    });
}

export const Toaster = new function() {
    this.bake = function(message) {
        if (browser) {
            notyf.open({type: 'info', message});
        }
    }
}