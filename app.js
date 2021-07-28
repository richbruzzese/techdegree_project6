const express = require('express')
// const {quotes} = require('/data')

const app = express();

app.use('/static', express.static('public'))

app.set('view engine', 'pug')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) =>{
    res.render('index')
})

app.listen(3000, () => {
    console.log('app running on port 3000')
})