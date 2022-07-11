import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export default class CreateVehicleValidator {
  public async validateVehicle({ request }: HttpContextContract) {
    const payload = await request.validate({
      schema: schema.create({
        name: schema.string([rules.required()]),
        description: schema.string([rules.required()]),
        isFavorite: schema.boolean([rules.required()]),
        year: schema.number([rules.required()]),
        color: schema.string([rules.required()]),
        price: schema.number([rules.required()]),
      }),

      messages: this.messages,
    })

    return payload
  }

  public messages: CustomMessages = {
    required: 'The {{ field }} is required to create a new car',
  }
}
