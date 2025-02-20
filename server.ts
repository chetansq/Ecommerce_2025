import express, { Request, Response, Application, response } from "express"

const hostName: string = "127.0.0.1";
const port: number | string | undefined = 9959;

const app: Application = express();

app.get("/", (request: Request, response: Response) => {
    response.status(200).json({
        msg: "Welcome to express serever"
    });
});

app.listen(port, hostName, () => {
    response.status(200);

    console.log(`Express server started http://${hostName}:${port}`);

});