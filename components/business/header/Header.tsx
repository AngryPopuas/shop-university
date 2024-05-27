'use client'
import { getUserAccount } from "@/utils/auth"
import { ModeToggle } from "../theme/mode-toggle/ModeToggle"
import Link from "next/link"
import { useEffect, useState } from "react"
import { IProfile } from "@/types"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

const Header = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false)
    const [profileImage, setProfileImage] = useState<string>()
    useEffect(() => {
        (async () => {
            const request = await getUserAccount()
                .then((res) => {
                    if (res) {
                        setIsAuthorized(true)
                        setProfileImage(res.avatar)
                    }
                })
                .finally(() => setIsLoading(false))
        })()
    }, [])
    return (
        <div className="flex flex-row justify-between items-center p-5 border-b border-input">
            <Link href={'/home'}><h1>Shop</h1></Link>
            <div className="flex flex-row items-center space-x-[10px]">
                {isAuthorized
                    ?
                    <>
                        <Avatar> <AvatarImage src={`${profileImage}`} /></Avatar>
                        <Link href={'/profile'}><Button variant={'outline'}>Профиль</Button></Link>
                        <Link href={'/profile/cart'}><Button variant={'outline'}>Корзина</Button></Link>
                    </>
                    :
                    isLoading
                        ?
                        <></>
                        :
                        <>
                            <Link href={'/auth/login'}><Button variant={'ghost'}>Войти</Button></Link>
                            <Link href={'/auth/register'}><Button>Регистрация</Button></Link>
                        </>
                }
                <ModeToggle />
            </div>
        </div>
    )
}

export default Header