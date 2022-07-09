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
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

const vehiclesController = new VehiclesController()

Route.get('/vehicles', async (ctx: HttpContextContract) => {
  await vehiclesController.index(ctx)
})

Route.post('/vehicle', async (ctx: HttpContextContract) => {
  try {
    const payload = await ctx.request.validate({
      schema: schema.create({
        name: schema.string([rules.required(), rules.maxLength(20)]),
        description: schema.string([rules.required(), rules.maxLength(250)]),
        plate: schema.string([rules.required(), rules.maxLength(8), rules.minLength(8)]),
        isFavorite: schema.boolean([rules.required()]),
        year: schema.number([rules.required()]),
        color: schema.string([rules.required(), rules.maxLength(20)]),
        price: schema.number([rules.required()]),
      }),
    })

    const id = await vehiclesController.createVehicle(payload)

    return ctx.response.status(200).json(id)
  } catch (error: any) {
    console.log(error)
    ctx.response.badRequest(error.messages)
  }
})
