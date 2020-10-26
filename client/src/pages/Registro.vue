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
            <q-input class="q-mr-xs" v-model="form.name" rounded outlined label="Ingrese Nombres" :error="$v.form.name.$error" error-message="Este campo es requerido"  @blur="$v.form.name.$touch()"/>
          </div>
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-md">
            <q-input class="q-mr-xs" v-model="form.lastName" rounded outlined label="Ingrese Apellidos" :error="$v.form.lastName.$error" error-message="Este campo es requerido" @blur="$v.form.lastName.$touch()"/>
          </div>
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-md">
            <q-input class="q-mr-xs" v-model="form.address" rounded outlined label="Ingrese Direccion" :error="$v.form.address.$error" error-message="Este campo es requerido" @blur="$v.form.address.$touch()"/>
          </div>
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-md">
            <q-input class="q-mr-xs" v-model="form.phone" rounded outlined label="Ingrese Telefono" :error="$v.form.phone.$error" error-message="Este campo es requerido" @blur="$v.form.phone.$touch()"/>
          </div>
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-md">
            <q-input class="q-mr-xs" v-model="form.email" type="email" rounded outlined label="Ingrese Correo" :error="$v.form.email.$error" error-message="Este campo es requerido" @blur="$v.form.email.$touch()"/>
          </div>
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-md">
            <q-input class="q-mr-xs" v-model="password" type="password" rounded outlined label="Ingrese Contraseña" :error="$v.password.$error" error-message="Este campo es requerido" @blur="$v.password.$touch()"/>
          </div>
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-md">
            <q-input class="q-mr-xs" v-model="repeatPassword" type="password" rounded outlined label="Repetir Contraseña" :error="$v.repeatPassword.$error" error-message="Este campo es requerido" @blur="$v.repeatPassword.$touch()"/>
          </div>
           <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-md">
            <q-file bottom-slots v-model="file" rounded outlined label="Subir Archivo" :error="$v.file.$error" error-message="Este campo es requerido" @blur="$v.file.$touch()">
                <template v-slot:prepend>
                  <q-icon name="cloud_upload" color="primary" @click.stop />
                </template>
                <template v-slot:append>
                  <q-icon name="close" color="negative" @click.stop="model = null" class="cursor-pointer" />
                </template>
              </q-file>
          </div>
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-md">
            <q-input class="q-mr-xs" v-model="form.portfolioAddress" rounded outlined label="Ingrese Direccion de Wallet de Bitcoin" :error="$v.form.portfolioAddress.$error" error-message="Este campo es requerido" @blur="$v.form.portfolioAddress.$touch()"/>
          </div>
        </div>
        <q-separator inset/>
        <div class="text-subtitle2 row justify-center">Cuentas Bancarias</div>
        <div class="row">
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-md">
            <q-input class="q-mr-xs" v-model="form.titularName" rounded outlined label="Ingrese Nombre del Titular" :error="$v.form.titularName.$error" error-message="Este campo es requerido" @blur="$v.form.titularName.$touch()"/>
          </div>
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-md">
            <q-input class="q-mr-xs" v-model="form.bankAccount" rounded outlined label="Ingrese La Cuenta Bancaria" :error="$v.form.bankAccount.$error" error-message="Este campo es requerido" @blur="$v.form.bankAccount.$touch()"/>
          </div>
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-md">
            <q-input class="q-mr-xs" v-model="form.bankName" rounded outlined label="Ingrese Nombre del Banco" :error="$v.form.bankName.$error" error-message="Este campo es requerido" @blur="$v.form.bankName.$touch()"/>
          </div>
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-md">
            <q-input class="q-mr-xs" v-model="form.accountType" rounded outlined label="Ingrese Tipo de Cuenta" :error="$v.form.accountType.$error" error-message="Este campo es requerido" @blur="$v.form.accountType.$touch()"/>
          </div>
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-md">
            <q-input class="q-mr-xs" v-model="form.additionalData" rounded outlined label="Ingrese Datos Adicionales" :error="$v.form.additionalData.$error" error-message="Este campo es requerido" @blur="$v.form.additionalData.$touch()"/>
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn class="glossy" rounded color="primary" label="Registrar" size="20px" @click="guardar"/>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import env from '../../src/env'
import { required, sameAs, email } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      form: {},
      file: null,
      baseu: '',
      password: '',
      repeatPassword: ''
    }
  },
  validations: {
    form: {
      name: { required },
      lastName: { required },
      address: { required },
      phone: { required },
      email: { required, email },
      portfolioAddress: { required },
      titularName: { required },
      bankAccount: { required },
      bankName: { required },
      accountType: { required },
      additionalData: { required }
    },
    password: { required },
    repeatPassword: {
      sameAsPassword: sameAs('password')
    }
  },
  mounted () {
    this.baseu = env.apiUrl
  },
  methods: {
    async guardar () {
      this.$q.loading.show({
        message: 'Guardando Sus Datos, Por Favor Espere...'
      })
      if (this.file) {
        var formData = new FormData()
        formData.append('files', this.file)
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
            // this.$router.go(-1)
            this.$q.loading.hide()
          } else {
            this.$q.loading.hide()
          }
          this.$q.loading.hide()
        })
      }
    }
  }
}
</script>

<style>

</style>>
