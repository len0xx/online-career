<script lang="ts">
    type Variant = 'standard' | 'arrow' | 'link'
    type Color = 'transparent' | 'green' | 'purple' | 'white'

    export let variant: Variant = 'standard'
    export let color: Color = 'green'
    export let className = ''
    export let shadow = false
    export let wide = false

    $: variantClass = `${ variant }-variant`
    $: colorClass = `${ color }-btn`
    $: shadowClass = shadow ? 'with-shadow' : ''
    $: wideClass = wide ? 'full-width' : ''
</script>

<button 
    on:click
    on:mouseover
    on:focus
    on:blur
    class={ [ className, colorClass, variantClass, shadowClass, wideClass ].filter((c) => !!c.length).join(' ') }
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
        box-sizing: border-box;
    }

    button.full-width {
        width: 100%;
    }

    button > .text-wrapper {
        position: relative;
        z-index: 10;
    }
    button.with-shadow {
        box-shadow: var(--default-shadow);
    }

    button:hover {
        background-color: var(--darker-green);
    }

    button.green-btn {
        background-color: var(--green);
    }

    button.green-btn:hover {
        background-color: var(--darker-green);
    }

    button.white-btn {
        background-color: white;
        color: var(--dark);
    }

    button.white-btn.link-variant:hover {
        background-color: var(--green);
    }

    button.purple-btn {
        background-color: var(--purple);
    }

    button.purple-btn:hover {
        background-color: var(--darker-purple);
    }

    button.transparent-btn {
        padding: 1.5em 5em;
        border-radius: 100px;
        border: 2px solid var(--dark);
        background-color: transparent;
        color: var(--dark);
    }

    button.transparent-btn:hover {
        border: 2px solid var(--dark);
        background-color: var(--dark);
        color: white;
    }

    button.link-variant {
        padding: 1em 5em;
    }

    button.arrow-variant {
        padding: 1.5em 6em;
    }

    button.link-variant::before,
    button.arrow-variant::before {
        content: '';
        display: block;
        position: absolute;
        top: 0.4em;
        left: 0.4em;
        height: calc(100% - 0.8em);
        border-radius: 100em;
        background-color: var(--dark);
        box-sizing: border-box;
        transition: 0.2s ease-in-out;
        z-index: 9;
    }

    button.link-variant::before {
        width: 2.4em;
        padding: 1em 1.2em;
    }

    button.arrow-variant::before {
        width: 3.4em;
        padding: 1em 1.7em;
    }
    button.arrow-variant::after,
    button.link-variant::after {
        content: '';
        display: block;
        position: absolute;
        top: 0.4em;
        left: 0.4em;
        height: calc(100% - 0.8em);
        border-radius: 100em;
        box-sizing: border-box;
        background-repeat: no-repeat;
        background-position: center;
        transform: rotateX(0deg);
        transition: 0.2s ease-in-out;
        z-index: 11;
    }
    button.arrow-variant::after {
        padding: 1em 1.7em;
        background-size: 36%;
        background-image: url("/img/icons/arrow.svg");
    }
    button.link-variant::after {
        padding: 1em 1.2em;
        background-size: 50%;
        background-image: url("/img/icons/link.svg");
    }
    button.link-variant:hover,
    button.arrow-variant:hover {
        color: white;
    }

    button.link-variant:hover::before,
    button.arrow-variant:hover::before {
        width: calc(100% - 0.8em);
    }

    button.link-variant:hover::after {
        transform: rotateX(180deg);
    }
</style>
