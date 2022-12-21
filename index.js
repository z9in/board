const express = require('express');
const app = express();
const fs = require('fs');
const readFile = fs.readFileSync('DBMS.json', 'utf-8');
const readFilePwd = fs.readFileSync('pwd.json', 'utf-8');
const jsonDB = JSON.parse(readFile);
const jsonPwd = JSON.parse(readFilePwd);
let posts = [...jsonDB];
let number = [...jsonPwd];

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get('/', (req, res)=>{
    res.render('index.ejs', {posts, number});
})

app.get('/about',(req,res)=>{
    res.render('./pages/about.ejs');
})

app.post('/create', (req, res)=>{
    let pwd = req.body.pwd;
    let pwdq = Boolean(pwd);
    console.log(pwdq)
    if(pwdq == false) {
        res.send("<script>alert('비밀번호를 입력하세요'); window.location.replace('/');</script>")
    }else {
        let post = req.body.post;
        posts.push(post);
        number.push(pwd);
        fs.writeFileSync('DBMS.json', JSON.stringify(posts));
        fs.writeFileSync('pwd.json', JSON.stringify(number));
        res.redirect('/')
    }
    

})

app.post('/remove', (req,res)=>{
    let q = req.body.text
    let pwd = req.body.pwd;
   
    if(Boolean(pwd) == false) {
        res.send("<script>alert('비밀번호를 입력하세요'); window.location.replace('/');</script>")
    }else {
        let num = number.indexOf(pwd);
        if(q==num) {
            console.log(num);
            posts.splice(num,1);
            number.splice(num,1);
            fs.writeFileSync('DBMS.json',JSON.stringify(posts));
            fs.writeFileSync('pwd.json',JSON.stringify(number));
            res.redirect('/');
        }else {
          res.send("<script>alert('비밀번호가 틀렸습니다.'); window.location.replace('/');</script>")
        }
    }
    
})

app.listen(3005, (req, res)=>{
    console.log('3005 서버 열림')
})