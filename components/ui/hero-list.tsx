"use client"

import { useState } from "react"
import HeroCard from "./hero-card"
import { Input } from "./input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"

type HeroListProps = {
    heros: Hero[]
}

export default function HeroList({ heros } : HeroListProps) {
    const [currentFilter, setCurrentFilter] = useState<"name" | "publisher" | undefined>(undefined);
    const [filteredHeros, setFilteredHeros] = useState<Hero[]>(heros);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        
        if (!currentFilter) return;

        const filtered = heros.filter((hero) => {
            if (currentFilter === "name") {
                return hero.name.toLowerCase().includes(value.toLowerCase());
            } else if (currentFilter === "publisher") {
                return hero.biography.publisher?.toLowerCase().includes(value.toLowerCase());
            }
        });
        
        setFilteredHeros(filtered);       
    }


    return (
        <>
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
            <Input type="text" placeholder="Pesquisar" className="px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleSearch}/>
        </div>
        <div className="mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-12">
            {filteredHeros.map((hero) => (
                <HeroCard key={hero.id} Hero={hero} />
            ))}
        </div>
        </>
    )
}