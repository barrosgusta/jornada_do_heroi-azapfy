import { DummyHero } from "@/lib/utils";
import { Hero } from "@/types";
import { create } from "zustand";

interface CardGameModalStore {
    player1Hero: Hero;
    player2Hero: Hero;
    setPlayer1Hero: (hero: Hero) => void;
    setPlayer2Hero: (hero: Hero) => void;
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const useCardGameModal = create<CardGameModalStore>((set) => ({
    player1Hero: DummyHero,
    player2Hero: DummyHero,
    setPlayer1Hero: (hero: Hero) => set({ player1Hero: hero }),
    setPlayer2Hero: (hero: Hero) => set({ player2Hero: hero }),
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () =>
        set({
            isOpen: false,
            player1Hero: DummyHero,
            player2Hero: DummyHero,
        }),
}));

export default useCardGameModal;