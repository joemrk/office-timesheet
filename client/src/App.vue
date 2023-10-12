<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { arrayRange } from './utils/generate-array';
import { getDaysInCurrentMonth } from './utils/dates';

  const responseData = ref([]);

  const daysOfCurrentMonth = getDaysInCurrentMonth()
  const monthDays = arrayRange(1, daysOfCurrentMonth, 1);
  const nullArraysByDay = new Array(daysOfCurrentMonth).fill(null)
  
  const fetchEmployee = () => {
    fetch('http://localhost:3000/employee')
    .then(r => r.json())
    .then(d => {
      responseData.value = generateTableRow(d)
    })
  }

  function generateTableRow(employee: any) {
    return employee.map((e: any) => {
      const days = [...nullArraysByDay];
      e.timesheet.forEach((t: any) => {
        days[new Date(t.createdAt).getDate() - 1] = t.status.toLowerCase();
      })
      e.timesheet = days;

      return e;
    })
  }

  onMounted(() => {
    fetchEmployee();
  });
</script>

<template>
  <div class="wrap">
    <!-- <div>Timesheet</div> -->
    <span>{{new Date().toLocaleString('en-us', { month:'long' })}}</span>
    <hr>
    
    <div class="mark-description">
      <div class="mark-present"></div>
      <span>present</span>

      <div class="mark-missing"></div>
      <span>missing</span>

      <div class="mark-lateness"></div>
      <span>lateness</span>

      <div class="mark-overtime"></div>
      <span>overtime</span>

      <div class="mark-hospital"></div>
      <span>hospital</span>

      <div class="mark-vacation"></div>
      <span>vacation</span>

      <div class="mark-remote"></div>
      <span>remote</span>
    </div> 

    <table>
      <thead>
        <tr>
          <th>name</th> 
          <th v-for="day in monthDays"> 
            {{ day }}
          </th>
          <th>total work days</th> 
        </tr>
      </thead>
      <tbody>
        <tr v-for="e of responseData">
          <td>{{`${e.firstName} ${e.lastName}`}}</td>
          <td v-for="s of e.timesheet" :class="['mark-' + s]"></td>
          <td>{{e.timesheet.filter((d) => Boolean(d)).length}}</td>
        </tr>
      </tbody>
    </table>
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

  .mark-description {
    display: flex;
  }

  .mark-description div {
    margin: 3px;
    border-radius: 3px;
    min-width: 20px;
    min-height: 20px;
  }

  .mark-description span {
    margin-right: 15px;
  }

  table, th, td {
    border: 1px solid black;
  }

  th, td {
    min-width: 20px;
    min-height: 20px;
  }

  tr td.table-mark {
    margin: 3px;
    border-radius: 3px;
  }

  .mark-null {
    background-color: #efefef;
  }

  .mark-present {
    background-color: rgb(120, 165, 90);
  }

  .mark-missing {
    background-color: rgb(234, 51, 35);
  }

  .mark-lateness {
    background-color: rgb(36, 83, 143);
  }

  .mark-overtime {
    background-color: rgb(49, 77, 28);
  }

  .mark-hospital {
    background-color: rgb(184, 127, 158);
  }

  .mark-vacation {
    background-color: rgb(249, 217, 120);
  }

  .mark-remote {
    background-color: rgb(238, 205, 205);
  }

</style>
