import { test, expect, describe } from 'vitest'
import { mount } from '@vue/test-utils'
import MenuSearchModal from '../index'
import Modal from 'ant-design-vue/es/modal'
import Button from 'ant-design-vue/es/button'


describe('MenuSearchModal', () => {
  test('mount component', async () => {
    expect(MenuSearchModal).toBeTruthy()
    const wrapper = mount(MenuSearchModal, {
      props: {
        options: [],
      },
    })
    expect(wrapper.findComponent(Modal).exists()).toBeTruthy()
    expect(wrapper.findComponent(Button).exists()).toBeTruthy()
  })

  test('button text', () => {
    const wrapper = mount(MenuSearchModal)
    expect(wrapper.props('buttonContent')).toEqual('Ctrl + K')
  })
})
