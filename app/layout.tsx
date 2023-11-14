import TodoContext from '@/libs/TodoContext'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='flex min-h-screen justify-center items-center overflow-auto'>
        <TodoContext>
          {children}
        </TodoContext>
      </body>
    </html>
  )
}
