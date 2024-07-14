const ResponsiveLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white'>
      <div className='w-full max-w-lg rounded-lg bg-white p-8 shadow-md dark:bg-gray-800 dark:text-white'>
        {children}
      </div>
    </div>
  )
}

export default ResponsiveLayout
