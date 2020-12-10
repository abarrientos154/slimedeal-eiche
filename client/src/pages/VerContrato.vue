<template>
  <div class="row justify-between fullheight">
    <q-card
      class="bg-white shadow-13 row q-pb-none"
      style="width: 200px; height: 100%; min-height: 900px; max-height: 1000px;"
    >
    <q-card-section style="width:100%; height:100%">
        <div class="row justify-center q-pb-sm">
          <q-avatar size="70px" font-size="52px" >
            <q-img
                style="width:70px"
                :src="perfilA"
            ></q-img>
          </q-avatar>
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
      <q-item class="q-mt-md" v-ripple>
        <q-item-section avatar top>
          <q-checkbox :disable="disableL" v-model="listoCA" color="primary" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-caption">Ya pagué y envié los comprobantes requeridos.</q-item-label>
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

    <div class="col column">
      <div class="col bg-white row q-pb-none">
        <pdf :src="pdf" style="width: 100%"></pdf>
      </div>
      <div class="row justify-center fixed-bottom">
        <q-btn
          no-caps
          padding="sm"
          size="md"
          color="primary"
          @click="seeEstatus = true"
          >Ver estatus
        </q-btn>
      </div>
    </div>

    <q-dialog v-model="seeEstatus" persistent>
      <q-card>
        <q-card-section class="row justify-end">
        <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section class="row items-center q-pa-sm">
          <div class="col q-px-xs q-pb-sm">
            <q-timeline :layout="layout" color="secondary">
              <q-timeline-entry heading>
                Estado del contrato
              </q-timeline-entry>

              <q-timeline-entry
                title="Estado Pendiente"
                side="left"
                icon="pending_actions"
                color="blue-7"
              >
                <div>
                  El contrato se encuentra en espera de que los participantes realicen las transacciones requeridas y estén de acuerdo con los términos y condiciones de SlimeDeal.
                </div>
              </q-timeline-entry>

              <q-timeline-entry
                v-if="contrato.status == 3"
                title="Rechazado por uno de los participantes"
                side="right"
                color="red"
                icon="cancel"
              >
                <div>
                  El contrato fue rechazado por uno de sus participantes.
                </div>
              </q-timeline-entry>

              <q-timeline-entry
                v-if="contrato.status == 1 || contrato.status == 2 || contrato.status == 4 || contrato.status == 5"
                title="Estado en Revisión"
                side="right"
                icon="preview"
                color="amber-8"
              >
                <div>
                  El contrato se encuentra en espera de que el administrador de SlimeDeal lo apruebe.
                </div>
              </q-timeline-entry>

              <q-timeline-entry
                v-if="contrato.status == 4"
                title="Rechazado por el administrador"
                side="left"
                icon="cancel"
                color="red"
              >
                <div>
                  El contrato fue rechazado por el administrador de SlimeDeal.
                </div>
              </q-timeline-entry>

              <q-timeline-entry
                v-if="contrato.status == 2 || contrato.status == 5"
                title="Estado en Vigencia"
                side="left"
                icon="check"
                color="positive"
              >
                <div>
                  El contrato se encuentra en estado de vigencia ya que fue aprobado por el administrador.
                </div>
              </q-timeline-entry>

              <q-timeline-entry
                v-if="vence"
                title="Estado Vencido"
                side="right"
                icon="cancel"
                color="blue-grey"
              >
                <div>
                  El contrato ha superado la fecha de vigencia establecida por el administrador de SlimeDeal.
                </div>
              </q-timeline-entry>
            </q-timeline>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-card
      class="bg-white shadow-13"
      style="width: 200px"
    >
    <q-card-section style="width:100%; height:100%">
    <div class="row justify-center q-pb-sm">
      <q-avatar size="70px" font-size="52px" >
            <q-img
                style="width:70px"
                :src="perfilB"
            ></q-img>
      </q-avatar>
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
      <q-item class="q-mt-md" v-ripple>
        <q-item-section avatar top>
          <q-checkbox disable v-model="listoCB" color="primary" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-caption">Ya pagué y envié los comprobantes requeridos.</q-item-label>
        </q-item-section>
      </q-item>
    </q-card-section>
    </q-card>
  </div>
</template>

