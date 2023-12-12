import { error } from '@sveltejs/kit';
import { createClient, Query } from 'solr-client';
import SolrQueryBuilder from 'solr-query-builder';

export async function load({ params }) {
	const intId = parseInt(params.speciesId);

	if (isNaN(intId)) throw error(404, 'Invalid species ID');

	const client = createClient({ host: 'localhost', core: 'species', port: '8983' });

	const qb = new SolrQueryBuilder();

	qb.where('index').equals(intId);

	const query = new Query().q(qb.build());

	const result = await client.search(query, function (err, result) {
        if (err) {
            console.log(err);
            throw error(500, 'Internal Server Error :(');
        }
        else {
            console.log('Response:', result.response);
            return result.response;
        }
    });

    console.log("bool = " + (result.response.numFound === 0));
    if (result.response.numFound === 0) {
    
        throw error(404, "No species found with that ID")
    }

    return {
        result: result.response.docs[0]
    }    


}
