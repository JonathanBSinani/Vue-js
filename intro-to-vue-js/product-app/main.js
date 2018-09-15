Vue.component('product-details', {
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  template: `
    <ul>
      <li v-for="detail in details">{{detail}}</li>
    </ul>
  `
});

Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
    <div class="product">
      <div class="product-image">
        <img v-bind:src="image" v-bind:alt="altText" />
      </div>

      <div class="product-info">
        <h1>{{ title }}</h1>
        <!-- conditional -->
        <p>Shipping: {{ shipping }}</p>
        <p v-if="inventory > 10">In Stock</p>
        <p v-else-if="inventory > 0 && inventory < 10">Almost sold out!</p>
        <p v-else
           :class="{ outOfStock: !inStock }">Out of Stock</p>
        <span v-if="onSale">On Sale!</span>

        <p>{{ sale }}</p>

        <!-- loop -->

        <product-details :details="details"></product-details>
        <div class="color-box"
             v-for="(variant, index) in variants"
             :key="variant.variantId"
             :style="{ backgroundColor: variant.variantColor }"
             @mouseover="updateProduct(index)">
        </div>

        <!-- Challenge v-for -->
        <ul>
          <li v-for="size in sizes">{{ size }}</li>
        </ul>

        <!-- Event Handling -->
        <button v-on:click="addToCart"
                :disabled="!inStock"
                :class="{ disabledButton: !inStock }">Add to Cart</button>

        <!-- Challenge Event Handling -->
        <button v-on:click="decrementToCart">Decrement To Cart</button>

        <div class="cart">
          <p>Cart({{cart}})</p>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      product: 'Socks',
      brand: 'Vue Mastery',
      image: './assets/vmSocks-green.jpg',
      altText: 'A pair of socks',
      selectedVariant: 0,
      inStock: false,
      inventory: 100,
      onSale: true,
      details: ["80% cotton", "20% polyester", "Gender-neutral"],
      variants: [
        {
          variantId: 2234,
          variantColor: "green",
          variantImage: "./assets/vmSocks-green.jpg",
          variantQuantity: 10
        },
        {
          variantId: 2235,
          variantColor: "blue",
          variantImage: "./assets/vmSocks-blue.jpg",
          variantQuantity: 0
        }
      ],
      sizes: ["PP", "P", "M", "G", "GG"],
      cart: 0,
      onSale: true
    }
  },
  methods: {
    addToCart() {
      this.cart += 1
    },
    decrementToCart() {
      this.cart -= 1
    },
    updateProduct(index) {
      this.selectedVariant = index
      console.log(index)
    }
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product
    },
    image() {
      return this.variants[this.selectedVariant].variantImage
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity
    },
    sale() {
      if (this.onSale) {
        return this.brand + ' ' + this.product + ' are on sale!'
      } else {
        return this.brand + ' ' + this.product + ' are not on sale'
      }
    },
    shipping() {
      if (this.premium) {
        return "free"
      } else {
        return 2.99
      }
    }
  }
});

var app = new Vue({
  el: '#app',
  data: {
    premium: true
  }
});
