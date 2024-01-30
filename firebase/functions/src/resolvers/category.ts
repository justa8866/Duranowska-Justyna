import {products} from "../data";
import {Category, CategoryShape} from "../data/type";

type Args = {
    input?: {
        title: string
    }
}

const categoryResolver = (_parent: unknown, args: Args): CategoryShape => {
  const {input: {title} = {}} = args;

  let result;

  if (!title || title === Category.all) {
    result = products;
  } else {
    result = products.filter(
      (product) => product.getCategory() === title
    );
  }

  return {
    name: title ? (title as Category) : Category.all,
    products: result,
  };
};

export default categoryResolver;
