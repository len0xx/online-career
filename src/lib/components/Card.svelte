<script lang="ts">
    type CardColor = 'black' | 'white' | 'purple' | 'green'

    export let color: CardColor = 'white'
    export let className = ''

    $: colorClass = `color-${ color }`
</script>

<div class={ [ 'card', colorClass, className ].filter((c) => !!c).join(' ') } on:click on:focus on:mouseover on:blur on:keyup>
    <slot />
</div>

<style>
    div.card {
        display: block;
        position: relative;
        color: black;
        border-radius: 40px;
        padding: 1.6em;
        box-shadow: var(--default-shadow);
    }

    :global(div.card.color-white) {
        background-color: white;
    }

    :global(div.card.color-black) {
        background-color: var(--dark);
        color: white;
    }

    :global(div.card.color-purple) {
        background-color: var(--purple);
        color: white;
    }

    :global(div.card.color-green) {
        background-color: var(--green);
        color: white;
    }
</style>
