<template>
  <div>
    <div class="text-h1">PAGO PAYPAL</div>
    <paypal :product="product" ></paypal>
  </div>
</template>

<script>
import Paypal from '../components/Paypal'
export default {
  components: {
    Paypal
  },
  data: function () {
    return {
      loaded: false,
      product: {
        price: 23,
        description: 'esto es una prueba de 1$',
        img: 'logo.png'
      }
    }
  },
  mounted () {

  },
  methods: {
  }
}
</script>

<style>

</style>
