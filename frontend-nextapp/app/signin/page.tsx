"use client"
import SigninComponent from "@/components/Signincomponents/SigninComponent";
import Layout from "@/components/layouts/layout";
import { RecoilRoot } from "recoil";

export default function Signin(){
    return(
        <div>
            <RecoilRoot>
                <SigninComponent/>
            </RecoilRoot>
        </div>
    )
}