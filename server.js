const fs = require("fs");
const http = require("http");
var requests = require("requests")
const homeFile = fs.readFileSync("home.html", "utf-8");
const replaceVal = (tempval, orgval)=>{
  let temparature = tempval.replace("{%temp%}", orgval.main.temp);
   temparature = temparature.replace("{%mintemp%}", orgval.main.temp_min);
   temparature = temparature.replace("{%maxtemp%}", orgval.main.temp_max);
   temparature = temparature.replace("{%location%}", orgval.name);
   temparature = temparature.replace("{%country%}", orgval.sys.country);
   temparature = temparature.replace("{%tempstatus%}", orgval.weather[0].main);
   return temparature;
};

const server = http.createServer((req, res) =>{
    if(req.url == "/"){
        requests('https://api.openweathermap.org/data/2.5/weather?q=Mahabaleshwar&appid=da63616223384ba337656fbeee082e6d')
.on('data',  (chunk)=> {
    const objData = JSON.parse(chunk);
    const arrData = [objData]
 const realTimedata = arrData.map((val) => replaceVal(homeFile, val)).join(" ");
//  res.write(realdafsdaijf)
res.write(realTimedata);
res.end();
})
.on('end',  (err) =>{
  if (err) return console.log('connection closed due to errors', err);
 
  res.end();
});
    }
});
server.listen(8000, "127.0.0.1");
console.log("The server is listening on port 8000!")