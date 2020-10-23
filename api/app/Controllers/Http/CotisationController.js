'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with cotisations
 */

const Cotisation = use("App/Models/Cotisation")
const Chat = use("App/Models/Chat")
const ChatMessage = use("App/Models/ChatMessage")
const Event = use("App/Models/Event")
const moment = require('moment')

/*
  //////////////////////Leyenda del campo status para las cotizaciones///////////
  0 = En proceso con chat activo
  1 = Cotizado y a la espera para que el cliente apruebe o rechaze la cotizacion, aqui ya no se pueden enviar msj ni volver a cotizar
  2 = Aprobado por el cliente y en espera para pagar
  3 = Rechazado por el Cliente
  4 = Pagado por el cliente y a la espera de la fecha final del evento
  5 = Evento Finalizado o Cotizacion Finalizada
*/

class CotisationController {
  /**
   * Show a list of all cotisations.
   * GET cotisations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new cotisation.
   * GET cotisations/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new cotisation.
   * POST cotisations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, params, auth }) {
    const id_user = ((await auth.getUser()).toJSON())._id
    let body = {
      cliente_id: id_user,
      proveedor_id: params.id_proveedor
    }
    let cotizacion = await Cotisation.create(body)
    body = {}
    body.cotizacion_id = (cotizacion._id).toString()
    await Chat.create(body)
    response.send(cotizacion)
  }

  /**
   * Display a single cotisation.
   * GET cotisations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async showAllInfoCotisation ({ params, response, auth }) {
    const user = (await auth.getUser()).toJSON()
    const id_user = user._id
    let cotisation = (await Cotisation.query().where('_id',params.id_cotisation).with('datos_proveedor').with('datos_cliente').with('datos_proveedor_detalles').first()).toJSON()
    let update_visto = (await ChatMessage.query().where({cotisazion_id: params.id_cotisation, user_id: user.roles[0] === 2 ? cotisation.proveedor_id : cotisation.cliente_id }).update({visto: true})).toJSON()
    let send = {
      datos_proveedor: cotisation.datos_proveedor,
      datos_cliente: cotisation.datos_cliente,
      messages: [],
      status: cotisation.status ? cotisation.status : 0
    }
    send.datos_proveedor.detalles = cotisation.datos_proveedor_detalles
    let messages = (await ChatMessage.where({cotisazion_id: params.id_cotisation}).with('datos_user').fetch()).toJSON()
    send.messages = messages
    send.messages = messages.map(v => {
      return {
        send: id_user === v.user_id ? true : false,
        message: v.message,
        stamp: moment(v.created_at).lang('es').calendar(),
        full_name: v.datos_user.full_name
      }
    })
    response.send(send)
  }

  async getChat ({ params, response, auth }) {
    const user = (await auth.getUser()).toJSON()
    let cotisations = (await Cotisation.where({
      $or: [{ cliente_id: user._id }, { proveedor_id: user._id }]
    }).with('datos_proveedor').with('datos_cliente').fetch()).toJSON()
    for (let j in cotisations) {
      var messages = await ChatMessage.where({cotisazion_id: cotisations[j]._id}).sort({created_at: -1}).limit(1).first()
      if (messages) {
        cotisations[j].last_message = messages.message
        cotisations[j].created_at_message = messages.created_at
        cotisations[j].visto = user._id === messages.user_id ? true : messages.visto
      }
    }
    let format_cotisations = cotisations.map(v => {
      if (messages) {
        return {
          _id: v._id,
          full_name: user.roles[0] === 3 ? v.datos_cliente.full_name : v.datos_proveedor.full_name,
          last_message: v.last_message,
          created_at_message: moment(v.created_at_message).lang('es').calendar(),
          visto: v.visto,
          status: v.status ? v.status : 0
        }
      } else {
        return {
          _id: v._id,
          full_name: user.roles[0] === 3 ? v.datos_cliente.full_name : v.datos_proveedor.full_name,
          last_message: 'Escribe un mensaje',
          created_at_message: moment().format('DD/MM/YYYY'),
          visto: true,
          status: v.status ? v.status : 0
        }
      }
    })
    response.send(format_cotisations)
  }


  async addDetailServices ({ params, request, response }) {
    let body = request.only(['detallesServicios', 'total'])
    body.status = 1 // Pendiente por Aprobar para el Cliente
    await Cotisation.query().where({_id: params.id_cotisation}).update(body)
    response.send(body)
  }

  async showDetailServiceById ({ params, request, response, auth }) {
    let cotisation = await Cotisation.find(params.id_cotisation)
    let services = cotisation.detallesServicios.find(v => v.id === params.id_service)
    response.send(services)
  }

  async getCotisationInStatus ({ params, request, response, auth }) {
    const user = (await auth.getUser()).toJSON()
    let cotisations = (await Cotisation.where({
      $or: [{ cliente_id: user._id }, { proveedor_id: user._id }],
      status: 1
    }).with('datos_proveedor').with('datos_cliente').fetch()).toJSON()
    // var total = 0
    console.log(user, 'user')
    // var total = 0
    for (let j of cotisations) {
      // console.log(total, 'total', j.total)
      j.rolAuth = user.roles[0]
      for (let i in j.detallesServicios) {
        j.detallesServicios[i].total = 0
        for (let h in j.detallesServicios[i].list ) {
          j.detallesServicios[i].total = j.detallesServicios[i].total + parseFloat(j.detallesServicios[i].list[h].valor)
          // total = total + parseFloat(j.detallesServicios[i].list[h].valor)
        }
      }
      // j.total = total
    }
    response.send(cotisations)
  }

  async approveQuote ({params, response, auth}) {
    let cotisation = await Cotisation.find(params.id)
    if (!cotisation.event_id) {
      let event = await Event.create({})
      cotisation.event_id = event._id.toString()
    }
    const body = { status: 2, event_id: cotisation.event_id } //Cotizacion Aprobada
    let update = await Cotisation.query().where({_id: params.id}).update(body)
    response.send(update)
  }

  async disapproveQuote ({params, response, auth}) {
    //const body = request.only(['reason'])
    const body = { status: 3 } //Cotizacion Desaprobada
    let update = await Cotisation.query().where({_id: params.id}).update(body)
    response.send(update)
  }

  async payQuotes ({params, response, auth, request}) {
    const body = {}
    body.status = 4 //Cotizacion Pagada y a la espera por finalizar el evento
    let update = await Cotisation.query().where({event_id: params.event_id}).update(body)

    const bodyT = request.only(['startDate', 'endDate'])
    update = await Event.query().where({_id: params.event_id}).update(bodyT)

    response.send(update)
  }

  async quotesByStatusApprove ({params, response, auth, request}) {
    const user = (await auth.getUser()).toJSON()
    let cotisations = (await Cotisation.where({
      $or: [{ cliente_id: user._id }, { proveedor_id: user._id }],
      status: 2
    }).with('datos_proveedor').with('datos_cliente').fetch()).toJSON()
    // let update = await Cotisation.query().where({_id: params.id}).update(body)
    if (cotisations.length !== 0) {
      var total = 0
      for (let item of cotisations) {
        total = total + item.total
      }
      var enviar = {
        totalCotisaciones: total,
        cotisasiones: cotisations,
        pay: false
      }
    } else {
      console.log('ELSEE')
      cotisations = (await Cotisation.where({
        $or: [{ cliente_id: user._id }, { proveedor_id: user._id }],
        status: 4
      }).with('datos_proveedor').with('datos_cliente').fetch()).toJSON()
      var total = 0
      for (let item of cotisations) {
        total = total + item.total
      }
      var enviar = {
        totalCotisaciones: total,
        cotisasiones: cotisations,
        pay: true
      }
    }
    response.send(enviar)
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = CotisationController
