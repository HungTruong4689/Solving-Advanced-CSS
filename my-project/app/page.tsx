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
            <div className="grid grid-cols-3 gap-4">
                <div className="...">01</div>
                <div className="...">02</div>
                <div className="...">03</div>
                <div className="col-span-2 ...">04</div>
                <div className="...">05</div>
                <div className="...">06</div>
                <div className="col-span-2 ...">07</div>
            </div>

            <table className="border-collapse border border-slate-500 ...">
                <thead>
                    <tr>
                        <th className="border border-slate-600 ...">State</th>
                        <th className="border border-slate-600 ...">City</th>
                    </tr>
                </thead>
                <div className="flex ...">
                    <div className="flex-1 h-16 ...">01</div>
                    <div className="shrink-0 h-16 w-32 ...">02</div>
                    <div className="flex-1 h-16 ...">03</div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    <div>01</div>

                    <div>09</div>
                </div>
                <div className="grid grid-cols-1 hover:grid-cols-6">
                    Check grid-cols-2
                </div>
                <tbody>
                    <tr>
                        <td className="border border-slate-700 ...">Indiana</td>
                        <td className="border border-slate-700 ...">
                            Indianapolis
                        </td>
                    </tr>
                    <tr>
                        <td className="border rounded-md border-slate-700 ...">
                            Ohio
                        </td>
                        <td className="border flex focus-visible:bg-gray-300 border-slate-700 ...">
                            Columbus
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-slate-700 ...">
                            Michigan
                        </td>
                        <td className="border border-slate-700 ...">Detroit</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
