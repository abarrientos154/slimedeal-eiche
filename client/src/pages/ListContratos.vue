<template>
  <div class="q-pa-sm q-mt-md">
        <div class="text-h6 q-pa-sm q-ml-sm">Contratos Pendientes</div>

        <div class="q-pa-sm justify-start">
        <q-scroll-area
          v-if="pendientes.length"
          horizontal
          style="height: 130px"
          class="rounded-borders "
        >
          <div class="row items-center no-wrap">
            <div
              v-for="(card,index) in pendientes"
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
                        <img src="https://cdn.quasar.dev/img/avatar2.jpg">
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
        <div v-else class="text-center q-py-md" > No tienes contratos pendientes</div>
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
                        <img src="https://cdn.quasar.dev/img/avatar2.jpg">
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
                        <img src="https://cdn.quasar.dev/img/avatar2.jpg">
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
</template>

<script>
import { openURL } from 'quasar'
import env from '../env'
export default {
  data () {
    return {
      pendientes: [],
      vigentes: [],
      contratos: []
    }
  },
  mounted () {
    this.getContratos()
  },
  methods: {
    getContratos () {
      this.$api.get('contratos_pendientes').then(res => {
        if (res) {
          this.contratos = res
          this.pendientes = this.contratos.filter(v => v.status === 0)
          this.vigentes = this.contratos.filter(v => v.status === 2)
          console.log('pendientes ', this.pendientes)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    ver (id) {
      this.$router.push('/ver_contrato/' + id)
    },
    async download (filePath, archiveName) {
      console.log(archiveName)
      openURL(env.apiUrl + '/file2/' + archiveName)
    }
  }
}
</script>
