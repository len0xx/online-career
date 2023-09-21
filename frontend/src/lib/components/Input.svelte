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

    export let marginX = 0
    export let marginY = 0
    export let id: string = undefined
    export let min: number = null
    export let max: number = null
    export let mask: unknown = null
    export let node: HTMLInputElement = undefined
    export let wide: boolean = null
    export let name: string = null
    export let step: number = null
    export let size: number = null
    export let list: string = null
    export let value: string = null
    export let className = ''
    export let pattern: string = null
    export let readonly: boolean = null
    export let multiple: boolean = null
    export let disabled: boolean = null
    export let required = false
    export let white = false
    export let autofocus: boolean = null
    export let placeholder: string = null
    export let marginTop: number = null
    export let marginBottom: number = null
    export let marginLeft: number = null
    export let marginRight: number = null
    export let lineWidth = 2
    export let type: InputType = 'text'
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

<!-- svelte-ignore a11y-autofocus -->
<input
    {id}
    {min}
    {max}
    {type}
    {name}
    {size}
    {step}
    {list}
    {pattern}
    {readonly}
    {multiple}
    {required}
    {disabled}
    {autofocus}
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
    class:filledIn
    class:white
    bind:this={node}
    use:imask={mask || undefined}
    placeholder={placeholder || undefined}
    style:margin-top={(marginTop !== null ? marginTop : marginY) + 'em'}
    style:margin-bottom={(marginBottom !== null ? marginBottom : marginY) + 'em'}
    style:margin-left={(marginLeft !== null ? marginLeft : marginX) + 'em'}
    style:margin-right={(marginRight !== null ? marginRight : marginX) + 'em'}
    style:border-width={lineWidth + 'px'}
/>

<style>
    input:not([type='hidden']):not([type='button']):not([type='submit']):not([type='checkbox']):not(
            [type='radio']
        ):not([type='file']):not([type='range']) {
        background: var(--white);
        border-radius: 50px;
        box-shadow: unset;
        border: none;
        font-size: var(--text-size);
        font-family: 'Gilroy';
        font-weight: 400;
        padding: 1.5rem 2rem;
        line-height: 1.2;
    }

    @media screen and (max-width: 768px) {
        input:not([type='hidden']):not([type='button']):not([type='submit']):not(
                [type='checkbox']
            ):not([type='radio']):not([type='file']):not([type='range']) {
            padding: 1rem 1.25rem;
        }
    }

    input:not([type='hidden']):not([type='button']):not([type='submit']):not([type='checkbox']):not(
            [type='radio']
        ):not([type='file']):not([type='range']).filledIn {
        border-bottom-color: var(--blue);
        color: var(--blue);
    }

    input:not([type='hidden']):not([type='button']):not([type='submit']):not([type='checkbox']):not(
            [type='radio']
        ):not([type='file']):not([type='range']):not(.filledIn):focus {
        border-bottom-color: rgba(0, 0, 0, 0.4);
    }

    input::placeholder {
        color: rgba(0, 0, 0, 0.2);
    }

    input.white:not([type='hidden']):not([type='button']):not([type='submit']):not(
            [type='checkbox']
        ):not([type='radio']):not([type='file']):not([type='range']) {
        color: white;
        border-bottom-color: rgba(255, 255, 255, 0.3);
    }

    input.white:not([type='hidden']):not([type='button']):not([type='submit']):not(
            [type='checkbox']
        ):not([type='radio']):not([type='file']):not([type='range']).filledIn {
        color: white;
        border-bottom-color: rgba(255, 255, 255, 1);
    }

    input.white:not([type='hidden']):not([type='button']):not([type='submit']):not(
            [type='checkbox']
        ):not([type='radio']):not([type='file']):not([type='range']):not(.filledIn):focus {
        border-bottom-color: rgba(255, 255, 255, 0.5);
    }

    input.white::placeholder {
        color: rgba(255, 255, 255, 0.3);
    }
    input.kit-input-wide {
        width: 100%;
    }
    input:focus {
        -webkit-outline: unset;
        -moz-outline: unset;
        outline: unset;
    }
</style>
