<template>
  <div class="row justify-between fullheight">
    <q-card
      class="bg-white shadow-13 row q-pb-none"
      style="width: 200px; height: 100%; min-height: 600px; max-height: 700px;"
    >
    <q-card-section style="width:100%; height:100%">
        <div class="row justify-center">
            <q-img
                style="width:70px"
                src="app-logo-128x128.png"
            ></q-img>
        </div>
        <div class="text-subtitle1 text-center">{{contrato.datos_userA.name}}</div>
        <div class="text-subtitle2 text-grey text-center">{{contrato.datos_userA.email}}</div>
        <div class="text-subtitle2 text-grey text-center">{{contrato.datos_userA.phone}}</div>
        <div v-if="metodoPagoA" class="row justify-center q-pa-xs">
          <q-img
                style="width:70px"
                :src="imgComprobanteA"
            ></q-img>
            <div class="text-caption q-pa-sm text-grey">Comprobante de transferencia bancaria</div>
        </div>
        <div v-if="metodoPagoA" class="q-py-md row justify-center">
            <q-btn
                no-caps
                color="primary"
                class="q-mr-md"
                >Descargar
            </q-btn>
        </div>
        <q-item v-ripple>
        <q-item-section avatar top>
          <q-checkbox disable v-model="politicasUserA" color="primary" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-caption">Estoy de acuerdo con las políticas establecidas por SlimeDeal.</q-item-label>
        </q-item-section>
      </q-item>
        <div v-if="contrato.status === 1" class="q-pt-xl row justify-around">
            <div>
                <q-btn
                    no-caps
                    padding="sm"
                    size="md"
                    color="primary"
                    @click="aprobarContrato()"
                    >Aprobar
                </q-btn>
            </div>
            <div>
                <q-btn
                    no-caps
                    padding="sm"
                    size="md"
                    color="primary"
                    @click="rechazarContrato()"
                    >Rechazar
                </q-btn>
            </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card
      class="bg-white shadow-13"
      style="width: 200px"
    >
    <q-card-section style="width:100%; height:100%">
    <div class="row justify-center">
            <q-img
                style="width:70px"
                src="app-logo-128x128.png"
            ></q-img>
        </div>
        <div class="text-subtitle1 text-center">{{contrato.datos_userB.name ? contrato.datos_userB.name : contrato.name}}</div>
        <div class="text-subtitle2 text-grey text-center">{{contrato.datos_userB.email ? contrato.datos_userB.email : contrato.email}}</div>
        <div v-if="contrato.datos_userB.phone" class="text-subtitle2 text-grey text-center">{{contrato.datos_userB.phone}}</div>
        <div v-if="metodoPagoB" class="row justify-center q-pa-xs">
            <q-img
                style="width:70px"
                :src="imgComprobanteB"
            ></q-img>
            <div class="text-caption q-pa-sm text-grey">Comprobante de transferencia bancaria</div>
        </div>
        <div v-if="metodoPagoB" class="q-pa-md row justify-center">
            <q-btn
                no-caps
                color="primary"
                class="q-mr-md"
                >Descargar
            </q-btn>
        </div>
        <q-item v-ripple>
        <q-item-section avatar top>
          <q-checkbox disable v-model="politicasUserB" color="primary" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-caption">Estoy de acuerdo con las políticas establecidas por SlimeDeal.</q-item-label>
        </q-item-section>
      </q-item>
    </q-card-section>
    </q-card>
  </div>
</template>

<script>
import env from '../env'
export default {
  name: 'MainLayout',
  components: {},
  data () {
    return {
      id: '',
      imgComprobanteA: '',
      imgComprobanteB: '',
      metodoPagoA: true,
      metodoPagoB: true,
      politicasUserA: false,
      politicasUserB: false,
      file: null,
      fileUserB: null,
      leftDrawerOpen: true,
      rightDrawerOpen: true,
      contrato: {},
      form: {}
    }
  },
  mounted () {
    if (this.$route.params.id) {
      this.id = this.$route.params.id
      this.getContrato(this.id)
    }
  },
  methods: {
    aprobarContrato () {
      this.$api.put('update_status/' + this.id, { status: 2 }).then(res => {
        if (res) {
          this.$router.push('/dashboard_admin')
        }
      })
    },
    rechazarContrato () {
      this.$q.dialog({
        title: 'Confirma',
        message: '¿Seguro deseas rechazar el contrato?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$api.put('update_status/' + this.id, { status: 4 }).then(res => {
          if (res) {
            this.$router.push('/dashboard_admin')
          }
        })
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      })
    },
    getContrato (id) {
      this.$api.get('contrato/' + id).then(res => {
        if (res) {
          this.contrato = res
          console.log('Contrato ', this.contrato)
          var rutaf = []
          if (this.contrato.metodoPago === 1) {
            this.metodoPagoA = true
            this.metodoPagoB = false
            if (this.contrato.userAFile) {
              rutaf = this.contrato.userAFile.split('/')
              this.imgComprobanteA = env.apiUrl + '/file2/' + rutaf[rutaf.length - 1]
            }
          } else if (this.contrato.metodoPago === 2) {
            this.metodoPagoA = false
            this.metodoPagoB = true
            if (this.contrato.userBFile) {
              rutaf = this.contrato.userBFile.split('/')
              this.imgComprobanteB = env.apiUrl + '/file2/' + rutaf[rutaf.length - 1]
            }
          } else {
            this.metodoPagoA = true
            this.metodoPagoB = true
            if (this.contrato.userAFile) {
              rutaf = this.contrato.userAFile.split('/')
              this.imgComprobanteA = env.apiUrl + '/file2/' + rutaf[rutaf.length - 1]
            }
            if (this.contrato.userBFile) {
              rutaf = this.contrato.userBFile.split('/')
              this.imgComprobanteB = env.apiUrl + '/file2/' + rutaf[rutaf.length - 1]
            }
          }
          if (this.contrato.userACheck) {
            this.politicasUserA = this.contrato.userACheck
          }
          if (this.contrato.userBCheck) {
            this.politicasUserB = this.contrato.userBCheck
          }
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
