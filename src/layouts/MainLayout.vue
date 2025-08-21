<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar class="bg-secondary text-white">
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <router-link to="/" class="flex items-center cursor-pointer">
            <q-img
              class="bg-white q-my-xs rounded-borders custom-img"
              src="/public/logo/logo-vida-plus-teal.png"
            />
          </router-link>
        </q-toolbar-title>

        <q-space />

        <div class="row items-center">
          <span class="text-subtitle2">{{ org.name }}</span>

          <q-separator vertical inset class="q-mx-sm" color="white" />

          <q-btn color="white" rounded unelevated>
            <div class="row items-center no-wrap">
              <q-icon color="teal" left name="person" />
              <div class="text-center text-teal">Perfil</div>
            </div>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer elevated v-model="leftDrawerOpen" show-if-above bordered class="bg-teal-4 text-white">
      <q-list>
        <q-item-label class="text-white text-bold text-h6" header>{{
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

// Verifica organização do usuário
const org = JSON.parse(localStorage.getItem('userOrganization'))

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
<style>
.custom-img {
  width: 90px;
  transition: all 0.3s ease;
  box-shadow: inset 0 0 5px rgb(114, 113, 113);
  filter: brightness(1.1) contrast(1.05);
}
</style>
