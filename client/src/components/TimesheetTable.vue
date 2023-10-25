<template>
  <div class="paper">
    <span>{{ currentMonth }}</span>
    <hr>

    <status-description />
    <div v-if="employees" class="timesheet-table">
      <table>
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
            v-for="e of employees" 
            :employee="e" 
            :month="selectedMonth"
            :key="e.id"
            />
        </tbody>
      </table>

      <timesheet-set-form />
    </div>
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
    margin-right: 15px;
  }

  table tr {
    box-shadow: 0px 1px 0px 0px #666666;
  }

  .timesheet-table {
    display: flex;
  }
</style>