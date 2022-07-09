import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { IVehicle } from 'App/Types/Vehicle'
import Database from '@ioc:Adonis/Lucid/Database'
import { IVehicleDTO } from 'App/Types/VehicleDTO'

export default class VehiclesController {
  public async index({ response }: HttpContextContract) {
    const vehicles: IVehicleDTO[] = [
      {
        id: 'dfasdfasdfas',
        name: 'First Vehicle',
        description: 'This is a description of first vehicle',
        plate: 'DDT-0012',
        isFavorite: false,
        year: 2018,
        color: '#ff00ff',
        price: 22000,
        createdAt: new Date(),
      },
    ]

    return response.status(200).json(vehicles)
  }

  public async createVehicle(car: IVehicle): Promise<any> {
    const postId: any = await Database.table('cars')
      .insert({
        name: car.name,
        description: car.description,
        plate: car.plate,
        isFavorite: car.isFavorite,
        year: car.year,
        color: car.color,
        price: car.price,
      })
      .returning('id')

    return postId
  }
}
