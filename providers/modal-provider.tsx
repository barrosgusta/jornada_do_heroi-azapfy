"use client"

import CardGameModal from "@/components/modals/card-game-model";
import HeroPreviewModal from "@/components/modals/hero-preview-modal";

export default function ModalProvider() {
    return (
        <>
            <HeroPreviewModal />
            <CardGameModal />
        </>
    )
}