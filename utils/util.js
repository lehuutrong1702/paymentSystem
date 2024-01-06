const util = {
    moneyToInt: (Str)=>{
        var money = Str.replace(/[^0-9.-]+/g,"");
        money = parseInt(money);
        if(Str.includes('('))
         money = -money;
      return money;
    }
}
export default util;