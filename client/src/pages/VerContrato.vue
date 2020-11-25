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
        <div class="text-subtitle1 text-center">{{userA.name}}</div>
        <div class="text-subtitle2 text-grey text-center">{{userA.email}}</div>
        <div class="text-subtitle2 text-grey text-center">{{userA.phone}}</div>
        <div v-if="metodoPagoA" class="row justify-center q-pa-xs">
          <q-img
                v-if="imgComprobanteA != ''"
                style="width:70px"
                :src="imgComprobanteA"
            ></q-img>
            <div v-if="imgComprobanteA != ''" class="text-caption q-pa-sm text-grey">Comprobante de transferencia bancaria</div>
          <q-file v-else :disable="disable" bottom-slots v-model="file" outlined label="Archivo" accept=".jpg, image/*" >
                <template v-slot:prepend>
                  <q-icon name="cloud_upload" color="primary" @click.stop />
                </template>
                <template v-slot:append>
                  <q-icon name="close" color="negative" @click.stop="model = null" class="cursor-pointer" />
                </template>
                <template v-slot:hint>
                  Comprobante de transferencia bancaria
                </template>
        </q-file>
        </div>
        <q-item class="q-mt-md" v-ripple>
        <q-item-section avatar top>
          <q-checkbox :disable="disable" v-model="politicasUserA" color="primary" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-caption">Estoy de acuerdo con las políticas establecidas por SlimeDeal.</q-item-label>
        </q-item-section>
      </q-item>
      <div v-if="!disable" class="q-pa-md row justify-center">
            <q-btn
                no-caps
                color="primary"
                class="q-mr-md"
                @click="enviar()"
                >Enviar
            </q-btn>
        </div>
        <div v-if="!disable" class="q-pa-md row justify-center">
            <q-btn
                no-caps
                color="red"
                class="q-mr-md"
                @click="rechazar()"
                >Rechazar
            </q-btn>
        </div>
      </q-card-section>
    </q-card>

    <div class="bg-white row q-pb-none">
      <pdf :src="pdf" style="width: 100%"></pdf>
    </div>

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
        <div class="text-subtitle1 text-center">{{userB.name ? userB.name : contrato.name}}</div>
        <div class="text-subtitle2 text-grey text-center">{{userB.email ? userB.email : contrato.email}}</div>
        <div v-if="userB.phone" class="text-subtitle2 text-grey text-center">{{userB.phone}}</div>
        <div v-if="metodoPagoB" class="row justify-center q-pa-xs">
            <q-img
                v-if="imgComprobanteB != ''"
                style="width:70px"
                :src="imgComprobanteB"
            ></q-img>
            <div v-else class="text-h6 bg-grey-13 q-pa-sm">Sin Archivo</div>
            <div class="text-caption q-pa-sm text-grey">Comprobante de transferencia bancaria</div>
        </div>
        <div v-if="metodoPagoB && imgComprobanteB != ''" class="q-pa-md row justify-center">
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
import pdf from 'vue-pdf'
export default {
  components: { pdf },
  name: 'MainLayout',
  data () {
    return {
      id: '',
      pdf: '',
      imgComprobanteA: '',
      imgComprobanteB: '',
      disable: false,
      metodoPagoA: true,
      metodoPagoB: true,
      politicasUserA: false,
      politicasUserB: false,
      file: null,
      fileUserB: null,
      leftDrawerOpen: true,
      rightDrawerOpen: true,
      userA: {},
      userB: {},
      userType: '',
      contrato: {},
      typeContract: {},
      form: {}
    }
  },
  mounted () {
    if (this.$route.params.id) {
      this.id = this.$route.params.id
      this.$api.get('contrato/' + this.id).then(res => {
        if (res) {
          this.typeContract = res
          this.getUser()
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  methods: {
    rechazar () {
      this.$q.dialog({
        title: 'Confirma',
        message: '¿Seguro deseas rechazar el contrato?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$api.put('update_status/' + this.id, { status: 3 }).then(res => {
          if (res) {
            this.$router.push('/dashboard_admin')
          }
        })
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      })
    },
    enviar () {
      this.form.check = this.politicasUserA
      console.log('form', this.form)
      console.log('file', this.file)
      if (this.file && this.politicasUserA && this.metodoPagoA) {
        var formData = new FormData()
        formData.append('files', this.file)
        formData.append('dat', JSON.stringify(this.form))
        this.$api.put('update_check/' + this.id, formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then(res => {
          if (res) {
            this.$router.push('/dashboard')
          }
        })
      }
      if (this.metodoPagoA && this.file === null && !this.politicasUserA) {
        this.$q.dialog({
          message: 'Debes ingresar los datos requeridos para continuar',
          persistent: true
        }).onOk(() => {
        })
      }
      if (!this.metodoPagoA && this.politicasUserA) {
        this.$api.put('update_check_alone/' + this.id, this.form).then(res => {
          if (res) {
            this.$router.push('/dashboard')
          }
        })
      }
      if (!this.metodoPagoA && !this.politicasUserA) {
        this.$q.dialog({
          message: 'Debes aceptar las politicas de SlimeDeal para continuar',
          persistent: true
        }).onOk(() => {
        })
      }
      if (this.metodoPagoA && this.file === null && this.politicasUserA) {
        this.$q.dialog({
          message: 'Debes subir el comprobante de pago para continuar',
          persistent: true
        }).onOk(() => {

        })
      }
      if (this.metodoPagoA && this.file && !this.politicasUserA) {
        this.$q.dialog({
          message: 'Debes aceptar las politicas de SlimeDeal para continuar',
          persistent: true
        }).onOk(() => {

        })
      }
    },
    getUser () {
      this.$api.get('user_info').then(res => {
        if (res) {
          var c = res
          // Obtiene el usuario logueado, si es a o b
          if (this.typeContract.email === c.email) {
            this.userType = 'b'
          } else {
            this.userType = 'a'
          }
          console.log(this.userType)
          this.userA = res
          console.log('Usuario ', this.userA)
          this.getContrato(this.id)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    getContrato (id) {
      // obtiene info del contrato
      this.$api.get('contrato/' + id).then(res => {
        if (res) {
          this.contrato = res
          this.pdf = env.apiUrl + '/file2/' + this.contrato.archiveName
          console.log('pdf', this.pdf)
          // si el contrato tiene un estatus que no sea pendiente no se puede modificar
          if (this.contrato.status > 0) {
            this.disable = true
          }
          console.log('Contrato ', this.contrato)
          var rutaf = []
          if (this.userType === 'b') {
            this.userB = this.contrato.datos_userA
            if (this.contrato.metodoPago === 1) {
              this.metodoPagoA = false
              this.metodoPagoB = true
              if (this.contrato.userAFile) {
                rutaf = this.contrato.userAFile.split('/')
                this.imgComprobanteB = env.apiUrl + '/file2/' + rutaf[rutaf.length - 1]
              } else {
                this.imgComprobanteB = ''
              }
            } else if (this.contrato.metodoPago === 2) {
              this.metodoPagoA = true
              this.metodoPagoB = false
              if (this.contrato.userBFile) {
                rutaf = this.contrato.userBFile.split('/')
                this.imgComprobanteA = env.apiUrl + '/file2/' + rutaf[rutaf.length - 1]
              } else {
                this.imgComprobanteA = ''
              }
            } else {
              this.metodoPagoA = true
              this.metodoPagoB = true
              if (this.contrato.userBFile) {
                rutaf = this.contrato.userBFile.split('/')
                this.imgComprobanteA = env.apiUrl + '/file2/' + rutaf[rutaf.length - 1]
              } else {
                this.imgComprobanteA = ''
              }
              if (this.contrato.userAFile) {
                rutaf = this.contrato.userAFile.split('/')
                this.imgComprobanteB = env.apiUrl + '/file2/' + rutaf[rutaf.length - 1]
              } else {
                this.imgComprobanteB = ''
              }
              console.log('imga', this.imgComprobanteA)
              console.log('imgb', this.imgComprobanteB)
            }
            if (this.contrato.userACheck) {
              this.politicasUserB = this.contrato.userACheck
            }
            if (this.contrato.userBCheck) {
              this.politicasUserA = this.contrato.userBCheck
              this.disable = true
            }
          }
          if (this.userType === 'a') {
            if (this.contrato.datos_userB) {
              this.userB = this.contrato.datos_userB
            } else {
              this.userB = {}
            }
            if (this.contrato.metodoPago === 1) {
              this.metodoPagoA = true
              this.metodoPagoB = false
              if (this.contrato.userAFile) {
                rutaf = this.contrato.userAFile.split('/')
                this.imgComprobanteA = env.apiUrl + '/file2/' + rutaf[rutaf.length - 1]
              } else {
                this.imgComprobanteA = ''
              }
            } else if (this.contrato.metodoPago === 2) {
              this.metodoPagoA = false
              this.metodoPagoB = true
              if (this.contrato.userBFile) {
                rutaf = this.contrato.userBFile.split('/')
                this.imgComprobanteB = env.apiUrl + '/file2/' + rutaf[rutaf.length - 1]
              } else {
                this.imgComprobanteB = ''
              }
            } else {
              this.metodoPagoA = true
              this.metodoPagoB = true
              if (this.contrato.userAFile) {
                rutaf = this.contrato.userAFile.split('/')
                this.imgComprobanteA = env.apiUrl + '/file2/' + rutaf[rutaf.length - 1]
              } else {
                this.imgComprobanteA = ''
              }
              if (this.contrato.userBFile) {
                rutaf = this.contrato.userBFile.split('/')
                this.imgComprobanteB = env.apiUrl + '/file2/' + rutaf[rutaf.length - 1]
              } else {
                this.imgComprobanteB = ''
              }
            }
            if (this.contrato.userACheck) {
              this.politicasUserA = this.contrato.userACheck
              this.disable = true
            }
            if (this.contrato.userBCheck) {
              this.politicasUserB = this.contrato.userBCheck
            }
          }
          console.log('ruta', this.imgComprobanteA)
          if (this.contrato.status === 4) {
            this.$q.dialog({
              message: 'El contrato fue rechazado por el Administrador',
              persistent: true
            }).onOk(() => {

            })
          }
          if (this.contrato.status === 3) {
            this.$q.dialog({
              message: 'El contrato fue rechazado por uno de los participantes',
              persistent: true
            }).onOk(() => {

            })
          }
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
