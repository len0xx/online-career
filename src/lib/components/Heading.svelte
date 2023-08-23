<script lang="ts">
	import { computePadding } from "$lib/utilities"
	import type { Padding } from "../../types"

    type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

    const defaultMargin = { y: 1, x: 0 }

    export let level: HeadingLevel
    export let className = ''
    export let margin: Padding = defaultMargin

    $: tag = `h${ level }`
</script>

<svelte:element
    on:click
    on:mouseover
    on:focus
    on:blur
    style:margin={ computePadding({ ...defaultMargin, ...margin }) }
    this={ tag }
    class={ [ className, 'heading' ].filter((c) => !!c.length).join(' ') }
>
    <slot />
</svelte:element>

<style>
    :global(h1, h2, h3, h4) {
        font-weight: 600;
    }

    :global(h1) {
        font-size: var(--header-1);
    }

    :global(h2) {
        font-size: var(--header-2);
    }

    :global(h3) {
        font-size: var(--header-3);
    }

    :global(h4) {
        font-size: var(--header-4);
    }
</style>
