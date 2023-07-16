const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const { log } = require("console");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  var jsonData = JSON.stringify(data);
  var url = "https://us21.api.mailchimp.com/3.0/lists/bb8df62092";
  var option = {
    method: "POST",
    auth: "gentaro:42191a1c0b89deb63c02bda697fb14e3-us21",
  };
  const request = https.request(url, option, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

app.listen(process.env.PORT || 3001, function (req, res) {
  console.log("Server is running...");
});

//API key
//42191a1c0b89deb63c02bda697fb14e3-us21

//list id
//bb8df62092
