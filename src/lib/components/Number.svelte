<script lang="ts">
</script>

<div class="number">
    <slot />
</div>

<style>
    .number {
        display: inline-block;
        position: relative;
        background-color: var(--purple);
        color: white;
        border-radius: 50%;
        padding: 0.6em 0.9em 0.55em 0.9em;
        font-size: var(--button-text);
        min-width: 56px;
        line-height: 1;
        text-align: center;
    }

    @media screen and (max-width: 768px) {
        .number {
            min-width: 36px;
        }
    }
</style>
