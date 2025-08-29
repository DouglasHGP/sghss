<template>
  <q-page class="q-pa-md">
    <TitlePage
      title="Fale Conosco"
      description="Entre em contato conosco para dúvidas, sugestões ou suporte."
    />

    <div class="row q-gutter-md" :class="{ 'q-mr-md': $q.platform.is.mobile }">
      <CardBase class="col" title="Canais de Atendimento" icon="rss_feed">
        <div class="q-gutter-sm">
          <div class="rounded-borders text-teal-9 bg-teal-1 q-pa-md">
            <q-list separator>
              <q-item>
                <q-item-section avatar>
                  <q-icon color="teal-8" name="email" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-subtitle1">E-mail</q-item-label>
                  <q-item-label caption>
                    Envie suas dúvidas para:
                    <a href="mailto:suporte@exemplo.com">suporte@exemplo.com</a>
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon color="teal-8" name="call" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-subtitle1">Telefone</q-item-label>
                  <q-item-label caption>
                    Ligue para: <a href="tel:+5511999999999">+55 (11) 99999-9999</a>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </CardBase>
      <CardBase
        class="col"
        title="Perguntas Frequentes"
        icon="help_outline"
        :collapsible="$q.platform.is.mobile"
      >
        <q-list bordered separator>
          <q-expansion-item
            v-for="(faq, index) in faqs"
            group="somegroup"
            icon="question_answer"
            :label="faq.question"
            :key="index"
          >
            <q-card>
              <q-card-section>
                {{ faq.answer }}
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </CardBase>
    </div>
    <CardBase class="col" title="Envie sua Mensagem" icon="chat">
      <div class="q-gutter-md">
        <q-form @submit.prevent="submitForm">
          <q-input
            v-model="formData.name"
            label="Nome Completo"
            standout="bg-teal-3 text-teal-9"
            rounded
            dense
            :rules="[(val) => !!val || 'O nome é obrigatório']"
          />
          <q-input
            v-model="formData.email"
            label="E-mail"
            standout="bg-teal-3 text-teal-9"
            rounded
            dense
            type="email"
            :rules="[(val) => !!val || 'O e-mail é obrigatório', isValidEmail]"
          />
          <q-select
            v-model="formData.subject"
            :options="subjectOptions"
            label="Assunto"
            standout="bg-teal-3 text-teal-9"
            rounded
            dense
            :rules="[(val) => !!val || 'O assunto é obrigatório']"
          />
          <q-input
            v-model="formData.message"
            label="Mensagem"
            standout="bg-teal-3 text-teal-9"
            rounded
            dense
            type="textarea"
            rows="5"
            :rules="[(val) => !!val || 'A mensagem é obrigatória']"
          />
          <q-btn
            glossy
            label="Enviar Mensagem"
            type="submit"
            color="teal"
            class="q-mt-md full-width"
          />
        </q-form>
      </div>
    </CardBase>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { Notify } from 'quasar'
import TitlePage from 'src/components/TitlePage.vue'
import CardBase from 'src/components/CardBase.vue'

const formData = ref({
  name: '',
  email: '',
  subject: null,
  message: '',
})

const subjectOptions = ref([
  'Dúvidas Financeiras',
  'Franquia e Coparticipação',
  'Ajuste de Dados Cadastrais',
  'Sugestões',
  'Outros',
])

const faqs = ref([
  {
    question: 'Como faço para pagar meu boleto?',
    answer:
      'Você pode acessar a seção "Financeiro" no menu para visualizar e baixar a segunda via do seu boleto. Caso não encontre, entre em contato conosco por um dos canais acima.',
  },
  {
    question: 'O que é franquia e como ela funciona?',
    answer:
      'A franquia é um valor fixo que o beneficiário deve pagar por um procedimento ou serviço de saúde, antes que o plano comece a cobrir os custos. Na página "Meu Plano", você pode ver o saldo da sua franquia anual.',
  },
  {
    question: 'Posso atualizar meus dados cadastrais online?',
    answer:
      'Sim. Vá até a seção "Meu Espaço" e altere suas informações pessoais. Caso encontre dificuldades, preencha o formulário nesta página selecionando o assunto "Ajuste de Dados Cadastrais".',
  },
])

// Validação de e-mail simples
const isValidEmail = (val) => {
  const emailPattern =
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,125}[a-zA-Z]{2,63}$/
  return emailPattern.test(val) || 'E-mail inválido'
}

const submitForm = () => {
  // Lógica de envio do formulário, como uma chamada de API
  console.log('Dados do formulário:', formData.value)

  Notify.create({
    type: 'positive',
    message: 'Mensagem enviada com sucesso! Em breve entraremos em contato.',
    position: 'bottom',
  })

  // Limpa o formulário após o envio
  formData.value = {
    name: '',
    email: '',
    subject: null,
    message: '',
  }
}
</script>
