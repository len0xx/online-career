<script lang="ts">
    import { Grid, Button, Header, Footer, Partner } from '$lib/components'
    import MobileMenu from '$lib/components/MobileMenu.svelte'
    import { apiRoute, redirect } from '$lib/utilities'
    import { mobileMenu } from '$lib/stores'
    import type { LayoutServerData } from './$types'
    import IconButton from '$lib/components/IconButton.svelte'

    export let data: LayoutServerData
    $: user = data.user

    const logout = async () => {
        const res = await fetch(apiRoute('user/logout'), { credentials: 'include' })
        const response = await res.json()

        if (response.ok) {
            redirect('/')
        }
    }
</script>

<MobileMenu bind:this={$mobileMenu}>
    <div class="mobile-menu-content">
        <nav>
            <div><a href="/" on:click={$mobileMenu.close}>Главная страница</a></div>
            <div><a href="/account" on:click={$mobileMenu.close}>Моя программа</a></div>
            <div><a href="/account/notifications" on:click={$mobileMenu.close}>Уведомления</a></div>
        </nav>
        <div class="auth-buttons">
            <Button color="green" wide shadow on:click={logout}>Выйти</Button>
        </div>
    </div>
</MobileMenu>
<Header className="mobile-hide">
    <svelte:fragment slot="left">
        <a href="/">
            <img src="/img/logo/careertime.svg" alt="Logo" />
        </a>
    </svelte:fragment>
    <svelte:fragment>
        <a href="/account">Моя программа</a>
        <a href="/account/notifications">Уведомления</a>
    </svelte:fragment>
    <svelte:fragment slot="right">
        {#if user}
            <Button shadow>{user.firstName}</Button>
        {/if}
        <Button shadow color="white" on:click={logout}>Выйти</Button>
    </svelte:fragment>
</Header>
<Header className="pc-hide">
    <svelte:fragment slot="left">
        <a href="/">
            <img src="/img/logo/careertime.svg" alt="Logo" />
        </a>
    </svelte:fragment>
    <svelte:fragment slot="right">
        <IconButton src="/img/hamburger.svg" on:click={$mobileMenu.open} />
    </svelte:fragment>
</Header>
<section class="account-page">
    <div class="content">
        <Button wide shadow className="pc-hide">{ user.firstName }</Button>
        <br class="pc-hide" />
        <br class="pc-hide" />
        <br class="pc-hide" />
        <slot />
    </div>
</section>
<Footer>
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
            <a href="https://urfu.ru" target="_blank"><Partner src="/img/logo/urfu-black.svg" /></a
            ><br class="pc-hide" />
            <a href="https://myrosmol.ru" target="_blank"
                ><Partner src="/img/logo/rosmol-black.svg" /></a
            >
        </div>
    </Grid>
</Footer>

<style>
    section.account-page {
        min-height: 60vh;
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
