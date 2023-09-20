<script lang="ts">
    export let src: string
    export let alt = ''
    export let background = true
    export let className = ''

    $: bgClass = background ? 'white-bg' : ''
</script>

<div class={['partner-logo', className, bgClass].filter((c) => !!c).join(' ')}>
    <img {src} {alt} />
</div>

<style>
    .partner-logo {
        display: inline-block;
        position: relative;
        padding: 0.8em 1.5em 0.7em 1.5em;
        border-radius: calc(var(--radius) / 2);
    }

    .partner-logo > img {
        height: 32px;
    }

    @media screen and (max-width: 768px) {
        .partner-logo.white-bg {
            min-width: 156px;
            padding: 1.2em 2em;
        }

        .partner-logo:not(.white-bg) {
            padding: 0;
        }

        .partner-logo > img {
            margin: 0 auto;
            height: auto;
            max-height: 28px;
            max-width: 100px;
        }

        .partner-logo:not(.white-bg):not(:last-child) {
            margin-right: 2em;
        }
    }

    .partner-logo.white-bg {
        background-color: white;
    }
</style>
