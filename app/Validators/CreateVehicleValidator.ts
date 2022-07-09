import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export default class CreateVehicleValidator {
  public async validateVehicle({ request }: HttpContextContract) {
    const payload = await request.validate({
      schema: schema.create({
        name: schema.string([rules.required(), rules.maxLength(20)]),
        description: schema.string([rules.required(), rules.maxLength(250)]),
        plate: schema.string([rules.required(), rules.maxLength(8), rules.minLength(8)]),
        isFavorite: schema.boolean([rules.required()]),
        year: schema.number([rules.required(), rules.minLength(4), rules.maxLength(4)]),
        color: schema.string([rules.required(), rules.maxLength(20)]),
        price: schema.number([rules.required(), rules.maxLength(20)]),
      }),
    })

    return payload
  }

  public messages = {
    require: 'The {{ field }} is requered to create a new accounts',
  }
}
