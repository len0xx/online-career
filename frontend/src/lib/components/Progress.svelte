<script lang="ts">
    import { Icon } from '$lib/components'
    import { getSizeIndex, getSizeName } from '$lib/utilities'
    import type { DefaultSizes, TransitionReceiver } from '../../types'

    type RotationSpeed = 1 | 2 | 3

    export let id: string = undefined
    export let node: HTMLElement = undefined
    export let className = ''
    export let size: DefaultSizes = 'M'
    export let speed: RotationSpeed = 2
    export let transition: TransitionReceiver = { in: undefined, out: undefined }

    $: iconSize = [40, 60, 80][getSizeIndex(size)]
    $: sizeClass = `size-${getSizeName(size)}`
    $: speedClass = `speed-${speed}`
</script>

<Icon
    {id}
    {transition}
    bind:node
    name="progress"
    className={['kit-progress', className, sizeClass, speedClass].filter(Boolean).join(' ')}
    width={iconSize}
    height={iconSize}
    on:click
    on:mouseleave
    on:mousedown
    on:mouseup
    on:mouseover
/>

<style>
    @keyframes -global-rotation {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(359deg);
        }
    }

    :global(.kit-progress) {
        display: inline-block;
        vertical-align: middle;
        animation-name: rotation;
        animation-duration: 1s;
        animation-timing-function: linear;
        animation-direction: normal;
        animation-iteration-count: infinite;
    }
    :global(.kit-progress.speed-1) {
        animation-duration: 2s;
    }
    :global(.kit-progress.speed-2) {
        animation-duration: 1s;
    }
    :global(.kit-progress.speed-3) {
        animation-duration: 0.5s;
    }
</style>
