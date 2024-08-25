import { useEffect, useState } from "react"
import Input from "../components/Input"
import axios from "axios"
import {BsCheckCircleFill, BsCircleFill, BsFillTrashFill} from 'react-icons/bs'


const Home = () => {

    const [todos,setTodos] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:3000/get')
        .then(res=> setTodos(res.data))
        .catch(err=>console.log(err))
    })

    const handleCheck = (id) =>{
        axios.put('http://localhost:3000/edit/'+id)
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
    }
 
    const handleDelete = (id)=>{
        axios.delete('http://localhost:3000/delete/'+id)
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
    }
  return (
    <div className="py-5 mx-auto mt-16 flex flex-col justify-center items-center border max-w-[500px]">
        <h1 className="text-4xl font-bold">To-Do</h1>
        <Input/>
        <div className="mt-8">

        {
            todos.length ===0
            ? 
            <h2 className="text-2xl font-bold text-center">No tasks</h2>
            :
            (
                todos.map((todo,index)=>(
                    <div key={index} className="w-[380px] bg-black text-white mt-2 py-2 text-lg font-semibold px-3 flex justify-between">
                        <div className="flex items-center gap-x-3" onClick={()=> handleCheck(todo._id)}>
                            {
                                todo.done ?
                                <BsCheckCircleFill/>
                                : 
                                <BsCircleFill className="size-3 cursor-pointer"/>
                                
                            }
                            <p className={ todo.done ? "text-wrap line-through text-gray-400" : "no-underline text-white"}>{todo.task}</p>
                        </div>
                        <div className="flex items-center ">
                            <BsFillTrashFill className="cursor-pointer" onClick={()=> handleDelete(todo._id)}/>
                        </div>
                    </div>
                    
                ))
            )
            
        }

        </div>
        

    </div>
  )
}
export default Home