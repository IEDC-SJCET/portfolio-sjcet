"use client";
import { useColor, usePalette } from "color-thief-react";
import {motion} from "framer-motion";

type Props = {
    thumbnail: string
}

export function GlowBackground({thumbnail}: Props){
    const { data, loading, error } = usePalette(thumbnail, 3, "hex");
    return (
        <div className="absolute w-screen h-screen -z-10 top-0 flex flex-col items-center bg-[#000000] overflow-hidden">
            <motion.div 
                className="rounded-full w-[1000px] aspect-square blur-3xl m-14 opacity-50"
                animate={{
                    backgroundColor: data?.[0]
                }}
            >

            </motion.div>
        </div>
    )
}