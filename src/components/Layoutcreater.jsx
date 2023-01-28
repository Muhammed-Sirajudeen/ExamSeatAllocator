import React, { useRef, useState } from 'react'
import './stylesheets/Layoutcreater.css'
function Layoutcreater() {

    let count=useRef(65)
    let bench=useRef(null)
    let columnHandler=()=>{
        console.log(bench.current)
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
  return (
    <div className='main-container'>
        <div className='control-container'>
            <button className='button' onClick={columnHandler} >Add Column</button>
        </div>
        <div className='bench-container' ref={bench}>

        </div>
       
    </div>
  )
}

export default Layoutcreater