import Container from "@/components/ui/container";
import HeroListSkeleton from "@/components/skeletons/hero-list-skeleton";

export default async function SelectHeroLoading() {
  return (
    <Container>
        <h1 className="w-full text-center text-5xl uppercase m-5 drop-shadow-lg animate-pulse">
          <strong>Carregando herois</strong>
        </h1>
        <HeroListSkeleton />
    </Container>
  )
}
