<script>
	import { Avatar } from '@skeletonlabs/skeleton';
</script>

<div class="flex flex-col gap-4 my-7">
	<h1 class="text-3xl text-center">What is Fungi-On?</h1>
	<article class="flex-grow text-center w-1/2 m-auto min-h-fit">
		Fungi-On is an Information Retrieval System developed for the <a
			class="text-error-900"
			href="https://sigarra.up.pt/feup/pt/ucurr_geral.ficha_uc_view?pv_ocorrencia_id=518807"
			>PRI course</a
		>
		@ <a class="text-error-900" href="https://sigarra.up.pt/feup/pt/web_page.inicial">FEUP</a>.
		<br />
		Here you can find various information regarding fungus found on the Iberian Peninsula, such as its
		phylum and class, images of them in the wild, scientific articles written about them and much more!
		<br />
		All data provided by <a class="text-error-900" href="https://www.gbif.org/">GBIF</a>.
	</article>

	<h1 class="text-3xl text-center">Contributors</h1>
	<div class="flex flex-row justify-center items-center gap-8">
		<div class="card variant-filled-primary p-4 flex flex-col items-center gap-2 w-64">
			<div class="card-header text-xl text-center flex flex-col items-center gap-1">
				<Avatar src="$lib/../shroooming.png" width="w-32" rounded="rounded-full" />
				<h1>Guilherme Sequeira</h1>
			</div>
			<h2 class="text-md text-center">up202004646</h2>
			<a
				class="btn btn-sm variant-ghost-surface"
				href="https://github.com/Guilherme-Soares-Sequeira"
				target="_blank"
				rel="noreferrer"
			>
				GitHub
			</a>
		</div>
		<div class="card variant-filled-primary p-4 flex flex-col items-center gap-2 w-64">
			<div class="card-header text-xl text-center flex flex-col items-center gap-1">
				<Avatar
					src="https://avatars.githubusercontent.com/u/75331417?v=4"
					width="w-32"
					rounded="rounded-full"
				/>
				<h1>Pedro Nunes</h1>
			</div>
			<h2 class="text-md text-center">up202004714</h2>
			<a
				class="btn btn-sm variant-ghost-surface"
				href="https://github.com/pedronunes19"
				target="_blank"
				rel="noreferrer"
			>
				GitHub
			</a>
		</div>
		<div class="card variant-filled-primary p-4 flex flex-col items-center gap-2 w-64">
			<div class="card-header text-xl text-center flex flex-col items-center gap-1">
				<Avatar
					src="https://avatars.githubusercontent.com/u/72579386?v=4"
					width="w-32"
					rounded="rounded-full"
				/>
				<h1>Pedro Ramalho</h1>
			</div>
			<h2 class="text-md text-center">up202004715</h2>
			<a
				class="btn btn-sm variant-ghost-surface"
				href="https://github.com/pedro-ramalho"
				target="_blank"
				rel="noreferrer"
			>
				GitHub
			</a>
		</div>
	</div>
</div>
