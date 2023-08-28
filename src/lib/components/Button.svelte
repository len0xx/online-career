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
    <span class="text-wrapper">
        <slot />
    </span>
</button>

<style>
    button {
        display: inline-block;
        position: relative;
        background-color: var(--green);
        color: black;
        border-radius: var(--radius);
        padding: 1em 2em;
        border: none;
        cursor: pointer;
        transition: 0.1s ease-in-out;
        font-size: var(--text-size);
        font-family: 'Gilroy', sans-serif;
        transition: 0.1s ease-in-out;
        font-weight: 500;
    }
    button > .text-wrapper {
        position: relative;
        z-index: 10;
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
    button.arrow-variant {
        padding: 1.5em 6em;
    }
    button.arrow-variant::before {
        content: '';
        display: block;
        position: absolute;
        top: 0.4em;
        left: 0.4em;
        height: calc(100% - 0.8em);
        border-radius: 100em;
        width: 3.4em;
        padding: 1em 1.7em;
        background-color: var(--dark);
        box-sizing: border-box;
        transition: 0.2s ease-in-out;
        z-index: 9;
    }
    button.arrow-variant::after {
        content: '';
        display: block;
        position: absolute;
        top: 0.4em;
        left: 0.4em;
        height: calc(100% - 0.8em);
        border-radius: 100em;
        padding: 1em 1.7em;
        box-sizing: border-box;
        background-image: url("/img/icons/arrow.svg");
        background-repeat: no-repeat;
        background-size: 36%;
        background-position: center;
        z-index: 11;
    }
    button.arrow-variant:hover {
        color: white;
    }
    button.arrow-variant:hover::before {
        width: calc(100% - 0.8em);
    }
</style>
