import Image from 'next/image'

export default function Home() {
  console.log("test")
  return (
    <div className='Parent'>
      <div>Header</div>
      <div className="flex flex-col md:flex-row" >
        <div className="w-full bg-sky-500 md:w-32">Sidebar</div>
        <div className='w-full bg-red-600'>Main content</div>
      </div>
      
    </div>
  )
}
