import Image from 'next/image'

export default function Home() {
    console.log('test')
    return (
        <div className="h-screen text-white Parent bg-slate-900">
            <div className="container divide-y border-dashed border-red-300 columns-lg top-5 bg-red-500 divide-dashed">
                <div className="">01</div>
                <div className="">01</div>
                <div className="">01</div>
                <div className="">01</div>
            </div>
        </div>
    )
}
