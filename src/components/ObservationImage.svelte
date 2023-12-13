<script>
    import { getContext } from 'svelte';
    import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';

    import { popup, storePopup } from '@skeletonlabs/skeleton';
    storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

    const popupHover = {
        event: 'hover',
        target: 'popupHover',
        placement: 'bottom'
    };

    const species = getContext('species');
    export let width;
    export let height;
    export let url;
    export let rightsholder;
    export let license;
    export let id;
</script>

<a href="/gallery/{id}" >
    <img
        src={url}
        alt="photo of {species} by: {rightsholder}"
        {width}
        {height}
        use:popup={popupHover}
	/>
</a>
<div class="card p-2 variant-glass-primary text-xs flex flex-col" data-popup="popupHover">
	<h2 class="font-bold text-center">{species}</h2>
	<h3 class="text-center">by: {rightsholder}</h3>
	<h3 class="text-center">license: {license}</h3>
	<div class="arrow variant-glass-primary" />
</div>
