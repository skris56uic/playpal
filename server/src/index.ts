import express, { Express, Response } from "express";

const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', (_, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});