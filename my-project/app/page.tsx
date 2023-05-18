import Image from 'next/image'

export default function Home() {
  console.log("test")
  return (
    <div>
     {/* <h1 className='text-3xl '>Title 1</h1>
     <h1 className='text-2xl'>Title 2</h1>
     <h1 className='text-xl'>Title 3</h1>
     <p className='text-base underline decoration-red-500 decoration-wavy decoration-1 underline-offset-1 leading-normal'>A regular paragraph</p>
     <p className='test-sm uppercase'>A description paragraph</p>
     <p className='test-xs note lowercase'>A little node</p> */}
     <p className=' m-4 font-bold text-white bg-blue-500'>Box with margin</p>
     <p className=' p-4 font-bold text-white bg-red-500'>Box with padding</p>
    
    </div>
  )
}
