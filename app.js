const express = require('express')
const {quotes} = require('./data')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/static', express.static('public'))

app.set('view engine', 'pug')

app.get('/', (req, res) =>{
    res.render('index')
})

app.listen(3000, () => {
    console.log('app running on port 3000')
})

app.use((req, res, next) => {
  
    res.status(404).render('404-error')
  });
  
app.use((err, req, res, next) => {
    res.locals.error = err
    if (err.status === 404) {
      res.status(404).render('404-error', {err})
    }else{
      err.message = err.message || `Something went wrong on the server`
      res.status(err.status || 500).render('global-error', {err})
    }
  
  });