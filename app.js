var express=require("express")
var app=express()
var ejs=require("ejs")
var multiparty=require("multiparty")
var ObjectID=require("mongodb").ObjectID
var fs=require("fs")
var Client=require("mongodb").MongoClient
var url="mongodb://localhost:27017"

app.set("view engine","html")
app.engine("html",ejs.__express)


app.use("/upload",express.static("upload"))
app.use(express.static("static"))



app.get("/list",(req,res)=>{
   
    Client.connect(url,(err,client)=>{
   let collection=client.db("mydb").collection("goods")
   collection.find().toArray((err,result)=>{
       if(err){
           console.log(err)
           return
       }
       res.render("list",{"result":result,id:11111})
   })
    })


})

app.get("/edit",(req,res)=>{
    res.render("edit")
})
app.get("/alter",(req,res)=>{
      let id=ObjectID(req.query.id)
      Client.connect(url,(err,client)=>{
        let collection=client.db("mydb").collection("goods")
        collection.find({_id:id}).toArray((err,result)=>{
          
            res.render("alter",{"result":result[0]})
        })      
      })
})
app.post("/doalter",(req,res)=>{
    let form=new multiparty.Form()
    form.uploadDir="upload"
    form.parse(req,(err,fields,files)=>{
        console.log(files)
        console.log(fields)
        let title=fields.title[0]
        let price=fields.price[0]
        let fee=fields.fee[0]
        let id=fields._id[0]
        let description=fields.description[0]
       let  pic=files.pic[0]. path
       if(files.pic[0]. originalFilename==""){
           var obj={
            title:title,
            price:price,
            fee:fee,
            description:description,
           }
       }else{
           var obj={
            title:title,
            price:price,
            fee:fee,
            description:description,
            pic:pic
           }
       }
       Client.connect(url,(err,client)=>{
        let collection=client.db("mydb").collection("goods")
        collection.updateOne({_id:ObjectID(id)},{$set:obj},(err,result)=>{
                   if(err){
                       console.log(err)
                       return
                   }
                   res.send("<script>alert('修改成功');location.href='/list'</script>")
        })
       })
    })

})


app.post("/doAdd",(req,res)=>{
       var form=new multiparty.Form()
       form.uploadDir="upload"
       form.parse(req,(err,fields,files)=>{
             let title=fields.title[0]
             let price=fields.price[0]
             let fee=fields.fee[0]
             let description=fields.description[0]
            let  pic=files.pic[0].path

          Client.connect(url,(err,client)=>{
              let collection=client.db("mydb").collection("goods")
              collection.insertOne({
                title:title,
                price:price,
                fee:fee,
                description:description,
                pic:pic
              },(err,result)=>{
                  if(err){
                      console.log(err)
                      return
                  }
                  res.send("<script>alert('添加成功');location.href='/list'</script>")
              })
          })
       })
})
app.get("/remove",(req,res)=>{
    let id=ObjectID(req.query.id)

    Client.connect(url,(err,client)=>{
        let collection=client.db("mydb").collection("goods")
        collection.find({_id:id}).toArray((err,result)=>{
            fs.unlinkSync(result[0].pic)
        }
        )
        collection.removeOne({_id:id},(err,result)=>{
            if(err){
                console.log(err)
                return
            }
            res.send("<script>alert('删除成功');location.href='/list'</script>")
        })
    })
})
app.get("/login",(req,res)=>{
    res.render("login")
})
app.post("/login",(req,res)=>{
    let form=new multiparty.Form()
    form.parse(req,(err,fields,files)=>{
        let name=fields.name[0]
        let pass=fields.pass[0]
    Client.connect(url,(err,client)=>{
        let collection=client.db("mydb").collection("goods")
    
    })
    })
})

app.get("/typeedit",(req,res)=>{
    res.render("typeedit")
})
app.post("/dotype",(req,res)=>{
    var form=new multiparty.Form()
    form.uploadDir="upload"
    form.parse(req,(err,fields,files)=>{
          let title=fields.title[0]
          let description=fields.description[0]
         let  pic=files.pic[0]. path

       Client.connect(url,(err,client)=>{
           let collection=client.db("mydb").collection("type")
           collection.insertOne({
             title:title,
             description:description,
             pic:pic
           },(err,result)=>{
               if(err){
                   console.log(err)
                   return
               }
               res.send("<script>alert('添加成功');location.href='/typelist'</script>")
           })
       })
    })

})
app.get("/typelist",(req,res)=>{

    Client.connect(url,(err,client)=>{
        let collection=client.db("mydb").collection("type")
        collection.find().toArray((err,result)=>{
            if(err){
                console.log(err)
                return
            }
            res.render("typelist",{"result":result,id:11111})
        })
         })


})

app.get("/typealter",(req,res)=>{
    let id=ObjectID(req.query.id)
    Client.connect(url,(err,client)=>{
      let collection=client.db("mydb").collection("type")
      collection.find({_id:id}).toArray((err,result)=>{
        
          res.render("typealter",{"result":result[0]})
      })      
    })


})

app.post("/dotypealter",(req,res)=>{
    let form=new multiparty.Form()
    form.uploadDir="upload"
    form.parse(req,(err,fields,files)=>{
        console.log(files)
        console.log(fields)
        let title=fields.title[0]
        let id=fields._id[0]
        let description=fields.description[0]
       let  pic=files.pic[0]. path
       if(files.pic[0]. originalFilename==""){
           var obj={
            title:title,
            description:description,
           }
       }else{
           var obj={
            title:title,
            description:description,
            pic:pic
           }
       }
       Client.connect(url,(err,client)=>{
        let collection=client.db("mydb").collection("type")
        collection.updateOne({_id:ObjectID(id)},{$set:obj},(err,result)=>{
                   if(err){
                       console.log(err)
                       return
                   }
                   res.send("<script>alert('修改成功');location.href='/typelist'</script>")
        })
       })
    })





})
app.get("/typeremove",(req,res)=>{
    let id=ObjectID(req.query.id)

    Client.connect(url,(err,client)=>{
        let collection=client.db("mydb").collection("type")
        collection.find({_id:id}).toArray((err,result)=>{
            fs.unlinkSync(result[0].pic)
        }
        )
        collection.removeOne({_id:id},(err,result)=>{
            if(err){
                console.log(err)
                return
            }
            res.send("<script>alert('删除成功');location.href='/list'</script>")
        })
    })
})

app.listen(3000)