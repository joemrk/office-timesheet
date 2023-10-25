<template>
  <tr>
    <td>{{`${employee.firstName} ${employee.lastName}`}}</td>
    <timesheet-day 
      v-for="(t, i) of employee.timesheet" 
      :timesheet="t"
      :day="i+1"
      :month="month"
      :employee="employee"
      :key="i"
    />
    <td>{{ workDays }}</td>
  </tr>
</template>

<script setup>
import { computed, defineProps } from 'vue';
import { isEmployeeWork } from '../utils/is-employee-work';

const props = defineProps(
  ['employee', 'month']
)
const { employee } = props;

const workDays = computed(
  () => Object.entries(employee.timesheet).filter(([, v]) => v && isEmployeeWork(v.status)).length
)
</script>
