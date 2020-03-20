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
        // reduceNum(state,newIndex){
        //     state.goodslist[newIndex.index].foods[newIndex.i].num--
        // },
        // addNum(state,newIndex){
        //     state.goodslist[newIndex.index].foods[newIndex.i].num++
        // },
        changeNum(state,newNum){
            for (let list of state.goodslist) {
                for (let food of list.foods) {
                    if(food.name==newNum.name)
                    food.num+=newNum.val
                }
            }
        }
    },
    getters:{
        getGoods(state){
            let goodsMsg=[];
            let names=[]
            // for(let i=0;i<state.goodslist.length;i++){
            //     for(let j=0;j<state.goodslist[i].foods.length;j++){
            //         goodsMsg.push(state.goodslist[i].foods[j])
            //     }
            // }
            for (let list of state.goodslist) {
                for (let food of list.foods) {
                    if(food.num>0 && !names.includes(food.name)){
                        goodsMsg.push(food)
                        names.push(food.name)
                    }     
                } 
            }
            // return goodsMsg.filter(obj => obj.num>=1);
            return goodsMsg;
        }
    }
});
