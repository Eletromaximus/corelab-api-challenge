import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateVehicleValidator {
  constructor(protected ctx: HttpContextContract) {
    this.ctx = ctx
  }

  private schema = schema.create({
    name: schema.string([rules.required(), rules.maxLength(20)]),
    id: schema.string([rules.uuid(), rules.required()]),
    description: schema.string([rules.required(), rules.maxLength(250)]),
    plate: schema.string([rules.required(), rules.maxLength(8), rules.minLength(8)]),
    isFavorite: schema.boolean([rules.required()]),
    year: schema.number([rules.required(), rules.minLength(4), rules.maxLength(4)]),
    color: schema.string([rules.required(), rules.maxLength(20)]),
    price: schema.string([rules.required(), rules.maxLength(20)]),
    createdAt: schema.string([rules.required(), rules.maxLength(20)]),
  })

  public validateVehicle() {
    const { request } = this.ctx
    const payload = request.validate({
      schema: this.schema,
    })

    return payload
  }

  public messages = {
    require: 'The {{ field }} is requered to create a new accounts',
  }
}
