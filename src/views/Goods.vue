<template>
    <div class="goods flex">
        <div class="left left-div">
            <ul class="content">
                    
                <div @click="selected(index)"  :class="{leftGoods: true,active:index==curIndex}" v-for="(type,index) in data" :key="type.id">
                    <p><img v-show="type.type==2" src="../assets/imgs/special_3@2x.png" alt="">{{type.name}}</p>
                </div>
            </ul>
        </div>

        <div class="right right-div">
            <ul class="content">
                    <div :id="index" v-for="(list,index) in data" :key="list.id">
                        <p class="title">{{list.name}}</p>
                        <div v-for="food in list.foods" :key="food.id">
                            <div class="list flex">
                                <div class="list_left"><img :src="food.image" alt=""></div>
                                <div class="list_right">
                                    <p>{{food.name}}</p>
                                    <p>{{food.description}}</p>
                                    <p><span>月售1132份</span>&emsp;<span>好评率100%</span></p>
                                    <p><span>￥{{food.price}}</span>&emsp;<span>￥{{food.oldPrice}}</span></p>
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
                data:[],
                curIndex:0,
            }
        },
        created(){
            getGoods().then((res)=>{
                this.data=res.data.data;
                // console.log(this.data);
            })
        },
         mounted() {
            new BScroll(document.querySelector(".left-div"), {
            click: true //允许容器进行点击
            }); 
            this.rightDiv = new BScroll(document.querySelector(".right-div"));
        },
        methods: {
            selected(index) {
                this.curIndex = index;
                this.rightDiv.scrollToElement(document.getElementById(index), 600); //用实例对象.要调用的函数
            }
        } 
    }
</script>

<style lang="less" scoped>
*{
    margin: 0;
    padding: 0;
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
                font-size: 14px;
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
                p:nth-child(4){
                    span:nth-child(1){
                        color: #f91320;
                        font-size: 16px;
                        font-weight: bold;
                        margin-right: 10px;
                    }
                    span:nth-child(2){
                        font-size: 12px;
                        font-weight: bold;
                        text-decoration: line-through;
                    }
                }
            }
        }
        
    }
}

</style>
