import path from "path"
import JsonManager from "../../public/util/JsonManager"
import Product from "../../product/types/Product"

export default class RegisterModel {

    readonly fetchRegisters = async (): Promise<Product[]> => {
        const filePath = path.join(__dirname, '../../../database/products.json')
        const jsonManager = new JsonManager<Product>(filePath)
        const data = await jsonManager.read()
        if (!data) {
            throw new Error('No registers found')
        }
        return data
    }
    readonly createProduct = async (
        newProduct: Product
    ): Promise<Product> => {
        const products = await this.fetchRegisters()
        const lastProduct = products.at(-1)
        newProduct.id = lastProduct ? lastProduct.id + 1 : 1
        const filePath = path.join(__dirname, '../../../database/products.json')
        const jsonManager = new JsonManager<Product>(filePath)
        const isOK = await jsonManager.write(newProduct)
        if (!isOK) {
            throw new Error('Failed to create product')
        }
        return newProduct
    }
}