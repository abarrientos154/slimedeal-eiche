<template>
  <div class="row justify-between fullheight">
    <q-card
      class="bg-white shadow-13 row q-pb-none"
      style="width: 200px; height: 100%"
    >
    <q-card-section style="width:100%; height:100%">
        <div class="row justify-center">
            <q-img
                style="width:70px"
                src="app-logo-128x128.png"
            ></q-img>
        </div>
        <div class="text-subtitle1 text-center">{{userA.name}}</div>
        <div class="text-subtitle2 text-grey text-center">{{userA.email}}</div>
        <div class="text-subtitle2 text-grey text-center">{{userA.phone}}</div>
        <div class="row justify-center q-pa-xs">
          <q-file bottom-slots v-model="fileUserA" outlined label="Archivo" >
                <template v-slot:prepend>
                  <q-icon name="cloud_upload" color="primary" @click.stop />
                </template>
                <template v-slot:append>
                  <q-icon name="close" color="negative" @click.stop="model = null" class="cursor-pointer" />
                </template>
                <template v-slot:hint>
                  Comprobante de transferencia bancaria
                </template>
        </q-file>
        </div>
        <div class="q-py-md row justify-center">
            <q-btn
                no-caps
                color="primary"
                class="q-mr-md"
                >Cargar
            </q-btn>
        </div>
        <q-item v-ripple>
        <q-item-section avatar top>
          <q-checkbox v-model="politicasUserA" color="primary" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-caption">Estoy de acuerdo con las políticas establecidas por SlimeDeal.</q-item-label>
        </q-item-section>
      </q-item>
      <div class="q-pa-md row justify-center">
            <q-btn
                no-caps
                color="primary"
                class="q-mr-md"
                >Enviar
            </q-btn>
        </div>
      </q-card-section>
    </q-card>

    <q-card
      class="bg-white shadow-13"
      style="width: 200px"
    >
    <q-card-section style="width:100%; height:100%">
    <div class="row justify-center">
            <q-img
                style="width:70px"
                src="app-logo-128x128.png"
            ></q-img>
        </div>
        <div class="text-subtitle1 text-center">Usuario B</div>
        <div class="text-subtitle2 text-grey text-center">Correo Electronico</div>
        <div class="text-subtitle2 text-grey text-center">Telefono</div>
        <div class="row justify-center q-pa-xs">
            <q-file bottom-slots v-model="fileUserB" outlined label="Archivo" >
                <template v-slot:prepend>
                  <q-icon name="cloud_upload" color="primary" @click.stop />
                </template>
                <template v-slot:append>
                  <q-icon name="close" color="negative" @click.stop="model = null" class="cursor-pointer" />
                </template>
                <template v-slot:hint>
                  Comprobante de transferencia bancaria
                </template>
        </q-file>
        </div>
        <div class="q-pa-md row justify-center">
            <q-btn
                no-caps
                color="primary"
                class="q-mr-md"
                >Bajar
            </q-btn>
        </div>
        <q-item v-ripple>
        <q-item-section avatar top>
          <q-checkbox disable v-model="politicasUserB" color="primary" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-caption">Estoy de acuerdo con las políticas establecidas por SlimeDeal.</q-item-label>
        </q-item-section>
      </q-item>
    </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'MainLayout',
  components: {},
  data () {
    return {
      politicasUserA: false,
      politicasUserB: true,
      fileUserA: null,
      fileUserB: null,
      leftDrawerOpen: true,
      rightDrawerOpen: true,
      userA: {},
      userB: {}
    }
  },
  mounted () {
    this.getUserA()
  },
  methods: {
    getUserA () {
      this.$api.get('user_info').then(res => {
        if (res) {
          this.userA = res
          console.log('Usuario ', this.userA)
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
