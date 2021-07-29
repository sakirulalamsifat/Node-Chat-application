const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const path=require('path')
const cookieParser = require('cookie-parser')

const {notFoundHandler,errorHandler } = require('./middleware/common/errorHandler')
const loginRouter = require('./router/loginRouter')
const userRouter = require('./router/userRouter')
const inboxRouter=require('./router/inboxRouter')
const app = express()
dotenv.config()

//database connection
mongoose
  .connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log('database connected'))
  .catch((err) => console.log(err))

//request parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//set view engine
app.set('view engine', 'ejs')

//set static folder
app.use(express.static(path.join(__dirname, "public")))

//parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET))

//routing setup
app.use('/', loginRouter)
 app.use('/users', userRouter)
 app.use('/inbox' ,inboxRouter)

//404 not found error Handling
app.use(notFoundHandler)

//common error handler
app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log(`app listening to ${process.env.PORT}`);
})

