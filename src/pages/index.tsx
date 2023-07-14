import { Layout, GenericPanel } from "@/components/custom/index";
import Image from "next/image";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteFetch } from "../hooks/index";

export default function Home() {
  const { ref: interactionRef, entry } = useIntersection();

  const APPLICATIONID = process.env.APPLICATIONID;
  const APPLICATIONKEYS = process.env.APPLICATIONKEYS;
  const url = `https://api.edamam.com/api/recipes/v2?field=label&field=images&field=source&field=dietLabels&field=url&field=healthLabels&field=ingredientLines&field=ingredients&field=calories&field=totalWeight&field=totalTime&field=cuisineType&field=mealType&field=dishType&field=cautions&field=uri&q=beef&type=public&app_id=${APPLICATIONID}&app_key=${APPLICATIONKEYS}`;
  const { DATA } = useInfiniteFetch({ entry, url });

  console.log(DATA);

  return (
    <Layout>
      <GenericPanel className={"mt-20 md:mt-36"}>
        <div data-aos="zoom-in" className="flex justify-center items-center">
          <Image
            className="w-44 h-44 md:w-52 md:h-52  relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/next.svg"
            alt="Next.js Logo"
            width={190}
            height={47}
            priority
          />
        </div>
      </GenericPanel>
    </Layout>
  );
}
