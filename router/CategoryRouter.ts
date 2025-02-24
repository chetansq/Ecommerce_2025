import { Request, Response, Router } from "express";
import * as CategoryController from "../controller/CategoryController"
import { body } from "express-validator";

const CategoryRouter: Router = Router();

// @usage : get All Category
// @method : GET
// @params : no-params
// @url : http://127.0.0.1:9499/categorys

CategoryRouter.get("/", async (request: Request, response: Response) => {
    await CategoryController.getAllCategory(request, response);
});

// @usage : Create Category
// @method : POST
// @params : category_name, category_description, category_logo, isActive 
// @url : http://127.0.0.1:9499/categorys

CategoryRouter.post("/",
    // [body('category_name').not().isEmpty().withMessage('Category name is required')],
    // [body('category_description').not().isEmpty().withMessage('Category description is required')],
    // [body('category_logo').not().isEmpty().withMessage('Category logo is required')],

    async (request: Request, response: Response) => {
        await CategoryController.cretaeCategory(request, response);
    });

// @usage : Get CategoryId
// @method : GET
// @params : categoryId 
// @url : http://127.0.0.1:9499/categorys/67b6ff0f502f706800091aee

CategoryRouter.get("/:categoryId", async (request: Request, response: Response) => {
    await CategoryController.getCategoryId(request, response);
});


// @usage : update Category
// @method : PUT
// @params : categoryId ,category_name, category_description, category_logo, isActive 
// @url : http://127.0.0.1:9499/categorys/67b6ff0f502f706800091aee

CategoryRouter.put("/:categoryId", async (request: Request, response: Response) => {
    await CategoryController.updateCategory(request, response);
});

// @usage : Delete Category
// @method : DELETE
// @params : categoryId
// @url : http://127.0.0.1:9499/categorys/67b6ff0f502f706800091aee

CategoryRouter.put("/delete/:categoryId", async (request: Request, response: Response) => {
    await CategoryController.categoryStatus(request, response);
});

export default CategoryRouter;