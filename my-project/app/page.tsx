import Image from 'next/image'

export default function Home() {
  console.log("test")
  return (
    <div>
     <h1 className='text-9xl'>Title 1</h1>
     <h1>Title 2</h1>
     <h1>Title 3</h1>
     <p className='text-base'>A regular paragraph</p>
     <p className='test-sm'>A description paragraph</p>
     <p className='test-xs note'>A little node</p>
    
    </div>
  )
}
