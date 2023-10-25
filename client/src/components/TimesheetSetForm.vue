<template>
    <form v-if="form ?? selectedEmployee"
      @submit.prevent="saveTimesheet"
    >
      <div class="selected-details">
        {{ selectedEmployee.firstName + " " + selectedEmployee.lastName }}
        <br>
        {{ new Date(form.createdAt).toLocaleDateString() }}
      </div>
      <br>
      <hr>
      <label>
        <span>Status</span>
        <select v-model="form.status">
          <option v-for="status in ALL_STATUSES" :key="status" :value="status">{{ status }}</option>
        </select>
      </label>

      <div v-if="res.message.length" :class="{
        'response-error': res.isError
        }">
          <p>{{ res.message }}</p>
      </div>

      <br>
      <button :disabled="isFetching">Save</button>
    </form>
</template>

<script setup>
import { ref, watch } from 'vue'
import { getDateByMonthAndDay } from '../utils/dates';
import { setTimesheet } from '../api';
import { useRoute, useRouter } from 'vue-router';
import { SELECTED_DAY_STORE_KEY, ALL_STATUSES } from '../constant';

const router = useRouter();

const route = useRoute();
const selectedEmployee = ref();
const form = ref(null);
const isFetching = ref(false);
const res = ref({
  isError: false,
  message: ''
});


const saveTimesheet = async () => {
  res.value = { isError: false, message: ''};
  isFetching.value = true;

  const response = await setTimesheet(form.value);

  if(response.id || response.generatedMaps?.[0]?.id) {
    form.value = Object.fromEntries(
      Object.entries(form.value)
        .map(([k,])=> ([k, '']))
    );
    res.value = {isError: false, message: 'OK'};

    router.go(0);
  } else {
    res.value = {isError: true, message: response.message};
  }

  isFetching.value = false;
}

watch(() => route.query, () => {
  if(!route.query['selected']) {
    return;
  }

  try {
    const selectedDayStorageValue = localStorage.getItem(SELECTED_DAY_STORE_KEY);
    if(!selectedDayStorageValue) {
      return
    }
    const parsedValue = JSON.parse(selectedDayStorageValue);
    const { timesheet, day, month, employee } = parsedValue;

    form.value = {
      id: timesheet?.id ?? null,
      employeeId: employee?.id ?? null,
      status: timesheet?.status ?? null,
      createdAt: getDateByMonthAndDay(month, day).toISOString(),
    }

    selectedEmployee.value = employee;
  } catch (error) {
    console.log(error);
    console.error(`Invalid storaged data for key:${SELECTED_DAY_STORE_KEY}`);
  }
});
</script>
