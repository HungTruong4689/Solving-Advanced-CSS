import Image from 'next/image'

export default function Home() {
  console.log("test")
  return (
    <div className='h-screen text-white Parent bg-slate-900'>
      <div className="container mx-auto">
        <div className="grid grid-cols-4 gap-1">
          <div className="bg-sky-500 p-6 rounded-lg">First element</div>
          <div className="bg-sky-500 p-6 rounded-lg">Second element</div>
          <div className="bg-sky-500 p-6 rounded-lg">Third element</div>
          <div className="bg-sky-500 p-6 rounded-lg">Forth element</div>
        </div>
      </div>
        
     
      
    </div>
  )
}
