import { Application } from "express";
import main from "./main";

export default async function Routes(app: Application) {
  main(app);
}
