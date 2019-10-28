# Join组件

join组件是使用join接口的活动的通用组件,接收参数:

```ts

	interface ActInfo {
    /* 活动名,对应配置中的活动 actId 中的 key */
    actName: string;
      /* 礼包数组中的下标,对应配置中的活动 rewardId 对应 actName 中的 index */
    giftIndex: number;
    // 是否已经领取
    isDisabled: boolean;
    /* 是否显示对用的joinBtn */
		isShow: boolean;
	}
	props: {
    /* 活动的 section 类名 */
			className: {
				type: String,
				required: true
      },
      /* 活动的描述 */
      desc:String,
      /* join接口的参数 */
			actInfos: {
				type: Array,
				required: true
			} as ActInfo[]
    },
    
```

引用组件: 
Activity (src/components/base/Activity);

使用效果参见 vs_Tw_20191001

tip:需注意最后的提示文本可能需要修改