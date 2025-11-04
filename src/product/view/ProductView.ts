import { Request, Response } from 'express'
import ProductModel from '../model/ProductModel'

export default class ProductView {
  constructor(private readonly productModel: ProductModel) {}

  readonly getProductList = async (_req: Request, res: Response) => {
    const products = await this.productModel.fetchProducts()
    res.status(200).render('products', { products })
  }

  readonly getProductDetail = async (req: Request, res: Response) => {
  try {
    const idParam = req.params['id']
    if (!idParam) {
      return res.status(400).render('error')
    }
    const id = Number.parseInt(idParam, 10)
    if (Number.isNaN(id)) {
      return res.status(400).render('error')
    }

    const product = await this.productModel.fetchProductById(id)
    
    if (!product) {
      return res.status(404).render('details', { product: undefined })
    }
    
    res.status(200).render('details', { product })
  } 
  catch (error) {
    console.error(error)
    res.status(500).render('error')
  }
}
  
}
