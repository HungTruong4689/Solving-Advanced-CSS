import Image from 'next/image'

export default function Home() {
  console.log("test")
  return (
    <div className='flex Parent'>
      <div>Header</div>
      <div className="" >Sidebar
      </div>
      <div className="" >Main content
      </div>
    </div>
  )
}
