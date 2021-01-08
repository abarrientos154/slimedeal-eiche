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

  <div class="row justify-between fullheight">
    <q-card
      class="bg-white shadow-13 row q-pb-none"
      style="width: 200px;"
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
        <q-card v-if="contrato.monto" class="row justify-center q-pa-xs q-my-md shadow-13">
          <div class="col-12 text-center text-subtitle2">Monto del Contrato</div>
          <div class="col-12 text-center text-subtitle2 text-primary">{{contrato.monto}}</div>
        </q-card>
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
        <div v-if="contrato.status === 2 && !vence" class="q-pa-md row justify-center">
            <q-btn
                no-caps
                color="warning"
                class="q-mr-md"
                text-color="black"
                @click="newDisputa = true"
                >Abrir Disputa
            </q-btn>
        </div>
        <div v-if="contrato.status === 5 || contrato.status === 6" class="q-pa-md row justify-center">
            <q-btn
                no-caps
                color="orange"
                class="q-mr-md"
                @click="seeDisputa = true"
                >Ver Disputa
            </q-btn>
        </div>
      </q-card-section>
    </q-card>

    <div class="col column">
        <pdf :src="pdf" style="width: 100%"></pdf>

      <div class="row justify-center q-my-md">
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

    <q-dialog v-model="newDisputa" persistent>
      <q-card style="width: 100%">
        <q-card-section class="row justify-between">
          <div class="text-h5">Abrir Disputa</div>
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section class="row items-center q-pa-sm">
          <q-card class="shadow-13 q-pa-md q-ma-md" style="width: 100%">
            <q-input
                  class="col-12 row justify-center q-pb-lg"
                  label="Título de la disputa"
                  v-model="disputa.title"
                  :error="$v.disputa.title.$error"
                  error-message="Este campo es requerido"
                  @blur="$v.disputa.title.$touch()"
                  outlined
                  rounded>
            </q-input>
            <q-input
                  class="col-12 row justify-center q-pb-lg q-mb-sm"
                  placeholder="Motivo de la disputa"
                  v-model="disputa.description"
                  :error="$v.disputa.description.$error"
                  error-message="Este campo es requerido"
                  @blur="$v.disputa.description.$touch()"
                  type="textarea"
                  hint="Danos una breve descripción del motivo por el cual el contrato fue infringido"
                  outlined
                  rounded>
            </q-input>
            <q-file class="q-mb-sm" bottom-slots v-model="disputaPart" rounded outlined label="Archivo" accept=".jpg, image/*" :error="$v.disputaPart.$error" error-message="Este campo es requerido" @blur="$v.disputaPart.$touch()" >
                  <template v-slot:prepend>
                    <q-icon name="cloud_upload" color="primary" @click.stop />
                  </template>
                  <template v-slot:append>
                    <q-icon name="close" color="negative" @click.stop="model = null" class="cursor-pointer" />
                  </template>
                  <template v-slot:hint>
                    Parte que se infringio del contrato
                  </template>
            </q-file>
            <div class="col-12 row justify-center q-ma-md">
              <q-btn color="primary" label="Enviar" @click="sendDisputa()" v-close-popup />
            </div>
          </q-card>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="seeDisputa" persistent>
      <q-card style="width: 100%">
        <q-card-section class="row justify-between">
          <div class="text-h5">Disputa</div>
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section class="row items-center q-pa-sm">
          <q-card class="shadow-13 q-pa-md q-ma-md" style="width: 100%">
            <q-field rounded outlined class="col-12 row justify-center q-pb-lg" label="Título de la disputa" stack-label>
              <template v-slot:control>
                <div class="self-center full-width no-outline" tabindex="0">{{disputa.title}}</div>
              </template>
            </q-field>
            <q-input
                  class="col-12 row justify-center q-pb-lg"
                  label="Descripción de la disputa"
                  v-model="disputa.description"
                  type="textarea"
                  disable
                  outlined
                  rounded>
            </q-input>
            <div class="col-12 row justify-center q-pb-lg" >
              <q-img
                  class="col-12"
                  style="width:400px"
                  :src="imgDisputa"
              ></q-img>
              <div class="col-12 text-center text-caption q-pa-sm">Parte del contrato infringida</div>
            </div>
            <div class="col-12 row justify-center q-ma-md">
              <q-btn color="primary" label="Cerrar" v-close-popup />
            </div>
          </q-card>
        </q-card-section>
      </q-card>
    </q-dialog>

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
                v-if="contrato.status == 1 || contrato.status == 2 || contrato.status == 4 || contrato.status == 5 || contrato.status == 6"
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
                v-if="contrato.status == 2 || contrato.status == 5 || contrato.status == 6"
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
                v-if="contrato.status == 5 || contrato.status == 6"
                title="Estado en Mediación"
                side="right"
                icon="refresh"
                color="indigo-4"
              >
                <div>
                  El contrato se encuentra en estado de mediacion ya que se inició una disputa.
                </div>
              </q-timeline-entry>

              <q-timeline-entry
                v-if="vence || contrato.status == 6"
                title="Estado Culminado"
                :side="contrato.status == 6 ? 'left' : 'right'"
                icon="cancel"
                color="blue-grey"
              >
                <div>
                  {{contrato.status == 6 ? 'El contrato culminó ya que el administrador aprobo la disputa.' : 'El contrato ha superado la fecha de vigencia establecida por el administrador de SlimeDeal.'}}
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
                @click="download()"
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
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import moment from 'moment'
import { openURL } from 'quasar'
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
      newDisputa: false,
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
      form: {},
      disputa: {
        title: '',
        description: ''
      },
      disputaPart: null,
      seeDisputa: false,
      imgDisputa: ''
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
  validations: {
    disputa: {
      title: { required },
      description: { required }
    },
    disputaPart: { required }
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
    async download () {
      var rutaf = []
      if (this.userType === 'b') {
        rutaf = this.contrato.userAFile.split('/')
        console.log('descgr', rutaf)
        openURL(env.apiUrl + '/file2/' + rutaf[rutaf.length - 1])
      } else {
        rutaf = this.contrato.userBFile.split('/')
        console.log('descgr', rutaf)
        openURL(env.apiUrl + '/file2/' + rutaf[rutaf.length - 1])
      }
    },
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
          this.userA = res
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
            if (this.contrato.status === 3) {
              this.disableL = true
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
            if (this.contrato.status === 3) {
              this.disableL = true
            }
            if (this.contrato.userBCheck) {
              this.politicasUserB = this.contrato.userBCheck
              this.listoCB = this.contrato.userBCheck
            }
          }
          var disRuta = []
          if (this.contrato.status === 5 || this.contrato.status === 6) {
            this.disputa = this.contrato.disputa
            disRuta = this.contrato.disputa.picture.split('/')
            this.imgDisputa = env.apiUrl + '/file2/' + disRuta[disRuta.length - 1]
          }
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
          if (this.contrato.status === 5) {
            this.$q.dialog({
              message: 'El contrato tiene una disputa iniciada',
              persistent: true
            }).onOk(() => {

            })
          }
          if (this.contrato.status === 6) {
            this.$q.dialog({
              message: 'El contrato culmino por una disputa aprobada',
              persistent: true
            }).onOk(() => {

            })
          }
        }
      }).catch(error => {
        console.log(error)
      })
    },
    async sendDisputa () {
      console.log('Disputa', this.disputa)
      this.$v.disputa.title.$touch()
      this.$v.disputa.description.$touch()
      if (this.$v.disputa.title.$error || this.$v.disputa.description.$error || this.$v.disputaPart.$error) {
        this.$q.notify({
          message: 'Faltan Campos por Llenar',
          color: 'negative',
          textColor: 'white',
          icon: 'error'
        })
      } else {
        console.log('disputa', this.disputa)
        console.log('file Disputa', this.disputaPart)
        if (this.disputaPart) {
          var formData = new FormData()
          formData.append('files', this.disputaPart)
          formData.append('dat', JSON.stringify(this.disputa))
          this.$api.put('disputa_contrato/' + this.id, formData, {
            headers: {
              'Content-Type': undefined
            }
          }).then(res => {
            if (res) {
              this.$router.push('/contratos')
            }
          })
        }
      }
    }
  }
}
</script>
