<script>
    import { onMount, onDestroy } from 'svelte';

    let { size = 24, text = null, position = 'static' } = $props();

    // Не доверяю я CSS анимациям, комп шуметь начинает и Диспетчер Задач не в Восторге от Хрома
    let spinner_el;
    let interval;
    let rotation_deg = $state(0);
    onMount(() => {
        interval = setInterval(() => {
            if (rotation_deg < 360) {
                rotation_deg += 10;
            } else {
                rotation_deg = 0;
            }
        }, 30)
    })

    onDestroy(() => {
        clearInterval(interval);
    })
</script>

<span class="loader-container" style={`position:${position};`}>
    <span
         bind:this={spinner_el}
         class={`LOADER _${size} loader-spinner`}
         style="transform:rotate({rotation_deg}deg)"
    ></span>
    {#if text}
        <span class="loader-text">{text}</span>
    {/if}
</span>

<style>
    .loader-container {
        display:flex;
        align-items:center;
        justify-content:center;
        padding:24px;
        flex-direction:column;
        left:0;right:0;top:0;bottom:0;}
        .loader-spinner {}
        .loader-text {
            font-size:14px;
            line-height:19px;
            color:var(--loader-text);
            margin-top:12px;
            padding:0 12px;
            text-align:center;
        }
</style>