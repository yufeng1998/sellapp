import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


export default new Vuex.Store({
    state:{
        goodslist:[],

    },
    mutations:{
        initGoodsList(state,newArr){
            state.goodslist=newArr
        },
        reduceNum(state,newIndex){
            state.goodslist[newIndex.index].foods[newIndex.i].num--
        },
        addNum(state,newIndex){
            state.goodslist[newIndex.index].foods[newIndex.i].num++
       }
    },
    getters:{
        getGoods(state){
            let goodsMsg=[];
            for(let i=0;i<state.goodslist.length;i++){
                for(let j=0;j<state.goodslist[i].foods.length;j++){
                    goodsMsg.push(state.goodslist[i].foods[j])
                }
            }
            return goodsMsg.filter(obj => obj.num>=1);
        }
    }
});
