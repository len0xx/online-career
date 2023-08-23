<script lang="ts">
    type Variant = 'standard' | 'arrow'

    export let variant: Variant = 'standard'
    export let className = ''

    const variantClass = `${ variant }-variant`
</script>

<button 
    on:click
    on:mouseover
    on:focus
    on:blur
    class={ [ className, variantClass ].filter((c) => !!c.length).join(' ') }
>
    <slot />
</button>

<style>
    button {
        background-color: var(--green);
        color: black;
        border-radius: var(--radius);
        padding: 1em 2em;
        border: none;
        cursor: pointer;
        transition: 0.1s ease-in-out;
        font-family: 'Gilroy', sans-serif;
        font-size: var(--button-text);
    }

    button:hover {
        background-color: var(--darker-green);
    }

    button.purple-btn {
        background-color: var(--purple);
    }

    button.purple-btn:hover {
        background-color: var(--darker-purple);
    }
</style>
