<template>

  <li class="colors__item">
    <label class="colors__label">
      <input class="colors__radio sr-only" type="radio" name="color" :value="color.color.code" @click="$emit('changeCurrentImage', color.id)">
      <span class="colors__value" :style="{ backgroundColor: color.color.code }"></span>
    </label>
  </li>

</template>

<script>
export default {
  props: ['color'],
}
</script>
