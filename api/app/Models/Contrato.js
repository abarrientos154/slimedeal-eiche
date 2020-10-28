'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Contrato extends Model {
  static get fillable() {
    return ['title', 'description', 'metodoPago', 'name', 'email']
  }
  static fieldValidationRules() {
    const rulesUser = {
      title: "string",
      description: "string",
      metodoPago: "integer",
      name: "string",
      email: "string"
    }
    return rulesUser
  }
}

module.exports = Contrato
