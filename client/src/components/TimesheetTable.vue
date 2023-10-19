<template>
  <div class="paper">
    <span>{{ currentMonth }}</span>
    <hr>

    <status-description />

    <table v-if="employees">
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
        <timesheet-row v-for="e of employees" :employee="e" :key="e.id"/>
      </tbody>
    </table>
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { arrayRange } from '../utils/generate-array';
import { getDaysInCurrentMonth } from '../utils/dates'

const daysOfCurrentMonth = getDaysInCurrentMonth()
const monthDays = arrayRange(1, daysOfCurrentMonth, 1);
const currentMonth = new Date().toLocaleString('en-us', { month:'long' });

export default defineComponent({
  props: {
    employees: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { employees } = props;

    return {
      monthDays,
      employees,
      currentMonth
    };
  },
})
</script>
