'use client'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [link, setLink] = useState("hidden") 

  let boxStyle = {
    width: "100%",
    height: "250px",
    backgroundColor: "white",
    color: "black",
    overflowY: "scroll"
  }

  const handleClick = e => {
    const data = e.target.previousSibling.value;
    getValidity(data);
  }

  async function getValidity(data) {
    //post request to server
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }
    fetch('/api/createFile', requestOptions)
      .then(response => response.blob())
      .then(blob => {
        // Create a URL for the Blob object
        const url = URL.createObjectURL(blob);
  
        // Create a link with the URL and trigger a click to download the file
        const link = document.createElement('a');
        link.href = url;
        link.download = 'result.csv';
        link.click();
  
        // Clean up by revoking the object URL
        URL.revokeObjectURL(url);
      });
  }
  
 var titleStyle = {
  color: "white"
 }

  return (
    <div>
      <div style={titleStyle}>Hi Sabrina!</div>
      <textarea style={boxStyle}></textarea>
      <button type="button" onClick={handleClick}>Submit</button>
    </div>
  )
}

