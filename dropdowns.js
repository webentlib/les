import {browser} from '$app/environment';
import {writable} from 'svelte/store';

function dropdownStore() {
    const { subscribe, set, update } = writable({});

    function add(node, key) {
        return update(store => {store[key] = {node: node, opened: false}; return store;});
    }

    return {subscribe, set, update, add};
}

export const dropdownsStore = dropdownStore({});

function close_on_click_outside(e) {
    dropdownsStore.update(store => {
        for (const [key, value] of Object.entries(store)) {
            if (!value.node?.contains(e.target)) {
                value.opened = false;
            }
        }
        return store;
    })
}

function close_on_escape(e) {
    if (e.key === 'Escape') {
        dropdownsStore.update(store => {
            for (const [key, value] of Object.entries(store)) {
                value.opened = false;
            }
            return store;
        })
    }
}

if (browser) {
    dropdownsStore.subscribe((store) => {
        const has_opened = Object.values(store).some((dropdown) => dropdown.opened);
        if (has_opened) {
            window.addEventListener('click', close_on_click_outside, {capture: true});
            window.addEventListener('keydown', close_on_escape);
        } else {
            window.removeEventListener('click', close_on_click_outside, {capture: true});
            window.removeEventListener('keydown', close_on_escape);
        }
    })
}
