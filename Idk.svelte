<script>
    const {children} = $props();
</script>

<div class="idnk">
    <div class="smile">¯\_(ツ)_/¯</div>
    <div class="message">
        {@render children?.()}
    </div>
</div>

<style>
    .idnk {color:var(--loader-text);padding:48px 24px 36px;text-align:center;}
        .smile {font-size:48px;line-height:48px;}
        .message, .message :global(*) {font-size:15px;margin-top:24px;}
</style>