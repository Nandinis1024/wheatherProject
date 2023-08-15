const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const port = 3000;



const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");

})

app.post("/", function(req, res){
  
    const query = req.body.city;
    const apiKey = "ccd1e80afa314a4f9e3182808230306";
    const url = "https://api.weatherapi.com/v1/current.json?key="+apiKey+"&q="+query+"&aqi=no";
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const wheatherData = JSON.parse(data);
            const temp = wheatherData.location.lon;
            res.write("<h1>the location of "+query+" is " + temp + "</h1>");
            
        })

    });


})

app.listen(port, function(){
    console.log(`http://localhost:${port}`);
})
