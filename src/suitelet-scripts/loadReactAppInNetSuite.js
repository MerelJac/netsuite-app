/**
 *@NApiVersion 2.x
 *@NScriptType Suitelet
 */
 define(['N/file', 'N/record', 'N/log'], function(file, record, log) {
    function onRequest(context) {
        if (context.request.method === 'GET') {
            try {
                // Load the React app's index.html file from the File Cabinet
                var indexFile = file.load({
                    id: 'SuiteScripts/ReactApp/build/index.html'  // Adjust this path based on where you uploaded your files
                });
                
                // Serve the HTML file as the response
                context.response.write({
                    output: indexFile.getContents()
                });

                context.response.setHeader({
                    name: 'Content-Type',
                    value: 'text/html'
                });
            } catch (error) {
                log.error('Error Loading React App', error);
                context.response.write('Error loading the React application.');
            }
        }
    }

    return {
        onRequest: onRequest
    };
});
