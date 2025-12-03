<script>
    import { onMount } from 'svelte';
    import { LesIcons } from './les.icons.js';

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

<div class="go-top-wrapper">
    <button class="BUTTON _ROUND _HUGE" class:scrolled onclick={scroll} title="Наверх">
        {@html LesIcons.go_top_up({size:36})}
    </button>
</div>

<style>
    .go-top-wrapper {
        height:calc(54px + 24px * 2);
    }

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