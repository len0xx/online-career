<script lang="ts">
    import { Button, Grid, Heading, Input } from '$lib/components'
    import Form from '$lib/components/Form.svelte'
    import { apiRoute } from '$lib/utilities'
</script>

<svelte:head>
    <title>Забыли пароль</title>
</svelte:head>

<div class="align-center">
    <Heading level={2} margin={{ bottom: 0.4 }}>Забыли пароль</Heading>
    <Form action={ apiRoute('user/forgot-pass') } className="fix-width">
        <Grid m={1}>
            <p>
                Введите e-mail, указанный при регистрации и мы отправим на него письмо с ссылкой для
                восстановления пароля
            </p>
            <Input name="email" id="email" placeholder="Email" type="email" />
            <Button wide shadow>Отправить письмо</Button>
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
