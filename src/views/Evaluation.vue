<template>
    <div class="evaluation">
        <div class="top flex">
            <div class="left">
                <p>3.9</p>
                <p>综合评分</p>
                <p>高于周边商家69.2%</p>
            </div>
            <div class="right">
                <p>服务态度<Rate disabled show-text :value.sync="valueCustomText">
                    <span style="color: #f5a623">{{ valueCustomText}}</span></Rate>
                </p>
                <p>味道好坏<Rate disabled show-text :value.sync="valueCustomText2">
                    <span style="color: #f5a623">{{ valueCustomText2}}</span></Rate>
                </p>
                <p>送达时间 <span>44分钟</span></p>
            </div>
        </div>
        <div class="bottom">
            <div class="title flex">
                <p class="all">全部 <span>57</span></p>
                <p class="ok">满意 <span>47</span></p>
                <p class="on">不满意 <span>10</span></p>
            </div>
            <div class="only">
                <Radio :checked.sync="single">只看有内容的评价</Radio>
            </div>
            <div class="list">
                <div v-for="msg in data" :key="msg.id">
                    
                    <div class="msg flex">
                        <div class="left"><img :src="msg.avatar" alt=""></div>
                        <div class="right">
                            <p><span>{{msg.username}}</span><span>{{msg.rateTime}}</span></p>
                            <p><Rate disabled :value.sync="valueDisabled2"></Rate><span>{{msg.deliveryTime}}分钟送达</span></p>
                            <p>{{msg.text}}</p>
                            <p>
                                <span  v-for="good in msg.recommend" :key="good.name">{{good}}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import {getRatings} from '../api/apis.js'
import BScroll from 'better-scroll'
    export default {
        data(){
            return {
                data:[],
                valueDisabled: 4,
                single: false,
                valueDisabled2: 4,
                valueCustomText: 3.8,
                valueCustomText2: 4.0,
            }
        },
        created(){
            getRatings().then((res)=>{
                this.data=res.data.data;
                // console.log(this.data);
            })
        },
        mounted(){
            new BScroll(document.getElementsByClassName('evaluation'))
        }
        
    }
</script>

<style lang="less" scoped>
*{
    margin: 0;
    padding: 0;
}
.flex{
    display: flex;
    justify-content: space-around;
}
.evaluation{
    background: #F4F5F7;
    height: 460px;
    overflow-y: scroll;
    .top{
        height: 120px;
        border-bottom: 1px solid #e5e6e8;
        margin-bottom: 20px;
        background: #fff;
        padding: 10px;
        .left{
            font-size: 12px;
            // width: 150px;
            line-height: 34px;
            text-align: center;
            border-right: 1px solid #e5e6e8;
            p:nth-of-type(1){
                font-size: 26px;
                color: #FD9900;
            }
            p:nth-of-type(2){
                font-size: 14px;
                color: #1B2026;
            }   
            p:nth-of-type(3){
                color: #92979C;
                margin-right: 5px;
            } 

        }
        .right{
            color: #1B2026;
            font-size: 12px;
            p{
                line-height: 34px;
                span{
                    color: #FD9900;
                }
            }
            p:last-child{
                span{
                    color: #92979C;
                    margin-left: 10px;
                }
            }

        }
    }
    .bottom{
        border-top: 1px solid #e5e6e8;
        background: #fff;
        .title{
            margin: 20px 20px 0;
            padding-bottom: 20px;
            border-bottom: 1px solid #e5e6e8;
            p{
                width: 70px;
                height: 30px;
                text-align: center;
                line-height: 30px;
                margin-right: 10px;
                span{
                    font-size: 10px;
                }
            }
            .all{
                background: #00A0DC;
                
            }
            .ok{
                background: #CCECF7;
                
            }
            .on{
                background: #EAEBED;
                
            }
        }
        .only{
            padding: 20px;
            color: #92979C;
        }
        .list{
            border-top: 1px solid #e5e6e8;
            .msg{
                padding: 20px;
                border-bottom: 1px solid #e5e6e8;
                .left{
                    width: 30px;
                    height: 30px;
                    border-radius: 15px;
                    margin-right: 10px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .right{
                    flex: 1;
                    color: #97989A;
                    p:nth-of-type(1){
                        font-size: 12px;
                        display: flex;
                        justify-content: space-between;
                        span:nth-child(1){ 
                            color: #1B2026;
                        }
                    }
                    p:nth-of-type(2){
                        font-size: 12px;  
                        line-height: 14px;
                        margin: 5px 0;  
                    }
                    p:nth-of-type(3){
                        font-size: 14px;
                        color: #1B2026;
                        width: 300px;
                        white-space: wrap;
                    }
                    p:nth-of-type(4){
                        width: 70%;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        span{
                            display: inline-block;
                            width: 50px;
                            height: 12px;
                            border: 1px solid #e5e6e8;
                            margin-right: 5px;
                            font-size: 10px;
                            text-align: center;
                        }
                    }
                }
            }
        }
    }

}


</style>