<script lang="ts">
	import Button from "$lib/components/Button.svelte"
	import Grid from "$lib/components/Grid.svelte"
	import Heading from "$lib/components/Heading.svelte"
	import Input from "$lib/components/Input.svelte"
</script>

<svelte:head>
    <title>Забыли пароль</title>
</svelte:head>

<div class="align-center">
    <Heading level={ 2 } margin={{ bottom: 0.4 }}>Забыли пароль</Heading>
    <form action="" class="fix-width">
        <Grid m={ 1 }>
            <p>Введите e-mail, указанный при регистрации и мы отправим на него письмо с ссылкой для восстановления пароля</p>
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