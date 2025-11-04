import {promises as fs} from 'fs'

export default class JsonManager<T> {
    constructor(private readonly filePath: string) {}

    readonly read= async(): Promise<T[]> =>{
       const data = await fs.readFile(this.filePath, 'utf-8')
       return JSON.parse(data)
    }

    readonly write = async (jsonData: T): Promise<boolean> => {
        try {
            const existingData = await this.read()
            existingData.push(jsonData)
            await fs.writeFile(
                this.filePath,
                JSON.stringify(existingData, null, 2),
                'utf-8'
            )
            return true
        } catch (error) {
            console.error('Error writing to JSON file:', error)
            return false
        }
    }

    readonly update = async (partial: T): Promise<boolean> => {
        const data = await this.read()
        const updatedData = { ...data, ...partial }
        return this.write(updatedData)
    }

}

