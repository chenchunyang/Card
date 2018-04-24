const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const expressArt = require('express-art-template');
const app = express();



// app.engine('art',expressArt);

app.use(express.static('www'));

app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect('mongodb://localhost:27017/card');
mongoose.Promise = global.Promise;


const db = mongoose.connection;


db.on('open', () => {
    console.log('打开数据库');
})
db.on('error', (error) => {
    console.log('连接数据库失败');
})


const schema = mongoose.Schema({
    name: String,
    position: String,
    address: String,
    tel: String,
    qq: String,
    email: String,
    intro:String

});

const Cards = mongoose.model('cards', schema);

app.get('/save', (req, res) => {
    //  res.setHeader('Content-Type', 'application/json');
    // console.log('11');
    console.log(req.query);
    const card = new Cards(req.query);
    // console.log(card);
    // card.save((error) => {
    //     // console.log(error);
    //     if (error) {
    //         // res.redirect('/error.html');
    //         res.json({ code: 0 });
    //     } else {
    //         // res.redirect('/login.html');
    //         res.json({ code: 1 });
    //     }
    // })
    // Cards.find({ _id: req.query._id }).then((data) => {
       
        Cards.findByIdAndUpdate(req.query.id,req.query,(error)=>{
            // console.log(data)
           res.json("更新成功")

         
        })
    // })
})

app.get('/card', (req, res) => {
    // console.log('有了')

    Cards.find().then((data) => {
       
            // console.log('123456')
            res.json({data})
         
        }
    )
})

app.get('/edit', (req, res) => {
    // console.log('有了')

    Cards.find().then((data) => {
       
            // console.log('123456')
            res.json({data})
         
        }
    )

})

app.listen(4000,()=>{
    console.log('监听4000端口');
})