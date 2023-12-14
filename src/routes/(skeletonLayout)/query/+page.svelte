<script>
	import { popup, ListBox, ListBoxItem } from '@skeletonlabs/skeleton';

	export let data;

	const empty = data.empty;

	const species = data.species?.sort((a, b) => b.score - a.score);
	const observations = data.observations?.sort((a, b) => b.score - a.score);

	const countries = new Set(
		observations?.map((observation) => observation.country_code).filter(Boolean)
	);
	const districts = new Set(
		observations?.map((observation) => observation.district).filter(Boolean)
	);
	const counties = new Set(
		observations?.map((observation) => observation.county).filter(Boolean)
	);
	const parishes = new Set(
		observations?.map((observation) => observation.parish).filter(Boolean)
	);
	const authors = new Set(
		observations?.map((observation) => observation.author).filter(Boolean)
	);

	let countryValue;
	let districtValue;
	let countyValue;
	let parishValue;
	let authorValue;

	$: filteredObservations = observations?.filter(
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



		<div class="flex flex-row flex-wrap p-6 gap-3 variant-glass-primary m-6">
			{#each filteredObservations as observation}
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

	{/if}
{/if}
