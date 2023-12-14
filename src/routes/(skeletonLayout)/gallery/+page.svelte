<script>
	export let data;

	const images = data.images;
</script>

<div class="flex flex-row flex-wrap p-6 gap-3">
	{#each images as image}
		{#each data.images as image}
			<a href="/gallery/{image.index.toString()}" class="card card-hover p-3 w-96">
				<div class="card-header w-full p-0">
					<img src={image.identifier} alt="by: {image.rightsholder}" />
					<div class="card p-2 variant-glass-primary text-xs flex flex-col">
						<h3 class="text-center">by: {image.rightsHolder}</h3>
						<h3 class="text-center">license: {image.license}</h3>
					</div>
				</div>
			</a>
		{/each}
	{/each}
</div>
