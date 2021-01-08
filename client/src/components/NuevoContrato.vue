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
          hint="¿Como se llamara este Contrato?"
          rounded
          outlined
        ></q-input>
        <q-input
          class="row justify-center q-pb-sm q-mt-lg"
          v-model="form.description"
          :error="$v.form.description.$error"
          error-message="Este campo es requerido"
          @blur="$v.form.description.$touch()"
          placeholder="Descripcion del contrato"
          type="textarea"
          hint="Danos una breve descripción del Contrato, quienes participan y la causa del Contrato"
          rounded
          outlined
        ></q-input>

        <q-file class="q-mt-xl" accept=".pdf" bottom-slots v-model="file" rounded outlined label="Adjuntar contrato PDF" :error="$v.file.$error" error-message="Este campo es requerido" @blur="$v.file.$touch()">
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
        <q-select rounded outlined v-model="form.metodoPago" map-options emit-value :options="metodoPago" label="Escoge las condiciones de pago del contrato" :error="$v.form.metodoPago.$error" error-message="Este campo es requerido" @blur="$v.form.metodoPago.$touch()" />
        <q-input
          v-model.number="form.monto"
          type="number"
          rounded
          outlined
          label="Ingrese un monto"
          :error="$v.form.monto.$error"
          error-message="Este campo es requerido"
          @blur="$v.form.monto.$touch()"
        />
      </q-step>

      <q-step
        :name="3"
        title="Paso 3"
        icon="assignment"
        :done="step > 3"
      >
        <div class="text-h6">¿Quien sera el otro participante o contraparte?</div>
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

      <q-step :name="4" title="Paso 4" icon="add_comment">
      <div>
        <p>La invitación a este contrato fue enviada exitosamente. Recibirás una copia en tu correo confirmando que se inició un contrato en SlimeDeal. Revisa tu bandeja de correo no deseado en caso de no recibirla.</p>
        <p>Debes esperar siempre la respuesta de tu contraparte. Si tu invitado no tiene cuenta en SlimeDeal no te preocupes. Podrá crearse una cuenta y firmar su parte del contrato.</p>
        <p>El equipo de SlimeDeal tardara un máximo de 48 horas hábiles para tokenizar y aprobar un contrato.</p>
        <p>Recuerda que, si es un contrato donde debes pagar tu o ambas partes, debes adjuntar tu comprobante de pago a una de nuestras cuentas seguras de SlimeDeal. No nos hacemos responsables por dinero enviado a otras cuentas. Nuestras cuentas y tokens se encuentran en el apartado de cuentas oficiales de SlimeDeal</p>
        <p>Revisa frecuentemente el estado del contrato. En este momento se encuentra Abierto.</p>
        <p>Recuerda que, para finalizar un contrato, debes enviarnos tu aceptación por nuestros correos de atención <u class="text-primary">revisiones@slimedeal.com</u> para que nuestro equipo se ponga en contacto con ambas partes y podamos liberar el dinero a el beneficiario del contrato.</p>
        <p>Toda comunicación con el equipo de SlimeDeal debe darse por correo electrónico y el equipo no contestara correos de cuentas no registradas en nuestro sistema. En caso de inconformidad con tu contraparte, envía un correo con pruebas (captures, muestras, argumentos) para que nuestro equipo pueda contactar a tu contraparte y solucionar lo antes posible el desacuerdo contractual.</p>
        <p>Tu contrato y tu dinero están seguros en nuestras manos. <strong>SlimeDeal lo hace posible por ti</strong> </p>
      </div>
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn v-if="step !== 2 && step !==3 && step !== 4" @click="verify(1)" color="primary" label="Siguiente" />
          <q-btn v-if="step !== 1 && step !== 3 && step !==4" @click="verify(2)" color="primary" label="Siguiente" />
          <q-btn v-if="step === 4" color="primary" label="Finalizar" @click="$router.push('contratos')" v-close-popup />
          <q-btn v-if="step === 3" color="primary" @click="onSubmit()" label="Enviar" :loading="loading" />
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
      form: {
        title: '',
        description: '',
        metodoPago: '',
        name: '',
        email: ''
      },
      file: null,
      loading: false,
      metodoPago: [
        { label: 'Pagas tú', value: 1 }, { label: 'Paga tu invitado', value: 2 }, { label: 'Ambos pagan', value: 3 }
      ]
    }
  },
  validations: {
    form: {
      title: { required },
      description: { required },
      metodoPago: { required },
      name: { required },
      email: { required },
      monto: { required }
    },
    file: { required }
  },
  methods: {
    verify (val) {
      if (val === 1) {
        this.$v.form.title.$touch()
        this.$v.form.description.$touch()
        this.$v.file.$touch()
        if (this.$v.form.title.$error || this.$v.file.$error || this.$v.form.description.$error) {
          this.$q.notify({
            message: 'Faltan Campos por Llenar',
            color: 'negative',
            textColor: 'white',
            icon: 'error'
          })
        } else {
          this.$refs.stepper.next()
        }
      } else {
        this.$v.form.metodoPago.$touch()
        this.$v.form.monto.$touch()
        if ((this.$v.form.metodoPago.$error || this.$v.form.monto.$error)) {
          this.$q.notify({
            message: 'Faltan Campos por Llenar',
            color: 'negative',
            textColor: 'white',
            icon: 'error'
          })
        } else {
          this.$refs.stepper.next()
        }
      }
    },
    async onSubmit () {
      console.log('form', this.form)
      this.$v.form.name.$touch()
      this.$v.form.email.$touch()
      if (this.$v.form.name.$error || this.$v.form.email.$error || this.$v.file.$error) {
        this.$q.notify({
          message: 'Faltan Campos por Llenar',
          color: 'negative',
          textColor: 'white',
          icon: 'error'
        })
      } else {
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
          this.$refs.stepper.next()
        }
      }
    }
  }
}
</script>
