<template>
  <q-page class="flex flex-center">
    <q-card class="login-card">
      <q-card-section class="bg-secondary text-white text-center">
        <div class="text-h6">Sistema de Gestão Hospitalar</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="login" class="q-gutter-md">
          <q-input filled v-model="username" label="Usuário" placeholder="Digite seu usuário" />
          <q-input
            filled
            v-model="password"
            type="password"
            label="Senha"
            placeholder="Digite sua senha"
          />
          <q-select
            filled
            v-model="organization"
            :options="organizations"
            label="Organização"
            option-label="name"
            option-value="id"
          />
          <q-card-actions :align="$q.screen.gt.sm ? 'right' : 'center'">
            <q-btn glossy type="submit" color="secondary" label="Entrar" class="full-width" />
          </q-card-actions>
          <p v-if="error" class="text-red text-center q-mt-md">{{ error }}</p>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const password = ref('')
const organization = ref('')
const error = ref('')

const organizations = [
  { id: 'hospitalA', name: 'Hospital A' },
  { id: 'hospitalB', name: 'Hospital B' },
  { id: 'clinicaC', name: 'Clínica C' },
]

// Array de usuários de teste com suas permissões
const testUsers = [
  { username: 'admin', password: '123', role: 'admin' },
  { username: 'medico', password: '123', role: 'professional' },
  { username: 'enfermeiro', password: '123', role: 'professional' },
  { username: 'paciente', password: '123', role: 'patient' },
  { username: 'dev', password: '123', role: 'dev' },
]

function login() {
  const user = testUsers.find((u) => u.username === username.value && u.password === password.value)

  if (user && organization.value) {
    error.value = ''
    // Armazena a permissão do usuário de forma reativa ou global
    // Para simplificação, podemos usar um localStorage ou Pinia/Vuex
    // Aqui, vamos apenas simular a passagem da permissão
    localStorage.setItem('userRole', user.role)

    router.push('/home')
  } else {
    error.value = 'Usuário, senha ou organização inválidos.'
  }
}
</script>
