import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite';
import {VitePWA} from 'vite-plugin-pwa';
import {visualizer} from 'rollup-plugin-visualizer';


// https://vite.dev/config/
export default defineConfig({
  base:"/tensioraElectric/",
  plugins: [
    react(),
    visualizer(),
    tailwindcss(),
    VitePWA({
      registerType:'autoUpdate',
      includeAssets:['logo-basico-tensiora.ico','robots.txt'],
      manifest:{
        name:"Tensiora Electric",
        short_name:"Tensiora",
        description:"Aplicacion para electricista",
        theme_color:'#222831',
        background_color:'#fffefe',
        display:'standalone',
        start_url:'/tensioraElectric/',
        scope: '/tensioraElectric/',
        icons:[
           {
             src:'/tensioraElectric/192x192.png',
             sizes:'192x192',
             type:'image/png',
           },
           {
            src:'/tensioraElectric/512x512.png',
            sizes:'512x512',
            type:'image/png',
           },
        ],
      
      },
      workbox:{
        runtimeCaching:[
           {
              urlPattern:/^https:\/\/mi-api\.com\/.*$/,
              handler:'NetworkFirst',
              options:{
                cacheName:'mi-api-cache',
                expiration:{
                  maxEntries:50,
                  maxAgeSeconds:60*60*24,
                },
                cacheableResponse:{
                  statuses:[0,200],
                }
              }
           }
        ]
      }

    })
  ],
 
})
