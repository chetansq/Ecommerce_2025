import { Request, Response } from "express"
import { EcomSubCategory } from "../models/EcomSubCategory";
import SubCategoryTable from "../database/SubCategorySchema"
import mongoose from "mongoose";

// @usage : Get All Sub-Category
// @method : GET
// @params : no-params
// @url : http://127.0.0.1:9499/sub-categorys

export const getAllSubCategory = async (request: Request, response: Response) => {
    try {
        let subCategorys: EcomSubCategory[] | undefined = await SubCategoryTable.find();

        if (subCategorys) {
            return response.status(200).json(subCategorys);
        }
    } catch (error: any) {
        return response.status(500).json({
            msg: "Sub-Category Not Found...❌"
        });
    }
}

// @usage : Create Sub-Category
// @method : POST
// @params : category_id, name, description, logo, isActive
// @url : http://127.0.0.1:9499/sub-categorys

export const createSubCategory = async (request: Request, response: Response) => {
    let { category_id, sub_category_name, sub_category_description, sub_category_logo, sub_category_isActive } = request.body;

    let theSubCategory: EcomSubCategory | null | undefined = await new SubCategoryTable({
        category_id: category_id,
        sub_category_name: sub_category_name,
        sub_category_description: sub_category_description,
        sub_category_logo: sub_category_logo,
        sub_category_isActive: sub_category_isActive
    }).save();

    if (theSubCategory) {
        return response.status(200).json({
            data: theSubCategory,
            msg: "Data Found...✅"
        });
    }

    return response.status(500).json({
        data: null,
        msg: "Data Not Found...❌"
    });
}

// @usage : Get Sub-CategoryId
// @method : GET
// @params : subCategory_id
// @url : http://127.0.0.1:9499/sub-categorys/67b71c5ec0a8662150da78e2

export const getsubCategoryId = async (request: Request, response: Response) => {
    let { subCategoryId } = request.params;
    let mongoSubCategoryID = new mongoose.Types.ObjectId(subCategoryId);
    let theSubCategory: EcomSubCategory | null | undefined = await SubCategoryTable.findById(mongoSubCategoryID);


    if (!theSubCategory) {
        return response.status(500).json({
            data: null,
            msg: "Sub-Category Data Not Found...❌"
        });
    }

    return response.status(200).json({
        data: theSubCategory,
        msg: "Data Founded...✅"
    });
}

// @usage : Update Sub-Category
// @method : PUT
// @params : subCategory_id, category_id, name, description, logo, isActive
// @url : http://127.0.0.1:9499/sub-categorys/67b71c5ec0a8662150da78e2

export const updateSubCategory = async (request: Request, response: Response) => {
    let { subCategory_Id } = request.params;
    // console.log(subCategory_Id);

    let { category_id, sub_category_name, sub_category_description, sub_category_logo, sub_category_isActive } = request.body;

    // console.log(category_id, name, description, logo, isActive);

    let theSubCategory: EcomSubCategory | null | undefined = await SubCategoryTable.findByIdAndUpdate(subCategory_Id, {
        category_id: category_id,
        sub_category_name: sub_category_name,
        sub_category_description: sub_category_description,
        sub_category_logo: sub_category_logo,
        sub_category_isActive: sub_category_isActive
    });

    console.log("theSubCategory", theSubCategory);

    if (!theSubCategory) {
        return response.status(500).json({
            data: null,
            msg: "Sub-Category Data Not Updated...❌"
        });
    }

    return response.status(200).json({
        data: theSubCategory,
        msg: "Data Updated...✅"
    });
}

// @usage : delete Sub-Category Data
// @method : DELETE
// @params : subCategory_id
// @url : http://127.0.0.1:9499/sub-categorys/67b71c5ec0a8662150da78e2

export const deleteSubCategory = async (request: Request, response: Response) => {
    let { subCategory_id } = request.params;
    // let { isActive } = request.body;

    // if (isActive == true) {
    //     isActive = false
    // };

    let theSubCategory: EcomSubCategory | null | undefined = await SubCategoryTable.findByIdAndDelete(subCategory_id); // isActive;

    if (!theSubCategory) {
        return response.status(500).json({
            data: null,
            msg: "Sub-Category Data Not Delete...❌"
        });
    }

    return response.status(200).json({
        data: theSubCategory,
        msg: "Data Deleted...✅"
    });
}