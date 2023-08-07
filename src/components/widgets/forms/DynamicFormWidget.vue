<script setup lang="ts">
import { Form } from 'vee-validate'
import InputWidget, { type InputWidgetProps } from '../inputs/InputWidget.vue'
defineProps<ISchema>()

interface ISchema {
  schema: {
    fields: InputWidgetProps[]
    submitLabel: string
  }
}
</script>
<template>
  <Form class="flex flex-col gap-8">
    <InputWidget
      v-for="field in schema.fields"
      :key="field.name"
      :name="field.name"
      :label="field.label"
      :type="field.type"
      :value="field.value"
      :placeholder="field.placeholder"
      :required="field.required"
      :disabled="field.disabled"
      :autocomplete="field.autocomplete"
      :isPassword="field.isPassword"
      :min="field.min"
      :max="field.max"
      :rules="field.rules"
    />
    <button
      type="submit"
      class="h-12 px-2 bg-primary rounded-lg text-white font-semibold hover:bg-primary-dark"
    >
      {{ schema.submitLabel }}
    </button>
  </Form>
</template>
<style scoped></style>
