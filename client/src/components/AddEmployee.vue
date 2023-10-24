<template>
 <div class="paper">
  <form
    @submit.prevent="createEmployee"
  >
    <label>
      <span>First name</span>
      <input type="text" v-model.trim="form.firstName">
    </label>
    <label>
      <span>Last name</span>
      <input type="text" v-model.trim="form.lastName">
    </label>
    <label>
      <span>Card id</span>
      <input type="text" v-model.trim="form.cardId">
    </label>
    <label>
      <span>Department</span>
      <input type="text" v-model.trim="form.department">
    </label>
    <label>
      <span>Position</span>
      <input type="text" v-model.trim="form.position">
    </label>

    <div v-if="error.message.length" :class="{
      'response-error': error.isError
    }">
      <p>{{ error.message }}</p>
    </div>
    <br>

    <button :disabled="isFetching">Add employee</button>
  </form>
 </div>
</template>

<script setup>
import { ref } from 'vue'
import { addEmployee } from '../api'

const form = ref({
  firstName: '',
  lastName: '',
  cardId: '',
  department: '',
  position: '',
});

const error = ref({
  isError: false,
  message: ''
});

const isFetching = ref(false);

const createEmployee = async () => {
  error.value = { isError: false, message: ''};
  isFetching.value = true;

  const response = await addEmployee(form.value);

  if(response.id) {
    form.value = Object.fromEntries(
      Object.entries(form.value)
        .map(([k,])=> ([k, '']))
    );
    error.value = {isError: false, message: 'OK'};
  } else {
    error.value = {isError: true, message: response.message};
  }

  isFetching.value = false;
}
</script>
