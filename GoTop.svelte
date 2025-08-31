<script>
    import {onMount} from 'svelte';
    import {Icons} from '/icons.js';

    let scrolled;

    onMount(() => {
        window.onscroll = function() {
            scrolled = document.documentElement.scrollTop;
        }
    })

    function scroll(e) {
        window.scrollTo({top: 0, behavior: 'smooth'})
    }
</script>

<button class="BUTTON _ROUND _HUGE" class:scrolled on:click|preventDefault={scroll} title="Наверх">
    {@html Icons.chevron_up({size:36})}
</button>

<style>
    button {
        display:flex;
        visibility:hidden;
        position:fixed;
        right:24px;
        bottom:24px;
        /*transform:translateX(-30px);*/
    }
    .scrolled {
        visibility:visible;
    }
</style>