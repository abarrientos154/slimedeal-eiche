<template>
  <div class="q-pa-sm q-mt-md">
      <div class="text-h6 q-pa-sm q-ml-sm">Contratos Pendientes</div>

        <div class="q-pa-sm justify-start">
        <q-scroll-area
        v-if="contratosP.length"
          horizontal
          style="height: 130px"
          class="rounded-borders "
        >
          <div class="row items-center no-wrap">
            <div
              v-for="(card,index) in contratosP"
              :key="index"
            >
              <div v-if="index < 2" class="q-pa-sm items-center">
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

      <q-separator class="q-my-md"/>

      <q-card
        class="bg-white q-pa-xs shadow-13 my-card"
        style="width: 100%"
      >

      <div class="row justify-between">
            <div class="text-h6 q-pa-sm q-ml-sm">Contratos</div>
            <div class="row q-pa-sm">
                <div class="q-pr-xs">
                    <q-btn color="dark" no-caps label="Todos" style="width: 85px" @click="todos = true; filter()" />
                </div>
                <div class="q-pr-xs">
                    <q-btn color="blue-7" no-caps label="Pendientes" style="width: 85px" @click="pendientes = true; filter()" />
                </div>
                <div class="q-pr-xs">
                    <q-btn color="amber-8" no-caps label="Revisión" style="width: 85px" @click="revision = true; filter()" />
                </div>
                <div class="q-pr-xs">
                    <q-btn color="light-green-14" no-caps label="Vigentes" style="width: 85px" @click="vigentes = true; filter()" />
                </div>
                <div class="q-pr-xs">
                    <q-btn color="red" no-caps label="Rechazados" style="width: 85px" @click="rechazados = true; filter()" />
                </div>
            </div>
      </div>

        <div class="q-pa-sm justify-start">
          <div class="items-center no-wrap">
            <div
              v-for="(card,index) in data"
              :key="index"
            >
              <div class="row q-pa-sm items-center">
                <div class="text-subtitle2 q-px-md">{{index + 1}}</div>
                <q-card
                  :class="card.status == 0 ? 'bg-blue-3' : card.status == 1 ? 'bg-amber-6' : card.status == 2 ? 'bg-light-green-13' : card.status == 3 ? 'bg-red' : 'bg-white'"
                  style="width: 90%; height: 100px"
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
                    </q-item-section>

                    <q-item-section>
                      <div class="q-pb-sm">
                        <q-btn color="primary" no-caps label="Descargar" style="width: 130px" @click="download(card.filePath, card.archiveName)" />
                      </div>
                    </q-item-section>
                  </q-item>
                </q-card>
              </div>
            </div>
          </div>
      </div>
    </q-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      contratos: [],
      contratosP: [],
      data: [],
      todos: false,
      pendientes: false,
      revision: false,
      vigentes: false,
      rechazados: false
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
          this.data = this.contratos
          this.contratosP = this.contratos.filter(v => v.status === 0)
          console.log('contratos ', this.contratos)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    ver (id) {
      this.$router.push('/ver_contrato/' + id)
    },
    filter () {
      this.data = this.contratos
      if (this.todos) {
        this.data = this.contratos
        this.todos = false
      }
      if (this.pendientes) {
        this.data = this.data.filter(v => v.status === 0)
        this.pendientes = false
      }
      if (this.revision) {
        this.data = this.data.filter(v => v.status === 1)
        this.revision = false
      }
      if (this.vigentes) {
        this.data = this.data.filter(v => v.status === 2)
        this.vigentes = false
      }
      if (this.rechazados) {
        this.data = this.data.filter(v => v.status === 3)
        this.rechazados = false
      }
    }
  }
}
</script>
