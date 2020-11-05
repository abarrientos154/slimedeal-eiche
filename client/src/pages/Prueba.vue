<template>
  <div>
    <q-btn label="prueba" @click="download()" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        dir: ''
      }
    }
  },
  methods: {
    async download (file, status, archiveName) {
      await this.$api.post('file', { dir: 'storage/uploads/contracts/gola.png' }).then(res => {
        console.log('RESSSSSSSSSSSSSSS', res)
        const blob = new Blob([res])
        console.log(blob, 'blobb')
        // const ext = file.split('.')
        const fileName = `${archiveName}`
        console.log(fileName, 'filename')
        if (this.$q.platform.is.mobile) { // Si es teléfono
          this.saveBlob2File(fileName, blob)
        } else { // Si es navegador
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'ITMDeztaqQd17sdFAtYcMYlSPdo9Lu.png')
          document.body.appendChild(link)
          link.click()
        }
      }).catch(function (error) {
        console.log('error descargando', error)
      })
    }
  }
}
</script>

<style>

</style>
