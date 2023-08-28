<script lang="ts">
    import { Button } from "$lib/components"
	import Card from "$lib/components/Card.svelte"
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
            <br />
            <Button variant="arrow">Регистрация</Button>
        </div>
    </section>
    <section class="program">
        <div class="content">
            <Heading level={ 1 }>В программе онлайн-марафона</Heading>
        </div>
    </section>
    <section class="info">
        <div class="content">
            <div class="grid-1-1-2">
                <Card color="black" className="black-card-1">
                    <Heading margin={{ y: 0 }} level={ 3 }>10</Heading>
                    <p class="button-text no-margin">онлайн-лекций</p>
                </Card>
                <Card color="black" className="black-card-2">
                    <Heading margin={{ y: 0 }} level={ 3 }>10</Heading>
                    <p class="button-text no-margin">топовых спикеров</p>
                </Card>
                <Card color="black" className="black-card-3">
                    <Heading margin={{ y: 0 }} level={ 2 }>∞</Heading>
                    <p class="button-text no-margin">лайфхаков для твоей карьеры</p>
                </Card>
            </div>
        </div>
    </section>
</main>
