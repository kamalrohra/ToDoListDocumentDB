const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))

var today = new Date();
var day = "";
var items = ["food","clothes","bla"];
var workitems = ["hw","ps","js"];




app.get("/", function(req, res) {
  var options = {  weekday: 'long', year: 'numeric', month: 'long'}
  day = today.toLocaleString('en-us',options);
  res.render('list',{myday:day , newListIems:items});

});

app.get("/work",function(req,res){
  day = "work";
  res.render('list',{myday:day , newListIems:workitems})

  });

app.post("/",function(req,res){
  var item = req.body.NextItem;
  if(req.body.list ==="work"){
    workitems.push(item);
    res.redirect("/work");
  }else{
    items.push(item);
    res.redirect("/")
  }



});




app.listen(3000, function() {
  console.log("port running on 3000");
});
