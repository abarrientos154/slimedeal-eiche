<template>
  <q-layout>
      <q-page class="row bg-grey-4">
        <div class="col column items-center justify-center">
            <q-card class="shadow-13" style="width:70%; height:70%">
              <q-card-section class="absolute-center" style="width:100%; height:100%">
                <div class="row justify-center">
                  <q-img
                    style="width:120px"
                    src="app-logo-128x128.png"
                  ></q-img>
                </div>
                <div class="row justify-center text-subtitle1 text-grey">Ingresa a la plataforma</div>
                <div class="row justify-center q-py-md">
                <q-input
                  style="margin: auto;
                  width: calc(50% - 90px);
                  min-width: 200px;
                  max-width: 300px;"
                  class="q-ma-sm row justify-center"
                  type="email"
                  v-model="form.email"
                  placeholder="Ingrese su email"
                  autofocus
                  outlined
                  rounded
                >
                  <template v-slot:append>
                    <q-icon name="mail"></q-icon>
                  </template>
                </q-input>
                </div>

                <div class="row justify-center">
                <q-input
                  style="margin: auto;
                  width: calc(50% - 90px);
                  min-width: 200px;
                  max-width: 300px;"
                  class="q-ma-sm row justify-center"
                  :type="isPwd ? 'password' : 'text'"
                  v-model="form.password"
                  placeholder="Ingrese su contraseña"
                  rounded
                  outlined
                >
                </q-input>
                </div>
                <div class="row justify-center q-pa-md">
                  <q-btn
                    rounded
                    icon-right="arrow_right"
                    color="primary"
                    class="q-mr-md"
                    :loading="loading"
                    @click="onSubmit()"
                  >Ingresar
                    <template v-slot:loading>
                      <q-spinner-hourglass class="on-center" />
                      Loading...
                    </template>
                  </q-btn>
                </div>
                <div class="row justify-center">
                  <q-btn label="registrate aqui" dense flat />
                </div>
                <div class="row absolute-bottom justify-center q-pa-md">
                  <q-btn
                    label="Términos y condiciones de uso"
                    flat
                    class="q-px-md"
                    dense
                    text-color="grey"
                    no-caps
                  />
                  <q-btn
                    label="Página web"
                    flat
                    dense
                    text-color="grey"
                    no-caps
                  />
                  <q-btn
                    label="Desarrollado por Eiche"
                    flat
                    class="q-px-md"
                    dense
                    text-color="grey"
                    no-caps
                  />
                </div>
              </q-card-section>
            </q-card>
        </div>
      </q-page>
  </q-layout>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
export default {
  data () {
    return {
      form: {},
      isPwd: true,
      loading: false,
      lorem: 'rfrefrtfretfr'
    }
  },
  methods: {
    ...mapMutations('generals', ['login']),
    ...mapActions('generals', ['saveUser']),
    onSubmit () {
      this.loading = true
      this.$q.loading.show({
        message: 'Iniciando sesión'
      })
      this.$api.post('login', this.form).then(res => {
        if (res) {
          this.login(res)
          this.$router.push('menu')
        } else {
          console.log('error de ususario')
          this.loading = false
          this.$q.loading.hide()
        }
        this.$q.loading.hide()
      })
    }
  }
}
</script>
