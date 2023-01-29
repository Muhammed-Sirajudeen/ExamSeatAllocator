let express=require('express')
let cors=require('cors')
const mongoose=require("mongoose")
const url="mongodb+srv://siraj:strongpassword@cluster0.wnzkkfw.mongodb.net/seatdb?retryWrites=true&w=majority"
const connectionParams={
    useNewUrlParser: true,
    
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
.then( () => {
    console.log('Connected to database ')
})
.catch( (err) => {
    console.error(`Error connecting to the database. \n${err}`);
})

let layoutSchema = new mongoose.Schema({
    classnumber: String,
    seats:Array
  })

let layoutModel= mongoose.model('Layout', layoutSchema)



let app=express()


app.use(cors())
app.use(express.json())
app.post("/layoutpost",(req,res)=>{
    const layout=req.body
    console.log(layout)
    let dbData=new layoutModel(layout)
    dbData.save().then((doc)=> console.log(doc)).catch((error) => console.log(error))
    res.json({status:"200OK"})


})
app.listen(2000,()=> console.log("listening in port 2000"))