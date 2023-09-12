<script lang="ts">
    export let src: string
    export let alt = ""
</script>

<div class="partner-logo">
    <img { src } { alt } height="32">
</div>

<style>
    .partner-logo {
        display: inline-block;
        position: relative;
        background-color: white;
        padding: 0.8em 1.5em 0.7em 1.5em;
        border-radius: calc(var(--radius) / 2);
    }
</style>