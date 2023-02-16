import React, { useRef, useState } from 'react'
import './stylesheets/Layoutcreater.css'
import axios from 'axios'
function Layoutcreater() {

    let count=useRef(65) //state for storing ordering of coloumns 65 as we convert it to ascii
    let bench=useRef(null) //state for storing the bench container
    const [input,setInput]=useState("") //state for storing the class room number

    let columnHandler=()=>{
       
        let column=document.createElement("div")
        column.className="column"
        column.id=String.fromCharCode(count.current)
        
        //creating default seat
        let seat=document.createElement("div")

        let button=document.createElement("button")
        button.textContent="add seat"
        button.className=`button ${String.fromCharCode(count.current)}` 

        button.addEventListener("click",(element)=>{
            let classname=element.target.className
            let id=classname.split(" ")[1]
            let column=document.querySelector(`#${id}`)
            let seat=document.createElement("div")
            seat.className="seat"
            column.append(seat)
        })
        column.append(button)
        count.current=count.current+1
        seat.className="seat"
        column.append(seat)
        bench.current.append(column)


    }
    let inputChange=(element)=>{
            setInput(element.target.value)
    }
    let submitLayout=async ()=>{
        let classNumber=input
        let seatsArray=[]
        if(input==="" || input===" "){
            alert("enter the room identifier")
            return
        } 
        /*
            The logic that takes all the children element of the coloumn and 
            gives an appropriate unique identifier to each seats 
            
        */
        document.querySelectorAll(".column").forEach((column)=>{
            let seat=[]
            for(let i=1;i<column.children.length;i++){
                seat.push(column.id+i)

            }
            
            seatsArray.push({column:column.id,seats:seat})
        })
        let layout={
            classnumber:classNumber,
            seats:seatsArray
        }
        console.table(layout)
        let response=await axios.post("http://localhost:5000/",layout)
        console.log(response)
        if(response.data.status!=="200OK"){
            alert("network request failed")
        }
        else if(response.data.error==="duplicate"){
            alert("the class number you provided already exist in the database")
        }
        else if(response.data.error===null){
            alert("the data has been posted successfully")
        }
    }
  return (
    <div className='main-container'>
        <div className='control-container'>
            <button className='button' onClick={columnHandler} >Add Column</button>
        </div>
        <div className='bench-container' ref={bench}>

        </div>

        <input type="number" className='input' onChange={inputChange} value={input}/> 
        <button className='button' id="submit-button" onClick={submitLayout} >submit</button>
    </div>
  )
}

export default Layoutcreater