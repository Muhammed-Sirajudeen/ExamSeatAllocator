import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './stylesheets/Viewclasses.css'
import { useNavigate } from 'react-router-dom'
function Viewclasses() {
    const [classdata,setclassData]=useState([])
    const navigate=useNavigate()
    useEffect(()=>{
        async function loadclasses(){
            let data=await axios.get("http://localhost:5000/sort")
            let responsedata=data.data.data
            let classes=[]
            responsedata.forEach((classnumber)=>{
                classes.push(classnumber["classnumber"])

            })
            setclassData(classes)
            

        }
        loadclasses()
    },[])
    function classHandler(element){
        console.log(element.target.id)
        navigate("/viewlayouts/"+element.target.id)
    }
  return (
    <div className='main-container'>
        <div className='heading'>View The Seating Arrangement</div>
        {classdata.map((value)=>{
            return(
                <button key={value} id={value} className='class-button' onClick={classHandler}>{value}</button>
            )
        })}
    </div>
  )
}

export default Viewclasses