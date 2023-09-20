<script lang="ts">
    import { Header, Grid, Footer, Partner } from '$lib/components'
</script>

<section class="auth">
    <div class="content-wrapper">
        <Header>
            <svelte:fragment slot="left">
                <a href="/">
                    <img src="/img/logo/careertime-white.svg" alt="Время Карьеры" />
                </a>
            </svelte:fragment>
        </Header>
        <div class="content">
            <slot />
        </div>
    </div>
    <Footer className="auth-page">
        <Grid m={2} s={1} gap={1} mobileGap={3}>
            <div class="contacts">
                <a href="https://vk.com/timeforcareer" target="_blank"
                    ><img src="/img/logo/vk.svg" alt="VK link" /></a
                >
                <a href="https://t.me/timeforcareer" target="_blank"
                    ><img src="/img/logo/tg.svg" alt="Telegram link" /></a
                >
                <br class="pc-hide" />
                <br class="pc-hide" />
                <br class="pc-hide" />
                <a href="mailto:friend@urfu.ru" target="_top" class="email">friend@urfu.ru</a>
            </div>
            <div class="partners">
                <a href="https://времякарьеры.рф" target="_blank"
                    ><Partner src="/img/logo/careertime-black.svg" /></a
                ><br class="pc-hide" />
                <a href="https://urfu.ru" target="_blank"
                    ><Partner src="/img/logo/urfu-black.svg" /></a
                ><br class="pc-hide" />
                <a href="https://myrosmol.ru" target="_blank"
                    ><Partner src="/img/logo/rosmol-black.svg" /></a
                >
            </div>
        </Grid>
    </Footer>
</section>

<style>
    section.auth {
        display: grid;
        position: relative;
        align-content: space-between;
        gap: 1em;
        width: 100%;
        padding: 0;
        color: white;
        background-color: var(--purple);
        min-height: 100vh;
    }

    @media screen and (min-width: 768px) {
        section.auth {
            min-height: max(100vh, 600px);
            background-image: url('/img/login-bg.svg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        }
    }

    div.contacts > a {
        display: inline-block;
        vertical-align: middle;
    }

    div.contacts > a:not(:last-child) {
        margin-right: 1em;
    }

    div.partners {
        text-align: right;
    }

    a.email {
        font-size: var(--medium);
    }

    div.partners > a:not(:last-child) {
        margin-right: 0.5em;
    }

    @media screen and (max-width: 768px) {
        a.email {
            font-size: var(--header-3);
        }

        div.contacts {
            text-align: center;
        }

        div.partners {
            text-align: center;
        }

        :global(div.partners .partner-logo) {
            margin-bottom: 1em;
        }
    }
</style>
