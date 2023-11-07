import getHeros from "@/actions/get-heros"
import Container from "@/components/ui/container";
import HeroList from "@/components/ui/hero-list";

export default async function Home() {
  const heros = await getHeros();

  return (
    <Container>
        <h1 className="w-full text-center text-5xl uppercase m-5"><strong>Escolha um Heroi para batalhar</strong></h1>
        <HeroList heros={heros} />
    </Container>
  )
}
