<script>
	import { popup, ListBox, ListBoxItem } from '@skeletonlabs/skeleton';

	export let data;

	const speciesList = data.speciesList;

	const phylums = new Set(speciesList?.map((species) => species.phylum).filter(Boolean));
	const classes = new Set(speciesList?.map((species) => species.class).filter(Boolean));
	const families = new Set(speciesList?.map((species) => species.family).filter(Boolean));

	let phylumValue;
	let classValue;
	let familyValue;

	$: filteredSpecies = speciesList?.filter(
		(species) =>
			(!phylumValue || phylumValue === '---' || species.phylum === phylumValue) &&
			(!classValue || classValue === '---' || species.class === classValue) &&
			(!familyValue || familyValue === '---' || species.family === familyValue)
	);

	const phylumPopupCombobox = {
		event: 'focus-click',
		target: 'phylumPopupCombobox',
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};

	const classPopupCombobox = {
		event: 'focus-click',
		target: 'classPopupCombobox',
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};

	const familyPopupCombobox = {
		event: 'focus-click',
		target: 'familyPopupCombobox',
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};
</script>

<div class="flex flex-row justify-center gap-5 w-10/12 m-auto">
	<button class="btn variant-filled min-w-fit w-48 justify-between" use:popup={phylumPopupCombobox}>
		<span class="capitalize">{phylumValue ?? 'Phylum'}</span>
		<span>↓</span>
	</button>
	<button class="btn variant-filled min-w-fit w-48 justify-between" use:popup={classPopupCombobox}>
		<span class="capitalize">{classValue ?? 'Class'}</span>
		<span>↓</span>
	</button>
	<button class="btn variant-filled min-w-fit w-48 justify-between" use:popup={familyPopupCombobox}>
		<span class="capitalize">{familyValue ?? 'Family'}</span>
		<span>↓</span>
	</button>
</div>

<div class="flex flex-row flex-wrap p-6 gap-3">
	{#each filteredSpecies as species}
		<a href="/species/{species.index}" class="card card-hover variant-filled-primary p-4">
			<h1 class="card-header text-center bg-primary-400 w-full p-2 mb-2">{species.species}</h1>
			<h2 class="text-center">
				Phylum: {species.phylum ?? 'Unknown'}
			</h2>
			<h2 class="text-center">
				Class: {species.class ?? 'Unknown'}
			</h2>
			<h2 class="text-center">
				family: {species.family ?? 'Unknown'}
			</h2>
		</a>
	{/each}
</div>

<div class="card w-80 shadow-xl py-2" data-popup="phylumPopupCombobox">
	<ListBox rounded="rounded-none">
		{#each phylums as item}
			<ListBoxItem bind:group={phylumValue} name="medium" value={item}>{item}</ListBoxItem>
		{/each}
		<ListBoxItem bind:group={phylumValue} name="medium" value="---">---</ListBoxItem>
	</ListBox>
	<div class="arrow bg-surface-100-800-token" />
</div>

<div class="card w-80 shadow-xl py-2" data-popup="classPopupCombobox">
	<ListBox rounded="rounded-none">
		{#each classes as item}
			<ListBoxItem bind:group={classValue} name="medium" value={item}>{item}</ListBoxItem>
		{/each}
		<ListBoxItem bind:group={classValue} name="medium" value="---">---</ListBoxItem>
	</ListBox>
	<div class="arrow bg-surface-100-800-token" />
</div>

<div class="card w-80 shadow-xl py-2" data-popup="familyPopupCombobox">
	<ListBox rounded="rounded-none">
		{#each families as item}
			<ListBoxItem bind:group={familyValue} name="medium" value={item}>{item}</ListBoxItem>
		{/each}
		<ListBoxItem bind:group={familyValue} name="medium" value="---">---</ListBoxItem>
	</ListBox>
	<div class="arrow bg-surface-100-800-token" />
</div>
