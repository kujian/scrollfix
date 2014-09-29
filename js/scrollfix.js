(function($) {
	//URI:http://caibaojian.com/scrollfix
	//author:caibaojian
	//website:http://caibaojian.com
	//descirption:scroll and fixed some div
	$.fn.scrollFix = function(options) {
		return this.each(function() {

			var opts = $.extend({}, $.fn.scrollFix.defaultOptions, options);
			var obj = $(this),
				base = this,
				selfTop = 0,
				selfLeft = 0,
				toTop = 0,
				parentOffsetLeft = 0,
				parentOffsetTop = 0,
				outerHeight,
				outerWidth,
				objWidth = 0,
				placeholder = jQuery('<div>'), //创建一个jquery对象
				optsTop = opts.distanceTop, //定义到顶部的高度
				endfix = 0; //开始停止固定的位置

			var originalPosition;
			var originalOffsetTop;
			var originalZIndex;
			var lastOffsetLeft = -1;
			var isUnfixed = true;
			//如果没有找到节点，不进行处理
			if (obj.length <= 0) {
				return;
			}
			if (lastOffsetLeft == -1) {
				originalZIndex = obj.css('z-index');
				position = obj.css('position');
				originalPosition = obj.css('position');

				originalOffsetTop = obj.css('top');
			}

			var zIndex = obj.css('zIndex');
			if (opts.zIndex != 0) {
				zIndex = opts.zIndex;
			}
			//获取相对定位或者绝对定位的父类
			var parents = obj.parent();
			var Position = parents.css('position');
			while (!/^relative|absolute$/i.test(Position)) { //检测浮动元素的父类元素定位为'relative'或者'absolute',是的话退出，否则的话，执行循环，继续寻找它的父类
				parents = parents.parent();
				Position = parents.css('position');
				if (/^body|html$/i.test(parents[0].tagName)) break; //假如父类元素的标签为body或者HTML，说明没有找到父类为以上的定位，退出循环
			}

			var ie6 = !-[1, ] && !window.XMLHttpRequest; //兼容IE6
			var resizeWindow = false;

			function resetScroll() {
				setUnfixed();
				selfTop = obj.offset().top; //对象距离顶部高度
				selfLeft = obj.offset().left; //对象距离左边宽度
				outerHeight = obj.outerHeight(); //对象高度
				outerHeight = parseFloat(outerHeight) + parseFloat(obj.css('marginBottom').replace(/auto/, 0));
				outerWidth = obj.outerWidth(); //对象外宽度
				objWidth = obj.width();
				var documentHeight = $(document).height(); //文档高度
				var startTop = $(opts.startTop), //开始浮动固定对象
					startBottom = $(opts.startBottom),
					toBottom, //停止滚动位置距离底部的高度
					ScrollHeight; //对象滚动的高度

				//计算父类偏移值
				if (/^body|html$/i.test(parents[0].tagName)) { //当父类元素非body或者HTML时，说明找到了一个父类为'relative'或者'absolute'的元素，得出它的偏移高度
					parentOffsetTop = 0, parentOffsetLeft = 0;
				} else {
					parentOffsetLeft = parents.offset().left, parentOffsetTop = parents.offset().top;
				}

				// 计算父节点的上边到顶部距离
				// 如果 body 有 top 属性, 消除这些位移
				var bodyToTop = parseInt(jQuery('body').css('top'), 10);
				if (!isNaN(bodyToTop)) {
					optsTop += bodyToTop;
				}
				//计算停在底部的距离
				if (!isNaN(opts.endPos)) {
					toBottom = opts.endPos;
				} else {
					toBottom = parseFloat(documentHeight - $(opts.endPos).offset().top);
				}
				//计算需要滚动的高度以及停止滚动的高度
				ScrollHeight = parseFloat(documentHeight - toBottom - optsTop), endfix = parseFloat(ScrollHeight - outerHeight);
				//计算顶部的距离值
				if (startTop[0]) {
					var startTopOffset = startTop.offset(),
						startTopPos = startTopOffset.top;
					selfTop = startTopPos;
				}
				if (startBottom[0]) {
					var startBottomOffset = startBottom.offset(),
						startBottomPos = startBottomOffset.top,
						startBottomHeight = startBottom.outerHeight();
					selfTop = parseFloat(startBottomPos + startBottomHeight);
				}

				toTop = selfTop - optsTop;
				toTop = (toTop > 0) ? toTop : 0;

				var selfBottom = documentHeight - selfTop - outerHeight;
				//如果滚动停在底部的值不为0，并且自身到底部的高度小于上面这个值，不执行浮动固定
				if ((toBottom != 0) && (selfBottom <= toBottom)) {
					return;
				}

			}
			function setUnfixed() {
				if (!isUnfixed) {
					lastOffsetLeft = -1;
					placeholder.css("display", "none");
					obj.css({
						'z-index': originalZIndex,
						'width': '',
						'position': originalPosition,
						'left': '',
						'top': originalOffsetTop,
						'margin-left': ''
					});
					obj.removeClass('scrollfixed');
					isUnfixed = true;
				}
			}

			function onScroll() {
				lastOffsetLeft = 1;
				var ScrollTop = $(window).scrollTop();
				if (opts.bottom != -1) {
					ScrollTop = ScrollTop + $(window).height() - outerHeight - opts.bottom;
				}
				if (ScrollTop > toTop && (ScrollTop < endfix)) {
					if (ie6) { //IE6则使用这个样式
						obj.addClass(opts.baseClassName).css({
							"z-index": zIndex,
							"position": "absolute",
							"top": opts.bottom == -1 ? ScrollTop + optsTop - parentOffsetTop : ScrollTop - parentOffsetTop,
							"bottom": 'auto',
							"left": selfLeft - parentOffsetLeft,
							'width': objWidth
						})
					} else {
						obj.addClass(opts.baseClassName).css({
							"z-index": zIndex,
							"position": "fixed",
							"top": opts.bottom == -1 ? optsTop : '',
							"bottom": opts.bottom == -1 ? '' : opts.bottom,
							"left": selfLeft,
							"width": objWidth
						});
					}
					placeholder.css({
						'height': outerHeight,
						'width': outerWidth,
						'display': 'block'
					}).insertBefore(obj);
				} else if (ScrollTop >= endfix) {
					obj.addClass(opts.baseClassName).css({
						"z-index": zIndex,
						"position": "absolute",
						"top": endfix - parentOffsetTop + optsTop,
						'bottom': '',
						"left": selfLeft - parentOffsetLeft,
						"width": objWidth
					});
					placeholder.css({
						'height': outerHeight,
						'width': outerWidth,
						'display': 'block'
					}).insertBefore(obj)
				} else {
					obj.removeClass(opts.baseClassName).css({
						"z-index": originalZIndex,
						"position": "static",
						"top": "",
						"bottom": "",
						"left": ""
					});
					placeholder.remove()
				}
			}
			var Timer = 0;
			// if (isUnfixed) {
			resetScroll();
			// }
			$(window).on("scroll", function() {
				if (Timer) {
					clearTimeout(Timer);
				}
				Timer = setTimeout(onScroll, 0);
			});
			// 当发现调整屏幕大小时，重新执行代码
			$(window).on("resize", function() {
				if (Timer) {
					clearTimeout(Timer);
				}
				Timer = setTimeout(function() {
					isUnfixed = false;
					resetScroll();
					onScroll();
				}, 0);
			});
		})
	}
	$.fn.scrollFix.defaultOptions = {
		startTop: null, //滑到这个位置顶部时开始浮动，默认为空
		startBottom: null, //滑到这个位置末端开始浮动，默认为空
		distanceTop: 0, //固定在顶部的高度
		endPos: 0, //停靠在底部的位置，可以为jquery对象
		bottom: -1, //底部位置
		zIndex: 0, //z-index值
		baseClassName: 'scrollfixed' //开始固定时添加的类
	};
})(jQuery);