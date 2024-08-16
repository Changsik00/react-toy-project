import ResponsiveLayout from '@/components/common/ResponsiveLayout'

const NotFound = () => {
  return (
    <ResponsiveLayout>
      <div className='mx-auto w-full max-w-md'>
        <h1 className='mb-6 text-center text-3xl font-bold text-gray-900 dark:text-white'>404 - Page Not Found</h1>
        <p className='text-center text-gray-600 dark:text-gray-300'>The page you are looking for does not exist.</p>
      </div>
    </ResponsiveLayout>
  )
}

export default NotFound
