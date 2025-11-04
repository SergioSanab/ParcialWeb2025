import Product from "../../product/types/Product"
import { IProductRepository } from "../../product/repository/IProductRepository"

export default class RegisterModel {

    constructor(private readonly productRepository: IProductRepository) {}

  readonly createProduct = async (
    newProductData: Product
  ): Promise<Product> => {
    
    // 1. Lógica de negocio: Calcular el nuevo ID
    const products = await this.productRepository.fetchAll()
    const lastProduct = products.at(-1)
    const newId = lastProduct ? lastProduct.id + 1 : 1
    
    const newProductWithId = { ...newProductData, id: newId }

    const isOK = await this.productRepository.create(newProductWithId)
    if (!isOK) {
      throw new Error('Falló la escritura en la base de datos')
    }
    return newProductWithId
  }
}