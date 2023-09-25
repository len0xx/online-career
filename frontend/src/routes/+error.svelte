<script lang="ts">
    import { page } from '$app/stores'
    import { Header, Footer, Grid, Partner, Heading } from '$lib/components'
</script>

<Header className="pc-hide">
    <svelte:fragment slot="left">
        <a href="/">
            <img src="/img/logo/careertime.svg" alt="Logo" height="36" />
        </a>
    </svelte:fragment>
</Header>
<section class="error-page">
    <Header className="mobile-hide">
        <svelte:fragment slot="left">
            <a href="/">
                <img src="/img/logo/careertime.svg" alt="Logo" />
            </a>
        </svelte:fragment>
    </Header>
    <div class="content">
        <Heading level={2} margin={{ top: 0, bottom: 0.5 }} className="align-center"
            >Ошибка {$page.status}:<br class="pc-hide" /> {$page.error.message}</Heading
        >
        <p class="align-center">
            <a href="/" class="green-darker-link">Вернуться на главную</a>
        </p>
    </div>
</section>
<Footer>
    <Grid m={2} s={1} gap={1} mobileGap={3}>
        <div class="contacts">
            <a href="https://vk.com/timeforcareer" target="_blank" rel="noreferrer"
                ><img src="/img/logo/vk.svg" alt="VK link" /></a
            >
            <a href="https://t.me/timeforcareer" target="_blank" rel="noreferrer"
                ><img src="/img/logo/tg.svg" alt="Telegram link" /></a
            >
            <br class="pc-hide" />
            <br class="pc-hide" />
            <br class="pc-hide" />
            <a href="mailto:friend@urfu.ru" target="_top" class="email">friend@urfu.ru</a>
        </div>
        <div class="partners">
            <a href="https://времякарьеры.рф" target="_blank" rel="noreferrer"
                ><Partner src="/img/logo/careertime-black.svg" /></a
            ><br class="pc-hide" />
            <a href="https://urfu.ru" rel="noreferrer" target="_blank"
                ><Partner src="/img/logo/urfu-black.svg" /></a
            ><br class="pc-hide" />
            <a href="https://myrosmol.ru" rel="noreferrer" target="_blank"
                ><Partner src="/img/logo/rosmol-black.svg" /></a
            >
        </div>
    </Grid>
</Footer>

<style>
    section.error-page {
        padding-top: 0;
        min-height: calc(100vh - 308px);
    }

    section.error-page > .content {
        padding: 3em 0;
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
        section.error-page {
            min-height: calc(100svh - 600px);
        }

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
