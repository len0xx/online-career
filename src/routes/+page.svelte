<script lang="ts">
	import Button from '$lib/components/Button.svelte'
	import Card from '$lib/components/Card.svelte'
	import Checkbox from '$lib/components/Checkbox.svelte'
	import Emote from '$lib/components/Emote.svelte'
	import Grid from '$lib/components/Grid.svelte'
	import Header from '$lib/components/Header.svelte'
    import Heading from '$lib/components/Heading.svelte'
	import Input from '$lib/components/Input.svelte'
	import Item from '$lib/components/Item.svelte'
	import Number from '$lib/components/Number.svelte'
	import Speech from '$lib/components/Speech.svelte'
	import Modal from '$lib/components/Modal.svelte'
	import Partner from '$lib/components/Partner.svelte'
    import Ticket from '$lib/components/Ticket.svelte'
	import { onMount } from 'svelte'

    type ModalWindow = {
        open: () => void
        close: () => void
        toggle: () => void
    }

    let featuresElement: HTMLElement | null = null
    let modal: ModalWindow
    let scroll = 0
    let cursor = { x: 0, y: 0 }
    let featuresElementStart = 1000
    let featuresElementEnd = 3000

    $: parallax1 = `translateX(${ Math.sqrt(cursor.y) * 0.16372 }px) translateY(${ Math.sqrt(scroll) * 0.92471 }px)`
    $: parallax2 = `translateX(${ Math.sqrt(cursor.x) * 0.46832 + Math.sqrt(scroll) * -0.78121 }px) translateY(${ Math.sqrt(cursor.y) * 0.41485 }px)`
    $: parallax3 = `translateX(${ Math.sqrt(cursor.y) * 0.25172 * -1 + Math.sqrt(scroll) * 0.69481 }px) translateY(${ Math.sqrt(scroll) * 0.91382 }px)`
    $: parallax4 = `translateX(${ 20 + Math.sqrt(cursor.x) * 0.13485 * -1 }px)`

    const MAX_TRANSLATE = 900
    const SCALE_RANGE = 100
    const OPACITY_RANGE = 100
    const TICKET_STEP_LENGTH = 600
    const RANGE = TICKET_STEP_LENGTH - SCALE_RANGE
    const MAX_TRANSLATE_DECREASE_STEP = 50
    const MAX_SCALE_DECREASE_STEP = 0.1

    const tickets = [
        { opacity: 1, shown: true, zIndex: 1, transform: 'translateY(0) scale(1)', translate: 0, scale: 1 },
        { opacity: 0, shown: false, zIndex: 2, transform: 'translateY(900px) scale(1)', translate: 900, scale: 1 },
        { opacity: 0, shown: false, zIndex: 3, transform: 'translateY(900px) scale(1)', translate: 900, scale: 1 },
        { opacity: 0, shown: false, zIndex: 4, transform: 'translateY(900px) scale(1)', translate: 900, scale: 1 },
        { opacity: 0, shown: false, zIndex: 5, transform: 'translateY(900px) scale(1)', translate: 900, scale: 1 }
    ]

    const setTicketOpacity = (index: number, opacity: number) => tickets[index].opacity = opacity

    const applyTicketTransform = (index: number) => tickets[index].transform = `translateY(${ tickets[index].translate }px) scale(${ tickets[index].scale })`

    const setTicketTransform = (index: number, translate: number, scale: number) => {
        tickets[index].translate = translate
        tickets[index].scale = scale
        applyTicketTransform(index)
    }

    const applyAnimationOnTicket = (index: number, currentScroll: number) => {
        const TICKET_STOPS = [
            featuresElementStart,
            featuresElementStart + TICKET_STEP_LENGTH * 1,
            featuresElementStart + TICKET_STEP_LENGTH * 2,
            featuresElementStart + TICKET_STEP_LENGTH * 3,
            featuresElementStart + TICKET_STEP_LENGTH * 4,
        ]
        const passedPoints = [
            currentScroll > TICKET_STOPS[0],
            currentScroll > TICKET_STOPS[1],
            currentScroll > TICKET_STOPS[2],
            currentScroll > TICKET_STOPS[3],
            currentScroll > TICKET_STOPS[4]
        ]
        const lastPoint = passedPoints.reduce((acc, cur) => cur ? acc + 1 : acc, 0)
        const pointsLeft = passedPoints.length - lastPoint

        if (index > 0 && currentScroll < TICKET_STOPS[index - 1]) {
            // The ticket is not shown up yet

            setTicketOpacity(index, 0)
            setTicketTransform(index, 900, 1)
        }
        else if (index > 0 && currentScroll > TICKET_STOPS[index - 1] && currentScroll < TICKET_STOPS[index]) {
            // The ticket is in progress of animation

            const generalPercentage = (RANGE - (TICKET_STOPS[index] - SCALE_RANGE - scroll)) / RANGE < 1 ? (RANGE - (TICKET_STOPS[index] - SCALE_RANGE - scroll)) / RANGE : 1
            const opacityPercentage = (RANGE - (TICKET_STOPS[index] - SCALE_RANGE - OPACITY_RANGE - scroll)) / RANGE < 1 ? (RANGE - (TICKET_STOPS[index] - SCALE_RANGE - OPACITY_RANGE - scroll)) / RANGE : 1
            const translateValue = generalPercentage < 0.99 ? MAX_TRANSLATE - MAX_TRANSLATE * generalPercentage : 0

            setTicketOpacity(index, opacityPercentage)
            setTicketTransform(index, translateValue, 1)
        }
        else if ((index < (tickets.length - 1)) && currentScroll > (TICKET_STOPS[index + 1] - SCALE_RANGE) && currentScroll < TICKET_STOPS[index + 1]) {
            // The ticket is being scaled down

            const generalPercentage = (SCALE_RANGE - (TICKET_STOPS[index + 1] - currentScroll)) / SCALE_RANGE < 1 ? (SCALE_RANGE - (TICKET_STOPS[index + 1] - currentScroll)) / SCALE_RANGE : 1
            setTicketTransform(index, MAX_TRANSLATE_DECREASE_STEP * generalPercentage * -1, 1 - MAX_SCALE_DECREASE_STEP * generalPercentage)
        }
        else if ((index < (tickets.length - 1)) && currentScroll > TICKET_STOPS[index] && currentScroll < (TICKET_STOPS[index + 1] - SCALE_RANGE)) {
            // The ticket is static

            setTicketOpacity(index, 1)
            setTicketTransform(index, 0, 1)
        }
        else if (index < (tickets.length - 1) && lastPoint > 0) {
            // The ticket is already scaled down and hidden in a stack behind
            const translate = MAX_TRANSLATE_DECREASE_STEP * (tickets.length - (index + 1) - (pointsLeft)) * -1
            const scale = 1 - MAX_SCALE_DECREASE_STEP * (tickets.length - (index + 1) - (pointsLeft))
            setTicketTransform(index, translate, scale)
        }
    }

    const windowScroll = () => {
        const newScroll = window.scrollY

        if (newScroll >= featuresElementStart && newScroll < (featuresElementEnd + 100)) {
            for (let i = 0; i <= 4; i++) {
                applyAnimationOnTicket(i, newScroll)
            }
        }
        scroll = newScroll
    }

    const initialScroll = () => {
        if (featuresElement) {
            featuresElementStart = window.scrollY + featuresElement.getClientRects()[0].top
            featuresElementEnd = featuresElementStart + featuresElement.getClientRects()[0].height
        }
        windowScroll()
    }

    const mouseMove = (e: MouseEvent) => cursor = { x: e.pageX, y: e.pageY }

    onMount(initialScroll)
