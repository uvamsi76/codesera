"use client"
import { Button, Typography } from '@mui/material'
import { cookies } from 'next/headers';
import { useRouter } from 'next/navigation';
import React from 'react'

export const Issignedin = ({issignedin}:any) => {
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
            <Typography>Dynamic content</Typography>
        </div>)
    }
  return (
    <div style={{marginRight:"10%"}}>
        {p3}
    </div>
  )
}

export default Issignedin