import Product from "../types/Product"

export interface IProductRepository {
  fetchAll(): Promise<Product[]>
  fetchById(id: number): Promise<Product | undefined>
  create(newProduct: Product): Promise<boolean>
}