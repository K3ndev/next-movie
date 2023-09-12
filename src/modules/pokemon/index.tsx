import Image from 'next/image';
import { GenericPanel, Layout } from "@/shared/components/custom/index"

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

const Pokemon = (props: { data: PokemonType }) => {

    const { data } = props

    return (
        <Layout>
            <GenericPanel className='mt-10 md:mt-12 mx-auto max-w-7xl'>
                <h2 className="mb-10 mt-9 w-full text-center text-4xl md:text-5xl">
                    {data?.name}
                </h2>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div className="relative">
                        <Image
                            src={data?.sprites.other['official-artwork'].front_default}
                            alt="pokemon"
                            width={300}
                            height={300}
                            quality={60}
                            className="aspect-square w-full scale-75"
                        />
                    </div>
                    <div className="flex h-full w-full flex-col gap-10 px-5 md:mx-0 md:justify-center">
                        <div className="w-fit rounded-lg bg-slate-700 p-6 text-white">
                            {data?.stats.map((stat, index) => (
                                <div className="flex justify-between gap-7" key={index}>
                                    <p className="">{stat.stat.name}:</p>
                                    <p>{stat.base_stat}</p>
                                </div>
                            ))}
                        </div>
                        <div className="w-fit rounded-lg bg-slate-700 p-6 text-white">
                            <div className="flex gap-2 ">
                                <h3 className="text-cyan-300">abilities: </h3>
                                {data?.abilities.map((item, index) => (
                                    <p key={index}>{item.ability.name}</p>
                                ))}
                            </div>
                            <div className="flex gap-2 ">
                                <h3 className="text-violet-300">types: </h3>
                                {data?.types.map((item, index) => (
                                    <p key={index}>{item.type.name}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </GenericPanel>
        </Layout>
    )
}

export default Pokemon

