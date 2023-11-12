"use client"

import useHeroPreviewModal from '@/hooks/use-hero-preview-modal';
import { cn } from '@/lib/utils';
import { Hero } from '@/types';
import NextImage from 'next/image'
import { ReactNode } from 'react';

type HeroCardProps = {
    Hero: Hero,
    isSelectable?: boolean,
    isSelected?: boolean,
    onClick?: () => void,
    className?: string,
}

export function HeroCard({ Hero, isSelectable = false, isSelected, onClick, className }: HeroCardProps) {
    return (
        <div 
            className={cn(
                "relative \
                aspect-[3/4] \
                group \
                border-2 \
                border-zinc-500 \
                dark:border-zinc-900 \
                rounded-xl \
                overflow-hidden \
                shadow-xl \
                dark:animate-glow-pulse \
                duration-300 \
                ", 
                isSelected && "border-green-500 dark:border-green-600 scale-105",
                isSelectable && "cursor-pointer active:opacity-70 md:hover:scale-110 md:hover:shadow-2xl",
                className
                )
            }
            onClick={onClick}
        > 
            <NextImage
                src={Hero.images.lg}
                fill
                alt="Image"
                className="object-cover"
            />
            <div className="absolute text-center w-full bottom-0 p-4 bg-white/80 dark:bg-black/80 backdrop-blur-2xl rounded-lg overflow-hidden">
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

type HeroCardInfoButtonProps = {
    Hero: Hero,
    className?: string,
}

export function HeroCardInfoButton({ Hero, className }: HeroCardInfoButtonProps) {
    const heroPreviewModalState = useHeroPreviewModal();
    
    const handleOpenHeroPreviewModal = () => {
        heroPreviewModalState.onOpen(Hero);
    };

    return (
        <div 
            className={cn(
                "absolute \
                border \
                border-zinc-700 \
                w-max \
                duration-300 \
                opacity-0 \
                scale-50 \
                group-hover:opacity-100 \
                group-hover:scale-100 \
                hover:shadow-lg \
                cursor-pointer \
                hover:bg-white \
                dark:hover:bg-black \
                left-1/2 top-0 -translate-x-1/2 -translate-y-1/3 \
                px-4 py-2 \
                bg-white/80 \
                dark:bg-black/80 \
                backdrop-blur-2xl rounded-lg", className)}
            onClick={handleOpenHeroPreviewModal}
        >
            <p className="text-xs uppercase text-center">Mais informações</p>
        </div>
    )

}

type HeroCardRootProps = {
    className?: string,
    children: ReactNode,
}

export function HeroCardRoot({ className, children }: HeroCardRootProps) {
    return (
        <div className={cn("relative group", className)}>
            {children}
        </div>    
    )
}