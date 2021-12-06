import { Application, Request, Response } from "express";
import Balances from "../balances";

export default async function Main(app: any) {
  app.get("/status", async function status(_: Request, res: Response) {
    res.sendStatus(204);
  });

  app.get(
    "/balance/:addy",
    async function getAddyBalance(req: Request, res: Response) {
      const address = req.params.addy;

      const balances: any = await Balances.getBalances();
      res.send(balances[address.toLowerCase()] || "0");
    }
  );
}
