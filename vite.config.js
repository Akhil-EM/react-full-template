import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { APP_PORT } from "./src/config";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server:{
  //   port: import.meta.env.VITE_APP_PORT
  // }
})
