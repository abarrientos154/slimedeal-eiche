<template>
  <div class="q-pa-sm q-mt-md">
      <div class="text-h6 q-pa-sm q-ml-sm">{{title}}</div>

        <div class="q-pa-sm justify-start">
        <q-scroll-area
          horizontal
          style="height: 130px"
          class="rounded-borders "
        >
          <div class="row items-center no-wrap">
            <div
              v-for="(card,index) in data"
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
      </div>

      <q-separator class="q-my-md"/>

      <q-card
        class="bg-white q-pa-xs shadow-13 my-card"
        style="width: 100%"
      >
      <div class="text-h6 q-pa-sm q-ml-sm">Historial</div>

        <div class="q-pa-sm justify-start">
          <div class="items-center no-wrap">
            <div
              v-for="(card,index) in data"
              :key="index"
            >
              <div class="row q-pa-sm items-center">
                <div class="text-subtitle2 q-px-md">{{index + 1}}</div>
                <q-card
                  class="bg-white my-card"
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
  props: {
    data: { required: true },
    title: { required: true }
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    ver (id) {
      this.$router.push('/ver_contrato/' + id)
    },
    async download (filePath, archiveName) {
      this.$api.get('get_file_by_directory', { dir: filePath }).then(res => {
        console.log('aquiii', res)
        const blob = new Blob([res])
        // const ext = file.split('.')
        const fileName = `${archiveName}`
        console.log(fileName, 'filename')
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', fileName)
        document.body.appendChild(link)
        link.click()
        /*   this.$api.delete('file_delete/' + fileName).then(res => {
        }) */
        // this.$q.loading.hide()
      }).catch(function (error) {
        console.log('error descargando', error)
      })
    }
  }
}
</script>
