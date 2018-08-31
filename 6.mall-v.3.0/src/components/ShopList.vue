<template id="shopList">
	<div class="panel panel-default" >
		<div class="panel-heading clearfix text-left">	
			<input type="checkbox" v-model='isCheck' @click='pickShop(shop)'>
			<label class="text-muted text-primary">店铺名:{{shop.shopName}}</label>
		</div>
		<div class="panel-body">
			<table class="table table-bordered">
				<tbody id="items">
					<item v-for='(item,index) in shop.itemList' :item='item'  :shop-check='isCheck' :key="index" :is-pick-shop='isPickShop' @change-item='changeItem' @del-item='delItem(index)'></item> 
				</tbody>
			</table>
		</div>
	</div>
</template>
<script type="text/javascript">
	import Item from './Item'
	import Bus from './bus'
	export default {
		name:'ShopList',
		props:{
			isAllCheck:{},
			shop:{}
		},
		data(){
			return{
				isCheck:true,
				isPickShop:true
			}
		},
		watch:{
			isAllCheck(){
				this.isCheck=this.isAllCheck
			}
		},
		created(){
			Bus.$on('if-all',(val)=>{
				this.isCheck=val
			})
		},
		components:{
			Item
		},
		methods:{
			pickShop(shop){
				shop.isShopCheck=!this.isCheck;
				this.isPickShop=!this.isCheck;
				this.$emit('pick-shop');
			},
			changeItem(){
				this.ifAllItems()
				this.$emit('change-item')
			},
			ifAllItems:function() { //是否该店铺全选
				let flag=true;
				this.shop.itemList.forEach(item=>{
					if(!item.isItemCheck)
						flag=false;
				});
				this.isCheck=flag;
				this.shop.isShopCheck=flag;
			},
			delItem(val){ 
				this.shop.itemList.splice(val,1); //删除商品
				if(this.shop.itemList.length==0){ //删除店铺
					this.$emit('del-shop'); //广播自己index
				}
				this.$emit('change-item')
			}
		}
	}
	
</script>
<style type="text/css" lang="less" scoped>
.panel{
	input{
		width: 18px;
		height: 18px;
	}
	&-heading{
		padding-left: 30px;
		label{
			vertical-align: middle;
			font-size: 16px;
			margin-top: -1px;
		}
	}
	&-body{
		table{
			border: none;
			td{
				vertical-align: middle;
			}
			.shop-num input{
				width: 30%;
			}
		}
		.item{
			padding-top: 10px
		}
	}
}

</style>