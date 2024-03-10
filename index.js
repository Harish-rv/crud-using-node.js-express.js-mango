const http = require('http');
const express = require('express');
const app = express();
const exhbs = require('express-handlebars');
const bodyparser = require('body-parser');
const dataBase = require('./db');
const obj = dataBase.objectId;
const port = 8000;

app.use(bodyparser.urlencoded());
app.engine('hbs',exhbs.engine({layoutsDir:'views/',defaultLayout:'crud',extname:'hbs'}));
app.set('view engine','hbs');
app.set('views','views');

app.get('/',async (req, res)=>{
    let message = 'node crud operation';
    let db = await dataBase.getDataBase('crud');
    let values = await db.collection('students').find({}).toArray();
    res.render('crud',{message,values});
});

app.post('/create',async (req, res)=>{
    console.log('ndddew');
    let db = await dataBase.getDataBase('crud');
    let insert = db.collection('students').insertOne({name:req.body.name});
    res.redirect('/');
});

app.get('/edit',async (req, res)=>{
    let message = 'EDIT FORM'
    let edit_id = req.query.edit_id;
    let db = await dataBase.getDataBase('crud');
    let values = await db.collection('students').findOne({'_id':obj(edit_id)}).toArray();
    res.render('crud',{message,values});
});


app.listen(port,()=>{ console.log('listening 8000 port') });