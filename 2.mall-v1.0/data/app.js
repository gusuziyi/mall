window.addEventListener('load',function() {
	MockData();
	let vm = new Vue({
		el:'#shops',
		data:{
			shopsData:[],
			isAllCheck:false,
			totalPrice:0,
			totalNum:0,
			addFlag:false
		},
		mounted:function() {
			this.$http.get("http://www.text.com").then(res=>{
					this.shopsData=res.body.allShops.shopList;
					if(!this.addFlag)
						this.addCheckFlag();
				},res=>{
					console.log('error');
				});
		},
		filters:{
			priceFormat:num=>'$'+num.toFixed(2)
		},
		methods:{
			allCheck:function() {
				this.shopsData.forEach(shop=>{
					shop.isShopCheck=!this.isAllCheck;
					shop.isItemCheck=!this.isAllCheck;
				});
				this.isAllCheck=!this.isAllCheck;
				if(this.isAllCheck){
					this.getTotal();
				}else{
					this.clearTotal();
				}
			},
			allCheckFlag:function() {
				let flag=true;
				this.shopsData.forEach(shop=>{
					if(!shop.isItemCheck)
						flag=false;
				});
				this.isAllCheck=flag;
			},
			clickNumBtn(shop,ifAdd) {
				if(ifAdd){
					shop.itemNumber++;
				}else {
					shop.itemNumber<=1?1:shop.itemNumber--;
				}
				this.getTotal();
			},
			pickShop(shop){
				shop.isShopCheck=!shop.isShopCheck;
				this.pickItem(shop);
			},
			pickItem(shop){
				shop.isItemCheck=!shop.isItemCheck;
				this.getTotal();
				this.allCheckFlag();
			},
			getTotal:function() {
				let total=0,
				num=0;
				this.shopsData.forEach(shop=>{
					if(shop.isItemCheck){
						num+=shop.itemNumber;
						total+=shop.itemNumber*shop.itemPrice;
					}
				});
				this.totalPrice=total;
				this.totalNum=num;
			},
			clearTotal:function() {
				this.totalPrice=0;
				this.totalNum=0;
			},
			addCheckFlag:function() {
				this.shopsData.forEach(shop=>{
					if(shop.isShopCheck==='undefined'||shop.isItemCheck){
						Vue.set(shop,'isShopCheck',false);
						Vue.set(item,'isItemCheck',false);
					}
				});
				this.addFlag=true;
			},
			delItem(index){
				this.shopsData.splice(index,1);
				this.getTotal();
			}

		}
	});
});