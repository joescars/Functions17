module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.query.name || (req.body && req.body.name)) {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Hello " + (req.query.name || req.body.name)
        };

        context.bindings.outputTable = [];
        
        context.bindings.outputTable.push({
            PartitionKey: "Test",
            RowKey: guid(),
            Name: (req.query.name || req.body.name)
        });

    }
    else {
        context.res = {
            status: 400,
            body: "Hey there, Please pass a name on the query string or in the request body"
        };
    }
    context.done();
};

function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }	