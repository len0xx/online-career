<script>
	import { Button } from "."
</script>

<header>
    <div class="header-content">
        <a href="/"><img src="/img/logo/careertime.svg" alt="Logo" /></a>
        <nav>
            <slot />
        </nav>
        <Button>Регистрация</Button>
    </div>
</header>

<style>
    header {
        padding: 1.5em 0;
    }

    :global(header nav > a) {
        font-weight: 500;
    }

    :global(header nav > a:not(:last-child)) {
        margin-right: 1.5em;
    }

    header > .header-content {
        display: grid;
        grid-gap: 1em;
        grid-template-columns: repeat(3, auto);
        justify-content: space-between;
        align-items: center;
        position: relative;
        max-width: var(--content-width);
        margin: 0 auto;
    }
</style>
