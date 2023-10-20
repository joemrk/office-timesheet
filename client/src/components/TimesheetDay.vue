<template>
  <td>
    <button
      :class="['mark-' + status]" 
      @click="selectDay"
    ></button>
   </td>
</template>

<script>
import {defineComponent} from 'vue'
export default defineComponent ({
  props: {
    timesheet: {
      type: Object,
      required: false,
    },
    day: {
      type: Number,
      required: false
    },
    employee: {
      type: Number,
      required: false
    }
  },
  setup(props) {
    const { day, employee, timesheet } = props;
    const selectDay = () => {
      console.log({
        day,
        employee,
        timesheet
      });
    }

    return {
      selectDay,
      status: timesheet?.status ? timesheet.status.toLocaleLowerCase() : 'null'
    }
  }
})
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
</style>