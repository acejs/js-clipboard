import clip from './clipboard'
import exec from './exec-commond'
import { isEditableElement } from './utils'

/**
 * returnType  string: 成功后的目标文字  denied: 不支持或权限被拒绝  failed: 失败   usage: 调用异常
 *
 */
class JSClipboard {
  /**
   * 复制
   * @param target 元素、元素id、文本
   */
  async copy(target: HTMLElement | string): Promise<string> {
    target = this.getElementById(target)

    let result: string

    try {
      result = await clip.copy(target)
    } catch {
      try {
        result = await exec.copy(target)
      } catch (error) {
        result = error
      }
    }

    return result === 'denied' || result === 'failed'
      ? Promise.reject(result)
      : Promise.resolve(result)
  }

  /**
   * 剪切
   * @param selector 元素、元素id
   */
  async cut(target: HTMLElement | string) {
    const selector = this.getElementById(target)

    if (typeof selector === 'string') return Promise.reject('usage')

    let result: string

    try {
      result = await clip.cut(selector)
    } catch {
      try {
        result = await exec.cut(selector)
      } catch (error) {
        result = error
      }
    }

    return result === 'denied' || result === 'failed'
      ? Promise.reject(result)
      : Promise.resolve(result)
  }

  /**
   *
   * @param selector 元素、元素id
   */
  async paste(target: HTMLElement | string) {
    const selector = this.getElementById(target)
    if (typeof selector === 'string') return Promise.reject('usage')

    let result: string

    try {
      result = await clip.paste(selector)
    } catch {
      try {
        result = await exec.paste(selector)
      } catch (error) {
        result = error
      }
    }

    return result === 'denied' || result === 'failed'
      ? Promise.reject(result)
      : Promise.resolve(result)
  }

  /**
   * 获取当前剪贴板内容
   */
  async get(): Promise<string> {
    let result
    try {
      result = await clip.paste()
    } catch (error) {
      result = error
    }

    return result === 'denied' || result === 'failed'
      ? Promise.reject(result)
      : Promise.resolve(result)
  }

  /**
   * 禁止用户复制
   * @param target 页面元素 元素id 元素class 默认 document 对象
   * @param action 操作类型  默认 copy
   */
  deny(
    target: HTMLElement | string = 'document',
    action: 'copy' | 'paste' = 'copy'
  ) {
    if (this.isClassName(target) && typeof target === 'string') {
      // 当为class类型时 将事件委派到document对象上
      document.addEventListener(action, event => {
        if (
          event.target instanceof Element &&
          Array.from(event.target.classList).includes(target)
        ) {
          event.preventDefault()
        }
      })
    } else {
      const result = this.getElementById(target)
      // 当入参为string时 默认监听document对象
      const selector =
        target === 'document' || typeof result === 'string' ? document : result

      selector.addEventListener(action, event => {
        event.preventDefault()
      })
    }
  }

  /**
   * 复制时 自动添加文字
   * @param target 目标元素 元素id 元素class 默认document对象
   * @param text 需要补全的文字
   * 在 Firefox 中当目标元素时 input 或 textarea 时，不支持 getSelection 获取选中的内容，做了以下兼容
   */
  add(text: string, target: HTMLElement | string = 'document') {
    // 拦截默认行为
    function full(event: ClipboardEvent, text: string) {
      event.preventDefault()

      let copy: string
      const activeElement = document.activeElement as HTMLElement

      // 兼容 Firefox 处理
      if (isEditableElement(activeElement)) {
        copy = activeElement.value.substring(
          activeElement.selectionStart!,
          activeElement.selectionEnd!
        )
      } else {
        copy = window.getSelection()?.toString()!
      }

      const final = copy === '' ? copy : copy + text
      return event.clipboardData?.setData('text', final)
    }

    if (this.isClassName(target) && typeof target === 'string') {
      // 当为class类型时 将事件委派到document对象上
      document.addEventListener('copy', event => {
        if (
          event.target instanceof Element &&
          Array.from(event.target.classList).includes(target)
        ) {
          return full(event, text)
        }
      })
    } else {
      const result = this.getElementById(target)
      const selector =
        target === 'document' || typeof result === 'string' ? document : result

      document.addEventListener('copy', event => {
        if (selector === document || selector === event.target) {
          return full(event, text)
        }
      })
    }
  }

  /**
   * 通过 id 返回页面元素
   * @param target 页面元素 / 元素id / 文本
   */
  private getElementById(target: HTMLElement | string) {
    return (
      (typeof target === 'string' && document.getElementById(target)) || target
    )
  }

  /**
   * 判断是否为 元素class
   * @param target dom / string
   */
  private isClassName(target: HTMLElement | string): boolean {
    return (
      typeof target === 'string' &&
      document.getElementsByClassName(target).length > 0
    )
  }
}

export default new JSClipboard()
