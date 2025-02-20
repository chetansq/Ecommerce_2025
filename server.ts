import express, { Request, Response, Application, response } from "express"
import dotenv from "dotenv";
import mongoose from "mongoose";
import CategoryRouter from "./router/CategoryRouter";
import SubCategoryRouter from "./router/SubCategoryRouter";
dotenv.config({ path: "./.env" });

const hostName: string = "127.0.0.1";
const port: number | string | undefined = process.env.PORt || 9959;
const dbUrl: any = process.env.MONGO_DB_CLOUD_URL;
const dbName: string | undefined | null = process.env.MONGO_DB_DATABASE;

const app: Application = express();

// configure the router

app.use(express.json());
app.use("/categorys", CategoryRouter);
app.use("/sub-categorys", SubCategoryRouter);

app.get("/", (request: Request, response: Response) => {
    response.status(200).json({
        msg: "Welcome to express serever"
    });
});

if (port) {

    app.listen(Number(port), () => {

        if (dbUrl && dbName) {
            mongoose.connect(dbUrl, { dbName: dbName }).then((dbresponse) => {
                console.log('Connection Established...✅');

            }).catch((error: any) => {
                console.log(error);
                process.exit(0);

            })
        }
        console.log(`Express server started http://${hostName}:${port}`);
    });
}