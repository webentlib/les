<script>
    import { onMount } from 'svelte';
    import { LesIcons } from './les.icons.js';

    let { solid } = $props();

    let scrolled = $state(0);

    onMount(() => {
        for (const el of [window, document.body]) {
            el.addEventListener("scroll", (e) => {
                scrolled = el.scrollTop;
            })
        }
    })

    function scroll(e) {
        e.preventDefault();
        for (const el of [window, document.body]) {
            el.scrollTo({top: 0, behavior: 'smooth'})
        }
    }
</script>

<div class="go-top-wrapper" class:_solid={solid}>
    <button class="BUTTON _ROUND _HUGE" class:scrolled onclick={scroll} title="Наверх">
        {@html LesIcons.go_top_up({size:36})}
    </button>
</div>

<style>
    .go-top-wrapper {
        position:relative;
        z-index:4;
        height:calc(54px + 24px * 2);
    }
    .go-top-wrapper._solid {
        height:0;
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