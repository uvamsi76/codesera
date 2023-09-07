import { courseralogo } from '@/util/env'
import React from 'react'
import Link from 'next/link'

const Logo = () => {
  return (
    <div>
      <Link href="/">
      <img style={{padding:"3%",width:"30%", height:"auto" }} 
            src={courseralogo}
            alt="image here" />
        </Link>
    </div>
  )
}

export default Logo