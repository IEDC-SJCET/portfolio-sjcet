"use client"

import { ProfileBlurb } from "@/components/custom/profile-blurb";
import { CardStack } from "@/components/ui/card-stack";
import { PostThumbnail } from "@/components/custom/post-thumbnail";
import { GlowBackground } from "@/components/custom/glow-background";

import { useState } from "react";

const data = [
    {
        id: 1,
        thumbnail: "/orange-peel.jpg"
    },
    {
        id: 2,
        thumbnail: "/blue.jpg"
    },
    {
        id: 3,
        thumbnail: "/future.jpg"
    },
    {
        id: 5,
        thumbnail: "/blue.jpg"
    },
    {
        id: 6,
        thumbnail: "/orange-peel.jpg"
    },
    {
        id: 7,
        thumbnail: "/future.jpg"
    },
    {
        id: 8,
        thumbnail: "/orange-peel.jpg"
    }
]

export default function Profile() {

    const [thumbnail, setThumbnail] = useState(data[0].thumbnail)

    const onFlip = (flip: string) => {
        setThumbnail(flip)
    }

    return (
        <div className="flex flex-col w-screen h-screen items-center p-5">
            <ProfileBlurb
                image="/meta.jpg"
                bio="Just another dude"
                role="UI/UX developer"
                username="LizardMan6969"
                verified={true} />
            <div className="flex flex-col flex-grow items-center justify-end mb-14 min-w-96 max-w-[450px] w-full">
                <CardStack items={
                    data.map(post => {
                        return {
                            id: post.id,
                            thumbnail: post.thumbnail,
                            content: (
                                <PostThumbnail thumbnail={post.thumbnail} />
                            )
                        }
                    })
                }
                    offset={30}
                    onFlip={onFlip}/>
            </div>
            <GlowBackground thumbnail={thumbnail}/>
        </div>
    )
}