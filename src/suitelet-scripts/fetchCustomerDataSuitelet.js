/**
*@NApiVersion 2.x
*@NScriptType Suitelet
*/
define(['N/https', 'N/search'], function(https, search) {
    function onRequest(context) {
        if (context.request.method === 'GET') {
            var customerSearch = search.create({
                type: search.Type.CUSTOMER,
                columns: ['entityid', 'companyname', 'email'],
                filters: []
            });

            var results = [];
            customerSearch.run().each(function(result) {
                results.push({
                    id: result.id,
                    name: result.getValue('entityid'),
                    companyName: result.getValue('companyname'),
                    email: result.getValue('email')
                });
                return true;
            });

            context.response.setHeader({
                name: 'Content-Type',
                value: 'application/json'
            });
            context.response.write(JSON.stringify(results));
        }
    }
    return {
        onRequest: onRequest
    };
});
