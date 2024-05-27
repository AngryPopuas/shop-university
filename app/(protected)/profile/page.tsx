'use client'
import ProfileMain from "@/components/business/profile/profile-main/ProfileMain"
import { IProfile } from "@/types"
import { getUserAccount } from "@/utils/auth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const PrfofilePage = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [profile, setUserProfile] = useState<IProfile | null>()
    useEffect(() => {
        (async () => {
            const request = await getUserAccount()
                .then((res) => {
                    if (res) setUserProfile(res)
                })
                .catch((err) => {
                    router.push('/auth/register')
                })
                .finally(() => setIsLoading(false))
        })()
    }, [])
    return (
        <>
            {
                isLoading
                    ?
                    <h2>Loading...</h2>
                    :
                    profile && <ProfileMain profile={profile} />
            }
        </>
    )
}

export default PrfofilePage