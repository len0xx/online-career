<script lang="ts">
    import { computePadding } from '$lib/utilities'
    import type { Padding } from '../../types/index.js'

    type ItemsAlignment = 'normal' | 'flex-start' | 'flex-end' | 'center' | 'start' | 'end' | 'self-start' | 'self-end' | 'baseline' | 'stretch' | 'safe' | 'unsafe' | 'inherit' | 'initial' | 'unset' | 'revert' | 'revert-layer'
    type ContentAlignment = ItemsAlignment | 'space-between' | 'space-around' | 'space-evenly'
    type GridSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
    type TwoColumnsRatio = '2:1' | '1:2' | '3:1' | '1:3' | '3:2' | '2:3' | '4:1' | '1:4' | '4:3' | '3:4' | '5:1' | '5:2' | '5:3' | '5:4'

    export let id: string = undefined
    export let node: HTMLElement = undefined
    export let className = ''
    export let xs: GridSize = null
    export let s: GridSize = null
    export let m: GridSize = null
    export let l: GridSize = null
    export let xl: GridSize = null
    export let ratio: TwoColumnsRatio = null
    export let gap = 1
    export let rowGap = gap
    export let customLayout: string = undefined
    export let alignItems: ItemsAlignment = 'normal'
    export let justifyItems: ItemsAlignment = 'normal'
    export let alignContent: ContentAlignment = 'normal'
    export let justifyContent: ContentAlignment = 'normal'
    export let placeItems: ItemsAlignment = null
    export let placeContent: ContentAlignment = null
    export let margin: Padding = { }

    const defaultSize = 6
    let smallestSize: GridSize = null
    let ratioClasses = ''
    $: finalPlaceItems = placeItems || (alignItems === justifyItems ? alignItems : null)
    $: finalPlaceContent = placeContent || (alignContent === justifyContent ? alignContent : null)
    $: finalAlignItems = finalPlaceItems || alignItems
    $: finalAlignContent = finalPlaceContent || alignContent
    $: finalJustifyItems = finalPlaceItems || justifyItems
    $: finalJustifyContent = finalPlaceContent || justifyContent
    $: customLayoutClass = customLayout ? 'has-custom-layout' : ''

    const getClosestSize = (arr: GridSize[], ind: 0 | 1 | 2 | 3 | 4, smallest: GridSize): GridSize => {
        for (let i = ind; i >= 0; i--) {
            if (arr[i] !== null) return arr[i]
        }
        return smallest
    }

    $: {
        if (xs !== null && smallestSize === null) smallestSize = xs
        if (s !== null && smallestSize === null) smallestSize = s
        if (m !== null && smallestSize === null) smallestSize = m
        if (l !== null && smallestSize === null) smallestSize = l
        if (xl !== null && smallestSize === null) smallestSize = xl
        if (smallestSize === null) smallestSize = defaultSize

        if (xs === null) xs = getClosestSize([xs, s, m, l, xl], 0, smallestSize)
        if (s === null) s = getClosestSize([xs, s, m, l, xl], 1, smallestSize)
        if (m === null) m = getClosestSize([xs, s, m, l, xl], 2, smallestSize)
        if (l === null) l = getClosestSize([xs, s, m, l, xl], 3, smallestSize)
        if (xl === null) xl = getClosestSize([xs, s, m, l, xl], 4, smallestSize)
    
        if (ratio !== null) {
            ratioClasses = ['grid-ratio-selected', 'grid-' + ratio.replace(':', '-')].join(' ')
        }
    }

</script>

<div
    { id }
    bind:this={ node }
    style:gap={ gap + 'em' }
    style:grid-row-gap={ rowGap + 'em' }
    style:margin={ computePadding(margin) }
    style:place-items={ finalPlaceItems }
    style:place-content={ finalPlaceContent }
    style:align-content={ finalAlignContent }
    style:justify-content={ finalJustifyContent }
    style:align-items={ finalAlignItems }
    style:justify-items={ finalJustifyItems }
    style:--custom-grid-layout={ customLayout }
    class="grid-container xsmall-viewport-{xs} small-viewport-{s} medium-viewport-{m} large-viewport-{l} xlarge-viewport-{xl} {className} {ratioClasses} {customLayoutClass}"
    on:click
