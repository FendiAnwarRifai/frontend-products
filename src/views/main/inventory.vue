<template>
    <div>
<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Tambah Product
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
    <input type="text" v-model="name" class="form-control" id="name" placeholder="Masukkan nama barang">
  </div>
    <div class="col-md-6">
    <label for="stock_min" class="form-label">Stok Minimal</label>
    <input type="text" v-model="stock_min" class="form-control" id="stock_min" placeholder="Contoh:1">
  </div>
  <div class="col-md-6">
    <label for="stock" class="form-label">Stok Awal</label>
    <input type="text" v-model="stock" class="form-control" id="stock" placeholder="Contoh:1">
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

<!-- Modal Edit-->
<div class="modal fade" id="EditModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Edit Barang</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="editProducts" class="row g-3" @submit.prevent="updateData">
  <div class="col-12">
    <input type="hidden" v-model="id_barang">
    <label for="name" class="form-label">Nama Barang</label>
    <input type="text" v-model="names" class="form-control" id="names" placeholder="Masukkan nama barang">
  </div>
    <div class="col-md-6">
    <label for="stock_min" class="form-label">Stok Minimal</label>
    <input type="text" v-model="stock_mins" class="form-control" id="stock_mins" placeholder="Contoh:1">
  </div>
  <div class="col-md-6">
    <label for="stock" class="form-label">Stok Awal</label>
    <input type="text" v-model="stocks" class="form-control" id="stocks" placeholder="Contoh:1">
  </div>
</form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" form="editProducts" class="btn btn-primary">Update</button>
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
      <td>
        <button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#EditModal" @click="insertEditForm(data)">
          Edit
      </button>
      <button @click="goHistories(data.id)" class="btn btn-sm btn-secondary">History</button>
        <button type="button" class="btn btn-sm btn-danger" @click="deleteFunction({id:data.id})">Delete</button>
      </td>
    </tr>
  </tbody>
</table>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      name: '',
      stock_min: '',
      stock: '',
      id_barang: '',
      names: '',
      stock_mins: '',
      stocks: ''
    }
  },
  computed: {
    ...mapGetters(['allProducts'])
  },
  mounted: function () {
    this.getProducts()
  },
  methods: {
    ...mapActions(['getProducts', 'createProducts', 'deleteProducts', 'updateProducts']),

    goHistories (ids) {
      this.$router.push({ path: '/histories', query: { id: ids } })
    },
    CreateData () {
      const payload = {
        name: this.name,
        stock_min: this.stock_min,
        stock: this.stock
      }
      this.createProducts(payload).then((res) => {
        this.getProducts()
        this.$swal.fire({
          title: 'Success',
          text: 'Create product successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        this.name = ''
        this.stock_min = ''
        this.stock = ''
      })
        .catch((err) => {
          this.$swal.fire({
            title: 'Warning',
            text: `${err.response}`,
            icon: 'warning',
            confirmButtonText: 'Ok'
          })
        })
    },
    deleteFunction (data) {
      this.$swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteProducts(data).then((res) => {
            this.getProducts()
            this.$swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          })
        }
      })
    },
    insertEditForm (datas) {
      this.id_barang = datas.id
      this.names = datas.name
      this.stock_mins = datas.stock_min
      this.stocks = datas.stock
    },
    updateData () {
      const payload = {
        id: this.id_barang,
        name: this.names,
        stock_min: this.stock_mins,
        stock: this.stocks
      }
      console.log(payload)
      this.updateProducts(payload).then((res) => {
        this.getProducts()
        this.$swal.fire({
          title: 'Success',
          text: 'Update product successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
      })
        .catch((err) => {
          this.$swal.fire({
            title: 'Warning',
            text: `${err.response}`,
            icon: 'warning',
            confirmButtonText: 'Ok'
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
