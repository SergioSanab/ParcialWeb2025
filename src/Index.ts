import { AppFactory } from "./AppFactory"

const factory = new AppFactory()

const app = factory.createApp()

app.start()
