export function generatePatientMockData(patient) {
  const history = Array.from({ length: 3 }, (_, i) => ({
    id: `${patient.id}-h${i + 1}`,
    date: `20/0${8 - i}/2025`,
    description: ['Consulta de Rotina', 'Retorno Pós-operatório', 'Revisão de Exames'][i],
    professional: ['Dr. Carlos Mendes', 'Dra. Ana Costa', 'Dr. Lucas Pereira'][i],
  }))

  const evolution = Array.from({ length: 3 }, (_, i) => ({
    id: `${patient.id}-e${i + 1}`,
    date: `15/0${8 - i}/2025`,
    type: ['Melhora', 'Alerta', 'Piora'][i % 3],
    icon: ['sentiment_satisfied', 'warning', 'sentiment_very_dissatisfied'][i % 3],
    professional: ['Dr. Carlos Mendes', 'Dra. Ana Costa', 'Dr. Lucas Pereira'][i],
    description: [
      'Paciente apresentou melhora significativa.',
      'Quadro evoluiu com dor e inchaço.',
      'Paciente compareceu com queixa de dores no peito.',
    ][i],
  }))

  const prescriptions = Array.from({ length: 3 }, (_, i) => ({
    id: `${patient.id}-p${i + 1}`,
    date: `12/0${8 - i}/2025`,
    item: ['Dipirona 500mg', 'Amoxicilina 500mg', 'Ibuprofeno 400mg'][i],
    instruction: [
      '1 comprimido a cada 6 horas',
      '1 comprimido a cada 8 horas por 7 dias',
      '1 comprimido a cada 8 horas por 3 dias, em caso de dor',
    ][i],
  }))

  const exams = Array.from({ length: 3 }, (_, i) => ({
    id: `${patient.id}-x${i + 1}`,
    date: `0${i + 2}/08/2025`,
    name: ['Exame de Sangue', 'Radiografia do Tórax', 'Ressonância Magnética'][i],
    status: ['Finalizado', 'Finalizado', 'Pendente'][i],
  }))

  const professional = Array.from({ length: 3 }, (_, i) => ({
    id: `${patient.id}-d${i + 1}`,
    name: ['Dr. Carlos Mendes', 'Dra. Ana Costa', 'Dr. Lucas Pereira'][i],
    role: ['Medico', 'Enfermeiro', 'Nutricionista'][i],
  }))

  return { history, evolution, prescriptions, exams, professional }
}
