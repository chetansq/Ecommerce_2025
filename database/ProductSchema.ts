import mongoose, { Schema } from "mongoose";
import { EcomProduct } from "../models/EcomProduct";

const ProductSchema = new mongoose.Schema<EcomProduct>({
    subCategory_Id: { type: Schema.Types.ObjectId, required: true },
    Product_name: { type: String, required: true },
    Product_description: { type: String, required: true, trim: true },
    Product_image: { type: String, required: true },
    Product_Images: { type: [String], required: true },
    Product_price: { type: String, required: true },
    Product_brand: { type: String, required: true },
    Product_quantity: { type: Number, required: true },
    isActive: { type: Boolean, default: false }
}, {
    timestamps: true
});


const ProductTable = mongoose.model<EcomProduct>("Products", ProductSchema);

export default ProductTable;