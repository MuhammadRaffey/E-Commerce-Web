export const category = {
  name: "category",
  type: "document",
  title: "Category",
  fields: [
    {
      name: "category",
      title: "Product Category",
      type: "string",
      options: {
        list: [
          { title: "Women", value: "women" },
          { title: "Men", value: "men" },
          { title: "Children", value: "children" },
        ],
      },
    },
  ],
};
