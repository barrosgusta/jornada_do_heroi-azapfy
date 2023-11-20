import HeroCardSkeleton from "./hero-card-skeleton"

export default function HeroListSkeleton() {
    return (
        <>
            <div className="bg-zinc-300 dark:bg-zinc-800 rounded-lg animate-pulse p-5"/>
            <div className="mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-12">
                <HeroCardSkeleton />
                <HeroCardSkeleton />
                <HeroCardSkeleton />
                <HeroCardSkeleton />
                <HeroCardSkeleton />
                <HeroCardSkeleton />
                <HeroCardSkeleton />
                <HeroCardSkeleton />
            </div>
        </>
    )
}