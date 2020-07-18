/**
 * returnType  string: 成功后的目标文字  denied: 不支持或权限被拒绝  failed: 失败   usage: 调用异常
 *
 */
declare class JSClipboard {
    /**
     * 复制
     * @param target 元素、元素id、文本
     */
    copy(target: HTMLElement | string): Promise<string>;
    /**
     * 剪切
     * @param selector 元素、元素id
     */
    cut(target: HTMLElement | string): Promise<string>;
    /**
     *
     * @param selector 元素、元素id
     */
    paste(target: HTMLElement | string): Promise<string>;
    /**
     * 获取当前剪贴板内容
     */
    get(): Promise<string>;
    /**
     * 禁止用户复制
     * @param target 页面元素 元素id 元素class 默认 document 对象
     * @param action 操作类型  默认 copy
     */
    deny(target?: HTMLElement | string, action?: 'copy' | 'paste'): void;
    /**
     * 复制时 自动添加文字
     * @param target 目标元素 元素id 元素class 默认document对象
     * @param text 需要补全的文字
     * 在 Firefox 中当目标元素时 input 或 textarea 时，不支持 getSelection 获取选中的内容，做了以下兼容
     */
    add(text: string, target?: HTMLElement | string): void;
    /**
     * 通过 id 返回页面元素
     * @param target 页面元素 / 元素id / 文本
     */
    private getElementById;
    /**
     * 判断是否为 元素class
     * @param target dom / string
     */
    private isClassName;
}
declare const _default: JSClipboard;
export default _default;
