import { isEditableElement } from './utils'
/**
 * navigator.clipboard
 * 	Chrome: 需要在https的环境下才支持  clipboard-read / clipboard-write
 * 	Firefox: 出于安全考虑 不支持 clipboard-read / clipboard-write 需要降级使用 document.execCommand
 * 	Safari: 都不支持
 *
 * typescript 类型检查 不支持 clipboard-read / clipboard-write
 */
// window.isSecureContext
class Clipboard {
  /**
   * 复制
   * @param target 目标文字 或者 页面元素
   */
  async copy(target: string | HTMLElement): Promise<string> {
    let text
    if (typeof target === 'string') {
      text = target
    } else if (isEditableElement(target)) {
      text = target.value
    } else {
      text = target.innerText
    }
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      return Promise.reject('denied')
    }
    return text
  }

  /**
   * 剪切
   * @param selector 目标元素
   */
  async cut(selector: HTMLElement): Promise<string> {
    try {
      const text = await this.copy(selector)
      if (isEditableElement(selector)) {
        selector.value = ''
      } else {
        selector.innerText = ''
      }
      return text
    } catch (error) {
      return Promise.reject(error)
    }
  }

  /**
   * 粘贴
   * @param selector 页面元素
   */
  async paste(selector?: HTMLElement): Promise<string> {
    let text
    try {
      text = await navigator.clipboard.readText()
    } catch {
      return Promise.reject('denied')
    }

    // 将内容写进目标元素
    if (selector) {
      if (isEditableElement(selector)) {
        selector.value = text
      } else {
        selector.innerText = text
      }
    }

    return text
  }
}

export default new Clipboard()