>
    <slot />
</div>

<style>
    .grid-container {
        display: grid;
        position: relative;
    }

    .grid-1-2 {
        grid-template-columns: 1fr 2fr;
    }

    .grid-1-3 {
        grid-template-columns: 1fr 3fr;
    }

    .grid-1-4 {
        grid-template-columns: 1fr 4fr;
    }

    .grid-2-1 {
        grid-template-columns: 2fr 1fr;
    }

    .grid-2-3 {
        grid-template-columns: 2fr 3fr;
    }

    .grid-3-1 {
        grid-template-columns: 3fr 1fr;
    }

    .grid-3-2 {
        grid-template-columns: 3fr 2fr;
    }

    .grid-3-4 {
        grid-template-columns: 3fr 4fr;
    }

    .grid-4-1 {
        grid-template-columns: 4fr 1fr;
    }

    .grid-4-3 {
        grid-template-columns: 4fr 3fr;
    }

    .grid-5-1 {
        grid-template-columns: 5fr 1fr;
    }

    .grid-5-2 {
        grid-template-columns: 5fr 2fr;
    }

    .grid-5-3 {
        grid-template-columns: 5fr 3fr;
    }

    .grid-5-4 {
        grid-template-columns: 5fr 4fr;
    }

    @media screen and (min-width: 1441px) {
        .xlarge-viewport-1 {
            grid-template-columns: repeat(1, 1fr);
        }
        .xlarge-viewport-2:not(.grid-ratio-selected) {
            grid-template-columns: repeat(2, 1fr);
        }
        .xlarge-viewport-3 {
            grid-template-columns: repeat(3, 1fr);
        }
        .xlarge-viewport-4 {
            grid-template-columns: repeat(4, 1fr);
        }
        .xlarge-viewport-5 {
            grid-template-columns: repeat(5, 1fr);
        }
        .xlarge-viewport-6 {
            grid-template-columns: repeat(6, 1fr);
        }
        .xlarge-viewport-7 {
            grid-template-columns: repeat(7, 1fr);
        }
        .xlarge-viewport-8 {
            grid-template-columns: repeat(8, 1fr);
        }
        .xlarge-viewport-9 {
            grid-template-columns: repeat(9, 1fr);
        }
        .xlarge-viewport-10 {
            grid-template-columns: repeat(10, 1fr);
        }
        .xlarge-viewport-11 {
            grid-template-columns: repeat(11, 1fr);
        }
        .xlarge-viewport-12 {
            grid-template-columns: repeat(12, 1fr);
        }
    }

    @media screen and (min-width: 1101px) and (max-width: 1440px) {
        .large-viewport-1 {
            grid-template-columns: repeat(1, 1fr);
        }
        .large-viewport-2:not(.grid-ratio-selected) {
            grid-template-columns: repeat(2, 1fr);
        }
        .large-viewport-3 {
            grid-template-columns: repeat(3, 1fr);
        }
        .large-viewport-4 {
            grid-template-columns: repeat(4, 1fr);
        }
        .large-viewport-5 {
            grid-template-columns: repeat(5, 1fr);
        }
        .large-viewport-6 {
            grid-template-columns: repeat(6, 1fr);
        }
        .large-viewport-7 {
            grid-template-columns: repeat(7, 1fr);
        }
        .large-viewport-8 {
            grid-template-columns: repeat(8, 1fr);
        }
        .large-viewport-9 {
            grid-template-columns: repeat(9, 1fr);
        }
        .large-viewport-10 {
            grid-template-columns: repeat(10, 1fr);
        }
        .large-viewport-11 {
            grid-template-columns: repeat(11, 1fr);
        }
        .large-viewport-12 {
            grid-template-columns: repeat(12, 1fr);
        }
    }

    @media screen and (min-width: 769px) and (max-width: 1100px) {
        .medium-viewport-1 {
            grid-template-columns: repeat(1, 1fr);
        }
        .medium-viewport-2:not(.grid-ratio-selected) {
            grid-template-columns: repeat(2, 1fr);
        }
        .medium-viewport-3 {
            grid-template-columns: repeat(3, 1fr);
        }
        .medium-viewport-4 {
            grid-template-columns: repeat(4, 1fr);
        }
        .medium-viewport-5 {
            grid-template-columns: repeat(5, 1fr);
        }
        .medium-viewport-6 {
            grid-template-columns: repeat(6, 1fr);
        }
        .medium-viewport-7 {
            grid-template-columns: repeat(7, 1fr);
        }
        .medium-viewport-8 {
            grid-template-columns: repeat(8, 1fr);
        }
        .medium-viewport-9 {
            grid-template-columns: repeat(9, 1fr);
        }
        .medium-viewport-10 {
            grid-template-columns: repeat(10, 1fr);
        }
        .medium-viewport-11 {
            grid-template-columns: repeat(11, 1fr);
        }
        .medium-viewport-12 {
            grid-template-columns: repeat(12, 1fr);
        }
    }

    @media screen and (min-width: 481px) and (max-width: 768px) {
        .small-viewport-1 {
            grid-template-columns: repeat(1, 1fr);
        }
        .small-viewport-2:not(.grid-ratio-selected) {
            grid-template-columns: repeat(2, 1fr);
        }
        .small-viewport-3 {
            grid-template-columns: repeat(3, 1fr);
        }
        .small-viewport-4 {
            grid-template-columns: repeat(4, 1fr);
        }
        .small-viewport-5 {
            grid-template-columns: repeat(5, 1fr);
        }
        .small-viewport-6 {
            grid-template-columns: repeat(6, 1fr);
        }
        .small-viewport-7 {
            grid-template-columns: repeat(7, 1fr);
        }
        .small-viewport-8 {
            grid-template-columns: repeat(8, 1fr);
        }
        .small-viewport-9 {
            grid-template-columns: repeat(9, 1fr);
        }
        .small-viewport-10 {
            grid-template-columns: repeat(10, 1fr);
        }
        .small-viewport-11 {
            grid-template-columns: repeat(11, 1fr);
        }
        .small-viewport-12 {
            grid-template-columns: repeat(12, 1fr);
        }
    }

    @media screen and (min-width: 0px) and (max-width: 480px) {
        .xsmall-viewport-1 {
            grid-template-columns: repeat(1, 1fr);
        }
        .xsmall-viewport-2:not(.grid-ratio-selected) {
            grid-template-columns: repeat(2, 1fr);
        }
        .xsmall-viewport-3 {
            grid-template-columns: repeat(3, 1fr);
        }
        .xsmall-viewport-4 {
            grid-template-columns: repeat(4, 1fr);
        }
        .xsmall-viewport-5 {
            grid-template-columns: repeat(5, 1fr);
        }
        .xsmall-viewport-6 {
            grid-template-columns: repeat(6, 1fr);
        }
        .xsmall-viewport-7 {
            grid-template-columns: repeat(7, 1fr);
        }
        .xsmall-viewport-8 {
            grid-template-columns: repeat(8, 1fr);
        }
        .xsmall-viewport-9 {
            grid-template-columns: repeat(9, 1fr);
        }
        .xsmall-viewport-10 {
            grid-template-columns: repeat(10, 1fr);
        }
        .xsmall-viewport-11 {
            grid-template-columns: repeat(11, 1fr);
        }
        .xsmall-viewport-12 {
            grid-template-columns: repeat(12, 1fr);
        }
    }
    
    div.grid-container.has-custom-layout:not(.c) {
        grid-template-columns: var(--custom-grid-layout);
    }
</style>
