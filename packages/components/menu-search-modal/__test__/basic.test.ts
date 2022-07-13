import { test, expect, describe } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import MenuSearchModal, { MenuSearchModalOption } from '../index'
import Modal from 'ant-design-vue/es/modal'
import Button from 'ant-design-vue/es/button'

const menuOptions: MenuSearchModalOption[] = []

// simulate a menu
for (let a = 0; a < 5; a++) {
  menuOptions.push({
    label: `${a}`,
    value: `${a}`,
    children: [],
  })
  for (let b = 0; b < 5; b++) {
    menuOptions[a]?.children?.push({
      label: `${a}-${b}`,
      value: `${a}-${b}`,
      children: [],
    })
    for (let c = 0; c < 10; c++) {
      menuOptions[a]?.children?.[b].children?.push({
        label: `${a}-${b}-${c}`,
        value: `${a}-${b}-${c}`,
      })
    }
  }
}

describe('MenuSearchModal', () => {
  test('mount component', async () => {
    expect(MenuSearchModal).toBeTruthy()
    const wrapper = mount(MenuSearchModal)
    expect(wrapper.findComponent(Modal).exists()).toBeTruthy()
    expect(wrapper.findComponent(Button).exists()).toBeTruthy()
  })

  test('button text', () => {
    const wrapper = mount(MenuSearchModal)
    expect(wrapper.props('buttonContent')).toEqual('Ctrl + K')
  })

  test('open search modal', async () => {
    const wrapper = shallowMount(MenuSearchModal)
    await wrapper.findComponent(Button).trigger('click')

    expect(wrapper.emitted('update:modalVisible')[0][0]).toBe(false)
    expect(wrapper.emitted('update:modalVisible')[1][0]).toBe(true)
  })

  test('search value', async () => {
    const wrapper = shallowMount(MenuSearchModal, {
      props: {
        options: menuOptions
      }
    })

    await wrapper.findComponent(Button).trigger('click')
    
  })
})
