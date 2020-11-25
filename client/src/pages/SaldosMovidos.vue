<template>
  <div class="q-pa-sm q-mt-md">
      <q-card
        class="bg-white q-pt-xs q-px-xs q-pb-md shadow-13 my-card"
        style="width: 100%"
      >
      <div class="text-h6 q-pa-sm q-ml-sm">Saldos Movidos</div>

        <div class="row q-py-md q-gutter-sm justify-center">
            <div
            class="col-5"
              v-for="(card,index) in contratos"
              :key="index"
            >
              <div class="q-py-xs q-px-sm items-center">
                <q-card
                  class="bg-grey-3 q-px-sm q-py-xs my-card"
                  style="height: 90px"
                >
                  <q-item style="width: 100%">
                    <q-item-section>
                      <q-item-label>{{card.title}}</q-item-label>
                      <q-item-label caption>{{card.description}}</q-item-label>
                    </q-item-section>
                    <q-item-section>
                      <div class="row justify-center q-pa-xs">
                          <q-img
                              class="q-pa-xs"
                              style="width:80px"
                              :src="card.comprobante"
                              @click="comprobante = card.comprobante, dialog = true"
                          ></q-img>
                      </div>
                    </q-item-section>
                  </q-item>
                </q-card>
              </div>
            </div>
        </div>

        <q-dialog v-model="dialog" persistent>
          <q-card style="width: 100%">
            <q-card-section class="row justify-between">
              <div class="text-h6 q-px-md">comprobante</div>
              <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>
            <q-card-section class="row items-center q-pa-sm">
              <div class="row justify-center q-pa-xs">
                <q-img
                  class="q-pa-sm"
                  style="width: 540px"
                  :src="comprobante"
                ></q-img>
              </div>
            </q-card-section>
          </q-card>
        </q-dialog>

      </q-card>
  </div>
</template>

<script>
import env from '../env'
export default {
  data () {
    return {
      contratos: [],
      user: {},
      dialog: false,
      comprobante: ''
    }
  },
  mounted () {
    this.getUser()
  },
  methods: {
    getUser () {
      this.$api.get('user_info').then(res => {
        if (res) {
          this.user = res
          console.log('user', this.user)
          this.getContratos()
        }
      }).catch(error => {
        console.log(error)
      })
    },
    getContratos () {
      this.$api.get('mis_contratos_pagados').then(res => {
        if (res) {
          var c = res
          for (let i = 0; i < c.length; i++) {
            var ruta = []
            if (c[i].email === this.user.email) {
              ruta = c[i].userBFile.split('/')
              c[i].comprobante = env.apiUrl + '/file2/' + ruta[ruta.length - 1]
            } else {
              ruta = c[i].userAFile.split('/')
              c[i].comprobante = env.apiUrl + '/file2/' + ruta[ruta.length - 1]
            }
          }
          this.contratos = c
          console.log('contratos ', this.contratos)
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
