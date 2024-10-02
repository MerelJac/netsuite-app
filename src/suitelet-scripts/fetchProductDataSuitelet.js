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

                // Log the limit and offset for debugging
                log.debug('Limit and Offset', 'Limit: ' + limit + ', Offset: ' + offset);

                // Create the item search (products)
                var productSearch = search.create({
                    type: search.Type.ITEM, // This represents products
                    columns: [
                        'itemid',               // SKU or item name
                        'displayname',          // Product name/details
                        'baseprice',            // Base price
                        'storedisplayimage',    // Image URL or internal ID
                        'storedisplayname',     // Display name for the store
                    ],
                    filters: []  // You can add filters here if you want to restrict the search (e.g., by category)
                });

                // Use getRange to retrieve a specific range of products
                var results = [];
                var searchResults = productSearch.run().getRange({
                    start: offset,
                    end: offset + limit  // Fetch only the range specified by limit and offset
                });

                // Log the number of search results returned
                log.debug('Search Results', 'Number of results: ' + searchResults.length);

                // Loop over the results and prepare the response
                searchResults.forEach(function(result) {
                    results.push({
                        sku: result.getValue('itemid'),                   // SKU number
                        name: result.getValue('storedisplayname'),        // Product name/details
                        price: result.getValue('baseprice'),              // Price
                        image: result.getValue('storedisplayimage'),      // Image (URL or internal ID)
                        details: result.getValue('displayname'),          // Additional details or display name
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
                error: 'An error occurred while fetching product data',
                details: error.message
            });
        }
    }

    return {
        onRequest: onRequest
    };
});
