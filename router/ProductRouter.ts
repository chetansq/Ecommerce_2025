import { Request, Response, Router } from "express";
import * as ProductController from "../controller/ProductController"

const ProductRouter: Router = Router();


// @usage : Get All Products
// @method : GET
// @params : no-params
// @ulr : http://127.0.0.1:9499/Products

ProductRouter.get("/", async (request: Request, response: Response) => {
    await ProductController.getAllProducts(request, response);
});

// @usage : Create Products
// @method : POST
// @params : subCategory_Id, Product_name, Product_description, Product_brand, Product_image, Product_Images, Product_price, Product_quantity
// @ulr : http://127.0.0.1:9499/Products

ProductRouter.post("/", async (request: Request, response: Response) => {
    await ProductController.createProduct(request, response);
});

// @usage : Get  ProductId
// @method : GET
// @params : productId
// @ulr : http://127.0.0.1:9499/Products/67b96b616ab9b925eb14c98c

ProductRouter.get("/:productId", async (request: Request, response: Response) => {
    await ProductController.getProductId(request, response);
});

// @usage : Update Product
// @method : PUT
// @params : productId, subCategory_Id, Product_name, Product_description, Product_brand, Product_image, Product_Images, Product_price, Product_quantity
// @ulr : http://127.0.0.1:9499/Products/67b96b616ab9b925eb14c98c

ProductRouter.put("/:productId", async (request: Request, response: Response) => {
    await ProductController.updateProduct(request, response);
});


// @usage : Delete  Product
// @method : DELETE
// @params : productId
// @ulr : http://127.0.0.1:9499/Products/67b96b616ab9b925eb14c98c

ProductRouter.put("/delete/:productId", async (request: Request, response: Response) => {
    await ProductController.productStatus(request, response);
});
export default ProductRouter;