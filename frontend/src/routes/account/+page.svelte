<script lang="ts">
    import { Heading, Item, Grid, Speech } from '$lib/components'
</script>

<svelte:head>
    <title>Время Карьеры – Личный кабинет</title>
</svelte:head>

<Heading level={3} margin={{ top: 0, bottom: 0.5 }}>Моя программа</Heading>
<Grid m={1} gap={2}>
    <Speech
        date="2 ноября"
        time={['17:00', '18:00']}
        weekday="Чт"
        speakers={[
            {
                name: 'Маргарита Камзеева',
                duty: 'Консультант по подбору персонала BackOffice',
                photo: '/img/speaker-margarita.png'
            }
        ]}
        company="Ancor"
        companyLogo="/img/ancor.png"
        link="https://vk.com/video-103585114_456239209"
    >
        Продающее резюме: инструкция по применению
    </Speech>
    <Speech
        date="8 ноября"
        time={['17:00', '18:00']}
        weekday="Вт"
        speakers={[
            {
                name: 'Станислав Косач',
                duty: 'Директор Центра мета-навыков Корпоративной академии Росатома',
                photo: '/img/speaker-stanislav.png'
            }
        ]}
        company="Росатом"
        companyLogo="/img/rosatom.png"
        link="https://vk.com/video-103585114_456239210"
    >
        Выгорание и точки невозврата.<br />
        Как найти дело свей жизни и не страдать?
    </Speech>
    <Speech
        date="10 ноября"
        time={['17:00', '18:00']}
        weekday="Пт"
        speakers={[
            {
                name: 'Елена Мартынова',
                duty: 'Менеджер по счастью стажеров',
                photo: '/img/speaker-elena.png'
            }
        ]}
        company=""
        companyLogo=""
        link="https://vk.com/video-103585114_456239211"
    >
        Lifelong learning.<br />
        Почему выпускной в университете – это только начало учебы?
    </Speech>
    <Speech
        date="14 ноября"
        time={['17:00', '18:00']}
        weekday="Вт"
        speakers={[
            {
                name: 'Анна Фарион',
                duty: 'Директор центра развития талантов',
                photo: '/img/speaker-anna.png'
            }
        ]}
        company="ПАО Сбербанк"
        companyLogo="/img/sber.png"
        link="https://vk.com/video-103585114_456239212"
    >
        Без опыта, но с головой.<br />
        Когда навыки станут важнее заслуг?
    </Speech>
    <Speech
        date="16 ноября"
        time={['17:00', '18:00']}
        weekday="Чт"
        speakers={[
            {
                name: 'Анна Славных',
                duty: 'Специалист студенческих проектов',
                photo: '/img/speaker-anna-2.png'
            }
        ]}
        company="VK Education"
        companyLogo="/img/vk.png"
        link="https://vk.com/video-103585114_456239213"
    >
        Управляй и властвуй:<br />
        Как построить свой карьерный трек
    </Speech>
    <Speech
        date="21 ноября"
        time={['17:00', '18:00']}
        weekday="Вт"
        speakers={[
            {
                name: 'Елизавета Кутлунина',
                duty: 'HR-партнер команды перспективных направлений',
                photo: '/img/speaker-elisabeth.png'
            }
        ]}
        company="Контур"
        companyLogo="/img/kontur.png"
        link="/"
    >
        Куда Пойти Работать?<br />
        Корпорация vs. Стартап:<br />
        Плюсы и Минусы
    </Speech>
    <Speech
        date="23 ноября"
        time={['17:00', '18:00']}
        weekday="Чт"
        speakers={[
            {
                name: 'Ольга Чистофор',
                duty: 'Начальник бюро развития персонала АО "ТАГМЕТ"',
                photo: '/img/speaker-olga.png'
            }
        ]}
        company="ТМК"
        companyLogo="/img/tmk.png"
        link="/"
    >
        Секреты успешного трудоустройства
    </Speech>
    <Speech
        date="28 ноября"
        time={['17:00', '18:00']}
        weekday="Вт"
        speakers={[
            {
                name: 'Анастасия Давыдова',
                duty: 'Директор департамента персонала',
                photo: '/img/speaker-anastasia.png'
            }
        ]}
        company="УЦСБ"
        companyLogo="/img/ucsb.png"
        link="/"
    >
        Рынок труда в 2024:<br />
        тренды, которые нас ждут
    </Speech>
    <Speech
        date="30 ноября"
        time={['17:00', '18:00']}
        weekday="Чт"
        speakers={[
            {
                name: 'Юлия Симанова',
                duty: 'Senior IT-рекрутер',
                photo: '/img/speaker-julia.png'
            }
        ]}
        company="Hi, Rockits!"
        companyLogo="/img/hi-rockits.png"
        link="/"
    >
        Прожарка резюме:<br />
        краш-тест с рекрутером<br />
        в прямом эфире
    </Speech>
</Grid>
<br />
<br />

<Heading level={4}>
    Чек-лист участника конкурса призов, где<br class="mobile-hide" />
    можно получить iPhone, беспроводные наушники,<br class="mobile-hide" />
    колонку с Алисой и фирменный мерч:
</Heading>
<ul>
    <li>
        проверь подписку на аккаунты проекта в <a
            class="green-darker-link"
            rel="noreferrer"
            href="https://t.me/timeforcareer"
            target="_blank">Telegram</a
        >
        и
        <a
            class="green-darker-link"
            rel="noreferrer"
            href="https://vk.com/timeforcareer"
            target="_blank">ВКонтакте</a
        >
    </li>
    <li>смотри стримы в онлайне и отмечайся в комментариях</li>
    <li>
        выполняй дополнительные задания и зарабатывай больше баллов. Их мы будем отправлять тебе в
        личный кабинет, на почту и публиковать в соцсетях
    </li>
    <li>будь активным, чтобы работодатели точно заметили тебя</li>
</ul>
<p>Удачи!</p>
<Grid m={4} s={1}>
    <Item image="/img/gifts/sweatshirt.png" bubble="x10">Фирменный мерч</Item>
    <Item image="/img/gifts/speaker.png" bubble="x5">Яндекс-станция мини</Item>
    <Item image="/img/gifts/airpods.png" bubble="x3">Наушники Airpods</Item>
    <Item image="/img/gifts/iphone.png" bubble="x1">iPhone 14</Item>
</Grid>

<style>
    ul,
    p:not(.align-center) {
        max-width: 700px;
    }
</style>
