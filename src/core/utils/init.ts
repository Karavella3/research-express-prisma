import express from 'express';
import dotenv from 'dotenv';

const init = () => {
  dotenv.config();

  // @ts-ignore
  BigInt.prototype.toJSON = function () {
    const int = Number.parseInt(this.toString());
    return int ?? this.toString();
  };

  const app = express();
  const port = process.env.PORT ?? 3000;

  app.use(express.json());

  app.listen(port, () => {
    console.log(`[server]: Server is running at port: ${port}`);
  });

  return {
    app,
    port,
  };
};

export default init;
