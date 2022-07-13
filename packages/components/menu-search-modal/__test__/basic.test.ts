import { test, expect, describe } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import MenuSearchModal, { MenuSearchModalOption } from '../index'
import { reactive, ref } from 'vue'
import Modal from 'ant-design-vue/es/modal'
import Button from 'ant-design-vue/es/button'

const menuOptions = ref<MenuSearchModalOption[]>([])

// simulate a menu
for (let a = 0; a < 5; a++) {
  menuOptions.value.push(reactive({
    label: `${a}`,
    value: `${a}`,
    children: [],
  }))
  for (let b = 0; b < 5; b++) {
    menuOptions.value[a]?.children?.push(reactive({
      label: `${a}-${b}`,
      value: `${a}-${b}`,
      children: [],
    }))
    for (let c = 0; c < 10; c++) {
      menuOptions.value[a]?.children?.[b].children?.push(reactive({
        label: `${a}-${b}-${c}`,
        value: `${a}-${b}-${c}`,
      }))
    }
  }
}


const _mount = () => {
  return mount(MenuSearchModal, {
    props: {
      options: menuOptions.value,
    },
  })
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

  test('open search modal', () => {
    const wrapper = shallowMount(MenuSearchModal)
    // wrapper.findComponent({ ref: 'outerButton' }).trigger('click')
    wrapper.findComponent(Button).trigger('click')
    console.log(wrapper.vm)

    expect(wrapper.emitted('update:modalVisible')[0][0]).toBe(true)
  })
})
