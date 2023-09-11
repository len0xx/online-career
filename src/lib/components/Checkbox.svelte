<script lang="ts">
    export let name: string
    export let required = false
    export let checked = false
    export let value = ''
    export let flexCenter = false
    export let group: string[] = []
    export let disabled = false
    export let inline = false
    export let id: string = undefined
    export let className = ''
    export let node: HTMLElement = undefined

    $: inlineClass = inline ? 'inline-checkbox' : ''
    $: flexCenterClass = flexCenter ? 'flex-center' : ''
    $: updateCheckbox(group)
    $: updateGroup(checked)

    const updateCheckbox = (group: string[]) => checked = group.indexOf(value) >= 0

    function updateGroup(checked: boolean) {
        const index = group.indexOf(value)

        if (checked) {
            if (index < 0) {
                group.push(value)
                group = group
            }
        } else {
            if (index >= 0) {
                group.splice(index, 1)
                group = group
            }
        }
}
</script>

<label
    class={ [className, inlineClass, flexCenterClass].join(' ') }
    on:click
    on:mouseover
    on:mouseleave
    on:focus
    on:blur
    on:keydown
>
    <input type="checkbox" { id } bind:this={ node } { name } { disabled } { required } bind:checked { value } on:change on:input />
    <div class="wrapper">
        <span>
            <slot />
        </span>
    </div>
</label>

<style>
    label {
        display: block;
        position: relative;
        font-family: 'Gilroy';
        font-style: normal;
        font-size: var(--button-text);
        color: black;
        cursor: pointer;
    }

    label:not(:last-child) {
        margin-bottom: 0.5em;
    }

    label > input[type="checkbox"] + .wrapper {
        border-radius: calc(var(--radius) / 2);
        padding: var(--button-text);
        transition: 0.1s ease-in-out;
    }

    label > input[type="checkbox"]:not(:checked) + .wrapper {
        background-color: rgba(255, 255, 255, 0.5);
    }

    label:hover > input[type="checkbox"]:not(:checked) + .wrapper {
        background-color: rgba(255, 255, 255, 0.7);
    }

    label > input[type="checkbox"]:checked + .wrapper {
        background-color: rgba(255, 255, 255, 1);
    }

    label.flex-center {
        display: flex;
        justify-content: center;
    }

    label.inline-checkbox {
        display: inline-block;
    }

    label > input[type="checkbox"] {
        display: none;
    }

    label > input[type="checkbox"] + .wrapper > span {
        display: flex;
        flex-flow: row;
        cursor: pointer;
        align-items: center;
    }

    label > input[type="checkbox"] + .wrapper > span::before {
        display: inline-block;
        content: '';
        vertical-align: middle;
        height: 1em;
        width: 0;
        margin-right: .8em;
        background-repeat: no-repeat;
        background-position-x: 0%;
        background-position-y: 0%;
        background-position: left center;
        background-size: auto 100%;
        cursor: pointer;
    }

    label > input[type="checkbox"] + .wrapper > span::before {
        width: 32px;
        height: 32px;
        background-image: url('/img/icons/unchecked.svg');
    }

    label > input[type="checkbox"]:checked + .wrapper > span::before {
        width: 32px;
        height: 32px;
        background-image: url('/img/icons/checked.svg');
    }
</style>