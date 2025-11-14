export function Textarea(node) {
    function autoresize() {
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