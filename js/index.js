// 功能导航
$('.nav_list>a:lt(4)').mouseenter(function(){
	$('.nav_list>a:lt(4)').addClass('other_nav_dropdown')
	if($(this).index()==$('.nav_list>a:lt(4)').length-1){
		$('.nav_list>a').first().addClass('other_nav_dropdown_last')
		$(this).addClass('other_nav_dropdown_last')
	}
	$('.nav_list_menu').show(0).addClass('nav_list_menu_show')
	$(this).find('span').addClass('cur')
	.parent().siblings().find('span').removeClass('cur')
	$('.nav_list_menu>div').eq($(this).index()).show()
	.siblings().not('span').hide()
})
// 功能导航中的关闭键
$('.nav_list_menu .close').click(function(){
	$('.nav_list_menu').hide().removeClass('nav_list_menu_show')
	$('.nav_list>a>span').removeClass('cur')
	$('.nav_list>a').removeClass()
})
// 秒杀
var endtime=new Date('2020-12-13 12:34:56')
var ms_timer=setInterval(function(){
	var time=endtime-new Date()
	var h=parseInt(time/1000/60/60)
	var m=parseInt(time/1000/60%60)
	var s=parseInt(time/1000%60)
	if(time<0){
		clearInterval(ms_timer)
	}else{
		h=h<10?('0'+h):h
		m=m<10?('0'+m):m
		s=s<10?('0'+s):s
		$('.hour').text(h)
		$('.minute').text(m)
		$('.second').text(s)
	}
},1000)
// 秒杀产品
slideImage({
	container:$('.ms_product ul'),
	arrow:true,
	arrowContainer:[$('#ms_left'),$('#ms_right')]
})
// 秒杀产品2
slideImage({
	container:$('.ms_product2 ul'),
	autoplay:true,
	dot:true,
	dotContainer:$('.ms_product2 .pot i')
})

// 封装了无缝连接轮播效果
function slideImage(options){
	var ms_ul=options.container
	var firstLi=ms_ul.find('li').first().clone(true)
	ms_ul.append(firstLi)
	var ms_li=ms_ul.find('li')
	var ms_li_len=ms_li.length
	var ms_li_width=firstLi.width()
	ms_ul.width(ms_li_width*ms_li_len)
	var dot
	if(options.dot){
		dot=options.dotContainer
	}
	
	var ms_idx=0

	// 箭头
	if(options.arrow){
		options.arrowContainer[1].click(autoSlide)
		options.arrowContainer[0].click(function(){
			ms_idx--
			if(ms_idx<0){
				ms_ul.css({
					marginLeft:-ms_li_width*(ms_li_len-1),
					animate:'none'
				})
				ms_idx=ms_li_len-2
			}
			ms_ul.stop().animate({
				marginLeft:-ms_li_width*ms_idx
			},500)
			if(options.dot){
				dot.eq(ms_idx==ms_li_len-1?0:ms_idx).addClass('cur').siblings().removeClass('cur')
			}
		})
	}

	// 自动轮播
	if(options.autoplay){
		var timer=setInterval(autoSlide,1000)

		// 鼠标移入或移出时轮播效果
		ms_ul.parent().on({
			mouseenter:function(){
				clearInterval(timer)
				if(options.dot){
					if(ms_idx==ms_li_len-1){
						ms_ul.css({
							marginLeft:0,
							animate:'none'
						})
						dot.eq(0).addClass('cur').siblings().removeClass('cur')
					}
				}
			},
			mouseleave:function(){
				timer=setInterval(autoSlide,1000)
			}
		})
	}
	// 封装了自动效果
	function autoSlide(){
		ms_idx++
		if(ms_idx==ms_li_len){
			ms_ul.css({
				marginLeft:0,
				animate:'none'
			})
			ms_idx=1
		}
		ms_ul.stop().animate({
			marginLeft:-ms_li_width*ms_idx
		},500)
		if(options.dot){
			dot.eq(ms_idx==ms_li_len-1?0:ms_idx).addClass('cur').siblings().removeClass('cur')
		}
	}
	// 圆点事件
	if(options.dot){
		dot.first().addClass('cur')
		dot.mouseenter(function(){
			$(this).addClass('cur').siblings().removeClass('cur')
			ms_idx=$(this).index()
			ms_ul.stop().animate({
				marginLeft:-ms_li_width*ms_idx
			},500)
			
		})
	}
}

// 吸顶导航
$(window).scroll(function(){
	if($(document).scrollTop()>=$('.boxTwo').offset().top){
		$('.fixed_nav').slideDown()
	}else{
		$('.fixed_nav').hide()
	}
})