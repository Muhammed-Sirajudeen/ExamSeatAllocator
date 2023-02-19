import React, { useEffect } from 'react'
import "./stylesheets/Home.css"
import { useState } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

import axios from 'axios'

const animatedComponents = makeAnimated();


function Home() {
  const [classNumbers,setclassNumbers]=useState([])
  const [selectNumber,setselectNumber]=useState([])
  const [subjectCode,setsubjectCode]=useState([])
  const [subjectElements,setsubjectElements]=useState([])
  
  useEffect(()=>{
    let options = []
    async function loadclassnumber(){
      let data=await axios.get("http://localhost:5000")
      let classnumber=data.data.data //i know it seems stupid yet it seems fun
      classnumber.forEach((data)=>{
        options.push({value:data,label:data})
      })
      setclassNumbers(options)

    }
    loadclassnumber()
  },[])
  function selecthandler(value){
    
    setselectNumber(value)

  }
  function subjecthandler(element){
    setsubjectCode(element.target.value)

  }
  function subjsubmitHandler(){
    
    setsubjectElements([...subjectElements,subjectCode])
    setsubjectCode("")
  }
  function codebuttonHandler(element){
    
    
    let codes=subjectElements.filter((code)=>{
      return code!==element.target.id
    })
    
    setsubjectElements(codes)
  }

  async function retrieveHandler(){

    let classnumbers=[]
    selectNumber.forEach((data)=>{  
      classnumbers.push(data.value)
                 
    })
    console.log(classnumbers) //do not confuse with the state variable classnumbers
    console.log(subjectElements) //we have the data here now we just have to post the data to the backend and we are good to go
    let response= await axios.post("http://localhost:5000/sort",{
      subjectcode:subjectElements,
      classnumbers:classnumbers
    })
    console.log(response.data.data)
    if(response.data.error){
      alert(response.data.error)
     
    }
    else{
      alert("sorting performed successfully")
      window.location="/viewclasses"
    }
  }

  return (
    <div className='main-container'>
           <Select className='select-box'
      closeMenuOnSelect={false}
      components={animatedComponents}
      onChange={selecthandler}
      isMulti
      options={classNumbers}
    />

    <div className='input-container'>
      <input type='text' className='subjectinput' placeholder='enter subject code' onChange={subjecthandler} value={subjectCode}/>
      <button className='submit' onClick={subjsubmitHandler}>add code</button>
    </div>
    <div className='code-container'>
      {subjectElements.map((value)=>{
        return(
          <div className='code-sub-container' key={value}>
            <div>{value}</div>
            <button id={value} className='code-button' onClick={codebuttonHandler}>x</button>
          </div>
        )
      })}
    </div>  

    <button className='retrieve-button' onClick={retrieveHandler}>
      Retrieve Layout
    </button>




    </div>
  )
}

export default Home