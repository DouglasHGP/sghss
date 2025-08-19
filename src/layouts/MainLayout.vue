<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar class="bg-secondary text-white">
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> SGH e Serviços de Saúde </q-toolbar-title>

        <div>
          <q-btn flat round icon="account_circle" to="/" /><q-tooltip
            ><span class="text-subtitle2">Acessar</span></q-tooltip
          >
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>{{
          userPermission === 'admin'
            ? 'Administrador'
            : userPermission === 'professional'
              ? 'Profissional'
              : userPermission === 'patient'
              ? 'Paciente'
              : 'Dev Mode'
        }}</q-item-label>

        <SiderMenu v-for="link in filteredLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed } from 'vue'
import SiderMenu from 'components/SiderMenu.vue'
import linksList from 'src/middleware/MenuMiddleware.js'

const leftDrawerOpen = ref(false)

// Obtém a permissão do localStorage e a torna reativa
const userPermission = ref(localStorage.getItem('userRole') || 'guest')

// Propriedade computada para filtrar os links com base na permissão
const filteredLinks = computed(() => {
  return linksList.filter((link) => link.roles.includes(userPermission.value))
})

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
