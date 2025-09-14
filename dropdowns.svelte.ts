import { browser } from '$app/environment';
import { writable, get } from 'svelte/store';

function dropdownStore(initial_value) {
    const { subscribe, set, update } = writable(initial_value);

    function add(node, key) {
        node.addEventListener('mousedown', prevent_close_on_intersect);
        node.addEventListener('touchstart', prevent_close_on_intersect, {passive: true});

        update(store => {
            store[key] = {
                node: node,
                opened: false
            };
            return store;
        });
        $effect(() => {
            return () => {
                review_event_listeners();

                update(store => {
                    delete store[key];
                    return store;
                });
            }
        })
    }

    return {subscribe, set, update, add};
}

export const dropdownsStore = dropdownStore({});

let clicked_inside;
function prevent_close_on_intersect(e) {
    dropdownsStore.update(store => {
        for (const [key, value] of Object.entries(store)) {
            if (value.node?.contains(e.target)) {
                if (!value.opened) {
                    continue;
                }
                clicked_inside = true;
            }
        }
        return store;
    })
}

function close_on_click_outside(e) {
    dropdownsStore.update(store => {
        for (const [key, value] of Object.entries(store)) {
            if (!clicked_inside && !value.node?.contains(e.target)) {
                value.opened = false;
            }
        }
        return store;
    });
    clicked_inside = false;
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

function add_event_listeners() {
    window.addEventListener('mouseup', close_on_click_outside);
    window.addEventListener('touchend', close_on_click_outside, {passive: true});
    window.addEventListener('keydown', close_on_escape);
}

function remove_event_listeners() {
    window.removeEventListener('mouseup', close_on_click_outside);
    window.removeEventListener('touchend', close_on_click_outside, {passive: true});
    window.removeEventListener('keydown', close_on_escape);
}

function review_event_listeners() {
    const store = get(dropdownsStore);
    const has_opened = Object.values(store).some((dropdown) => dropdown.opened);
    if (has_opened) {
        add_event_listeners();
    } else {
        remove_event_listeners();
    }
}

if (browser) {
    dropdownsStore.subscribe((store) => {
        review_event_listeners();
    })
}
