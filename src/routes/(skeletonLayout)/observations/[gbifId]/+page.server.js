import { error } from '@sveltejs/kit';
import { createClient, Query } from 'solr-client';
import SolrQueryBuilder from 'solr-query-builder';

export async function load({ params }) {
    const client = createClient({ host: 'localhost', core: 'observations', port: '8983' });

    const imageClient = createClient({ host: 'localhost', core: 'images', port: '8983' });
    const query = new Query().q(new SolrQueryBuilder().where('gbif_id').equals(params.gbifId.toString()).build());

    const ret = {}

    const results = (await client.search(query, function (err, result) {
        if (err) {
            console.log(err);
            throw error(500, 'Internal Server Error :(');
        }
    })).response;

    if (results.numFound == 0) {
        throw error(404, 'Observation not found');
    }

    ret['observation'] = results.docs[0];

    const gbif_id = params.gbifId.toString();

    const imageQuery = new Query().q(new SolrQueryBuilder().where('gbif_id').equals(gbif_id.toString()).build());
    const imageResults = (await imageClient.search(imageQuery, function (err, result) {
        if (err) {
            console.log(err);
            throw error(500, 'Internal Server Error :(');
        }
    })).response;


    if (imageResults.docs.length > 0) {
        ret['images'] = imageResults.docs;
    } else {
        ret['images'] = null;
    }

    return ret;
}