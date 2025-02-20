import mongoose from "mongoose"

export interface EcomSubCategory {
    // category_id: mongoose.Types.ObjectId,
    category_id: string,
    name: string,
    description: string,
    logo: string,
    isActive: boolean,
    createdAt?: Date,
    updatedAt?: Date
}