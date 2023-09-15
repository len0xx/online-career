<script lang="ts">
	import Card from "./Card.svelte"

    export let image: string
    export let opacity: number | null = null
    export let transform: string | null = null
    export let zIndex: number | null = null
</script>

<Card color="grey" className="ticket" padding={{ x: 4, y: 4, right: 6 }} { opacity } { transform } { zIndex }>
    <div class="ticket-content align-left">
        <div>
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
        background-size: 41%;
        background-repeat: no-repeat;
        background-position: 100% 0;
        transition: 0.35s ease-in-out;
    }

    .ticket-content {
        display: grid;
        grid-template-columns: 1fr 336px;
        gap: 6em;
        color: var(--dark);
    }

    :global(.ticket-content > div > p) {
        line-height: 1.6;
    }

    .ticket-cover {
        border-radius: var(--radius);
    }
</style>