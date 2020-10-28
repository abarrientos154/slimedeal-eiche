<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      elevated
    >
        <div class="row justify-center">
            <q-img
                style="width:100px"
                src="app-logo-128x128.png"
            ></q-img>
        </div>
        <div class="text-h6 text-center">Nombre</div>
        <div class="text-subtitle1 text-grey text-center">Correo Electronico</div>
        <div class="text-subtitle2 text-grey text-center">Telefono</div>
        <div class="row justify-center q-pa-sm">
            <q-input
                @input="val => { file = val[0] }"
                outlined
                type="file"
                v-model="fill"
                hint="Comprobante de transferencia bancaria"
            ></q-input>
        </div>
        <div class="q-pa-md row justify-center">
            <q-btn
                color="primary"
                class="q-mr-md"
                >Cargar
            </q-btn>
        </div>
        <q-item v-ripple>
        <q-item-section avatar top>
          <q-checkbox v-model="politicas" color="primary" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Estoy de acuerdo con las políticas establecidas por SlimeDeal.</q-item-label>
        </q-item-section>
      </q-item>
      <div class="q-pa-md row justify-center">
            <q-btn
                color="primary"
                class="q-mr-md"
                @click="ver()"
                >Enviar
            </q-btn>
        </div>
    </q-drawer>

    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      elevated
    >
    <div class="row justify-center">
            <q-img
                style="width:100px"
                src="app-logo-128x128.png"
            ></q-img>
        </div>
        <div class="text-h6 text-center">Nombre</div>
        <div class="text-subtitle1 text-grey text-center">Correo Electronico</div>
        <div class="text-subtitle2 text-grey text-center">Telefono</div>
        <div class="row justify-center q-pa-sm">
            <q-input
                @input="val => { file = val[0] }"
                outlined
                type="file"
                v-model="fill"
                hint="Comprobante de transferencia bancaria"
            ></q-input>
        </div>
        <div class="q-pa-md row justify-center">
            <q-btn
                color="primary"
                class="q-mr-md"
                >Cargar
            </q-btn>
        </div>
        <q-item v-ripple>
        <q-item-section avatar top>
          <q-checkbox v-model="politicas" color="primary" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Estoy de acuerdo con las políticas establecidas por SlimeDeal.</q-item-label>
        </q-item-section>
      </q-item>
    </q-drawer>
    <q-page-container>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  components: {},
  data () {
    return {
      politicas: false,
      file: null,
      fill: '',
      leftDrawerOpen: true,
      rightDrawerOpen: true
    }
  },
  methods: {
    ver () {
      console.log(this.politicas)
    }
  }
}
</script>
