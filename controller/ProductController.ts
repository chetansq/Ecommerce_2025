import { Request, Response } from "express";
import { EcomProduct } from "../models/EcomProduct";
import ProductTable from "../database/ProductSchema";
import mongoose from "mongoose";


// @usage : Get All Products
// @method : GET
// @params : no-params
// @ulr : http://127.0.0.1:9499/Products

export const getAllProducts = async (request: Request, response: Response) => {
    try {
        let products: EcomProduct[] | undefined = await ProductTable.find({ isActive: true });

        if (products) {
            return response.status(200).json({
                data: products,
                msg: "All Data Got It ...✅"
            });
        }
    }

    catch (error: any) {
        return response.status(500).json({
            msg: "Data not found...❌"
        });
    }
}

// @usage : Create Products
// @method : POST
// @params : subCategory_Id, Product_name, Product_description, Product_brand, Product_image, Product_Images, Product_price, Product_quantity
// @ulr : http://127.0.0.1:9499/Products

export const createProduct = async (reuqest: Request, response: Response) => {
    let { subCategory_Id, Product_name, Product_description, Product_brand, Product_image, Product_Images, Product_price, Product_quantity } = reuqest.body;

    let theProducts: EcomProduct | null | undefined = await new ProductTable({
        subCategory_Id: subCategory_Id,
        Product_name: Product_name,
        Product_description: Product_description,
        Product_brand: Product_brand,
        Product_image: Product_image,
        Product_Images: Product_Images,
        Product_price: Product_price,
        Product_quantity: Product_quantity
    }).save();



    if (theProducts) {
        return response.status(200).json({
            data: theProducts,
            msg: "Data Created...✅"
        });
    }

    return response.status(500).json({
        data: null,
        msg: "Data not created...❌"
    });
}

// @usage : Get  ProductId
// @method : GET
// @params : productId
// @ulr : http://127.0.0.1:9499/Products/67b96b616ab9b925eb14c98c

export const getProductId = async (request: Request, response: Response) => {
    let { productId } = request.params;
    let mongoProductId = new mongoose.Types.ObjectId(productId);
    let theProducts: EcomProduct | undefined | null = await ProductTable.findById(mongoProductId);

    if (!theProducts) {
        return response.status(500).json({
            data: null,
            msg: "Prodduct Not Found...❌"
        });
    }

    return response.status(200).json({
        data: theProducts,
        msg: "Product Found...✅"
    });
}

// @usage : Update Product
// @method : PUT
// @params : productId, subCategory_Id, Product_name, Product_description, Product_brand, Product_image, Product_Images, Product_price, Product_quantity
// @ulr : http://127.0.0.1:9499/Products/67b96b616ab9b925eb14c98c

export const updateProduct = async (request: Request, response: Response) => {
    let { productId } = request.params;

    let { subCategory_Id, Product_name, Product_description, Product_brand, Product_image, Product_Images, Product_price, Product_quantity, isActive } = request.body;

    let theProducts: EcomProduct | null | undefined = await ProductTable.findByIdAndUpdate(
        productId, {
        subCategory_Id, Product_name, Product_description, Product_brand, Product_image, Product_Images, Product_price, Product_quantity,
        isActive
    }, {
        new: true
    });

    if (!theProducts) {
        return response.status(500).json({
            data: null,
            msg: "Product Not Update...❌"
        });
    }

    return response.status(200).json({
        data: theProducts,
        msg: "Product Updated...✅"
    });

}

// @usage : Delete  Product
// @method : PUT
// @params : productId
// @ulr : http://127.0.0.1:9499/Products/67b96b616ab9b925eb14c98c

export const productStatus = async (request: Request, response: Response) => {
    let { productId } = request.params;

    console.log("ProductId", productId);

    let theProducts: EcomProduct | null | undefined = await ProductTable.findByIdAndUpdate(productId, {
        isActive: false
    }, {
        new: true
    });

    console.log("theProducts", theProducts);

    if (!theProducts) {
        return response.status(500).json({
            data: null,
            msg: "Product Not Delete...❌"
        });
    }

    return response.status(200).json({
        data: theProducts,
        msg: "Product Deleted...✅"
    });
}
