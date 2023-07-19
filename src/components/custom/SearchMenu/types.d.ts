export type SearchParamState = {
  DietList: Record<string, boolean>;
  HealthList: Record<string, boolean>;
  MealTypeList: Record<string, boolean>;
};

export type SearchMenuType = {
  searchParam: SearchParamState;
  DietList: string[];
  HealthList: string[];
  MealTypeList: string[];
  handleDietChange: (diet: string) => void;
  handleHealthChange: (diet: string) => void;
  handleMealTypeChange: (diet: string) => void;
};
