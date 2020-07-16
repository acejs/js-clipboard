// 判断是否为 dom 元素
export const isElement = (node: string | HTMLElement): node is HTMLElement => {
  return (
    !!node &&
    typeof node !== 'string' &&
    node.nodeType === 1 &&
    node instanceof Node
  )
}

// 判断是否为 input 元素
export const isEditableElement = (
  node: string | HTMLElement
): node is HTMLInputElement | HTMLTextAreaElement => {
  return (
    isElement(node) &&
    (node.nodeName === 'INPUT' || node.nodeName === 'TEXTAREA')
  )
}
