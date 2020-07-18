## js-clipboard

**Control system clipboard via javascript**



### Installing

```bash
npm install @cdjs/js-clipboard
// or
yarn add @cdjs/js-clipboard
```



### Usage

```javascript
import jsClipboard from '@cdjs/js-math'
```



### Documentation

| Method | Desc                                                         | Args                                                         | Type                                      | Return                              | Support Browser                               |
| ------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ----------------------------------------- | ----------------------------------- | --------------------------------------------- |
| get    | 获取当前剪贴板内容                                           | -                                                            | -                                         | Promise<string><br />Promise<error> | C: promot<br />F: denied<br />S: denied       |
| copy   | 复制                                                         | target: 目标元素/文本/元素id                                 | HTMLElement/string                        | Promise<string><br />Promise<error> | C: granted<br />F: granted<br />S: granted    |
| cut    | 剪切                                                         | target: 目标元素/元素id                                      | HTMLElement/string                        | Promise<string><br />Promise<error> | C: granted<br />F: granted<br />S: granted    |
| paste  | 粘贴                                                         | target: 目标元素/元素id                                      | HTMLElement/string                        | Promise<string><br />Promise<error> | C: promot<br />F: denied<br />S: denied<br /> |
| deny   | 禁止复制或粘贴，如果是作用于具体的元素，需要等元素渲染出来后再调用该方法 | target: 页面元素/ id/ class, 默认'document'<br />action: 操作行为, 默认 'copy' | HTMLElement/string<br />'copy' \| 'paste' | void                                | C: granted<br />F: granted<br />S: granted    |
| add    | 复制时自动加上文字，类似掘进的效果                           | text: 目标文字<br />target: 页面元素/ id/ class, 默认'document' | string<br />HTMLElement/string            | void                                | C: granted<br />F: granted<br />S: granted    |



>#### Browser
>
>- C: Chrome
>- F: Firefox
>- S: Safari
>
>#### Error类型
>
>- **denied**: 系统不支持或权限不足
>- **failed**: web api 调用失败，具体原因未知
>- **usage**: api 调用异常



###How to use

#####获取剪贴板内容

```javascript
jsClipboard.get()
	.then(str => { })
	.catch(err => { })
```



##### 复制、剪切、粘贴

```javascript
// paste cut 类似  注意传参
// copy 方法可以传入文字   paste / cut 只能传目标元素 或 元素id
jsClipboard.copy(target)
	.then(str => { })
	.catch(err => { })
```



##### 禁止复制、粘贴

```javascript
// 当 target 为具体的元素时，需要等元素渲染后在调用该方法
jsClipboard.deny(target)
```



##### 追加文字

```javascript
// 当 target 为具体的元素时，需要等元素渲染后在调用该方法
jsClipboard.add('\n作者: XuKang\nGitHub: https://github.com/BlueBlueBlueSky/js-clipboard', target)
```

