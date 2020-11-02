<template>
  <div class="q-pa-sm q-mt-md">
      <Contratos :data="pendientes" title="Contratos Pendientes"/>
  </div>
</template>

<script>
import Contratos from '../components/Contratos'
export default {
  components: { Contratos },
  data () {
    return {
      pendientes: []
    }
  },
  mounted () {
    this.getPendientes()
  },
  methods: {
    getPendientes () {
      this.$api.get('contratos_pendientes').then(res => {
        if (res) {
          this.pendientes = res
          console.log('pendientes ', this.pendientes)
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
