import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

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

type SearchParamState = {
  DietList: { [key: string]: boolean };
  HealthList: { [key: string]: boolean };
  MealTypeList: { [key: string]: boolean };
};

export function SearchMenu() {
  const [searchParam, setSearchParam] = useState<SearchParamState>({
    DietList: {},
    HealthList: {},
    MealTypeList: {},
  });

  // setup the searchParam
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
  }, []);

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

  return (
    <HoverCard openDelay={3}>
      <HoverCardTrigger asChild>
        <Button variant="link" className="text-neutral-600 select-none">
          REFINE SEARCH BY Diet, Meal Type, Health
          <ChevronDown />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-96 md:w-[30rem]">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <div className="pt-2">
              <h4 className="text-sm font-semibold select-none">Diet</h4>
              <div className="flex flex-wrap gap-2">
                {DietList.map((item, index) => {
                  return (
                    <div className="flex items-center space-x-1" key={index}>
                      <Checkbox
                        id={item}
                        checked={searchParam.DietList[`${item}`]}
                        onClick={() => handleDietChange(item)}
                      />
                      <label
                        htmlFor={item}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer select-none"
                      >
                        {item}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="pt-2">
              <h4 className="text-sm font-semibold select-none">Health</h4>
              <div className="flex flex-wrap gap-2">
                {HealthList.map((item, index) => {
                  return (
                    <div className="flex items-center space-x-1" key={index}>
                      <Checkbox
                        id={item}
                        checked={searchParam.HealthList[`${item}`]}
                        onClick={() => handleHealthChange(item)}
                      />
                      <label
                        htmlFor={item}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none cursor-pointer"
                      >
                        {item}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="pt-2">
              <h4 className="text-sm font-semibold select-none">Meal Type</h4>
              <div className="flex flex-wrap gap-2">
                {MealTypeList.map((item, index) => {
                  return (
                    <div className="flex items-center space-x-1" key={index}>
                      <Checkbox
                        id={item}
                        checked={searchParam.MealTypeList[`${item}`]}
                        onClick={() => handleMealTypeChange(item)}
                      />
                      <label
                        htmlFor={item}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none cursor-pointer"
                      >
                        {item}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
