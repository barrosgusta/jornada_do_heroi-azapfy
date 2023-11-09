import getHeros from "@/actions/get-heros"
import Container from "@/components/ui/container";
import HeroList from "@/components/ui/hero/hero-list";

export default async function SelectHeroPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const heros = await getHeros();

  const page = searchParams["page"] ?? 1;
  const per_page = searchParams["per_page"] ?? 12; 
  const name = searchParams["name"] ?? "";
  const publisher = searchParams["publisher"] ?? "";

  console.log(name, publisher);

  const filteredHeros = heros.filter((hero) => {
    if (name) {
      return hero.name.toLowerCase().includes(String(name).toLowerCase());
    } else if (publisher) {
      return hero.biography.publisher?.toLowerCase().includes(String(publisher).toLowerCase());
    } else {
      return true;
    }
  });

  const start = (Number(page) - 1) * Number(per_page);
  const end = Number(page) * Number(per_page);

  const currentHeros = filteredHeros.slice(start,end);

  return (
    <Container>
        <h1 className="w-full text-center text-5xl uppercase m-5 drop-shadow-lg"><strong>Escolha um Heroi para batalhar</strong></h1>
        <HeroList 
          heros={currentHeros}
          hasNextPage={end < filteredHeros.length}
          hasPreviousPage={start > 0}
        />
    </Container>
  )
}