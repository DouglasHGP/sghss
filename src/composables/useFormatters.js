import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function useFormatters() {
  const formatDateBR = (dateStr) => {
    if (!dateStr) return ''
    try {
      return format(parseISO(dateStr), 'dd/MM/yyyy', { locale: ptBR })
    } catch (e) {
      console.warn('Data inválida em formatDateBR:', dateStr, e)
      return dateStr
    }
  }

  return {
    formatDateBR,
  }
}
