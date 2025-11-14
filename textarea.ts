import {tick} from 'svelte';

export async function Textarea(node) {
    async function autoresize() {
        await tick();
        node.style.height = 'auto'; // Reset height to recalculate
        node.style.height = node.scrollHeight + 'px';
    }

    autoresize();

    node.addEventListener('input', autoresize);

    return {
        destroy() {
            node.removeEventListener('input', autoresize);
        }
    };
}