import { error } from '@sveltejs/kit';
import { createClient, Query } from 'solr-client';
import SolrQueryBuilder from 'solr-query-builder';

export async function load({ params }) {
    const handleQueryError = function (err, result, message) {
        if (err) {
            console.error(message, err);
            return null;
        }

        return result.response;
    }

    const result = {};

    const intId = parseInt(params.speciesId);

    if (isNaN(intId)) throw error(404, 'Invalid species ID');

    const speciesClient = createClient({ host: 'localhost', core: 'species', port: '8983' });
    const imagesClient = createClient({ host: 'localhost', core: 'images', port: '8983' });
    const observationsClient = createClient({ host: 'localhost', core: 'observations', port: '8983' });
    const summariesClient = createClient({ host: 'localhost', core: 'summaries', port: '8983' });
    const abstractsClient = createClient({ host: 'localhost', core: 'abstracts', port: '8983' });


    // species

    const query = new Query().q(new SolrQueryBuilder()
        .where('index').equals(intId).build());

    const speciesResult = (await speciesClient.search(query, function (err, result) {
        if (err) {
            console.log(err);
            throw error(500, 'Internal Server Error :(');
        }
    })).response;


    if (speciesResult.numFound === 0) {
        throw error(404, "No species found with that ID")
    }
    const speciesObject = speciesResult.docs[0];
    result['species'] = speciesObject;

    const speciesName = speciesObject.species;

    // summaries

    const summariesQuery = new Query().q(new SolrQueryBuilder()
        .where('species').equals(speciesName).build());

    const summariesResult = (await summariesClient.search(summariesQuery, handleQueryError, "Error searching summaries")).response;

    result['summaries'] = summariesResult.numFound > 0 ? summariesResult.docs : null;

    // abstracts

    const abstractsQuery = new Query().q(new SolrQueryBuilder()
        .where('species').equals(speciesName).build());

    const abstractsResult = (await abstractsClient.search(abstractsQuery, handleQueryError, "Error searching abstracts")).response;

    result['abstracts'] = abstractsResult.numFound > 0 ? abstractsResult.docs : null;

    // observations

    const observationsQuery = new Query().q(new SolrQueryBuilder()
        .where('species').equals(speciesName).build())
        .rows(100);

    const observationsResult = (await observationsClient.search(observationsQuery, handleQueryError, "Error searching observations")).response;

    result['observations'] = observationsResult.numFound > 0 ? observationsResult.docs : null;

    if (observationsResult.numFound == 0) {
        result['images'] = null;
        return result;
    }

    // images

    const gbifIdList = observationsResult.docs.map((doc) => doc.gbif_id);

    let images = [];

    for (let i = 0; i < gbifIdList.length; i++) {
        const gbifId = gbifIdList[i].toString();
        const query = new SolrQueryBuilder().where('gbif_id').equals(gbifId.toString());
        const imagesQuery = new Query().q(query.build()).rows(100);

        const imagesResult = (await imagesClient.search(imagesQuery, handleQueryError, "Error searching images")).response;

        if (imagesResult != null) {
            images = [...images, ...imagesResult.docs];
        }
    }

    result['images'] = images.length > 0 ? images : null;

    return result;
}
