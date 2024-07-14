const SignUp = () => {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100 p-4'>
      <h1 className='mb-4 text-2xl font-bold'>Sign Up Page</h1>
      <form className='space-y-4'>
        <div>
          <label className='block'>Email</label>
          <input type='email' className='w-full border p-2' required />
        </div>
        <div>
          <label className='block'>Password</label>
          <input type='password' className='w-full border p-2' required />
        </div>
        <button type='submit' className='rounded bg-blue-500 p-2 text-white'>
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default SignUp
