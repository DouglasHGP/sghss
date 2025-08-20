import { useQuasar } from 'quasar'

export function useResponsiveText() {
  const $q = useQuasar()

  const responsiveText = () => {
    if ($q.screen.gt.md) return 'text-h2'
    if ($q.screen.lt.md) return 'text-h6'
    return 'text-h4'
  }

  return { responsiveText }
}
