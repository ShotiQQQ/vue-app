<template>

  <li class="colors__itemx">
    <label class="colors__label">
      <input class="colors__radio sr-only" type="radio" name="color-item" :value="id" @click="$emit('changeCurrentColor', id)">
      <span class="colors__value" :style="{backgroundColor: backgroundColor}"></span>
    </label>
  </li>

</template>

<script>
export default {
  props: ['id', 'backgroundColor']
}
</script>
