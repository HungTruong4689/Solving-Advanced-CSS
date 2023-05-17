import Image from 'next/image'

export default function Home() {
  console.log("test")
  return (
    <div>
     <h1 className='text-3xl '>Title 1</h1>
     <h1 className='text-2xl'>Title 2</h1>
     <h1 className='text-xl'>Title 3</h1>
     <p className='text-base underline decoration-red-500 decoration-wavy decoration-1 underline-offset-1 leading-normal'>A regular paragraph</p>
     <p className='test-sm'>A description paragraph</p>
     <p className='test-xs note'>A little node</p>
    
    </div>
  )
}
