import ModulePokemon from "@/modules/pokemon"
import { GetServerSidePropsContext } from 'next';

type PokemonType = {
    name: string;
    sprites: {
        other: {
            'official-artwork': {
                front_default: string;
            };
        };
    };
    stats: {
        stat: {
            name: string;
        };
        base_stat: string;
    }[];
    abilities: {
        ability: {
            name: string;
        };
    }[];
    types: {
        type: {
            name: string;
        };
    }[];
}

export default function Home({ data }: {data: PokemonType} ) {
  return <ModulePokemon data={data}/>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {

    const { id } = context.query; // Get the id parameter from the query string

    // Fetch data from external API
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json() as unknown;

    // Pass data to the page via props
    return { props: { data } };
}
