export default function ClotheSlider({wardrobeId, categoryId, clothes}){

    return(
        <nav className="py-2 items-start flex flex-col justify-start gap-2 ">
        <aside className="flex justify-end items-center gap-2">
          <button className="rounded-md">
            <i className="text-2xl ri-dashboard-horizontal-fill"></i>
          </button>
          <button className="rounded-md">
            <i class="text-2xl ri-carousel-view"></i>
          </button>
          <button className="rounded-md">
            <i className="text-2xl ri-add-line"></i>
          </button>
        </aside>
        <ul className="flex items-center justify-center gap-2 w-full h-[200px]">
          {clothes && clothes.length > 0 ? (
            clothes.map((c) => <p>Clothe</p>)
          ) : (
            <p className="text-nowrap">There is no clothes yet</p>
          )}
        </ul>
      </nav>
    )
}