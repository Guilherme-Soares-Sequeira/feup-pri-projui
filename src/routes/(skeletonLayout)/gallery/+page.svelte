<script>
	import { popup, ListBox, ListBoxItem } from '@skeletonlabs/skeleton';

	export let data;

	const images = data.images;

	const licenses = new Set(images?.map((image) => image.license).filter(Boolean));
	const rightsHolders = new Set(images?.map((image) => image.rightsHolder).filter(Boolean));

	let licenseValue;
	let rightsHolderValue;

	$: filteredImages = images?.filter(
		(image) =>
			(!licenseValue || licenseValue === '---' || image.license === licenseValue) &&
			(!rightsHolderValue ||
				rightsHolderValue === '---' ||
				image.rightsHolder === rightsHolderValue)
	);

	const licensePopupCombobox = {
		event: 'focus-click',
		target: 'licensePopupCombobox',
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};

	const rightsHolderPopupCombobox = {
		event: 'focus-click',
		target: 'rightsHolderPopupCombobox',
		placement: 'bottom',
		closeQuery: '.listbox-item'
	};
</script>

<div class="flex flex-row justify-center gap-5 w-10/12 m-auto">
	<button class="btn variant-filled min-w-fit w-80 justify-between" use:popup={licensePopupCombobox}>
		<span class="capitalize">{licenseValue ?? 'License'}</span>
		<span>↓</span>
	</button>
	<button class="btn variant-filled w-48 justify-between" use:popup={rightsHolderPopupCombobox}>
		<span class="capitalize">{rightsHolderValue ?? 'Rights Holder'}</span>
		<span>↓</span>
	</button>
</div>

<div class="flex flex-row flex-wrap p-6 gap-3">
	{#each filteredImages as image}
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
</div>

<div class="card w-80 shadow-xl py-2" data-popup="licensePopupCombobox">
	<ListBox rounded="rounded-none">
		{#each licenses as license}
			<ListBoxItem bind:group={licenseValue} name="medium" value={license}>{license}</ListBoxItem>
		{/each}
		<ListBoxItem bind:group={licenseValue} name="medium" value="---">---</ListBoxItem>
	</ListBox>
	<div class="arrow bg-surface-100-800-token" />
</div>

<div class="card w-48 shadow-xl py-2" data-popup="rightsHolderPopupCombobox">
	<ListBox rounded="rounded-none">
		{#each rightsHolders as rightsHolder}
			<ListBoxItem bind:group={rightsHolderValue} name="medium" value={rightsHolder}
				>{rightsHolder}</ListBoxItem
			>
		{/each}
		<ListBoxItem bind:group={rightsHolderValue} name="medium" value="---">---</ListBoxItem>
	</ListBox>
	<div class="arrow bg-surface-100-800-token" />
</div>
