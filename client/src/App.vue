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
    
    // @ts-ignore
    employees.value = rawEmployees.map(transformFetchedEmployee)
  }

  onMounted(() => {
    fetchData();
  });
</script>

<template>
  <div class="wrap">
    <timesheet-table :employees="computedEmployees"/>

    <br>
    <add-employee />
    
  </div>
</template>

<style>
  * {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    text-decoration: none;
  }

  .paper {
    padding: 20px;
    background-color: #fff;
    border: 1px solid #c5c5c5;
    box-shadow: 1px 1px 3px 1px #c5c5c5; 
  }

  hr {
    margin-bottom: 10px;
  }

  body {
    background-color: #e8e8e8;
    padding: 50px 100px;
    margin: 0 auto;
  }
</style>
