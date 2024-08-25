const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoModel = require('./model')


mongoose.connect('mongodb://localhost:27017/Todo')
.then(()=>{
    console.log('db connected')
})
.catch((err)=>{
    console.log(err)  
})


const app = express()
app.use(express.json())
app.use(cors())

app.post('/add',(req,res)=>{
    const task = req.body.task

    if (!task)
        return res.send({message:'Add a task'})

    todoModel.create({
        task:task
    })
    .then((task)=>{
        res.send({data:task})
    })
    .catch((err)=>{
        console.log(err)
        res.send("Some error occured")
    })
})

app.get('/get',(req,res)=>{
    todoModel.find()
    .then((tasks)=>{
        res.json(tasks)
    })
    .catch((err)=>{
        console.log(err)
        res.send({message:"Some error occured"})
    })
})

app.put('/edit/:id',(req,res)=>{
    const {id} = req.params
    todoModel.findByIdAndUpdate({_id:id},{done:true})
    .then(data=>res.json(data))
    .catch(err=>res.json(err))
})

app.delete('/delete/:id',(req,res)=>{
    const {id} = req.params
    todoModel.findByIdAndDelete({_id:id})
    .then(data=>res.json(data))
    .catch(err=>res.json(err))
})


app.listen(3000,()=>{
    console.log("Server running")
}
)

