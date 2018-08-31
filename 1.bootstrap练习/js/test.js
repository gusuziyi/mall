$(window).on('load',function() {
	/*`````````````顶部连接滚动*/
	$('#hearder .breadcrumb li').on('click',function() {
		let link=$(this).find('a').html();
		let offset=$('#'+link).offset().top;
		$('html,body').animate({scrollTop:offset},500);
	});
	/*`````````````顶部连接滚动*/
	$('.goup').find('button').on('click',function() {
		$('html,body').animate({scrollTop:0},500);
	});
	$(window).on('resize',function() {
		/*`````````````banner 自适应*/
		let winW=$(window).width();
		let isphone=winW<=768;
		let mdImg=$('.jumbotron').data('md-img');
		let xsImg=$('.jumbotron').data('xs-img');
		let src=isphone?xsImg:mdImg;
		if(isphone){
			$('.jumbotron').removeAttr('style');
			$('.jumbotron img').attr('src',src);
		}else{
			$('.jumbotron').css('background-image','url('+src+')');
		}
		/*`````````````banner 自适应*/
	});
	$(window).trigger('resize');
});