import { error } from '@sveltejs/kit';
import { createClient, Query } from 'solr-client';
import SolrQueryBuilder from 'solr-query-builder';

export async function load({ params }) {
    const client = createClient({ host: 'localhost', core: 'observations', port: '8983' });

    const imageClient = createClient({ host: 'localhost', core: 'images', port: '8983' });
    const query = new Query().q(`*:*`);

    const results = (await client.search(query, function (err, result) {
        if (err) {
            console.log(err);
            throw error(500, 'Internal Server Error :(');
        }
    })).response;

    const images = {}
    for (const observation of results.docs) {
        const gbif_id = observation.gbif_id.toString();

        const imageQuery = new Query().q(new SolrQueryBuilder().where('gbif_id').equals(gbif_id.toString()).build());
        const imageResults = (await imageClient.search(imageQuery, function (err, result) {
            if (err) {
                console.log(err);
                throw error(500, 'Internal Server Error :(');
            }
        })).response;

        if (imageResults.docs.length > 0) {
            images[gbif_id] = imageResults.docs[0].identifier;
        } else {
            images[gbif_id] = null;
        }
    }

    return {
        observationsList: results.docs,
        images: images
    }
}