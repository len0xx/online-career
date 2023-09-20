<script lang="ts">
	import Button from "$lib/components/Button.svelte"
	import Grid from "$lib/components/Grid.svelte"
	import Heading from "$lib/components/Heading.svelte"
	import Input from "$lib/components/Input.svelte"
</script>

<svelte:head>
    <title>Регистрация</title>
</svelte:head>

<div class="align-center">
    <Heading level={ 2 } margin={{ bottom: 0.4 }}>Регистрация</Heading>
    <form action="" class="fix-width">
        <Grid m={ 1 }>
            <p>Уже есть аккаунт? <a class="green-link" href="/login">Войти</a></p>
            <Input name="lastName" placeholder="Фамилия" />
            <Input name="firstName" placeholder="Имя" />
            <Input name="patronimyc" placeholder="Отечество" />
            <Input name="region" placeholder="Регион" />
            <Input name="status" placeholder="Статус" />
            <Input name="phone" placeholder="Номер телефона" />
            <Input name="email" placeholder="E-mail" />
            <small>
                Нажимая на кнопку «Регистрация» Вы даете свое согласие
                на обработку Ваших персональных данных, в соответствии
                с №152-ФЗ «О персональных данных» от 27.07.2006 года
            </small>
            <Button wide shadow>Регистрация</Button>
        </Grid>
    </form>
</div>

<style>
    form {
        margin: 0 auto;
    }

    @media screen and (min-width: 769px) {
        form.fix-width {
            max-width: 456px;
        }
    }
</style>