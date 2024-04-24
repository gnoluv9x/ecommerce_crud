import Product from "../models/product";

export const updateProductQuantity = products => {
  products.forEach(product => {
    Product.findByIdAndUpdate(
      product.id,
      { $inc: { quantity: -product.quantity, sold: product.quantity } },
      { new: true },
      (err, updatedProduct) => {
        if (err) {
          console.log("============== Debug_here err ==============");
          console.dir(err, { depth: null });
        } else {
          console.log("Product quantity updated successfully:", updatedProduct);
        }
      }
    );
  });
};
