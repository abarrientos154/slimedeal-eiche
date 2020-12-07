<template>
  <div class="row justify-between fullheight">
    <q-card
      class="bg-white shadow-13 row q-pb-none"
      style="width: 200px; height: 100%; min-height: 900px; max-height: 1000px;"
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
      </q-card-section>
    </q-card>

    <div class="col column">
      <div class="col bg-white row q-pb-none">
        <pdf :src="pdf" style="width: 100%"></pdf>
      </div>

      <div class="row justify-center">
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
                icon="done_all"
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
                icon="done_all"
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
                v-if="contrato.status == 5"
                title="Estado Vencido"
                side="right"
                icon="done_all"
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
    <div class="row justify-center">
            <q-img
                style="width:70px"
                src="app-logo-128x128.png"
            ></q-img>
        </div>
        <div class="text-subtitle1 text-center">{{contrato.datos_userB != null ? contrato.datos_userB.name : contrato.name}}</div>
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
      aprobarCont: false,
      vigenciaIndefinida: false,
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
      seeEstatus: false,
      form: {}
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
