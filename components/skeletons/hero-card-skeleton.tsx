export default function HeroCardSkeleton() {
    return (
        <div 
            className="relative aspect-[3/4] group border-2 border-zinc-500 rounded-xl overflow-hidden shadow-lg animate-pulse"
        > 
            <div className="absolute text-center w-full bottom-0 p-4 bg-white/80 dark:bg-black/80 backdrop-blur-2xl rounded-lg overflow-hidden">
                <div className="space-y-2 flex flex-col items-center">
                    <div className="bg-zinc-500 dark:bg-zinc-700 rounded-md animate-pulse w-full p-2" />
                    <div className="bg-zinc-500 dark:bg-zinc-700 rounded-md animate-pulse w-1/2 p-2" />
                </div>
            </div>
        </div>
    )
}