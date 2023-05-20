import Image from 'next/image'

export default function Home() {
  console.log("test")
  return (
    <div className='h-screen text-white Parent bg-slate-900'>
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-sky-500 p-6 rounded-lg">First element</div>
          <div className="bg-sky-500 p-6 rounded-lg">Second element</div>
          <div className="bg-sky-500 p-6 rounded-lg">Third element</div>
          <div className="bg-sky-500 p-6 rounded-lg col-span-2">Fourth element</div>
          <div className="bg-sky-500 p-6 rounded-lg">Fifth element</div>
          <div className="bg-sky-500 p-6 rounded-lg">Sixth element</div>
        </div>
      </div>
        
     
      
    </div>
  )
}
