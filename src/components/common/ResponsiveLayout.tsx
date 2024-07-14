const ResponsiveLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='w-100vw h-100vh flex items-center justify-center bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white'>
      <div className='w-full max-w-full rounded-lg bg-white p-8 shadow-md sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl dark:bg-gray-800 dark:text-white'>
        {children}
      </div>
    </div>
  )
}

export default ResponsiveLayout
