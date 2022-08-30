import { Request, Response } from "express"

export const noRoute = (req: Request, res: Response) => {
    res.status(404).json({error: 'Route not found', path: `${req.url}`})
}
