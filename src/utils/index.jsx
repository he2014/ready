import $ from 'jquery';

// 获取url的参数
export const queryString = () => {
    let _queryString = {};
    const _query = window.location.search.substr(1);
    const _vars = _query.split('&');
    _vars.forEach((v, i) => {
        const _pair = v.split('=');
        if (!_queryString.hasOwnProperty(_pair[0])) {
            _queryString[_pair[0]] = decodeURIComponent(_pair[1]);
        } else if (typeof _queryString[_pair[0]] === 'string') {
            const _arr = [ _queryString[_pair[0]], decodeURIComponent(_pair[1])];
            _queryString[_pair[0]] = _arr;
        } else {
            _queryString[_pair[0]].push(decodeURIComponent(_pair[1]));
        }
    });
    return _queryString;
};



export const getUrlParams = (param, key) =>{ 
    let paramStr=""; 
    if(param instanceof String||param instanceof Number||param instanceof Boolean){ 
        paramStr+="&"+key+"="+encodeURIComponent(param); 
    }else{ 
        $.each(param,function(i){ 
            let k =key==null?i:key+(param instanceof Array?"["+i+"]":"."+i); 
            paramStr+='&'+getUrlParams(this, k); 
        }); 
    } 
    return paramStr.substr(1); 
};

/**
 * 根据时间戳获取年、月、日
 * @param String str 时间戳
 * @param Boolean f 是否在原来的基础上*1000，true要*，false或不填就不*
 * @param num type 显示格式，，不传时默认显示年月日
 */
const setNum = (s)=>{
    return (parseInt(s)>9) ? s : '0'+s;
}
export const getTimes = (str,f,type)=>{
    var t = (f) ? parseInt(str)*1000 : parseInt(str);
    var d = new Date(t);
    var y = d.getFullYear();
    var m = setNum(d.getUTCMonth()+1);
    var da =  setNum(d.getUTCDate());
    var h =  setNum(d.getUTCHours());
    var mm =  setNum(d.getUTCMinutes());
    var ss =  setNum(d.getUTCSeconds());
    if(type==1){
        return y+"-"+m+"-"+da+" "+h+":"+mm+":"+ss;
    }else if(type==2){
        return y+"年"+m+"月"+da+"日 "+h+":"+mm+":"+ss;
    }else if(type==3){
        return h+":"+mm+":"+ss;
    }else if(type==4){
        return y+"年"+m+"月"+da+"日 "+h+":"+mm;
    }else if(type==5){
        return y+"年"+m+"月"+da+"日 ";
    }else if(type==6){
        return y+"."+m+"."+da+"  "+h+":"+mm;
    }else if(type==7){
        return y+"."+m+"."+da+"  "+h+":"+mm+":"+ss;
    }else if(type==8){
        return m+"-"+da;
    }else if(type==9){
        return y+"-"+ m+"-"+da;
    }else{
        return y+"."+m+"."+da;
    }
}

export const getTimesByDate = (date,type)=>{
    var d = new Date(date);
    var y = d.getFullYear();
    var m = setNum(d.getUTCMonth()+1);
    var da =  setNum(d.getUTCDate());
    var h =  setNum(d.getUTCHours());
    var mm =  setNum(d.getUTCMinutes());
    var ss =  setNum(d.getUTCSeconds());
    if(type==1){
        return y+"-"+m+"-"+da+" "+h+":"+mm+":"+ss;
    }else if(type==2){
        return y+"年"+m+"月"+da+"日 "+h+":"+mm+":"+ss;
    }else if(type==3){
        return h+":"+mm+":"+ss;
    }else if(type==4){
        return y+"年"+m+"月"+da+"日 "+h+":"+mm;
    }else if(type==5){
        return y+"年"+m+"月"+da+"日 ";
    }else if(type==6){
        return y+"."+m+"."+da+"  "+h+":"+mm;
    }else if(type==7){
        return y+"."+m+"."+da+"  "+h+":"+mm+":"+ss;
    }else if(type==8){
        return m+"-"+da;
    }else if(type==9){
        return y+"-"+ m+"-"+da;
    }else{
        return y+"."+m+"."+da;
    }
}

export const getNumTimes = (str)=>{
    return new Date(str).getTime();
}

export const getUTCtime=(time)=> {
    time = new Date(time)
    time =  time.getTime()
    return time
}