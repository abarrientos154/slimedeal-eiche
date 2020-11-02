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
      vigentes: [
        {
          _id: 'vigente1',
          title: 'Vigente 1',
          description: 'description'
        },
        {
          _id: 'vigente2',
          title: 'Vigente 2',
          description: 'description'
        },
        {
          _id: 'vigente3',
          title: 'Vigente 3',
          description: 'description'
        },
        {
          _id: 'vigente4',
          title: 'Vigente 4',
          description: 'description'
        },
        {
          _id: 'vigente5',
          title: 'Vigente 5',
          description: 'description'
        }
      ]
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
