<template>
  <div>
    <q-card class="shadow-2 q-pa-sm q-ma-md">
      <q-card-section>
        <div class="text-h6 row justify-center">Registro</div>
        <div class="text-subtitle2 row justify-center">Ingrese sus Datos</div>
      </q-card-section>
      <q-separator inset />
      <q-card-section>
        <div class="row">
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-md">
            <q-input class="q-mr-xs" placeholder="Pedro" v-model="form.name" rounded outlined label="Ingrese Nombres" :error="$v.form.name.$error" error-message="Este campo es requerido"  @blur="$v.form.name.$touch()"/>
          </div>
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-md">
            <q-input class="q-mr-xs" placeholder="Rodríguez" v-model="form.lastName" rounded outlined label="Ingrese Apellidos" :error="$v.form.lastName.$error" error-message="Este campo es requerido" @blur="$v.form.lastName.$touch()"/>
          </div>
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-md">
            <q-input class="q-mr-xs" placeholder="Chile" v-model="form.country" rounded outlined label="Ingrese País" :error="$v.form.country.$error" error-message="Este campo es requerido" @blur="$v.form.country.$touch()"/>
          </div>
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-md">
            <q-input class="q-mr-xs" placeholder="4467 de la calle Thompson" v-model="form.address" rounded outlined label="Ingrese Direccion" :error="$v.form.address.$error" error-message="Este campo es requerido" @blur="$v.form.address.$touch()"/>
          </div>
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-md">
            <q-input class="q-mr-xs" placeholder="+56 12345678901" v-model="form.phone" rounded outlined label="Ingrese Telefono" :error="$v.form.phone.$error" error-message="Este campo es requerido" @blur="$v.form.phone.$touch()"/>
          </div>
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-md">
            <q-input class="q-mr-xs" placeholder="correo@gmail.com" v-model="form.email" type="email" rounded outlined label="Ingrese Correo" :error="$v.form.email.$error" error-message="Este campo es requerido" @blur="$v.form.email.$touch()"/>
          </div>
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-md">
            <q-input class="q-mr-xs" v-model="password" :type="isPwd1 ? 'password' : 'text'" rounded outlined label="Ingrese Contraseña" :error="$v.password.$error" error-message="Este campo es requerido" @blur="$v.password.$touch()">
              <template v-slot:append>
                <q-icon
                  :name="isPwd1 ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd1 = !isPwd1"
                />
              </template>
            </q-input>
          </div>
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-md">
            <q-input class="q-mr-xs" v-model="repeatPassword" :type="isPwd2 ? 'password' : 'text'" rounded outlined label="Repetir Contraseña" :error="$v.repeatPassword.$error" error-message="Este campo es requerido" @blur="$v.repeatPassword.$touch()">
              <template v-slot:append>
                <q-icon
                  :name="isPwd2 ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd2 = !isPwd2"
                />
              </template>
            </q-input>
          </div>
           <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-md">
            <q-file bottom-slots v-model="file" accept=".jpg, image/*" rounded outlined label="Documento de identidad" hint="cedula de identidad, pasaporte o licencia de conducir" :error="$v.file.$error" error-message="Este campo es requerido" @blur="$v.file.$touch()">
              <template v-slot:prepend>
                <q-icon name="cloud_upload" color="primary" @click.stop />
              </template>
              <template v-slot:append>
                <q-icon name="close" color="negative" @click.stop="model = null" class="cursor-pointer" />
              </template>
            </q-file>
          </div>
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-md">
            <q-file bottom-slots accept=".jpg, image/*" v-model="perfilFile" rounded outlined hint="Debe coincidir con la persona del Documento de Identidad" label="Subir Foto de Perfil" :error="$v.perfilFile.$error" error-message="Este campo es requerido" @blur="$v.perfilFile.$touch()" @input="test">
              <template v-slot:prepend>
                <q-avatar>
                  <img  :src="imgPerfil ? imgPerfil : 'noimg.png'">
                </q-avatar>
              </template>
              <template v-slot:append>
                <q-icon name="close" color="negative" @click.stop="perfilFile = null" class="cursor-pointer" />
              </template>
            </q-file>
          </div>
        </div>
        <div class="text-subtitle2 row justify-center">Metodos de pago</div>
        <div class="q-gutter-sm">
          <q-checkbox v-model="tipoCuenta" val="criptomonedas" label="Criptomonedas" @input="verificacion()" />
          <q-checkbox v-model="tipoCuenta" val="bancaria" label="Cuenta bancaria" @input="verificacion()" />
          <q-checkbox v-model="tipoCuenta" val="tarjeta" label="Tarjeta" @input="verificacion()" />
          <div v-if="mensaje">
            <div class="text-subtitle2 row justify-center text-negative">Debe seleccionar un metodo de pago</div>
          </div>
        </div>
        <div v-if="seleccionado('criptomonedas')">
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-md">
            <q-input class="q-mr-xs" v-model="portfolioAddress" rounded outlined label="Ingrese su Wallet de Bitcoin personal" :error="$v.form.portfolioAddress.$error" error-message="Este campo es requerido" @blur="$v.form.portfolioAddress.$touch()"/>
          </div>
        </div>
        <q-separator inset/>
        <div v-if="seleccionado('bancaria')">
          <div class="text-subtitle2 row justify-center q-my-md">Cuentas Bancarias</div>
          <div class="row">
            <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-md">
              <q-input class="q-mr-xs" v-model="dataBancaria.titularName" rounded outlined label="Ingrese Nombre del Titular" :error="$v.dataBancaria.titularName.$error" error-message="Este campo es requerido" @blur="$v.dataBancaria.titularName.$touch()"/>
            </div>
            <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-md">
              <q-input class="q-mr-xs" v-model="dataBancaria.bankAccount" rounded outlined label="Ingrese Número de Cuenta Bancaria" :error="$v.dataBancaria.bankAccount.$error" error-message="Este campo es requerido" @blur="$v.dataBancaria.bankAccount.$touch()"/>
            </div>
            <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-md">
              <q-input class="q-mr-xs" v-model="dataBancaria.bankName" rounded outlined label="Ingrese Nombre del Banco" :error="$v.dataBancaria.bankName.$error" error-message="Este campo es requerido" @blur="$v.dataBancaria.bankName.$touch()"/>
            </div>
            <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-md">
              <q-input class="q-mr-xs" v-model="dataBancaria.accountType" rounded outlined label="Ingrese Tipo de Cuenta" :error="$v.dataBancaria.accountType.$error" error-message="Este campo es requerido" @blur="$v.dataBancaria.accountType.$touch()"/>
            </div>
            <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-md">
              <q-input class="q-mr-xs" v-model="dataBancaria.additionalData" rounded outlined label="Ingrese Datos Adicionales" :error="$v.dataBancaria.additionalData.$error" error-message="Este campo es requerido" @blur="$v.dataBancaria.additionalData.$touch()"/>
            </div>
          </div>
        </div>
        <q-item v-ripple>
          <q-item-section avatar top>
            <q-checkbox v-model="politicasUser" color="primary" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-caption">Acepto los terminos y condiciones establecidos por SlimeDeal.</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn class="glossy" rounded color="primary" label="Registrar" size="20px" @click="guardar"/>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import env from '../../src/env'
