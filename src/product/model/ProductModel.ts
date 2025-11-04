import Product from '../types/Product'
import { IProductRepository } from '../repository/IProductRepository'

type PaginatedProducts = {
  products: Product[],
  currentPage: number,
  totalPages: number
}

export default class ProductModel {
  constructor(private readonly productRepository: IProductRepository) {}

  readonly fetchPaginatedProducts = async (
    page: number,
    limit: number
  ): Promise<PaginatedProducts> => {
    const allProducts = await this.productRepository.fetchAll()

    const totalPages = Math.ceil(allProducts.length / limit)
    const offset = (page - 1) * limit
    const products = allProducts.slice(offset, offset + limit)

    return {
      products,
      currentPage: page,
      totalPages
    }
  }

  /**
   * Lógica de negocio para buscar por ID
   */
  readonly fetchProductById = async (
    id: number
  ): Promise<Product | undefined> => {
    // Simplemente delega al repositorio
    return this.productRepository.fetchById(id)
  }

  /**
   * Lógica de negocio para buscar por nombre
   */
  readonly searchProductsByName = async (
    query: string
  ): Promise<Product[]> => {
    // 1. Obtiene TODOS los productos
    const allProducts = await this.productRepository.fetchAll()
    
    if (!query) {
      return [] // No devuelve nada si la búsqueda está vacía
    }

    // 2. Lógica de filtrado
    const lowerCaseQuery = query.toLowerCase()
    return allProducts.filter(product =>
      product.title.toLowerCase().includes(lowerCaseQuery) ||
      product.docente.toLowerCase().includes(lowerCaseQuery) ||
      product.curso.toLowerCase().includes(lowerCaseQuery) ||
      product.description.toLowerCase().includes(lowerCaseQuery) ||
      product.expositores.toLowerCase().includes(lowerCaseQuery)
    )
  }

}
