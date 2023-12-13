<script>
	let carousel;

	function multiColumnLeft() {
		let x = carousel.scrollWidth;
		if (carousel.scrollLeft !== 0) x = carousel.scrollLeft - carousel.clientWidth;
		carousel.scroll(x, 0);
	}

	function multiColumnRight() {
		let x = 0;
		if (carousel.scrollLeft < carousel.scrollWidth - carousel.clientWidth - 1)
			x = carousel.scrollLeft + carousel.clientWidth;
		carousel.scroll(x, 0);
	}
</script>

<div class="grid grid-cols-[auto_1fr_auto] gap-4 items-center">
	<!-- Button: Left -->
	<button type="button" class="btn-icon variant-filled" on:click={multiColumnLeft}>
		<i class="fa-solid fa-arrow-left" />
	</button>
	<!-- Carousel -->
	<div
		bind:this={carousel}
		class="snap-x snap-mandatory scroll-smooth flex gap-2 pb-2 overflow-x-auto"
	>
		<slot />
	</div>
	<!-- Button-Right -->
	<button type="button" class="btn-icon variant-filled" on:click={multiColumnRight}>
		<i class="fa-solid fa-arrow-right" />
	</button>
</div>
