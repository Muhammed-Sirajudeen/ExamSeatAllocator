import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import "./stylesheets/viewlayouts.css"
function Viewlayouts() {
    const params=useParams()
    const [layoutData,setlayoutData]=useState({})
    useEffect(()=>{
        console.log(params.id)
        async function loaddata(){
            let response=await axios.get("http://localhost:5000/sort")
            let data=response.data.data
            let filteredData=data.filter((values)=>{
                return values["classnumber"]===params.id
            })
            setlayoutData(filteredData[0])
            console.log(filteredData[0])
        

        }
        loaddata()
    },[params.id])
  return (
    <div className='main-container'>
        <div className='layout-container-view'>
                {layoutData?.seats?.map((value)=>{
                    return(
                        <div className='seat-container-view' key={value.column}>{value.seats.map((seatvalue)=>{
                            return(
                                <div className='seats-view' key={seatvalue}>
                                    <div className='seat-heading'>{seatvalue.split(" ")[0]}</div>
                                    <div className='seat-reg'> {seatvalue.split(" ")[1]} </div>
                                </div>
                            )
                        })}</div>
                    )
                })}
        </div>
    </div>
  )
}

export default Viewlayouts