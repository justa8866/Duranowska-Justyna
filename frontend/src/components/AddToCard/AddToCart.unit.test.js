import { render, screen } from "@testing-library/react";
import AddToCart from "./index.js";

describe("AddToCart", () => {
  const addToCartMock = jest.fn();
  const onChangeCartItemMock = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should not render add to cart button if product is out of stock", () => {
    const product = { inStock: false };
    render(
      <AddToCart
        product={product}
        onChangeCartItem={onChangeCartItemMock}
        addToCart={addToCartMock}
      />
    );
    expect(screen.queryByText("ADD TO CART")).toBeNull();
  });
});
