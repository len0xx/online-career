<script lang="ts">
    export let className = ''
    export let shadow = false
    export let src: string

    $: shadowClass = shadow ? 'with-shadow' : ''
</script>

<button 
    on:click
    on:mouseover
    on:focus
    on:blur
    class={ [ className, shadowClass ].filter((c) => !!c.length).join(' ') }
>
    <img src={ src } alt="Button icon">
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
    }

    button > img {
        width: 20px;
        height: 20px;
    }

    button {
        background-color: var(--green);
    }

    button:hover {
        background-color: var(--darker-green);
    }
</style>