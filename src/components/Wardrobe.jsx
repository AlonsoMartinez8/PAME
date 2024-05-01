export default function Wardrobe(){
    return(
        <main className="w-full my-2">
            <nav className="border-b-2 py-2 flex items-center justify-between gap-2">
                <ul className="flex items-center justify-start gap-2">
                    <li className="bg-slate-100/30 px-4 py-1 rounded-md">All Categories</li>
                    <li className="bg-slate-100/10 px-4 py-1 rounded-md">Category 1</li>
                    <li className="bg-slate-100/10 px-4 py-1 rounded-md">Category 2</li>
                    <li className="bg-slate-100/10 px-4 py-1 rounded-md">Category 3</li>
                    <li className="bg-slate-100/10 px-4 py-1 rounded-md">Category 4</li>
                </ul>
                <aside>
                    <button className="px-4 rounded-md"><i class="text-2xl ri-add-line"></i></button>
                </aside>
            </nav>
        </main>
    )
}