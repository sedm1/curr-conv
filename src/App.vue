<template>
  <main>
    <section class="main">
      <div class="container">
        <h1 class="main__title">Обменник валют</h1>
        <p class="main__descript">Проверьте цену валюты в реальном времени</p>
        <div class="main__block">
          <div class="main__item">
            <h2 class="main__item-title">Ковертировать из: </h2>
            <div class="main__item-block">
              <select 
              class="main__item-select"
              v-model="fromCurr"
              >
              <option disabled hidden >RUB</option>
              <option 
                v-for="CurrItem in this.CURRLIST"
                :key="CurrItem"
                >{{CurrItem}}</option>
              </select>
              <input 
              class="main__item-value"
              v-model="fromValue"
              type="number"
              min="0"
              />
            </div>
          </div>
          <div class="main__item">
            <h2 class="main__item-title">Конвертировать в: </h2>
            <div class="main__item-block">
              <select 
              class="main__item-select" 
              v-model="toCurr"
              >
                <option disabled hidden>RUB</option>
                <option 
                v-for="CurrItem in this.CURRLIST"
                :key="CurrItem"
                >{{CurrItem}}</option>
              </select>
              <input 
              class="main__item-value"
              v-model="ActualCurr"
              readonly
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'App',
  data(){
    return {
      fromValue: 0,
      fromCurr: '',
      toCurr: ''
      
    }
  },
  computed: {
    ...mapGetters(['CURRLIST', 'CURRVALUE']),
    ActualCurr(){
      return this.CURRVALUE(this.toCurr) && this.fromValue > 0 ?  this.CURRVALUE(this.toCurr) * this.fromValue : 0
    }
  },
  methods: {
    ...mapActions([
      'GET_LIST_OF_CURRENCIES_FROM_DB',
      'GET_CURR_PRICE'
    ])
  },
  watch: {
    fromValue(){
      let FromValueConditions = this.fromValue <= 0 
      let FromCurrConditions = this.fromCurr.length == 0
      let ToCurrConditions = this.toCurr.length == 0
      if (FromValueConditions || FromCurrConditions || ToCurrConditions) return 
      this.GET_CURR_PRICE(this.fromCurr)
    }
  },

  mounted(){
    this.GET_LIST_OF_CURRENCIES_FROM_DB()
  }
}
</script>

<style lang="sass">
$white: #fff
$blue: #1F2261
$gray: #808080
$black: #000000
*
  padding: 0
  margin: 0
  box-sizing: border-box
  font-family: "Roboto", sans-serif
input 
  border: 0 none 
  outline: 0 none
body 
  background: #F6F6F6
.main
  width: 100%
  height: 100dvh
  display: flex
  align-items: center
  justify-content: center
  .container
    max-width: 550px
    width: 100%
    padding: 0px 20px
  &__title 
    color: $blue
    text-align: center
    font-size: 25px
    font-weight: 700
    margin-bottom: 10px
  &__descript
    text-align: center
    font-size: 16px
  &__block 
    background: $white
    width: 100%
    padding: 20px
    border-radius: 10px
    margin: 0 auto
    margin-top: 40px
    display: flex
    flex-direction: column
    gap: 20px
  &__item
    &-title 
      font-size: 15px
      color: $gray
      font-weight: 400
    &-block 
      display: flex
      align-items: center
      justify-content: space-between
      margin-top: 10px
    &-select 
      border: 0 none 
      outline: 0 none
      max-width: 123px
      width: 100%
      font-size: 20px
      font-weight: 500
      color: $blue
      text-transform: uppercase
      cursor: pointer
      border: 1px solid #EFEFEF
      border-radius: 5px
      padding: 5px 10px 
    &-value 
      padding: 10px 
      border-radius: 10px
      background: #EFEFEF
      color: $black
      text-align: right
      font-size: 20px
      font-weight: 600
      max-width: 141px
</style>
