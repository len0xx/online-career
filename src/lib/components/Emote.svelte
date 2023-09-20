<script lang="ts">
	import { Card } from "$lib/components"

    export let image: string
</script>

<div class="emote">
    <Card color="grey" className="image-wrapper">
        <img class="primary-emote" src={ image } alt="Emote icon" width="100" height="100" />
        <img class="secondary-emote" src="/img/emotes/chert.png" alt="Chert icon" width="100" height="100" />
    </Card>
    <p class="emote-caption align-center"><slot /></p>
</div>

<style>
    .emote {
        display: grid;
        position: relative;
        place-items: center;
        width: 100%;
    }

    :global(.emote > .card.image-wrapper:not(#a)) {
        display: grid;
        width: 120px;
        height: 120px;
    }

    :global(.emote > .card.image-wrapper:not(#a) > img) {
        transition: 0.1s ease-in-out;
        grid-row: 1;
        grid-column: 1;
    }

    :global(.emote > .card.image-wrapper:not(#a) > img.primary-emote) {
        opacity: 1;
        transform: rotateX(0deg);
    }

    :global(.emote > .card.image-wrapper:not(#a) > img.secondary-emote) {
        opacity: 0;
        transform: rotateX(180deg);
    }

    :global(.emote:hover > .card.image-wrapper:not(#a) > img.primary-emote) {
        opacity: 0;
        transform: rotateX(180deg);
    }

    :global(.emote:hover > .card.image-wrapper:not(#a) > img.secondary-emote) {
        opacity: 1;
        transform: rotateX(0deg);
    }

    :global(.emote > .card) {
        padding: 10px !important;
    }
</style>