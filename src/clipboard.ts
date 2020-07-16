/**
 * navigator.clipboard
 * 	Chrome: 需要在https的环境下才支持  clipboard-read / clipboard-write
 * 	Firefox: 出于安全考虑 不支持 clipboard-read / clipboard-write 需要降级使用 document.execCommand
 * 	Safari: 都不支持
 *
 * document.execCommand('copy')
 * This feature is obsolete. Although it may still work in some browsers,
 * its use is discouraged since it could be removed at any time. Try to avoid using it.
 * 都支持
 * 该方法已废弃，但是浏览器目前都支持 作为兼容的处理方案
 */
// window.isSecureContext
class JSClipboard {
  /**
   * 检测 clipboard-write 权限
   */
  private checkWritePermission(): void {
    // return navigator.clipboard.
  }

  copy(target: string) {}

  /**
   * avigator.clipboard.writeText
   * @param target 目标文字
   */
  private clipCopy(target: string) {}

  paste() {}
}

export default JSClipboard
