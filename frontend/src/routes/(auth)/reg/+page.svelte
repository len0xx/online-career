<script lang="ts">
    import { Button, Form, Modal, Grid, Heading, Input } from '$lib/components'
    import { apiRoute } from '$lib/utilities'

    let modal: { open: () => void, close: () => void } | null = null
</script>

<svelte:head>
    <title>Регистрация</title>
</svelte:head>

<Modal align="center" bind:this={ modal }>
    <Grid m={1}>
        <Heading level={4} margin={{ y: 0 }}>
            Подтвердите e-mail и задайте пароль для входа в личный кабинет
        </Heading>
        <p class="button-text no-margin">
            В личном кабинете вы сможете
            выбрать лекции, которые планируете посмотреть и мы вам о них напомним
        </p>
        <Button on:click={ modal.close }>Хорошо</Button>
    </Grid>
</Modal>
<div class="align-center">
    <Heading level={2} margin={{ bottom: 0.4 }}>Регистрация</Heading>
    <Form action={ apiRoute('user/create') } method="POST" className="fix-width" on:success={ modal.open }>
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
