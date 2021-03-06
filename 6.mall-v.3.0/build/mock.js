module.exports = function() {
  let Mock  = require('mockjs');
  let Random = Mock.Random;
  let mock=Mock.mock({
    "allShops":{
      "totalMoney":0,
      "shopList|1-5":[
      {
        "shopName":function() {return Random.csentence(2,6);} ,
        'isShopCheck':true,
        "itemList|1-10":[
        {
          "itemId|+1":Random.integer(0,10),
          "itemName":function() {return Random.csentence(2,5);} ,
          "itemPrice|1-2000.3":299.00,
          "itemNumber|1-10":1,
          "itemImage":function() {return Random.image('50x50');},
          "itemInfos":function() {return Random.cparagraph(1,3);},
          'isItemCheck':true
        } 
        ]
      }
      ]

    }
  });
  return mock;
}
