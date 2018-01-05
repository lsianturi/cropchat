<template>
  <div>
    <h4 class="title">Daftar Produk</h4>
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--4-col-phone mdl-card mdl-shadow--6dp" v-for="prd in this.products">
        <div class="mdl-card__media image-card__picture">
          <img :src="prd.ImagePath">
        </div>
        <div class="mdl-card__title">
          <h2 class="mdl-card__title-text">{{ prd.Name }}<br>{{ prd.Detail }}</h2>
        </div>
        <div class="mdl-card__supporting-text">IDR {{ formatPrice(prd.Price) }}</div>
        <div class="mdl-card__actions mdl-card--border">
          <button class="mdl-button mdl-js-button mdl-button--colored mdl-js--ripple-effect">BUY</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      products: [],
      postsLoading: false
    }
  },
  methods: {
    getProductsToCache (page) {
      this.postsLoading = true

      var url = 'http://10.17.10.103:3000/product'

      if (page != null) {
        url = 'https://www.reddit.com/r/all/top.json?limit=30&count=30&after=' + page
      }

      axios.get(url)
        .then(response => {
          this.products = this.products.concat(response.data)

          localStorage.setItem('products', JSON.stringify(this.products))
          this.postsLoading = false
        })
        .catch(error => {
          console.log(error)
        })
    },

    getProducts () {
      if (navigator.onLine) {
        this.getProductsToCache()
        return this.products
      } else {
        return JSON.parse(localStorage.getItem('products'))
      }
    },
    formatPrice (value) {
      let val = (value / 1).toFixed(0).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>

<style scoped>

  .image-card {
    position: relative;
    margin-bottom: 8px;
    max-width: 960px;
    margin: auto;
  }
  .image-card__picture > img {
    width:100%;
  }
  .mdl-grid {
    margin-top: 3em;
  }
</style>
