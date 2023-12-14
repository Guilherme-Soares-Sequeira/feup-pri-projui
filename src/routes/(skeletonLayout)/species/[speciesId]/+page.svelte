<script>
	export let data;

	const species = data.species.species;

	console.log(data);
</script>

<div class="flex flex-col gap-3">
	<h1 class="text-center text-3xl p-2 variant-ghost-secondary">{species}</h1>
	<div class="bg-primary-600 flex flex-col items-center gap-5 p-3">
		<h1 class="text-3xl font-bold">Images</h1>
		<div
			class="w-10/12 snap-x snap-mandatory scroll-smooth overflow-y-hidden flex gap-2 p-y-1 overflow-x-scroll"
		>
			{#each data.images as image}
				<a href="/observations/{image.gbif_id.toString()}" class="card card-hover p-3">
					<div class="card-header w-full p-0">
						<img src={image.identifier} alt="by: {image.rightsholder}" />
						<div class="card p-2 variant-glass-primary text-xs flex flex-col">
							<h2 class="font-bold text-center">{species}</h2>
							<h3 class="text-center">by: {image.rightsHolder}</h3>
							<h3 class="text-center">license: {image.license}</h3>
						</div>
					</div>
				</a>
			{/each}
		</div>
	</div>

	<div class="card m-auto p-4 bg-tertiary-300">
		<h1 class="card-header text-center w-full h-fit p-0">Information</h1>
		<h2>Class: {data.species.class ? data.species.class : 'Unknown'}</h2>
		<h2>Family: {data.species.family ? data.species.family : 'Unknown'}</h2>
		<h2>Phylum: {data.species.phylum ? data.species.phylum : 'Unknown'}</h2>
		<h2>
			Red List Category: {data.species.iucnRedListCategory
				? data.species.iucnRedListCategory
				: 'Unknown'}
		</h2>
	</div>

	<div class="bg-primary-300 mx-auto px-8 flex flex-col gap-2 w-10/12 p-4">
		<h1 class="text-3xl font-bold text-center">Summary</h1>
		{#if data.summaries?.length > 0}
			<h1 class="card card-hover m-auto p-4 bg-tertiary-300 w-10/12">
				{data.summaries[0].content}
			</h1>
		{:else}
			<h1 class="text-center">No summary found.</h1>
		{/if}
	</div>

	<div class="bg-primary-300 mx-auto px-8 flex flex-col gap-2 w-10/12 p-4">
		<h1 class="text-3xl font-bold text-center">Abstracts</h1>
		{#if data.abstracts?.length > 0}
			{#each data.abstracts as abstract, i}
				<div class="card card-hover m-auto p-4 bg-tertiary-300 w-10/12">
					<h1>Number {i + 1}:</h1>
					<h2>{abstract.content}</h2>
				</div>
			{/each}
		{:else}
			<h1 class="text-center">No abstracts found.</h1>
		{/if}
	</div>
</div>
