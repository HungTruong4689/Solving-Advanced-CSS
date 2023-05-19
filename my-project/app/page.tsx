import Image from 'next/image'

export default function Home() {
  console.log("test")
  return (
    <div className='Parent'>
      <div>Header</div>
      
        <div className="flex items-baseline">
          <div className="pt-2 pb-6 bg-sky-500">01</div>
          <div className="pt-8 pb-12 bg-red-500">02</div>
          <div className="pt-12 pb-4 bg-green-500">03</div>
        </div>
        
     
      
    </div>
  )
}
