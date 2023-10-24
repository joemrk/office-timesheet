<template>
  <tr>
    <td>{{`${employee.firstName} ${employee.lastName}`}}</td>
    <timesheet-day 
      v-for="[i, t] of employee.timesheet.entries()" 
      :timesheet="t"
      :day="i+1"
      :month="props.month"
      :employeeId="employee.id"
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
