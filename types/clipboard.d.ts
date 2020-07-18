/**
 * navigator.clipboard
 * 	Chrome: 需要在https的环境下才支持  clipboard-read / clipboard-write
 * 	Firefox: 出于安全考虑 不支持 clipboard-read / clipboard-write 需要降级使用 document.execCommand
 * 	Safari: 都不支持
 *
 * typescript 类型检查 不支持 clipboard-read / clipboard-write
 */
declare class Clipboard {
    /**
     * 复制
     * @param target 目标文字 或者 页面元素
     */
    copy(target: string | HTMLElement): Promise<string>;
    /**
     * 剪切
     * @param selector 目标元素
     */
    cut(selector: HTMLElement): Promise<string>;
    /**
     * 粘贴
     * @param selector 页面元素
     */
    paste(selector?: HTMLElement): Promise<string>;
}
declare const _default: Clipboard;
export default _default;
