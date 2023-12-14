<script>
    export let species;
    export let width;
    export let height;
    export let url;
    export let rightsholder;
    export let license;
    export let id;
</script>

<a href="/gallery/{id}" >
    <div class="card-header">
        <img
        src={url}
        alt="photo of {species} by: {rightsholder}"
        {width}
        {height}
	/>
    </div>
    
    <div class="card card-hover p-2 variant-glass-primary text-xs flex flex-col">
        <h2 class="font-bold text-center">{species}</h2>
        <h3 class="text-center">by: {rightsholder}</h3>
        <h3 class="text-center">license: {license}</h3>
    </div>
</a>

