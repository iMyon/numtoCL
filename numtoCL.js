var numtoCL = {}
numtoCL.toS = function(num,m){
    var op = {
        ch: '零一二三四五六七八九'
        ,ch_u: '个十百千万亿'
        ,other: '负点'
        ,toCL: this.toCL
    }
    m = typeof m == 'undefined' ? false : !!m; //默认简化10－11的叫法
    return this.toCL.call(op,num,m);
}
Maxnumb = 9007199254740992;
numtoCL.toB = function(num,m){
    var op = {
        ch: '零壹贰叁肆伍陆柒捌玖'
        ,ch_u: '个拾佰仟万亿'
        ,other: '負點' 
        ,toCL: this.toCL
    }
    m = typeof m == 'undefined' ? true : !!m; //默认不简化10－11的叫法
    return this.toCL.call(op,num,m);
}

numtoCL.toMoney = function(num){
    var rmb = '人民币'
        ,z = '整'
        ,u = '元角分'
    num = +num;
    var _num = Math.abs(num);
    if(_num>Maxnumb){return '超出出范围!'}
    if(_num!=_num){return '参数错误!'}
    var _n = Math.round(_num*100)
    _num = Math.floor(_num) * (num < 0 ? -1:1);
    if(_n%100>0 && (_n/100)%1>0){
        var xs_str = ''
            ,xs = _n.toString().slice(-2);
        xs_str += this.toB(xs.charAt(0)) + (xs.charAt(0) == 0 ? '' : u.charAt(1));
        xs_str += xs.charAt(1) == 0 ? '' : this.toB(xs.charAt(1)) + u.charAt(2);
        return rmb + this.toB(_num) + u.charAt(0) + xs_str;
    }else{
        return rmb + this.toB(_num) + u.charAt(0) + (xs_str ? xs_str : z);
    }
}

numtoCL.toCL = function(num,m){
    var n = Math.floor(Math.abs(num))
        ,snum = Math.abs(num).toString()
        ,sn = m? snum.replace(/\..*$/,'') : n.toString()
        ,anum = snum.split('.');
    var ch = this.ch || '零一二三四五六七八九'
        ,ch_u = this.ch_u || '个十百千万亿'
        ,ch_o = this.other || '负点'
        ,n0 = ch.charAt(0)
        ,reg = new RegExp(ch.charAt(0)+"*$")
        ,reg1 = new RegExp(ch.charAt(0)+"+",'g')
    var str_begin = "",
        str_end = "";
    if(n !== n){return '参数错误!'}
    if(n>9007199254740992){return '超出出范围!'}
    str_begin = num < 0 ? ch_o.charAt(0) : ''
    if(anum.length >= 2){
        var xs = anum[1];
        if(xs){
            str_end = ch_o.charAt(1)
            for(var x=0 ; x < xs.length ; x++){
                str_end += ch.charAt(+xs.charAt(x))
            }
        }
    }
    if(!m){
        if(n<10){
            return str_begin + ch.charAt(n) + str_end;
        }
        if(n<20){
            return str_begin + ch_u.charAt(1)+ch.charAt(+sn.charAt(1)).replace(reg,'') + str_end;
        }
    }
    if(sn.length==1){
        return str_begin + ch.charAt(n) + str_end;
    }else if(sn.length<=4){
        var str = '';
        for(var i=0,n=sn.length;n--;){
            var _num = +sn.charAt(i);
            str += this.toCL(sn.charAt(i),true) + (_num && n?ch_u.charAt(n):'')
            i++;
        }
        str = str.replace(reg1,n0);
        str = str.replace(reg,'');
        return str_begin + str + str_end;
    }else{
        var d = sn.length/4>>0
            ,y = sn.length%4
            ,str = ''
            ,es = y || 4;
        while (y==0 || !ch_u.charAt(3+d)){
            y+=4;
            d--;
        }
        if(+sn.substr(0,y)){
            str = this.toCL(sn.substr(0,y),m) + ch_u.charAt(3+d) + (sn.substr(y).charAt(0) == 0?n0:'') + this.toCL(sn.substr(y),true)
        }else{
            str = this.toCL(sn.substr(0,y),m) + this.toCL(sn.substr(y),true)
        }
        str = str.replace(reg1,n0);
        if(!m) {str = str.replace(reg,'')}
        return str_begin + str + str_end;
    }
}
