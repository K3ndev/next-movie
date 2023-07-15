import { Layout, GenericPanel, SearchMenu } from "@/components/custom/index";
import { useIntersection } from "@mantine/hooks";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useInfiniteFetch } from "../hooks/index";

export default function Home() {
  const { ref: interactionRef, entry } = useIntersection();

  // const APPLICATIONID = process.env.APPLICATIONID;
  // const APPLICATIONKEYS = process.env.APPLICATIONKEYS;
  // const url = `https://api.edamam.com/api/recipes/v2?field=label&field=images&field=source&field=dietLabels&field=url&field=healthLabels&field=ingredientLines&field=ingredients&field=calories&field=totalWeight&field=totalTime&field=cuisineType&field=mealType&field=dishType&field=cautions&field=uri&q=beef&type=public&app_id=${APPLICATIONID}&app_key=${APPLICATIONKEYS}`;
  // const { DATA } = useInfiniteFetch({ entry, url });

  // console.log(DATA);
  // https://api.edamam.com/api/recipes/v2?field=label&field=images&field=source&field=dietLabels&field=url&field=healthLabels&field=ingredientLines&field=ingredients&field=calories&field=totalWeight&field=totalTime&field=cuisineType&field=mealType&field=dishType&field=cautions&field=uri
  // &eq=bef&type=public&app_id=${APPLICATIONID}&app_key=${APPLICATIONKEYS}

  // https://api.edamam.com/api/recipes/v2?field=label&field=images&field=source&field=dietLabels&field=url&field=healthLabels&field=ingredientLines&field=ingredients&field=calories&field=totalWeight&field=totalTime&field=cuisineType&field=mealType&field=dishType&field=cautions&field=uri
  // &diet=balanced
  // &q=beef&type=public&app_id=338fbe36&app_key=71b0be31e06ed9b486f4758f0a72949e

  // https://api.edamam.com/api/recipes/v2?field=label&field=images&field=source&field=dietLabels&field=url&field=healthLabels&field=ingredientLines&field=ingredients&field=calories&field=totalWeight&field=totalTime&field=cuisineType&field=mealType&field=dishType&field=cautions&field=uri
  // &diet=balanced&health=alcohol-free&q=beef
  // &type=public&app_id=338fbe36&app_key=71b0be31e06ed9b486f4758f0a72949e

  // https://api.edamam.com/api/recipes/v2?field=label&field=images&field=source&field=dietLabels&field=url&field=healthLabels&field=ingredientLines&field=ingredients&field=calories&field=totalWeight&field=totalTime&field=cuisineType&field=mealType&field=dishType&field=cautions&field=uri
  // &diet=balanced
  // &diet=high-fiber
  // &mealType=Breakfast
  // &health=alcohol-free
  // &q=beef
  // &type=public&app_id=338fbe36&app_key=71b0be31e06ed9b486f4758f0a72949e
  return (
    <Layout>
      <GenericPanel>
        <div className="max-w-[30rem] lg:max-w-[35rem]  mx-auto">
          <div className="flex  items-center">
            <Input placeholder="Search Recipes" />
            <div className="h-100 flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="border border-solid border-neutral-500"
              >
                <Search color="black" size={30} />
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <SearchMenu />
          </div>
        </div>
      </GenericPanel>
    </Layout>
  );
}
