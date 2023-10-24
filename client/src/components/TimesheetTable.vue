<template>
  <div class="paper">
    <span>{{ currentMonth }}</span>
    <hr>

    <status-description />

    <table v-if="props.employees">
      <thead>
        <tr>
          <th>Name</th> 
          <th v-for="day in monthDays" :key="day"> 
            {{ day }}
          </th>
          <th>Total days</th> 
        </tr>
      </thead>
      <tbody>
        <timesheet-row 
          v-for="e of props.employees" 
          :employee="e" 
          :key="e.id"
          :month="selectedMonth"
          />
      </tbody>
    </table>
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import { arrayRange } from '../utils/generate-array';
import { getDaysInCurrentMonth } from '../utils/dates'

const daysOfCurrentMonth = getDaysInCurrentMonth()

// TODO: dynamically change on data is fetching
const selectedMonth = computed(() => new Date().getMonth());

const props = defineProps(
  ['employees']
);

const monthDays = computed(
  () => arrayRange(1, daysOfCurrentMonth, 1)
);

const currentMonth = computed(
  () => new Date(new Date().setMonth(selectedMonth.value)).toLocaleString('en-us', { month:'long' })
);


</script>

<style scoped>
  table {
    border: 1px solid #666;
  }

  table tr {
    box-shadow: 0px 1px 0px 0px #666666;
  }
</style>