<script>
import moment from 'moment'
import env from '../env'
import pdf from 'vue-pdf'
export default {
  components: { pdf },
  name: 'MainLayout',
  props: {
    selec: { default: 'Fecha' }
  },
  data () {
    return {
      id: '',
      pdf: '',
      today: moment(),
      vence: false,
      seeEstatus: false,
      imgComprobanteA: '',
      imgComprobanteB: '',
      perfilA: '',
      perfilB: '',
      disable: false,
      disableL: false,
      metodoPagoA: true,
      metodoPagoB: true,
      politicasUserA: false,
      politicasUserB: false,
      listoCA: false,
      listoCB: false,
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
  watch: {
    selec (val) {
      this.id = val
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
  computed: {
    layout () {
      return this.$q.screen.lt.sm ? 'dense' : (this.$q.screen.lt.md ? 'comfortable' : 'loose')
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
            this.$router.push('/inicio')
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
      if (this.file && this.politicasUserA && this.metodoPagoA && this.listoCA) {
        var formData = new FormData()
        formData.append('files', this.file)
        formData.append('dat', JSON.stringify(this.form))
        this.$api.put('update_check/' + this.id, formData, {
          headers: {
            'Content-Type': undefined
          }
        }).then(res => {
          if (res) {
            this.$router.push('/inicio')
          }
        })
      }
      if (this.metodoPagoA && this.file === null && !this.politicasUserA && !this.listoCA) {
        this.$q.dialog({
          message: 'Debes ingresar todos los datos requeridos para continuar',
          persistent: true
        }).onOk(() => {
        })
      }
      if (!this.metodoPagoA && this.politicasUserA && this.listoCA) {
        this.$api.put('update_check_alone/' + this.id, this.form).then(res => {
          if (res) {
            this.$router.push('/inicio')
          }
        })
      }
      if (!this.metodoPagoA && !this.politicasUserA && !this.listoCA) {
        this.$q.dialog({
          message: 'Debes ingresar todos los datos requeridos para continuar',
          persistent: true
        }).onOk(() => {
        })
      }
      if (!this.metodoPagoA && this.politicasUserA && !this.listoCA) {
        this.$q.dialog({
          message: 'Debes ingresar todos los datos requeridos para continuar',
          persistent: true
        }).onOk(() => {
        })
      }
      if (!this.metodoPagoA && !this.politicasUserA && this.listoCA) {
        this.$q.dialog({
          message: 'Debes aceptar las politicas de SlimeDeal para continuar',
          persistent: true
        }).onOk(() => {
        })
      }
      if (this.metodoPagoA && this.file === null && this.politicasUserA && this.listoCA) {
        this.$q.dialog({
          message: 'Debes subir el comprobante de pago para continuar',
          persistent: true
        }).onOk(() => {

        })
      }
      if (this.metodoPagoA && this.file === null && !this.politicasUserA && this.listoCA) {
        this.$q.dialog({
          message: 'Debes ingresar todos los datos requeridos para continuar',
          persistent: true
        }).onOk(() => {

        })
      }
      if (this.metodoPagoA && this.file === null && this.politicasUserA && !this.listoCA) {
        this.$q.dialog({
          message: 'Debes ingresar todos los datos requeridos para continuar',
          persistent: true
        }).onOk(() => {

        })
      }
      if (this.metodoPagoA && this.file && !this.politicasUserA && this.listoCA) {
        this.$q.dialog({
          message: 'Debes aceptar las politicas de SlimeDeal para continuar',
          persistent: true
        }).onOk(() => {

        })
      }
      if (this.metodoPagoA && this.file && !this.politicasUserA && !this.listoCA) {
        this.$q.dialog({
          message: 'Debes ingresar todos los datos requeridos para continuar',
          persistent: true
        }).onOk(() => {

        })
      }
      if (this.metodoPagoA && this.file && this.politicasUserA && !this.listoCA) {
        this.$q.dialog({
          message: 'Debes ingresar todos los datos requeridos para continuar',
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
          if (this.contrato.fechaV) {
            if (moment(this.contrato.fechaV) < this.today) {
              this.vence = true
            } else {
              this.vence = false
            }
          } else {
            this.vence = false
          }
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
            this.perfilA = env.apiUrl + '/file3/' + this.contrato.datos_userB._id
            this.perfilB = env.apiUrl + '/file3/' + this.contrato.datos_userA._id
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
              this.listoCB = this.contrato.userACheck
            }
            if (this.contrato.userBCheck) {
              this.politicasUserA = this.contrato.userBCheck
              this.listoCA = this.contrato.userBCheck
              this.disableL = true
              this.disable = true
            }
          }
          if (this.userType === 'a') {
            if (this.contrato.datos_userB) {
              this.userB = this.contrato.datos_userB
              this.perfilA = env.apiUrl + '/file3/' + this.contrato.datos_userA._id
              this.perfilB = env.apiUrl + '/file3/' + this.contrato.datos_userB._id
            } else {
              this.userB = {}
              this.perfilA = env.apiUrl + '/file3/' + this.contrato.datos_userA._id
              this.perfilB = 'app-logo-128x128.png'
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
              this.listoCA = this.contrato.userACheck
              this.disableL = true
              this.disable = true
            }
            if (this.contrato.userBCheck) {
              this.politicasUserB = this.contrato.userBCheck
              this.listoCB = this.contrato.userBCheck
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
