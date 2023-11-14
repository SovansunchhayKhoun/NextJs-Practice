import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='flex min-w-full min-h-screen justify-center items-center'>
        {children}
      </body>
    </html>
  )
}
