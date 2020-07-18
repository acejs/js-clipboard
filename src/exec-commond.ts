import { isEditableElement, isElement } from './utils'

/**
 * This feature is obsolete.
 * Although it may still work in some browsers, its use is discouraged since it could be removed at any time.
 * Try to avoid using it.
 *
 * 作为兼容的兜底方案
 *
 * 该类下的 api 都是同步的 需要通过 promise 包装一下
 */
class ExecCommond {
  /**
   * document.execCommand('copy') 只能操作可编辑区域 input textarea
   * Chrome / Firefox / Safari 都支持
   * @param target 文字 / 元素 / input
   */
  copy(target: string | HTMLElement): Promise<string> {
    return new Promise((resolve, reject) => {
      // 检测浏览器兼容状况
      if (!this._isSupport('copy')) return reject('denied')

      let result: boolean
      let text: string

      // 判断是否是元素的可编辑区域
      if (isEditableElement(target)) {
        text = target.value
        target.select()
        result = document.execCommand('copy', false, undefined)
        target.blur()
      } else {
        text = isElement(target) ? target.innerText : target
        result = this._copyText(text)
      }

      return result ? resolve(text) : reject('failed')
    })
  }

  /**
   * cut 方法只支持传入目标元素
   * @param selector 目标元素
   */
  cut(selector: HTMLElement): Promise<string> {
    return new Promise((resolve, reject) => {
      const supportCut = this._isSupport('cut')
      const supportCopy = this._isSupport('copy')

      if (!supportCopy || !supportCut) return reject('denied')
      let result: boolean
      let text: string

      if (supportCut && isEditableElement(selector)) {
        selector.select()
        text = selector.value
        result = document.execCommand('cut', false, undefined)
        selector.blur()
      } else {
        if (isEditableElement(selector)) {
          text = selector.value
          selector.value = ''
        } else {
          text = selector.innerText
          selector.innerText = ''
        }
        result = this._copyText(text)
      }

      return result ? resolve(text) : reject('failed')
    })
  }

  /**
   * 在光标位置粘贴剪贴板内容，如果有被选中的内容会被替换
   * Chrome / Firefox / Safari 都不支持
   * @param selector html 元素
   */
  paste(selector: HTMLElement): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this._isSupport('paste')) return reject('denied')

      selector.focus()
      const result = document.execCommand('paste')

      return result ? resolve('success') : reject('failed')
    })
  }

  /**
   * 复制纯文字
   * 将目标文字放入一个页面上看不见的input框中 并粘贴进剪贴板后自动删除
   * @param target 目标文字
   */
  private _copyText(target: string): boolean {
    const textArea = document.createElement('textarea')
    const body = document.querySelector('body')
    textArea.setAttribute(
      'style',
      'width: 0; height: 0; border: 0; opacity: 0; padding: 1px'
    )

    body?.append(textArea)
    textArea.value = target
    textArea.select()

    const result = document.execCommand('copy', false, undefined)
    body?.removeChild(textArea)

    return result
  }

  /**
   * 是否支持 copy
   */
  private _isSupport(action: 'copy' | 'cut' | 'paste'): boolean {
    return document.queryCommandSupported(action)
  }
}

export default new ExecCommond()
