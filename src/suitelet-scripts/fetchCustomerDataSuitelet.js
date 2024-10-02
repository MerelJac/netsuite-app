/**
 *@NApiVersion 2.x
 *@NScriptType Suitelet
 */
 define(['N/search', 'N/log'], function(search, log) {
    function onRequest(context) {
        try {
            if (context.request.method === 'GET') {
                // Get limit and offset from the request (for pagination)
                var limit = parseInt(context.request.parameters.limit) || 10;
                var offset = parseInt(context.request.parameters.offset) || 0;

                // Log the limit and offset
                log.debug('Limit and Offset', 'Limit: ' + limit + ', Offset: ' + offset);

                // Create the customer search
                var customerSearch = search.create({
                    type: search.Type.CUSTOMER,
                    columns: ['entityid', 'companyname', 'email'],
                    filters: []  // Add filters if necessary to narrow down the results
                });

                // Use getRange to retrieve a specific range of results
                var results = [];
                var searchResults = customerSearch.run().getRange({
                    start: offset,
                    end: offset + limit  // Fetch only the range specified by limit and offset
                });

                // Log the number of search results returned
                log.debug('Search Results', 'Number of results: ' + searchResults.length);

                // Loop over the results and prepare the response
                searchResults.forEach(function(result) {
                    results.push({
                        id: result.id,
                        name: result.getValue('entityid'),
                        companyName: result.getValue('companyname'),
                        email: result.getValue('email')
                    });
                });

                // Return the results as JSON
                context.response.setHeader({
                    name: 'Content-Type',
                    value: 'application/json'
                });

                context.response.write(JSON.stringify(results));
            }
        } catch (error) {
            // Log the error and return a meaningful message
            log.error('Error in Suitelet', error.message);
            context.response.write({
                error: 'An error occurred while fetching customer data',
                details: error.message
            });
        }
    }

    return {
        onRequest: onRequest
    };
});
