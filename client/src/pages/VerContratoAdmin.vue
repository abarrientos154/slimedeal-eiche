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
        <div class="text-subtitle1 text-center">{{contrato.datos_userA ? contrato.datos_userA.name : 'Participante A'}}</div>
        <div class="text-subtitle2 text-grey text-center">{{contrato.datos_userA ? contrato.datos_userA.email : 'Correo de participante A'}}</div>
        <div class="text-subtitle2 text-grey text-center">{{contrato.datos_userA ? contrato.datos_userA.phone : 'Telefono de participante A'}}</div>
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
                @click="download('a')"
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
                    @click="seeDialog()"
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

    <q-dialog v-model="seeDisputa" persistent>
      <q-card style="width: 100%">
        <q-card-section class="row justify-between">
          <div class="text-h5">Disputa</div>
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section class="row items-center q-pa-sm">
          <q-card class="shadow-13 q-pa-md q-ma-md" style="width: 100%">
            <q-field rounded outlined class="col-12 row justify-center q-pb-lg" label="Usuario solicitante" stack-label>
              <template v-slot:control>
                <div class="self-center full-width no-outline" tabindex="0">{{disputa.user.name + ' ' + disputa.user.lastName}}</div>
              </template>
            </q-field>
            <q-field rounded outlined class="col-12 row justify-center q-pb-lg" label="Título de la disputa" stack-label>
              <template v-slot:control>
                <div class="self-center full-width no-outline" tabindex="0">{{disputa.title}}</div>
              </template>
            </q-field>
            <q-input
                  class="col-12 row justify-center q-pb-lg text-black"
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
            <div v-if="contrato.status === 5" class="col-12 row justify-around q-ma-md">
              <div>
                <q-btn color="red" label="Rechazar" @click="disputaAction('r')" />
              </div>
              <div>
                <q-btn color="primary" label="Aprobar" @click="disputaAction('a')" />
              </div>
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

    <q-dialog v-model="aprobarCont" persistent>
      <q-card>
        <q-card-section class="row justify-between">
          <div class="text-subtitle1">Fecha hasta la cual estará vigente el contrato</div>
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section class="row items-center q-pa-sm">
          <q-input
                :disable="vigenciaIndefinida"
                class="col-12 row justify-center q-pb-lg"
                label="Ingrese fecha"
                v-model="form.fechaV"
                :error="$v.form.fechaV.$error"
                error-message="Este campo es requerido"
                @blur="$v.form.fechaV.$touch()"
                rounded
                outlined mask="date" :rules="['date']">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date  v-model="form.fechaV">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Cerrar" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
           <q-checkbox v-model="vigenciaIndefinida" label="Vigencia indefinida" color="primary" />
           <div class="col-12 row justify-center">
            <q-btn color="primary" label="Guardar" @click="aprobarContrato()" />
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
        <div class="text-subtitle1 text-center">{{contrato.datos_userB ? contrato.datos_userB.name : contrato.name}}</div>
        <div class="text-subtitle2 text-grey text-center">{{contrato.datos_userB ? contrato.datos_userB.email : contrato.email}}</div>
        <div class="text-subtitle2 text-grey text-center">{{contrato.datos_userB ? contrato.datos_userB.phone : 'Telefono de participante B'}}</div>
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
                @click="download('b')"
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
  </div>
</template>

<script>
import moment from 'moment'
import env from '../env'
import { openURL } from 'quasar'
import pdf from 'vue-pdf'
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'MainLayout',
  components: { pdf },
  props: {
    selec: { default: 'Fecha' }
  },
  data () {
    return {
      id: '',
      pdf: '',
      today: moment(),
      vence: false,
      seeDisputa: false,
      aprobarCont: false,
      vigenciaIndefinida: false,
      imgComprobanteA: '',
      imgComprobanteB: '',
      perfilA: '',
      perfilB: '',
      imgDisputa: '',
      metodoPagoA: true,
      metodoPagoB: true,
      politicasUserA: false,
      politicasUserB: false,
      file: null,
      fileUserB: null,
      leftDrawerOpen: true,
      rightDrawerOpen: true,
      contrato: {},
      seeEstatus: false,
      form: {},
      disputa: {
        title: '',
        description: ''
      }
    }
  },
  computed: {
    layout () {
      return this.$q.screen.lt.sm ? 'dense' : (this.$q.screen.lt.md ? 'comfortable' : 'loose')
    }
  },
  validations: {
    form: {
      fechaV: { required }
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
  mounted () {
    if (this.$route.params.id) {
      this.id = this.$route.params.id
      this.getContrato(this.id)
    }
  },
  methods: {
    async download (val) {
      var rutaf = []
      if (val === 'a') {
        rutaf = this.contrato.userAFile.split('/')
        console.log('descgr', rutaf)
        openURL(env.apiUrl + '/file2/' + rutaf[rutaf.length - 1])
      } else {
        rutaf = this.contrato.userBFile.split('/')
        console.log('descgr', rutaf)
        openURL(env.apiUrl + '/file2/' + rutaf[rutaf.length - 1])
      }
    },
    aprobarContrato () {
      if (this.vigenciaIndefinida) {
        this.form.fechaV = null
      }
      this.$api.put('actualizar_contrato/' + this.id, this.form).then(res => {
        if (res) {
          this.$router.push('/inicio_admin')
        }
      })
    },
    disputaAction (accion) {
      if (accion === 'a') {
        this.$q.dialog({
          title: 'Confirma',
          message: '¿Seguro deseas aprobar la disputa?',
          cancel: true,
          persistent: true
        }).onOk(() => {
          this.$api.put('admin_disputa/' + this.id, { dat: accion }).then(res => {
            if (res) {
              this.$router.push('/inicio_admin')
            }
          })
        }).onCancel(() => {
          // console.log('>>>> Cancel')
        })
      } else {
        this.$q.dialog({
          title: 'Confirma',
          message: '¿Seguro deseas rechazar la disputa?',
          cancel: true,
          persistent: true
        }).onOk(() => {
          this.$api.put('admin_disputa/' + this.id, { dat: accion }).then(res => {
            if (res) {
              this.$router.push('/inicio_admin')
            }
          })
        }).onCancel(() => {
          // console.log('>>>> Cancel')
        })
      }
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
            this.$router.push('/inicio_admin')
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
          this.perfilA = env.apiUrl + '/file3/' + this.contrato.datos_userA._id
          this.perfilB = env.apiUrl + '/file3/' + this.contrato.datos_userB._id
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
          var disRuta = []
          if (this.contrato.status === 5 || this.contrato.status === 6) {
            this.disputa = this.contrato.disputa
            disRuta = this.contrato.disputa.picture.split('/')
            this.imgDisputa = env.apiUrl + '/file2/' + disRuta[disRuta.length - 1]
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
              message: 'El contrato culminó por una disputa aprobada',
              persistent: true
            }).onOk(() => {

            })
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
    },
    seeDialog () {
      this.aprobarCont = true
      this.form = {}
    }
  }
}
</script>
