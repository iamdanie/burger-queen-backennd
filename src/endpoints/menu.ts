import { Request, Response } from 'express'
import { MenuDao } from '../dao'

export async function listMenu(req: Request, res: Response) {
  try {
    const menuItems = await MenuDao.findAll()

    return res.status(200).json(menuItems)
  }
  catch (error) {
    return res.status(500).json({ error: error.response || error })
  }
}
