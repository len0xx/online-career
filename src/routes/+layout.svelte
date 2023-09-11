<script lang="ts">
	import Footer from "$lib/components/Footer.svelte"
	import Grid from "$lib/components/Grid.svelte";
	import Partner from "$lib/components/Partner.svelte";
</script>

<slot />
<Footer>
	<Grid m={ 2 }>
		<div class="contacts">
			<a href="https://vk.com"><img src="/img/logo/vk.svg" alt="VK link" /></a>
			<a href="https://t.me"><img src="/img/logo/tg.svg" alt="Telegram link" /></a>
			<a href="mailto:friend@urfu.ru" class="email">friend@urfu.ru</a>
		</div>
		<div class="partners">
			<Partner src="/img/logo/careertime-black.svg" />
			<Partner src="/img/logo/urfu-black.svg" />
			<Partner src="/img/logo/rosmol-black.svg" />
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
</style>