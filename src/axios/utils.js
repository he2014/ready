/**
 * Created by 叶子 on 2017/7/30.
 * http通用工具函数
 */
import axios from 'axios';
import Qs from 'qs';
import { Message } from 'antd';
import * as config from './config';
import {getUrlParams} from '../utils/index';

//创建axios实例
const service = axios.create({
    baseURL: config.MOCK_AUTH_PATH, //api的base_url
    timeout : 10000, // 请求超时时间 5s,
    responseType: 'json',
    //withCredentials: true, //跨域请求时是否带cookie
    headers:{
        //'X-Requested-With': 'XMLHttpRequest',
        //"Accept":"application/json, text/javascript, */*; q=0.01",
        "Content-Type":"application/x-www-form-urlencoded;charset=utf-8"
    }
})


//request拦截器
service.interceptors.request.use(config => {
//  console.log(config,process.env.BASE_API);
    if(config.method === 'post' || config.method === 'put' || config.method ==='delete'){
//  	if(config['data'] && config['data']['push'] == "push"){
//  		config['url'] = process.env.BASE_PUSH + "/push/sendInMail"
//  		debugger
//  	}
    	if(config['data'] && config['data']['form'] == 'form'){
    		config['headers']['Content-Type'] = "multipart/form-data"
    		config['data'] = config['data']['formData']
    	}else{
        	config.data ={
          	 //token:localStorage['USER-TOKEN'] || '',
          	  ...config.data,
           	 _r:Date.parse(new Date())/1000
        	}		
        	config.data = Qs.stringify(config.data);
    		
    	}
    }else if(config.method == 'get'){
        config.params = (config.params && config.params.sendData)?config.params.sendData:{};
        config.params.token = localStorage['USER-TOKEN'] || '';
        config.params._r = Date.parse(new Date())/1000;
    }
    if(localStorage['USER-TOKEN'] ){
        // config.headers.Authorization = localStorage['USER-TOKEN']; // 让头部带上token
        config.headers['X-Token'] = localStorage['USER-TOKEN']; // 让头部带上token
    }
    return config;
},error => {
    // request  error
    Promise.reject(error)
})


//response拦截器
service.interceptors.response.use(	
    response => {
        if(response.data.code == 99){
            document.location.href='#/login'
        }else if(response.data.code == 1000000){
            document.location.href='#/login'
        }
        return response.data;
    },
    error => {
        console.log('response error:',error);
        Message({
            message:error.message,
            type: 'error',
            duration: 5000
        })
        return Promise.reject(error)
    }
)

export default service