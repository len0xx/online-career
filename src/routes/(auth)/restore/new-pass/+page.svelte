<script lang="ts">
	import Button from "$lib/components/Button.svelte"
	import Grid from "$lib/components/Grid.svelte"
	import Heading from "$lib/components/Heading.svelte"
	import Input from "$lib/components/Input.svelte"
</script>

<svelte:head>
    <title>Установка нового пароля</title>
</svelte:head>

<div class="align-center">
    <Heading level={ 2 } margin={{ bottom: 0.4 }}>Придумайте пароль</Heading>
    <form action="" class="fix-width">
        <Grid m={ 1 }>
            <p>Придумайте новый пароль для входа в личный кабинет</p>
            <Input name="password" id="password" placeholder="Пароль" type="password" />
            <Input name="passwordRepeat" id="passwordRepeat" placeholder="Повторите пароль" type="password" />
            <Button wide shadow>Установить пароль</Button>
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