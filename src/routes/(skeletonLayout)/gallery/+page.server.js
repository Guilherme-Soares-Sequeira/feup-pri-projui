import { error } from '@sveltejs/kit';
import { createClient, Query } from 'solr-client';
import SolrQueryBuilder from 'solr-query-builder';

export async function load({ params }) {
    const client = createClient({ host: 'localhost', core: 'images', port: '8983' });

    const query = new Query().q(`*:*`);

    const results = (await client.search(query, function (err, result) {
        if (err) {
            console.log(err);
            throw error(500, 'Internal Server Error :(');
        }
    })).response;


    return {
        images: results.docs
    }
}