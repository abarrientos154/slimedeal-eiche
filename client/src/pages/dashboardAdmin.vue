<template>
  <div>
    <div class="bg-primary col full-width q-pa-sm">
      <div class="row justify-center">
        <q-img
          style="width:100px"
          src="slime_logo_hw.png"
        ></q-img>
      </div>
    </div>
    <div class="q-pa-sm q-mt-md">
        <div class="text-h6 q-pa-sm q-ml-sm">Contratos para revisión</div>̣̣
        <div class="q-pa-sm justify-start">
        <q-scroll-area
          v-if="revision.length"
          horizontal
          style="height: 130px"
          class="rounded-borders "
        >
          <div class="row items-center no-wrap">
            <div
              v-for="(card,index) in revision"
              :key="index"
            >
              <div class="q-pa-sm items-center">
                <q-card
                  class="bg-white my-card"
                  style="width: 340px; height: 100px"
                >
                  <q-item class="absolute-center" style="width: 100%">
                    <q-item-section avatar>
                      <q-avatar>
                        <img :src="imgC(card)">
                      </q-avatar>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>{{card.title}}</q-item-label>
                      <q-item-label caption>{{card.description}}</q-item-label>
                    </q-item-section>

                    <q-item-section>
                      <div class="q-pb-sm">
                        <q-btn color="primary" no-caps label="Ver Contrato" style="width: 130px" @click="ver(card._id)" />
                      </div>
                      <div>
                        <q-btn color="primary" no-caps label="Descargar" style="width: 130px" @click="download(card.filePath, card.archiveName)" />
                      </div>
                    </q-item-section>
                  </q-item>
                </q-card>
              </div>
            </div>
          </div>
        </q-scroll-area>
        <div v-else class="text-center q-py-md" > No tienes contratos en revisión</div>
      </div>

      <div class="text-h6 q-pa-sm q-ml-sm">Contratos Vigentes</div>

        <div class="q-pa-sm justify-start">
        <q-scroll-area
          v-if="vigentes.length"
          horizontal
          style="height: 130px"
          class="rounded-borders "
        >
          <div class="row items-center no-wrap">
            <div
              v-for="(card,index) in vigentes"
              :key="index"
            >
              <div class="q-pa-sm items-center">
                <q-card
                  class="bg-white my-card"
                  style="width: 340px; height: 100px"
                >
                  <q-item class="absolute-center" style="width: 100%">
                    <q-item-section avatar>
                      <q-avatar>
                        <img :src="imgC(card)">
                      </q-avatar>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>{{card.title}}</q-item-label>
                      <q-item-label caption>{{card.description}}</q-item-label>
                    </q-item-section>

                    <q-item-section>
                      <div class="q-pb-sm">
                        <q-btn color="primary" no-caps label="Ver Contrato" style="width: 130px" @click="ver(card._id)" />
                      </div>
                      <div>
                        <q-btn color="primary" no-caps label="Descargar" style="width: 130px" @click="download(card.filePath, card.archiveName)" />
                      </div>
                    </q-item-section>
                  </q-item>
                </q-card>
              </div>
            </div>
          </div>
        </q-scroll-area>
        <div v-else class="text-center q-py-md" > No tienes contratos vigentes</div>
      </div>

      <div class="text-h6 q-pa-sm q-ml-sm">Historial</div>

        <div class="q-pa-sm justify-start">
        <q-scroll-area
          v-if="contratos.length"
          horizontal
          style="height: 130px"
          class="rounded-borders "
        >
          <div class="row items-center no-wrap">
            <div
              v-for="(card,index) in contratos"
              :key="index"
            >
              <div class="q-pa-sm items-center">
                <q-card
                  class="bg-white my-card"
                  style="width: 340px; height: 100px"
                >
                  <q-item class="absolute-center" style="width: 100%">
                    <q-item-section avatar>
                      <q-avatar>
                        <img :src="imgC(card)">
                      </q-avatar>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>{{card.title}}</q-item-label>
                      <q-item-label caption>{{card.description}}</q-item-label>
                    </q-item-section>

                    <q-item-section>
                      <div class="q-pb-sm">
                        <q-btn color="primary" no-caps label="Ver Contrato" style="width: 130px" @click="ver(card._id)" />
                      </div>
                      <div>
                        <q-btn color="primary" no-caps label="Descargar" style="width: 130px" @click="download(card.filePath, card.archiveName)" />
                      </div>
                    </q-item-section>
                  </q-item>
                </q-card>
              </div>
            </div>
          </div>
        </q-scroll-area>
        <div v-else class="text-center q-py-md" > No tienes ningún contrato</div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { openURL } from 'quasar'
import env from '../env'
export default {
  data () {
    return {
      revision: [],
      vigentes: [],
      contratos: [],
      today: moment()
    }
  },
  mounted () {
    this.getContratos()
  },
  methods: {
    imgC (val) {
      var im = ''
      if (val.datos_userA) {
        im = env.apiUrl + '/file3/' + val.datos_userA._id
        return im
      } else {
        im = 'app-logo-128x128.png'
        return im
      }
    },
    getContratos () {
      this.$api.get('get_contracts/' + 1).then(res => {
        if (res) {
          this.revision = res
          console.log('revision ', this.revision)
        }
      }).catch(error => {
        console.log(error)
      })
      this.$api.get('get_contracts/' + 2).then(res => {
        if (res) {
          this.vigentes = res.filter(v => moment(v.fechaV) >= this.today)
          console.log('vigentes ', this.vigentes)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    ver (id) {
      this.$router.push('ver_contrato_admin/' + id)
    },
    async download (filePath, archiveName) {
      console.log(archiveName)
      openURL(env.apiUrl + 'file2/' + archiveName)
    }
  }
}
</script>
