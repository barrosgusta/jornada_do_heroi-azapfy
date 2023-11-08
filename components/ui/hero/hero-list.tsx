"use client"

import { useState } from "react"
import HeroCard from "./hero-card"
import { Input } from "../input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select"
import { Button } from "../button"
import { Hand, Search } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

type HeroListProps = {
    heros: Hero[],
    hasNextPage: boolean,
    hasPreviousPage: boolean,
}

export default function HeroList({ heros, hasNextPage, hasPreviousPage } : HeroListProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [currentFilter, setCurrentFilter] = useState<"name" | "publisher" | undefined>(undefined);
    const [searchText, setSearchText] = useState<string>("");

    const page = searchParams.get("page") ?? 1;
    const per_page = searchParams.get("per_page") ?? 12;

    console.log(page, per_page);

    const handleSearchClick = () => {
        if (!currentFilter) router.replace("/select-hero");

        if (currentFilter === "name") {
            router.push(`?name=${searchText}`);
        } else if (currentFilter === "publisher") {
            router.push(`?publisher=${searchText}`);
        } 
    }

    const handleNextPageClick = () => {
        router.push(`?page=${Number(page) + 1}&per_page=${per_page}${currentFilter ? `&${currentFilter}=${searchText}` : ""}`);
    }

    const handlePreviousPageClick = () => {
        router.push(`?page=${Number(page) - 1}&per_page=${per_page}${currentFilter ? `&${currentFilter}=${searchText}` : ""}`);
    }



    return (
        <div className="space-y-6">
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
                    <Search size={17} color="black" />
                </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-12">
                {heros.map((hero) => (
                    <HeroCard key={hero.id} Hero={hero} />
                ))}
            </div>
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
        </div>
    )
}