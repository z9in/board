const express = require('express');
const app = express();
const fs = require('fs');
const readFile = fs.readFileSync('DBMS.json', 'utf-8');
const jsonDB = JSON.parse(readFile);
let posts = [...jsonDB];
console.log(posts);

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get('/', (req, res)=>{
    res.render('index.ejs', {posts});
})

app.get('/about',(req,res)=>{
    res.render('./pages/about.ejs');
})

app.post('/create', (req, res)=>{
    let post = req.body.post;
    posts.push(post);
    console.log(posts);
    fs.writeFileSync('DBMS.json', JSON.stringify(posts));
    res.redirect('/')
})

app.post('/remove', (req,res)=>{
    let num = req.body.text;
    console.log(num);
    posts.splice(num,1);
    console.log(posts);
    fs.writeFileSync('DBMS.json',JSON.stringify(posts));
    res.redirect('/');
})

app.listen(3005, (req, res)=>{
    console.log('3005 서버 열림')
})