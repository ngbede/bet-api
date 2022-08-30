import { Request, Response, NextFunction } from "express";
import { sportyBetScapper } from "../scrapper/scrapper";

export const getBetSlip = async (req: Request, res: Response, next: NextFunction) => {
  const { code } = req.params
  const { provider } = req.query

  if (provider?.toString().toLowerCase() === "sportybet") {
    try {
      const data = await sportyBetScapper(code)
      return res.status(200).json(data)        
    } catch (error) {
      console.error(error)
      const err: ErrorObject = {message: 'Internal server error', code: 500, error: `${error}`}
      next(err)
    }
  }
  return res.status(404).json({message: 'Provider not supported'})
}
