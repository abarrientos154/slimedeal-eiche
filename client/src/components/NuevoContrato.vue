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
          placeholder="Título del contrato"
          rounded
          outlined
        ></q-input>
        <q-input
          class="row justify-center q-pb-sm"
          v-model="form.description"
          placeholder="Descripcion del contrato"
          autogrow
          rounded
          outlined
        ></q-input>
        <q-input
          class="row justify-center q-pb-sm"
          v-model="form.file"
          placeholder="Subir el documento"
          rounded
          outlined
        ></q-input>
      </q-step>

      <q-step
        :name="2"
        title="Paso 2"
        icon="create_new_folder"
        :done="step > 2"
      >
        <q-select rounded outlined v-model="form.metodoPago" :options="metodoPago" label="Escoge uno de nuestros métodos de pago" />
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
          placeholder="Ingrese su nombre"
          rounded
          outlined
        ></q-input>
        <q-input
          class="row justify-center q-pb-sm"
          v-model="form.email"
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
          <q-btn v-if="step === 4" color="primary" label="Finalizar" v-close-popup />
          <q-btn v-if="step === 3" color="primary" @click="$refs.stepper.next(), onSubmit()" label="Enviar" :loading="loading" />
          <q-btn v-if="step > 1 && step < 4" flat color="primary" @click="$refs.stepper.previous()" label="Atras" class="q-ml-sm" />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </div>
</template>

<script>
export default {
  data () {
    return {
      step: 1,
      form: {},
      loading: false,
      metodoPago: [
        { label: 'Paga usuario A', value: 1 }, { label: 'Paga usuario B', value: 2 }, { label: 'Ambos pagan', value: 3 }
      ]
    }
  },
  methods: {
    onSubmit () {
      console.log('Enviado')
    }
  }
}
</script>
