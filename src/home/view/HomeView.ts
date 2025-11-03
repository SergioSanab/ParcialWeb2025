import { Request, Response } from 'express'

export default class HomeView {
  readonly notFound = (_req: Request, res: Response) => {
    res.status(200).render('home', { title: 'Home Page' })
  }
}
