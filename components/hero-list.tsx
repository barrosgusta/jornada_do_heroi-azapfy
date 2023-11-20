"use client"

import { useState } from "react"
import { HeroCard, HeroCardInfoButton, HeroCardRoot } from "./hero-card"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Button } from "./ui/button"
import { Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { Hero } from "@/types"
import useCardGameModal from "@/hooks/use-card-game-modal"
import { DummyHero, cn } from "@/lib/utils"
import NoResults from "./ui/no-results"

type HeroListProps = {
    heros: Hero[],
    hasNextPage: boolean,
    hasPreviousPage: boolean,
    className?: string
}

export default function HeroList({ heros, hasNextPage, hasPreviousPage, className } : HeroListProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [currentFilter, setCurrentFilter] = useState<"name" | "publisher" | undefined>(undefined);
    const [searchText, setSearchText] = useState<string>("");

    const page = searchParams.get("page") ?? 1;
    const per_page = searchParams.get("per_page") ?? 12;

    const handleSearchClick = () => {
        if (!currentFilter) router.replace("/select-hero");

        if (currentFilter === "name") {
            router.push(`?name=${searchText}`);
        } else if (currentFilter === "publisher") {
            router.push(`?publisher=${searchText}`);
        } 
    };

    const handleNextPageClick = () => {
        router.push(`?page=${Number(page) + 1}&per_page=${per_page}${currentFilter ? `&${currentFilter}=${searchText}` : ""}`);
    };

    const handlePreviousPageClick = () => {
        router.push(`?page=${Number(page) - 1}&per_page=${per_page}${currentFilter ? `&${currentFilter}=${searchText}` : ""}`);
    };

    const cardGameModalState = useCardGameModal();

    const isFirstCardSelected = cardGameModalState.player1Hero.id !== 0;
    const isSecondCardSelected = cardGameModalState.player2Hero.id !== 0; 

    const handleSelectHero = (hero: Hero) => {
        const isThisCardSelected = cardGameModalState.player1Hero.id === hero.id || cardGameModalState.player2Hero.id === hero.id;

        if (isThisCardSelected) {
            cardGameModalState.player1Hero.id === hero.id ? cardGameModalState.setPlayer1Hero(DummyHero) : cardGameModalState.setPlayer2Hero(DummyHero);
        } else {
            if (!isFirstCardSelected) {
                cardGameModalState.setPlayer1Hero(hero);
            } else if (!isSecondCardSelected) {
                cardGameModalState.setPlayer2Hero(hero);
                cardGameModalState.onOpen();
            }
        };
    };

    return (
        <div className={cn("space-y-6 w-full", className)}>
            <div className="flex gap-4">
                <Select
                    value={currentFilter}
                    onValueChange={(e) => setCurrentFilter(e as any)}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue
                            placeholder="Filtro" 
                        />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="name">Nome</SelectItem>
                        <SelectItem value="publisher">Editora</SelectItem>
                    </SelectContent>
                </Select>
                <Input 
                    type="text" 
                    placeholder="Pesquisar" 
                    className="px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => {setSearchText(e.target.value)}}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearchClick();
                        }
                    }}
                />
                <Button variant="outline" onClick={handleSearchClick}>
                    <Search size={17}/>
                </Button>
            </div>
            {!heros.length && (
                <NoResults />
            )}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-12">
                {heros.map((hero) => (
                    <HeroCardRoot key={hero.id} >
                        <HeroCard 
                            Hero={hero}
                            isSelectable={true} 
                            isSelected={cardGameModalState.player1Hero.id === hero.id || cardGameModalState.player2Hero.id === hero.id}
                            onClick={() => {handleSelectHero(hero)}}
                        />
                        <HeroCardInfoButton Hero={hero} />
                    </HeroCardRoot>
                ))}
            </div>
            {(hasNextPage || hasPreviousPage) && (
                <div className="flex justify-center items-center gap-4">
                    <Button 
                        variant="outline" 
                        onClick={handlePreviousPageClick}
                        disabled={!hasPreviousPage}
                    >
                        Anterior
                    </Button>
                    <span className="text-center">Página {page}</span>
                    <Button 
                        variant="outline"
                        onClick={handleNextPageClick}
                        disabled={!hasNextPage}
                    >
                        Próxima
                    </Button>
                </div>
            )}
        </div>
    )
}