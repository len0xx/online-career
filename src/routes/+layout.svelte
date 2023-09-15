<script lang="ts">
	import Footer from "$lib/components/Footer.svelte"
	import Grid from "$lib/components/Grid.svelte";
	import Partner from "$lib/components/Partner.svelte"
</script>

<slot />
<Footer>
	<Grid m={ 2 }>
		<div class="contacts">
			<a href="https://vk.com" target="_blank"><img src="/img/logo/vk.svg" alt="VK link" /></a>
			<a href="https://t.me" target="_blank"><img src="/img/logo/tg.svg" alt="Telegram link" /></a>
			<a href="mailto:friend@urfu.ru" target="_top" class="email">friend@urfu.ru</a>
		</div>
		<div class="partners">
			<a href="https://времякарьеры.рф" target="_blank"><Partner src="/img/logo/careertime-black.svg" /></a>
			<a href="https://urfu.ru" target="_blank"><Partner src="/img/logo/urfu-black.svg" /></a>
			<a href="https://myrosmol.ru" target="_blank"><Partner src="/img/logo/rosmol-black.svg" /></a>
		</div>
	</Grid>
</Footer>

<style>
	div.contacts > a {
		display: inline-block;
		vertical-align: middle;
	}

	div.contacts > a:not(:last-child) {
		margin-right: 1em;
	}

	div.partners {
		text-align: right;
	}

	a.email {
		font-size: var(--medium);
	}

	div.partners > a:not(:last-child) {
        margin-right: 0.5em;
	}
</style>