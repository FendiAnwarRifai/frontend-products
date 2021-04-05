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
                    1 of 3
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
                    1 of 3
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
                    1 of 3
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
                    1 of 3
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  mounted: function () {
    console.log(this.$route.query)
  }
}
</script>

<style lang="scss" scoped>

</style>
