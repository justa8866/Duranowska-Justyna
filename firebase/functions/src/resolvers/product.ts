import {products} from "../data";

type Args = {
    id: string
};

const productResolver = (_parent: unknown, args: Args) => products.find(
  (product) => product.getId() === args.id
);

export default productResolver;
