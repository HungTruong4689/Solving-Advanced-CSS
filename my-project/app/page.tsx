import Image from 'next/image'

export default function Home() {
    console.log('test')
    return (
        <div className="h-screen text-white Parent bg-slate-900">
            <div className="container divide-y border-red-300 columns-lg top-5 bg-red-500">
                <div className="">01</div>
                <div className="">01</div>
                <div className="">01</div>
                <div className="">01</div>
            </div>
        </div>
    )
}
