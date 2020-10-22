'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Cotisation extends Model {
  datos_proveedor () {
    return this.hasOne('App/Models/User', 'proveedor_id', '_id')
  }
  datos_proveedor_detalles () {
    return this.hasOne('App/Models/Proveedor', 'proveedor_id', 'id_usuario_proveedor')
  }
  datos_cliente () {
    return this.hasOne('App/Models/User', 'cliente_id', '_id')
  }
}

module.exports = Cotisation
