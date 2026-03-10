import './globals.css' // Se tiver esse, pode manter ou apagar
import '../assets/scss/style.scss' // <--- AQUI o Next lê seu SASS todinho
import 'remixicon/fonts/remixicon.css' // Se você instalou pelo npm

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  )
}