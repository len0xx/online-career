<script lang="ts">
    import { Button, Form, Grid, Heading, Input } from '$lib/components'
    import { apiRoute } from '$lib/utilities'
    import { onMount } from 'svelte'

    let pageOk = true
    let urlParams: URLSearchParams | null = null

    onMount(() => {
        urlParams = new URLSearchParams(window.location.search)
        if (!urlParams.has('code')) pageOk = false
    })
</script>

<svelte:head>
    <title>Установка нового пароля</title>
</svelte:head>

<div class="align-center">
    {#if pageOk}
        <Heading level={2} margin={{ bottom: 0.4 }}>Придумайте пароль</Heading>
        <Form action={apiRoute('user/set-pass')} method="POST" className="fix-width">
            <input type="hidden" name="code" value={urlParams ? urlParams.get('code') : ''} />
            <Grid m={1}>
                <p>Придумайте новый пароль для входа в личный кабинет</p>
                <Input name="password" id="password" placeholder="Пароль" type="password" />
                <Input
                    name="passwordRepeat"
                    id="passwordRepeat"
                    placeholder="Повторите пароль"
                    type="password"
                />
                <Button wide shadow>Установить пароль</Button>
            </Grid>
        </Form>
    {:else}
        <Heading level={2}>Ошибка</Heading>
        <p>Кажется, код, необходимый для восстановления пароля, отсутствует</p>
        <p><a href="/" class="green-link">Вернуться на главную</a></p>
    {/if}
</div>

<style>
    :global(form) {
        margin: 0 auto;
    }

    @media screen and (min-width: 769px) {
        :global(form.fix-width) {
            max-width: 456px;
        }
    }
</style>
