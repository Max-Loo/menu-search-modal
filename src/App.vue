<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen"
  >
    <div>write you test code here</div>
    <MenuSearchModalTsx :options="menuOptions" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import MenuSearchModalTsx, { MenuSearchModalOption } from '../packages/components/menu-search-modal/MenuSearchModal'

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


</script>
