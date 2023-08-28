<script lang="ts">
    import { Button } from "$lib/components"
	import Header from "$lib/components/Header.svelte"
    import Heading from "$lib/components/Heading.svelte"
</script>

<svelte:head>
	<title>Время Карьеры – Онлайн марафон</title>
</svelte:head>

<main>
    <section class="intro">
        <Header>
            <a href="/">О марафоне</a>
            <a href="/">Для кого</a>
            <a href="/">Программа</a>
        </Header>
        <div class="content">
            <img src="/img/marathon.svg" alt="online-marathon" class="marathon-text" />
            <Heading className="large" margin={{ top: 0, bottom: 0.35 }} level={ 1 }>Время карьеры</Heading>
            <p class="button-text"><b>НОЯБРЬ 2023</b></p>
            <p class="button-text intro-content">
                Карьерные эксперты, руководители и HR-менеджеры крупных компаний расскажут, каких сотрудников хантят
                в первую очередь, как сделать продающее резюме,
                и как влюбить в себя HR на собеседовании.
            </p>
            <Button>Регистрация</Button>
        </div>
    </section>
</main>
