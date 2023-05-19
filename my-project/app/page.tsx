import Image from 'next/image'

export default function Home() {
  console.log("test")
  return (
    <div className='Parent'>
      <div>Header</div>
      <div className="flex flex-col md:flex-row" >
        <div className="flex w-full flex-wrap">
          <div className='w-32 grow'>01</div>
          <div className='w-32 grow'>02</div>
          <div className='w-32 grow'>03</div>
          <div className='w-32 grow'>04</div>
          <div className='w-32 grow'>05</div>
        </div>
        
      </div>
      
    </div>
  )
}
