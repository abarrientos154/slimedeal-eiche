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
            <q-input class="q-mr-xs" v-model="form.name" rounded outlined label="Ingrese Nombres" />
          </div>
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-md">
            <q-input class="q-mr-xs" v-model="form.lastName" rounded outlined label="Ingrese Apellidos" />
          </div>
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-md">
            <q-input class="q-mr-xs" v-model="form.address" rounded outlined label="Ingrese Direccion" />
          </div>
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-md">
            <q-input class="q-mr-xs" v-model="form.phone" rounded outlined label="Ingrese Telefono" />
          </div>
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-md">
            <q-input class="q-mr-xs" v-model="form.email" type="email" rounded outlined label="Ingrese Correo" />
          </div>
           <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-md">
            <q-file bottom-slots v-model="file" rounded outlined label="Subir Archivo" >
                <template v-slot:prepend>
                  <q-icon name="cloud_upload" color="primary" @click.stop />
                </template>
                <template v-slot:append>
                  <q-icon name="close" color="negative" @click.stop="model = null" class="cursor-pointer" />
                </template>
              </q-file>
          </div>
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-md">
            <q-input class="q-mr-xs" v-model="form.portfolioAddress" rounded outlined label="Ingrese Direccion de Wallet de Bitcoin" />
          </div>
        </div>
        <q-separator inset/>
        <div class="text-subtitle2 row justify-center">Cuentas Bancarias</div>
        <div class="row">
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-md">
            <q-input class="q-mr-xs" v-model="form.titularName" rounded outlined label="Ingrese Nombre del Titular" />
          </div>
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-md">
            <q-input class="q-mr-xs" v-model="form.bankAccount" rounded outlined label="Ingrese La Cuenta Bancaria" />
          </div>
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-md">
            <q-input class="q-mr-xs" v-model="form.bankName" rounded outlined label="Ingrese Nombre del Banco" />
          </div>
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-md">
            <q-input class="q-mr-xs" v-model="form.accountType" rounded outlined label="Ingrese Tipo de Cuenta" />
          </div>
          <div class="col-xs-11 col-sm-6 col-md-6 col-lg-6 q-pb-md">
            <q-input class="q-mr-xs" v-model="form.additionalData" rounded outlined label="Ingrese Datos Adicionales" />
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
export default {
  data () {
    return {
      form: {},
      file: null,
      baseu: ''
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
        await this.$api.post('uploads', formData, {
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
            this.$router.go(-1)
            this.$q.loading.hide()
          }
        })
      }
    }
  }
}
</script>

<style>

</style>>
