<script>
	export let data;

	const empty = data.empty;

	const species = data.species?.sort((a, b) => b.score - a.score);
	const observations = data.observations?.sort((a, b) => b.score - a.score);

</script>

{#if empty}
	<div class="flex flex-col gap-4 p-3 items-center justify-center w-full h-full">
        <div class="card variant-glass-warning flex flex-col gap-4 p-3 items-center justify-center">
            <h1 class="text-center card-header">Query is empty!</h1>
            <h2 class="text-center">Try entering something in the search bar and press Enter!</h2>
        </div>
    </div>
{:else}
	<h1 class="text-center text-2xl my-3">Species</h1>

	{#await species}
		<div class="flex flex-row flex-wrap p-2 gap-3 variant-glass-primary m-6">
			{#each species as item}
				<div class="flex flex-row flex-wrap p-6 gap-3">
					<div class="card variant-filled-primary">
						<a href="/species/{item.index}" class="card-header">{item.species}</a>
					</div>
				</div>
			{/each}
		</div>
	{:then speciesValue}
		{#if speciesValue.length === 0}
			<h1 class="text-center text-xl text-warning-700">No species found</h1>
		{:else}
			<div class="flex flex-row flex-wrap p-2 gap-3 variant-glass-primary m-6">
				{#each speciesValue as item}
					<div class="flex flex-row flex-wrap p-6 gap-3">
						<div class="card variant-filled-primary">
							<a href="/species/{item.index}" class="card-header">{item.species}</a>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	{/await}

	<h1 class="text-center text-2xl my-3">Observations</h1>

	{#if observations.length === 0}
		<h1 class="text-center text-xl text-warning-700">No observations found</h1>
	{:else}
		<div class="flex flex-row flex-wrap p-6 gap-3 variant-glass-primary m-6">
			{#each observations as observation}
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
			{/each}
		</div>
	{/if}
{/if}
