var express=require("express")
var app= express()
var ejs=require("ejs")
var Client=require("mongodb").MongoClient
var url="mongodb://localhost:27017"

app.use("/upload",express.static("upload"))
app.set("view engine","html")
app.engine("html",ejs.__express)


app.get("/list",(req,res)=>{
    console.log(111111)
    Client.connect(url,(err,client)=>{
        let collection=client.db("mydb").collection("goods")
        collection.find({}).toArray((err,result)=>{
            result.forEach((item)=>{
                item.pic="http://localhost:3001/"+item.pic.replace(/\\/g,"/")
            })
            res.writeHead(200,{"Content-Type":"application/json"})
            res.write(JSON.stringify(result))
            res.end()
        })
    })
})
app.get("/type",(req,res)=>{
    console.log(111111)
    Client.connect(url,(err,client)=>{
        let collection=client.db("mydb").collection("type")
        collection.find({}).toArray((err,result)=>{
            result.forEach((item)=>{
                item.pic="http://localhost:3001/"+item.pic.replace(/\\/g,"/")
            })
            res.writeHead(200,{"Content-Type":"application/json"})
            res.write(JSON.stringify(result))
            res.end()
        })
    })
})

app.listen(3001)