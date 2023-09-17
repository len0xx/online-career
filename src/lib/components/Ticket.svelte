<script lang="ts">
	import Card from "./Card.svelte"

    export let image: string
    export let opacity: number | null = null
    export let transform: string | null = null
    export let zIndex: number | null = null
</script>

<Card color="grey" className="ticket" padding={{ x: 4, y: 4, right: 6 }} { opacity } { transform } { zIndex }>
    <div class="ticket-content align-left">
        <div class="text-content">
            <slot />
        </div>
        <img class="ticket-cover" src={ image } alt="Ticket cover" width="336" height="336">
    </div>
</Card>

<style>
    :global(.card.ticket) {
        width: 1176px;
        min-height: 480px;
        background-image: url("/img/ticket-bg.svg");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: 100% 0;
    }

    .ticket-content {
        display: grid;
        grid-template-columns: 1fr 336px;
        gap: 6em;
        color: var(--dark);
    }

    .ticket-content > .text-content {
        display: grid;
        position: relative;
        gap: 1em;
        align-content: space-between;
    }

    :global(.ticket-content > div > p.ticket-caption) {
        color: #717278;
        font-weight: 500;
        line-height: 1.6;
    }

    .ticket-cover {
        border-radius: var(--radius);
    }
</style>