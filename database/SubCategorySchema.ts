import mongoose, { Schema } from "mongoose";
import { EcomSubCategory } from "../models/EcomSubCategory";

const SubCategorySchema = new mongoose.Schema<EcomSubCategory>({
    // category_id: { type: mongoose.Types.ObjectId, required: true },
    category_id: { type: String, required: true },
    // category_id: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    logo: { type: String, required: true },
    isActive: { type: Boolean, default: false }
}, { timestamps: true });

const SubCategoryTable = mongoose.model<EcomSubCategory>("SubCategory", SubCategorySchema);
export default SubCategoryTable;