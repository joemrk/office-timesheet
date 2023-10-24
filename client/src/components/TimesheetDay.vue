<template>
  <td>
    <button
      :class="['mark-' + status, {'is-selected': isSelected}]" 
      @click="selectDay"
    ></button>
   </td>
</template>

<script setup>
import { ref, computed, defineProps, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const props = defineProps(
  ['timesheet', 'employeeId', 'day', 'month']
);

const status = computed(
  () => props.timesheet?.status ? props.timesheet.status.toLocaleLowerCase() : 'null'
);

const isSelected = ref(false)

onMounted(() => {
  checkDaySelection(route.query)
})

watch(() => route.query, () => {
  checkDaySelection(route.query)
})

const checkDaySelection = (query) => {
  const [month, day, employeeId] = query.selected ? query.selected.split(',') : [null, null, null]

  isSelected.value =  
    props.day == Number(day) 
    && props.month == Number(month) 
    && props.employeeId == Number(employeeId)
}

const selectDay = () => {
  router.push({
    ...route,
    query: {
      selected: `${props.month},${props.day},${props.employeeId},${props?.timesheet?.status ?? ''}`
    }
  })
}
</script>

<style>
  td button {
    cursor: pointer;
    border: 1px solid black;
    min-height: 20px;
    min-width: 20px;
    margin: 2px;
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

  .is-selected {
    box-shadow: 0px 0px 2px 2px rgb(6, 122, 255);
  }
</style>