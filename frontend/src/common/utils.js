export const addToCart = (product, attributes, quantity) => {
  let cart = [];
  const cartStorage = localStorage.getItem("cart");

  if (!product.inStock) {
    return;
  }

  if (cartStorage) {
    JSON.parse(cartStorage).map((item) => cart.push(item));
  }

  if(!attributes.length) {
    product.attributes.map((attribute) => {
      attributes.push({
        name: attribute.name,
        value: attribute.items[0].displayValue || null,
      });
    });
  }

  const cartProductIndex = cart.findIndex(
    (item) => item.product.id === product.id
  );

  if (cartProductIndex > -1) {
    const findSameAttributesIndex = cart.findIndex(
      (item) =>
        item.product.id === product.id &&
        arraysEqual(item.attributes, attributes)
    );

    if (findSameAttributesIndex > -1) {
      cart[findSameAttributesIndex].quantity += 1;
    } else {
      cart.push({
        product,
        attributes,
        quantity,
      });
    }
  } else {
    cart.push({
      product,
      attributes,
      quantity,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};

export const objectsEqual = (o1, o2) =>
  typeof o1 === "object" && Object.keys(o1).length > 0
    ? Object.keys(o1).length === Object.keys(o2).length &&
      Object.keys(o1).every((p) => objectsEqual(o1[p], o2[p]))
    : o1 === o2;

export const arraysEqual = (a1, a2) =>
  a1.length === a2.length && a1.every((o, idx) => objectsEqual(o, a2[idx]));
