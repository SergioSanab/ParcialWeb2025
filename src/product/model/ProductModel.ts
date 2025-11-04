import Product from '../types/Product'
import products from '../../../database/products.json'

export default class ProductModel {
  readonly fetchProducts = async (): Promise<Product[]> => {
    const data = products as Product[]
    if (!data) {
      throw new Error('No products found')
    }
    return data
  }

  readonly fetchProductById = async (id: number): Promise<Product | undefined> => {
  const allProducts = await this.fetchProducts()
  return allProducts.find(p => p.id === id)
}
  
}
