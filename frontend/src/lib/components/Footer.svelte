<script lang="ts">
    export let className = ''
</script>

<footer class={className}>
    <div class="footer-content">
        <slot />
    </div>
</footer>

<style>
    footer {
        display: block;
        position: relative;
        width: 100%;
        padding: 3em 0;
        margin-top: 6em;
        background-color: var(--dark);
        background-image: url('/img/footer-bg.svg');
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }

    footer.auth-page {
        margin: 0;
        background: transparent;
    }

    footer > .footer-content {
        display: block;
        position: relative;
        max-width: var(--content-width);
        color: white;
        margin: 0 auto;
    }

    @media screen and (max-width: 768px) {
        footer:not(.auth-page) {
            background-image: url('/img/mobile-footer-bg.svg');
            margin-top: 3em;
        }
    }
</style>
