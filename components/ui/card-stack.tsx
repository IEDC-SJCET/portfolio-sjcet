"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import * as React from "react";

let interval: any;

type Card = {
  id: number;
  name?: string;
  designation?: string;
  content: React.ReactNode;
  thumbnail?: string;
};

export const CardStack = ({
  items,
  offset,
  scaleFactor,
  onFlip
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
  onFlip?: (flip: string) => void;
}) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<Card[]>(items);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientY)
  }

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => setTouchEnd(e.targetTouches[0].clientY)

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isDownSwipe = distance > minSwipeDistance
    const isUpSwipe = distance < -minSwipeDistance
    // add your conditional logic here

    if(isUpSwipe){
      let thumb = ""
      setCards((prevCards: Card[]) => {
        const newArray = [...prevCards]; // create a copy of the array
        newArray.unshift(newArray.pop()!); // move the last element to the front
        thumb = newArray[0].thumbnail!
        onFlip?.(thumb);
        return newArray;
      });
      
    }else if(isDownSwipe){
      let thumb = ""
      setCards((prevCards: Card[]) => {
        const newArray = [...prevCards]; // create a copy of the array
        newArray.push(newArray.shift()!); // move the last element to the front
        thumb = newArray[0].thumbnail!
        onFlip?.(thumb);
        return newArray;
      });
    }
  }

  return (
    <div className="relative aspect-square w-full md:h-60 md:w-96 flex flex-col items-center" onTouchStart={(ev) => onTouchStart(ev)} onTouchEnd={onTouchEnd} onTouchMove={(ev) => onTouchMove(ev)}>
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute dark:bg-black bg-white aspect-square w-full md:h-60 md:w-96 p-1 shadow-xl border border-neutral-200 dark:border-white/[0.1]  shadow-black/[0.1] dark:shadow-white/[0.05] flex flex-col justify-between"
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
              zIndex: cards.length - index, //  decrease z-index for the cards that are behind
            }}
          >
            <div className="font-normal text-neutral-700 dark:text-neutral-200">
              {card.content}
            </div>
            <div>
              <p className="text-neutral-500 font-medium dark:text-white">
                {card.name}
              </p>
              <p className="text-neutral-400 font-normal dark:text-neutral-200">
                {card.designation}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
