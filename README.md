# 活动页

## 配置步骤

1. src/config中根据规则在page中新建自己的配置文件
2. 在 src/pages中新建自己的页面
3. 在 .env 文件中写入自己页面所在的文件夹的名称

**Tips:**<Br>
1. 配置文件的文件名和对应页面的文件名必须是.env中定义的名称,具体规则是:游戏名缩写 + _ + 地区(首字母大写) + _ +活动页上线日期 (如:vs_Tw_20191001)
2. 具体的配置规则见对应文件夹中`read.md`文件

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
