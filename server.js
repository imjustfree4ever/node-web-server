
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials/');

app.set('view engine', 'hbs');



app.use( (req, res, next) => {

    var now = new Date().toString()
    var log = `${now} :  ${req.method}  ${req.url}`;
    fs.appendFile('server.log',`${log}\n`, (err) =>{
        if(err)
        console.log('Unable to append to server log');
    });
    console.log(log);
    next();
})




// app.use( (req, res, next) => {
//     res.render('maintenance.hbs');
// });

var option = {
    dotfiles: 'ignore',
    etag : false,
    extensions: ['htm', 'html'],
    index:false,
    maxAge: 'id',
    redirect: false,
};
app.use(express.static (__dirname +'/public', option));


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});


hbs.registerHelper('screamIt', (msg)=>{
   return  msg.toUpperCase();
})



app.get('/', (req, res) => {

    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMsg: 'Hello world new root Page',
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle : 'About Page',
    });
});


app.get('/bad', (req, res) => {
    //res.render('help')
});


app.listen(port, () =>{
    console.log('server is up on port 3000');
});