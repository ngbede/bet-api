import { Request, Response } from "express"

const errorHandle = (error: ErrorObject, req: Request,res: Response) => {
  return res.status(error.code).json(error)
}

export default errorHandle
