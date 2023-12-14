<script>
	export let data;

	const observationsList = data.observationsList;
	const images = data.images;
</script>

<div class="flex flex-row flex-wrap p-6 gap-3">
	{#each observationsList as observation}
		{#if images[observation.gbif_id.toString()]}
			<a
				href="/observations/{observation.gbif_id.toString()}"
				class="card card-hover variant-filled-primary min-w-fit flex-col justify-center items-center"
			>
				<img src={images[observation.gbif_id.toString()]} alt={observation.species} class="w-96" />
				<h2 class="text-center my-auto">
					gbif id: {observation.gbif_id.toString()}
				</h2>
			</a>
		{:else}
			<a
				href="/observations/{observation.gbif_id.toString()}"
				class="card card-hover variant-filled-primary p-4"
			>
				<h1 class="text-center bg-error-200 w-full m-x-8">No Image</h1>

				<h2 class="text-center">
					gbif id: {observation.gbif_id.toString()}
				</h2>
			</a>
		{/if}
	{/each}
</div>
