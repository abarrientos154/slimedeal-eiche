'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Contrato = use("App/Models/Contrato")
const { validate } = use("Validator")
const Helpers = use('Helpers')
const mkdirp = use('mkdirp')
const User = use("App/Models/User")
const fs = require('fs')
var randomize = require('randomatic');
/**
 * Resourceful controller for interacting with contratoes
 */
class ContratoController {
  /**
   * Show a list of all contratoes.
   * GET contratoes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }
  async getContractsByPending ({ request, response, auth }) {
    const user = (await auth.getUser()).toJSON()
    let contratoPendientes = (await Contrato.where({
      $or: [{ userA_id: user._id }, { email: user.email }]
    }).fetch()).toJSON()
    response.send(contratoPendientes)
  }

  /**
   * Render a form to be used for creating a new contrato.
   * GET contratoes/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new contrato.
   * POST contratoes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const user = (await auth.getUser()).toJSON()
    let codeFile = randomize('Aa0', 30)
    const profilePic = request.file('files', {
      size: '100mb'
    })
    var dat = request.only(['dat'])
    dat = JSON.parse(dat.dat)
    const validation = await validate(dat, Contrato.fieldValidationRules())
    if (validation.fails()) {
      response.unprocessableEntity(validation.messages())
    } else {
      if (Helpers.appRoot('storage/uploads/contracts')) {
        await profilePic.move(Helpers.appRoot('storage/uploads/contracts'), {
          name: codeFile,
          overwrite: true
        })
      } else {
        mkdirp.sync(`${__dirname}/storage/Excel`)
      }
      const data = { name: profilePic.fileName }
      if (!profilePic.moved()) {
        return profilePic.error()
      } else {
        let nombreArchivo = 'storage/uploads/contracts/' + data.name
        dat.archiveName = data.name + '.' + profilePic.extname
        dat.filePath = nombreArchivo + '.' + profilePic.extname
        dat.userA_id = user._id
        dat.status = 0 // pendiente pero sin confirmar por ningun usuario
        await Contrato.create(dat)
      }
      return data
    }
  }


  /**
   * Display a single contrato.
   * GET contratoes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response }) {
    let contrato = await Contrato.find(params.id)
    response.send(contrato)
  }

  /**
   * Render a form to update an existing contrato.
   * GET contratoes/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update contrato details.
   * PUT or PATCH contratoes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  async updateCheck ({ params, request, response, auth }) {
    let contratoF = await Contrato.find(params.id)
    const user = (await auth.getUser()).toJSON()
    const profilePic = request.file('files', {
      size: '100mb'
    })
    var dat = request.only(['dat'])
    dat = JSON.parse(dat.dat)
    let name = user._id === contratoF.userA_id ? 'userA' : 'userB'
    if (Helpers.appRoot('storage/uploads/contracts')) {
      await profilePic.move(Helpers.appRoot('storage/uploads/contracts'), {
        name: name + '-' + user._id + '-' + contrato._id.toString(),
        overwrite: true
      })
    } else {
      mkdirp.sync(`${__dirname}/storage/Excel`)
    }
    let data = { name: profilePic.fileName }
    if (user._id === contratoF.userA_id) {
      var contrato = await Contrato.query().where({_id: params.id }).update({
        userAFile: `storage/uploads/contracts/${data.name}.${profilePic.extname}`,
        userACheck: dat.check
      })
    } else {
      var contrato = await Contrato.query().where({_id: params.id }).update({
        userBFile: `storage/uploads/contracts/${data.name}.${profilePic.extname}`,
        userBCheck: dat.check
      })
    }
    response.send(contrato)

    /* if (contrato.metodoPago === 1) { //Si paga el usuario A
      const profilePic = request.file('files', {
        size: '100mb'
      })
      var dat = request.only(['dat'])
      dat = JSON.parse(dat.dat)
      if (Helpers.appRoot('storage/uploads/contracts')) {
        await profilePic.move(Helpers.appRoot('storage/uploads/contracts'), {
          name: 'userA-' + user._id + '-' + contrato._id.toString(),
          overwrite: true
        })
      } else {
        mkdirp.sync(`${__dirname}/storage/Excel`)
      }
      let data = { name: profilePic.fileName }
      const contrato = await Contrato.query().where({_id: params.id }).update({
        userAFile: `storage/uploads/contracts/${data.name}.${profilePic.extname}`,
        userACheck: dat.check
      })
    } else if (contrato.metodoPago === 2) { // si paga el usuario B
      const profilePic = request.file('files', {
        size: '100mb'
      })
      var dat = request.only(['dat'])
      dat = JSON.parse(dat.dat)
      if (Helpers.appRoot('storage/uploads/contracts')) {
        await profilePic.move(Helpers.appRoot('storage/uploads/contracts'), {
          name: 'userB-' + user._id + '-' + contrato._id.toString(),
          overwrite: true
        })
      } else {
        mkdirp.sync(`${__dirname}/storage/Excel`)
      }
      let data = { name: profilePic.fileName }
      const contrato = await Contrato.query().where({_id: params.id }).update({
        userAFile: `storage/uploads/contracts/${data.name}.${profilePic.extname}`,
        userBCheck: dat.check
      })
    } else if (contrato.metodoPago === 3) {
      const profilePic = request.file('files', {
        size: '100mb'
      })
      var dat = request.only(['dat'])
      dat = JSON.parse(dat.dat)
      if (Helpers.appRoot('storage/uploads/contracts')) {
        await profilePic.move(Helpers.appRoot('storage/uploads/contracts'), {
          name: 'userB-' + user._id + '-' + contrato._id.toString(),
          overwrite: true
        })
      } else {
        mkdirp.sync(`${__dirname}/storage/Excel`)
      }
      let data = { name: profilePic.fileName }
      const contrato = await Contrato.query().where({_id: params.id }).update({
        userAFile: `storage/uploads/contracts/${data.name}.${profilePic.extname}`,
        userACheck: dat.check
      })
    } */
  }

  /**
   * Delete a contrato with id.
   * DELETE contratoes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ContratoController
