let express = require("express");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

let app = express();

app.set('port', (process.env.PORT || 5000));

app.get("/:date", (req, res) => {
  let result = { unix: null, natural: null };
  let d = null;
  // check if its unix 
  if(req.params.date == +req.params.date) {
      // unix
      d = new Date((+req.params.date)*1000);
  } else {
      // natural
    d = new Date(req.params.date);
  }

  if (Object.prototype.toString.call(d) === "[object Date]") {
    // it is a date
    let unixtime = d.getTime();
    if (!isNaN(unixtime)) {
      // date is valid
      result.unix = unixtime/1000;
      result.natural = months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
    }
  }
  res.send(result);
});

app.get("/", (req, res) => {
    let html = "<!DOCTYPE html><html>" +
            "<head><title>Timestamp Microservice</title></head>" +
            "<body><h1>Timestamp microservice<h1>" +
            "<h4>Input format</h4><ul> <li>https://" +
            req.headers.host +"/May%201,%202017</li><li>https://" +
            req.headers.host +"/1493596800</li></ul>" +
            "<h4>Output format</h4>" +
            "<p>{\"unix\":1493596800,\"natural\":\"May 1, 2017\"}</p>"
            "</body></html>";
    res.send(html);
})

app.listen(app.get('port'), function() {
  console.log('Timestamp is running on port', app.get('port'));
});