</script>

<svelte:window on:scroll={ windowScroll } on:mousemove={ mouseMove }></svelte:window>

<svelte:head>
	<title>Время Карьеры – Онлайн марафон</title>
</svelte:head>

<Modal align="center" bind:this={ modal }>
    <Grid m={ 1 }>
        <Heading level={ 4 } margin={{ y: 0 }}>Регистрация</Heading>
        <p class="button-text no-margin">
            Найти работу мечты можно по-разному: отправить запрос в космос, нарисовать карту желаний, попробовать свои силы на стажировках или просто заполнить эту форму.
        </p>
        <p class="no-margin">
            <span style:opacity="0.5">Уже есть аккаунт?</span> <a href="/">Войти</a>
        </p>
        <form method="POST" action="/api/signup">
            <Grid m={ 1 }>
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
                <Button>Регистрация</Button>
            </Grid>
        </form>
    </Grid>
</Modal>
<main>
    <section class="intro">
        <Header>
            <svelte:fragment slot="left">
                <a href="/"><img src="/img/logo/careertime.svg" alt="Logo" /></a>
            </svelte:fragment>
            <svelte:fragment>
                <a href="#about">О марафоне</a>
                <a href="#audience">Для кого</a>
                <a href="#program">Программа</a>
            </svelte:fragment>
            <svelte:fragment slot="right">
                <Button shadow on:click={ modal.open }>Регистрация</Button>
            </svelte:fragment>
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
            <Button variant="arrow" on:click={ modal.open }>Регистрация</Button>
            <br />
            <br />
            <br />
            <Partner background={ false } src="/img/logo/urfu.svg" />
            <Partner background={ false } src="/img/logo/rosmol.svg" />
            <div class="parallax-image" id="prlx-1" style:transform={ parallax1 }></div>
            <div class="parallax-image" id="prlx-2" style:transform={ parallax2 }></div>
            <div class="parallax-image" id="prlx-3" style:transform={ parallax3 }></div>
            <div class="parallax-image" id="prlx-4" style:transform={ parallax4 }></div>
        </div>
    </section>
    <section class="features" bind:this={ featuresElement }>
        <div class="content align-center">
            <Heading level={ 1 } margin={{ top: 0 }}>В программе онлайн-марафона</Heading>
            <div class="tickets-wrapper">
                <Ticket opacity={ tickets[0].opacity } zIndex={ tickets[0].zIndex } transform={ tickets[0].transform } image="/img/tickets/ticket-1.jpg">
                    <Heading level={ 4 } margin={{ top: 0, bottom: 1 }}>Лекции от топовых работодателей</Heading>
                    <p class="no-margin">
                        Карьерные эксперты, руководители и эйчары компаний страны расскажут, какие специалисты нужны рынку труда, какие навыки будут востребованы у работодателей и что делать сейчас, чтобы стать первоклассным специалистом и найти работу мечты.
                    </p>
                </Ticket>
                <Ticket opacity={ tickets[1].opacity } zIndex={ tickets[1].zIndex } transform={ tickets[1].transform } image="/img/tickets/ticket-2.jpg">
                    <Heading level={ 4 } margin={{ top: 0, bottom: 1 }}>Начни свое дело</Heading>
                    <p class="no-margin">
                        Успешные предприниматели поделятся своим опытом, а также расскажут, как монетизировать хобби и почему переехать на Бали и работать 3 часа в день  — плохая карьерная стратегия.
                    </p>
                </Ticket>
                <Ticket opacity={ tickets[2].opacity } zIndex={ tickets[2].zIndex } transform={ tickets[2].transform } image="/img/tickets/ticket-3.jpg">
                    <Heading level={ 4 } margin={{ top: 0, bottom: 1 }}>Упакуем твой опыт</Heading>
                    <p class="no-margin">
                        Эксперты расскажут, почему организация школьного балла и статус "старосты" уже классный опыт для начала работы. И где еще можно найти тот самый опыт работы, без которого не берут на работу.
                    </p>
                </Ticket>
                <Ticket opacity={ tickets[3].opacity } zIndex={ tickets[3].zIndex } transform={ tickets[3].transform } image="/img/tickets/ticket-4.jpg">
                    <Heading level={ 4 } margin={{ top: 0, bottom: 1 }}>Шаблон идеального резюме</Heading>
                    <p class="no-margin">
                        На марафоне ты научишься составлять продающее резюме, которое поможет выгодно подчеркнуть твои сильные стороны и сделать акцент на достижениях, даже если ты студент первого курса.
                    </p>
                </Ticket>
                <Ticket opacity={ tickets[4].opacity } zIndex={ tickets[4].zIndex } transform={ tickets[4].transform } image="/img/tickets/ticket-5.jpg">
                    <Heading level={ 4 } margin={{ top: 0, bottom: 1 }}>Гайды и чек-листы</Heading>
                    <p class="no-margin">
                        Где искать работу? Как определить хорошего работодателя по вакансии? Как составить резюме? Где и как развивать свои софт-скилс? С чего начать свое дело? – ответы на эти и многие другие вопросы ты найдешь в наших дополнительных материалах, которые ты сможешь использовать и после окончания марафона.
                    </p>
                </Ticket>
            </div>
            <p class="button-text align-center">
                Трудоустройство и исполнение всех<br />
                желаний не обещаем, но поможем прокачать резюме<br />
                и подготовиться к собеседованию
            </p>
            <p class="align-center">
                <Button shadow on:click={ modal.open }>Бесплатно, но с регистрацией</Button>
            </p>
        </div>
    </section>
    <section class="info" id="about">
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
                        <span style="position: relative; z-index: 1;">Путь к<br /> начинается здесь</span>
                    </Heading>
                </Card>
                <Card className="gallery-one" color="white">
                    <div>
                        <Number>1</Number><br />
                        <p class="button-text">Заполни форму</p>
                    </div>
                    <Button shadow on:click={ modal.open }>Регистрация</Button>
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
                    <Button color="purple" className="white-text" on:click={ modal.open }>Регистрация</Button>
                </Grid>
            </Card>
        </div>
    </section>
    <br />
    <section class="audience" id="audience">
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
                    <Button shadow wide variant="arrow" on:click={ modal.open }>Успешный успех по ссылке</Button>
                </div>
            </Grid>
        </div>
    </section>
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
    <br />
    <br />
    <section class="program" id="program">
        <div class="content">
            <Heading level={ 2 } margin={{ top: 0, bottom: 0.5 }}>Программа</Heading>
            <Grid m={ 1 } gap={ 2 }>
                <Speech
                    date='1 ноября'
                    time={ [ '16:00', '17:00' ] }
                    weekday='Ср'
                    speakers={ [{ name: 'Иван Иванов', duty: 'Главный HR-специалист', photo: '/img/speaker-1.jpg' }] }
                    company='Сбербанк'
                    companyLogo='/img/sber.png'
                    link='/'
                >
                    Как очаровывать работодателя с первой фразы?
                </Speech>
                <Speech
                    date='9 ноября'
                    time={ [ '17:00', '16:00' ] }
                    weekday='Чт'
                    speakers={ [{ name: 'Анна Петрова', duty: 'Старший инженер в департаменте платежных систем', photo: '/img/speaker-3.jpg' }] }
                    company='Тинькоф'
                    companyLogo='/img/kontur.png'
                    link='/'
                >
                    Разбираться в черновиках никто не будет: почему чистый код — одно из главных требований к разработчику
                </Speech>
                <Speech
                    date='14 ноября'
                    time={ [ '18:00', '19:00' ] }
                    weekday='Вт'
                    speakers={ [
                        { name: 'Петр Петров', duty: 'Руководитель группы машинного обучения и анализа данных (Data Science)', photo: '/img/speaker-4.jpg' },
                        { name: 'Ирина Петрова', duty: 'Начальник отдела кибербезопасности и анализа данных', photo: '/img/speaker-5.jpg' }
                    ] }
                    company='Синара Банк'
                    companyLogo='/img/sinara.png'
                    link='/'
                >
                    Направления для быстрого старта IT-специалиста
                </Speech>
            </Grid>
            <br />
            <br />
            <div class="align-center">
                <Button color="transparent">Показать все</Button>
            </div>
        </div>
    </section>
    <br />
    <br />
    <br />
    <section class="signup">
        <div class="content">
            <Card color="purple" className="signup-block" padding={{ x: 2.4, top: 3.2, bottom: 4 }}>
                <Grid m={ 2 } gap={ 12 }>
                    <Grid m={ 1 } alignContent="space-between">
                        <div>
                            <Heading level={ 2 } margin={{ top: 0, bottom: 0.5 }}>Регистрация</Heading>
                            <p class="button-text">
                                Найти работу мечты можно по-разному: отправить запрос в космос, нарисовать карту желаний, попробовать свои силы на стажировках или просто заполнить эту форму.
                            </p>
                            <p>
                                <span style:opacity="0.5">Уже есть аккаунт?</span> <a href="/">Войти</a>
                            </p>
                        </div>
                        <small>
                            Нажимая на кнопку «Регистрация» Вы даете свое согласие
                            на обработку Ваших персональных данных, в соответствии
                            с №152-ФЗ «О персональных данных» от 27.07.2006 года
                        </small>
                    </Grid>
                    <div>
                        <form method="POST" action="/api/signup">
                            <Grid m={ 1 }>
                                <Input name="lastName" placeholder="Фамилия" />
                                <Input name="firstName" placeholder="Имя" />
                                <Input name="patronimyc" placeholder="Отечество" />
                                <Input name="region" placeholder="Регион" />
                                <Input name="status" placeholder="Статус" />
                                <Input name="phone" placeholder="Номер телефона" />
                                <Input name="email" placeholder="E-mail" />
                                <Button>Регистрация</Button>
                            </Grid>
                        </form>
                    </div>
                </Grid>
            </Card>
        </div>
    </section>
    <section class="footer"></section>
</main>

<style>
    :global(html) {
        scroll-snap-type: y proximity;
        overflow-y: scroll;
        overflow-x: hidden;
    }
</style>