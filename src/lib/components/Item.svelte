<script lang="ts">
	import Card from "./Card.svelte"

    type Color = 'white' | 'green' | 'purple'

    export let color: Color = 'white'
    export let image: string
    export let bubble: string = null
</script>

<div class="item">
    { #if bubble }
        <div class="bubble-row">
            <div class="bubble">{ bubble }</div>
        </div>
    { /if }
    <Card {color} className="item-card">
        <img src={ image } alt="Item">
    </Card>
    <p class="align-center item-caption">
        <slot />
    </p>
</div>

<style>
    .bubble-row {
        display: block;
        position: relative;
        margin-bottom: -1.2em;
        text-align: center;
        z-index: 4;
    }

    .bubble-row > .bubble {
        display: inline-block;
        position: relative;
        border-radius: 500px;
        border: 3px solid var(--green);
        background-color: white;
        color: black;
        padding: 0.7em 0.5em 0.6em 0.5em;
        font-size: var(--subtitle);
        font-weight: 500;
        min-width: 49px;
        text-align: center;
    }

    :global(.card.item-card) {
        display: grid !important;
        position: relative;
        place-items: center;
        min-height: 375px;
    }

    :global(.card.item-card > img) {
        transform: scale(1);
        transition: 0.35s ease-in-out;
    }

    :global(.card.item-card:hover > img) {
        transform: scale(1.075);
    }

    @media screen and (max-width: 768px) {
        .bubble-row {
            margin-bottom: -1.6em;
        }

        .bubble-row > .bubble {
            font-size: var(--medium);
        }

        :global(.card.item-card) {
            min-height: 320px;
        }
    }
</style>