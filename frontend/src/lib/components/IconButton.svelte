<script lang="ts">
    type Size = 'S' | 'L'
    
    export let className = ''
    export let shadow = false
    export let src: string
    export let size: Size = 'S'

    $: sizeClass = size === 'S' ? 'small-size' : 'large-size'
    $: shadowClass = shadow ? 'has-shadow' : ''
</script>

<button
    on:click
    on:mouseover
    on:focus
    on:blur
    class={[className, shadowClass, sizeClass].filter((c) => !!c.length).join(' ')}
>
    <img {src} alt="Button icon" />
</button>

<style>
    button {
        display: inline-grid;
        position: relative;
        place-content: center;
        place-items: center;
        background-color: var(--green);
        border-radius: 50%;
        width: 40px;
        height: 40px;
        border: none;
        cursor: pointer;
        transition: 0.1s ease-in-out;
        box-sizing: border-box;
        vertical-align: middle;
    }

    button.large-size {
        width: 64px;
        height: 64px;
    }

    button > img {
        width: 20px;
        height: 20px;
    }

    button.large-size > img {
        width: 32px;
        height: 32px;
    }

    button {
        background-color: var(--green);
    }

    button:hover {
        background-color: var(--darker-green);
    }
</style>
