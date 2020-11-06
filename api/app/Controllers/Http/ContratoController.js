'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Contrato = use("App/Models/Contrato")
const { validate } = use("Validator")
const Helpers = use('Helpers')
const mkdirp = use('mkdirp')
const Email = use("App/Functions/Email")
const User = use("App/Models/User")
const fs = require('fs')
var randomize = require('randomatic');

////////////////ESTATUS DEL CONTRATO/////////////////
/*
0 = Creado
1 = Revision una vez que ambas partes del contraton acepten
2 = Cuando el Administrador acepte. Queda en Vigente
3 = Rechazado por alguna de las partes.
*/

async function changeContractStatus (id, check, userA) {
  let contratoF = (await Contrato.find(id)).toJSON()
  //console.log(contratoF, 'asds')
  if (!check) {
    if (contratoF.hasOwnProperty('userACheck') && !userA || contratoF.hasOwnProperty('userBCheck') && userA) {
      console.log('1')
      let contrato = await Contrato.query().where({_id: id}).update({status: 3})
      /* contratoF.status = 3
      await contratoF.save()
      return contratoF */
    }
  } else {
    console.log('2')
    if (contratoF.hasOwnProperty('userACheck') && contratoF.hasOwnProperty('userBCheck')) {
      console.log('3')
      let contrato = await Contrato.query().where({_id: id}).update({
        status: contratoF.userACheck && contratoF.userBCheck ? 1 : 3
      })

      /* contratoF.status = contratoF.userACheck && contratoF.userBCheck ? 1 : 3
      await contratoF.save() */
      return contratoF
    }
  }
  return contratoF
}

class ContratoController {

  async index ({ request, response, view }) {
    //let contrato = await Contrato.query().where({_id: '5fa41a1161ae823c0ba5a80d'}).update({status: 3})
    changeContractStatus('5fa41a1161ae823c0ba5a80d', false, false)
    response.send('ho')
  }
  async getContractsByPending ({ request, response, auth }) {
    const user = (await auth.getUser()).toJSON()
    let contratoPendientes = (await Contrato.where({
      $or: [{ userA_id: user._id }, { email: user.email }]
    }).fetch()).toJSON()
    response.send(contratoPendientes)
  }

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
          name: codeFile + '.' + profilePic.extname,
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
        dat.archiveName = data.name
        dat.filePath = nombreArchivo
        dat.userA_id = user._id
        dat.status = 0 // pendiente pero sin confirmar por ningun usuario
        // Email.sendMail(user.email, 'Nuevo Contrato', `el usuario ${user.name} ${user.lastName} te ha agregado a formar parte de un contrato`)
        await Contrato.create(dat)
      }
      return data
    }
  }

  async pruebaCorreo ({ request, response, auth }) {
    let algo = await Email.sendMail('haideemartinez96@gmail.com', 'Nuevo Contrato', `el usuario Test te ha agregado a formar parte de un contrato`)
    console.log(algo, 'algo')
    response.send(algo)
  }


  async updateCheck ({ params, request, response, auth }) {
    let contratoF = await Contrato.find(params.id)
    let codeFile = randomize('Aa0', 30)
    const user = (await auth.getUser()).toJSON()
    const profilePic = request.file('files', {
      size: '100mb'
    })
    var dat = request.only(['dat'])
    dat = JSON.parse(dat.dat)

    if (Helpers.appRoot('storage/uploads/contracts')) {
      await profilePic.move(Helpers.appRoot('storage/uploads/contracts'), {
        name: codeFile + '-' + contratoF._id.toString() + '.' + profilePic.extname,
        overwrite: true
      })
    } else {
      mkdirp.sync(`${__dirname}/storage/Excel`)
    }
    let data = { name: profilePic.fileName }
    if (user._id === contratoF.userA_id) {
      var contrato = await Contrato.query().where({_id: params.id }).update({
        userAFile: `storage/uploads/contracts/${data.name}`,
        userACheck: dat.check
      })

    } else {
      var contrato = await Contrato.query().where({_id: params.id }).update({
        userBFile: `storage/uploads/contracts/${data.name}`,
        userBCheck: dat.check
      })
    }
    let userA = user._id === contratoF.userA_id ? true : false
    await changeContractStatus(params.id, dat.check, userA)
    response.send(contrato)
  }

  async updateCheckAlone ({ params, request, response, auth }) {
    let contratoF = await Contrato.find(params.id)
    const user = (await auth.getUser()).toJSON()
    var dat = request.only(['check'])
    if (user._id === contratoF.userA_id) {
      var contrato = await Contrato.query().where({_id: params.id }).update({
        userACheck: dat.check
      })
    } else {
      var contrato = await Contrato.query().where({_id: params.id }).update({
        userBCheck: dat.check
      })
    }
    let userA = user._id === contratoF.userA_id ? true : false
    await changeContractStatus(params.id, dat.check, userA)
    response.send(contrato)
  }

  async updateStatus ({ params, request, response, auth }) {
    let contratoF = await Contrato.find(params.id)
    let body = request.only(['status'])
    contratoF.status = Number(body.status)
    await contratoF.save()
    response.send(contratoF)
  }

  async getContractByStatus ({ request, response, auth, params }) {
    let contratos = (await Contrato.query().where({status: Number(params.status)}).fetch()).toJSON()
    response.send(contratos)
  }


}

module.exports = ContratoController
