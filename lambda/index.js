var moment = require("moment");

const mysql = require("serverless-mysql")({
  config: {
    host: "mskmed.cseiacflig8q.us-east-1.rds.amazonaws.com",
    database: "MSKMed",
    user: "admin",
    password: "kallen2020",
  },
});

// Main handler function
exports.handler = async (event, context) => {
  // Get message and parse for JSON data
  var message = event.Records[0].Sns.Message;
  var data = JSON.parse(message);

  var timeNow = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");

  // Run your query
  let results = await mysql.query(
    `INSERT INTO Messages (InboundMessageID, PreviousMessageID, OriginationNumber, DestinationNumber, MessageKeyword, MessageBody, MessageTime) VALUES (${JSON.stringify(
      data.inboundMessageId
    )}, ${JSON.stringify(data.previousPublishedMessageId)}, ${JSON.stringify(
      data.originationNumber
    )}, ${JSON.stringify(data.destinationNumber)}, ${JSON.stringify(
      data.messageKeyword
    )}, ${JSON.stringify(data.messageBody)},  "${timeNow}");`
  );

  // Run clean up function
  await mysql.end();

  // Return the results
  return results;
};
