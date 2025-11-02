import { Router } from "express"
import RegisterView from "../view/RegisterView"

export default class RegisterRouter {
  
  router: Router

  constructor(private readonly registerView: RegisterView) {
    this.router = Router()
    this.routes()
  }

  readonly routes = () => {
    this.router.get('/v1.0/Register', this.registerView.registerForm)
    this.router.post('/v1.0/Register', this.registerView.createRegister)
  }

}
