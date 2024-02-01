const express= require('express')
const dotenv=require('dotenv')
const morgan=require('morgan')
const session=require('express-session')
const bodyparser=require('body-parser')
const path=require('path')
const nocache=require('nocache')

const connectDB=require('./server/database/connection')
const app = express()

dotenv.config({path:'config.env'})
const PORT= process.env.PORT || 8080

app.use(nocache());

app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: true,
    })
  )
  

//log requests
// app.use(morgan('tiny'))

//mongodb connection
connectDB();

// Parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//set view engine
app.set("view engine","ejs")
// app.set("views",path.resolve(__dirname,"views/ejs"))

//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))



//load routers
app.use('/',require('./server/routes/router'))



app.listen(PORT,()=>{console.log(`Server is running in http://localhost:${PORT}`)})