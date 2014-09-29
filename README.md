scrollfix
=========

jquery插件：滑动到某个位置浮动起来

<a href="http://caibaojian.com/scrollfix">插件参数详解和在线演示</a>


插件参数有4个，下面我将说明一下如何使用这个浮动固定插件

###第一个：startTop:null#

这个是定义什么时候指定的元素开始浮动，如果没有设置，则默认滚动指定元素位置开始浮动。如有指定，可以为startTop:"#startTop",当元素到达这个标签的顶部时，则浮动出来。

###第二个：startBottom:null#

这个同样是定义元素什么时候开始浮动，跟上面不能冲突，只能指定一个。两个如果都指定，则默认后面这个参数为准。这个是当元素滚动到startBottom:"#startBottom"的末端时开始浮动。

###第三个：distanceTop:0#

距离顶部的高度，默认为0。

###第四个：endPos:0#

距离顶部的高度为多少时停止浮动，并固定在相应位置，可以指定jquery对象，如:endPos:"#footer",也可以是数字：endPos:300.

###第五个：bottom:-1#

默认不使用位置为bottom的值，当设置为0，将会停在窗口底端

###第六个：zIndex:0#

当没有设置这个值时，将默认使用元素的css z-index值

###第七个：baseClassName：scrollfixed#

当元素开始固定时给它添加一个class，你可以设置为你喜欢的类名。


###使用方法

$("#fix").scrollFix({startTop:"#startTop",distanceTop:20,endPos:"#footer"});

具体你可以下载我里面提供的六个静态文件，给出了六种可能性。希望你会喜欢上这个插件。enjoy it!

###贡献者

感谢“Plāybǒy”发现插件的bug，并把演示发给我。谢谢

###版本
1.2 2013-10-29

 * 更新了startTop和startBottom的代码
 * 更新了在线演示代码

1.3 2014-6-17

 * 修复了当设置开始停止固定的高度大于元素距离底部高度时，不处理浮动固定
 * 修复了元素的高度加上margin-bottom的值
 * 修复了当元素没有触发position:fixed时，给元素增加一个填充元素的高度。
 
1.4 2014-9-4

 * 修复了上次开始停止固定的高度大于元素距离底部高度时，不处理浮动固定
 * 数值改为浮点数
 * 增加了对marginBottom为auto时的处理
 * 增加了两个混合的使用例子
 * 兼容IE6
 * 增加了对body有top值时修正固定的顶部高度
 
1.7 2014-9-29

 * 增加了三个参数，分别是bottom、zIndex和baseClassName.
 * 支持自适应布局,支持缩小窗口，即resize
 * 兼容IE6，支持上一级为position:relative或者position:absolute.
 * 如果没有什么重大的改动的话就是最后一个版本了。
 * 另外附上一个scrollfix-1.4.js的版本，这个是不支持自适应的最后一个版本，同时也没有以上加的三个参数。