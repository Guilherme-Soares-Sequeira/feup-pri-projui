import { error } from '@sveltejs/kit';
import { createClient, Query } from 'solr-client';
import SolrQueryBuilder from 'solr-query-builder';


export async function load({ params }) {
    const imageClient = createClient({ host: 'localhost', core: 'images', port: '8983' });
    
    const queryQ = new SolrQueryBuilder().where('index').equals(params.imageId.toString());

    const imageQuery = new Query().q(queryQ.build());

    const imageResult = (await imageClient.search(imageQuery, function (err, _) {
        if (err) {
            console.log(err);
            throw error(500, 'Internal Server Error :(');
        }
    })).response;

    if (imageResult.numFound === 0) {
        throw error(404, "No image found with that ID")
    }

    const observationsClient = createClient({ host: 'localhost', core: 'observations', port: '8983' });
    
    const observationsQuery = new Query().q(new SolrQueryBuilder()
        .where('gbif_id').equals(imageResult.docs[0].gbif_id.toString()).build());

    const observationsResult = (await observationsClient.search(observationsQuery, function (err, _) {
        if (err) {
            console.log(err);
            throw error(500, 'Internal Server Error :(');
        }
    })).response;

    if (observationsResult.numFound === 0) {
        throw error(500, "Couldn't find information about this image's observation");
    }

    return {
        image: imageResult.docs[0],
        speciesName: observationsResult.docs[0].species,
    }

}