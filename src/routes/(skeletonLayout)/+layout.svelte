<script>
	import '../../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup, LightSwitch } from '@skeletonlabs/skeleton';
	import SearchBar from '../../components/SearchBar.svelte';
	import FungiNavBar from '../../components/FungiNavBar.svelte';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar slotDefault="place-self-center">
			<svelte:fragment slot="lead">
				<a href="/"><strong class="text-xl">Fungi-On</strong></a>
			</svelte:fragment>
			<SearchBar />
			<svelte:fragment slot="trail">
				<LightSwitch />
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://github.com/pedro-ramalho/feup-pri-proj"
					target="_blank"
					rel="noreferrer"
				>
					GitHub
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<FungiNavBar />
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
