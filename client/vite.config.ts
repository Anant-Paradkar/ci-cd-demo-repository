import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  process.env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      open: true, 
      port: 3000
    },
    define: {
      'process.env': process.env
    }
  }
})
