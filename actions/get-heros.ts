import { Hero } from "@/types";

export default async function getHeros(): Promise<Hero[]> {
    const res = await fetch('http://homologacao3.azapfy.com.br/api/ps/metahumans');

    const data = await res.json();

    return data as Hero[];
}