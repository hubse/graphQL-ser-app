import ibmdb from "ibm_db";
import dotenv from "dotenv";

dotenv.config();

const connStr = `
  DATABASE=${process.env.DB_NAME};
  HOSTNAME=${process.env.DB_HOST};
  PORT=${process.env.DB_PORT};
  PROTOCOL=TCPIP;
  UID=${process.env.DB_USER};
  PWD=${process.env.DB_PASS};
`;

export function query(sql, params = []) {
  return new Promise((resolve, reject) => {
    ibmdb.open(connStr, (err, conn) => {
      if (err) return reject(err);

      conn.query(sql, params, (err, data) => {
        conn.close();
        if (err) return reject(err);
        resolve(data);
      });
    });
  });
}