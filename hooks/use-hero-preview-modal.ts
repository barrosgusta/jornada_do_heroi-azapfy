import { NullHero } from "@/lib/utils";
import { Hero } from "@/types";
import { create } from "zustand";

interface HeroPreviewModalStore {
    isOpen: boolean;
    data: Hero;
    onOpen: (data: Hero) => void;
    onClose: () => void;
};

const useHeroPreviewModal = create<HeroPreviewModalStore>((set) => ({
    isOpen: false,
    data: NullHero,
    onOpen: (data: Hero) => set({ isOpen: true, data }),
    onClose: () => set({ isOpen: false, data: NullHero }),
}));

export default useHeroPreviewModal;