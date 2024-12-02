const express = require("express")
require('./DB/config')
const users = require('./DB/user')
const products = require('./DB/product')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors());

app.post('/register',async (req,res)=>{
    const user = new users(req.body)
    const user1 =(await user.save()).toObject();
    delete user1.password
    res.send(user1)
})
app.post('/login',async (req,res)=>{
   if(req.body.password && req.body.email){
    const user = await users.findOne(req.body).select("-password")
    if(user){
        res.send(user)
    }else{
        res.send("user not found")
    }
   }
})
app.post('/addProduct',async(req,res)=>{
    const product = new products(req.body)
    const productSave = await product.save()
    res.send(productSave)
})

app.get('/product',async(req,res)=>{
    
    const product = await products.find()
    if(product.length>0){
        res.send(product)
    }else{
        res.send("No Products")
    }
})

app.get('/product/:id',async(req,res)=>{
    
    const update = await products.findOne({_id:req.params.id})
    if(update){
        res.send(update)
    }else{
        res.send({update:"No record found!"})
    }
})

app.delete('/product/:id',async(req,res)=>{
    const deletedProduct = await products.deleteOne({_id:req.params.id})
    res.send(deletedProduct)
})

app.put('/product/:id', async(req,res)=>{
    const change = await products.updateOne({_id:req.params.id},{
        $set : req.body
    })
    res.send(change)
})

app.get('/search/:key',async(req,res)=>{
    const search = await products.find({
        "$or":[
            {name:{$regex:req.params.key}},
            {price:{$regex:req.params.key}},
            {company:{$regex:req.params.key}},
            {category:{$regex:req.params.key}}
        ]
    })
    res.send(search)
})
app.put('/user/:id', async(req,res)=>{
    const updateUserInfo = await users.updateOne({_id:req.params.id},{
        $set : req.body
    })
    res.send(updateUserInfo)
})

app.post('/password',async(req,res)=>{
    if(req.body.password && req.body._id){
        const password = await users.findOne(req.body).select("-password")
        if(password){
            res.send(password)
        }else{
            res.send("Incorrect Password")
        }
    }
})

app.put('/password/:id', async(req,res)=>{
    const updatePassword = await users.updateOne({_id:req.params.id},{
        $set : req.body
    })
    res.send(updatePassword)
})

app.post('/checkEmail', async(req,res)=>{
    if(req.body.email){
        const info = await users.findOne(req.body).select("-password")
        res.send(info)
    }else{
        res.send("Email doesn't exist in database")
    }
     
})

app.listen(1010)
