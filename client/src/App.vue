<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { fetchEmployee } from './api'
import { transformFetchedEmployee } from './utils/transformer';

  const employees = ref([]);
  const computedEmployees = computed(() => {
    return employees;
  });

  const fetchData = async  () => {
    const rawEmployees = await fetchEmployee();
    if(!rawEmployees || !rawEmployees.length) {
      return;
    }
    
    employees.value = rawEmployees.map(transformFetchedEmployee)
  }

  onMounted(() => {
    fetchData();
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
