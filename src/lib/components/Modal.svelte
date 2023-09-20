<script lang="ts">
    import { onMount, createEventDispatcher } from 'svelte'
    import { fade, blur } from 'svelte/transition'
    import { clickOutside } from '$lib/actions'
    
    type Align = 'unset' | 'inherit' | 'initial' | 'left' | 'center' | 'right'

    export let id: string = undefined
    export let node: HTMLElement = undefined
    export let align: Align = 'unset'
    export let closable = true
    export let className = ''

    let ready = false
    let visible = false
    const TRANSITION_DELAY = 100
    const TRANSITION_DURATION = 200
    const dispatch = createEventDispatcher()

    export const open = () => {
        if (visible) return
        visible = true
        setTimeout(() => ready = true, (TRANSITION_DELAY + TRANSITION_DURATION))
        dispatch('open')
    }

    export const close = () => {
        if (!visible) return
        if (closable && ready) {
            visible = false
            setTimeout(() => ready = false, (TRANSITION_DELAY + TRANSITION_DURATION))
            dispatch('close')
        }
    }

    export const toggle = () => visible ? close() : open()

    onMount(() => {
        document.addEventListener('keyup', (event: KeyboardEvent) => {
            if (event.key == 'Escape') {
                close()
            }
        })
    })
</script>

{ #if visible }
    <div class="kit-modal-wrapper" in:fade="{{ duration: TRANSITION_DURATION }}" out:fade="{{ delay: TRANSITION_DELAY, duration: TRANSITION_DURATION }}">
        <div class="shadow"></div>
        <div>
            { #if closable }
                <div class="align-center pc-hide">
                    <div class="close pc-hide" on:click={ close } on:keydown>
                        <img src="/img/icons/modal-close.svg" alt="Close modal">
                    </div>
                </div>
            { /if }
            <div
                {id}
                bind:this={ node }
                class="kit-modal {className}"
                style:--local-align={ align }
                on:click
                on:focus
                on:blur
                on:mouseleave
                on:mouseover
                on:keydown
                in:blur="{{ delay: TRANSITION_DELAY, duration: TRANSITION_DURATION }}"
                out:blur="{{ duration: TRANSITION_DURATION }}"
                use:clickOutside={ close }
            >
                { #if closable }
                    <div class="close mobile-hide" on:click={ close } on:keydown>
                        <img src="/img/icons/modal-close.svg" alt="Close modal">
                    </div>
                { /if }
                <div class="kit-modal-content">
                    <slot />
                </div>
                <div class="footer">
                    <slot name="footer" />
                </div>
            </div>
        </div>
    </div>
{ /if }

<style>
    div {
        position: relative;
    }

    .kit-modal-wrapper {
        display: grid;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100%;
        min-height: 100vh;
        justify-items: center;
        z-index: 32;
        overflow-y: auto;
    }

    .kit-modal-wrapper .shadow {
        display: block;
        position: relative;
        width: 100vw;
        height: 100%;
        min-height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .kit-modal-wrapper > * {
        grid-column: 1;
        grid-row: 1;
    }

    .kit-modal-wrapper .kit-modal {
        display: block;
        position: relative;
        background-color: var(--purple);
        color: white;
        width: 696px;
        text-align: var(--local-align);
        border-radius: var(--radius);
        box-shadow: var(--default-shadow);
        margin: 2em auto;
    }

    :global(.kit-modal-wrapper .close) {
        display: grid;
        place-content: center;
        place-items: center;
        cursor: pointer;
        border-radius: 50%;
        width: 64px;
        height: 64px;
    }

    :global(.kit-modal-wrapper .close.pc-hide) {
        width: 48px;
        height: 48px;
        margin: 1em auto;
    }

    :global(.kit-modal-wrapper div.close.mobile-hide:not(.s)) {
        position: absolute;
        top: 0;
        left: 105%;
    }

    :global(.kit-modal-wrapper .close > img) {
        width: 64px;
        height: 64px;
    }

    :global(.kit-modal-wrapper .close.pc-hide > img) {
        width: 48px;
        height: 48px;
    }

    :global(.kit-modal-wrapper .close:hover) {
        background: rgba(0, 0, 0, 0.1);
    }

    .kit-modal-wrapper .kit-modal > .kit-modal-content {
        padding: 2.4em 3.2em;
    }

    @media screen and (max-width: 768px) {
        .kit-modal-wrapper .kit-modal {
            width: 90%;
            margin: 2em auto 5em auto;
        }

        .kit-modal-wrapper .kit-modal > .kit-modal-content {
            padding: 3em 1em;
        }

        :global(.kit-modal-wrapper .kit-modal > .close) {
            top: 1em;
            right: 1em;
            width: 32px;
            height: 32px;
        }

        :global(.kit-modal-wrapper .kit-modal > .close > img) {
            width: 32px;
            height: 32px;
        }
    }
</style>
