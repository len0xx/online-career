<script lang="ts">
    import Heading from "$lib/components/Heading.svelte"
    import type { LayoutServerData } from './$types'

    export let data: LayoutServerData
</script>

<Heading level={ 2 }>Welcome</Heading>
{ #if data && data.user }
    <p>{ data.user.firstName } { data.user.lastName }</p>
{ /if }