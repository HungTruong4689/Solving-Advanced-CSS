import Image from 'next/image'

export default function Home() {
    console.log('test')
    return (
        <div className="h-screen p-4 Parent">
            <h1 className="">This is the title</h1>
            <h2 className="text-xl ">This is subtitle</h2>
            <p className="text-base">This is paragraph</p>
            <a href="">This is an anchor</a>
            <div className="">
                <button>This is a button</button>
            </div>
            <div className="">
                <input type="text" />
            </div>
            <div className="">
                <input type="checkbox" className="checkbox" />
                <label htmlFor="checkbox"></label>
            </div>
            <div className="">
                <select name="" id="">
                    <option value="">Option 1</option>
                    <option value="">Option 2</option>
                </select>
            </div>
            <div className="">
                <div className="blur-none ..."></div>
                <div className="blur-sm ..."></div>
                <div className="blur-lg ..."></div>
                <div className="blur-2xl ..."></div>
            </div>
        </div>
    )
}
