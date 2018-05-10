const loadAllItems = require('../main/datbase');
const loadPromotions = require('../main/datbase');
module.exports = function printInventory(inputs){
    let  result ;
    //对象构造器
    function one_thing(barcode,name,count,unit,price){
        this.barcode = barcode;
        this.name = name;
        this.count = count;
        this.unit = unit;
        this.price =parseFloat(price).toFixed(2);
        if(barcode == 'ITEM000000'||barcode == 'ITEM000001'||barcode == 'ITEM000005')
            if(count >=2)
               { this.free_money =parseFloat(price).toFixed(2) ;
                this.act_total =parseFloat((count-1)*price).toFixed(2);}
            else 
                {this.free_money = 0 ;
                this.act_total =parseFloat(count*price).toFixed(2);}
        else 
        {this.free_money = 0 ;
        this.act_total =parseFloat(count*price).toFixed(2);}
    }
    //将 num 个 id 转化为 'id-num-price'的形式
    function trans(arr,obj){
        var result = new Array;
        var count = new Array;
        var a = 0 ;
        for(var i = 0;i<arr.length;i++){
            if(result.indexOf(arr[i])== -1)
                {result.push(arr[i]);
                count.push(1) ;
                }
            else{
                count[result.indexOf(arr[i])]++ ;}
            }
        for(var i = 0 ; i <result.length;i++){
            if(result[i].length == 10)
                result[i] = result[i] +'-'+count[i];
            }
        return result ;
    }
    //通过id知道是对象的第几个
function find(str,obj){
    for(var i = 0 ; i < obj.length ; i++)
        if(str == obj[i].barcode)
            return i ;
}
    //生成一个包含购买商品对象详情的数组
function list_array(arr,obj){
    var result = new Array;
    var n , count ;
    for(var i = 0 ; i<arr.length;i++){
        n = find(arr[i].substring(0,10),obj);
        count = arr[i].charAt(11);
        result.push(new one_thing(obj[n].barcode,obj[n].name,count,obj[n].unit,obj[n].price))
    }
    return result ;
}
function generate_result(arr){
    let head,mid,end,total,free_total ;
    head = mid = end = ``;
    total = free_total = 0 ;
    for(var i = 0 ; i < arr.length ; i++){
        head = head + '名称：'+arr[i].name+'，数量：'+arr[i].count+arr[i].unit+'，单价：'+arr[i].price+'(元)，小计：'+arr[i].act_total+'(元)\n';
        total = total + parseFloat(arr[i].act_total);
        if(arr[i].free_money!=0){
            mid = mid + '名称：'+arr[i].name+'，数量：1'+arr[i].unit+'\n';
            free_total = free_total +parseFloat(arr[i].free_money);
        }}
    end ='----------------------\n' +
         '总计：'+parseFloat(total).toFixed(2)+'(元)\n' +
         '节省：'+parseFloat(free_total).toFixed(2)+'(元)\n' +
         '**********************';
    head =  '***<没钱赚商店>购物清单***\n' + head + 
            '----------------------\n';
    mid = '挥泪赠送商品：\n' + mid ;
    return head + mid + end;
}

    merge = trans(inputs,loadAllItems());
    shopping_list = list_array(merge,loadAllItems());
    result = generate_result(shopping_list);
    console.log(result);
    return result;
};


