import { ref, onMounted, watch } from 'vue'

export function useDarkMode() {
  const isDarkMode = ref(false)

  // Função para verificar a preferência do sistema
  const checkSystemPreference = () => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  // Função para alternar entre modos manualmente
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
    // Armazena a preferência no localStorage
    localStorage.setItem('darkMode', isDarkMode.value ? 'enabled' : 'disabled')
    applyDarkMode(isDarkMode.value)
  }

  // Aplica o tema conforme a escolha do usuário
  const applyDarkMode = (enabled) => {
    if (enabled) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Inicialização
  onMounted(() => {
    // Verifica se há preferência no localStorage
    const savedPreference = localStorage.getItem('darkMode')
    if (savedPreference) {
      isDarkMode.value = savedPreference === 'enabled'
    } else {
      // Se não houver preferência salva, verifica a preferência do sistema
      isDarkMode.value = checkSystemPreference()
    }
    applyDarkMode(isDarkMode.value)

    // Atualiza o valor se a preferência do sistema mudar
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (!localStorage.getItem('darkMode')) {
        isDarkMode.value = mediaQuery.matches
        applyDarkMode(isDarkMode.value)
      }
    }
    mediaQuery.addEventListener('change', handleChange)

    // Limpa o eventListener ao desmontar
    watch(isDarkMode, () => {
      mediaQuery.removeEventListener('change', handleChange)
    })
  })

  return {
    isDarkMode,
    toggleDarkMode,
  }
}
