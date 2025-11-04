import path from "path"
import JsonManager from "../../util/JsonManager"
import Product from "../types/Product"
import { IProductRepository } from "./IProductRepository"

export class ProductJsonRepository implements IProductRepository {
  private readonly jsonManager: JsonManager<Product>
  private products: Product[] = [] // Caché simple para evitar lecturas múltiples

  constructor() {
    const filePath = path.join(__dirname, '../../../database/products.json')
    this.jsonManager = new JsonManager<Product>(filePath)
  }

  // Carga los productos en la caché
  private async loadProducts(): Promise<void> {
    if (this.products.length === 0) {
      this.products = await this.jsonManager.read()
    }
  }

  async fetchAll(): Promise<Product[]> {
    await this.loadProducts()
    return this.products
  }

  async fetchById(id: number): Promise<Product | undefined> {
    await this.loadProducts()
    return this.products.find(p => p.id === id)
  }

  async create(newProduct: Product): Promise<boolean> {
    // Escribir en el archivo
    const isOk = await this.jsonManager.write(newProduct)
    if (isOk) {
      // Invalidar caché para que la próxima lectura incluya el nuevo producto
      this.products = [] 
    }
    return isOk
  }
}