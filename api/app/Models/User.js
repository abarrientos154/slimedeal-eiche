'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
  static get fillable() {
    return ['name', 'lastName', 'address', 'phone', 'email', 'portfolioAddress', 'titularName', 'bankAccount', 'bankName', 'accountType','additionalData']
  }
  static fieldValidationRules() {
    const rulesUser = {
      name: "required|string",
      lastName: 'required|string',
      address: 'required|string',
      phone: 'required|string',
      email: 'required|email',
      portfolioAddress:'required|string',
      titularName: 'required|string',
      bankAccount: 'required|string',
      bankName: 'required|string',
      accountType:'required|string',
      additionalData:'required|string'
    }
    return rulesUser
  }
  static boot() {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany('App/Models/Token')
  }
  // static get objectIDs () { return [ 'country_id','_id', 'city_id' ] }
}

module.exports = User
