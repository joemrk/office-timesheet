<template>
  <div class="paper">
    <form
      @submit.prevent="saveTimesheet"
    >
      <div class="selected-details">
        {{ props.employeeName }}
        <br>
        {{ changedDay.toLocaleDateString() }}
      </div>
      <br>
      <input v-if="id" type="hidden" v-model="form.id">

      <label>
        <span>Status</span>
        <select v-model="form.status">
          <option v-for="status in allStatuses" :key="status" :value="status">{{ status }}</option>
        </select>
      </label>

      <div v-if="error.message.length" :class="{
        'response-error': error.isError
        }">
          <p>{{ error.message }}</p>
      </div>

      <br>
      <button :disabled="isFetching">Save</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, watch } from 'vue'
import { allStatuses } from '../constant';
import { getDateByMonthAndDay } from '../utils/dates';
import { setTimesheet } from '../api';
import { useRoute } from 'vue-router'

const route = useRoute()

const props = defineProps([
  'id', 'status', 'employeeId', 'month', 'day', 'employeeName'
])

const form = ref({
  id: props.id,
  status: props.status,
  employeeId: props.employeeId,
  month: props.month,
  day: props.day,
  createdAt: null,
});

const isFetching = ref(false);
const error = ref({
  isError: false,
  message: ''
});

const changedDay = computed(
  () => getDateByMonthAndDay(props.month, props.day)
);

const saveTimesheet = async () => {
  error.value = { isError: false, message: ''};
  isFetching.value = true;

  form.value.createdAt = changedDay.value.toISOString();

  const response = await setTimesheet(form.value);

  if(response.id) {
    form.value = Object.fromEntries(
      Object.entries(form.value)
        .map(([k,])=> ([k, '']))
    );
    error.value = {isError: false, message: 'OK'};
  } else {
    error.value = {isError: true, message: response.message};
  }

  isFetching.value = false;
}

watch(route.query, () => {
  
})
</script>
