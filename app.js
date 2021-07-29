const express = require('express')
const {projects} = require('./data')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/static', express.static('public'))

app.set('view engine', 'pug')

app.get('/', (req, res) =>{
    res.render('index', {title: 'Projects', projects})
})

app.get('/about', (req, res)=>{
    res.render('about')
})

app.get('/project/:id', (req, res, next) =>{
    const id = req.params.id
    const project = projects[id]
    if(project){
        res.render('project', {project})   
      }else{
        next()
      }
})

app.use((req, res, next) => {
    const err = new Error("Not Found")
        err.status = 404
        next(err)
  });
  
app.use((err, req, res, next) => {
    if (err.status === 404) {
        res.status(404).render('404-error', {err})
    }else{
        err.status = (err.status || 500)
        err.message = (err.message || `Something went wrong on the server`)
        res.render('global-error', {err})
    }
    console.error(err.status, err.message)
  });

  app.listen(3000, () => {
    console.log('app running on port 3000')
})