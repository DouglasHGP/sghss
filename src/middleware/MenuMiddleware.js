export default [
  // Links de Gestão Administrativa
  {
    title: 'Painel',
    caption: 'Visão geral do sistema',
    icon: 'dashboard',
    link: '/dashboard',
    roles: ['dev', 'admin'],
  },
  {
    title: 'Profissionais',
    caption: 'Gerencie médicos, enfermeiros, etc.',
    icon: 'badge',
    link: '/professionals',
    roles: ['dev', 'admin'],
  },
  {
    title: 'Pacientes',
    caption: 'Cadastro, demografia e histórico',
    icon: 'group',
    link: '/patients',
    roles: ['dev', 'admin', 'professional'],
  },
  {
    title: 'Outros Recursos',
    caption: 'Gerencie leitos, suprimentos, etc.',
    icon: 'medication',
    link: '/resources',
    roles: ['dev', 'admin'],
  },
  {
    title: 'Relatórios',
    caption: 'Gere relatórios financeiros e de fluxo',
    icon: 'analytics',
    link: '/reports',
    roles: ['dev', 'admin'],
  },

  // Links de Ferramentas de Saúde
  {
    title: 'Agenda',
    caption: 'Gerencie consultas e horários',
    icon: 'today',
    link: '/agenda',
    roles: ['dev', 'professional'],
  },
  {
    title: 'Prontuários',
    caption: 'Acesse e atualize prontuários de pacientes',
    icon: 'folder',
    link: '/patient-records',
    roles: ['dev', 'professional'],
  },

  // Links de Atendimento ao Usuário (paciente)
  {
    title: 'Consulta',
    caption: 'Consulte profissionais e horários',
    icon: 'schedule',
    link: '/scheduling',
    roles: ['dev', 'patient'],
  },
  {
    title: 'Meu Espaço',
    caption: 'Visualize receitas digitais, validade, declarações, atestados emitidos e exames',
    icon: 'history_edu',
    link: '/my-space',
    roles: ['dev', 'patient'],
  },
  {
    title: 'Meu Plano',
    caption: 'Consulte detalhes do seu plano de saúde',
    icon: 'assignment',
    link: '/my-plan',
    roles: ['dev', 'patient'],
  },

  // Links de Suporte e Navegação

  {
    title: 'Fale Conosco',
    caption: 'Canal de suporte e contato',
    icon: 'record_voice_over',
    link: '/contact-us',
    roles: ['dev', 'patient'],
  },
]
