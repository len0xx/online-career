<script lang="ts">
    import { Button, Form, Grid, Heading, Input } from '$lib/components'
    import { apiRoute } from '$lib/utilities'
</script>

<svelte:head>
    <title>Регистрация</title>
</svelte:head>

<div class="align-center">
    <Heading level={2} margin={{ bottom: 0.4 }}>Регистрация</Heading>
    <Form action={ apiRoute('user/create') } method="POST" className="fix-width">
        <Grid m={1}>
            <p>Уже есть аккаунт? <a class="green-link" href="/login">Войти</a></p>
            <Input name="lastName" placeholder="Фамилия" />
            <Input name="firstName" placeholder="Имя" />
            <Input name="patronimyc" placeholder="Отечество" />
            <Input name="region" placeholder="Регион" />
            <Input name="status" placeholder="Статус" />
            <Input name="phone" placeholder="Номер телефона" />
            <Input name="email" placeholder="E-mail" />
            <small>
                Нажимая на кнопку «Регистрация» Вы даете свое согласие на обработку Ваших
                персональных данных, в соответствии с №152-ФЗ «О персональных данных» от 27.07.2006
                года
            </small>
            <Button wide shadow>Регистрация</Button>
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
