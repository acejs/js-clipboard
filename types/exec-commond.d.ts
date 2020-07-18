/**
 * This feature is obsolete.
 * Although it may still work in some browsers, its use is discouraged since it could be removed at any time.
 * Try to avoid using it.
 *
 * 作为兼容的兜底方案
 *
 * 该类下的 api 都是同步的 需要通过 promise 包装一下
 */
declare class ExecCommond {
    /**
     * document.execCommand('copy') 只能操作可编辑区域 input textarea
     * Chrome / Firefox / Safari 都支持
     * @param target 文字 / 元素 / input
     */
    copy(target: string | HTMLElement): Promise<string>;
    /**
     * cut 方法只支持传入目标元素
     * @param selector 目标元素
     */
    cut(selector: HTMLElement): Promise<string>;
    /**
     * 在光标位置粘贴剪贴板内容，如果有被选中的内容会被替换
     * Chrome / Firefox / Safari 都不支持
     * @param selector html 元素
     */
    paste(selector: HTMLElement): Promise<string>;
    /**
     * 复制纯文字
     * 将目标文字放入一个页面上看不见的input框中 并粘贴进剪贴板后自动删除
     * @param target 目标文字
     */
    private _copyText;
    /**
     * 是否支持 copy
     */
    private _isSupport;
}
declare const _default: ExecCommond;
export default _default;
