<script lang="ts">
    import { Heading, Item, Grid } from '$lib/components'
    import type { LayoutServerData } from './$types'

    export let data: LayoutServerData
</script>

<Heading level={4} margin={{ top: 0 }}>
    Чек-лист участника конкурса призов, где<br class="mobile-hide" />
    можно получить iPhone, беспроводные наушники,<br class="mobile-hide" />
    колонку с Алисой и фирменный мерч:
</Heading>
<ul>
    <li>проверь подписку на аккаунты проекта в Telegram и ВКонтакте</li>
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
