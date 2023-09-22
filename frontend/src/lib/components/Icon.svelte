<script lang="ts">
    import { computePadding, applyTransitions } from '$lib/utilities'
    import type { Padding, TransitionReceiver } from '../../types'

    type ImageExtension = 'svg' | 'png' | 'jpg' | 'jpeg' | 'webp'

    export let id: string = undefined
    export let margin: Padding = {}
    export let name: string
    export let alt: string = undefined
    export let width = 32
    export let height = 32
    export let node: HTMLElement = undefined
    export let className = ''
    export let extension: ImageExtension = 'svg'
    export let path = '/img/icons/'
    export let transition: TransitionReceiver = { in: undefined, out: undefined }

    $: src = path + name + '.' + extension
    $: ({ inFunc, inOptions, outFunc, outOptions } = applyTransitions(transition))
</script>

<img
    {id}
    {src}
    {alt}
    in:inFunc={inOptions}
    out:outFunc={outOptions}
    style:margin={computePadding(margin)}
    style:--icon-width={width + 'px'}
    style:--icon-height={height + 'px'}
    class={['kit-icon', className].filter(Boolean).join(' ')}
    bind:this={node}
    on:click
    on:keydown
    on:focus
    on:blur
    on:mouseover
    on:mouseup
/>

<style>
    .kit-icon {
        display: inline-block;
        position: relative;
        vertical-align: middle;
        width: var(--icon-width);
        height: var(--icon-height);
    }
</style>
