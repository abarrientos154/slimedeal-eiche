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
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {}
    }
  }
}
</script>

<style>

</style>>
