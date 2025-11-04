import { Server } from "./Server"
import ContactRouter from "./contact/router/ContactRouter"
import ContactView from "./contact/view/ContactView"
import ErrorRouter from "./error/router/ErrorRouter"
import ErrorView from "./error/view/ErrorView"
import HomeRouter from "./home/router/HomeRouter"
import HomeView from "./home/view/HomeView"
import ProductModel from "./product/model/ProductModel"
import { IProductRepository } from "./product/repository/IProductRepository"
import { ProductJsonRepository } from "./product/repository/ProductJsonRepository"
import ProductRouter from "./product/router/ProductRouter"
import ProductView from "./product/view/ProductView"
import RegisterModel from "./register/model/RegisterModel"
import RegisterRouter from "./register/Router/RegisterRouter"
import RegisterView from "./register/view/RegisterView"
import ServerProvider from "./provider/ServerProvider"

export class AppFactory {
  
  createApp(): Server {
    
    const env = new ServerProvider()

    const productRepository: IProductRepository = new ProductJsonRepository()
    const productModel = new ProductModel(productRepository)
    const registerModel = new RegisterModel(productRepository)

    const homeView = new HomeView()
    const contactView = new ContactView()
    const errorView = new ErrorView()
    const productView = new ProductView(productModel)
    const registerView = new RegisterView(registerModel)

    const homeRouter = new HomeRouter(homeView)
    const productRouter = new ProductRouter(productView)
    const registerRouter = new RegisterRouter(registerView)
    const contactRouter = new ContactRouter(contactView)
    const errorRouter = new ErrorRouter(errorView)

    return new Server(
        env,
        registerRouter,
        productRouter,
        contactRouter,
        errorRouter,
        homeRouter
    )
  }
}
