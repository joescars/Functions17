module.exports = function (context, req) {
    context.log('--------> Store Mention Triggered');

    if  (typeof req.body != 'undefined' && typeof req.body == 'object') {
        
        var myMention = new TweetMention(req.body.tweetText,req.body.tweetedBy,req.body.score);
        context.bindings.out = myMention;

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Mention Received "
        };

    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a body in"
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

function TweetMention(tweetText, tweetedBy, score) {
    this.PartitionKey = "tweets";
    this.RowKey = guid();
    this.tweetedBy = tweetedBy;
    this.tweetText = tweetText;
    this.score = score;
}

/*
https://functions17logic.azurewebsites.net/api/StoreMention
*/