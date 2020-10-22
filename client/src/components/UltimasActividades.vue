<template>
  <div class="q-pa-sm q-mt-md">
    <q-scroll-area style="height:500px; width: 100%; max-height:250px">
      <q-list bordered>
        <div class="text-h6 q-pa-sm q-ml-sm">Ultimas Actividades</div>
        <q-item
          v-for="(act, index) in data"
          :key="index"
        >
          <q-item-section avatar>
            <q-img :src="act.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{act.actividad}}</q-item-label>
            <q-item-label
              caption
              lines="2"
            >{{act.detalle}}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label caption> {{act.fecha}} </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator
          spaced
          inset="item"
        />
      </q-list>
    </q-scroll-area>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: [
        {
          actividad: 'Actividad 1',
          detalle: 'Detalle',
          icon: '../statics/boy-avatar.png',
          fecha: '21/09/2020'
        },
        {
          actividad: 'Actividad 1',
          detalle: 'Detalle',
          icon: '../statics/boy-avatar.png',
          fecha: '21/09/2020'
        },
        {
          actividad: 'Actividad 1',
          detalle: 'Detalle',
          icon: '../statics/boy-avatar.png',
          fecha: '21/09/2020'
        }
      ]
    }
  }
}
</script>
