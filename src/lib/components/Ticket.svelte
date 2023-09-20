<script lang="ts">
    import { Card } from '$lib/components'

    export let image: string
    export let opacity: number | null = null
    export let transform: string | null = null
    export let zIndex: number | null = null
</script>

<Card color="grey" className="ticket" {opacity} {transform} {zIndex}>
    <div class="ticket-content align-left">
        <div class="text-content">
            <slot />
        </div>
        <img class="ticket-cover" src={image} alt="Ticket cover" />
    </div>
</Card>

<style>
    :global(.card.ticket) {
        width: 1176px;
        min-height: 480px;
        padding: 4em 6em 4em 4em !important;
        background-image: url('/img/ticket-bg.svg');
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
        width: 336px;
        height: 336px;
        border-radius: var(--radius);
    }

    @media screen and (max-width: 768px) {
        :global(.card.ticket) {
            padding: 2em !important;
            width: unset;
            min-height: unset;
            background-image: url('/img/mobile-ticket-bg.svg');
            background-position: 0 100%;
        }

        .ticket-content {
            grid-template-columns: 1fr;
            gap: 1.5em;
        }

        .ticket-content > .text-content {
            text-align: center;
        }

        .ticket-cover {
            width: 248px;
            height: 248px;
            margin: 0 auto;
        }
    }
</style>
