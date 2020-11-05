<template>
  <div class="row justify-between fullheight">
    <q-card
      class="bg-white shadow-13 row q-pb-none"
      style="width: 200px; height: 100%; min-height: 540px; max-height: 700px;"
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
        <div class="row justify-center q-pa-xs">
          <q-file v-if="metodoPagoA" bottom-slots v-model="file" outlined label="Archivo" >
            <q-img
              :src="imgA"
              basic
            ></q-img>
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
        <div v-if="metodoPagoA" class="q-py-md row justify-center">
            <q-btn
                no-caps
                color="primary"
                class="q-mr-md"
                >Cargar
            </q-btn>
        </div>
        <q-item v-ripple>
        <q-item-section avatar top>
          <q-checkbox v-model="politicasUserA" color="primary" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-caption">Estoy de acuerdo con las políticas establecidas por SlimeDeal.</q-item-label>
        </q-item-section>
      </q-item>
      <div class="q-pa-md row justify-center">
            <q-btn
                no-caps
                color="primary"
                class="q-mr-md"
                @click="enviar()"
                >Enviar
            </q-btn>
        </div>
        <div class="q-pa-md row justify-center">
            <q-btn
                no-caps
                color="primary"
                class="q-mr-md"
                @click="rechazar()"
                >Rechazar
            </q-btn>
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
        <div class="text-subtitle1 text-center">Usuario B</div>
        <div class="text-subtitle2 text-grey text-center">Correo Electronico</div>
        <div class="text-subtitle2 text-grey text-center">Telefono</div>
        <div class="row justify-center q-pa-xs">
            <q-file disable v-if="metodoPagoB" bottom-slots v-model="fileUserB" outlined label="Archivo" >
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
        <div v-if="metodoPagoB" class="q-pa-md row justify-center">
            <q-btn
                no-caps
                color="primary"
                class="q-mr-md"
                >Bajar
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
      baseu: '',
      imgA: 'noneimg.png',
      id: '',
      metodoPagoA: true,
      metodoPagoB: true,
      politicasUserA: false,
      politicasUserB: true,
      file: null,
      fileUserB: null,
      leftDrawerOpen: true,
      rightDrawerOpen: true,
      userA: {},
      userB: {},
      contrato: {},
      form: {}
    }
  },
  mounted () {
    this.baseu = env.apiUrl
    this.getUserA()
    if (this.$route.params.id) {
      this.id = this.$route.params.id
      console.log(this.id)
      this.getContrato(this.id)
    }
  },
  methods: {
    rechazar () {
      this.form.check = this.politicasUserA
      console.log('form', this.form)
      console.log('poli', this.politicasUserA)
      this.$q.dialog({
        title: 'Confirma',
        message: '¿Seguro deseas rechazar el contrato?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$api.put('update_check_alone/' + this.id, this.form).then(res => {
          if (res) {
            this.$router.push('/contratos')
          }
        })
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      })
    },
    enviar () {
      this.form.check = this.politicasUserA
      console.log('form', this.form)
      console.log('poli', this.politicasUserA)
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
            this.$router.push('/contratos')
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
            this.$router.push('/contratos')
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
    getUserA () {
      this.$api.get('user_info').then(res => {
        if (res) {
          this.userA = res
          console.log('Usuario ', this.userA)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    getContrato (id) {
      this.$api.get('contrato/' + id).then(res => {
        if (res) {
          this.contrato = res
          console.log('Contrato ', this.contrato)
          if (this.contrato.metodoPago === 1) {
            this.metodoPagoA = true
            this.metodoPagoB = false
            console.log('baseu', this.baseu)
            /* this.img = this.baseu + 'file/' + this.form.img_name */
          } else if (this.contrato.metodoPago === 2) {
            this.metodoPagoA = false
            this.metodoPagoB = true
          } else {
            this.metodoPagoA = true
            this.metodoPagoB = true
            this.imgA = this.baseu + '/file/' + this.contrato.filePath
            console.log('baseu', this.imgA)
          }
          if (this.contrato.userACheck) {
            this.politicasUserA = this.contrato.userACheck
          }
          if (this.contrato.userAFile) {
            this.file = this.contrato.userAFile
          }
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
