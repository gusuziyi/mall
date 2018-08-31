<template >
	<div id="allCheck">
		<table class="table">
			<tr class="text-muted  text-center">
				<td class="row col-sm-1">
					<input type="checkbox"  v-model='isAllCheck' @click='allCheck'>
					<label for="all">全选</label>
				</td>
				<td class="row col-sm-6 col-sm-offset-4 lead">
					<p>共选择了<span class="text-danger">{{totalNum}}</span>件商品,共<span class="text-danger">{{totalPrice|priceFormat }}</span>元</p>
				</td>
				<td class="row col-sm-1 ">
					<button class="btn btn-default  btn-danger">结算</button>
				</td>
			</tr>
		</table>
	</div>
</template>
<script type="text/javascript">
	import Bus from './bus'
	export default {
		name:'TotalBar',
		data(){
			return{
				isAllCheck:true
			}
		},
		props:{
			totalPrice:{},
			totalNum:{}
		},
		created(){
			Bus.$on('click-shop',(val)=>{
				this.isAllCheck=val
			})
		},
		filters:{
			priceFormat:num=>'$'+num.toFixed(2)
		},
		methods:{
			allCheck(){
				this.$emit('if-all',!this.isAllCheck);
				Bus.$emit('if-all',!this.isAllCheck)
			}
		}
	}
	
</script>
<style type="text/css" lang="less" scoped>
#allCheck {
	position: fixed;
	bottom: 0;
	left: 30px;
	width: 95%;
	background-color: #ddd;
	border-radius: 5px;
	border: 1px solid #ccc;
	.table{
		margin: 10px auto;
		label{
			vertical-align: middle;
			font-size: 16px;
			margin-top: -1px;
		}
		input{
			width: 18px;
			height: 18px;
		}
		.row{
			vertical-align: middle;
		}
	}
}

</style>