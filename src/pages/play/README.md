## 游戏主界面

进入页面需要判断URL上携带的参数，

参数类型按照优先级主要分为

1. `level={1、2、3}`, 按照关卡分，预设了3个关卡，根据level，从`defaultLevelList`获取`题目参数`
2. `type=endless`, 无尽模式，