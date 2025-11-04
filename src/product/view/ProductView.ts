import { Request, Response } from 'express'
import ProductModel from '../model/ProductModel'

export default class ProductView {
  constructor(private readonly productModel: ProductModel) {}

  readonly getProductList = async (req: Request, res: Response) => {
    try {
      const currentPage = parseInt(req.query['page'] as string, 10) || 1
      
      const projectsPerPage = 6

      const { products, currentPage: page, totalPages } = 
        await this.productModel.fetchPaginatedProducts(
          currentPage,
          projectsPerPage
        )

      res.status(200).render('components/products', {
        products,
        currentPage: page,
        totalPages
      })

    } catch (error) {
      console.error(error)
      res.status(500).render('pages/error')
    }
  }

  readonly getProductDetail = async (req: Request, res: Response) => {
    try {
      const idParam = req.params['id']
      if (!idParam) {
        return res.status(400).render('pages/error')
      }
      const id = Number.parseInt(idParam, 10)
      if (Number.isNaN(id)) {
        return res.status(400).render('pages/error')
      }

      const product = await this.productModel.fetchProductById(id)

      if (!product) {
        return res.status(404).render('pages/details', { product: undefined })
      }

      res.status(200).render('pages/details', { product })
    } catch (error) {
      console.error(error)
      res.status(500).render('pages/error')
    }
  }

  readonly searchProducts = async (req: Request, res: Response) => {
    try {
      const query = (req.query['q'] as string) || ''
      const products = await this.productModel.searchProductsByName(query)
      res.status(200).render('components/searcher', {
        products,
        query 
      })
    } catch (error) {
      console.error(error)
      res.status(500).render('pages/error')
    }
  }
  
}
