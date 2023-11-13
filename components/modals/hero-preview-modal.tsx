"use client"

import useHeroPreviewModal from "@/hooks/use-hero-preview-modal";
import { Dialog, DialogContent } from "../ui/dialog";
import { useEffect, useState } from "react";
import NextImage from "next/image";
import { ScrollArea } from "../ui/scroll-area";

export default function HeroPreviewModal() {
    const [isMounted, setIsMounted] = useState(false);
    const heroPreviewModalState = useHeroPreviewModal();
    const hero = heroPreviewModalState.data;

    //fix hydration error
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <Dialog 
            open={heroPreviewModalState.isOpen} 
            onOpenChange={heroPreviewModalState.onClose}
        >
            <DialogContent
                className="max-w-2xl"
            >
                <div className="grid grid-cols-2 gap-5">
                    <div className="relative max-w-xs border-2 border-zinc-500 dark:border-zinc-900 rounded-xl overflow-hidden shadow-xl aspect-[3/4]">
                        <NextImage
                            fill
                            alt="Hero Image"
                            src={hero.images.lg || ""}
                            className="object-cover"
                        />
                    </div>
                    <ScrollArea className="row-span-2 p-0 border rounded-lg shadow-md max-h-96">
                        <div className="space-y-3 m-2">
                            <div>
                                <h1 className="uppercase text-2xl">
                                    {hero.biography.alignment === "good" ? "🦸" : "🦹"}
                                    <strong>{hero.name}</strong>
                                </h1>
                                {hero.biography.fullName! && (
                                    <h2 className="uppercase text-xl text-muted-foreground">
                                        {hero.biography.fullName}
                                    </h2>
                                )}
                                <div className="flex flex-col">
                                    {hero.biography.aliases.map((alias) => (
                                        <span key={alias} className="text-muted-foreground text-xs">
                                            {alias}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h1 className="uppercase text-xl">
                                    <strong>Power Stats:</strong>
                                </h1>
                                <div className="flex flex-col">
                                    {Object.entries(hero.powerstats).map(([key, value]) => (
                                        <span className="text-muted-foreground text-xs uppercase" key={key}>{key}: {value}</span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h1 className="uppercase text-xl">
                                    <strong>Aligmnent:</strong>
                                </h1>
                                <p className="text-muted-foreground text-xs flex flex-col uppercase">{hero.biography.alignment}</p>
                            </div>
                            <div>
                                <h1 className="uppercase text-xl">
                                    <strong>Slug:</strong>
                                </h1>
                                <p className="text-muted-foreground text-xs flex flex-col uppercase">{hero.slug}</p>
                            </div>
                            {hero.biography.placeOfBirth.length !== 1 && hero.biography.placeOfBirth! && (
                                <div>
                                    <h1 className="uppercase text-xl">
                                        <strong>Place of Birth:</strong>
                                    </h1>
                                    <p className="text-muted-foreground text-xs flex flex-col uppercase">{hero.biography.placeOfBirth}</p>
                                </div>
                            )}
                            <div>
                                <h1 className="uppercase text-xl">
                                    <strong>First Appearance:</strong>
                                </h1>
                                <p className="text-muted-foreground text-xs flex flex-col uppercase">{hero.biography.firstAppearance}</p>
                            </div>
                            {hero.appearance.race! && (
                                <div>
                                    <h1 className="uppercase text-xl">
                                        <strong>Race:</strong>
                                    </h1>
                                    <p className="text-muted-foreground text-xs flex flex-col uppercase">{hero.appearance.race}</p>
                                </div>
                            )}
                            
                        </div>
                    </ScrollArea>
                    <div className="justify-self-center self-start">
                        <p>{hero.biography.alterEgos}</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}