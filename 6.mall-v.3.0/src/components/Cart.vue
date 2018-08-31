<template>
	<div id="Cart">
		<shop-list v-for='(shop,index) in shopsData'  :shop='shop'  :if-all-check='isAllCheck'  :key="index" @pick-shop='getIfAllCheck' @change-item='getIfAllCheck' @del-shop='delShop(index)'></shop-list>
		<total-bar  :total-price='totalPrice' :total-num='totalNum'  @if-all='allCheck'></total-bar>
	</div>
</template>

<script type="text/javascript">
	import ShopList from '@/components/ShopList'
	import TotalBar from '@/components/TotalBar'
	import Bus from './bus'
	export default {
		name:'Cart',
		data(){
			return {
				isAllCheck:true,
				shopsData:[],
				totalPrice:0,
				totalNum:0
			}
		},
		components:{
			ShopList,
			TotalBar
		},
		created(){
			//在后端引入cors实现前端跨域访问
			this.$http.get("http://localhost:3003/allShops").then(res=>{ 
				this.shopsData=res.body.body.shopList;
				this.getTotalPrice()
			},error=>{
				console.log(error);
			});
		},
		methods:{
			getIfAllCheck() {
				this.isAllCheck=true
				this.shopsData.forEach(shop=>{
					if(!shop.isShopCheck)
						this.isAllCheck=false
				});
				this.getTotalPrice()
				Bus.$emit('click-shop',this.isAllCheck)
			},
			allCheck(allCheck){
				if(allCheck){
					this.getTotalPrice();
				}else{
					this.totalPrice=0;
					this.totalNum=0;
					this.isAllCheck=allCheck;
				}
			},
			delShop(val){
				this.shopsData.splice(val,1)
			},
			getTotalPrice(){
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
			}
		}
	}
</script>
<style type="text/css">
#Cart{
	margin: 30px;
}

</style>