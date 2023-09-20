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
            <Input name="email" id="email" placeholder="Email" type="email" />
            <Input name="password" id="password" placeholder="Пароль" type="password" />
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