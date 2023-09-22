<script lang="ts">
    import { imask } from 'svelte-imask'
    import { createEventDispatcher, onMount } from 'svelte'

    type InputType =
        | 'text'
        | 'email'
        | 'tel'
        | 'number'
        | 'password'
        | 'search'
        | 'url'
        | 'date'
        | 'time'
        | 'datetime-local'
        | 'month'
        | 'week'
        | 'color'
        | 'file'
        | 'checkbox'
        | 'radio'
        | 'submit'
        | 'hidden'
        | 'range'
        | 'button'

    export let id: string = undefined
    export let mask: unknown = null
    export let node: HTMLSelectElement = undefined
    export let wide: boolean = null
    export let name: string = null
    export let value: string = null
    export let className = ''
    export let disabled: boolean = null
    export let required = false
    export let placeholder: string = null
    export let textSize: 'S' | 'M' | 'L' = 'M'

    const dispatch = createEventDispatcher()
    let filledIn = false
    $: internalValue = value

    const valueChanged = () => {
        filledIn = node.value != ''
        value = node.value
    }

    const inputHandler = () => {
        valueChanged()
        dispatch('input', node.value)
    }

    const changeHandler = () => {
        valueChanged()
        dispatch('change', node.value)
    }

    onMount(valueChanged)

    if (wide !== null)
        className = className.length ? [className, 'kit-input-wide'].join(' ') : 'kit-input-wide'
    $: sizeClass = textSize === 'S' ? 'small' : textSize === 'L' ? 'large' : 'medium'
</script>

<select
    {id}
    {name}
    {required}
    {disabled}
    value={internalValue}
    on:click
    on:focus
    on:blur
    on:change
    on:mouseover
    on:mouseleave
    on:input={inputHandler}
    on:change={changeHandler}
    class="{className} size-{sizeClass}"
    bind:this={node}
    use:imask={mask || undefined}
    placeholder={placeholder || undefined}
>
    <slot />
</select>

<style>
    select {
        display: inline-block;
        position: relative;
        min-width: unset;
        max-width: 100% !important;
        background: var(--white);
        border-radius: 50px;
        box-shadow: unset;
        border: none;
        font-size: var(--text-size);
        font-family: 'Gilroy';
        font-weight: 400;
        padding: 1.5rem 2rem;
        line-height: 1.2;
        color: black;
        -webkit-appearance: none;
        outline: none;
    }

    @media screen and (max-width: 768px) {
        select {
            width: 100% !important;
            padding: 1rem 1.25rem;
        }
    }

    select::placeholder {
        color: rgba(0, 0, 0, 0.3);
    }

    :global(select > option:disabled) {
        color: rgba(0, 0, 0, 0.3);
    }
</style>
