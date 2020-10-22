<template>
  <q-layout>
      <q-page class="row bg-grey-4">
        <div class="col column items-center justify-center">
            <q-card class="shadow-13" style="width:80%; height:70%">
              <q-card-section horizontal class="row col justify-around">
                <q-card-section class="full-width" style="height:520px; background-image: url(statics/fonogris.jpeg); background-size: 100% 100%; background-repeat:no-repeat">
                  <div class="absolute-center q-pr-lg" style="width:100%">
                  <div class="q-pr-md row justify-end">
                  <q-img
                    style="width:100px"
                    src="app-logo-128x128.png"
                  ></q-img>
                  </div>
                  <div class="q-pr-md q-pb-lg text-h6 text-white text-right">Mercedes</div>
                  <q-separator dark inset />
                  <div class="q-pt-md q-pr-md text-subtitle1 text-grey-4 text-right text-bold">Owners</div>
                  <div class="q-pr-md text-subtitle1 text-white text-right text-bold">Cuestionnaire</div>
                  </div>
                  <div class="row absolute-bottom justify-end text-white q-pa-lg">Desarrollado por Eiche</div>
                </q-card-section>
              <q-card-section class="full-width" style="height:520px">
                <div class="absolute-center q-pl-lg" style="width:100%">
                <div class="q-pl-lg text-subtitle1 text-grey">Ingresa a la plataforma</div>
                <q-input
                  style="width:40%"
                  class="q-ma-sm"
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

                <q-input
                  style="width:40%"
                  class="q-ma-sm"
                  :type="isPwd ? 'password' : 'text'"
                  v-model="form.password"
                  placeholder="Ingrese su contraseña"
                  rounded
                  outlined
                >
                </q-input>
                <div class="q-pa-md">
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
                </div>
                <div class="row absolute-bottom q-pa-md">
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
                </div>
              </q-card-section>
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
      // this.loading = true
      /* this.$q.loading.show({
        message: 'Iniciando sesión'
      }) */
      /* this.$api.post('login', this.form).then(res => {
        if (res) {
          this.login(res)
        } else {
          console.log('error de ususario')
          // this.loading = false
        } */
      this.$router.push('menu')
      // this.$q.loading.hide()
      // })
    }
  }
}
</script>
