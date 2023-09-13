<script>
	import { Button } from "."
</script>

<header>
    <div class="header-content">
        <div>
            <slot name="left" />
        </div>
        <nav>
            <slot />
        </nav>
        <div>
            <slot name="right" />
        </div>
    </div>
</header>

<style>
    header {
        padding: 1.5em 0;
    }

    :global(header nav > a) {
        position: relative;
        color: var(--dark);
        transition: 0.1s ease-in-out;
        font-weight: 500;
    }

    :global(header nav > a:not(:last-child)) {
        margin-right: 1.5em;
    }

    :global(header nav > a::after) {
        content: "";
        display: block;
        position: absolute;
        width: 100%;
        height: 9px;
        top: 110%;
        left: 0;
        transition: 0.1s ease-in-out;
        opacity: 0;
        background-image: url("/img/icons/underline.svg");
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
    }

    :global(header nav > a:hover) {
        color: var(--purple);
    }

    :global(header nav > a:hover::after) {
        opacity: 1;
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
