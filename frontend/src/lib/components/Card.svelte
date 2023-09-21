<script lang="ts">
    import { computePadding } from '$lib/utilities'
    import type { Padding } from '../../types'

    type CardColor = 'black' | 'white' | 'purple' | 'green' | 'grey'

    const defaultPadding: Padding = { y: 1.6, x: 1.6 }

    export let color: CardColor = 'white'
    export let padding: Padding = defaultPadding
    export let className = ''
    export let shadow = true
    export let opacity: number | null = null
    export let transform: string | null = null
    export let zIndex: number | null = null

    $: shadowClass = shadow ? `has-shadow` : ''
    $: colorClass = `color-${color}`
</script>

<div
    class={['card', colorClass, shadowClass, className].filter((c) => !!c).join(' ')}
    style:padding={computePadding({ ...defaultPadding, ...padding })}
    style:opacity
    style:transform
    style:z-index={zIndex}
    on:click
    on:focus
    on:mouseover
    on:blur
    on:keyup
>
    <slot />
</div>

<style>
    div.card {
        display: block;
        position: relative;
        color: black;
        border-radius: var(--radius);
    }

    :global(div.card.color-white) {
        background-color: white;
    }

    :global(div.card.color-black) {
        background-color: var(--dark);
        color: white;
    }

    :global(div.card.color-grey) {
        background-color: var(--grey);
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
