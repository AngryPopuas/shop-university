'use client'
import { IProfile } from "@/types"
import axios from "axios"


export const getUserAccount = async () => {
    const profile = await axios.get<{message:string, user: IProfile | null}>('http://localhost:3000/api/users/auth')
        .then((res) => {
            console.log(res)
            return res.data.user
        })
        .catch((err) => {
            console.log(err)
            return null
        })
    return profile
}