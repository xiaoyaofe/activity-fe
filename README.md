# 活动页

## 配置步骤

1. src/config中根据规则在page中新建自己的配置文件
2. 在 src/pages中新建自己的页面
3. 在 .env 文件中写入自己页面所在的文件夹的名称

**Tips:**<Br>
1. 配置文件的文件名和对应页面的文件名必须是.env中定义的名称,具体规则是:游戏名缩写 + _ + 地区(首字母大写) + _ +活动页上线日期 (如:vs_Tw_20191001)
2. 具体的配置规则见对应文件夹中`read.md`文件
3. 如果修改 common/scss/global 和 config 中的文件需要重新启动

## 启动

yarn or npm run serve 

## 打包

yarn or npm run build 

## 打测试包

yarn or npm run dev-build


## 设计理念

复用, 易于扩展

1. 每个活动需要提供一个mixin来做混入
2. 接口返回数据需要做一次映射,做数据解耦
3. 提供基础的组件来屏蔽平台差异(如:click在pc 和 mobile 中的差异)
4. 样式文件根据大小来判断 pc 和 mobile 768px

## 查看顺序

pachage.json -> vue.config.js -> pages/ 

## 活动页条件设计

做活动页的目的是为了拉动游戏的活跃和消费,因此登录做成登录游戏会对提高活跃有一定的帮助,也可以登录就送,有了奖励会增加玩家去游戏查看的可能;消费需要看活动机制和奖励的好坏,来确定拉收的程度

## 作用的单词 

###CSS书写顺序:<br/>>

1. 位置属性(position, top, right, z-index, display, float等)
2. 大小(width, height, padding, margin)
3. 文字系列(font, line-height, letter-spacing, color- text-align等)
4. 背景(background, border等)
5. 其他(animation, transition等)

### 规范:

css 书写规则 https://github.com/fex-team/styleguide/blob/master/css.md <br/>

css 中的命名采用BEN命名规范. https://jiandanxinli.github.io/2016-08-11.html <br/>

BEM 规则中如果嵌套太深重新审视:
- 如果一个区域可以复用且不依赖其它组件，则可作为一个块（Block）。
- 如果一个区域不能拿到外部单独使用，那么就应该作为一个元素（Element）。
- 素不能单独使用，只能作为块的一部分使用。元素不能包含元素，因为这样做会妨碍块内部元素位置的层级调整。
http://lightcss.com/common-mistakes-of-bem-naming/
https://zcfy.cc/article/battling-bem-extended-edition-10-common-problems-and-how-to-avoid-them

慢慢过渡

1. css 中不要使用 Id 选择器即 #xxx;
2. 尽量使用CSS缩写属性
3. 尽量去掉小数点前的“0” 如 0.8rem写为.8rem
4. 使用众所周知的简写来命名,如 button 使用 btn 如使用特定简写请注释源
5. 16进制颜色代码能缩写就缩写 如: #ffffff 写为: #fff;
6. 连字符CSS选择器命名规范,使用 `-` 如: main-title
    - 输入的时候少按一个shift键；
    - 浏览器兼容问题 （比如使用_tips的选择器命名，在IE6是无效的）
    - 能良好区分JavaScript变量命名（JS变量命名是用“_”）
7. 为选择器添加状态前缀,如 .is-  
8. 使用以下注释来为css分块
```css

/*------------------------------------*\
  #BAR
\*------------------------------------*/

```

9. 动画我们使用优雅降级:对于功能性的动画使用动画库来做,非功能性动画,使用css3 transition,和 animation 来做.功能性动画,如转盘转动,翻卡,区服选择下拉等,非功能性动画, 登录框的淡入淡出等

头：header
内容：content/container
尾：footer
导航：nav
侧栏：sidebar
栏目：column
页面外围控制整体佈局宽度：wrapper
左右中：left right center
登录条：loginbar
标志：logo
广告：banner
页面主体：main
热点：hot
新闻：news
下载：download
子导航：subnav
菜单：menu
子菜单：submenu
搜索：search
友情链接：friendlink
页脚：footer
版权：copyright
滚动：scroll
内容：content
标签：tags
文章列表：list
提示信息：msg
小技巧：tips
栏目标题：title
加入：joinus
指南：guide
服务：service
注册：regsiter
状态：status
投票：vote
合作伙伴：partner

注释的写法:
/* Header */
内容区
/* End Header */

Id的命名:
1)页面结构

容器: container
页头：header
内容：content/container
页面主体：main
页尾：footer
导航：nav
侧栏：sidebar
栏目：column
页面外围控制整体佈局宽度：wrapper
左右中：left right center

(2)导航

导航：nav
主导航：mainnav
子导航：subnav
顶导航：topnav
边导航：sidebar
左导航：leftsidebar
右导航：rightsidebar
菜单：menu
子菜单：submenu
标题: title
摘要: summary

(3)功能

标志：logo
广告：banner
登陆：login
登录条：loginbar
注册：register
搜索：search
功能区：shop
标题：title
加入：joinus
状态：status
按钮：btn
滚动：scroll
标籤页：tab
文章列表：list
提示信息：msg
当前的: current
小技巧：tips
图标: icon
注释：note
指南：guild
服务：service
热点：hot
新闻：news
下载：download
投票：vote
合作伙伴：partner
友情链接：link
版权：copyright

注意事项::
1.一律小写;
2.尽量用英文;
3.不加中槓和下划线;
4.尽量不缩写，除非一看就明白的单词。

 

CSS样式表文件命名
主要的 master.css
模块 module.css
基本共用 base.css
布局、版面 layout.css
主题 themes.css
专栏 columns.css
文字 font.css
表单 forms.css
补丁 mend.css
打印 print.css
