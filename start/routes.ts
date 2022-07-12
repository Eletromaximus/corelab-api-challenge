/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import VehiclesController from 'App/Controllers/VehiclesController'
import CreateVehicleValidator from 'App/Validators/CreateVehicleValidator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

const vehiclesController = new VehiclesController()
const createVehicleValidator = new CreateVehicleValidator()

Route.get('/vehicles', async (ctx: HttpContextContract) => {
  const { page } = ctx.request.qs()
  console.log(page)
  const vehicles = await vehiclesController.index(Number(page) || 1)
  return ctx.response.status(200).json(vehicles)
})

Route.get('/vehicle/:id', async (ctx: HttpContextContract) => {
  const id = ctx.request.param('id')
  const car = await vehiclesController.findVehicle(id || 1)

  return car
})

Route.post('/vehicle', async (ctx: HttpContextContract) => {
  try {
    const payload = await createVehicleValidator.validateVehicle(ctx)

    const id = await vehiclesController.createVehicle(payload)

    return ctx.response.status(200).json(id)
  } catch (error: any) {
    console.log(error)
    ctx.response.badRequest(error.messages)
  }
})
