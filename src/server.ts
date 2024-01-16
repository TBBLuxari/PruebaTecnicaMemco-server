import { app } from "./app";
import "./db"

const port = process.env.PORT || 3010;


app.listen(port, () =>  console.log(`Listening at http://localhost:${port}`));