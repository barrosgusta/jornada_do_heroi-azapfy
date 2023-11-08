"use client"

import NextImage from 'next/image'

type HeroCardProps = {
    Hero: Hero

}

export default function HeroCard({ Hero }: HeroCardProps) {
    return (
        <div 
            className="relative aspect-[3/4] group cursor-pointer border-2 border-zinc-500 rounded-xl overflow-hidden shadow-xl duration-300 md:hover:scale-105 md:hover:shadow-2xl"
        > 
            <NextImage
                src={Hero.images.lg}
                fill
                alt="Image"
                className="object-cover"
            />
            <div className="absolute text-center w-full bottom-0 p-4 bg-white/80 backdrop-blur-2xl rounded-lg overflow-hidden">
                <div>
                    <p className="font-bold lg:text-lg truncate uppercase">
                        {Hero.name}
                    </p>
                    <p className="text-xs md:text-sm text-gray-500 uppercase">
                        {Hero.biography.publisher}
                    </p>
                </div>
                
                
            </div>
        </div>
    )
}