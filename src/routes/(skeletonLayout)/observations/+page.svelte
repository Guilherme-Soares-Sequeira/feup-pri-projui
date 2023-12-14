<script>
	export let data;

	const observationsList = data.observationsList;
	const images = data.images;
</script>

<div class="flex flex-row flex-wrap p-6 gap-3 variant-glass-primary m-2">
	{#each observationsList as observation}
		{#if images[observation.gbif_id.toString()]}
			<a
				href="/observations/{observation.gbif_id.toString()}"
				class="card card-hover variant-filled-primary max-w-xs min-w-fit flex-col justify-center items-center pb-3"
			>
				<img src={images[observation.gbif_id.toString()]} alt={observation.species} class="mb-3 w-96" />
				<h2 class="text-center my-auto">
					Species: {observation.species}
				</h2>
				<h2 class="text-center">by: {observation.author.toString()}</h2>
				<h2 class="text-center">
					Country: {observation.country_code ? observation.country_code : 'Unknown'}
				</h2>
				<h2 class="text-center">
					District: {observation.district ? observation.district : 'Unknown'}
				</h2>
				<h2 class="text-center">County: {observation.county ? observation.county : 'Unknown'}</h2>
				<h2 class="text-center">Parish: {observation.parish ? observation.parish : 'Unknown'}</h2>
				<h2 class="text-center">
					On: {observation.date
						? new Date(observation.date).toISOString().split('T')[0]
						: 'Unknown'}
				</h2>
				<h2 class="text-center">
					gbif id: {observation.gbif_id.toString()}
				</h2>
			</a>
		{:else}
			<a
				href="/observations/{observation.gbif_id.toString()}"
				class="card card-hover variant-filled-primary p-4"
			>
				<h1 class="card-header text-center bg-primary-400 w-full p-2">{observation.species}</h1>
				<h2 class="text-center">
					by: {observation.author.toString()}
				</h2>
				<h2 class="text-center">
					Country: {observation.country_code ? observation.country_code : 'Unknown'}
				</h2>
				<h2 class="text-center">
					District: {observation.district ? observation.district : 'Unknown'}
				</h2>
				<h2 class="text-center">County: {observation.county ? observation.county : 'Unknown'}</h2>
				<h2 class="text-center">Parish: {observation.parish ? observation.parish : 'Unknown'}</h2>
				<h2 class="text-center">
					On: {observation.date
						? new Date(observation.date).toISOString().split('T')[0]
						: 'Unknown'}
				</h2>
				<h2 class="text-center">
					gbif id: {observation.gbif_id.toString()}
				</h2>
			</a>
		{/if}
	{/each}
</div>