import { required, sameAs, email, requiredIf } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      tipoCuenta: [],
      form: {},
      dataBancaria: {},
      portfolioAddress: '',
      error: false,
      mensaje: false,
      politicasUser: false,
      isPwd1: true,
      isPwd2: true,
      file: null,
      perfilFile: null,
      baseu: '',
      password: '',
      repeatPassword: '',
      imgPerfil: ''
    }
  },
  validations: {
    form: {
      name: { required },
      lastName: { required },
      address: { required },
      country: { required },
      phone: { required },
      email: { required, email },
      portfolioAddress: {
        required: requiredIf(function () {
          return this.seleccionado('Criptomonedas')
        })
      }
    },
    dataBancaria: {
      titularName: {
        required: requiredIf(function () {
          return this.seleccionado('bancaria')
        })
      },
      bankAccount: {
        required: requiredIf(function () {
          return this.seleccionado('bancaria')
        })
      },
      bankName: {
        required: requiredIf(function () {
          return this.seleccionado('bancaria')
        })
      },
      accountType: {
        required: requiredIf(function () {
          return this.seleccionado('bancaria')
        })
      },
      additionalData: {
        required: requiredIf(function () {
          return this.seleccionado('bancaria')
        })
      }
    },
    password: { required },
    repeatPassword: {
      sameAsPassword: sameAs('password')
    },
    file: { required },
    perfilFile: { required }
  },
  mounted () {
    this.baseu = env.apiUrl
  },
  methods: {
    seleccionado (valor) {
      const index = this.tipoCuenta.findIndex(v => v === valor)
      if (index >= 0) {
        return true
      } else {
        return false
      }
    },
    test () {
      console.log(this.perfilFile, 'file')
      if (this.perfilFile) { this.imgPerfil = URL.createObjectURL(this.perfilFile) }
    },
    verificacion () {
      if (this.tipoCuenta.length > 0) {
        this.mensaje = false
      } else {
        this.mensaje = true
      }
    },
    async guardar () {
      this.$v.$touch()
      console.log(this.$v.form.$error, this.$v.password.$error, this.$v.repeatPassword.$error, this.$v.file.$error, this.tipoCuenta.length, this.$v.perfilFile.$error, 'verificaaa')
      if (!this.$v.form.$error && !this.$v.password.$error && !this.$v.repeatPassword.$error && !this.$v.file.$error && this.tipoCuenta.length > 0 && !this.$v.perfilFile.$error) {
        if (this.politicasUser) {
          this.$q.loading.show({
            message: 'Guardando Sus Datos, Por Favor Espere...'
          })
          if (this.criptomonedas) {
            this.form.portfolioAddress = this.portfolioAddress
          }
          if (this.dataBancaria) {
            this.form.portfolioAddress = this.portfolioAddress
            this.form.titularName = this.dataBancaria.titularName
            this.form.bankAccount = this.dataBancaria.bankAccount
            this.form.bankName = this.dataBancaria.bankName
            this.form.accountType = this.dataBancaria.accountType
            this.form.additionalData = this.dataBancaria.additionalData
          }
          if (this.file) {
            this.form.tipoCuenta = this.tipoCuenta
            this.form.password = this.password
            var formData = new FormData()
            var files = []
            files[0] = this.file
            files[1] = this.perfilFile
            formData.append('files', files[0])
            formData.append('filesProfile', files[1])
            formData.append('dat', JSON.stringify(this.form))
            console.log(formData, 'formdata')
            await this.$api.post('register_upload', formData, {
              headers: {
                'Content-Type': undefined
              }
            }).then((res) => {
              if (res.error) {
                this.$q.notify({
                  message: res.msg,
                  color: 'warning',
                  type: 'negative'
                })
                this.$q.loading.hide()
              } else if (res) {
                this.$router.push('/')
                this.$q.notify({
                  message: 'Registrado Con Exito',
                  color: 'positive',
                  type: 'positive'
                })
                this.$q.loading.hide()
              } else {
                this.$q.loading.hide()
              }
              this.$q.loading.hide()
            })
          }
        } else {
          this.$q.dialog({
            message: 'Debes aceptar los términos y condiciones de SlimeDeal para continuar',
            persistent: true
          }).onOk(() => {
          })
        }
      } else {
        this.mensaje = true
      }
      this.$q.loading.hide()
    }
  }
}
</script>

<style>

</style>>
