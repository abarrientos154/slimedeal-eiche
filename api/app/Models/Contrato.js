'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Contrato extends Model {
  static get fillable() {
    return ['title', 'description', 'metodoPago', 'monto', 'name', 'email']
  }
  static fieldValidationRules() {
    const rulesUser = {
      title: "string",
      description: "string",
      metodoPago: "integer",
      monto: "integer",
      name: "string",
      email: "string"
    }
    return rulesUser
  }
  datos_userA () {
    return this.hasOne('App/Models/User', 'userA_id', '_id')
  }
  datos_userB () {
    return this.hasOne('App/Models/User', 'email', 'email')
  }
}

module.exports = Contrato
