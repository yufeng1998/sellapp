<template>
    <div class="goods flex">
        <div class="left left-div">
            <ul class="content">
                    
                <div @click="selected(index)"  :class="{leftGoods: true,active:index==curIndex}" v-for="(type,index) in goodslist" :key="type.id">
                    <p><img v-show="type.type==2" src="../assets/imgs/special_3@2x.png" alt="">{{type.name}}</p>
                </div>
            </ul>
        </div>

        <div class="right right-div">
            <ul class="content">
                    <div :id="index" v-for="(list,index) in goodslist" :key="list.id">
                        <p class="title">{{list.name}}</p>
                        <div v-for="food in list.foods" :key="food.id">
                            <div class="list flex">
                                <div class="list_left"><img :src="food.image" alt=""></div>
                                <div class="list_right">
                                    <p>{{food.name}}</p>
                                    <p>{{food.description}}</p>
                                    <p><span>月售1132份</span>&emsp;<span>好评率100%</span></p>
                                    <div class="flex">
                                        <span>￥{{food.price}}</span>
                                        <span v-show="food.oldPrice!=''">￥{{food.oldPrice}}</span>
                                        <p  class="flex">
                                            <button v-show="food.num>0" @click="changeNum(food.name,-1)">-</button>
                                            <span class="num" v-show="food.num>0">{{food.num}}</span>
                                            <button @click="changeNum(food.name,1)">+</button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </ul>
        </div>
    </div>
</template>

<script>
import {getGoods} from '../api/apis.js'
import BScroll from 'better-scroll'

    export default {
        data(){
            return {
                curIndex:0,
            }
        },
        created(){
            getGoods().then((res)=>{
               this.$store.commit('initGoodsList',res.data.data)
            });
        },
         mounted() {
            new BScroll(document.querySelector(".left-div"), {
            click: true,
            }); 
            this.rightDiv = new BScroll(document.querySelector(".right-div"),
            {probeType:3}
            );
            this.rightDiv.on('scroll',({y})=>{
                var _y=Math.abs(y);
                // console.log(_y)
                for(var divObj of this.getHeight){     
                    if(_y>=divObj.min && _y<divObj.max){
                        this.curIndex=divObj.index;
                        return
                    }
                }
            });
        },
        methods: {
            selected(index) {
                this.curIndex = index;
                this.rightDiv.scrollToElement(document.getElementById(index), 600); //用实例对象.要调用的函数
            },
            changeNum(name,val){
                this.$store.commit('changeNum',{name,val})
            },
        },
        computed:{
            getHeight(){
                let arr=[];
                let total=0;

                for(var i=0;i<this.goodslist.length;i++){
                    var curHeight=document.getElementById(i).offsetHeight;
                    arr.push({min:total,max:total+curHeight,index:i});

                    total += curHeight;
                }
                return arr;
            },
            goodslist(){
                return this.$store.state.goodslist
            }
        } 
    }
</script>

<style lang="less" scoped>
*{
    margin: 0;
    padding: 0;
}
img{
    vertical-align: middle;
}
.active{
    background: #fff;
    color: red;
}
.flex{
    display: flex;
    justify-content: space-around;
}
.goods{
    height: 100%;
    .left{
        width: 80px;
        height: 450px;
        overflow-y: scroll;
        background: #f4f5f7;
        .leftGoods{
            padding: 20px 10px;
            color: #0b141d;
            border-bottom: 1px solid #dddee0;
            img{
                width: 14px;
                margin-right: 3px;
            }
        }
    }
    .right{
        flex: 1;
        background: #fff;
        height: 450px;
        overflow-y: scroll;
        .title{
            height: 40px;
            background: #f4f5f7;
            border-left: 2px solid #D9DCE1;
            text-indent: 10px;
            line-height: 40px;
            color: #96979B;
        }
        .list{
            padding: 20px;
            border-bottom: 1px solid #dddee0;
            
            .list_left{
                width: 80px;
                height: 80px;
                margin-right: 10px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .list_right{
                flex: 1;
                color: #94979c;
                font-size: 12px;
                p:nth-child(1){
                    color: #0c101b;
                    font-size: 16px;
                }
                p:nth-child(2){
                    width: 100px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    line-height: 20px;
                }
                // p:nth-child(3){
                //     color: #0c101b;
                //     font-size: 14px;
                // }
                div:nth-child(4){
                    span:nth-of-type(1){
                        color: #f91320;
                        font-size: 16px;
                        font-weight: bold;
                        margin-right: 10px;
                    }
                    span:nth-of-type(2){
                        font-size: 12px;
                        font-weight: bold;
                        text-decoration: line-through;
                    }
                    p{
                        width: 60px;
                        .num{
                            font-size: 12px;
                            font-weight: bold;
                            color: #94979c;
                            text-align: center;
                            margin: 0;
                            line-height: 20px;
                        }
                        button{
                            width: 20px;
                            height: 20px;
                            border-radius: 10px;
                            background: #069ED8;
                            color: #fff;
                            border: none;
                            line-height: 20px;
                        }
                    }
                }
            }
        }
        
    }
}

</style>
