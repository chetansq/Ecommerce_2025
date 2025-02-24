import { Request, Response, Router } from "express";
import * as SubCategoryController from "../controller/SubCategoryController";

const SubCategoryRouter: Router = Router();

// @usage : Get All Category
// @method : GET
// @params : no-params
// @url : http://127.0.0.1:9499/sub-categorys

SubCategoryRouter.get("/", async (request: Request, response: Response) => {
    await SubCategoryController.getAllSubCategory(request, response);
});

// @usage : Create Sub-Category
// @method : POST
// @params : category_id, name, description, logo, isActive
// @url : http://127.0.0.1:9499/sub-categorys

SubCategoryRouter.post("/", async (request: Request, response: Response) => {
    await SubCategoryController.createSubCategory(request, response);
});

// @usage : Get Sub-CategoryId
// @method : GET
// @params : subCategory_id
// @url : http://127.0.0.1:9499/sub-categorys/67b71c5ec0a8662150da78e2

SubCategoryRouter.get("/:subCategoryId", async (request: Request, response: Response) => {
    await SubCategoryController.getsubCategoryId(request, response);
});

// @usage : Update Sub-Category
// @method : PUT
// @params : subCategory_id, category_id, name, description, logo, isActive
// @url : http://127.0.0.1:9499/sub-categorys/67b71c5ec0a8662150da78e2

SubCategoryRouter.put("/:subCategory_Id", async (request: Request, response: Response) => {
    await SubCategoryController.updateSubCategory(request, response);
});


// @usage : delete Sub-Category Data
// @method : DELETE
// @params : subCategory_id
// @url : http://127.0.0.1:9499/sub-categorys/67b71c5ec0a8662150da78e2

SubCategoryRouter.put("/delete/:subCategoryId", async (request: Request, response: Response) => {
    await SubCategoryController.subCategoryStatus(request, response);
});

export default SubCategoryRouter;