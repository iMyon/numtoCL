numtoCL
=====

numtoCL适用于开发过程中需要将数字转换为中文的场景。  
在网上找的函数多少有些地方不对我的味口，索性写一个。


## demo

```
numtoCL.toS(num)        //转中文小写 100111 =>> 十万零一百一十一
numtoCL.toB(num)        //转中文大写 100111 =>> 壹拾万零壹佰壹拾壹
numtoCL.toMoney(num)    //转中文金额 100111.11 =>> 人民币壹拾万零壹佰壹拾壹元壹角壹分

//关于十的口语化
numtoCL.toS(13.5)        //十三点五
numtoCL.toS(13.5,true)   //一十三点五
numtoCL.toB(13.5)        //壹拾叁點伍

```

##作者
[含浪](http://www.cnblogs.com/whyoop)   w.why@163.com