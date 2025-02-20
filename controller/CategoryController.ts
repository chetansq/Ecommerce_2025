import { Request, Response } from "express"
import CategoryTable from "../database/CategorySchema"
import { EcomCategory } from "../models/EcomCategory"
import mongoose from "mongoose";


// @usage : Get All Category
// @method : GET
// @params : no-params
// @url : http://127.0.0.1:9499/categorys

export const getAllCategory = async (request: Request, response: Response) => {
    try {
        let categorys: EcomCategory[] | undefined = await CategoryTable.find();

        if (categorys) {
            return response.status(200).json(categorys)
        }
    } catch (error: any) {
        return response.status(500).json({
            msg: "Data not Found...❌"
        });
    }
}


// @usage : Create Category
// @method : POST
// @params : category_name, category_description, category_logo, isActive 
// @url : http://127.0.0.1:9499/categorys

export const cretaeCategory = async (request: Request, response: Response) => {
    let { category_name, category_description, category_logo, isActive } = request.body;

    let theCategorys: EcomCategory | null | undefined = await new CategoryTable({
        category_name: category_name,
        category_description: category_description,
        category_logo: category_logo,
        isActive: isActive
    }).save();

    if (theCategorys) {
        return response.status(200).json({
            data: theCategorys,
            msg: "Data Created...✅"
        });
    }
}


// @usage : Get CategoryId
// @method : GET
// @params : categoryId 
// @url : http://127.0.0.1:9499/categorys/67b6ff0f502f706800091aee

export const getCategoryId = async (request: Request, response: Response) => {
    let { categoryId } = request.params;

    let mongoCategoryID = new mongoose.Types.ObjectId(categoryId);

    let theCategory: EcomCategory | null | undefined = await CategoryTable.findById(mongoCategoryID);

    if (!theCategory) {
        return response.status(500).json({
            data: null,
            msg: "Data not found...❌"
        });
    }

    return response.status(200).json({
        data: theCategory,
        msg: "Data Found...✅"
    });
}

// @usage : update Category
// @method : PUT
// @params : categoryId ,category_name, category_description, category_logo, isActive 
// @url : http://127.0.0.1:9499/categorys/67b6ff0f502f706800091aee

export const updateCategory = async (request: Request, response: Response) => {
    let { cateogryId } = request.params;

    let { category_name, category_description, category_logo, isActive } = request.body;

    let theCategory: EcomCategory | null | undefined = await CategoryTable.findByIdAndUpdate(cateogryId, {
        category_name: category_name,
        category_description: category_description,
        category_logo: category_logo,
        isActive: isActive
    }, {
        new: true
    });

    if (!theCategory) {
        return response.status(500).json({
            data: null,
            msg: "Data not Update...❌"

        });
    }

    return response.status(200).json({
        data: theCategory,
        msg: "Data updated...✅"
    });
}

// @usage : Delete Category
// @method : DELETE
// @params : categoryId
// @url : http://127.0.0.1:9499/categorys/67b6ff0f502f706800091aee

export const deleteCategory = async (request: Request, response: Response) => {
    let { categoryId } = request.params;

    let theCategory: EcomCategory | null | undefined = await CategoryTable.findByIdAndDelete(categoryId);

    if (!theCategory) {
        return response.status(500).json({
            data: null,
            msg: "Data not delete...❌"
        });
    }

    return response.status(200).json({
        data: theCategory,
        msg: "Data Deleted...✅"
    });
}