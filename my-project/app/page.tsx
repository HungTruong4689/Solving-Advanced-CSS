import Image from 'next/image'

export default function Home() {
  console.log("test")
  return (
    <div className='Parent'>
      <div>Header</div>
      <div className="flex flex-row" >
      <div>Main content</div>
      </div>
      <div className="flex flex-col" >
        <div>Sidebar</div>
        <div>Menu</div>
      </div>
    </div>
  )
}
