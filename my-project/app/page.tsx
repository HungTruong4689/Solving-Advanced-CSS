import Image from 'next/image'

export default function Home() {
  console.log("test")
  return (
    <div className='Parent'>
      <div>Header</div>
      
        <div className="flex items-center">
          <div>Sidebar</div>
          <div>Main content</div>
        </div>
        
     
      
    </div>
  )
}
