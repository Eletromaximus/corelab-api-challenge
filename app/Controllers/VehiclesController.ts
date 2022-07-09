import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { IVehicle } from 'App/Types/Vehicle'
import Database from '@ioc:Adonis/Lucid/Database'
import { IVehicleDTO } from 'App/Types/VehicleDTO'
import { randomUUID as uuid } from 'crypto'

export default class VehiclesController {
  public async index({ response }: HttpContextContract) {
    const vehicles = await Database.from('cars').select(
      'id',
      'name',
      'description',
      'plate',
      'isFavorite',
      'color',
      'year',
      'price'
    )

    return response.status(200).json(vehicles)
  }

  public async createVehicle(car: IVehicle): Promise<any> {
    const postId: any = await Database.table('cars')
      .insert({
        id: uuid(),
        name: car.name,
        description: car.description,
        plate: car.plate,
        isFavorite: car.isFavorite,
        year: car.year,
        color: car.color,
        price: car.price,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .returning('id')

    return postId
  }
}
