export type useInfiniteFetchType = {
  entry: IntersectionObserverEntry;
  url: string;
};

export type RecipeResultType = {
  hits: unknown[];
  _links: {
    next: {
      href: string;
      title: string;
    };
  };
};
