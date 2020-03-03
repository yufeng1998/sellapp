<template>
    <div>
        <div class="header" :style="{backgroundImage: 'url('+data.avatar+')',backgroundRepeat: 'no-repeat',backgroundSize:'100% 220px'}">
            <div class="bgd">

            <div class="top flex">
                <div class="left">
                    <img :src="data.avatar" alt="头像">
                </div>
                <div class="right">
                    <p><img src="../assets/imgs/brand@2x.png" alt=""><span>{{data.name}}</span></p>
                    <p>{{data.description}} / {{data.deliveryTime}}分钟送达</p>
                    <p>
                        <img src="../assets/imgs/decrease_1@2x.png" alt="">
                        <span v-for="support in data.supports" :key="support.id" v-show="support.type==0">{{support.description}}</span>
                    </p>
                </div>
            </div>
            <div class="bottom"><img src="../assets/imgs/bulletin@2x.png" alt=""><span>{{data.bulletin}}</span></div>
            </div>
        </div>
        <div class="router-link-div">   
            <router-link to='/goods'>商品</router-link>                  
            <router-link to='/evaluation'>评价</router-link>   
            <router-link to='/business'>商家</router-link>
        </div>
        <router-view></router-view>

        <transition  name="slide-fade">
            <div v-show="shopcarShow" class="shopcar-board">
                <div v-for="shopCarGood in shopCarGoods" :key="shopCarGood.name">
                    <div class="flex">
                        <img :src="shopCarGood.image" alt="">
                        <span>{{shopCarGood.name}}</span>
                        <!-- <button v-show="shopCarGood.num>0">-</button> -->
                        <span>{{shopCarGood.num}}</span>
                        <!-- <button>+</button> -->
                        <span>￥{{shopCarGood.num*shopCarGood.price}}</span>
                    </div>
                </div>
            </div>
        </transition>

        <div class="shopCar-bar flex">
            <div class="left" @click="shopcarShow = !shopcarShow">
                <img src="../assets/imgs/shopcar.png" alt="">
                <span>￥{{allMoney}}</span>
                <span>另需配送费{{data.deliveryPrice}}元</span>
            </div>
            <div class="right">
                <span>￥{{data.minPrice}}起送</span>
            </div>
        </div>

    </div>
</template>

<script>
import {getSeller} from '../api/apis'
    export default {
        data(){
            return {
                data:[],
                shopcarShow:false,
                theme1: 'light'
            }
        },
        created(){
            getSeller().then((res)=>{
               this.data=res.data.data
            });
        },
        computed:{
            goodslist(){
                return this.$store.state.goodslist
            },
            shopCarGoods(){
                // this.shopCarGoods
                return this.$store.getters.getGoods
            },
            allMoney(){
                var sum=0;
                this.$store.getters.getGoods.map(obj => obj.num*obj.price).forEach(v => sum+=v);
                return sum;
            }
            
        }
    }
</script>

<style lang="less" scoped>
*{
    margin: 0;
    padding: 0;
}
.header{
    height: 180px;
    overflow: hidden;
    .bgd{
        overflow: hidden;
        background-color: rgba(69,70,74,0.8);
        .top{
            margin:  20px auto;
            width: 90%;
            height: 100px;
            .left{
               width: 100px;
               height: 100px;
               margin-right: 20px; 
               
               img{
                   width: 100%;
                   height: 100%;
                   border-radius: 8px;
               }
            }
            .right{
                flex: 1;
                // font-size: 16px;
                color: #fffeff; 
                p:nth-of-type(1){
                    font-size: 16px;
                    font-weight: bold;
                    margin-bottom: 10px;
                    img{
                        width: 40px;
                        height: 24px;
                        margin-right: 5px;
                    }
                }
                p:nth-of-type(3){
                    margin-top: 10px;
                   
                    img{
                        width: 16px;
                        height: 16px;
                        margin-right: 5px;
                    }
                }
            }
        }
    }
    .bottom{
        background-color: rgba(69,70,74,0.6);
        color: #fffeff;
        font-size: 12px;
        height: 40px;
        width: 99%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow:ellipsis;
        padding: 10px 0px;
        img{
            width: 26px;
            margin: 0 10px;
        }
    }
}
img{
    vertical-align: middle;
}
.flex{
    display: flex;
    justify-content: space-between;
}
.router-link-div{
    display: flex;
    justify-content: space-around;
    height: 50px;
    font-size: 20px;
    line-height: 50px;
    border-bottom: 1px solid #e5e6e8;
    a{ 
        color: #4d545a;
    }
}

.shopCar-bar{
    position: fixed;    
    height: 60px;
    width: 100%;
    bottom: 0;
    background-color: #141c27;
    color: #929196;
    .left{
        width: 75%;
        img{
            width: 50px;
            height: 50px;
            margin-left: 20px;
        }
        span:nth-of-type(1){
            margin-left: 25px;
            font-size: 20px;
            font-weight: bold;
            line-height: 50px;
        }
        span:nth-of-type(2){
            display: inline-block;
            margin-left: 20px;
            line-height: 50px;
            text-indent: 1em;
            border-left: 1px dashed #2c343f;
        }

    }
    .right{
        background: #2b343b;
        width: 25%;
        text-align: center;
        span{
            font-size: 16px;
            font-weight: bold;
            line-height: 50px;
        }
    }
}
.shopcar-board{
  position: fixed;  
  height: 200px;
  width: 100%;
  bottom: 60px;
  background-color:#fffeff;;
  overflow-y: scroll;
  div{
      padding: 10px;
      font-size: 16px;
      line-height: 80px;
      color: red;
      img{
          width: 80px;
          height: 80px;
      }
  }
}
.slide-fade-enter-active {
  transition: all .4s ease;
}
.slide-fade-leave-active {
  transition: all .4s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(200px);
  opacity: 0;
}

</style>