<template>
  <div class="">
    {{product}}
  </div>
</template>

<script>
  export default {
    props: {
      product: {
        type: Object,
        default: {}
      },
    },
  }
</script>

<style>
</style>