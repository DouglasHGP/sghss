export default [
  // Links de Gestão Administrativa
  {
    title: 'Dashboard',
    caption: 'Visão geral do sistema',
    icon: 'dashboard',
    link: '/home/dashboard',
    roles: ['dev', 'admin', 'professional', 'patient'],
  },
  {
    title: 'Profissionais',
    caption: 'Gerencie médicos, enfermeiros, etc.',
    icon: 'badge',
    link: '/home/profissionais',
    roles: ['dev', 'admin'],
  },
  {
    title: 'Pacientes',
    caption: 'Cadastro, demografia e histórico',
    icon: 'group',
    link: '/home/pacientes',
    roles: ['dev', 'admin', 'professional'],
  },
  {
    title: 'Outros Recursos',
    caption: 'Gerencie leitos, suprimentos, etc.',
    icon: 'medication',
    link: '/home/recursos',
    roles: ['dev', 'admin'],
  },
  {
    title: 'Relatórios',
    caption: 'Gere relatórios financeiros e de fluxo',
    icon: 'analytics',
    link: '/home/relatorios',
    roles: ['dev', 'admin'],
  },

  // Links de Ferramentas de Saúde
  {
    title: 'Agenda',
    caption: 'Gerencie consultas e horários',
    icon: 'today',
    link: '/home/agenda',
    roles: ['dev', 'professional'],
  },
  {
    title: 'Prontuários',
    caption: 'Acesse e atualize prontuários de pacientes',
    icon: 'favorite',
    link: '/home/prontuarios',
    roles: ['dev', 'professional'],
  },
  {
    title: 'Prescrições',
    caption: 'Emita receitas digitais e atestados',
    icon: 'history_edu',
    link: '/home/prescricoes',
    roles: ['dev', 'professional'],
  },

  // Links de Atendimento ao Usuário (paciente)
  {
    title: 'Consulta Presencial',
    caption: 'Consulte profissionais e horários',
    icon: 'schedule',
    link: '/home/agendamento-presencial',
    roles: ['dev', 'patient'],
  },
  {
    title: 'Consulta Online',
    caption: 'Telemedicina e consultas virtuais',
    icon: 'video_call',
    link: '/home/agendamento-online',
    roles: ['dev', 'patient'],
  },
  {
    title: 'Meu Plano',
    caption: 'Consulte detalhes do seu plano de saúde',
    icon: 'assignment',
    link: '/home/plano',
    roles: ['dev', 'patient'],
  },

  // Links de Suporte e Navegação

  {
    title: 'Fale Conosco',
    caption: 'Canal de suporte e contato',
    icon: 'record_voice_over',
    link: '/home/fale-conosco',
    roles: ['dev', 'patient'],
  },
]
