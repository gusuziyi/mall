<template id='item'>
	<tr class="row text-center text-muted" >
		<td class="col-sm-1 shop-check"> 
			<input type="checkbox"  v-model="isCheck" @click='pickItem(item)'>
		</td>
		<td class="col-sm-2">
			<img :src="item.itemImage">
		</td>
		<td class="col-sm-2">
			<span >商品名:{{item.itemName}}</span>
		</td>
		<td class="col-sm-3 text-left">
			<p >简介:{{item.itemInfos}}</p>
		</td>
		<td class="col-sm-2 shop-num">
			<button @click='clickNumBtn(item,false)'>-</button>
			<input type="text" name="" class="text-center" v-model='item.itemNumber'>
			<button @click='clickNumBtn(item,true)'>+</button>
		</td>
		<td class="col-sm-1">
			<p>{{item.itemPrice*item.itemNumber|priceFormat}}</p>
		</td>
		<td class="col-sm-1 shop-del">
			<button @click='delItem'>删除</button>
		</td>
	</tr>
</template>

<script type="text/javascript">
	import Bus from './bus'
	export default {
		name:'Item',
		props:{
			item:{},
			shopCheck:{},
			isPickShop:{}
		},
		data(){
			return{
				isCheck:true
			}
		},
		created(){
			Bus.$on('if-all',(val)=>{
				this.isCheck=val
				this.item.isItemCheck=val
				this.$emit('change-item');
			})
		},
		
		watch:{
			isPickShop(){
				this.isCheck=this.isPickShop
				this.item.isItemCheck=this.isPickShop
				this.$emit('change-item')
			}
		},
		filters:{
			priceFormat:num=>'$'+num.toFixed(2)
		},
		methods:{
			pickItem(item){
				item.isItemCheck=!this.isCheck
				this.isCheck=!this.isCheck
				this.$emit('change-item'); //广播change-item事件,触发底部总价判断
			},
			delItem(){
				this.$emit('del-item'); //广播delitem事件,在shop中将其删除
			},
			clickNumBtn(item,ifAdd) { //控制商品数量
				if(ifAdd){
					item.itemNumber++;
				}else {
					item.itemNumber<=1?1:item.itemNumber--;
				}
				this.$emit('change-item');
			}
		}

	}
</script>
<style type="text/css" scoped lang="less">
input{
	width: 18px;
	height: 18px;
}
.row td{
	vertical-align: middle;
}
.row .shop-num input{
	width: 30%;
}
</style>