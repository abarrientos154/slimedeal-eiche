<template>
  <div class="q-pa-sm q-mt-md">
       <q-stepper
      v-model="step"
      ref="stepper"
      color="primary"
      animated
    >
      <q-step
        :name="1"
        title="Paso 1"
        icon="settings"
        :done="step > 1"
      >
        <q-input
          class="row justify-center q-pb-sm"
          v-model="form.title"
          :error="$v.form.title.$error"
          error-message="Este campo es requerido"
          @blur="$v.form.title.$touch()"
          placeholder="Título del contrato"
          rounded
          outlined
        ></q-input>
        <q-input
          class="row justify-center q-pb-sm"
          v-model="form.description"
          :error="$v.form.description.$error"
          error-message="Este campo es requerido"
          @blur="$v.form.description.$touch()"
          placeholder="Descripcion del contrato"
          autogrow
          rounded
          outlined
        ></q-input>

        <q-file bottom-slots v-model="file" rounded outlined label="Subir Archivo" :error="$v.file.$error" error-message="Este campo es requerido" @blur="$v.file.$touch()">
                <template v-slot:prepend>
                  <q-icon name="cloud_upload" color="primary" @click.stop />
                </template>
                <template v-slot:append>
                  <q-icon name="close" color="negative" @click.stop="model = null" class="cursor-pointer" />
                </template>
        </q-file>
      </q-step>

      <q-step
        :name="2"
        title="Paso 2"
        icon="create_new_folder"
        :done="step > 2"
      >
        <q-select rounded outlined v-model="form.metodoPago" map-options emit-value :options="metodoPago" label="Escoge uno de nuestros métodos de pago" :error="$v.form.metodoPago.$error" error-message="Este campo es requerido" @blur="$v.form.metodoPago.$touch()" />
      </q-step>

      <q-step
        :name="3"
        title="Paso 3"
        icon="assignment"
        :done="step > 3"
      >
        <div class="text-h6">¿Quiénes van a participar?</div>
        <q-input
          class="row justify-center q-pb-sm"
          v-model="form.name"
          :error="$v.form.name.$error"
          error-message="Este campo es requerido"
          @blur="$v.form.name.$touch()"
          placeholder="Ingrese su nombre"
          rounded
          outlined
        ></q-input>
        <q-input
          class="row justify-center q-pb-sm"
          v-model="form.email"
          :error="$v.form.email.$error"
          error-message="Este campo es requerido"
          @blur="$v.form.email.$touch()"
          type="email"
          placeholder="Ingrese su correo"
          rounded
          outlined
        ></q-input>
      </q-step>

      <q-step
        :name="4"
        title="Paso 4"
        icon="add_comment"
      >
      <div>Su contrato ha sido enviado correctamente, recibiras una copia en tu correo electrónico validando que se inició tu proceso de contrato.</div><br>
        <div class="text-subtitle1">Tu contrato se encuentra en estado <strong>Abierto</strong></div>
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn v-if="step !== 3 && step !==4" @click="$refs.stepper.next()" color="primary" label="Siguiente" />
          <q-btn v-if="step === 4" color="primary" label="Finalizar" @click="$router.push('contratos')" v-close-popup />
          <q-btn v-if="step === 3" color="primary" @click="$refs.stepper.next(), onSubmit()" label="Enviar" :loading="loading" />
          <q-btn v-if="step > 1 && step < 4" flat color="primary" @click="$refs.stepper.previous()" label="Atras" class="q-ml-sm" />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      step: 1,
      form: {},
      file: null,
      loading: false,
      metodoPago: [
        { label: 'Paga usuario A', value: 1 }, { label: 'Paga usuario B', value: 2 }, { label: 'Ambos pagan', value: 3 }
      ]
    }
  },
  validations: {
    form: {
      title: { required },
      description: { required },
      metodoPago: { required },
      name: { required },
      email: { required }
    },
    file: { required }
  },
  methods: {
    async onSubmit () {
      console.log('form', this.form)
      this.$v.$touch()
      if (!this.$v.form.$error || !this.$v.file.$error) {
        this.$q.loading.show({
          message: 'Enviando Contrato, Por Favor Espere...'
        })
        if (this.file) {
          var formData = new FormData()
          formData.append('files', this.file)
          formData.append('dat', JSON.stringify(this.form))
          console.log(formData, 'formdata')
          await this.$api.post('contrato', formData, {
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
              this.$q.loading.hide()
            } else {
              this.$q.loading.hide()
            }
            this.$q.loading.hide()
          }).catch(error => {
            this.$q.loading.hide()
            console.log(error)
          })
        }
      }
    }
  }
}
</script>
