<script>
	import { popup, ListBox, ListBoxItem } from '@skeletonlabs/skeleton';

	export let data;

	const observationsList = data.observationsList;

	const images = data.images;

	const countries = new Set(
		observationsList?.map((observation) => observation.country_code).filter(Boolean)
	);
	const districts = new Set(
		observationsList?.map((observation) => observation.district).filter(Boolean)
	);
	const counties = new Set(
		observationsList?.map((observation) => observation.county).filter(Boolean)
	);
	const parishes = new Set(
		observationsList?.map((observation) => observation.parish).filter(Boolean)
	);
	const authors = new Set(
		observationsList?.map((observation) => observation.author).filter(Boolean)
	);

	let countryValue;
	let districtValue;
	let countyValue;
	let parishValue;
	let authorValue;

	$: filteredObservations = observationsList?.filter(
		(observation) =>
			(!districtValue || districtValue === "---" || observation.district === districtValue) &&
			(!countryValue || countryValue === "---" || observation.country_code === countryValue) &&
			(!countyValue || countyValue === "---" || observation.county === countyValue) &&
			(!parishValue || parishValue === "---" || observation.parish === parishValue) &&
			(!authorValue || authorValue === "---" || observation.author === authorValue)
	);

	const countryPopupCombobox = {
		event: 'focus-click',
		target: 'countryPopupCombobox',
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};

	const districtPopupCombobox = {
		event: 'focus-click',
		target: 'districtPopupCombobox',
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};


	const countyPopupCombobox = {
		event: 'focus-click',
		target: 'countyPopupCombobox',
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};


	const parishPopupCombobox = {
		event: 'focus-click',
		target: 'parishPopupCombobox',
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};


	const authorPopupCombobox = {
		event: 'focus-click',
		target: 'authorPopupCombobox',
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};

</script>

<div class="flex flex-row justify-center gap-5 w-10/12 m-auto">
	<button class="btn variant-filled w-48 justify-between" use:popup={countryPopupCombobox}>
		<span class="capitalize">{countryValue ?? 'Country'}</span>
		<span>↓</span>
	</button>
	<button class="btn variant-filled w-48 justify-between" use:popup={districtPopupCombobox}>
		<span class="capitalize">{districtValue ?? 'District'}</span>
		<span>↓</span>
	</button>
	<button class="btn variant-filled w-48 justify-between" use:popup={countyPopupCombobox}>
		<span class="capitalize">{countyValue ?? 'County'}</span>
		<span>↓</span>
	</button>
	<button class="btn variant-filled w-48 justify-between" use:popup={parishPopupCombobox}>
		<span class="capitalize">{parishValue ?? 'Parish'}</span>
		<span>↓</span>
	</button>
	<button class="btn variant-filled w-48 justify-between" use:popup={authorPopupCombobox}>
		<span class="capitalize">{authorValue ?? 'Author'}</span>
		<span>↓</span>
	</button>
</div>

<div class="flex flex-row flex-wrap p-6 gap-3 variant-glass-primary m-2">
	{#each filteredObservations as observation}
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

<div class="card w-48 shadow-xl py-2" data-popup="countryPopupCombobox">
	<ListBox rounded="rounded-none">
		{#each countries as country}
			<ListBoxItem bind:group={countryValue} name="medium" value={country}
				>{country}</ListBoxItem
			>
		{/each}
		<ListBoxItem bind:group={countryValue} name="medium" value="---">---</ListBoxItem>
	</ListBox>
	<div class="arrow bg-surface-100-800-token" />
</div>

<div class="card w-48 shadow-xl py-2" data-popup="districtPopupCombobox">
	<ListBox rounded="rounded-none">
		{#each districts as district}
			<ListBoxItem bind:group={districtValue} name="medium" value={district}
				>{district}</ListBoxItem
			>
		{/each}
		<ListBoxItem bind:group={districtValue} name="medium" value="---">---</ListBoxItem>
	</ListBox>
	<div class="arrow bg-surface-100-800-token" />
</div>

<div class="card w-48 shadow-xl py-2" data-popup="countyPopupCombobox">
	<ListBox rounded="rounded-none">
		{#each counties as county}
			<ListBoxItem bind:group={countyValue} name="medium" value={county}
				>{county}</ListBoxItem
			>
		{/each}
		<ListBoxItem bind:group={countyValue} name="medium" value="---">---</ListBoxItem>
	</ListBox>
	<div class="arrow bg-surface-100-800-token" />
</div>

<div class="card w-48 shadow-xl py-2" data-popup="parishPopupCombobox">
	<ListBox rounded="rounded-none">
		{#each parishes as parish}
			<ListBoxItem bind:group={parishValue} name="medium" value={parish}
				>{parish}</ListBoxItem
			>
		{/each}
		<ListBoxItem bind:group={parishValue} name="medium" value="---">---</ListBoxItem>
	</ListBox>
	<div class="arrow bg-surface-100-800-token" />
</div>

<div class="card w-48 shadow-xl py-2" data-popup="authorPopupCombobox">
	<ListBox rounded="rounded-none">
		{#each authors as author}
			<ListBoxItem bind:group={authorValue} name="medium" value={author}
				>{author}</ListBoxItem
			>
		{/each}
		<ListBoxItem bind:group={authorValue} name="medium" value="---">---</ListBoxItem>
	</ListBox>
	<div class="arrow bg-surface-100-800-token" />
</div>
