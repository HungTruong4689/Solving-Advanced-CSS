import Image from 'next/image'

export default function Home() {
    console.log('test')
    return (
        <div className="h-screen text-white Parent bg-slate-900">
            <div className="container mx-auto columns-lg top-5 bg-red-500">
                <h1 className="relative border">Hello</h1>
            </div>
        </div>
    )
}
