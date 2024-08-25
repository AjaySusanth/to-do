import axios from "axios"
import { useState } from "react"

const Input = () => {

  const [task,setTask] = useState("")

  const handleAdd = () => {
    axios.post('http://localhost:3000/add',{task:task})
    .then(res => console.log(res))
    .catch(err=>console.log(err)) 
    setTask("")   
  }
  
  return (
    <div className="flex gap-x-3 mt-10">
        <input 
        className="border border-black w-[300px] px-3 py-1 outline-none" 
        type="text"
        placeholder="Enter a task"
        value={task}
        onChange={(e)=> setTask(e.target.value)}
        />
        <button
        className="border bg-black text-white px-4 text-basis font-bold"
        type="button"
        onClick={handleAdd}
        >
          Add
        </button>
    </div>
  )
}
export default Input