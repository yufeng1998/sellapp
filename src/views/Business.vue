<template>
    <div class="business">
        <div class="top">
            <div class="msg flex">
                <div class="left">
                    <p>{{data.name}}</p>
                    <p>
                        <Rate disabled :value.sync="valueDisabled"></Rate>
                        <span>({{data.ratingCount}})</span>
                        <span>月售690单</span>
                    </p>
                </div>
                <div class="right">
                    <p><img src="../assets/imgs/special_3@2x.png" alt=""></p>
                    <p>已收藏</p>
                </div>
            </div>
            <div class="money-time flex">
                <div class="money">
                    <p>起送价</p>
                    <p>{{data.minPrice}}<span>元</span></p>
                </div>
                <div class="money">
                    <p>商家配送</p>
                    <p>{{data.deliveryPrice}}<span>元</span></p>
                </div>
                <div class="money">
                    <p>平均配送时间</p>
                    <p>{{data.deliveryTime}}<span>分钟</span></p>
                </div>
            </div>
        </div>
        <div class="notice-activity">
            <h3>公告与活动</h3>
            <p class="notice">{{data.bulletin}}</p>
            <div class="activity">
                <div v-for="support in data.supports" :key="support.id">
                    <p>
                        <img v-show="support.type==0" src="../assets/imgs/decrease_3@2x.png" alt="">
                        <img v-show="support.type==1" src="../assets/imgs/discount_3@2x.png" alt="">
                        <img v-show="support.type==2" src="../assets/imgs/special_3@2x.png" alt="">
                        <span>{{support.description}}</span>
                    </p>
                </div>
                <p><img src="../assets/imgs/invoice_3@2x.png" alt=""><span>该商家支持开发票，请再下单时填写好发票</span></p>
                <p><img src="../assets/imgs/guarantee_3@2x.png" alt=""><span>已加入"外卖保"计划，食品安全保障</span></p>
            </div>
        </div>
        <div class="scenery">
            <h3>商家实景</h3>
            <div class="flex">
                <div v-for="img in data.pics" :key="img.id" class="flex">
                    <img :src="img" alt="">
                </div>
            </div>
        </div>
        <div class="message">
            <h3>商家信息</h3>
            <div v-for="info in data.infos" :key="info.id">
                <p>{{info}}</p>
            </div>
        </div>

    </div>
</template>

<script>
import {getSeller} from '../api/apis'
import BScroll from 'better-scroll'
    export default {
        data(){
            return {
                data:[],
                valueDisabled:4,
            }
        },
        created(){
            getSeller().then((res)=>{
                this.data=res.data.data;
                // console.log(this.data);
            })
        },
         mounted(){
            new BScroll(document.getElementsByClassName('business'))
        }
    }
</script>

<style lang="less" scoped>
.flex{
    display: flex;
    justify-content: space-around;
}
img{
    vertical-align: middle;
}
.business{
    height: 460px;
    overflow-y: scroll;
    background: #F4F5F7;
    .top{
        height: 130px;
        border-bottom: 1px solid #e5e6e8;
        margin-bottom: 20px;
        background: #fff;
        padding: 10px 20px; 
        .msg{
            height: 55px;
            border-bottom: 1px solid #e5e6e8;
            .left{
                p:nth-child(1){
                    color: #25272F; 
                    margin-bottom: 5px;
                }
                p:nth-child(2){
                    font-size: 12px;
                    line-height: 14px;
                    span{
                        margin-right: 15px;
                    }
                }
            }
            .right{
                p{
                    font-size: 12px;      
                }
            }
        }
        .money-time{
            text-align: center;
            .money{
                p:nth-child(1){
                    font-size: 12px;
                    line-height: 24px;
                    color: #97989C;
                }
                 p:nth-child(2){
                    font-size: 22px;
                    color: #25272F;
                    span{
                       font-size: 12px; 
                    }
                }
            }
        }
    }
    .notice-activity{
        border-top: 1px solid #e5e6e8;
        border-bottom: 1px solid #e5e6e8;
        background: #fff;
        padding: 20px;
        margin-bottom: 20px;
        h3{
            color: #25272F;
        }
        .notice{
            height: 140px; 
            padding: 10px;
            color: #EE2A2B;  
            line-height: 24px;       
        }
        .activity{
            p{
                border-top: 1px solid #e5e6e8;  
                height: 50px;
                line-height: 50px;
                text-indent: 10px;
                img{
                    height: 16px;
                    margin-right: 10px;
                }
            }
        }
    }
    .scenery{
        padding: 20px;
        border-top: 1px solid #e5e6e8;
        border-bottom: 1px solid #e5e6e8;
        margin-bottom: 20px;
        background: #fff;
        h3{
           color: #25272F; 
           margin-bottom: 10px;
        }
        img{
            width: 90px;
            height: 70px;
            background: hotpink;
        }
    }
    .message{
        padding: 20px;
        border-top: 1px solid #e5e6e8;
        margin-bottom: 60px;
        background: #fff;  
        h3{
           color: #25272F; 
           margin-bottom: 10px;
        }  
        p{
            height: 70px;
            padding: 10px;
            line-height: 30px;
            border-top: 1px solid #e5e6e8;  
        }
    }
}


</style>