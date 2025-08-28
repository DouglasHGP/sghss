import { computed } from 'vue'
import { differenceInYears, parse } from 'date-fns'

export function useAge(birthDate) {
  const age = computed(() => {
    if (!birthDate.value) {
      return 'N/A'
    }

    const parsedDate = parse(birthDate.value, 'dd/MM/yyyy', new Date())

    return differenceInYears(new Date(), parsedDate)
  })

  return { age }
}
