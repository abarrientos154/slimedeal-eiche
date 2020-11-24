<template>
  <div class="q-pa-sm q-mt-md">
      <q-card
        class="bg-white q-pa-xs shadow-13 my-card"
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
                  style="height: 130px"
                >
                <div class="row justify-center q-pa-xs">
                    <q-img
                        style="width:70px"
                        src="/app-logo-128x128.png"
                    ></q-img>
                </div>
                  <q-item style="width: 100%">
                    <q-item-section>
                      <q-item-label>{{card.title}}</q-item-label>
                      <q-item-label caption>{{card.description}}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-card>
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
          console.log('contratos ', this.contratos)
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
