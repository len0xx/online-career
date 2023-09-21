<script lang="ts">
    import { Button, Grid, Heading, Input } from '$lib/components'
    import Form from '$lib/components/Form.svelte'
    import { apiRoute } from '$lib/utilities'
</script>

<svelte:head>
    <title>Вход в личный кабинет</title>
</svelte:head>

<div class="align-center">
    <Heading level={2} margin={{ bottom: 0.4 }}>Вход</Heading>
    <Form action={ apiRoute('user/auth') } method="POST" className="fix-width" successText="Вы успешно авторизованы">
        <Grid m={1}>
            <p>Нет аккаунта? <a class="green-link" href="/reg">Регистрация</a></p>
            <Input name="email" id="email" placeholder="Email" type="email" />
            <Input name="password" id="password" placeholder="Пароль" type="password" />
            <p><a href="/restore">Забыли пароль?</a></p>
            <Button wide shadow>Войти</Button>
        </Grid>
    </Form>
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
