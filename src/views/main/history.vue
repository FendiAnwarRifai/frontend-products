<template>
    <div>
        <div class="d-flex justify-content-evenly shadow-lg p-3 mb-5 bg-body rounded">
            <div class="p-2 bd-highlight">
                <div class="row">
                    <div class="col">
                    Kode Barang
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                    {{detailProducts.message[0].code}}
                    </div>
                </div>
            </div>
            <div class="p-2 bd-highlight">
                <div class="row">
                    <div class="col">
                    Nama Barang
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                    {{detailProducts.message[0].name}}
                    </div>
                </div>
            </div>
            <div class="p-2 bd-highlight">
                <div class="row">
                    <div class="col">
                    Total Stok
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                    {{detailProducts.message[0].stock}}
                    </div>
                </div>
            </div>
            <div class="p-2 bd-highlight">
                <div class="row">
                    <div class="col">
                    Stok Minimal
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                    {{detailProducts.message[0].stock_min}}
                    </div>
                </div>
            </div>
        </div>
        <br><br>

<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Tambah History
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
    <label for="name" class="form-label">Jenis Transaksi</label><br>
    <div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
  <label class="form-check-label" for="inlineRadio1">Menambah</label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2">
  <label class="form-check-label" for="inlineRadio2">Mengurangi</label>
</div>
  </div>
    <div class="col-12">
    <label for="stock_min" class="form-label">Jumlah</label>
    <input type="text" v-model="stock" class="form-control" id="stock" placeholder="Masukkan Jumlah">
  </div>
</form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" form="createProducts" class="btn btn-primary" data-bs-dismiss="modal">Save</button>
      </div>
    </div>
  </div>
</div>
         <table class="table table-striped table-hover">
  <thead>
    <tr>
      <th scope="col">No.</th>
      <th scope="col">Tanggal Transaksi</th>
      <th scope="col">Jenis Transaksi</th>
      <th scope="col">Jumlah</th>
    </tr>
  </thead>
  <tbody>
      <div class="d-none">
          {{i = 1}}
      </div>
    <tr v-for="data in detailProducts.result" :key="data.id">
      <td scope="row">{{i++}}</td>
      <td>{{data.createdAt}}</td>
      <td>{{ data.type == 0 ? 'Mengurangi' : 'Menambah' }}</td>
      <td>{{data.amount}}</td>
    </tr>
  </tbody>
</table>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  mounted: function () {
    this.historyProducts(this.$route.query)
    // console.log(this.$route.query)
  },
  computed: {
    ...mapGetters(['detailProducts'])
  },
  methods: {
    ...mapActions(['historyProducts'])
  }
}
</script>

<style lang="scss" scoped>

</style>
