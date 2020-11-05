<template>
  <div class="q-pa-sm q-mt-md">
      <Contratos :data="vigentes" title="Contratos Vigentes"/>
  </div>
</template>

<script>
import Contratos from '../components/Contratos'
export default {
  components: { Contratos },
  data () {
    return {
      vigentes: []
    }
  },
  mounted () {
    this.getVigentes()
  },
  methods: {
    getVigentes () {
      this.$api.get('contratos_pendientes').then(res => {
        if (res) {
          this.vigentes = res.filter(v => v.status === 2)
          console.log('vigentes ', this.vigentes)
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
