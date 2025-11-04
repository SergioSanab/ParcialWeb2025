import Product from '../types/Product'
import products from '../../../database/products.json'

type PaginatedProducts = {
  products: Product[],
  currentPage: number,
  totalPages: number
}

export default class ProductModel {

  private readonly fetchAllProducts = async (): Promise<Product[]> => {
    const data = products as Product[]
    if (!data) {
      throw new Error('No products found in JSON')
    }
    return data
  }

  readonly fetchPaginatedProducts = async (page: number, limit: number): Promise<PaginatedProducts> => {

    const allProducts = products as Product[]
    if (!allProducts) {
      throw new Error('No products found')
    }

    const totalProducts = allProducts.length
    const totalPages = Math.ceil(totalProducts / limit) 

    if (page < 1) {
      page = 1
    }
    if (page > totalPages && totalPages > 0) {
      page = totalPages
    }
    if (totalPages === 0) {
      page = 1; 
    }
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const paginatedProducts = allProducts.slice(startIndex, endIndex)
    return {
      products: paginatedProducts,
      currentPage: page,
      totalPages: totalPages
    }
  }

  readonly fetchProductById = async (id: number): Promise<Product | undefined> => {
    const allProducts = products as Product[]
    if (!allProducts) {
      throw new Error('No products found')
    }
    return allProducts.find(p => p.id === id)
  }

  readonly searchProductsByName = async (
    query: string
  ): Promise<Product[]> => {
    if (!query) {
      return []
    }
    const allProducts = await this.fetchAllProducts()
    const normalizedQuery = query.toLowerCase()

    return allProducts.filter((product) => {
      const titleMatch = product.title.toLowerCase().includes(normalizedQuery)
      const teacherMatch = product.docente.toLowerCase().includes(normalizedQuery)
      const courseMatch = product.curso.toLowerCase().includes(normalizedQuery)
      const contentMatch = product.description.toLowerCase().includes(normalizedQuery)
      const studentMatch = product.expositores.toLowerCase().includes(normalizedQuery)

      return titleMatch || teacherMatch || courseMatch || contentMatch || studentMatch
    }).sort((a, b) => b.id - a.id)
  }

}
