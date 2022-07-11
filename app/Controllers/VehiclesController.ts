import { IVehicle } from 'App/Types/Vehicle'
import Database from '@ioc:Adonis/Lucid/Database'
import { randomUUID as uuid } from 'crypto'

export default class VehiclesController {
  public async index(page: number) {
    const _limit = 15
    const vehicles = await Database.from('cars').paginate(page, _limit)

    return vehicles.toJSON()
  }

  public async createVehicle(car: IVehicle): Promise<any> {
    const postId: any = await Database.table('cars')
      .insert({
        id: uuid(),
        name: car.name,
        description: car.description,
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

  public async findVehicle(id: string) {
    const car = await Database.from('cars').where('id', String(id))

    return car
  }
}
