<script>
	import { createClient, Query } from 'solr-client';
	import SolrQueryBuilder from 'solr-query-builder';
    import { ConicGradient } from '@skeletonlabs/skeleton';
    
    export let speciesName;

	async function speciesObsAndImage(speciesName) {
		//const imagesClient = createClient({ host: 'localhost', core: 'images', port: '8983' });
        return {}
        /*
		const observationsClient = createClient({
			host: 'localhost',
			core: 'observations',
			port: '8983'
		});

		const query = new Query().q(new SolrQueryBuilder().where('species').is(speciesName).build());

		const observations = observationsClient.search(query, (err, result) => {
			if (err) {
				console.log('Error while querying observations for species ' + speciesName + ':' + err);
				return;
			}
		});

		if (observations.response.numFound === 0) {
			return {
				observations: [],
				image: null
			};
		}

		for (const observation of observations.response.docs) {
			const imagesQuery = new Query().q(
				new SolrQueryBuilder().where('gbif_id').is(observation.gbif_id.toString()).build()
			);
            /*
			const images = imagesClient.search(imagesQuery, (err, result) => {
				if (err) {
					console.log('error while querying images for species ' + speciesName + ':' + err);
					return;
				}
			});

			if (images.response.numFound > 0) {
				return {
					observations: observations.response.docs,
					image: images.response.docs[0].identifier
				};
			}
        
		}

		return {
			observations: observations.response.docs,
			image: null
		};
        */
	}

    /*
	let obsAndImage = speciesObsAndImage(speciesName);

	const conicStops = [
		{ color: 'transparent', start: 0, end: 25 },
		{ color: 'rgb(var(--color-primary-500))', start: 75, end: 100 }
	];*/
</script>

{#await obsAndImage}
	<div class="w-full text-token grid grid-cols-1 md:grid-cols-2 gap-4">
		<!-- Minimal -->
		<div class="card bg-primary-500 p-4 flex justify-center items-center"><span>Minimal</span></div>
		<!-- Detailed -->
		<a class="card bg-primary-500 card-hover overflow-hidden" href="/elements/cards">
			<header>
				<ConicGradient class="bg-black/50 w-full" stops={conicStops} spin>Loading</ConicGradient>
			</header>
			<div class="p-4 space-y-4">
				<h6 class="h6" data-toc-ignore>Announcements</h6>
				<h3 class="h3" data-toc-ignore>Skeleton is Awesome!</h3>
				<article>
					<p>
						<!-- cspell:disable -->
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam aspernatur provident eveniet
						eligendi cumque consequatur tempore sint nisi sapiente. Iste beatae laboriosam iure molestias
						cum expedita architecto itaque quae rem.
						<!-- cspell:enable -->
					</p>
				</article>
			</div>
			<hr class="opacity-50" />
			<footer class="p-4 flex justify-start items-center space-x-4">
				<h1>hi</h1>
			</footer>
		</a>
	</div>
{:then res}
	<div class="w-full text-token grid grid-cols-1 md:grid-cols-2 gap-4">
		<!-- Minimal -->
		<div class="card bg-primary-500 p-4 flex justify-center items-center"><span>Minimal</span></div>
		<!-- Detailed -->
		<a class="card bg-primary-500 card-hover overflow-hidden" href="/elements/cards">
			<header>
				<ConicGradient class="bg-black/50 w-full" stops={conicStops} spin>Loading</ConicGradient>
			</header>
			<div class="p-4 space-y-4">
				<h6 class="h6" data-toc-ignore>Announcements</h6>
				<h3 class="h3" data-toc-ignore>Skeleton is Awesome!</h3>
				<article>
					<p>
						<!-- cspell:disable -->
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam aspernatur provident eveniet
						eligendi cumque consequatur tempore sint nisi sapiente. Iste beatae laboriosam iure molestias
						cum expedita architecto itaque quae rem.
						<!-- cspell:enable -->
					</p>
				</article>
			</div>
			<hr class="opacity-50" />
			<footer class="p-4 flex justify-start items-center space-x-4">
				<h1>hi</h1>
			</footer>
		</a>
	</div>
{/await}
