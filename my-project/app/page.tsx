import Image from 'next/image'

export default function Home() {
  console.log("test")
  return (
    <div className='Parent'>
      <div>Header</div>
      <div className="flex flex-row" >
        <div className="w-32 bg-sky-500">Sidebar</div>
        <div className='w-full bg-red-600'>Main content</div>
      </div>
      
    </div>
  )
}
