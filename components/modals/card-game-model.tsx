"use client"

import { Dialog, DialogContent } from "../ui/dialog";
import { useEffect, useState } from "react";
import useCardGameModal from "@/hooks/use-card-game-modal";
import { ChevronDownSquare, ChevronUpSquare, SquareEqualIcon } from "lucide-react";
import { HeroCard, HeroCardInfoButton, HeroCardRoot } from "../hero-card";

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
                className="max-w-5xl"
            >
                <h1 className="text-center text-3xl uppercase">{getWinnerName()}</h1>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <HeroCardRoot className="grid justify-center self-center">
                        <HeroCard  
                            Hero={player1Hero}
                            className="max-h-80 min-h-[210px] md:min-h-[230px] lg:min-h-[290px]"
                        />
                        <HeroCardInfoButton Hero={player1Hero} />
                    </HeroCardRoot>
                    <div className="text-left justify-self-start">
                        <div className="flex flex-col h-full justify-around">
                            {Object.entries(player1Hero.powerstats).map(([key, value]) => (
                                <div key={key} className="flex space-x-1">
                                    <span className="text-muted-foreground text-sm uppercase">
                                        {key} <strong>{value}</strong>
                                    </span>
                                    {Number(value) > Number(player2Hero.powerstats[key as keyof typeof player1Hero.powerstats]) && (
                                        <ChevronUpSquare size={15} color="green" />
                                    )}
                                    {Number(value) < Number(player2Hero.powerstats[key as keyof typeof player1Hero.powerstats]) && (
                                        <ChevronDownSquare size={15} color="red" />
                                    )}
                                    {Number(value) == Number(player2Hero.powerstats[key as keyof typeof player1Hero.powerstats]) && (
                                        <SquareEqualIcon size={15} className="text-yellow-600" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="justify-self-end">
                        <div className="text-right flex flex-col h-full justify-around">
                            {Object.entries(player2Hero.powerstats).map(([key, value]) => (
                                <div key={key} className="flex space-x-1 justify-end">
                                    {Number(value) > Number(player1Hero.powerstats[key as keyof typeof player2Hero.powerstats]) && (
                                        <ChevronUpSquare size={15} color="green" />
                                    )}
                                    {Number(value) < Number(player1Hero.powerstats[key as keyof typeof player2Hero.powerstats]) && (
                                        <ChevronDownSquare size={15} color="red" />
                                    )}
                                    {Number(value) == Number(player1Hero.powerstats[key as keyof typeof player2Hero.powerstats]) && (
                                        <SquareEqualIcon size={15} className="text-yellow-600" />
                                    )}
                                    <span className="text-muted-foreground text-sm uppercase">
                                        <strong>{value}</strong> {key}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <HeroCardRoot className="grid justify-center">
                        <HeroCard 
                            Hero={player2Hero}
                            className="max-h-80 min-h-[210px] md:min-h-[230px] lg:min-h-[290px]"
                        />
                        <HeroCardInfoButton Hero={player2Hero} />
                    </HeroCardRoot>
                </div>
            </DialogContent>
        </Dialog>
    )
}