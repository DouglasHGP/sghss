import { patients } from './patients'
import { generatePatientMockData } from './patientDetails'

// Mapeia a lista base de pacientes e enriquece com os detalhes dinâmicos
const patientRecords = patients.map((p) => ({
  ...p,
  ...generatePatientMockData(p),
}))

export { patients, generatePatientMockData, patientRecords }
