(function($) {
	//URI:http://caibaojian.com/scrollfix
	//author:caibaojian
	//website:http://caibaojian.com
	//descirption:scroll and fixed some div
	$.fn.scrollFix = function(options) {
		return this.each(function() {
			var defaults = {
				startTop: null, //滑到这个位置顶部时开始浮动，默认为空
				startBottom: null, //滑到这个位置末端开始浮动，默认为空
				distanceTop: 0, //固定在顶部的高度
				endPos: 0 //停靠在底部的位置，可以为jquery对象
			};
			var opts = $.extend({},
				defaults, options),
				obj = $(this),
				offset = obj.offset(),
				offsetTop = offset.top, //对象距离顶部高度
				offsetLeft = offset.left, //对象距离左边宽度
				placeholder = jQuery('<div>'), //创建一个jquery对象
				documentHeight = $(document).height(), //文档高度
				optsTop = opts.distanceTop, //定义到顶部的高度
				outerHeight = obj.outerHeight(), //对象高度
				outerHeight = parseFloat(outerHeight) + parseFloat(obj.css('marginBottom').replace(/auto/, 0)),
				outerWidth = obj.outerWidth(), //对象外宽度
				objWidth = obj.width(),
				startTop = $(opts.startTop), //开始浮动固定对象
				startBottom = $(opts.startBottom),
				toBottom, //停止滚动位置距离底部的高度
				ScrollHeight, //对象滚动的高度
				endfix; //开始停止固定的位置

			//如果没有找到节点，不进行处理
			if(obj.length<=0){
				return;
			}
			var parents = obj.parent();
			var Position = parents.css('position');
			while(!/^relative|absolute$/i.test(Position)){ //检测浮动元素的父类元素定位为'relative'或者'absolute',是的话退出，否则的话，执行循环，继续寻找它的父类
				parents = parents.parent();
				Position = parents.css('position');
				if(/^body|html$/i.test(parents[0].tagName)) break; //假如父类元素的标签为body或者HTML，说明没有找到父类为以上的定位，退出循环
			}
			if(/^body|html$/i.test(parents[0].tagName)){ //当父类元素非body或者HTML时，说明找到了一个父类为'relative'或者'absolute'的元素，得出它的偏移高度
				var parentsOffset = {top:0,left:0};
			}else{
				var parentsOffset = parents.offset();
				
			}
			
			// 计算父节点的上边到顶部距离
			// 如果 body 有 top 属性, 消除这些位移
            var bodyToTop = parseInt(jQuery('body').css('top'), 10);
            if(!isNaN(bodyToTop)) {
                    optsTop += bodyToTop;
           }
           //计算停在底部的距离
			if (!isNaN(opts.endPos)) {
				toBottom = opts.endPos;
			} else {
				toBottom = parseFloat(documentHeight - $(opts.endPos).offset().top);
			}
			//计算需要滚动的高度以及停止滚动的高度
			ScrollHeight = parseFloat(documentHeight - toBottom), endfix = parseFloat(ScrollHeight - outerHeight);
			//计算顶部的距离值
			if (startTop[0]) {
				var startTopOffset = startTop.offset(),
					startTopPos = startTopOffset.top;
				offsetTop = startTopPos;
			}
			if (startBottom[0]) {
				var startBottomOffset = startBottom.offset(),
					startBottomPos = startBottomOffset.top,
					startBottomHeight = startBottom.outerHeight();
				offsetTop = parseFloat(startBottomPos + startBottomHeight);
			}

			var toTop = parseFloat(offsetTop - optsTop);
			toTop = (toTop > 0) ? toTop : 0;
			var selfBottom = documentHeight -  offsetTop - outerHeight;
			//如果滚动停在底部的值不为0，并且自身到底部的高度小于上面这个值，不执行浮动固定
			if((toBottom != 0) && (selfBottom<=toBottom)){ return ;}
			var ie6=!-[1,]&&!window.XMLHttpRequest; //兼容IE6

			$(window).on("scroll",function(){
				onScroll();
			});

			function onScroll(){
				var ScrollTop = $(window).scrollTop();
				if ((ScrollTop > toTop) && (ScrollTop < endfix)) {
					obj.fadeIn().css({
						"position": "fixed",
						"top": optsTop,
						"left": offsetLeft,
						"width": objWidth
					});
					if(ie6){//IE6则使用这个样式
						obj.css({
							"position":"absolute",
							"top":ScrollTop + optsTop - parentsOffset.top,
							"left": offsetLeft
						})
					}
					placeholder.css({
						'height': outerHeight
					}).insertBefore(obj)
				} else if (ScrollTop >= endfix) {
					obj.css({
						"position": "absolute",
						"top": endfix - parentsOffset.top,
						"left": offsetLeft - parentsOffset.left,
						"width": objWidth
					});
					placeholder.css({
						'height': outerHeight
					}).insertBefore(obj)
				} else {
					obj.css({
						"position": "static",
						"top": "",
						"left": ""
					});
					placeholder.remove()
				}
			};
		})
	}
})(jQuery);