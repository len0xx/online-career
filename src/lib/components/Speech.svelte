<script lang="ts">
    import Button from "./Button.svelte"

    type Weekday = 'Пн' | 'Вт' | 'Ср' | 'Чт' | 'Пт' | 'Сб' | 'Вс'
    type Speaker = {
        name: string
        duty: string
        photo: string
    }

    export let date: string
    export let time: [string] | [string, string]
    export let weekday: Weekday
    export let company: string
    export let companyLogo: string
    export let speakers: [Speaker] | [Speaker, Speaker]
    export let link: string | URL
</script>

<div class="speech">
    <div class="side-block speech-details">
        <div class="company-logo" style:background-image={ `url("${ companyLogo }")` }></div>
        <div class="speech-date">{ date }</div>
        <div>
            <div class="speech-weekday">{ weekday }</div>
            <div class="speech-time">{ time.length === 2 ? `${ time[0] } - ${ time[1] }` : time[0] }</div>
            <div class="speech-time-caption">Время МСК</div>
        </div>
    </div>
    <div class="center-block">
        <div class="speech-title">
            <slot />
        </div>
        <div class="speakers { `amount-${ speakers.length }` }">
            { #each speakers as speaker }
                <div class="speaker-details">
                    <div>
                        <span class="name">{ speaker.name }</span>
                        <span class="company">{ company }</span>
                    </div>
                    <div class="duty">{ speaker.duty }</div>
                </div>
            { /each }
        </div>
    </div>
    <div class="side-block speaker-picture" style:background-image={ `url("${ speakers.length === 1 ? speakers[0].photo : '' }")` }>
        <div class="speakers-pictures">
            { #if speakers.length > 1 }
                    { #each speakers as speaker }
                        <div class="speaker-miniature" style:background-image={ `url("${ speaker.photo }")` } />
                    { /each }
            { /if }
        </div>
        <div>
            <a target="_blank" href={ link.toString() }>
                <Button variant="link" color="white">Ссылка</Button>
            </a>
        </div>
    </div>
</div>

<style>
    .speech {
        --block-size: 336px;

        display: grid;
        position: relative;
        grid-template-columns: var(--block-size) auto var(--block-size);
        align-items: center;
        gap: 2em;
        background-color: white;
        box-shadow: var(--default-shadow);
        border-radius: var(--radius);
        min-height: 328px;
        box-sizing: border-box;
    }

    .speech > .side-block {
        display: grid;
        position: relative;
        grid-template-columns: 1fr;
        gap: 1em;
        padding: 1.5em;
        background-color: var(--dark);
        color: white;
        border-radius: var(--radius);
        min-height: 100%;
        box-sizing: border-box;
    }

    .speech > .side-block.speech-details {
        font-weight: 400;
        align-items: end;
        gap: 0.2em;
    }

    .speech > .side-block.speech-details .company-logo {
        display: block;
        position: absolute;
        top: 1em;
        right: 1em;
        border-radius: 50%;
        width: 2.4em;
        height: 2.4em;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }

    .speech > .side-block.speech-details .speech-date {
        opacity: 0.5;
        font-size: var(--button-text);
        align-self: start;
    }

    .speech > .side-block.speech-details .speech-weekday,
    .speech > .side-block.speech-details .speech-time {
        font-size: calc(var(--text-size) * 2.2);
    }

    .speech > .side-block.speech-details .speech-time {
        margin-top: 0.25em;
        opacity: 0.5;
    }

    .speech > .side-block.speech-details .speech-time-caption {
        margin-top: 1em;
    }

    .speech > .side-block.speaker-picture {
        background-position: center;
        background-size: cover;
        background-position: center;
        align-content: space-between;
    }

    .speech .speech-title {
        font-size: var(--medium);
        font-weight: 600;
        margin-bottom: 0.75em;
        color: var(--dark);
    }

    .speech .speakers {
        display: grid;
        position: relative;
        gap: 1em;
    }

    .speech .speakers.amount-1 {
        grid-template-columns: repeat(1, 1fr);
    }

    .speech .speakers.amount-2,
    .speech .speakers.amount-3,
    .speech .speakers.amount-4 {
        grid-template-columns: repeat(2, 1fr);
    }

    .speakers .speaker-details {
        color: var(--dark);
        font-weight: 500;
    }

    .side-block.speaker-picture .speaker-miniature {
        display: block;
        position: relative;
        border-radius: 50%;
        min-height: 130px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .side-block.speaker-picture .speakers-pictures {
        display: grid;
        position: relative;
        grid-template-columns: 1fr 1fr;
        gap: 1em;
        align-self: start;
    }

    .speakers .speaker-details .name {
        margin-right: 1.5em;
    }

    .speakers .speaker-details .company {
        opacity: 0.4;
    }

    .speakers .speaker-details .duty {
        margin-top: 1em;
        opacity: 0.4;
        font-size: 0.8em;
    }

    @media screen and (max-width: 768px) {
        .speech {
            grid-template-columns: 1fr 1fr;
            align-items: center;
            gap: 1em;
            min-height: unset;
            grid-template-areas: "details picture"
                                "text text";
        }

        .speech > .side-block {
            padding: 1em;
        }

        .speech .speech-title {
            font-size: var(--header-3);
            margin-bottom: 1.2em;
        }

        .speakers .speaker-details .company,
        .speakers .speaker-details .name {
            display: block;
            position: relative;
            margin-right: 0;
            margin-bottom: 0.5em;
            font-size: 1.2em;
        }

        .speakers .speaker-details .duty {
            font-size: 1.1em;
        }

        .side-block.speaker-picture .speaker-miniature {
            min-height: 60px;
        }

        .speech > .center-block {
            padding: 1em;
            text-align: center;
        }

        .speech > .side-block.speech-details {
            grid-area: details
        }

        .speech > .side-block.speaker-picture {
            grid-area: picture
        }

        .speech > .center-block {
            grid-area: text
        }
    }
</style>