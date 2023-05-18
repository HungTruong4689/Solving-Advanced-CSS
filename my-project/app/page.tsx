import Image from 'next/image'

export default function Home() {
  console.log("test")
  return (
    <div className='flex w-full'>
      <div className="w-1/5 h-16 bg-red-500" >Sidebar
      </div>
      <div className="w-4/5 h-16 bg-green-500" >Main content
      </div>
    </div>
  )
}
