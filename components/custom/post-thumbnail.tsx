import Image from "next/image"

type Props = {
    thumbnail: string
}

export function PostThumbnail({thumbnail}: Props){
    return (
        <div className="flex flex-col relative border-white">
            <Image src={thumbnail} width={400} height={400} alt={thumbnail} className="absolute w-full aspect-square"/>
        </div>
    )
}