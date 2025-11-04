import express, { Application } from 'express'
import path from 'path'
import ProductRouter from './product/router/ProductRouter'
import ProductView from './product/view/ProductView'
import ProductModel from './product/model/ProductModel'
import ErrorRouter from './error/router/ErrorRouter'
import ErrorView from './error/view/ErrorView'
import ContactRouter from './contact/router/ContactRouter'
import ContactView from './contact/view/ContactView'
import RegisterRouter from './register/Router/RegisterRouter'
import RegisterView from './register/view/RegisterView'
import RegisterModel from './register/model/RegisterModel'
import HomeView from './home/view/HomeView'
import HomeRouter from './home/router/HomeRouter'


export default class Server {
  private readonly app: Application

  constructor(
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
    this.app.use('/assets', express.static(path.join(process.cwd(), 'assets')))
  }

  private readonly routes = (): void => {
    this.app.use('/home', this.homeRouter.router)
    this.app.use('/contacts', this.contactRouter.router)
    this.app.use('/products', this.productRouter.router)
    this.app.use('/registers', this.registerRouter.router)
    this.app.use('/{*any}', this.errorRouter.router)
    

    
  }

  private readonly static = (): void => {
    this.app.use(express.static(path.join(__dirname, './public')))
  }

  readonly start = (): void => {
    const port = 1888
    const host = 'localhost'
    this.app.listen(port, () => {
      console.log(`Server is running on http://${host}:${port}`)
    })
  }
}

const server = new Server(
  new RegisterRouter(new RegisterView(new RegisterModel())),
  new ProductRouter(new ProductView(new ProductModel())),
  new ContactRouter(new ContactView()),
  new ErrorRouter(new ErrorView()),
  new HomeRouter(new HomeView())
)

server.start()
