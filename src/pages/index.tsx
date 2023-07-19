import { useState, useEffect, useRef } from "react";
import { Layout, GenericPanel, SearchMenu } from "@/components/custom/index";
import { useIntersection } from "@mantine/hooks";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useInfiniteFetch } from "../hooks/index";
import { SearchParamState } from "./types";

const DietList = [
  "Balanced",
  "High-Fiber",
  "High-Protein",
  "Low-Carb",
  "Low-Fat",
  "Low-Sodium",
];
const HealthList = [
  "Alcohol-Free",
  "Dairy-Free",
  "Egg-Free",
  "Fish-Free",
  "Kidney-Friendly",
  "Low-Fat-Abs",
  "Low-Potassium",
  "Low-Sugar",
  "Peanut-Free",
  "Vegan",
  "Vegetarian",
  "Wheat-Free",
];
const MealTypeList = ["Breakfast", "Dinner", "Lunch", "Snack", "Teatime"];

export default function Home() {
  // states
  // const searchQuery: MutableRefObject<HTMLInputElement | null | undefined> =
  //   useRef();
  // const searchQuery: Ref<HTMLInputElement> | undefined = useRef();
  // im getting on this type
  const searchQuery: any = useRef();
  const [searchParam, setSearchParam] = useState<SearchParamState>({
    DietList: {},
    HealthList: {},
    MealTypeList: {},
  });
  const { ref: interactionRef, entry } = useIntersection();

  const getUrl = (): string => {
    const url = `https://api.edamam.com/api/recipes/v2?field=label&field=images&field=source&field=dietLabels&field=url&field=healthLabels&field=ingredientLines&field=ingredients&field=calories&field=totalWeight&field=totalTime&field=cuisineType&field=mealType&field=dishType&field=cautions&field=uri`;
    const dietParams = Object.keys(searchParam.DietList)
      .filter((key) => searchParam.DietList[key] === true)
      .map((key) => `diet=${key.toLowerCase()}`)
      .join("&");
    const mealTypeParams = Object.keys(searchParam.MealTypeList)
      .filter((key) => searchParam.MealTypeList[key] === true)
      .map((key) => `mealType=${key.toLowerCase()}`)
      .join("&");
    const healthParams = Object.keys(searchParam.HealthList)
      .filter((key) => searchParam.HealthList[key] === true)
      .map((key) => `health=${key.toLowerCase()}`)
      .join("&");
    const APPLICATIONID = process.env.APPLICATIONID;
    const APPLICATIONKEYS = process.env.APPLICATIONKEYS;
    const type = `type=public&app_id=${APPLICATIONID}&app_key=${APPLICATIONKEYS}`;

    const combinedParams = [
      url,
      dietParams,
      mealTypeParams,
      healthParams,
      `q=${searchQuery.current?.value ?? "beef"}`,
      type,
    ]
      .filter(Boolean)
      .join("&");

    return combinedParams;
  };

  // searchParam
  // creating an array for searchParam
  useEffect(() => {
    const initialDietList: SearchParamState["DietList"] = {};
    const initialHealthList: SearchParamState["HealthList"] = {};
    const initialMealTypeList: SearchParamState["MealTypeList"] = {};

    DietList.forEach((diet) => {
      initialDietList[diet] = false;
    });

    HealthList.forEach((health) => {
      initialHealthList[health] = false;
    });

    MealTypeList.forEach((mealType) => {
      initialMealTypeList[mealType] = false;
    });

    setSearchParam({
      DietList: initialDietList,
      HealthList: initialHealthList,
      MealTypeList: initialMealTypeList,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // for state up
  const handleDietChange = (diet: string) => {
    setSearchParam((prevState) => ({
      ...prevState,
      DietList: {
        ...prevState.DietList,
        [diet]: !prevState.DietList[diet],
      },
    }));
  };
  const handleHealthChange = (diet: string) => {
    setSearchParam((prevState) => ({
      ...prevState,
      HealthList: {
        ...prevState.HealthList,
        [diet]: !prevState.HealthList[diet],
      },
    }));
  };
  const handleMealTypeChange = (diet: string) => {
    setSearchParam((prevState) => ({
      ...prevState,
      MealTypeList: {
        ...prevState.MealTypeList,
        [diet]: !prevState.MealTypeList[diet],
      },
    }));
  };

  // TODO :: getting an error here
  // const { DATA } = useInfiniteFetch({ entry, url: getUrl() });

  const searchHandler = () => {
    console.log(getUrl());
  };

  return (
    <Layout>
      <GenericPanel>
        <div className="max-w-[30rem] lg:max-w-[35rem]  mx-auto">
          <div className="flex  items-center">
            <Input placeholder="Search Recipes" ref={searchQuery} />
            <div className="h-100 flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="border border-solid border-neutral-500"
                onClick={searchHandler}
              >
                <Search color="black" size={30} />
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <SearchMenu
              searchParam={searchParam}
              DietList={DietList}
              HealthList={HealthList}
              MealTypeList={MealTypeList}
              handleDietChange={handleDietChange}
              handleHealthChange={handleHealthChange}
              handleMealTypeChange={handleMealTypeChange}
            />
          </div>
        </div>
      </GenericPanel>
    </Layout>
  );
}
