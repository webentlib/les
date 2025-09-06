<script>

    import { onMount, onDestroy } from 'svelte';
    import { afterNavigate, beforeNavigate } from '$app/navigation';
    import { browser } from '$app/environment';

    import NProgress from './nprogress/nprogress.ts';
    import './nprogress/nprogress.css';

    onMount(async () => {
        NProgress.configure({showSpinner: false, minimum: 0.75, speed: 300});
    });
    beforeNavigate(async () => {
        NProgress.start();
    });
    afterNavigate(async () => {
        NProgress.done();
    });
    onDestroy(async () => {
        if (!browser)
            return;
        NProgress.remove();
    });
</script>

<style>
    :global(#nprogress .bar) {opacity:0.75;background:var(--blue);}
    :global(#nprogress .peg) {opacity:0.75;box-shadow:0 0 10px var(--blue), 0 0 5px var(--blue);}
</style>