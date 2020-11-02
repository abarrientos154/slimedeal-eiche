<template>
  <div class="q-pa-sm q-mt-md">
      <Contratos :data="contratosH" title="Historial de Contratos"/>
  </div>
</template>

<script>
import Contratos from '../components/Contratos'
export default {
  components: { Contratos },
  data () {
    return {
      contratosH: []
    }
  },
  mounted () {
    this.getContratos()
  },
  methods: {
    getContratos () {
      this.$api.get('contratos_pendientes').then(res => {
        if (res) {
          this.contratosH = res
          console.log('contratos ', this.contratosH)
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
