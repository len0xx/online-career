<script lang="ts">
    import { computePadding } from '$lib/utilities'
    import type { Padding } from '../../types'

    type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

    const defaultMargin = { y: 1, x: 0 }

    export let level: HeadingLevel
    export let className = ''
    export let lineHeight = 1.2
    export let margin: Padding = defaultMargin
    export let node: HTMLElement | null = null

    $: tag = `h${level}`
</script>

<svelte:element
    this={tag}
    on:click
    on:keydown
    on:mouseover
    on:focus
    on:blur
    bind:this={node}
    style:line-height={lineHeight}
    style:margin={computePadding({ ...defaultMargin, ...margin })}
    class={[className, 'heading'].filter((c) => !!c.length).join(' ')}
>
    <slot />
</svelte:element>

<style>
    :global(h1, h2, h3, h4) {
        display: block;
        position: relative;
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
