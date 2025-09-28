<script>
    import { onDestroy } from 'svelte';
    import { LesIcons } from './les_icons.ts';
    import { browser } from '/all.ts';

    let { header, container, content, children, footer, opened = $bindable(), modi = $bindable() } = $props();

    let modal_window = $state();
    let modal_close = $state();

    let clicked_inside;
    function prevent_close_on_intersect(e) {
        if (modal_window?.contains(e.target)) {
            clicked_inside = true;
        }
    }

    function close_on_click_outside(e) {
        if (!clicked_inside && !modal_window?.contains(e.target)) {
            opened = false;
        }
        clicked_inside = false;
    }

    function close_on_escape(e) {
        if (e.key === 'Escape') {
            opened = false;
        }
    }

    function close(e) {
        clicked_inside = null;
        opened = false;
    }

    function add_event_listeners() {
        modal_close.addEventListener('click', close);

        modal_window.addEventListener('mousedown', prevent_close_on_intersect);
        modal_window.addEventListener('touchstart', prevent_close_on_intersect, {passive: true});

        window.addEventListener('mouseup', close_on_click_outside);
        window.addEventListener('touchend', close_on_click_outside, {passive: true});

        window.addEventListener('keydown', close_on_escape);
    }

    function remove_event_listeners() {
        modal_close.removeEventListener('click', close);

        modal_window.removeEventListener('mousedown', prevent_close_on_intersect);
        modal_window.removeEventListener('touchstart', prevent_close_on_intersect, {passive: true});

        window.removeEventListener('mouseup', close_on_click_outside);
        window.removeEventListener('touchend', close_on_click_outside, {passive: true});
        window.removeEventListener('keydown', close_on_escape);
    }

    $effect(() => {
        if (browser && modal_window && modal_close) {
            if (opened) {
                add_event_listeners();
                document.body.classList.add('_SCROLL_DISABLED');
            } else {
                remove_event_listeners();
                document.body.classList.remove('_SCROLL_DISABLED');
            }
        }
    });

    onDestroy(() => {
        if (browser && modal_window && modal_close) {
            remove_event_listeners();
            document.body.classList.remove('_SCROLL_DISABLED');
        }
    });
</script>

{#if opened}
    <div class={'MODAL' + (modi ? ' ' + modi : '')}>
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
                bind:this={modal_close}

                class="MODAL_CLOSE BUTTON _LINK _ROUND _HUGE _GRAY"

                class:_OUTSIDE={!header}
                class:_NO_PSEUDO={!header}
                class:_GIANT={!header}

                class:_INSIDE={header}

                onclick={() => opened = false}
            >
                {#if !header}
                    {@html LesIcons.modal_close({size:48, stroke:2})}
                {:else}
                    {@html LesIcons.modal_close({size:36, stroke:1})}
                {/if}
            </button>
        </div>
    </div>
{/if}
