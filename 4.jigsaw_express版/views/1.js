$(function(){
	$(window).on("resize",function () {
		let $items=$('#slider .carousel-inner .item');
		// console.log($items);
		let clientW=$(window).width();
		let isPhone=clientW<800;
		$items.each(function() {
			let $mdImg=$(this).data('md-img');
			let $smImg=$(this).data('sm-img');
			let src=isPhone?$smImg:$mdImg;
			console.log(src);
			if(!isPhone){
				$(this).empty();
				$(this).css("background-image","url("+src+")");
			}else{
				let $img='<img src="'+src+'" style="margin: 0 auto;" alt="">';
				$(this).css("background-image","");
				$(this).empty().append($img);
			}

		});


		
		let $ul=$("#table .nav");
		let $lis=$("#table li");
		let lisW=0;
		let $ulW=$("#table .nav").parent().width();
		$lis.each(function() {
			lisW+=$(this).width();
		});
		console.log($ulW<lisW);
		if ($ulW<lisW) {
			$ul.css({
				'width':$ulW+'px'
			});
		}else{
			$ul.removeAttr('style');
		}
	});
	$(window).trigger('resize');

	$('.navbar .collapse .active>a').on('click',function() {
		let offset=$('.about').offset().top;
		$('html,body').animate({scrollTop:offset},100);
	});

});