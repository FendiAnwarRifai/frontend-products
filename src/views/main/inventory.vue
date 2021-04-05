<template>
    <div>
<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Tambah Barang</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="createProducts" class="row g-3" @submit.prevent="CreateData">

  <!-- <div class="col-12">
    <label for="code" class="form-label">Kode Barang</label>
    <input type="text" class="form-control" id="code" placeholder="Masukkan kode barang">
  </div> -->
  <div class="col-12">
    <label for="name" class="form-label">Nama Barang</label>
    <input type="text" class="form-control" id="name" placeholder="Masukkan nama barang">
  </div>
    <div class="col-md-6">
    <label for="stock_min" class="form-label">Stok Minimal</label>
    <input type="email" class="form-control" id="stock_min" placeholder="Contoh:1">
  </div>
  <div class="col-md-6">
    <label for="stock" class="form-label">Stok Awal</label>
    <input type="password" class="form-control" id="stock" placeholder="Contoh:1">
  </div>
</form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" form="createProducts" class="btn btn-primary">Save</button>
      </div>
    </div>
  </div>
</div>
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
    ...mapActions(['getProducts']),
    CreateData () {
      const payload = {
        name: this.name,
        stock_min: this.stock_min,
        stock: this.stock
      }
      this.createProducts(payload)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
