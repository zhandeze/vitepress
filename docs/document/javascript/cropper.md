

### options 参数

| 参数         | 说明         | 类型       | 可选值      | 默认值       |
| ----------- | ----------- |----------- |----------- |----------- |
| viewMode|定义裁剪器的视图模式。如果设置`viewMode`为`0`，则裁剪框可以延伸到画布之外，而`1`、`2`、 或的值`3`会将裁剪框限制为画布的大小。`viewMode`的`2`或`3`将额外限制画布到容器。之间不存在差异`2`并且`3`当所述画布与所述容器的比例是相同的。|  String| 0/1/2/3| 0 |
| dragMode | 定义裁剪器的拖动模式 | String | crop/move/none | crop |
| initialAspectRatio | 定义裁剪框的初始纵横比。默认情况下，它与画布（图像包装器）的纵横比相同。`仅当该aspectRatio选项设置为时可用NaN。` | Number | - | NaN |
| aspectRatio | 定义裁剪框的固定纵横比。默认情况下，裁剪框具有自由比例。 | Number | - | NaN | 
| data | 您之前存储的裁剪数据将`setData`在初始化时自动传递给该方法。 `仅在autoCrop选项设置为时可用true`| Object | - | null | 
| preview | 一个元素或元素数组或节点列表对象或`Document.querySelectorAll`的有效选择器 | Element, Array (elements), NodeList or String (selector) | - | '' |
| responsive | 调整窗口大小时重新渲染裁剪器。| Boolean | - | true |
| restore | 调整窗口大小后恢复裁剪区域。 | Boolean | - | true |
| checkCrossOrigin | 检查当前图像是否为跨域图像。如果是这样，`crossOrigin`将在克隆的图像元素中添加一个属性，并在该`src`属性中添加一个时间戳参数以重新加载源图像以避免浏览器缓存错误。向`crossOrigin`图像元素添加属性将停止向图像 `URL` 添加时间戳并停止重新加载图像。但是读取图像数据以进行方向检查的请求 `(XMLHttpRequest)` 将需要一个时间戳来破坏缓存以避免浏览器缓存错误。您可以将`checkOrientation`选项设置`false`为取消此请求。如果图片的`crossOrigin`属性值为"`use-credentials`"，则在通过 `XMLHttpRequest` 读取图片数据时，该`withCredentials`属性会设置为`true`。| Boolean | - | true |
| checkOrientation | 检查当前图像的 `Exif` 方向信息。请注意，只有 `JPEG` 图像可能包含 `Exif` 方向信息。确切地说，读取旋转或翻转图像的 `Orientation` 值，然后使用`1`（默认值）覆盖 `Orientation` 值以避免在 `iOS` 设备上出现一些问题`（1 , 2）`。需要同时设置`rotatable`和`scalable`选项`true`。注意：不要一直相信这一点，因为某些 `JPG` 图像可能具有不正确（非标准）的方向值.`需要类型数组支持（IE 10+）。`| Boolean | - | true |
| modal | 在图像上方和裁剪框下方显示黑色模式。 | Boolean | - | true |
| guides | 在裁剪框上方显示虚线。 | Boolean | - | true |
| center | 在裁剪框上方显示中心指示器。 | Boolean | - | true |
| highlight | 在裁剪框上方显示白色模式（突出显示裁剪框）。 | Boolean | - | true |
| background | 显示容器的网格背景  | Boolean | - | true |
| autoCrop | 启用在初始化时自动裁剪图像  | Boolean | - | true |
| autoCropArea | 它应该是一个介于 0 和 1 之间的数字。定义自动裁剪区域大小（百分比）。| Number | - | `0.8`(图像的 `80%`) | 
| movable | 启用移动图像  | Boolean | - | true |
| rotatable | 启用旋转图像  | Boolean | - | true |
| scalable | 启用以伸缩图像  | Boolean | - | true |
| zoomable | 启用以缩放图像  | Boolean | - | true |
| zoomOnTouch | 启用通过拖动触摸来缩放图像。  | Boolean | - | true |
| zoomOnWheel | 启用通过鼠标滚轮缩放图像。  | Boolean | - | true |
| wheelZoomRatio | 通过鼠标滚轮缩放图像时定义缩放比例。  | Number | - | 0.1 |
| cropBoxMovable | 启用通过拖动移动裁剪框  | Boolean | - | true |
| cropBoxResizable | 启用通过拖动来调整裁剪框的大小  | Boolean | - | true |
| toggleDragModeOnDblclick | 启用以在裁剪器上单击两次时在`crop`和之间切换拖动模式`move`。`需要dblclick事件支持`  | Boolean | - | true |
| minCanvasWidth | 容器的最小宽度  | Number | - | 200 |
| minCanvasHeight | 容器的最小高度  | Number | - | 100 |
| minCropBoxWidth | 画布的最小宽度（图像包装器）  | Number | - | 0 |
| minCropBoxHeight | 画布的最小高度（图像包装器）  | Number | - | 0 |
| minContainerWidth | 裁剪框的最小宽度。`注意：此大小是相对于页面，而不是图像。`  | Number | - | 0 |
| minContainerHeight | 裁剪框的最小高度。`注意：此大小是相对于页面，而不是图像。`  | Number | - | 0 |
| ready | ready事件的快捷方式。  | Function | - | null |
| cropstart | cropstart事件的快捷方式。  | Function | - | null |
| cropmove | cropmove事件的快捷方式  | Function | - | null |
| cropend | cropend事件的快捷方式  | Function | - | null |
| crop | crop事件的快捷方式  | Function | - | null |
| zoom | zoom事件的快捷方式  | Function | - | null |



## Methods

#### crop() 手动显示裁剪框
```js
new Cropper(image, {
  autoCrop: false,
  ready() {
    this.cropper.crop() //显示
  }
})
```

#### reset() 重置裁剪框

#### clear() 隐藏裁剪框

#### replace(url: string, hasSameSize: boolean)
1. url 一个新的图片网址
2. hasSameSize (可选) 默认 false
  - 如果新图像与旧图像大小相同，则不会重建裁剪器，只会更新所有相关图像的 URL。这可用于应用过滤器。


