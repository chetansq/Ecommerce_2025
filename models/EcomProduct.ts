import mongoose from "mongoose"

export interface EcomProduct {
    subCategory_Id:mongoose.Types.ObjectId,
    Product_name: string,
    Product_description: string,
    Product_image: string,
    Product_Images: string[],
    Product_price: string,
    Product_brand: string,
    Product_quantity: number,
    isActive: boolean
}