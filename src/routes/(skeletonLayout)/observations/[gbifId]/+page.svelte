<script>

    export let data;

    const observation = data.observation;

    const species = observation.species;
    const images = data.images;

    console.log(data);

</script>

<div class="flex flex-col gap-3">
	<div class="bg-primary-600 flex flex-col items-center gap-5 p-3">
		<h1 class="text-3xl font-bold">Images</h1>
		<div
			class="w-10/12 snap-x snap-mandatory scroll-smooth overflow-y-hidden flex gap-2 p-y-1 overflow-x-scroll"
		>
			{#each images as image}
				<a href="/gallery/{image.gbif_id.toString()}" class="card card-hover p-3">
					<div class="card-header w-full p-0">
						<img src={image.identifier} alt="by: {image.rightsholder}" />
						<div class="card p-2 variant-glass-primary text-xs flex flex-col">
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
        <h2>Species Name: {species}</h2>
		<h2>Country: { observation.country_code ? observation.country_code : 'Unknown'}</h2>
		<h2>District: { observation.district ? observation.district : 'Unknown'}</h2>
		<h2>County: { observation.county ? observation.county : 'Unknown'}</h2>
		<h2>Parish: { observation.parish ? observation.parish : 'Unknown'}</h2>
		<h2>Date: { observation.date ? new Date(observation.date).toISOString().split('T')[0] : 'Unknown'} </h2>
		<h2>Latitude: { observation.latitude ? observation.latitude : 'Unknown'}</h2>
		<h2>Longitude: { observation.longitude ? observation.longitude : 'Unknown'}</h2>

	</div>



</div>