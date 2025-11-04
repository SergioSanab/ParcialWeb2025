import express, { Application } from 'express'
import path from 'path'
import ProductRouter from './product/router/ProductRouter'
import ErrorRouter from './error/router/ErrorRouter'
import ContactRouter from './contact/router/ContactRouter'
import RegisterRouter from './register/Router/RegisterRouter'
import HomeRouter from './home/router/HomeRouter'
import ServerProvider from './provider/ServerProvider'


export class Server {

  private readonly app: Application

  constructor(
    private readonly env: ServerProvider,
    private readonly registerRouter: RegisterRouter,
    private readonly productRouter: ProductRouter,
    private readonly contactRouter: ContactRouter,
    private readonly errorRouter: ErrorRouter,
    private readonly homeRouter: HomeRouter,
  ) {
    this.app = express()
    this.configure()
    this.static()
    this.routes()
  }

  private readonly configure = (): void => {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.set('view engine', 'ejs')
    this.app.set('views', path.join(__dirname, './template'))
    
  }

  private readonly routes = (): void => {
    this.app.use('/home', this.homeRouter.router)
    this.app.use('/contacts', this.contactRouter.router)
    this.app.use('/products', this.productRouter.router)
    this.app.use('/registers', this.registerRouter.router)
    this.app.use('/{*any}', this.errorRouter.router)
  }

  private readonly static = (): void => {
    this.app.use('/assets', express.static(path.join(process.cwd(), 'assets')))
  }

  readonly start = (): void => {
    const port = this.env.PORT();
      this.app.listen(port, () => {
          console.log(`Server is running on http://${this.env.HOST()}:${port}`);
      });
  }
}

