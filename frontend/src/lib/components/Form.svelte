<script lang="ts">
    import { sendWindowAJAX, redirect as redirectTo } from '$lib/utilities'
    import { createEventDispatcher } from 'svelte'
    import { blur } from 'svelte/transition'
    import type { RESTMethod, ContentType } from '../../types'

    export let id: string = undefined
    export let className = ''
    export let action = ''
    export let checkOk = true
    export let reset = true
    export let method: RESTMethod = 'GET'
    export let alerts = true
    export let redirect: string = undefined
    export let successText: string = undefined
    export let errorText: string = undefined
    export let content: ContentType = 'application/x-www-form-urlencoded'

    let submitted = false
    let success = false
    let successFinalText = ''
    let errorFinalText = ''
    const dispatch = createEventDispatcher()

    const handleSubmit = (event: Event) => {
        const form = event.target as HTMLFormElement
        const formData = new FormData(form)

        const requestOptions = {
            method,
            data: formData,
            contentType: content
        }

        sendWindowAJAX(
            action,
            requestOptions,
            (res) => {
                if (checkOk) {
                    if (res.ok === true) {
                        submitted = true
                        success = true
                        successFinalText = res.message || successText || 'Форма успешно отправлена'
                        dispatch('success', res)
                        if (redirect) redirectTo(redirect)
                    } else if (res.ok === false || res.error) {
                        submitted = true
                        success = false
                        errorFinalText = res.message || res.error || errorText
                        dispatch('error', { error: res })
                    }
                } else {
                    submitted = true
                    success = true
                    successFinalText = res.message || successText || 'Форма успешно отправлена'
                    dispatch('success', res)
                    if (redirect) redirectTo(redirect)
                }
                if (reset) form.reset()
            },
            (res) => {
                submitted = true
                success = false
                errorFinalText = res || errorText
                dispatch('error', { error: res })
            }
        )
    }
</script>

<form {id} class={className} {action} {method} on:submit|preventDefault={handleSubmit}>
    <slot />
    {#if alerts && submitted}
        <div class="alerts mt-4" transition:blur|local={{ duration: 200 }}>
            {#if success}
                <div
                    transition:blur|local={{ duration: 200 }}
                    class="alert alert-success mb-0"
                    role="alert"
                >
                    {successFinalText}
                </div>
            {:else}
                <div
                    transition:blur|local={{ duration: 200 }}
                    class="alert alert-danger mb-0"
                    role="alert"
                >
                    Произошла ошибка{errorFinalText ? `: ${errorFinalText}` : ''}
                </div>
            {/if}
        </div>
    {/if}
</form>

<style>
    div.alert {
        color: white;
    }
</style>
