const express = require("express");
const expressHbs = require("express-handlebars");
const hbs = require("hbs");
 
const app = express();

// app.engine("hbs", expressHbs.engine(
//     {
//         layoutsDir: "views/layouts", 
//         defaultLayout: "layout",
//         extname: "hbs"
//     }
// ));

hbs.registerHelper("getTime", function(){
      
    const myDate = new Date();
    const hour = myDate.getHours();
    let minute = myDate.getMinutes();
    let second = myDate.getSeconds();
    if (minute < 10) {
        minute = "0" + minute;
    }
    if (second < 10) {
        second = "0" + second;
    }
    return `Текущее время: ${hour}:${minute}:${second}`;
});

hbs.registerHelper("createStringList", function(array){
      
    let result="";
    for(let i=0; i<array.length; i++){
        result +=`<li>${array[i]}</li>`;
    }
    return new hbs.SafeString(`<ul>${result}</ul>`);
});

app.set("view engine", "hbs");
app.set("view options", {layout: "layouts/layout"});
hbs.registerPartials(__dirname + "/views/partials");

app.use("/contact", function(_, response){
    response.render("contact", {
        title: "Мои контакты",
        email: "gavgav@mycorp.com",
        phone: "+1234567890"
    });
});
app.use("/", function(_, response){     
    response.render("home.hbs", {
        fruit: [ "apple", "lemon", "banana", "grape"]
    });
});

app.listen(3000);