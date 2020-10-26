'use strict'

/*
|--------------------------------------------------------------------------
| PlanSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Plan = use("App/Models/Plan")
const planData = [
]

class PlanSeeder {
  async run() {
    for (let i in planData) {
      let plan = await Plan.findBy('id', planData[i].id)
      if (!plan) {
        await Plan.create(planData[i])
      } else {
        plan.name = planData[i].name
        plan.id = planData[i].id
        plan.offers = planData[i].offers
        plan.price = planData[i].price
        await plan.save()
      }
    }
    console.log('Finished Planes')
  }
}

module.exports = PlanSeeder
