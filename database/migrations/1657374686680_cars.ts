import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { randomUUID as v4 } from 'node:crypto'

export default class extends BaseSchema {
  protected tableName = 'cars'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(v4()).notNullable()
      table.string('name')
      table.string('description')
      table.string('plate')
      table.boolean('isFavorite')
      table.integer('year')
      table.string('color')
      table.float('price')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
