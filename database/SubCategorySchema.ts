import mongoose, { Schema } from "mongoose";
import { EcomSubCategory } from "../models/EcomSubCategory";

const SubCategorySchema = new mongoose.Schema<EcomSubCategory>({

    category_id: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    sub_category_name: { type: String, required: true },
    sub_category_description: { type: String, required: true },
    sub_category_logo: { type: String, required: true },
    sub_category_isActive: { type: Boolean, default: true }
}, { timestamps: true });

const SubCategoryTable = mongoose.model<EcomSubCategory>("SubCategory", SubCategorySchema);
export default SubCategoryTable;