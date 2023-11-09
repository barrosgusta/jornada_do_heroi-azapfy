"use client"

import { Dialog, DialogContent } from "../ui/dialog";
import { useEffect, useState } from "react";
import NextImage from "next/image";
import useCardGameModal from "@/hooks/use-card-game-modal";
import { ChevronUpSquare } from "lucide-react";

export default function CardGameModal() {
    const [isMounted, setIsMounted] = useState(false);
    const cardGameModalState = useCardGameModal();

    const { player1Hero, player2Hero } = cardGameModalState;

    const getWinner = () => {
        const player1Powerstats = Object.entries(player1Hero.powerstats);
        const player2Powerstats = Object.entries(player2Hero.powerstats);

        let player1Score = 0;
        let player2Score = 0;

        // wins by powerstats in advantage
        // player1Powerstats.forEach(([key, value]) => {
        //     const player2Powerstat = player2Powerstats.find(([key2, value2]) => key === key2);

        //     if (player2Powerstat) {
        //         if (Number(value) > Number(player2Powerstat[1])) {
        //             player1Score++;
        //         } else if (Number(value) < Number(player2Powerstat[1])) {
        //             player2Score++;
        //         }
        //     }
        // });

        // wins by sum of powerstats
        player1Powerstats.forEach(([key, value]) => {
            player1Score += Number(value);
        });
        player2Powerstats.forEach(([key, value]) => {
            player2Score += Number(value);
        });


        if (player1Score > player2Score) {
            return player1Hero;
        } else if (player1Score < player2Score) {
            return player2Hero;
        } else {
            return null;
        }
    };

    const getWinnerName = () => {
        const winner = getWinner();

        if (winner) {
            return winner.name + " ganhou!";
        } else {
            return "Empate";
        }
    }

    //fix hydration error
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <Dialog 
            open={cardGameModalState.isOpen} 
            onOpenChange={cardGameModalState.onClose}
        >
            <DialogContent
                className="p-11 max-w-4xl"
            >
                <h1 className="text-center text-3xl uppercase">{getWinnerName()}</h1>
                <div className="grid grid-cols-4 gap-6">
                    <div className="relative max-w-xl rounded-xl border-2 border-black shadow-xl overflow-hidden aspect-[3/4]">
                        <NextImage
                            fill
                            alt="Hero 1 Image"
                            src={player1Hero.images.lg}
                            className="object-cover"
                        />
                    </div>
                    <div className="text-left justify-self-start">
                        <div className="flex flex-col h-full justify-around">
                            {Object.entries(player1Hero.powerstats).map(([key, value]) => (
                                <div key={key} className="flex space-x-1">
                                    <span className="text-muted-foreground text-sm uppercase">
                                        {key} <strong>{value}</strong>
                                    </span>
                                    {Number(value) > Number(player2Hero.powerstats[key as keyof typeof player1Hero.powerstats]) ? (
                                        <ChevronUpSquare size={15} color="green" />
                                    ): (
                                        <ChevronUpSquare className="transform rotate-180" size={15} color="red" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="justify-self-end">
                        <div className="text-right flex flex-col h-full justify-around">
                            {Object.entries(player2Hero.powerstats).map(([key, value]) => (
                                <div key={key} className="flex space-x-1 justify-end">
                                    {Number(value) > Number(player1Hero.powerstats[key as keyof typeof player2Hero.powerstats]) ? (
                                        <ChevronUpSquare size={15} color="green" />
                                    ): (
                                        <ChevronUpSquare className="transform rotate-180" size={15} color="red" />
                                    )}
                                    <span className="text-muted-foreground text-sm uppercase">
                                        <strong>{value}</strong> {key}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative max-w-xl rounded-xl border-2 border-black shadow-xl overflow-hidden aspect-[3/4]">
                        <NextImage
                            fill
                            alt="Hero 2 Image"
                            src={player2Hero.images.lg}
                            className="object-cover"
                        />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}