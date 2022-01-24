<template>
  <div
    class="mui-textfield"
    style="display: flex;"
  >
    <input
      :value="modelValue"
      type="range"
      :min="min"
      :max="max"
      :step="step"
      style="cursor: initial; flex-grow: 2;"
      @input="handleInput"
    />
    <input
      :value="modelValue"
      type="number"
      :min="min"
      :max="max"
      :step="step"
      style="width: auto; flex-grow: 0; margin-left: 20px"
      @input="handleInput"
    />
    <label>
      {{ label }}
    </label>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: Number,
    label: String,
    min: Number,
    max: Number,
    step: Number,
  },
  methods: {
    handleInput(e) {
      this.$emit('update:modelValue', parseInt(e.target.value))
    }
  }
}
</script>

<style scoped>
.mui-textfield > label {
  text-overflow: auto;
}
</style>
