window.addEventListener('load',function() {
	MockData();
	//注册商品
	let item=Vue.extend({
		template:'#item',
		props:['item','index'],
		filters:{
			priceFormat:num=>'$'+num.toFixed(2)
		},
		methods:{
			pickItem(item){
				item.isItemCheck=!item.isItemCheck;
				this.pub.getTotal();
				this.$emit('ispickitem'); //广播ispickitem事件,判断是否全选
			},
			delItem(val){
				this.$emit('delitem',val); //广播delitem事件,在shop中将其删除
			},
			clickNumBtn(item,ifAdd) { //控制商品数量
				if(ifAdd){
					item.itemNumber++;
				}else {
					item.itemNumber<=1?1:item.itemNumber--;
				}
				this.pub.getTotal();
			}
		}
	});
	//注册店铺
	Vue.component("shop",{   
		template:'#shop',
		props:['shop','index'],
		components:{
			item:item
		},
		methods:{
			pickShop(shop){
				shop.isShopCheck=!shop.isShopCheck;
				shop.itemList.forEach(item=>{
					item.isItemCheck=!item.isItemCheck;
				});
				this.pub.getTotal(); //底部总价
				this.pub.ifAllCheck(); //底部是否全选
			},
			ifAllItems:function() { //是否该店铺全选
				let flag=true;
				this.shop.itemList.forEach(item=>{
					if(!item.isItemCheck)
						flag=false;
				});
				shop.isShopCheck=flag;
				this.pub.ifAllCheck();
			},
			delItem(val){ 
				this.shop.itemList.splice(val,1); //删除商品
				if(this.shop.itemList.length==0){ //删除店铺
					this.$emit('delshop',this.index); //广播自己index
				}
				this.pub.getTotal();
			}
		}
	});

	//注册下方fixed
	Vue.component("totalsum",{
		template:'#totalsum',
		props:['totalprice', 'totalnum','isallcheck'],
		filters:{
			priceFormat:num=>'$'+num.toFixed(2)
		},
		methods:{
			allCheck:function() {
				this.pub.shopsData.forEach(shop=>{
					shop.itemList.forEach(item=>{
						item.isItemCheck=!this.isallcheck;
					});
				});
				// console.log('allCheck:'+this.totalprice);
				this.pub.isAllCheck=!this.isallcheck;
				this.isallcheck=!this.isallcheck;
				if(this.isallcheck){
					this.pub.getTotal();
				}else{
					this.pub.clearTotal();
				}
			}
		}

	});

	Vue.prototype.bus = new Vue();// 组件间数据总线,

	let vm = new Vue({
		el:'#shops',
		data:{
			shopsData:[],
			isAllCheck:true,
			totalPrice:0,
			totalNum:0
		},
		mounted:function() { //初始化shopsData
			this.$http.get("http://www.text.com").then(res=>{
				this.shopsData=res.body.allShops.shopList;
				this.getTotal();
			},res=>{
				console.log('error');
			});
		},
		methods:{
			getTotal:function() { //计算总价
				let total=0,
				num=0;
				this.shopsData.forEach(shop=>{
					shop.itemList.forEach(item=>{
						if(item.isItemCheck){
							num+=item.itemNumber;
							total+=item.itemNumber*item.itemPrice;
						}
					});
				});
				this.totalPrice=total;
				this.totalNum=num;
				// console.log("getTotal:"+this.totalNum);
			},
			clearTotal:function() { //清除底部总价
				this.totalPrice=0;
				this.totalNum=0;
			},
			ifAllCheck:function() { //是否全选
				let flag=true;
				this.shopsData.forEach(shop=>{
					shop.itemList.forEach(item=>{
						if(!item.isItemCheck)
							flag=false;   //有一个未选择即为false
					});
				});
				this.isAllCheck=flag;
			},
			delShop(val){ //删除shop
				this.shopsData.splice(val,1);
			}
		}
	});
	Vue.prototype.pub=vm; //Vue全局原型变量
});

