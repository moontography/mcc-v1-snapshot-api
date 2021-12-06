import http from "http";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import Balances from "./balances";
import config from "./config";
import Routes from "./routes";

const app = express();
const server = new http.Server(app);

export default async function startServer(portToListenOn = config.server.port) {
  return await new Promise(async (resolve, reject) => {
    try {
      app.disable("x-powered-by");

      // https://expressjs.com/en/guide/behind-proxies.html
      app.set("trust proxy", 1);
      app.use(cors());

      await Balances.getBalances();
      Routes(app);

      app.all("*", function fallbackRoute(req: Request, res: Response) {
        res.sendStatus(404);
      });

      app.use(function expressErrorHandler(
        err: Error,
        req: Request,
        res: Response,
        next: NextFunction
      ) {
        console.error("Express error handling", err);
        res.sendStatus(500);
      });

      server.listen(portToListenOn, () => {
        console.log(`listening on *:${portToListenOn}`);
        resolve(app);
      });
    } catch (err) {
      console.error("Error starting server", err);
      reject(err);
    }
  });
}
