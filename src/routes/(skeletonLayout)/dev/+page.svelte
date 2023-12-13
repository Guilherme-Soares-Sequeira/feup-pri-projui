<script>
	import ObservationImage from '../../../components/ObservationImage.svelte';
	import { setContext } from 'svelte';
	setContext('species', { species: 'Coyote' });
</script>

<div class="flex flex-row">
	<ObservationImage
		width="150"
		height="84"
		url="https://static.inaturalist.org/photos/111/medium.jpg?1545409749"
		rightsholder="Jen"
		license="CC-BY-NC"
		id="111"
	/>
	<ObservationImage
		width="100"
		height="56"
		url="https://static.inaturalist.org/photos/111/medium.jpg?1545409749"
		rightsholder="Bruh"
		license="CC-BY-NC"
		id="123"
	/>
</div>
