<script lang="ts">
    import { redirect } from '$lib/utilities'
    import { onMount } from 'svelte'

    onMount(() => redirect('/account'))
</script>
