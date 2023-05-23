import Image from 'next/image'

export default function Home() {
    console.log('test')
    return (
        <div className="h-screen p-4 Parent">
            <div className="inline-block p-4 text-black bg-white border rounded-lg ">
                <h1 className="text-2xl">Hello</h1>
                <p className="mb-4">This is my div</p>
                <button className="px-3 py-2 rounded-lg cursor-pointer bg-cyan-500 shadow-md shadow-cyan-500/50">
                    Say Hello
                </button>
            </div>
        </div>
    )
}
