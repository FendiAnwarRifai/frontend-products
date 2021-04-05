<template>
    <div>
        <!-- <div v-for="data in allProducts" :key="data.id">

        </div> -->
        <table class="table table-striped table-hover">
  <thead>
    <tr>
      <th scope="col">No.</th>
      <th scope="col">Kode Barang</th>
      <th scope="col">Nama Barang</th>
      <th scope="col">Minimal Stok</th>
      <th scope="col">Stok</th>
      <th scope="col">Status Stok</th>
      <th scope="col">Aksi</th>
    </tr>
  </thead>
  <tbody>
      <div class="d-none">
          {{i = 1}}
      </div>
    <tr v-for="data in allProducts" :key="data.id">
      <td scope="row">{{i++}}</td>
      <td>{{data.code}}</td>
      <td>{{data.name}}</td>
      <td>{{data.stock_min}}</td>
      <td>{{data.stock}}</td>
      <td>{{ data.stock_min>data.stock ? 'Dibawah Minimal' : 'Aman' }}</td>
      <td></td>
    </tr>
  </tbody>
</table>
    </div>
</template>

<script>
// import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters(['allProducts'])
  },
  mounted: function () {
    this.getProducts()
  },
  methods: {
    ...mapActions(['getProducts'])
  }
}
</script>

<style lang="scss" scoped>

</style>
