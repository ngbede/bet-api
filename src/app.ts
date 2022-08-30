import express  from "express"
import bodyParser from "body-parser"
import helmet from "helmet"
import morgan from "morgan"
import cors from "cors"
import betSlipRouter from "./routes/bet-slip-route"
import { noRoute } from "./middleware/no-route"
import errorHandle from "./middleware/error-handle"
require('dotenv/config')


const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use(helmet())
app.use(morgan("combined"))
app.options("*", cors)

app.use("/betpro", betSlipRouter)
app.use(noRoute)
app.use(errorHandle)

app.listen(process.env.PORT, () => {
  console.log(`Running on port ${process.env.PORT}`)
})
