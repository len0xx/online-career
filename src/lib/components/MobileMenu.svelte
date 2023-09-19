<script lang="ts">
    import { fly } from 'svelte/transition'

    let visible = false

    export const open = () => {
        if (visible) return
        visible = true
    }

    export const close = () => {
        if (!visible) return
        visible = false
    }
</script>

{#if visible}
    <div class="mobile-menu" transition:fly={{ x: 300, duration: 300 }}>
        <div class="close-btn">
            <img src="/img/icons/modal-close.svg" alt="Close modal" width="36" height="36" on:click={ close } on:keydown> 
        </div>
        <slot />
    </div>
{/if}

<style>
    .mobile-menu {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        z-index: 100;
        padding: 2em 1em 0 1em;
        background-color: var(--purple);
        color: white;
        visibility: visible;
        overflow-y: auto;
    }

    .mobile-menu .close-btn {
        display: block;
        position: absolute;
        cursor: pointer;
        top: 1em;
        right: 1em;
        width: 36px;
        height: 36px;
    }

    :global(.mobile-menu nav a) {
        margin: 0;
        font-size: 3em;
        font-weight: 600;
    }
</style>