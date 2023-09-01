import { Inter } from 'next/font/google'
import { Appbar } from '@/components/Appbar'
import { Grid } from '@mui/material'
import Layout from '@/components/layouts/layout'
import NestedLayout from '../components/layouts/nested-layout'
import HomeComponent from '@/components/HomeComponent'
const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  return (
    <div>
        <HomeComponent/>
    </div>
  )
}
