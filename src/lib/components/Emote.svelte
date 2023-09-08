<script lang="ts">
	import Card from "./Card.svelte"

    export let image: string
</script>

<div class="emote">
    <Card color="grey"><img src={ image } alt="Emote icon" width="100" height="100" /></Card>
    <p class="emote-caption align-center"><slot /></p>
</div>

<style>
    .emote {
        display: grid;
        position: relative;
        place-items: center;
    }

    :global(.emote > .card) {
        width: 120px;
        height: 120px;
    }

    :global(.emote > .card) {
        padding: 10px !important;
    }
</style>