<script lang="ts">
    import { Button } from "$lib/components"
	import Card from "$lib/components/Card.svelte"
	import Checkbox from "$lib/components/Checkbox.svelte";
	import Emote from "$lib/components/Emote.svelte";
	import Grid from "$lib/components/Grid.svelte";
	import Header from "$lib/components/Header.svelte"
    import Heading from "$lib/components/Heading.svelte"
	import Item from "$lib/components/Item.svelte";
	import Number from "$lib/components/Number.svelte"
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
            <p class="button-text align-center">
                Трудоустройство и исполнение всех<br />
                желаний не обещаем, но поможем прокачать резюме<br />
                и подготовиться к собеседованию
            </p>
            <p class="align-center">
                <Button shadow>Бесплатно, но с регистрацией</Button>
            </p>
        </div>
    </section>
    <br />
    <br />
    <br />
    <br />
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
            <br />
            <br />
            <br />
            <div class="grid-gallery">
                <Card className="gallery-purple" color="purple">
                    <Heading level={ 1 } margin={{ y: 0, top: 0.4 }} lineHeight={ 1 } className="success-title">
                        <span style="position: relative; z-index: 1;">Путь к <span style="opacity: 0">успеху</span> начинается здесь</span>
                    </Heading>
                </Card>
                <Card className="gallery-one" color="white">
                    <div>
                        <Number>1</Number><br />
                        <p class="button-text">Заполни форму</p>
                    </div>
                    <Button shadow>Регистрация</Button>
                </Card>
                <Card className="gallery-two" color="white">
                    <Number>2</Number><br />
                    <p class="button-text">
                        Смотри все<br />
                        онлайн-лекции<br />
                        и допматериалы
                    </p>
                </Card>
                <Card className="gallery-three" color="white">
                    <Number>3</Number><br />
                    <p class="button-text">
                        Выполняй домашние<br />
                        и практические задания
                    </p>
                </Card>
                <Card className="gallery-four" color="white">
                    <Number>4</Number><br />
                    <p class="button-text">
                        Помимо знаний<br />
                        и новых скиллов получай призы
                    </p>
                </Card>
                <Card className="gallery-five" color="white">
                    <Number>5</Number><br />
                    <p class="button-text">
                        Поздравляем, ты готов<br />
                        к работе мечты!
                    </p>
                </Card>
            </div>
            <br />
            <br />
            <br />
            <Card color="green" className="black-text giveaway">
                <Grid m={1}>
                    <Grid m={2}>
                        <Heading level={ 4 } margin={{ top: 0.5 }}>
                            В отличие от других<br />
                            онлайн-марафонов, воздух продавать не будем,<br />
                            но подарки подготовили:
                        </Heading>
                    </Grid>
                    <Grid m={4}>
                        <Item image="/img/gifts/sweatshirt.png" bubble="x10">Фирменный мерч</Item>
                        <Item image="/img/gifts/speaker.png" bubble="x5">Яндекс-станция мини</Item>
                        <Item image="/img/gifts/airpods.png" bubble="x3">Наушники Airpods</Item>
                        <Item image="/img/gifts/iphone.png" bubble="x1">iPhone 14</Item>
                    </Grid>
                    <br />
                    <p class="button-text align-center giveaway-signup">
                        Вот форма, которую нужно заполнить, чтобы стать участником<br />
                        розыгрыша подарков и получить полезные материалы.
                    </p>
                    <br />
                    <Button color="purple" className="white-text">Регистрация</Button>
                </Grid>
            </Card>
        </div>
    </section>
    <br />
    <br />
    <br />
    <br />
    <section class="audience">
        <div class="content">
            <Grid m={2}>
                <div>
                    <Heading level={ 2 } margin={{ top: 0, bottom: 0.7 }} className="audience-title">
                        Онлайн-марафон<br />
                        <span style="opacity: 0;">для тех</span>, кто
                    </Heading>
                    <img src="/img/man.png" alt="Иллюстрация" height="600" />
                </div>
                <div>
                    <Grid m={3} placeItems="start">
                        <Emote image="/img/emotes/emote-1.png">Учится на старших курсах</Emote>
                        <Emote image="/img/emotes/emote-2.png">Учится на младших курсах</Emote>
                        <Emote image="/img/emotes/emote-3.png">Не учится, но числится</Emote>
                        <Emote image="/img/emotes/emote-4.png">Мечтатели</Emote>
                        <Emote image="/img/emotes/emote-5.png">Реалисты</Emote>
                        <Emote image="/img/emotes/emote-6.png">В поисках работы</Emote>
                        <Emote image="/img/emotes/emote-7.png">Думает<br /> о предстоящем<br /> поиске работы</Emote>
                        <Emote image="/img/emotes/emote-8.png">Думает о том,<br /> как его достал<br /> начальник</Emote>
                        <Emote image="/img/emotes/emote-9.png">Читает этот текст</Emote>
                    </Grid>
                    <br />
                    <br />
                    <Button shadow wide variant="arrow">Успешный успех по ссылке</Button>
                </div>
            </Grid>
        </div>
    </section>
    <br />
    <br />
    <br />
    <br />
    <br />
    <section class="checkboxes">
        <div class="content">
            <Card color="purple" className="checkboxes">
                <Heading level={ 2 } margin={{ top: 0.25 }}>
                    Отметь то, что<br />
                    тебе подходит
                </Heading>
                <div class="checkboxes-wrapper">
                    <Checkbox name="1">Скоро диплом – а потом что?</Checkbox>
                    <Checkbox name="2">А разве «работа с высокой зп и классным боссом» это не миф?</Checkbox>
                    <Checkbox name="3">Как в 2023 вообще найти работу?</Checkbox>
                    <Checkbox name="4">Кажется, я потерял себя</Checkbox>
                    <Checkbox name="5">Везде требуют опыт, а если опыта нет?</Checkbox>
                    <Checkbox name="6">А есть вакансии не в колл-центре?</Checkbox>
                    <Checkbox name="7">Кажется, светит только «свободная касса»</Checkbox>
                    <Checkbox name="8">В резюме всего одна строчка, при условии, что получу диплом</Checkbox>
                    <Checkbox name="9">Сплошные отказы, как быть?</Checkbox>
                    <Checkbox name="10">Где эта ваша «работа мечты»?</Checkbox>
                    <Checkbox name="11">Хочу быть фрилансером, но не знаю с чего начать</Checkbox>
                    <Checkbox name="12">Как хобби превратить в работу?</Checkbox>
                    <Checkbox name="13">Мечтаю о работе в технологичном стартапе, но пока есть только папин гараж</Checkbox>
                </div>
            </Card>
        </div>
    </section>
</main>