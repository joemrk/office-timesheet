<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { getDaysInCurrentMonth } from './utils/dates';

  const employees = ref([]);

  const daysOfCurrentMonth = getDaysInCurrentMonth()
  const nullArraysByDay = new Array(daysOfCurrentMonth).fill(null)
  
  const fetchEmployee = () => {
    fetch('http://localhost:3000/employee')
    .then(r => r.json())
    .then(d => {
      employees.value = generateTableRow(d)
    })
  }

  function generateTableRow(employee: any) {
    return employee.map((e: any) => {
      const days = [...nullArraysByDay];
      e.timesheet.forEach((t: any) => {
        days[new Date(t.createdAt).getDate() - 1] = t.status;
      })
      e.timesheet = days;

      return e;
    })
  }

  const computedEmployees = computed(() => {
  return employees;
});

  onMounted(() => {
    fetchEmployee();
  });
</script>

<template>
  <div class="wrap">
    <span>{{new Date().toLocaleString('en-us', { month:'long' })}}</span>
    <hr>

    <status-description />

    <timesheet-table :employees="computedEmployees"/>
  </div>
</template>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    text-decoration: none;
  }

  .wrap {
    padding: 100px;
  }

  hr {
    margin-bottom: 10px;
  }
</style>
