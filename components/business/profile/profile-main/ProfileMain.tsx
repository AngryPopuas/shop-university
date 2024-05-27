import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { IProfile } from "@/types"
import Link from "next/link"


const ProfileMain = ({ profile }: { profile: IProfile }) => {
    return (
        <div className="flex flex-col space-y-10">
            <Avatar className="h-[150px] w-[150px]"> <AvatarImage src={profile.avatar}/> </Avatar>
            <h4>Имя профиля: {profile.name}</h4>
            <span>Статус аккаунта:{profile.isActivated ? 'Подтвержден' : 'Не подтвержден'}</span>
            <Link href={'/profile/cart'}><Button variant={'outline'}>Выйти из аккаунта</Button></Link>
        </div>
    )
}

export default ProfileMain