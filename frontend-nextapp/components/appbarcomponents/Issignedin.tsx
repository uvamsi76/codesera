"use client"
import { Button, Typography } from '@mui/material'
import { cookies } from 'next/headers';
import { useRouter } from 'next/navigation';
import {isSignedin} from '@/recoiatoms/issignin'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import Cookies from 'js-cookie';
import Popup from '../popupcomponents/Popup';


export const Issignedin = () => {
    function handlelogout(){
        const cookies = Object.keys(Cookies.get());
        cookies.forEach(cookieName => {
        Cookies.remove(cookieName);
        });
        console.log("done")
        closePopup()
        nav('/')

    }
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const openPopup = () => {
        setIsPopupOpen(true);
      };
    
      const closePopup = () => {
        setIsPopupOpen(false);
      };
    // const [IsSignedin,setIssignedin]=useRecoilState(isSignedin)
    const [issignedin,setissignedin]=useState(false);
    useEffect(()=>{
        const IsSignedin=Cookies.get("token")
        if(IsSignedin)setissignedin(true)
        else setissignedin(false)
        console.log(IsSignedin)
    },[])
    console.log(issignedin)
    // const issignedin =cookies().get("token")
    // console.log(issignedin)

    const router = useRouter();
    const nav = (page: string) => {router.push(page);};
    var p3 =(
        <div style={{display:"flex",justifyContent:"space-between",padding:10}}>
            <div>
                <Button style={{display:"flex",margin:10}} variant="contained" onClick={()=>{
                    nav('/signup')
                }}>Sign Up</Button>
            </div>
            <div>
                <Button style={{display:"flex",margin:10}} variant="contained" onClick={()=>{
                    nav('/signin')
                }}>Sign In</Button>
            </div>
        </div>
    )
    if(issignedin){
        p3=(<div>
            <Button style={{display:"flex",margin:10}} variant="contained" onClick={openPopup}>Logout</Button>
            <Popup isOpen={isPopupOpen} onClose={closePopup}>
                <h2>Are you sure</h2>
                <div style={{display:"flex",margin:10}}>
                <Button style={{display:"flex",margin:10}} variant="contained" onClick={()=>{closePopup
                    nav('/signin')
                }}>No</Button>
                <Button style={{display:"flex",margin:10}} variant="contained" onClick={()=>{handlelogout()
                }}>Yes</Button>
                </div>
            </Popup>
        </div>)
    }
  return (
    <div style={{marginRight:"10%"}}>
        {p3}
    </div>
  )
}

export default Issignedin