import { error } from '@sveltejs/kit';
import { createClient, Query } from 'solr-client';
import SolrQueryBuilder from 'solr-query-builder';

export const ssr = false;

export async function load({ url }) {

    const searchParam = url.searchParams.get('query');

    if (!searchParam) {
        return {
            empty: true
        }
    }

    const speciesClient = createClient({ host: 'localhost', core: 'species', port: '8983' });
    const observationsClient = createClient({ host: 'localhost', core: 'observations', port: '8983' });
    const summariesClient = createClient({ host: 'localhost', core: 'summaries', port: '8983' });
    const abstractsClient = createClient({ host: 'localhost', core: 'abstracts', port: '8983' });

    const species = new Promise(async (resolve, reject) => {
        async function addResultsToList(results, list) {
            for (const observation of results) {
                const species = observation.species;
                const score = observation.score;
    
                const helperSpeciesQuery = new Query().q(new SolrQueryBuilder().where('species').equals(species).build());
                const helperSpeciesResult = (await speciesClient.search(helperSpeciesQuery, function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                })).response;
    
                if (helperSpeciesResult.numFound === 0) {
                    console.log('Species not found in species core: ' + species);
                    continue;
                }
    
                const helperSpecies = helperSpeciesResult.docs[0];
    
                helperSpecies['score'] = score;
                const existingSpecies = list.find(result => result.species === helperSpecies.species);
                if (existingSpecies) {
                    existingSpecies.score += helperSpecies.score / 3;
                } else {
                    list.push(helperSpecies);
                }
            }
        }
    
        let res = [];
        let futures = [];
    
        const speciesQueryQ = new SolrQueryBuilder()
            .where('species').equals(searchParam)
            .or().where('phylum').equals(searchParam)
            .or().where('specificEpithet').equals(searchParam)
            .or().where('genericName').equals(searchParam)
            .or().where('family').equals(searchParam)
            .build()
    
        const speciesQuery = new Query().q(speciesQueryQ)
            .qop('OR')
            .fl('*,score');
    
        const speciesResult = (await speciesClient.search(speciesQuery, function (err, result) {
            if (err) {
                console.log(err);
            }
        })).response;
    
        res.concat(speciesResult.docs);
    
        const summariesQueryQ = new SolrQueryBuilder()
            .where('content').equals(searchParam)
            .build();
    
        const summariesQuery = new Query().q(summariesQueryQ)
            .fl('*,score');
    
        const summariesResult = (await summariesClient.search(summariesQuery, function (err, result) {
            if (err) {
                console.log("err in summaries: " + err);
            }
        })).response;
    
        futures.push(addResultsToList(summariesResult.docs, res));
    
        const abstractsQueryQ = new SolrQueryBuilder()
            .where('content').equals(searchParam)
            .build();
    
        const abstractsQuery = new Query().q(abstractsQueryQ)
            .fl('*,score');
    
        const abstractsResult = (await abstractsClient.search(abstractsQuery, function (err, result) {
            if (err) {
                console.log("err in summaries: " + err);
            }
        })).response;
    
    
        futures.push(addResultsToList(abstractsResult.docs, res));
    
        for (const elem of futures) {
            await elem;
        }
    
    
        return resolve(res);
    })

    const observations = new Promise(async (resolve, reject) => {

        const observationsQueryQ = new SolrQueryBuilder()
            .where('country_code').equals(searchParam)
            .or().where('county').equals(searchParam)
            .or().where('parish').equals(searchParam)
            .or().where('district').equals(searchParam)
            .or().where('author').equals(searchParam)
            .build();

        const observationsQuery = new Query().q(observationsQueryQ)
            .qop('OR')
            .fl('*,score');

        const observationsResult = (await observationsClient.search(observationsQuery, function (err, result) {
            if (err) {
                console.log("err in observations: " + err);
            }
        })).response;

        return resolve(observationsResult.docs);
    });
    
    await species;
    await observations;

    return {
        species: species,
        observations: observations
    }


}