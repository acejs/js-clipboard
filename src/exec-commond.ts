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
   * 将目标文字放入一个页面上看不见的input框中 并粘贴进剪贴板后自动删除
   * document.execCommand('copy') 只能操作可编辑区域 input textarea
   * Chrome / Firefox / Safari 都支持
   * @param target 文字 / 元素 / input
   */
  copy(target: string | HTMLElement): Promise<string | Error> {
    return new Promise((resolve, reject) => {
      // 检测浏览器兼容状况
      const isSupported = document.queryCommandSupported('copy')
      if (!isSupported) return reject(new Error('denied'))

      let result: boolean
      let copyText: string

      // 判断是否是元素的可编辑区域
      if (isEditableElement(target)) {
        copyText = target.value
        target.select()
        result = document.execCommand('copy', false, undefined)
      } else {
        copyText = isElement(target) ? target.innerText : target

        const textArea = document.createElement('textarea')
        const body = document.querySelector('body')
        textArea.setAttribute(
          'style',
          'width: 0; height: 0; border: 0; opacity: 0; padding: 1px'
        )

        body?.append(textArea)
        textArea.value = copyText
        textArea.select()

        result = document.execCommand('copy', false, undefined)
        body?.removeChild(textArea)
      }

      return result ? resolve(copyText) : reject(new Error('failed'))
    })
  }

  /**
   * 在光标位置粘贴剪贴板内容，如果有被选中的内容会被替换
   * Chrome / Firefox / Safari 都不支持
   * @param selector html 元素
   */
  paste(selector: HTMLElement): Promise<string | Error> {
    return new Promise((resolve, reject) => {
      const isSupported = document.queryCommandSupported('paste')
      if (!isSupported) return reject(new Error('denied'))

      selector.focus()
      const result = document.execCommand('paste')

      return result ? resolve('success') : reject(new Error('failed'))
    })
  }
}

export default ExecCommond
