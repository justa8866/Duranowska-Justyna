import { render, fireEvent, screen } from "@testing-library/react";
import AddToCard from "./index.js";
import { addToCart } from "../../common/utils";

jest.mock("../../common/utils", () => ({
  addToCart: jest.fn(),
}));

describe("AddToCard Component", () => {
  it("calls addToCart and onChangeCartItem on button click", () => {
    const mockOnChangeCartItem = jest.fn();
    const product = { inStock: true };
    const selectedAttributes = { color: "blue", size: "M" };

    render(
      <AddToCard 
        product={product} 
        selectedAttributes={selectedAttributes} 
        onChangeCartItem={mockOnChangeCartItem} 
      />
    );

    fireEvent.click(screen.getByText(/ADD TO CART/i));
    expect(addToCart).toHaveBeenCalledWith(product, selectedAttributes, 1);
    expect(mockOnChangeCartItem).toHaveBeenCalled();
  });
});