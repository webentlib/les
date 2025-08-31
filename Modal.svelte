<script>
    import { Icons } from '/icons.ts';
    import { browser } from '/all.ts';

    let { header, container, content, children, footer, show = $bindable() } = $props();

    let modal_window;

    function close_on_click_outside(e) {
        if (!modal_window?.contains(e.target)) {
            show = false;
        }
    }

    function close_on_escape(e) {
        if (e.key === 'Escape') {
            show = false;
        }
    }

    $effect(() => {
        if (browser) {
            if (show) {
                window.addEventListener('click', close_on_click_outside, {capture: true});
                window.addEventListener('keydown', close_on_escape);
            } else {
                window.removeEventListener('click', close_on_click_outside, {capture: true});
                window.removeEventListener('keydown', close_on_escape);
            }
        }
    })
</script>

{#if show}
    <div class="MODAL">
        <div class="MODAL_WINDOW" bind:this={modal_window}>
            {#if header}
                <div class="MODAL_HEADER">
                    {@render header?.()}
                </div>
            {/if}
            <div class="MODAL_CONTAINER" class:_CONTENT={content || children}>
                {@render (container || content || children)?.()}
            </div>
            {#if footer}
                <div class="MODAL_FOOTER">
                    {@render footer?.()}
                </div>
            {/if}
            <button
                class="MODAL_CLOSE BUTTON _LINK _ROUND _HUGE _GRAY"

                class:_OUTSIDE={!header}
                class:_NO_PSEUDO={!header}
                class:_GIANT={!header}

                class:_INSIDE={header}

                onclick={() => show = false}
            >
                {#if !header}
                    {@html Icons.x({size:48, stroke:2})}
                {:else}
                    {@html Icons.x({size:36, stroke:1})}
                {/if}
            </button>
        </div>
    </div>
{/if}
