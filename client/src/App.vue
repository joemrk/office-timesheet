<script setup lang="ts">
import { onMounted, ref, provide } from 'vue'
import { fetchEmployee } from './api'
import { transformFetchedEmployee } from './utils/transformer';
import { PROVIDE_FETCH_DATA } from './constant';

const employees = ref([]);

const fetchData = async () => {
  const rawEmployees = await fetchEmployee();
  if(!rawEmployees || !rawEmployees.length ) {
    return;
  }
  
  // @ts-ignore
  employees.value = rawEmployees.map(transformFetchedEmployee)
}

provide(PROVIDE_FETCH_DATA, fetchData)

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="wrap">
    <timesheet-table :employees="employees"/>
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

  form {
    display: flex;
    flex-direction: column;
  }
  form label {
    margin-bottom: 10px;
  }
  form label span{
    display: block;
  }
  form button {
    max-width: 150px;
  }

  .response-error {
    color: red;
  }
</style>
