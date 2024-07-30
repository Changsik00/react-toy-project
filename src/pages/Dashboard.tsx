import ResponsiveLayout from '../components/common/ResponsiveLayout'

const Dashboard = () => {
  return (
    <ResponsiveLayout>
      <div className='mx-auto w-full max-w-md'>
        <h1 className='text-center text-gray-600 dark:text-gray-300'>Welcome!</h1>
      </div>
    </ResponsiveLayout>
  )
}

export default Dashboard
