<script>
    export let data;

    const speciesList = data.speciesList;

    
</script>


<div class="flex flex-row flex-wrap p-6 gap-3">
	{#each speciesList as species}
        <div class="card variant-filled-primary">
            <a href="/species/{species.index}" class="card-header">{species.species}</a>
        </div>        
	{/each}
</div>
