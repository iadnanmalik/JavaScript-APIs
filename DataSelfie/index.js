const { response } = require('express');
const express = require('express');
const DataStore = require('nedb');


const app = express()

app.listen(3000,()=> console.log(`Listening at port ${3000}`))

app.use(express.static('public'))
app.use(express.json({limit:'1mb'}))

const database = new DataStore({ filename: 'database.db' });
database.loadDatabase();
app.post('/api', (request, response) => {
    const data = request.body;
    console.log(data)
    database.insert(data)
    response.json({
        "status":"sucess"
    })
});

app.get('/api',(request,response)=>{
    database.find({},(err,data)=>{
        response.json(data);
    });
   
});