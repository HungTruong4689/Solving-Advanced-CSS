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
                <div className="flex-1 ...">
                    01 Use flex-1 to allow a flex item to grow and shrink as
                    needed, ignoring its initial size:
                </div>
                <div className="contents">
                    <div className="flex-1 ...">02</div>
                    <div className="flex-auto ...">
                        03Use flex-auto to allow a flex item to grow and shrink,
                        taking into account its initial size: Use flex-auto to
                        allow a flex item to grow and shrink, taking into
                        account its initial size:
                    </div>
                </div>
                <div className="flex-1 ...">04</div>
            </div>
            <div className="flex ...">
                <div className="flex-none w-14 h-14 ...">01</div>
                <div className="flex-none ...">
                    02 Use flex-none to prevent a flex item from growing or
                    shrinking:
                </div>
                <div className="flex-1 ...">03</div>
            </div>
            <div className="flex flex-row">
                <div className="basis-1/4">
                    01 Use the basis-{size} utilities to set the initial size of
                    flex items.
                </div>
                <div className="basis-1/4">02</div>
                <div className="basis-1/2">03</div>
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
                will put the element on its own line and fill its parent. Use
                inline, inline-block, and block to control the flow of text and
                elements.
            </div>
            <div className="flex items-center">
                Use flex to create a block-level flex container.
                <img src="path/to/image.jpg" />
                <div>
                    <strong>Andrew Alfred</strong>
                    <span>Technical advisor</span>
                </div>
            </div>

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
                Use flow-root to create a block-level element with its own block
                formatting context.
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
            <span className="box-decoration-slice bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-2 ...">
                Hello
                <br />
                World Use the box-decoration-slice and box-decoration-clone
                utilities to control whether properties like background, border,
                border-image, box-shadow, clip-page, margin, and padding should
                be rendered as if the element were one continuous fragment, or
                distinct blocks.
            </span>
            <div className="box-decoration-clone hover:box-decoration-slice">
                Tailwind lets you conditionally apply utility classes in
                different states using variant modifiers. For example, use
                hover:box-decoration-slice to only apply the
                box-decoration-slice utility on hover.
            </div>
            <div className="box-decoration-clone md:box-decoration-slice">
                You can also use variant modifiers to target media queries like
                responsive breakpoints, dark mode, prefers-reduced-motion, and
                more. For example, use md:box-decoration-slice to apply the
                box-decoration-slice utility at only medium screen sizes and
                above.
            </div>
            <div className="box-border h-32 w-32 p-4 border-4 ...">
                Use box-border to set an element’s box-sizing to border-box,
                telling the browser to include the element’s borders and padding
                when you give it a height or width.
            </div>
            <div className="box-content h-32 w-32 p-4 border-4 ...">
                Use box-content to set an element’s box-sizing to content-box,
                telling the browser to add borders and padding on top of the
                element’s specified width or height.
            </div>
            <div className="box-border hover:box-content"></div>
            <span className="box-decoration-clone bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-2 ...">
                Hello
                <br />
                World
            </span>
            <div className="flex ...">
                <div className="flex-none w-14 h-14 ...">01</div>
                <div className="grow h-14 ...">
                    02 Use grow to allow a flex item to grow to fill any
                    available space:
                </div>
                <div className="flex-none w-14 h-14 ...">03</div>
            </div>
            <div className="flex ...">
                <div className="grow h-14 ...">01</div>
                <div className="grow-0 h-14 ...">
                    02 Use grow-0 to prevent a flex item from growing:
                </div>
                <div className="grow h-14 ...">03</div>
            </div>
            <div className="flex ...">
                <div className="flex-none w-14 h-14 ...">01</div>
                <div className="shrink w-64 h-14 ...">
                    02 Use shrink to allow a flex item to shrink if needed:
                </div>
                <div className="flex-none w-14 h-14 ...">03</div>
            </div>
            <div className="flex ...">
                <div className="flex-1 h-16 ...">01</div>
                <div className="shrink-0 h-16 w-32 ...">
                    02 Use shrink-0 to prevent a flex item from shrinking:
                </div>
                <div className="flex-1 h-16 ...">03</div>
            </div>
            <span className="inline-grid grid-cols-3 gap-4">
                <span>
                    01: Use inline-grid to create an inline grid container.
                </span>
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
            <div className="flex ...">
                <div className="flex-1 ...">
                    01 : Use contents to create a “phantom” container whose
                    children act like direct children of the parent.
                </div>
                <div className="contents">
                    <div className="flex-1 ...">02</div>
                    <div className="flex-1 ...">03</div>
                </div>
                <div className="flex-1 ...">04</div>
            </div>
            <div className="flex ...">
                <div className="hidden ...">
                    01: Use hidden to set an element to display: none and remove
                    it from the page layout (compare with invisible from the
                    visibility documentation).
                </div>
                <div>02</div>
                <div>03</div>
            </div>
            <img className="float-right ..." src="path/to/image.jpg" />
            <p>
                Maybe we can live without libraries, people like you and me. ...
                Use float-right to float an element to the right of its
                container.
            </p>
            <img className="float-left ..." src="path/to/image.jpg" />
            <p>
                Maybe we can live without libraries, people like you and me. ...
                Use float-left to float an element to the left of its container.
            </p>
            <img className="float-none ..." src="path/to/image.jpg" />
            <p>
                Maybe we can live without libraries, people like you and me. ...
                Use float-none to reset any floats that are applied to an
                element. This is the default value for the float property.
            </p>
            <div className="bg-indigo-300 ...">
                Resize an element’s content to cover its container using
                object-cover.
                <img className="object-cover h-48 w-96 ..." />
            </div>
            <div className="bg-purple-300 ...">
                Resize an element’s content to stay contained within its
                container using object-contain.
                <img className="object-contain h-48 w-96 ..." />
            </div>
            <div className="bg-sky-300 ...">
                Stretch an element’s content to fit its container using
                object-fill.
                <img className="object-fill h-48 w-96 ..." />
            </div>
            <div className="bg-cyan-300">
                Display an element’s content at its original size but scale it
                down to fit its container if necessary using object-scale-down.
                <img className="object-scale-down h-48 w-96 ..." />
            </div>
            <div className="overflow-visible ...">
                Use overflow-visible to prevent content within an element from
                being clipped. Note that any content that overflows the bounds
                of the element will then be visible.
            </div>
            <div className="bg-yellow-300">
                Display an element’s content at its original size ignoring the
                container size using object-none.
                <img className="object-none h-48 w-96 ..." />
            </div>
            <div className="overflow-hidden ...">
                Use overflow-hidden to clip any content within an element that
                overflows the bounds of that element.
            </div>
            <div className="overflow-auto ...">
                Use overflow-auto to add scrollbars to an element in the event
                that its content overflows the bounds of that element. Unlike
                overflow-scroll, which always shows scrollbars, this utility
                will only show them if scrolling is necessary.
            </div>
            <div className="overflow-x-auto ...">
                Use overflow-x-auto to allow horizontal scrolling if needed.
            </div>
            <div className="overflow-y-auto h-32 ...">
                Use overflow-y-auto to allow vertical scrolling if needed.
            </div>
            <div className="overflow-x-scroll ...">
                Use overflow-x-scroll to allow horizontal scrolling and always
                show scrollbars unless always-visible scrollbars are disabled by
                the operating system.
            </div>
            <div className="overflow-y-scroll ...">
                Use overflow-y-scroll to allow vertical scrolling and always
                show scrollbars unless always-visible scrollbars are disabled by
                the operating system.
            </div>
            <div className="overscroll-contain ...">
                Well, let me tell you something, ... Use overscroll-contain to
                prevent scrolling in the target area from triggering scrolling
                in the parent element, but preserve “bounce” effects when
                scrolling past the end of the container in operating systems
                that support it.
            </div>
            <div className="overscroll-none ...">
                Well, let me tell you something, ... Use overscroll-none to
                prevent scrolling in the target area from triggering scrolling
                in the parent element, and also prevent “bounce” effects when
                scrolling past the end of the container.
            </div>
            <div className="overscroll-auto ...">
                Well, let me tell you something, ... Use overscroll-auto to make
                it possible for the user to continue scrolling a parent scroll
                area when they reach the boundary of the primary scroll area.
            </div>
            <div className="overscroll-auto hover:overscroll-contain">
                Tailwind lets you conditionally apply utility classes in
                different states using variant modifiers. For example, use
                hover:overscroll-contain to only apply the overscroll-contain
                utility on hover.
            </div>
            <div className="static ...">
                Use static to position an element according to the normal flow
                of the document.
                <p>Static parent</p>
                <div className="absolute bottom-0 left-0 ...">
                    <p>Absolute child</p>
                </div>
            </div>
            <div className="relative ...">
                Use relative to position an element according to the normal flow
                of the document.
                <p>Relative parent</p>
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
                    Use absolute to position an element outside of the normal
                    flow of the document, causing neighboring elements to act as
                    if the element doesn’t exist.
                </div>
                <div className="inline-block ...">
                    <p>Static sibling</p>
                </div>
            </div>
            <div className="relative">
                Use fixed to position an element relative to the browser window.
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
            <div className="relative">
                Use fixed to position an element relative to the browser window.
                <div className="fixed top-0 left-0 right-0">Contacts</div>
                <div>
                    Use fixed to position an element relative to the browser
                    window.
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
                Use sticky to position an element as relative until it crosses a
                specified threshold, then treat it as fixed until its parent is
                off screen.
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
            <div className="relative h-32 w-32 ...">
                <div className="absolute inset-x-0 top-0 h-16 ...">02</div>
            </div>
            <div className="relative h-32 w-32 ...">
                <div className="absolute inset-x-0 top-0 h-16 ...">02</div>
            </div>
            <div className="relative h-32 w-32 ...">
                <div className="absolute left-0 top-0 h-16 w-16 ...">01</div>
            </div>
            <img className="float-left ..." src="path/to/image.jpg" />
            <img className="float-right ..." src="path/to/image.jpg" />
            <div className="relative h-32 w-32 ...">
                Span left edge
                <div className="absolute inset-y-0 left-0 w-16 ...">04</div>
            </div>
            <div className="border-solid border-2 border-sky-500 ...">
                border-style: solid;
            </div>
            <div className="border-solid border-2 border-sky-500 ...">
                border-style: solid; border-style: solid;
            </div>
            <div className="border-dashed border-2 border-sky-500 ...">
                border-style: dashed;
            </div>
            <div className="border-dashed border-2 border-sky-500 ...">
                border-style: dashed;border-style: dashed;
            </div>
            <div className="border-dotted border-2 border-sky-500 ...">
                {' '}
                border-style: dotted;
            </div>
            <div className="border-dotted border-2 border-sky-500 ...">
                {' '}
                border-style: dotted;border-style: dotted;
            </div>
            <div className="border-double border-4 border-sky-500 ...">
                border-style: double;
            </div>
            <div className="border-double border-4 border-sky-500 ...">
                border-style: double;border-style: double;
            </div>
            <div className="grid grid-cols-3 divide-x">
                Add borders between horizontal elements using the divide-x-
                utilities.
                <div>01</div>
                <div>02</div>
                <div>03</div>
                Add borders between horizontal elements using the divide-x-
                utilities.
            </div>
            <div className="grid grid-cols-3 divide-x-0 ">
                border-right-width: 0px; border-left-width: 0px;
                <div>01</div>
                <div>02</div>
                <div>03</div>
            </div>
            <div className="grid grid-cols-3 divide-x-2 ">
                border-right-width: 0px; border-left-width: 2px;
                <div>01</div>
                <div>02</div>
                <div>03</div>
            </div>
            <div className="grid grid-cols-3 divide-x-4 ">
                border-right-width: 0px; border-left-width: 4px;
                <div>01</div>
                <div>02</div>
                <div>03</div>
            </div>
            <div className="grid grid-cols-3 divide-x-8 ">
                border-right-width: 0px; border-left-width: 8px;
                <div>01</div>
                <div>02</div>
                <div>03</div>
            </div>
            <div className="grid grid-cols-3 divide-y-0 ">
                border-top-width: 0px; border-bottom-width: 0px;
                <div>01</div>
                <div>02</div>
                <div>03</div>
            </div>
            <button className="outline outline-offset-2 outline-1 ...">
                Button A outline-width: 0px;
            </button>
            <button className="outline outline-offset-2 outline-2 ...">
                Button B outline-width: 2px;
            </button>
            <button className="outline outline-offset-2 outline-4 ...">
                Button C outline-width: 4px;
            </button>
            <button className="outline outline-offset-2 outline-0 ...">
                Button D outline-width: 0px;
            </button>
            <button className="outline outline-offset-2 outline-8 ...">
                Button E outline-width: 0px;
            </button>
            <div className="outline hover:outline-2">
                Button F Tailwind lets you conditionally apply utility classes
                in different states using variant modifiers. For example, use
                hover:outline-2 to only apply the outline-2 utility on hover.
            </div>

            <button className="border-hidden ...">
                Save Changes border-style: hidden;
            </button>
            <button className="border-hidden ...">
                Save Changes border-style: hidden; Save Changes border-style:
                hidden;
            </button>
            <button className="border-none ...">
                Save Changes border-style: none;
            </button>
            <button className="border-none ...">
                Save Changes border-style: none; Save Changes border-style:
                none;
            </button>
            <div className="relative h-32 w-32 ...">
                Fill entire parent
                <div className="absolute inset-0 ...">05</div>
            </div>
            <div className="relative h-32 w-32 ...">
                Fill entire parent
                <div className="absolute inset-0 ...">05</div>
                <div className="absolute inset-0 ...">05</div>
            </div>
            <div className="relative h-32 w-32 ...">
                Span right edge
                <div className="absolute inset-y-0 right-0 w-16 ...">06</div>
            </div>
            <div className="relative h-32 w-32 ...">
                Span bottom edge
                <div className="absolute inset-x-0 bottom-0 h-16 ...">08</div>
            </div>
            <div className="relative h-32 w-32 ...">
                Pin to bottom left corner
                <div className="absolute bottom-0 left-0 h-16 w-16 ...">07</div>
            </div>

            <div className="relative h-32 w-32 ...">
                Pin to top right corner
                <div className="absolute top-0 right-0 h-16 w-16 ...">03</div>
            </div>
            <img
                className="float-right hover:float-left"
                src="path/to/image.jpg"
            ></img>
            <p className="clear-left ...">
                Maybe we can live without libraries...
            </p>
            <img className="float-left ..." src="path/to/image.jpg" />
            <img className="float-right ..." src="path/to/image.jpg" />
            <p className="clear-right ...">
                Maybe we can live without libraries...
            </p>
            <div className="overflow-visible ..."></div>
            <img className="float-left ..." src="path/to/image.jpg" />
            <img className="float-left ..." src="path/to/image.jpg" />
            <img className="float-right ..." src="path/to/image.jpg" />
            <p className="clear-both ...">
                Maybe we can live without libraries...
            </p>
            <p className="clear-both ...">
                Maybe we can live without libraries... Maybe we can live without
                libraries...
            </p>
            <img className="float-left ..." src="path/to/image.jpg" />
            <img className="float-right ..." src="path/to/image.jpg" />
            <p className="clear-none ...">
                Maybe we can live without libraries...
            </p>
            <p className="clear-none ...">
                Maybe we can live without libraries...
            </p>
            <div className="bg-indigo-300 ...">
                <img className="object-cover h-48 w-96 ..." />
            </div>
            <div className="bg-indigo-300 ...">
                <img className="object-cover h-48 w-96 ..." />
            </div>
            <div className="bg-indigo-300 ...">
                <img className="object-cover h-48 w-96 ..." />
            </div>
            <div className="bg-purple-300 ...">
                <img className="object-contain h-48 w-96 ..." />
            </div>
            <div className="bg-sky-300 ...">
                <img className="object-fill h-48 w-96 ..." />
            </div>
            <div className="bg-cyan-300">
                <img className="object-scale-down h-48 w-96 ..." />
            </div>
            <div className="bg-yellow-300">
                <img className="object-none h-48 w-96 ..." />
            </div>
            <div className="bg-yellow-300">
                <img className="object-none h-48 w-96 ..." />
            </div>
            <p className="text-left ...">
                So I started to walk into the water...
            </p>
            <p className="text-center ...">
                So I started to walk into the water...
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
            <p className="text-left ...">
                So I started to walk into the water...
            </p>
            <p className="text-left ...">
                So I started to walk into the water...
            </p>
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
                        <div className="table-cell ...">1961</div>
                    </div>
                    <div className="table-row">
                        <div className="table-cell ...">
                            The Sliding Mr. Bones (Next Stop, Pottersville)
                        </div>
                        <div className="table-cell ...">Malcolm Lockyer</div>
                        <div className="table-cell ...">1961</div>
                    </div>
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
            <div className="overflow-y-scroll ...">Scroll</div>
            <div className="overflow-y-scroll ...">Scroll-Scroll</div>
            <div className="overflow-scroll ...">overflow scroll</div>
            <div className="overflow-scroll ...">overflow scroll check</div>
            <div className="overscroll-contain ...">
                Well, let me tell you something, ...
            </div>
            <div className="overscroll-contain ...">
                Well, let me tell you something, ...
            </div>
            <div className="overscroll-contain ...">
                Well, let me tell you something, ... Use overscroll-contain to
                prevent scrolling in the target area from triggering scrolling
                in the parent element, but preserve “bounce” effects when
                scrolling past the end of the container in operating systems
                that support it.
            </div>
            <div className="overscroll-contain ...">
                Well, let me tell you something, ... overscroll-behavior:
                contain;
            </div>
            <div className="overscroll-auto ...">
                Well, let me tell you something, ...
            </div>
            <div className="overscroll-auto ...">
                Well, let me tell you something, ...
            </div>
            <div className="overscroll-auto ...">
                Well, let me tell you something, ...
            </div>
            <div className="overscroll-auto ...">
                Well, let me tell you something, ... Use overscroll-auto to make
                it possible for the user to continue scrolling a parent scroll
                area when they reach the boundary of the primary scroll area.
            </div>
            <div className="overflow-visible ...">
                Visible Use overflow-visible to prevent content within an
                element from being clipped. Note that any content that overflows
                the bounds of the element will then be visible.
            </div>
            <div className="overscroll-none ...">
                Well, let me tell you something, ... Use overscroll-none to
                prevent scrolling in the target area from triggering scrolling
                in the parent element, and also prevent “bounce” effects when
                scrolling past the end of the container.
            </div>
            <img className="float-right ..." src="path/to/image.jpg" />
            <img className="float-right ..." src="path/to/image.jpg" />
            <div className="bg-indigo-300 ...">
                <img className="object-cover h-48 w-96 ..." />
            </div>
            <div className="bg-indigo-300 ...">
                <img className="object-cover h-48 w-96 ..." />
                Resize an element’s content to cover its container using
                object-cover.
            </div>
            <div className="bg-purple-300 ...">
                <img className="object-contain h-48 w-96 ..." />
                Resize an element’s content to stay contained within its
                container using object-contain.
            </div>
            <div className="bg-sky-300 ...">
                <img className="object-fill h-48 w-96 ..." />
                Stretch an element’s content to fit its container using
                object-fill.
            </div>
            <div className="bg-cyan-300">
                <img className="object-scale-down h-48 w-96 ..." />
                Display an element’s content at its original size but scale it
                down to fit its container if necessary using object-scale-down.
            </div>
            <div className="bg-yellow-300">
                Display an element’s content at its original size ignoring the
                container size using object-none.
                <img className="object-none h-48 w-96 ..." />
            </div>
            <div className="bg-indigo-300 ...">
                Tailwind lets you conditionally apply utility classes in
                different states using variant modifiers. For example, use
                hover:object-scale-down to only apply the object-scale-down
                utility on hover.
                <img className="object-contain hover:object-scale-down" />
                <img className="object-cover h-48 w-96 ..." />
            </div>
            <div className="static ...">
                <div className="static ...">
                    <p>Static child</p>
                </div>
                <div className="static ...">
                    <p>Static child</p>
                </div>
                <div className="static ...">
                    <p>Static child</p>
                </div>
                <div className="inline-block ...">
                    <p>Static sibling</p>
                </div>
                <div className="inline-block ...">
                    <p>Static sibling</p>
                </div>
                <div className="inline-block ...">
                    <p>Static sibling</p>
                </div>

                <div className="absolute ...">
                    <p>Absolute child</p>
                </div>
                <div className="absolute ...">
                    <p>Absolute child</p>
                </div>
                <div className="absolute ...">
                    <p>Absolute child</p>
                </div>
                <div className="inline-block ...">
                    <p>Static sibling</p>
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
            <div className="flex flex-row ...">
                <div>01</div>
                <div>02</div>
                <div>03</div>
            </div>
            <div className="flex flex-row ...">
                <div>01</div>
                <div>02</div>
                <div>03</div>
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
            <div className="flex flex-col ...">
                <div>01</div>
                <div>02</div>
                <div>03</div>
            </div>
            <div className="flex flex-col ...">
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
            <div className="flex flex-nowrap">
                Use flex-wrap to allow flex items to wrap:
                <div>01</div>
                <div>02</div>
                <div>03</div>
            </div>
            <div className="flex flex-wrap">
                <div>01</div>
                <div>02</div>
                <div>03</div>
            </div>
            <div className="flex flex-wrap-reverse">
                Use flex-wrap-reverse to wrap flex items in the reverse
                direction:
                <div>01</div>
                <div>02</div>
                <div>03</div>
            </div>
            <div className="flex ...">
                Use grow to allow a flex item to grow to fill any available
                space:
                <div className="flex-none w-14 h-14 ...">01</div>
                <div className="grow h-14 ...">02</div>
                <div className="flex-none w-14 h-14 ...">03</div>
            </div>
            <div className="flex flex-nowrap">
                <div>01</div>
                <div>02</div>
                <div>03</div>
            </div>
            <div className="flex ...">
                Use grow-0 to prevent a flex item from growing:
                <div className="grow h-14 ...">01</div>
                <div className="grow-0 h-14 ...">02</div>
                <div className="grow h-14 ...">03</div>
            </div>
            <div className="flex flex-nowrap">
                no wrap exp
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
                <div>
                    01 Use content-start to pack rows in a container against the
                    start of the cross axis:
                </div>
                <div>02</div>
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
                <div>
                    01 Use content-center to pack rows in a container in the
                    center of the cross axis:
                </div>
                <div>02</div>
                <div>03</div>
                <div>04</div>
                <div>05</div>
            </div>
            <div className="h-56 grid grid-cols-3 gap-4 content-end ...">
                <div>
                    01 Use content-end to pack rows in a container against the
                    end of the cross axis:
                </div>
                <div>02</div>
                <div>03</div>
                <div>04</div>
                <div>05</div>
            </div>
            <div className="h-56 grid grid-cols-3 gap-4 content-between ...">
                <div>01 align-content: space-between;</div>
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
            <div className="h-56 grid grid-cols-3 gap-4 content-around ...">
                <div>01 align-content: space-around;</div>
                <div>02</div>
                <div>03</div>
                <div>04</div>
                <div>05</div>
            </div>
            <div className="h-56 grid grid-cols-3 gap-4 content-evenly ...">
                <div>01 align-content: space-around;</div>
                <div>02</div>
                <div>03</div>
                <div>04</div>
                <div>05</div>
            </div>
            <div className="h-56 grid grid-cols-3 gap-4 content-baseline ...">
                <div>01 align-content: space-around;</div>
                <div>02</div>
                <div>03</div>
                <div>04</div>
                <div>05</div>
            </div>
            <div className="h-56 grid grid-cols-3 gap-4 content-stretch ...">
                <div>01 align-content: space-around;</div>
                <div>02 content-stretch</div>
                <div>03</div>
                <div>04</div>
                <div>05</div>
            </div>
            <div className="grid grid-flow-row auto-rows-max">
                <div>01 auto-rows-max</div>
                <div>02</div>
                <div>03</div>
            </div>
            <div className="h-56 grid grid-cols-3 gap-4 content-around ...">
                <div>01 content-around</div>
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
            <div className="h-56 grid grid-cols-3 gap-4 content-stretch ...">
                Use the grid-cols-{n} utilities to create grids with n equally
                sized columns.
                <div>01</div>
                <div>02</div>
                <div>03</div>
                <div>04</div>
                <div>05</div>
            </div>
            <div className="grid grid-cols-1 hover:grid-cols-6">
                HOver.. Tailwind lets you conditionally apply utility classes in
                different states using variant modifiers. For example, use
                hover:grid-cols-6 to only apply the grid-cols-6 utility on
                hover.
            </div>
            <div className="grid grid-cols-3 gap-4">
                Use the col-span-{n} utilities to make an element span n
                columns.
                <div className="...">01</div>
                <div className="...">02</div>
                <div className="...">03</div>
                <div className="col-span-2 ...">04</div>
                <div className="...">05</div>
                <div className="...">06</div>
                <div className="col-span-2 ...">07</div>
            </div>
            <div className="grid grid-rows-4 grid-flow-col gap-4">
                <div>01</div>
                Use the grid-rows-{n} utilities to create grids with n equally
                sized rows.
                <div>09</div>
            </div>
            <div className="grid grid-rows-2 hover:grid-rows-6"></div>
            <div className="grid grid-cols-6 gap-4">
                Use the col-start-{n} and col-end-{n} utilities to make an
                element start or end at the nth grid line. These can also be
                combined with the col-span-{n} utilities to span a specific
                number of columns.
                <div className="col-start-2 col-span-4 ...">01</div>
                <div className="col-start-1 col-end-3 ...">02</div>
                <div className="col-end-7 col-span-2 ...">03</div>
                <div className="col-start-1 col-end-7 ...">04</div>
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
            <div className="grid grid-flow-col auto-cols-max">
                <div>01</div>
                <div>02</div>
                <div>03</div>
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
            <div className="flex items-stretch ...">
                <div className="py-4">01</div>
                <div className="py-12">02</div>
                <div className="py-8">03</div>
            </div>
            <div className="flex items-stretch ...">
                <div className="py-4">01</div>
                <div className="py-12">02</div>
                <div className="py-8">03</div>
            </div>
            <div className="flex items-stretch ...">
                Use items-stretch to stretch items to fill the container’s cross
                axis:
                <div className="py-4">01</div>
                <div className="py-12">02</div>
                <div className="py-8">03</div>
            </div>
            <div className="flex items-start ...">
                Use items-start to align items to the start of the container’s
                cross axis:
                <div className="py-4">01</div>
                <div className="py-12">02</div>
                <div className="py-8">03</div>
            </div>
            <div className="flex items-start ...">
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
            <div className="flex items-center ...">
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
                Use items-end to align items to the end of the container’s cross
                axis:
                <div className="py-4">01</div>
                <div className="py-12">02</div>
                <div className="py-8">03</div>
            </div>
            <div className="flex items-baseline ...">
                Use items-baseline to align items along the container’s cross
                axis such that all of their baselines align:
                <div className="pt-2 pb-6">01</div>
                <div className="pt-8 pb-12">02</div>
                <div className="pt-12 pb-4">03</div>
            </div>
            <div className="flex justify-between ...">
                <div className="order-last">01</div>
                <div>02</div>
                <div>03</div>
            </div>
            <div className="flex justify-between ...">
                <div className="order-last">
                    01Use justify-between to justify items along the container’s
                    main axis such that there is an equal amount of space
                    between each item:
                </div>
                <div>02</div>
                <div>03</div>
            </div>
            <div className="flex justify-between ...">
                <div>01</div>
                <div>02</div>
                <div>03</div>
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
            <div className="flex items-baseline ...">
                <div className="pt-2 pb-6">01</div>
                <div className="pt-8 pb-12">02</div>
                <div className="pt-12 pb-4">03</div>
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
            <div className="grid grid-cols-2 gap-4 place-content-center h-48 ...">
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
            <div className="grid grid-cols-2 gap-4 place-content-start h-48 ...">
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
            <div className="flex flex-row-reverse ...">
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
            <div className="grid grid-cols-2 gap-4 place-content-stretch h-48 ...">
                <div>01</div>
                <div>02</div>
                <div>03</div>
                <div>04</div>
            </div>

            <div className="grid grid-cols-3 gap-4 place-items-start ...">
                <div>
                    01 Use place-items-start to place grid items on the start of
                    their grid areas on both axes:
                </div>
                <div>02</div>
                <div>03</div>
                <div>04</div>
                <div>05</div>
                <div>06</div>
            </div>
            <div className="grid grid-cols-3 gap-4 place-items-end h-56 ...">
                <div>
                    01 Use place-items-end to place grid items on the end of
                    their grid areas on both axes:
                </div>
                <div>02</div>
                <div>03</div>
                <div>04</div>
                <div>05</div>
                <div>06</div>
            </div>
            <div className="grid grid-cols-3 gap-4 place-items-center h-56 ...">
                <div>
                    01 Use place-items-center to place grid items on the center
                    of their grid areas on both axes:
                </div>
                <div>02</div>
                <div>03</div>
                <div>04</div>
                <div>05</div>
                <div>06</div>
            </div>
            <div className="grid grid-cols-3 gap-4 place-items-stretch h-56 ...">
                <div>
                    01 Use place-items-stretch to stretch items along their grid
                    areas on both axes:
                </div>
                <div>02</div>
                <div>03</div>
                <div>04</div>
                <div>05</div>
                <div>06</div>
            </div>
            <p className="text-left ...">
                So I started to walk into the water... Control the text
                alignment of an element using the
            </p>
            <p className="text-left ...">
                So I started to walk into the water...
            </p>
            <p className="text-left ...">
                So I started to walk into the water...
            </p>
            <p className="text-center ...">
                So I started to walk into the water...
            </p>
            <p className="text-center ...">
                So I started to walk into the water...
            </p>
            <p className="text-right ...">
                So I started to walk into the water...
            </p>
            <p className="text-justify ...">
                So I started to walk into the water...
            </p>
            <p className="text-justify ...">
                So I started to walk into the water...
            </p>
            <p className="text-sm ...">The quick brown fox ...</p>
            <p className="font-mono ...">The quick brown fox ...</p>
            <p className="font-sans ...">The quick brown fox ...</p>
            <p className="font-serif ...">The quick brown fox ...</p>
            <p className="text-base ...">The quick brown fox ...</p>
            <p className="text-lg ...">The quick brown fox ...</p>
            <p className="text-xl ...">The quick brown fox ...</p>
            <p className="text-2xl ...">The quick brown fox ...</p>
            <p className="text-sm ...">The quick brown fox ...</p>
            <p className="text-base/6 ...">
                So I started to walk into the water...
            </p>
            <p className="font-mono ...">The quick brown fox ...</p>
            <p className="font-sans ...">The quick brown fox ...</p>
            <p className="font-serif ...">The quick brown fox ...</p>
            <p className="text-base ...">The quick brown fox ...</p>
            <p className="text-lg ...">The quick brown fox ...</p>
            <p className="text-xl ...">The quick brown fox ...</p>
            <p className="text-2xl ...">The quick brown fox ...</p>
            <p className="text-base/7 ...">
                So I started to walk into the water...
            </p>
            <p className="text-base/loose ...">
                So I started to walk into the water...
            </p>
            <p className="not-italic ...">The quick brown fox ...</p>
            <p className="not-italic ...">The quick brown fox ...</p>
            <p className="text-sm/[17px] ..."></p>
            <p className="subpixel-antialiased ...">The quick brown fox ...</p>
            <p className="antialiased ...">The quick brown fox ...</p>
            <p className="italic ...">The quick brown fox ...</p>
            <p className="font-light ...">The quick brown fox ...</p>
            <p className="font-light ...">The quick brown fox ...</p>
            <p className="font-normal ...">The quick brown fox ...</p>
            <p className="font-normal ...">The quick brown fox ...</p>
            <p className="font-medium ...">The quick brown fox ...</p>
            <p className="font-semibold ...">The quick brown fox ...</p>
            <p className="font-bold ...">The quick brown fox ...</p>
            <p className="ordinal slashed-zero tabular-nums ...">1234567890</p>
            <p className="ordinal ...">1st</p>
            <p className="slashed-zero ...">0</p>
            <p className="lining-nums ...">1234567890</p>
            <p className="lining-nums ...">1234567890</p>
            <p className="oldstyle-nums ...">1234567890</p>
            <p className="proportional-nums ...">12121</p>
            <p className="tabular-nums ...">12121</p>
            <p className="diagonal-fractions ...">1/2 3/4 5/6</p>
            <p className="stacked-fractions ...">1/2 3/4 5/6</p>
            <p className="slashed-zero tabular-nums md:normal-nums ...">
                12345
            </p>
            <p className="tracking-normal ...">
                The quick brown fox ... Control the letter spacing of an element
                using the tracking-{size} utilities. letter-spacing: 0em;
            </p>
            <p className="tracking-tight ...">
                The quick brown fox ... letter-spacing: -0.025em;
            </p>
            <p className="tracking-wide ...">
                The quick brown fox ... letter-spacing: 0.025em;
            </p>
            <div className="grid grid-cols-3 gap-4 ...">
                <article>
                    <time>Mar 10, 2020</time>
                    <h2>Boost your conversion rate</h2>
                    <p className="line-clamp-3">
                        Nulla dolor velit adipisicing duis excepteur esse in
                        duis nostrud occaecat mollit incididunt deserunt sunt.
                        Ut ut sunt laborum ex occaecat eu tempor labore enim
                        adipisicing minim ad. Est in quis eu dolore occaecat
                        excepteur fugiat dolore nisi aliqua fugiat enim ut
                        cillum. Labore enim duis nostrud eu. Est ut eiusmod
                        consequat irure quis deserunt ex. Enim laboris dolor
                        magna pariatur. Dolor et ad sint voluptate sunt elit
                        mollit officia ad enim sit consectetur enim.
                    </p>
                    <div>
                        <img src="..." />
                        Lindsay Walton
                    </div>
                </article>
                <div className="p-4">
                    <div className="flow-root ...">
                        <div className="my-4 ...">
                            Use flow-root to create a block-level element with
                            its own block formatting context. Well, let me tell
                            you something, ...
                        </div>
                    </div>
                    <div className="flow-root ...">
                        <div className="my-4 ...">
                            Well, let me tell you something, ...
                        </div>
                    </div>
                    <div className="flow-root ...">
                        <div className="my-4 ...">Well, let me tell , ...</div>
                    </div>
                    <div className="flow-root ...">
                        <div className="my-4 ...">
                            Sure, go ahead, laugh if you want...
                        </div>
                    </div>
                </div>
                <div className="flex items-center">
                    <img src="path/to/image.jpg" />
                    <div>
                        <strong>Andrew Alfred</strong>
                        <span>Technical advisor</span>
                    </div>
                </div>
                <div className="flex items-center">
                    <img src="path/to/image.jpg" />
                    <div>
                        <strong>Andrew Alfred 2</strong>
                        <span>Technical advisor</span>
                    </div>
                </div>
                <p>
                    Today I spent most of the day researching ways to ...
                    <span className="inline-flex items-baseline">
                        Use inline-flex to create an inline flex container that
                        flows with text.
                        <img
                            src="path/to/image.jpg"
                            alt=""
                            className="self-center w-5 h-5 rounded-full mx-1"
                        />
                        <span>Kramer</span>
                    </span>
                    keeps telling me there is no way to make it work, that ...
                </p>
                <p>
                    Today I spent most moset of the day researching ways to ...
                    <span className="inline-flex items-baseline">
                        Use items-baseline to align items along the container’s
                        cross axis such that all of their baselines align:
                        <img
                            src="path/to/image.jpg"
                            alt=""
                            className="self-center w-5 h-5 rounded-full mx-1"
                        />
                        <span>Kramer</span>
                    </span>
                    keeps telling me there is no way to make it work, that ...
                </p>
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
                <span className="inline-grid grid-cols-3 gap-4">
                    <span>01</span>
                    <span>02</span>
                    <span>03</span>
                    <span>04</span>
                    <span>05</span>
                    <span>06</span>
                </span>
                <div className="grid gap-4 grid-cols-3 grid-rows-3"></div>
                <div>01</div>
                <div className="place-self-auto ...">02</div>
                <div className="place-self-auto ...">03</div>
                <div>03</div>
                <div>04</div>
                <div>05</div>
                <div>06</div>
            </div>
            <div className="flex ...">
                <div className="flex-1 ...">01</div>
                <div className="contents">
                    <div className="flex-1 ...">02</div>
                    <div className="flex-1 ...">03</div>
                </div>
                <div className="contents">
                    <div className="flex-1 ...">02</div>
                    <div className="flex-1 ...">03</div>
                </div>
                <div className="flex-1 ...">04</div>
            </div>
            <div className="table w-full ...">
                <div className="table-header-group ...">
                    <div className="table-row">
                        <div className="table-cell text-left ...">Song</div>
                        <div className="table-cell text-left ...">Artist</div>
                        <div className="table-cell text-left ...">Year</div>
                    </div>
                </div>
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
                        <div className="table-cell ...">
                            The Sliding Mr. Bones (Next Stop, Pottersville)
                        </div>
                        <div className="table-cell ...">Malcolm Lockyer</div>
                        <div className="table-cell ...">1961</div>
                    </div>
                    <div className="table-row">
                        <div className="table-cell ...">
                            The Sliding Mr. Bones (Next Stop, Pottersville)
                        </div>
                        <div className="table-cell ...">Malcolm Lockyer</div>
                        <div className="table-cell ...">1961</div>
                    </div>
                    <div className="table-row">
                        <div className="table-cell ...">
                            The Sliding Mr. Bones (Next Stop, Pottersville)
                        </div>
                        <div className="table-cell ...">Malcolm Lockyer</div>
                        <div className="table-cell ...">1961</div>
                    </div>
                    <p className="underline ...">The quick brown fox ...</p>
                    <p className="overline ...">The quick brown fox ...</p>
                    <p className="line-through ...">The quick brown fox ...</p>
                    <p className="no-underline ...">The quick brown fox ...</p>
                    <div className="table-row">
                        <div className="table-cell ...">Witchy Woman</div>
                        <div className="table-cell ...">The Eagles</div>
                        <div className="table-cell ...">1972</div>
                    </div>
                    <div className="w-3/4 ...">
                        Use whitespace-normal to cause text to wrap normally
                        within an element. Newlines and spaces will be
                        collapsed.
                        <div className="whitespace-normal ...">
                            Hey everyone! It's almost 2022 and we still don't
                            know if there is aliens living among us, or do we?
                            Maybe the person writing this is an alien. You will
                            never know.
                        </div>
                    </div>
                    <div className="whitespace-normal md:whitespace-pre">
                        hover whitespace-normal
                    </div>
                    <div className="w-3/4 overflow-x-auto ...">
                        Use whitespace-pre to preserve newlines and spaces
                        within an element. Text will not be wrapped. check
                        <div className="whitespace-pre ...">
                            Hey everyone! It's almost 2022 and we still don't
                            know if there is aliens living among us, or do we?
                            Maybe the person writing this is an alien. You will
                            never know.
                        </div>
                    </div>
                    <div className="w-3/4 overflow-x-auto ...">
                        Use whitespace-nowrap to prevent text from wrapping
                        within an element. Newlines and spaces will be
                        collapsed.
                        <div className="whitespace-nowrap ...">
                            Hey everyone! It's almost 2022 and we still don't
                            know if there is aliens living among us, or do we?
                            Maybe the person writing this is an alien. You will
                            never know.
                        </div>
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
            <div className="w-96 ..."></div>
            <div className="w-80 ..."></div>
            <div className="w-64 ..."></div>
            <div className="w-48 ..."></div>
            <div className="w-40 ..."></div>
            <div className="w-32 ..."></div>
            <div className="w-24 ..."></div>
            <div className="flex ...">
                <div className="w-1/2 ... ">w-1/2</div>
                <div className="w-1/2 ... ">w-1/2</div>
            </div>
            <div className="flex ...">
                <div className="w-2/5 ...">w-2/5</div>
                <div className="w-3/5 ...">w-3/5</div>
            </div>
            <div className="flex ...">
                <div className="w-1/3 ...">w-1/3</div>
                <div className="w-2/3 ...">w-2/3</div>
            </div>
            <p className="tracking-normal ...">The quick brown fox ...</p>
            <p className="tracking-normal ...">The quick brown fox ...</p>
            <p className="tracking-normal ...">The quick brown fox ...</p>
            <p className="tracking-wide ...">The quick brown fox ...</p>
            <p className="tracking-wide ...">The quick brown fox ...</p>
            <article>
                <time>Mar 10, 2020</time>
                <h2>Boost your conversion rate</h2>
                <p className="line-clamp-3">
                    Nulla dolor velit adipisicing duis excepteur esse in duis
                    nostrud occaecat mollit incididunt deserunt sunt. Ut ut sunt
                    laborum ex occaecat eu tempor labore enim adipisicing minim
                    ad. Est in quis eu dolore occaecat excepteur fugiat dolore
                    nisi aliqua fugiat enim ut cillum. Labore enim duis nostrud
                    eu. Est ut eiusmod consequat irure quis deserunt ex. Enim
                    laboris dolor magna pariatur. Dolor et ad sint voluptate
                    sunt elit mollit officia ad enim sit consectetur enim.
                </p>
                <p className="line-clamp-3">
                    Nulla dolor velit adipisicing duis fdsfgdsfsdf excepteur
                    esse in duis nostrud occaecat mollit incididunt deserunt
                    sunt. Ut ut sunt laborum ex occaecat eu tempor labore enim
                    adipisicing minim ad. Est in quis eu dolore occaecat
                    excepteur fugiat dolore nisi aliqua fugiat enim ut cillum.
                    Labore enim duis nostrud eu. Est ut eiusmod consequat irure
                    quis deserunt ex. Enim laboris dolor magna pariatur. Dolor
                    et ad sint voluptate sunt elit mollit officia ad enim sit
                    consectetur enim.
                </p>
                <div>
                    <img src="..." />
                    Lindsay Walton
                </div>
            </article>
            <p className="font-light ...">The quick brown fox ...</p>
            <p className="font-light ...">The quick brown fox sdfdsf ...</p>
            <p className="font-light ...">The quick brown fox sdfdsf ...</p>
            <p className="font-normal ...">The quick brown fox ...</p>
            <p className="font-normal ...">The quick brown fox ...</p>
            <p className="font-medium ...">The quick brown fox ...</p>
            <p className="font-medium ...">The quick brown fox ...</p>
            <p className="font-semibold ...">The quick brown fox ...</p>
            <p className="font-semibold ...">The quick brown fox ...</p>
            <p className="font-bold ...">The quick brown fox ...</p>
            <p className="font-bold ...">The quick brown fox ...</p>
            <p className="text-sm ...">The quick brown fox ...</p>
            <p className="text-sm ...">The quick brown fox ...</p>
            <p className="text-base ...">The quick brown fox ...</p>
            <p className="text-base ...">The quick brown fox ...</p>
            <p className="text-lg ...">The quick brown fox ...</p>
            <p className="text-lg ...">The quick brown fox ...</p>
            <p className="text-xl ...">The quick brown fox ...</p>
            <p className="text-xl ...">The quick brown fox ...</p>
            <p className="text-2xl ...">The quick brown fox ...</p>
            <p className="text-2xl ...">The quick brown fox ...</p>
            <div className="flex flex-row">
                <div className="basis-1/4">01</div>
                <div className="basis-1/4">02</div>
                <div className="basis-1/2">03</div>
                <div className="basis-1">04</div>
                <div className="basis-2">05</div>
                <div className="basis-3">06</div>
                <div className="basis-4">07</div>
                <div className="basis-44">08</div>
                <div className="basis-48">09</div>
                <div className="basis-1.5">10</div>
                <div className="basis-2.5">11</div>
                <div className="basis-1/2">12</div>
                <div className="basis-11/12">13</div>
            </div>
            <div className="flex flex-row ...">
                <div>01</div>
                <div>02</div>
                <div>03</div>
            </div>
            <div className="flex flex-row ...">
                <div className="flex text-red-500">01</div>
                <div className="flex text-red-500 flex-col">02</div>
                <div className="flex text-green-500">03</div>
                <div className="flex-row-reverse text-green-500">04</div>
                <div className="flex-col-reverse text-green-500">05</div>
                <div className="flex flex-nowrap text-green-500">05</div>
            </div>
            <div className="flex flex-row-reverse ...">
                <div>01</div>
                <div>02</div>
                <div>03</div>
            </div>
            <div className="flex flex-col ...">
                <div>01</div>
                <div>02</div>
                <div>03</div>
            </div>
            <div className="flex flex-col-reverse ...">
                <div>01</div>
                <div>02</div>
                <div>03</div>
            </div>
            <div className="flex flex-nowrap">
                <div>01</div>
                <div>02</div>
                <div>03</div>
            </div>
            <div className="flex flex-wrap">
                <div>01</div>
                <div>02</div>
                <div>03</div>
            </div>
            <div className="flex flex-wrap">
                <div>01</div>
                <div>02</div>
                <div>03</div>
            </div>
            <div className="flex flex-wrap-reverse">
                <div>01</div>
                <div>02</div>
                <div>03</div>
            </div>
            <div className="columns-2">
                <p>Well, let me tell you something, ...</p>
                <p className="break-after-column">Sure, go ahead, laugh...</p>
                <p>Maybe we can live without...</p>
                <p>Look. If you think this is...</p>
            </div>
            <div className="columns-2">
                <p>Well, let me tell you something, ...</p>
                <p className="break-after-auto">Sure, go ahead, laugh...</p>
                <p>Maybe we can live without...</p>
                <p>Look. If you think this is...</p>
            </div>
            <div className="columns-2">
                <p>Well, let me tell you something, ...</p>
                <p className="break-after-avoid">Sure, go ahead, laugh...</p>
                <p className="break-after-avoid">Sure, go ahead, laugh...</p>
                <p>Maybe we can live without...</p>
                <p>Look. If you think this is...</p>
            </div>
            <div className="columns-2">
                <p>Well, let me tell you something, ...</p>
                <p className="break-after-all">Sure, go ahead, laugh...</p>
                <p>Maybe we can live without...</p>
                <p>Look. If you think this is...</p>
            </div>
            <div className="columns-2">
                <p>Well, let me tell you something, ...</p>
                <p className="break-after-avoid-page">
                    Sure, go ahead, laugh...
                </p>
                <p>Maybe we can live without...</p>
                <p>Look. If you think this is...</p>
            </div>
            <div className="columns-2">
                <p>Well, let me tell you something, ...</p>
                <p className="break-after-page">Sure, go ahead, laugh...</p>
                <p>Maybe we can live without...</p>
                <p>Look. If you think this is...</p>
            </div>
            <div className="columns-2">
                <p>Well, let me tell you something, ...</p>
                <p className="break-after-left">Sure, go ahead, laugh...</p>
                <p>Maybe we can live without...</p>
                <p>Look. If you think this is...</p>
            </div>
            <div className="columns-2">
                <p>Well, let me tell you something, ...</p>
                <p className="break-after-right">Sure, go ahead, laugh...</p>
                <p>Maybe we can live without...</p>
                <p>Look. If you think this is...</p>
            </div>
            <div className="columns-2">
                <p>Well, let me tell you something, ...</p>
                <p className="break-after-column">Sure, go ahead, laugh...</p>
                <p>Maybe we can live without...</p>
                <p>Look. If you think this is...</p>
            </div>
            <div className="box-border h-32 w-32 p-4 border-4 ...">
                BOX BORDER
            </div>
            <div className="box-content h-32 w-32 p-4 border-4 ...">
                BOX CONTENT
            </div>
            <div className="isolate ...">isolate</div>
            <div className="isolate ...">isolate</div>
            <div className="flex ...">
                <div className="flex-none w-14 h-14 ...">01</div>
                <div className="grow h-14 ...">02</div>
                <div className="flex-none w-14 h-14 ...">03</div>
            </div>
            <div className="flex ...">
                <div className="flex-none w-14 h-14 ...">01</div>
                <div className="grow h-14 ...">02</div>
                <div className="flex-none w-14 h-14 ...">03</div>
            </div>
            <div className="flex">
                <div className="flex-none w-14 h-14">01</div>
                <div className="flex-initial w-64 ...">02</div>
                <div className="flex-initial w-32 ...">03</div>
            </div>
            <div className="flex">
                <div className="flex-none w-14 h-14">01</div>
                <div className="flex-initial w-64 ...">02</div>
                <div className="flex-initial w-32 ...">03</div>
            </div>
            <div className="flex ...">
                <div className="grow h-14 ...">01</div>
                <div className="grow-0 h-14 ...">02</div>
                <div className="grow h-14 ...">03</div>
            </div>
            <div className="flex">
                <div className="flex-none ...">01</div>
                <div className="flex-1 w-64 ...">02</div>
                <div className="flex-1 w-32 ...">03</div>
            </div>
            <div className="flex ...">
                <div className="flex-none ...">01</div>
                <div className="flex-auto w-64 ...">02</div>
                <div className="flex-auto w-32 ...">03</div>
            </div>
            <p className="text-base/6 ...">
                So I started to walk into the water...
            </p>
            <p className="text-base/6 ...">
                So I started to walk into the water...
            </p>
            <p className="text-base/7 ...">
                So I started to walk into the water...
            </p>
            <p className="text-base/loose ...">
                So I started to walk into the water...
            </p>
            <p className="text-left ...">
                So I started to walk into the water...
            </p>
            <p className="text-left ...">
                So I started to walk into the water...
            </p>
            <p className="text-center ...">
                So I started to walk into the water...
            </p>
            <p className="text-center ...">
                So I started to walk into the water...
            </p>
            <p className="text-right ...">
                So I started to walk into the water...
            </p>
            <div className="flex ...">
                <div className="w-1/4 ...">w-1/4</div>
                <div className="w-3/4 ...">w-3/4</div>
            </div>
            <p className="text-justify ...">
                So I started to walk into the water...
            </p>
            <p className="text-justify ...">
                So I started to walk into the water...
            </p>
            <div className="bg-auto bg-no-repeat bg-center ..."></div>
            <div className="bg-auto bg-no-repeat bg-center ..."></div>
            <div className="bg-cover bg-center ..."></div>
            <div className="bg-cover bg-center ..."></div>
            <p className="underline ...">The quick brown fox ...</p>
            <div className="flex ...">
                <div className="w-1/5 ...">w-1/5</div>
                <div className="w-4/5 ...">w-4/5</div>
            </div>
            <div className="bg-contain bg-center ..."></div>
            <div className="h-14 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
            <div className="h-14 bg-gradient-to-t from-sky-500 to-indigo-500"></div>
            <div className="h-14 bg-gradient-to-b from-violet-500 to-fuchsia-500"></div>
            <div className="h-14 bg-gradient-to-l from-purple-500 to-pink-500"></div>
            <div className="h-14 bg-gradient-to-tr from-cyan-500 to-blue-500"></div>
            <div className="h-14 bg-gradient-to-tl from-sky-500 to-indigo-500"></div>
            <div className="h-14 bg-gradient-to-bl from-violet-500 to-fuchsia-500"></div>
            <div className="h-14 bg-gradient-to-br from-purple-500 to-pink-500"></div>
            <div className="bg-gradient-to-r from-indigo-500 ..."></div>
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 ..."></div>
            <div className="border-solid border-2 border-sky-500 ..."></div>
            <div className="border-solid border-2 border-sky-500 ..."></div>
            <div className="border-dashed border-2 border-sky-500 ..."></div>
            <div className="border-dashed border-2 border-sky-500 ..."></div>
            <div className="border-dotted border-2 border-sky-500 ..."></div>
            <div className="border-double border-4 border-sky-500 ..."></div>
            <div className="grid grid-cols-3 divide-x">
                <div>01</div>
                <div>02</div>
                <div>03</div>
            </div>
            <div className="grid grid-cols-3 divide-x">
                <div className="divide-x">01</div>
                <div>02</div>
                <div>03</div>
            </div>
            <div className="grid grid-cols-1 divide-y">
                <div className="divide-y">01</div>
                <div className="grid-cols-1">02</div>
                <div>03</div>
            </div>
            <div className="flex flex-col-reverse divide-y divide-y-reverse">
                <div className="flex">01</div>
                <div className="flex-col-reverse">02</div>
                <div>03</div>
            </div>
            <div className="divide-y divide-blue-200">
                <div className="devide-blue-500">01</div>
                <div>02</div>
                <div>03</div>
            </div>
            <div className="divide-y-4 divide-slate-400/25 ...">
                <div>01</div>
                <div>02</div>
                <div>03</div>
            </div>
            <div className="divide-y-4 divide-slate-400/25 ...">
                <div>01</div>
                <div>02</div>
                <div>03</div>
            </div>
            <div className="divide-y divide-dashed">
                <div className="divide-dashed">01</div>
                <div className="line-clamp-3">02</div>
                <div className="checkout">03</div>
            </div>
            <article>
                <time>Mar 10, 2020</time>
                <h2>Boost your conversion rate</h2>
                <p className="line-clamp-3">
                    Nulla dolor velit adipisicing duis excepteur esse in duis
                    nostrud occaecat mollit incididunt deserunt sunt. Ut ut sunt
                    laborum ex occaecat eu tempor labore enim adipisicing minim
                    ad. Est in quis eu dolore occaecat excepteur fugiat dolore
                    nisi aliqua fugiat enim ut cillum. Labore enim duis nostrud
                    eu. Est ut eiusmod consequat irure quis deserunt ex. Enim
                    laboris dolor magna pariatur. Dolor et ad sint voluptate
                    sunt elit mollit officia ad enim sit consectetur enim.
                </p>
                <div>
                    <img src="..." />
                    Lindsay Walton
                </div>
            </article>
            <p className="leading-normal ...">
                So I started to walk into the water...
            </p>
            <p className="leading-normal ...">
                So I started to walk into the water...
            </p>
            <p className="leading-relaxed ...">
                So I started to walk into the water...
            </p>
            <p className="leading-relaxed ...">
                So I started to walk into the water...
            </p>
            <p className="leading-loose ...">
                So I started to walk into the water...
            </p>
            <p className="leading-loose ...">
                So I started to walk into the water...
            </p>
            <p className="underline decoration-1 ...">The quick brown fox...</p>
            <p className="underline decoration-1 ...">The quick brown fox...</p>
            <p className="leading-6 ...">
                So I started to walk into the water...
            </p>
            <p className="leading-6 ...">
                So I started to walk into the water...
            </p>
            <p className="indent-8">
                So I started to walk into the water. I won't lie to you boys, I
                was terrified. But I pressed on, and as I made my way past the
                breakers a strange calm came over me. I don't know if it was
                divine intervention or the kinship of all living things but I
                tell you Jerry at that moment, I <em>was</em> a marine
                biologist.
            </p>
            <span className="inline-block align-baseline ...">
                Align BaseLine
            </span>
            <span className="inline-block align-top ...">Align TOp</span>
            <span className="inline-block align-middle ...">Align Middle</span>
            <span className="inline-block align-bottom ...">Align Bottom</span>
            <span className="inline-block align-text-top ...">
                Align Text Top
            </span>
            <span className="inline-block align-text-bottom ...">...</span>
            <p className="break-normal ...">...</p>
            <p className="break-words ...">...</p>
            <p className="break-all ...">...</p>
            <p className="break-keep ...">...</p>
            <p className="hyphens-none ...">
                ... Kraftfahrzeug&shy;haftpflichtversicherung is a ...
            </p>
            <p className="hyphens-none ...">
                ... Kraftfahrzeug&shy;haftpflichtversicherung is a ...
            </p>
            <p className="hyphens-manual ...">
                ... Kraftfahrzeug&shy;haftpflichtversicherung is a ...
            </p>
            <p className="hyphens-manual ...">
                ... Kraftfahrzeug&shy;haftpflichtversicherung is a ...
            </p>
            <p className="hyphens-auto ..." lang="de">
                ... Kraftfahrzeughaftpflichtversicherung is a ...
            </p>
            <div className="rounded ...">Rounded</div>
            <div className="rounded ...">Rounded</div>
            <div className="rounded-md ...">Rounded-md</div>
            <div className="rounded-lg ...">rounded-lg</div>
            <div className="rounded-full ...">rounded-full</div>
            <div className="bg-fixed ...">bg-fixed</div>
            <div className="bg-fixed ...">bg-fixed</div>
            <div className="bg-local ...">bg-local</div>
            <div className="rounded-tl-lg ...">rounded-tl-lg</div>
            <div className="rounded-tr-lg ...">rounded-tr-lg</div>
            <div className="rounded-br-lg ...">rounded-br-lg</div>
            <div className="rounded-bl-lg ...">rounded-bl-lg</div>
            <div className="rounded-bl-lg ...">rounded-bl-lg</div>
            <div className="columns-2">
                <p>Well, let me tell you something, ...</p>
                <p className="break-after-column">Sure, go ahead, laugh...</p>
                <p>Maybe we can live without...</p>
                <p>Look. If you think this is...</p>
            </div>
            <div className="columns-2">
                <p>Well, let me tell you something, ...</p>
                <p className="break-before-avoid-page">
                    Sure, go ahead, laugh...
                </p>
                <p>Maybe we can live without...</p>
                <p>Look. If you think this is...</p>
            </div>
            <div className="columns-2">
                <p>Well, let me tell you something, ...</p>
                <p className="break-before-column">Sure, go ahead, laugh...</p>
                <p>Maybe we can live without...</p>
                <p>Look. If you think this is...</p>
            </div>
            <div className="columns-2">
                <p>Well, let me tell you something, ...</p>
                <p className="break-inside-avoid-column">
                    Sure, go ahead, laugh...
                </p>
                <p>Maybe we can live without...</p>
                <p>Look. If you think this is...</p>
            </div>
            <div className="columns-2">
                <p>Well, let me tell you something, ...</p>
                <p className="break-inside-auto">Sure, go ahead, laugh...</p>
                <p>Maybe we can live without...</p>
                <p>Look. If you think this is...</p>
            </div>
            <div className="columns-2">
                <p>Well, let me tell you something, ...</p>
                <p className="break-inside-avoid">Sure, go ahead, laugh...</p>
                <p>Maybe we can live without...</p>
                <p>Look. If you think this is...</p>
            </div>
            <span className="box-decoration-slice bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-2 ...">
                Hello
                <br />
                World
            </span>
            <span className="box-decoration-slice bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-2 ...">
                Hello
                <br />
                World
            </span>
            <div className="box-border h-32 w-32 p-4 border-4 ...">
                BOX BORDER
            </div>
            <div className="box-content h-32 w-32 p-4 border-4 ...">
                BOX CONTENT
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
            <img className="float-right ..." src="path/to/image.jpg" />
            <img className="float-right ..." src="path/to/image.jpg" />
            <p>
                Maybe we can live without libraries, people like you and me. ...
            </p>
            <img className="float-left ..." src="path/to/image.jpg" />
            <p>
                Maybe we can live without libraries, people like you and me. ...
            </p>
            <img className="float-left ..." src="path/to/image.jpg" />
            <img className="float-right ..." src="path/to/image.jpg" />
            <p className="clear-left ...">
                Maybe we can live without libraries... clear-left
            </p>
            <p className="clear-right ...">
                Maybe we can live without libraries... clear-right
            </p>
            <p className="clear-right ...">
                Maybe we can live without libraries... clear-right
            </p>
            <p className="clear-both ...">
                Maybe we can live without libraries... clear-both
            </p>
            <p className="clear-none ...">
                Maybe we can live without libraries...clear-none
            </p>
            <p className="clear-none ...">
                Maybe we can live without libraries...clear-none
            </p>
            <img className="float-none ..." src="path/to/image.jpg" />
            <p>
                Maybe we can live without libraries, people like you and me. ...
            </p>
            <div className="bg-indigo-300 ...">
                <img className="object-cover h-48 w-96 ..." />
            </div>
            <div className="bg-indigo-300 ...">
                <img className="object-contain h-48 w-96 ..." />
            </div>
            <div className="columns-3 ...">
                columns-3
                <img className="w-full aspect-video ..." src="..." />
                <img className="w-full aspect-square ..." src="..." />
            </div>
            <div className="columns-2 ...">
                <img className="w-full aspect-video ..." src="..." />
                <img className="w-full aspect-square ..." src="..." />
            </div>
            <div className="columns-2 ...">
                <img className="w-full aspect-video ..." src="..." />
                <img className="w-full aspect-square ..." src="..." />
            </div>
            <div className="columns-2 ...">
                <img className="w-full aspect-video ..." src="..." />
                <img className="w-full aspect-square ..." src="..." />
            </div>
            <div className="columns-2 ...">
                Print image
                <img className="w-full aspect-video ..." src="..." />
                <img className="w-full aspect-square ..." src="..." />
            </div>
            <div className="columns-1 ...">
                <img className="w-full aspect-video ..." src="..." />
                <img className="w-full aspect-square ..." src="..." />
            </div>
            <div className="columns-4 ...">
                <img className="w-full aspect-video ..." src="..." />
                <img className="w-full aspect-square ..." src="..." />
            </div>
            <div className="columns-4 ...">
                <img className="w-full aspect-video ..." src="..." />
                <img className="w-full aspect-square ..." src="..." />
            </div>
            <div className="columns-5 ...">
                <img className="w-full aspect-video ..." src="..." />
                <img className="w-full aspect-square ..." src="..." />
            </div>
            <div className="columns-6 ...">
                <img className="w-full aspect-video ..." src="..." />
                <img className="w-full aspect-square ..." src="..." />
            </div>
            <div className="columns-auto ...">
                columns-auto
                <img className="w-full aspect-video ..." src="..." />
                <img className="w-full aspect-square ..." src="..." />
            </div>
            <div className="columns-2xs ...">
                columns-2xs
                <img className="w-full aspect-video ..." src="..." />
                <img className="w-full aspect-square ..." src="..." />
            </div>
            <div className="columns-xs ...">
                <img className="w-full aspect-video ..." src="..." />
                <img className="w-full aspect-square ..." src="..." />
            </div>
            <div className="columns-sm ...">
                <img className="w-full aspect-video ..." src="..." />
                <img className="w-full aspect-square ..." src="..." />
            </div>
            <div className="columns-md ...">
                <img className="w-full aspect-video ..." src="..." />
                <img className="w-full aspect-square ..." src="..." />
            </div>
            <div className="columns-lg ...">
                <img className="w-full aspect-video ..." src="..." />
                <img className="w-full aspect-square ..." src="..." />
            </div>
            <div>
                When controlling the flow of text, using the CSS property
                <span className="inline">display: inline</span>
                will cause the text inside the element to wrap normally. While
                using the property{' '}
                <span className="inline-block">display: inline-block</span>
                will wrap the element to prevent the text inside from extending
                beyond its parent. Lastly, using the property{' '}
                <span className="table-footer-group">display: block</span>
                will put the element on its own line and fill its parent.
            </div>
            <div className="bg-indigo-300 ...">
                <img className="object-fill h-48 w-96 ..." />
            </div>
            <div className="bg-indigo-300 ...">
                <img className="object-none h-48 w-96 ..." />
            </div>
            <div className="bg-indigo-300 ...">
                <img className="object-scale-down h-48 w-96 ..." />
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
            <span className="box-decoration-clone bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-2 ...">
                Hello
                <br />
                World
            </span>
            <div className="columns-2">
                <p>Well, let me tell you something, ...</p>
                <p className="break-inside-avoid-page">
                    Sure, go ahead, laugh...
                </p>
                <p>Maybe we can live without...</p>
                <p>Look. If you think this is...</p>
            </div>
            <div className="ltr">
                <div className="rounded-s-lg ..."></div>
            </div>
            <div className="rtl">
                <div className="rounded-s-lg ..."></div>
            </div>
            <button className="rounded-full ...">Save Changes</button>
            <button className="rounded-full ...">Save Changes</button>
            <button className="rounded-none ...">Save Changes</button>
            <div className="rounded-t-lg ..."></div>
            <div className="rounded-r-lg ..."></div>
            <div className="rounded-b-lg ..."></div>
            <div className="rounded-l-lg ..."></div>
            <div className="bg-clip-border p-6 bg-violet-600 border-4 border-violet-300 border-dashed"></div>
            <div className="bg-clip-padding p-6 bg-violet-600 border-4 border-violet-300 border-dashed"></div>
            <div className="bg-clip-content p-6 bg-violet-600 border-4 border-violet-300 border-dashed"></div>
            <div className="-indent-8">
                -indent-8
                <div className="w-3/4 ...">
                    <div className="whitespace-normal ...">
                        Hey everyone! It's almost 2022 and we still don't know
                        if there is aliens living among us, or do we? Maybe the
                        person writing this is an alien. You will never know.
                    </div>
                </div>
                So I started to walk into the water. I won't lie to...
            </div>
            <p className="text-clip overflow-hidden ...">
                ... text-clip overflow-hidden overflow-hidden
            </p>
            <p className="underline underline-offset-1 ...">
                underline The quick brown fox... underline
            </p>
            <p className="truncate ...">...Truncate</p>
            <p className="underline underline-offset-2 ...">
                The quick brown fox...
            </p>
            <p className="text-ellipsis overflow-hidden ...">
                ... text-ellipsis
            </p>
            <p className="underline underline-offset-4 ...">
                The quick brown fox...
            </p>
            <p className="underline decoration-2 ...">
                The quick brown fox... decoration-2
            </p>
            <p className="underline decoration-4 ...">The quick brown fox...</p>
            <p className="leading-7 ...">
                So I started to walk into the water... leading-7 line-height:
                1.75rem; /* 28px */
            </p>
            <p className="leading-8 ...">
                So I started to walk into the water...
            </p>
            <button className="outline outline-offset-2 outline-1 ...">
                Button A offset-2
            </button>
            <button className="outline outline-offset-2 outline-2 ...">
                Button B
            </button>
            <button className="outline outline-offset-2 outline-4 ...">
                Button C
            </button>
            <button className="outline outline-offset-2 outline-blue-500 ...">
                Button A
            </button>
            <button className="outline outline-offset-2 outline-cyan-500 ...">
                Button B
            </button>
            <button className="outline outline-offset-2 outline-pink-500 ...">
                Button C
            </button>
            <button className="outline-4 outline-pink-400/[.55] ..."></button>
            <button className="outline-2 outline-blue-500/50 ...">
                Save Changes
            </button>
            <button className="outline outline-2  outline-offset-2 ...">
                Button A
            </button>
            <button className="outline-dashed outline-2 outline-offset-2 ...">
                Button B
            </button>
            <button className="outline-dotted outline-2 outline-offset-2 ...">
                Button C
            </button>
            <button className="outline-double outline-3 outline-offset-2 ...">
                Button D
            </button>
            <p className="leading-normal ...">
                So I started to walk into the water...
            </p>
            <p className="leading-relaxed ...">
                So I started to walk into the water...
            </p>
            <button className="outline outline-offset-0 ...">Button A</button>
            <button className="outline outline-offset-2 ...">Button B</button>
            <button className="outline outline-offset-4 ...">Button C</button>
            <p className="leading-loose ...">
                So I started to walk into the water...
            </p>
            <ul className="list-inside ...">
                list-inside
                <li>5 cups chopped Porcini mushrooms</li>
            </ul>
            <ul className="list-outside ...">
                list-outside
                <li>5 cups chopped Porcini mushrooms</li>
            </ul>
            <ul className="list-outside ...">
                list-outside
                <li>5 cups chopped Porcini mushrooms</li>
            </ul>
            <ul className="list-disc">
                list-disc
                <li>
                    Now this is a story all about how, my life got
                    flipped-turned upside down
                </li>
            </ul>
            <ul className="list-disc">
                list-disc
                <li>
                    Now this is a story all about how, my life got
                    flipped-turned upside down
                </li>
            </ul>
            <ul className="list-none">
                list-none
                <li>
                    Now this is a story all about how, my life got
                    flipped-turned upside down
                </li>
            </ul>
            <ul className="list-none">
                list-none
                <li>
                    Now this is a story all about how, my life got
                    flipped-turned upside down
                </li>
            </ul>
            <ol className="list-decimal">
                <li>
                    Now this is a story all about how, my life got
                    flipped-turned upside down
                </li>
            </ol>
            <p className="text-left ...">
                So I started to walk into the water...
            </p>
            <p className="text-center ...">
                So I started to walk into the water...
            </p>
            <p className="text-right ...">
                So I started to walk into the water...
            </p>
            <p className="text-justify ...">
                So I started to walk into the water...
            </p>
            <div className="bg-fixed ..."></div>
            <div className="bg-fixed ..."></div>
            <div className="bg-local ..."></div>
            <div className="bg-local ..."></div>
            <div className="bg-scroll ..."></div>
            <div className="bg-scroll ..."></div>
            <div className="bg-clip-padding p-6 bg-violet-600 border-4 border-violet-300 border-dashed"></div>
            <div className="bg-clip-border p-6 bg-violet-600 border-4 border-violet-300 border-dashed"></div>
            <div className="bg-clip-content p-6 bg-violet-600 border-4 border-violet-300 border-dashed"></div>
            <div className="text-5xl font-extrabold ...">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                    Hello world
                </span>
            </div>
            <div className="bg-no-repeat bg-left-top ..."></div>
            <div className="bg-no-repeat bg-left-top ..."></div>
            <div className="bg-origin-content p-4 border-4 border-dashed ..."></div>
            <div className="bg-origin-padding p-4 border-4 border-dashed ..."></div>
            <div className="bg-origin-border p-4 border-4 border-dashed ..."></div>
            <div className="bg-no-repeat bg-top ..."></div>
            <div className="bg-no-repeat bg-top ..."></div>
            <div className="bg-no-repeat bg-right-top ..."></div>
            <div className="bg-no-repeat bg-right-top ..."></div>
            <div className="bg-no-repeat bg-left ..."></div>
            <div className="bg-no-repeat bg-left ..."></div>
            <div className="bg-no-repeat bg-center ..."></div>
            <div className="bg-no-repeat bg-right ..."></div>
            <div className="bg-no-repeat bg-left-bottom ..."></div>
            <div className="bg-no-repeat bg-bottom ..."></div>
            <div className="bg-no-repeat bg-right-bottom ..."></div>
            <div className="bg-no-repeat bg-center ..."></div>
            <div className="bg-repeat-x bg-center ..."></div>
            <div className="bg-repeat-y bg-center ..."></div>
            <div>
                <p>
                    I’m Derek, an astro-engineer based in Tattooine. I like to
                    build X-Wings at
                    <a className="underline decoration-sky-500">
                        My Company, Inc
                    </a>
                    . Outside of work, I like to{' '}
                    <a className="underline decoration-pink-500">
                        watch pod-racing
                    </a>{' '}
                    and have{' '}
                    <a className="underline decoration-indigo-500">
                        light-saber
                    </a>{' '}
                    fights.
                </p>
            </div>
            <p className="no-underline ...">The quick brown fox ...</p>
            <p className="no-underline ...">The quick brown fox ...</p>
            <p className="line-through ...">The quick brown fox ...</p>
            <p className="line-through ...">The quick brown fox ...</p>
            <p className="overline ...">The quick brown fox ...</p>
            <p className="overline ...">The quick brown fox ...</p>
            <p className="tracking-tight ...">The quick brown fox ...</p>
            <p className="tracking-tight ...">The quick brown fox ...</p>
            <p className="stacked-fractions ...">1/2 3/4 5/6</p>
            <p className="stacked-fractions ...">1/2 3/4 5/6</p>
            <p className="diagonal-fractions ...">1/2 3/4 5/6</p>
            <p className="diagonal-fractions ...">1/2 3/4 5/6</p>
            <p className="proportional-nums ...">12121</p>
            <p className="proportional-nums ...">90909</p>
            <p className="tabular-nums ...">12121</p>
            <p className="tabular-nums ...">90909</p>
            <p className="lining-nums ...">1234567890</p>
            <p className="oldstyle-nums ...">1234567890</p>
            <div className="flex ...">
                <div className="w-1/6 ...">w-1/6</div>
                <div className="w-5/6 ...">w-5/6</div>
            </div>
            <p className="ordinal ...">1st</p>
            <p className="ordinal ...">1st</p>
            <p className="slashed-zero ...">0</p>
            <span className="min-w-full ...">min width</span>
            <div className="w-full ...">w-full</div>
            <div className="flex ...">
                <div className="hidden ...">01</div>
                <div>02</div>
                <div>03</div>
            </div>
            <p className="leading-normal ...">
                So I started to walk into the water...
            </p>
            <p className="leading-normal ...">
                So I started to walk into the water...
            </p>
            <div className="grid grid-cols-3 gap-4 ...">
                <div>01</div>
                <div className="place-self-start ...">02</div>
                <div className="place-self-start ...">03</div>
                <div>04</div>
                <div>05</div>
                <div>06</div>
            </div>
            <p className="leading-relaxed ...">
                So I started to walk into the water...
            </p>
            <p className="leading-relaxed ...">
                So I started to walk into the water...
            </p>
            <p className="leading-relaxed ...">
                So I started to walk into the water...
            </p>
            <p className="leading-relaxed ...">
                So I started to walk into the water...
            </p>
            <p className="leading-loose ...">
                So I started to walk into the water...
            </p>
            <p className="leading-loose ...">
                So I started to walk into the water...
            </p>
            <div className="static ...">
                <p>Static parent</p>
                <div className="absolute bottom-0 left-0 ...">
                    <p>Absolute child</p>
                </div>
            </div>
            <div className="static ...">
                <p>Static parent</p>
                <div className="absolute bottom-0 left-0 ...">
                    <p>Absolute child</p>
                </div>
            </div>
            <p className="leading-6 ...">
                So I started to walk into the water...
            </p>
            <p className="leading-6 ...">
                So I started to walk into the water...
            </p>
            <p className="leading-7 ...">
                So I started to walk into the water...
            </p>
            <p className="leading-7 ...">
                So I started to walk into the water...
            </p>
            <p className="leading-8 ...">
                So I started to walk into the water...
            </p>
            <p className="leading-8 ...">
                So I started to walk into the water...
            </p>
            <p className="text-lg leading-loose md:text-xl md:leading-loose">
                Maybe we can live without libraries...
            </p>
            <div className="static ...">
                <div className="static ...">
                    <p>Static child</p>
                </div>
                <div className="inline-block ...">
                    <p>Static sibling</p>
                </div>
                <div className="inline-block ...">
                    <p>Static sibling</p>
                </div>

                <div className="absolute ...">
                    <p>Absolute child</p>
                </div>
                <div className="absolute ...">
                    <p>Absolute child</p>
                </div>
                <div className="inline-block ...">
                    <p>Static sibling</p>
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
            <ul className="list-inside ...">
                <li>5 cups chopped Porcini mushrooms</li>
            </ul>
            <ul className="list-inside ...">
                <li>5 cups chopped Porcini mushrooms</li>
            </ul>
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
                    <div className="sticky top-0">B</div>
                    <div>
                        <div>
                            <img src="..." />
                            <strong>Bob Alfred</strong>
                        </div>
                    </div>
                </div>
            </div>
            <ul className="list-outside ...">
                <li>5 cups chopped Porcini mushrooms</li>
            </ul>
            <div className="relative h-32 w-32 ...">
                <div className="absolute left-0 top-0 h-16 w-16 ...">01</div>
            </div>
            <div className="relative h-32 w-32 ...">
                <div className="absolute inset-x-0 top-0 h-16 ...">02</div>
            </div>
            <ul className="list-disc">
                <li className="list-disc">
                    Now this is a story all about how, my life got
                    flipped-turned upside down
                </li>
            </ul>
            <ul className="list-disc">
                <li className="list-disc">
                    Now this is a story all about how, my life got
                    flipped-turned upside down
                </li>
            </ul>
            <ol className="list-decimal">
                <li className="list-decimal">
                    Now this is a story all about how, my life got
                    flipped-turned upside down
                </li>
            </ol>
            <ol className="list-decimal">
                <li className="list-decimal">
                    Now this is a story all about how, my life got
                    flipped-turned upside down
                </li>
            </ol>
            <ol className="list-decimal">
                <li className="list-decimal">
                    Now this is a story all about how, my life got
                    flipped-turned upside down
                </li>
            </ol>
            <ol className="list-decimal">
                <li className="list-decimal">
                    Now this is a story all about how, my life got
                    flipped-turned upside down
                </li>
            </ol>
            <ul className="list-none">
                <li className="list-none">
                    Now this is a story all about how, my life got
                    flipped-turned upside down
                </li>
            </ul>
            <div className="relative h-32 w-32 ...">
                <div className="absolute top-0 right-0 h-16 w-16 ...">03</div>
            </div>
            <p className="text-left ...">
                So I started to walk into the water...
            </p>
            <p className="text-left ...">
                So I started to walk into the water...
            </p>
            <p className="text-center ...">
                So I started to walk into the water...
            </p>
            <p className="text-center ...">
                So I started to walk into the water...
            </p>
            <p className="text-right ...">
                So I started to walk into the water...
            </p>
            <p className="text-right ...">
                So I started to walk into the water...
            </p>
            <p className="text-justify ...">
                So I started to walk into the water...
            </p>
            <p className="text-sky-400">The quick brown fox...</p>
            <p className="text-sky-400/100">The quick brown fox...</p>
            <p className="text-blue-600/[.06]">The quick brown fox...</p>
            <p className="underline ...">The quick brown fox ...</p>
            <p className="underline ...">The quick brown fox ...</p>
            <p className="overline ...">The quick brown fox ...</p>
            <p className="overline ...">The quick brown fox ...</p>
            <p className="no-underline ...">The quick brown fox ...</p>
            <p className="no-underline ...">The quick brown fox ...</p>
            <div>
                <p>
                    I’m Derek, an astro-engineer based in Tattooine. I like to
                    build X-Wings at
                    <a className="underline decoration-sky-500">
                        My Company, Inc
                    </a>
                    . Outside of work, I like to{' '}
                    <a className="underline decoration-pink-500">
                        watch pod-racing
                    </a>{' '}
                    and have{' '}
                    <a className="underline decoration-indigo-500">
                        light-saber
                    </a>{' '}
                    fights.
                </p>
            </div>
            <p className="underline decoration-solid ...">
                The quick brown fox...
            </p>
            <p className="underline decoration-double ...">
                The quick brown fox...
            </p>
            <p className="underline decoration-dotted ...">
                The quick brown fox...
            </p>
            <p className="underline decoration-dashed ...">
                The quick brown fox...
            </p>
            <p className="underline decoration-wavy ...">
                The quick brown fox...
            </p>
            <p className="underline decoration-1 ...">The quick brown fox...</p>
            <p className="underline decoration-2 ...">The quick brown fox...</p>
            <p className="underline decoration-4 ...">The quick brown fox...</p>
            <p className="underline underline-offset-1 ...">
                The quick brown fox... underline-offset-1
            </p>
            <p className="underline underline-offset-2 ...">
                The quick brown fox... underline-offset-2
            </p>
            <p className="underline underline-offset-4 ...">
                The quick brown fox...
            </p>
            <p className="underline underline-offset-8 ...">
                The quick brown fox...
            </p>
            <div className="relative h-32 w-32 ...">
                <div className="absolute inset-y-0 left-0 w-16 ...">04</div>
            </div>
            <div className="relative h-32 w-32 ...">
                <div className="absolute inset-0 ...">05</div>
            </div>
            <div className="relative h-32 w-32 ...">
                <div className="absolute inset-y-0 right-0 w-16 ...">06</div>
            </div>
            <div className="relative h-32 w-32 ...">
                <div className="absolute bottom-0 left-0 h-16 w-16 ...">07</div>
            </div>
            <div className="pt-6 ...">pt-6</div>
            <div className="pr-4 ...">pr-4</div>
            <div className="pb-8 ...">pb-8</div>
            <div className="pl-2 ...">pl-2</div>
            <div className="px-8 ...">px-8</div>
            <div className="py-8 ...">py-8</div>
            <div className="p-8 ...">p-8</div>

            <div className="ps-8 ...">ps-8</div>
            <div className="pe-8 ...">pe-8</div>
            <div className="mt-6 ...">mt-6</div>
            <div className="mr-4 ...">mr-4</div>
            <div className="mb-8 ...">mb-8</div>
            <div className="ml-2 ...">ml-2</div>
            <div className="ml-2 ...">ml-2</div>
            <div className="mx-8 ...">mx-8</div>
            <div className="my-8 ...">my-8</div>
            <div className="m-8 ...">m-8</div>
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

            <p className="uppercase ...">The quick brown fox ...</p>
            <p className="uppercase ...">The quick brown fox ...</p>
            <p className="normal-case ...">The quick brown fox ...</p>
            <p className="normal-case ...">The quick brown fox ...</p>
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
            <div className="bg-purple-300 ...">
                <img className="object-contain h-48 w-96 ..." />
            </div>
            <div className="bg-purple-300 ...">
                <img className="object-contain h-48 w-96 ..." />
            </div>
            <div className="bg-purple-300 ...">
                <img className="object-contain h-48 w-96 ..." />
            </div>
            <div className="bg-purple-300 ...">
                <img className="object-contain h-48 w-96 ..." />
            </div>
            <div className="bg-sky-300 ...">
                <img className="object-fill h-48 w-96 ..." />
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
