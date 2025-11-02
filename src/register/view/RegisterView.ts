import { Request, Response } from 'express'
import RegisterModel from '../model/RegisterModel'
import Product from '../../product/types/Product'

export default class RegisterView {
  constructor(private readonly registerModel: RegisterModel) {}

  readonly registerForm = async (_req: Request, res: Response) => {
    res.status(200).render('register', { })
  }

  readonly createRegister = async (
       req: Request,
       res: Response
   ): Promise<void> => {
       const newProduct = req.body as Product;
       if (!newProduct) {
           res.status(400).json({ message: "Product data is missing" });
           return;
       }
       const createdProduct = await this.registerModel.createProduct(newProduct);
       if (!createdProduct) {
           res.status(500).json({ message: "Failed to create product" });
           return;
       }
       res.status(201).json(createdProduct);
   }
  
}
