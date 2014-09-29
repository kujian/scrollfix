// 创建一个闭包  
(function($) {  
  // 插件的定义  
  $.fn.scrollfix = function(options) {  
    debug(this);  
    // build main options before element iteration  
    var opts = $.extend({}, $.fn.scrollfix.defaults, options);  
    // iterate and reformat each matched element  
    return this.each(function() {  
      $this = $(this);  
      if($this.length <= 0) return ;
      // build element specific options  
      var o = $.meta ? $.extend({}, opts, $this.data()) : opts;  
      // update element styles  
      $this.css({  
        backgroundColor: o.background,  
        color: o.foreground  
      });  
      var markup = $this.html();  
      // call our format function  
      markup = $.fn.scrollfix.format(markup);  
      $this.html(markup);  
      var parentOffset = 0
      
      
        
        

      function resetScroll() {
        var myParent = $this.parent();
      var Position = myParent.css('position');
      while(!/^relative|absolute$/i.test(Position)){ //检测浮动元素的父类元素定位为'relative'或者'absolute',是的话退出，否则的话，执行循环，继续寻找它的父类
        myParent = myParent.parent();
        Position = myParent.css('position');
        if(/^body|html$/i.test(myParent[0].tagName)) break; //假如父类元素的标签为body或者HTML，说明没有找到父类为以上的定位，退出循环
      }
      if(/^body|html$/i.test(myParent[0].tagName)){ //当父类元素非body或者HTML时，说明找到了一个父类为'relative'或者'absolute'的元素，得出它的偏移高度
        var parentOffset =  {top:0,left:0};
      }else{
        var parentOffset =  myParent.offset();
        
      }
        console.log(parentOffset.top);
      }
      function onScroll(){
        var ScrollTop = $(window).scrollTop();
        if ((ScrollTop > toTop) && (ScrollTop < endfix)) {
          $this.fadeIn().css({
            "position": "fixed",
            "top": optsTop,
            "left": offsetLeft,
            "width": objWidth
          });
          if(ie6){//IE6则使用这个样式
            $this.css({
              "position":"absolute",
              "top":ScrollTop + optsTop - parentsOffset.top,
              "left": offsetLeft
            })
          }
          placeholder.css({
            'height': outerHeight
          }).insertBefore(obj)
        } else if (ScrollTop >= endfix) {
          $this.css({
            "position": "absolute",
            "top": endfix - parentsOffset.top,
            "left": offsetLeft - parentsOffset.left,
            "width": objWidth
          });
          placeholder.css({
            'height': outerHeight
          }).insertBefore(obj)
        } else {
          $this.css({
            "position": "static",
            "top": "",
            "left": ""
          });
          placeholder.remove()
        }
      };
      $(window).on("scroll",function(){
        resetScroll();
      })
    });  
  };  
  // 私有函数：debugging  
  function debug($obj) {  
    if (window.console && window.console.log)  
      window.console.log('scrollfix selection count: ' + $obj.size());  
  };
  $.fn.scrollfix.getOffset = function(evt){
    var myParent = evt.parent();
      var Position = myParent.css('position');
      while(!/^relative|absolute$/i.test(Position)){ //检测浮动元素的父类元素定位为'relative'或者'absolute',是的话退出，否则的话，执行循环，继续寻找它的父类
        myParent = myParent.parent();
        Position = myParent.css('position');
        if(/^body|html$/i.test(myParent[0].tagName)) break; //假如父类元素的标签为body或者HTML，说明没有找到父类为以上的定位，退出循环
      }
      if(/^body|html$/i.test(myParent[0].tagName)){ //当父类元素非body或者HTML时，说明找到了一个父类为'relative'或者'absolute'的元素，得出它的偏移高度
        return {top:0,left:0};
      }else{
        return myParent.offset();
        
      }
  }
  // 定义暴露format函数  
  $.fn.scrollfix.format = function(txt) {  
    return '<div class="extra-wrap">' + txt + '</div>';  
  };  
  // 插件的defaults  
  $.fn.scrollfix.defaults = {  
    startTop: null, //滑到这个位置顶部时开始浮动，默认为空
    startBottom: null, //滑到这个位置末端开始浮动，默认为空
    distanceTop: 0, //固定在顶部的高度
    endHeight: 0, //停靠在底部的高度
    endPos: null //停靠在底部的jquery对象
  };  
// 闭包结束  
})(jQuery);