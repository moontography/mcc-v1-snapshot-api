import fs from "fs";
import path from "path";
import { parse } from "csv-parse";

export default {
  balances: {},

  getBalances(reset = false) {
    const self = this as any;
    return new Promise((resolve, reject) => {
      if (Object.keys(self.balances).length > 0 && !reset)
        return resolve(self.balances);
      const parser = parse(
        { columns: true },
        function (err: any, records: any[]) {
          if (err) return reject(err);
          resolve(
            (self.balances = records.reduce(
              (o, rec) => ({ ...o, [rec.Address.toLowerCase()]: rec.Balance }),
              {}
            ))
          );
        }
      );
      fs.createReadStream(path.join(`${__dirname}`, "..", "13711700.csv")).pipe(
        parser
      );
    });
  },
};
