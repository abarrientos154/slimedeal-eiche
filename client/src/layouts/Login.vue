<template>
  <div>
            <q-card class="shadow-13 absolute-center" style="width:80%; height:85%">
              <q-card-section style="width:100%; height:100%">
                <div class="absolute-center" style="width:100%">
                <div class="row justify-center">
                  <q-img
                    style="width:100px"
                    src="app-logo-128x128.png"
                  ></q-img>
                </div>
                <div class="row justify-center text-subtitle1 text-grey">Ingresa a la plataforma</div>
                <div class="row justify-center q-py-xs">
                <q-input
                  style="margin: auto;
                  width: calc(50% - 90px);
                  min-width: 200px;
                  max-width: 300px;"
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
                  <q-btn label="registrate aqui" dense flat @click="$router.push('/register')" />
                </div>
                </div>
                <div class="row absolute-bottom justify-center q-py-sm">
                  <div class="q-px-sm text-subtitle2 text-grey">Términos y condiciones de uso</div>
                  <div class="q-px-sm text-subtitle2 text-grey">Página web</div>
                  <div class="q-px-sm text-subtitle2 text-grey">Desarrollado por Eiche</div>
                </div>
              </q-card-section>
            </q-card>
  </div>
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
          this.$router.push('contratos')
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
