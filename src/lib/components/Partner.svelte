<script lang="ts">
    export let src: string
    export let alt = ""
    export let background = true
    export let className = ''

    $: bgClass = background ? 'white-bg' : ''
</script>

<div class={ ['partner-logo', className, bgClass].filter((c) => !!c).join(' ') }>
    <img { src } { alt } height="32">
</div>

<style>
    .partner-logo {
        display: inline-block;
        position: relative;
        padding: 0.8em 1.5em 0.7em 1.5em;
        border-radius: calc(var(--radius) / 2);
    }

    .partner-logo.white-bg {
        background-color: white;
    }
</style>