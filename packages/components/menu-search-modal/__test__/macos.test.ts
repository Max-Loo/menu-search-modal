const originUserAgent = navigator.userAgent
let testFinished = false
// set userAgent to MacOS env
Object.defineProperty(global.navigator, 'userAgent', {
  get () {
    return testFinished ? originUserAgent : 'Mac'
  },
})

import { test, expect, describe, afterAll } from 'vitest'
import { mount } from '@vue/test-utils'
import MenuSearchModal from '../index'


afterAll(() => {
  testFinished = true
})

describe('MenuSearchModal in MacOS', () => {
  test('button text', () => {
    const wrapper = mount(MenuSearchModal)
    expect(wrapper.props('buttonContent')).toEqual('⌘ + K')
  })
})
