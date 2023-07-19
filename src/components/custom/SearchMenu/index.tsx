import { ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { SearchMenuType } from "./types";

export function SearchMenu(props: SearchMenuType) {
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
                {props.DietList.map((item, index) => {
                  return (
                    <div className="flex items-center space-x-1" key={index}>
                      <Checkbox
                        id={item}
                        checked={props.searchParam.DietList[`${item}`]}
                        onClick={() => props.handleDietChange(item)}
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
                {props.HealthList.map((item, index) => {
                  return (
                    <div className="flex items-center space-x-1" key={index}>
                      <Checkbox
                        id={item}
                        checked={props.searchParam.HealthList[`${item}`]}
                        onClick={() => props.handleHealthChange(item)}
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
                {props.MealTypeList.map((item, index) => {
                  return (
                    <div className="flex items-center space-x-1" key={index}>
                      <Checkbox
                        id={item}
                        checked={props.searchParam.MealTypeList[`${item}`]}
                        onClick={() => props.handleMealTypeChange(item)}
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
