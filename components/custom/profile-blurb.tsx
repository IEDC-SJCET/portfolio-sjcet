import Image from "next/image"
import { Badge } from "../ui/badge"

import { BadgeCheck } from "lucide-react"

type Props = {
    image: string,
    username: string,
    verified: boolean,
    role: string,
    bio: string
}

export function ProfileBlurb({image, username, verified, role, bio}: Props){
    return (
        <div className="flex flex-row gap-2 text-white">
            <Image src={image} width={100} height={100} alt={username} className="rounded-full aspect-square max-w-16 max-h-16"/>
            <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-2 flex-wrap">
                    <h2 className="font-bold">{username}</h2>
                    {verified && <BadgeCheck/>}
                    <Badge className="bg-white text-neutral-950 hover:bg-neutral-200 whitespace-nowrap overflow-hidden text-ellipsis">{role}</Badge>
                </div>
                <p className="w-full overflow-hidden text-ellipsis text-sm max-h-20">
                    {bio}
                </p>
            </div>
        </div>
    )
}