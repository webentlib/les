<script>
    import { onMount } from 'svelte';
    import { LesIcons } from './les_icons.js';

    let scrolled = $state(0);

    onMount(() => {
        window.onscroll = function() {
            scrolled = document.documentElement.scrollTop;
        }
    })

    function scroll(e) {
        e.preventDefault();
        window.scrollTo({top: 0, behavior: 'smooth'})
    }
</script>

<button class="BUTTON _ROUND _HUGE" class:scrolled onclick={scroll} title="Наверх">
    {@html LesIcons.go_top_up({size:36})}
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