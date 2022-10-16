import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()
const router = express.Router();
app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))


router.get('/me',(req,res)=>{
 res.send({me:'hello world'});
})

//cats
const routes =['get /cat','get cat/:id','post /cat','put /cat/:id','delete /cat/:id'];
router.route('/cat').get().post()
router.route('/cat/:id').get().put().delete()

app.use('/api',router);
//CRUD
app.get('/',(req,res) =>{
  res.send({message: 'hello'})
})

app.post('/',(req,res)=>{
  console.log(req.body);
  res.send({message: 'okay'})
})

const log = (req,res,next) =>{
  console.log('middleware');
  next();
}

app.get('/data',log,(req,res)=>{
res.send({message: 'data'})
})

app.put('/data',(req,res)=>{
  res.send({message: 'data updated'})
})

app.delete('/data',(req,res)=>{
  res.send({message: 'data deleted'})
})

app.post('/data',(req,res)=>{
  console.log(req.body);
  res.send(req.body);
})

export const start = () => {
  app.listen(3000, () => {
    console.log('Server is listening on port 3000');
  })
}
