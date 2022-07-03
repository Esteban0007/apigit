const express = require("express");
const hbs = require("hbs");
const path  = require("path");
const bodyParser = require('body-parser')

const app = express()
app.set('port', 3000);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }))

app.get ('/', async function (req,res,next){
  res.render('main');
});


app.post('/users', (req,res,next) => {
 const searchUser = req.body.username;
 fetch  ('https://api.github.com/users/' + searchUser)
 .catch(err => console.log('Solicitud fallida', err))
  .then( response => response.json())
  .then ( data => {
 const data2 = {
    "name": data.login,
    "repos_url": data.repos_url
}; 
  console.log(data2);
  res.render('users',  {data: data2});
  })
})
 

app.use((req, res, next) => {
    res.status(404).send(
        "<h1>Error: 404 Not found </h1>")
})


app.listen(app.get('port'), function (){
console.log('Node runing on port', app.get('port'));
});