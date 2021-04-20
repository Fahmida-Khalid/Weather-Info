const express= require("express");
const https= require("https");
const bodyParser= require("body-parser");

const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");

});

app.post("/",function(req,res){

query=req.body.CityName;
apiKey="a9392a4f30a0748213a30bc923bbffbc";
// unit="metric";
const url="https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=a9392a4f30a0748213a30bc923bbffbc&units=metric";
https.get(url,function(response){
// console.log(response.statusCode);
  response.on("data",function(data){
    const weatherData=JSON.parse(data);
const temp =weatherData.main.temp;
const icon=weatherData.weather[0].icon;
const des=weatherData.weather[0].description;
const imageURl= "https://openweathermap.org/img/wn/" + icon + "@2x.png";

res.write("<div ><h1 >The temparature in "+query+ " is "+temp+ " degree Celcius</h1></div>");
res.write("<p>The sky is " + des+".</p>");
res.write("<img src=" + imageURl +  "  >");
res.send();


});
});
});
app.listen(3000,function(){
  console.log("server is running on port 3000");
});
