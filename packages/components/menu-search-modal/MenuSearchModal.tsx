// basic
import { defineComponent, nextTick, ref, toRefs, VNodeRef, watchEffect } from 'vue'
import type { PropType } from 'vue'
import debounce from 'lodash-es/debounce'

// antdv components
import Modal from 'ant-design-vue/es/modal'
import 'ant-design-vue/es/modal/style/css'
import Button from 'ant-design-vue/es/button'
import type {
  ButtonType,
  ButtonSize,
  ButtonShape,
} from 'ant-design-vue/es/button'
import 'ant-design-vue/es/button/style/css'
import Input from 'ant-design-vue/es/input'
import 'ant-design-vue/es/input/style/css'

// icon
import SearchOutlined from '@ant-design/icons-vue/SearchOutlined'
import MenuOutlined from '@ant-design/icons-vue/MenuOutlined'
import EnterOutlined from '@ant-design/icons-vue/EnterOutlined'

export type MenuSearchModalOption = {
  label: string | number
  value: string | number
  disabled?: boolean
  children?: MenuSearchModalOption[]
}

type SearchResultOption = MenuSearchModalOption & {
  pathStr: string
}

const isMacOS = /Mac/i.test(navigator.userAgent)

export default defineComponent({
  name: 'MenuSearchModal',
  props: {
    /**
     * button props
     */
    buttonType: {
      type: String as PropType<ButtonType>,
      default: 'default',
    },
    buttonSize: {
      type: String as PropType<ButtonSize>,
      default: 'middle',
    },
    buttonShape: {
      type: String as PropType<ButtonShape>,
      default: 'round',
    },
    buttonContent: {
      type: String,
      default: isMacOS ? '⌘ + K' : 'Ctrl + K',
    },
    /**
     * modal props
     */
    modalVisible: {
      type: Boolean,
      default: false,
    },
    /**
     * input element props
     */
    autofocus: {
      type: Boolean,
      default: true,
    },
    /**
     * data
     */
    options: {
      type: Array as PropType<MenuSearchModalOption[]>,
      default: () => ([]),
    },
  },
  emits: ['update:modalVisible', 'select'],
  setup (props, { emit, slots }) {
    const {
      buttonType,
      buttonSize,
      buttonShape,
      buttonContent,
      options,
    } = toRefs(props)

    const inputRef = ref<VNodeRef>('')
    const selectedResultRef = ref()

    // making the visible of modal independent
    const modalVisibleProxy = ref(props.modalVisible)

    // the user input value
    const inputValue = ref('')

    const searchResult = ref<SearchResultOption[]>([])
    const selectedSearchResultIndex = ref(-1)

    watchEffect(() => {
      emit('update:modalVisible', modalVisibleProxy.value)
      if (!modalVisibleProxy.value) {
        closeSearchModal()
      }
    })

    // Open the search modal
    function openSearchModal () {
      modalVisibleProxy.value = true
      // autofocus when open modal
      nextTick(() => {
        if (props.autofocus) {
          inputRef.value?.focus?.()
        }
      })
    }

    function closeSearchModal () {
      // clear the search result when close the modal
      searchResult.value = []
      // clear the input value
      inputValue.value = ''
    }

    // Add keyboard shortcut
    window.addEventListener('keydown', (event) => {
      switch (event.code) {
        case 'KeyK': {
          if (event.metaKey || event.ctrlKey) {
            event.preventDefault()
            openSearchModal()
          }
          break
        }
        case 'ArrowDown': {
          if (modalVisibleProxy.value) {
            if (searchResult.value.length && selectedSearchResultIndex.value < searchResult.value.length - 1) {
              handleMouseenterResult(selectedSearchResultIndex.value + 1)
            }
            event.preventDefault()
          }
          break
        }
        case 'ArrowUp': {

          if (modalVisibleProxy.value) {
            if (searchResult.value.length && selectedSearchResultIndex.value > 0) {
              handleMouseenterResult(selectedSearchResultIndex.value - 1)
            }
            event.preventDefault()
          }
          break
        }
        case 'Enter': {
          if (selectedSearchResultIndex.value >= 0) {
            handleClickResult(searchResult.value[selectedSearchResultIndex.value])
          }
          break
        }
        case 'Escape': {
          modalVisibleProxy.value = false
          closeSearchModal()
          break
        }
      }
    })

    function toSearchMenu (target: string| number) {
      // clear the history result
      searchResult.value = []
      // reset the history selected index
      selectedSearchResultIndex.value = -1

      if (!target.toLocaleString()) {
        return
      }

      // build the search result
      function traverse (menu: MenuSearchModalOption, previousPathStr = '') {
        const {
          label,
          children,
        } = menu
        const pathStr = previousPathStr ? `${previousPathStr} / ${label}` : `${label}`
        if (Array.isArray(children) && children.length > 0) {
          children.forEach(option => {
            traverse(option, pathStr)
          })
        } else {
          // reach leaf node
          searchResult.value.push({
            ...menu,
            pathStr,
          })
        }
      }

      // inner search function
      function recursiveSearch (menu: MenuSearchModalOption[], previousPathStr = '') {
        menu.forEach(option => {
          const pathStr = previousPathStr ? `${previousPathStr} / ${option.label}` : `${option.label}`
          if (option.label.toLocaleString().includes(target.toLocaleString())) {
            traverse(option, previousPathStr)
          } else if (Array.isArray(option.children)) {
            recursiveSearch(option.children, pathStr)
          }
        })
      }

      // launch search
      recursiveSearch(options.value)
    }

    const handleInputValueChange = debounce(() => {
      // when the input value change, start searching result
      toSearchMenu(inputValue.value.trim())
    }, 300)

    function handleMouseenterResult (index: number) {
      //  store the hover result
      selectedSearchResultIndex.value = index
      nextTick(() => {
        selectedResultRef.value?.scrollIntoView?.(false)
      })
    }

    function handleClickResult (menu: SearchResultOption) {
      const { label, value, disabled } = menu
      emit('select', { label, value, disabled })
    }

    return () => (<>
      <Button
        ref="outerButton"
        class="!flex items-center justify-center"
        type={buttonType.value}
        size={buttonSize.value}
        shape={buttonShape.value}
        icon={<SearchOutlined />}
        onClick={openSearchModal}
      >
        {/* render slot or default value */}
        { buttonShape.value !== 'circle'
          ? (slots?.buttonContent?.() || buttonContent.value)
          : '' }
      </Button>
      <Modal v-model:visible={modalVisibleProxy.value}
        footer={null}
        closable={false}
        mask-style={{ backgroundColor: 'rgba(101,108,133,0.8)' }}
        body-style={{ padding: 0, backgroundColor: 'rgba(8, 8, 8, 0.04)' }}
      >
        {/* modal body */}
        <div class="p-3">
          {/* search input */}
          <div
            class="flex items-center justify-between w-full h-10 px-2 border-2 border-gray-400 rounded bg-white mr-3"
          >
            <SearchOutlined class="text-lg text-gray-500" />
            <Input v-model:value={inputValue.value}
              ref={inputRef}
              bordered={false}
              placeholder="Search menu"
              onChange={() => { handleInputValueChange() }}
            />
          </div>
          {/* search result */}
          { searchResult.value.length > 0 && (<div class="mt-2">
            Found {searchResult.value.length} results
          </div>) }
          <div class="max-h-96 overflow-y-auto">
            { searchResult.value.map((menu, index) => {
              return (
                <div
                  ref={index === selectedSearchResultIndex.value ? selectedResultRef : ''}
                  class={
                    'flex items-center justify-between w-full h-10 pl-3 pr-4 rounded bg-white mt-1 cursor-pointer'
                    + (index === selectedSearchResultIndex.value ? ' text-white bg-gray-400' : '')
                  }
                  onMouseenter={() => handleMouseenterResult(index)}
                  onClick={() => handleClickResult(menu)}
                >
                  <div class="flex items-center justify-start h-full">
                    <MenuOutlined />
                    <span class="ml-2 overflow-hidden h-full flex items-center">{menu.pathStr}</span>
                  </div>
                  {index === selectedSearchResultIndex.value && <EnterOutlined />}
                </div>
              )
            })}
          </div>
        </div>
      </Modal>
    </>)
  },
})
