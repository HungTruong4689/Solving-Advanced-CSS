import Image from 'next/image'

export default function Home() {
    console.log('test')
    return (
        <div className="h-screen text-white Parent bg-slate-900">
            <div className="container mx-auto columns-lg bg-red-500">
                <h1 className="relative">Hello</h1>
                <img
                    src="https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*"
                    className="float-left w-64"
                />
            </div>
        </div>
    )
}
