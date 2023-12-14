import { error } from '@sveltejs/kit';
import { createClient, Query } from 'solr-client';

export async function load({ params }) {
    const client = createClient({ host: 'localhost', core: 'species', port: '8983' });

    const query = new Query().q(`*:*`);

    const results = (await client.search(query, function (err, result) {
        if (err) {
            console.log(err);
            throw error(500, 'Internal Server Error :(');
        }
    })).response;

    return {
        speciesList: results.docs
    }
}