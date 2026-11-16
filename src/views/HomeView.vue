<template>
  <div>
    <h2>Lista de Datos de mi API</h2>

    <!-- Estado 1: Carga -->
    <div v-if="isLoading">
      <p>⏳ Cargando información...</p>
    </div>

    <!-- Estado 2: Error -->
    <div v-else-if="isError" style="color: red;">
      <p>❌ Error al conectar con el servidor.</p>
    </div>

    <!-- Estado 3: Vacío -->
    <div v-else-if="isEmpty">
      <p>📭 No hay datos para mostrar.</p>
    </div>

    <!-- Estado 4: Éxito (Lista renderizada con key) -->
    <ul v-else>
      <li v-for="item in dataList" :key="item.id">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { apiService } from '../services/api';

const isLoading = ref(false);
const isError = ref(false);
const isEmpty = ref(false);
const dataList = ref([]);

const fetchData = async () => {
  isLoading.value = true;
  isError.value = false;

  try {
    const response = await apiService.get('/reservas');
    dataList.value = response;
    isEmpty.value = dataList.value.length === 0;
  } catch (e) {
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchData();
});
</script>
