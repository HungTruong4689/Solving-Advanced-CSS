import Image from 'next/image'

export default function Home() {
    console.log('test')
    return (
        <div className="h-screen p-4 Parent">
            <h1 className="">This is the title</h1>
            <h2 className="text-xl ">This is subtitle</h2>
            <p className="text-base">This is paragraph</p>
            <a href="">This is an anchor</a>
            <div className="columns-2">
                <p>Well, let me tell you something, ...</p>
                <p className="break-after-column">Sure, go ahead, laugh...</p>
                <p>Maybe we can live without...</p>
                <p>Look. If you think this is...</p>
            </div>
            <div className="grid gap-4 grid-cols-3 grid-rows-3">
                check the grid version
            </div>
            <div className="flex ...">
                <div className="flex-1 ...">01</div>
                <div className="contents">
                    <div className="flex-1 ...">02</div>
                    <div className="flex-1 ...">03</div>
                </div>
                <div className="flex-1 ...">04</div>
            </div>
            <span className="inline-grid grid-cols-3 gap-4">
                <span>01</span>
                <span>02</span>
                <span>03</span>
                <span>04</span>
                <span>05</span>
                <span>06</span>
            </span>
            <span className="inline-grid grid-cols-3 gap-4">
                <span>01</span>
                <span>02</span>
                <span>03</span>
                <span>04</span>
                <span>05</span>
                <span>06</span>
            </span>
            <p>
                Today I spent most of the day researching ways to ...
                <span className="inline-flex items-baseline">
                    <img
                        src="path/to/image.jpg"
                        alt=""
                        className="self-center w-5 h-5 rounded-full mx-1"
                    />
                    <span>Kramer</span>
                </span>
                keeps telling me there is no way to make it work, that ...
            </p>
            <div className="p-4">
                <div className="flow-root ...">
                    <div className="my-4 ...">
                        Well, let me tell you something, ...
                    </div>
                </div>
                <div className="flow-root ...">
                    <div className="my-4 ...">
                        Sure, go ahead, laugh if you want...
                    </div>
                </div>
            </div>
            <div className="p-4">
                <div className="flow-root ...">
                    <div className="my-4 ...">
                        Well, let me tell you something, ...
                    </div>
                </div>
                <div className="flow-root ...">
                    <div className="my-4 ...">
                        Sure, go ahead, laugh if you want...
                    </div>
                </div>
            </div>
            <div>
                When controlling the flow of text, using the CSS property
                <span className="inline">display: inline</span>
                will cause the text inside the element to wrap normally. While
                using the property{' '}
                <span className="inline-block">display: inline-block</span>
                will wrap the element to prevent the text inside from extending
                beyond its parent. Lastly, using the property{' '}
                <span className="block">display: block</span>
                will put the element on its own line and fill its parent.
            </div>
            <div className="box-border h-32 w-32 p-4 border-4 ...">
                Box Sizing
            </div>
            <div className="box-content h-32 w-32 p-4 border-4 ...">
                Box Content
            </div>
            <div className="columns-2">
                <p>Well, let me tell you something, ...</p>
                <p className="break-inside-avoid-column">
                    Sure, go ahead, laugh...
                </p>
                <p>Maybe we can live without...</p>
                <p>Look. If you think this is...</p>
            </div>
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
            <div className="grid grid-cols-3 gap-4 ">
                <div className="... bg-blue-400">01</div>
                <div className="... bg-blue-400">02</div>
                <div className="... bg-blue-400">03</div>
                <div className="col-span-2 ... bg-blue-400">04</div>
                <div className="... bg-blue-400">05</div>
                <div className="... bg-blue-400">06</div>
                <div className="col-span-2 ... bg-blue-400">07</div>
            </div>
            <div className="table w-full ...">
                <div className="table-header-group ...">
                    <div className="table-row">
                        <div className="table-cell text-left ...">Song</div>
                        <div className="table-cell text-left ...">Artist</div>
                        <div className="table-cell text-left ...">Year</div>
                    </div>
                </div>
                <div className="table-row-group">
                    <div className="table-row">
                        <div className="table-cell ...">
                            The Sliding Mr. Bones (Next Stop, Pottersville)
                        </div>
                        <div className="table-cell ...">Malcolm Lockyer</div>
                        <div className="table-cell ...">1961</div>
                    </div>
                    <div className="table-row">
                        <div className="table-cell ...">Witchy Woman</div>
                        <div className="table-cell ...">The Eagles</div>
                        <div className="table-cell ...">1972</div>
                    </div>
                    <div className="table-row">
                        <div className="table-cell ...">Shining Star</div>
                        <div className="table-cell ...">
                            Earth, Wind, and Fire
                        </div>
                        <div className="table-cell ...">1975</div>
                    </div>
                </div>
            </div>
            <div className="overflow-y-scroll ..."></div>
            <div className="overflow-scroll ...">overflow scroll</div>
            <div className="overscroll-contain ...">
                Well, let me tell you something, ...
            </div>
            <div className="overscroll-auto ...">
                Well, let me tell you something, ...
            </div>
            <img className="float-right ..." src="path/to/image.jpg" />
            <div className="bg-indigo-300 ...">
                <img className="object-cover h-48 w-96 ..." />
            </div>
            <div className="static ...">
                <div className="static ...">
                    <p>Static child</p>
                </div>
                <div className="inline-block ...">
                    <p>Static sibling</p>
                </div>

                <div className="absolute ...">
                    <p>Absolute child</p>
                </div>
                <div className="inline-block ...">
                    <p>Static sibling</p>
                </div>
            </div>
            <div className="flex flex-row">
                <div className="basis-1/4">01</div>
                <div className="basis-1/4">02</div>
                <div className="basis-1/2">03</div>
            </div>
            <div className="flex flex-row ...">
                <div>01</div>
                <div>02</div>
                <div>03</div>
            </div>
            <div className="flex flex-col ...">
                <div>01</div>
                <div>02</div>
                <div>03</div>
            </div>
            <div className="flex flex-nowrap">
                <div>01</div>
                <div>02</div>
                <div>03</div>
            </div>
            <div className="z-40 ...">05</div>
            <div className="z-30 ...">04</div>
            <div className="z-20 ...">03</div>
            <div className="z-10 ...">02</div>
            <div className="z-0 ...">01</div>
            <div className="flex flex-wrap">
                <div>01</div>
                <div>02</div>
                <div>03</div>
            </div>
            <div className="grid grid-cols-4 gap-4">
                <div>01</div>

                <div>09</div>
            </div>
            <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-3 ...">
                <div className="col-span-2">01</div>
                <div className="col-span-2">02</div>
                <div>03</div>
                <div>04</div>
                <div>05</div>
            </div>
            <div className="h-56 grid grid-cols-3 gap-4 content-start ...">
                <div>01</div>
                <div>02</div>
                <div>03</div>
                <div>04</div>
                <div>05</div>
            </div>
            <div className="h-56 grid grid-cols-3 gap-4 content-center ...">
                <div>01</div>
                <div>02</div>
                <div>03</div>
                <div>04</div>
                <div>05</div>
            </div>
            <div className="h-56 grid grid-cols-3 gap-4 content-end ...">
                <div>01</div>
                <div>02</div>
                <div>03</div>
                <div>04</div>
                <div>05</div>
            </div>
            <div className="h-56 grid grid-cols-3 gap-4 content-between ...">
                <div>01</div>
                <div>02</div>
                <div>03</div>
                <div>04</div>
                <div>05</div>
            </div>
            <div className="h-56 grid grid-cols-3 gap-4 content-around ...">
                <div>01</div>
                <div>02</div>
                <div>03</div>
                <div>04</div>
                <div>05</div>
            </div>
            <div className="grid grid-flow-row auto-rows-max">
                <div>01</div>
                <div>02</div>
                <div>03</div>
            </div>
            <div className="h-56 grid grid-cols-3 gap-4 content-around ...">
                <div>01</div>
                <div>02</div>
                <div>03</div>
                <div>04</div>
                <div>05</div>
            </div>
            <div className="grid grid-cols-2 gap-4 place-content-start h-48 ...">
                <div>01</div>
                <div>02</div>
                <div>03</div>
                <div>04</div>
            </div>
            <div className="grid grid-cols-2 gap-4 place-content-end h-48 ...">
                <div>01</div>
                <div>02</div>
                <div>03</div>
                <div>04</div>
            </div>
            <div className="grid grid-cols-2 gap-4 place-content-between h-48 ...">
                <div>01</div>
                <div>02</div>
                <div>03</div>
                <div>04</div>
            </div>
            <div className="grid grid-cols-2 gap-4 place-content-around h-48 ...">
                <div>01</div>
                <div>02</div>
                <div>03</div>
                <div>04</div>
            </div>
            <div className="grid grid-cols-2 gap-4 place-content-center h-48 ...">
                <div>01</div>
                <div>02</div>
                <div>03</div>
                <div>04</div>
            </div>
            <div className="h-56 grid grid-cols-3 gap-4 content-evenly ...">
                <div>01</div>
                <div>02</div>
                <div>03</div>
                <div>04</div>
                <div>05</div>
            </div>
            <div className="h-56 grid grid-cols-3 gap-4 content-evenly ...">
                <div>01</div>
                <div>02</div>
                <div>03</div>
                <div>04</div>
                <div>05</div>
            </div>
            <div className="h-56 grid grid-cols-3 gap-4 content-stretch ...">
                <div>01</div>
                <div>02</div>
                <div>03</div>
                <div>04</div>
                <div>05</div>
            </div>
            <div className="h-56 grid grid-cols-3 gap-4 content-normal ...">
                <div>01</div>
                <div>02</div>
                <div>03</div>
                <div>04</div>
                <div>05</div>
            </div>
            <div className="grid grid-flow-col auto-cols-max">
                <div>01</div>
                <div>02</div>
                <div>03</div>
            </div>
            <div className="grid gap-4 grid-cols-2">
                <div>01</div>
                <div>02</div>
                <div>03</div>
                <div>04</div>
            </div>
            <div className="flex items-stretch ...">
                <div className="py-4">01</div>
                <div className="py-12">02</div>
                <div className="py-8">03</div>
            </div>
            <div className="flex items-start ...">
                <div className="py-4">01</div>
                <div className="py-12">02</div>
                <div className="py-8">03</div>
            </div>
            <div className="flex items-center ...">
                <div className="py-4">01</div>
                <div className="py-12">02</div>
                <div className="py-8">03</div>
            </div>
            <div className="flex justify-between ...">
                <div className="order-last">01</div>
                <div>02</div>
                <div>03</div>
            </div>
            <div className="flex items-end ...">
                <div className="py-4">01</div>
                <div className="py-12">02</div>
                <div className="py-8">03</div>
            </div>
            <div className="flex items-baseline ...">
                <div className="pt-2 pb-6">01</div>
                <div className="pt-8 pb-12">02</div>
                <div className="pt-12 pb-4">03</div>
            </div>
            <div className="flex items-stretch ...">
                <div>01</div>
                <div className="self-auto ...">02</div>
                <div>03</div>
            </div>
            <div className="flex items-stretch ...">
                <div>01</div>
                <div className="self-start ...">02</div>
                <div>03</div>
            </div>
            <div className="flex items-stretch ...">
                <div>01</div>
                <div className="self-center ...">02</div>
                <div>03</div>
            </div>
            <div className="flex items-stretch ...">
                <div>01</div>
                <div className="self-end ...">02</div>
                <div>03</div>
            </div>
            <div className="flex ...">
                <div className="flex-1 h-16 ...">01</div>
                <div className="shrink-0 h-16 w-32 ...">02</div>
                <div className="flex-1 h-16 ...">03</div>
            </div>
            <div className="flex ...">
                <div className="flex-none w-14 h-14 ...">01</div>
                <div className="shrink w-64 h-14 ...">02</div>
                <div className="flex-none w-14 h-14 ...">03</div>
            </div>
            <div className="flex ...">
                <div className="grow h-14 ...">01</div>
                <div className="grow-0 h-14 ...">02</div>
                <div className="grow h-14 ...">03</div>
            </div>
            <div className="flex ...">
                <div className="flex-none w-14 h-14 ...">01</div>
                <div className="grow h-14 ...">02</div>
                <div className="flex-none w-14 h-14 ...">03</div>
            </div>
            <div className="grid grid-cols-2 gap-4 place-content-center h-48 ...">
                <div>01</div>
                <div>02</div>
                <div>03</div>
                <div>04</div>
            </div>
            <div className="grid grid-cols-2 gap-4 place-content-start h-48 ...">
                <div>01</div>
                <div>02</div>
                <div>03</div>
                <div>04</div>
            </div>
            <div className="grid grid-cols-2 gap-4 place-content-end h-48 ...">
                <div>01</div>
                <div>02</div>
                <div>03</div>
                <div>04</div>
            </div>
            <div className="flex flex-wrap-reverse">
                <div>01</div>
                <div>02</div>
                <div>03</div>
            </div>
            <div className="flex flex-row-reverse ...">
                <div>01</div>
                <div>02</div>
                <div>03</div>
            </div>
            <div className="grid grid-cols-2 gap-4 place-content-between h-48 ...">
                <div>01</div>
                <div>02</div>
                <div>03</div>
                <div>04</div>
            </div>
            <div className="grid grid-cols-2 gap-4 place-content-around h-48 ...">
                <div>01</div>
                <div>02</div>
                <div>03</div>
                <div>04</div>
            </div>
            <div className="grid grid-cols-2 gap-4 place-content-evenly h-48 ...">
                <div>01</div>
                <div>02</div>
                <div>03</div>
                <div>04</div>
            </div>
            <div className="grid grid-cols-2 gap-4 place-content-stretch h-48 ...">
                <div>01</div>
                <div>02</div>
                <div>03</div>
                <div>04</div>
            </div>
            <div className="grid grid-cols-3 gap-4 place-items-start ...">
                <div>01</div>
                <div>02</div>
                <div>03</div>
                <div>04</div>
                <div>05</div>
                <div>06</div>
            </div>
            <div className="grid grid-cols-3 gap-4 place-items-end h-56 ...">
                <div>01</div>
                <div>02</div>
                <div>03</div>
                <div>04</div>
                <div>05</div>
                <div>06</div>
            </div>
            <div className="grid grid-cols-3 gap-4 place-items-center h-56 ...">
                <div>01</div>
                <div>02</div>
                <div>03</div>
                <div>04</div>
                <div>05</div>
                <div>06</div>
            </div>
            <div className="grid grid-cols-3 gap-4 place-items-stretch h-56 ...">
                <div>01</div>
                <div>02</div>
                <div>03</div>
                <div>04</div>
                <div>05</div>
                <div>06</div>
            </div>
            <div className="grid grid-cols-3 gap-4 ...">
                <div>01</div>
                <div className="place-self-auto ...">02</div>
                <div>03</div>
                <div>04</div>
                <div>05</div>
                <div>06</div>
            </div>
            <div className="grid grid-cols-3 gap-4 ...">
                <div>01</div>
                <div className="place-self-start ...">02</div>
                <div>03</div>
                <div>04</div>
                <div>05</div>
                <div>06</div>
            </div>
            <div className="static ...">
                <p>Static parent</p>
                <div className="absolute bottom-0 left-0 ...">
                    <p>Absolute child</p>
                </div>
            </div>
            <div className="static ...">
                <div className="static ...">
                    <p>Static child</p>
                </div>
                <div className="inline-block ...">
                    <p>Static sibling</p>
                </div>

                <div className="absolute ...">
                    <p>Absolute child</p>
                </div>
                <div className="inline-block ...">
                    <p>Static sibling</p>
                </div>
            </div>
            <div className="relative ...">
                <p>Relative parent</p>
                <div className="absolute bottom-0 left-0 ...">
                    <p>Absolute child</p>
                </div>
            </div>
            <div className="relative">
                <div className="fixed top-0 left-0 right-0">Contacts</div>
                <div>
                    <div>
                        <img src="..." />
                        <strong>Andrew Alfred</strong>
                    </div>
                    <div>
                        <img src="..." />
                        <strong>Debra Houston</strong>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <div className="sticky top-0 ...">A</div>
                    <div>
                        <div>
                            <img src="..." />
                            <strong>Andrew Alfred</strong>
                        </div>
                        <div>
                            <img src="..." />
                            <strong>Aisha Houston</strong>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="sticky top-0">B</div>
                    <div>
                        <div>
                            <img src="..." />
                            <strong>Bob Alfred</strong>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative">
                <div className="fixed top-0 left-0 right-0">Contacts</div>
                <div>
                    <div>
                        <img src="..." />
                        <strong>Andrew Alfred</strong>
                    </div>
                    <div>
                        <img src="..." />
                        <strong>Debra Houston</strong>
                    </div>
                </div>
            </div>
            <div className="static ...">
                <p>Static parent</p>
                <div className="absolute bottom-0 left-0 ...">
                    <p>Absolute child</p>
                </div>
            </div>
            <div className="bg-purple-300 ...">
                <img className="object-contain h-48 w-96 ..." />
            </div>
            <div className="bg-sky-300 ...">
                <img className="object-fill h-48 w-96 ..." />
            </div>
            <img
                className="object-none object-left-top bg-yellow-300 w-24 h-24 ..."
                src="..."
            ></img>
            <img
                className="object-none object-top bg-yellow-300 w-24 h-24 ..."
                src="..."
            ></img>
            <img
                className="object-none object-right-top bg-yellow-300 w-24 h-24 ..."
                src="..."
            ></img>
            <div className="bg-cyan-300">
                <img className="object-scale-down h-48 w-96 ..." />
            </div>
            <div className="bg-cyan-300">
                <img className="object-scale-down h-48 w-96 ..." />
            </div>
            <p>
                Maybe we can live without libraries, people like you and me. ...
            </p>
            <div className="flex ...">
                <div className="hidden ...">01</div>
                <div>02</div>
                <div>03</div>
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
