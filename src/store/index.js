import { createStore } from 'vuex'
import axios from 'axios';
/* eslint-disable */
export default createStore({
  state: {
    CurrList: [],
    CurrValue: {}
  },
  getters: {
    CURRLIST(state){
      return state.CurrList
    },
    CURRVALUE: (state) => (toCurr) => {
      return state.CurrValue[toCurr]
    }
  },
  mutations: {
    SET_CURR_TO_STATE(state, data){
      state.CurrList = data
    },
    SET_CURRENT_CURR_TO_STATE(state, data){
      state.CurrValue = data
    }
  },
  actions: {
    async GET_LIST_OF_CURRENCIES_FROM_DB({commit}){
      try {
        await axios.get('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json')
        .then((res) => {
          commit('SET_CURR_TO_STATE', Object.keys(res.data))
        })
        .catch((err) => {
          console.log('Не удалось получить валюты: ' + err)
          return err
          
        })
      } catch(err){
        console.log('Не удалось получить валюты: ' + err)
        return err
      }
    },
    async GET_CURR_PRICE({commit}, curr){
      let currLink = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${curr}.json`
      try {
        await axios.get(currLink)
        .then((res) => {
          commit('SET_CURRENT_CURR_TO_STATE', res.data[curr])
        })
        .catch((err) => {
          console.log('Не удалось получить данные по валюте: ' + err)
          return err
        })
      } catch(err){
        console.log('Не удалось получить данные по валюте: ' + err)
        return err
        
      }
    }
  },
  modules: {
  }
})
