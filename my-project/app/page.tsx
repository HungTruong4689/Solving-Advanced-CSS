import Image from 'next/image'

export default function Home() {
    console.log('test')
    return (
        <div className="">
            <button className="outline outline-offset-2 outline-1 ...">
                Button A
            </button>
            <button className="outline outline-offset-2 outline-2 ...">
                Button B
            </button>
            <button className="outline outline-offset-2 outline-4 ...">
                Button C
            </button>
        </div>
    )
}
