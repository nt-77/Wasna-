const MenuItem = ({
    title,
    category,
    price,
    description,
    items,
    // customMenu
  }) => {
    return (
      <>
     <article className="menu-item bg-red rounded border-2  rounded-lg w-[350px] m-4 relative shadow-lg">
    <div className=" p-6 flex flex-col justify-between h-full">
      <div>
        <header className="flex justify-between flex-wrap gap-4 mb-4">
          <h5 className="font-bold text-xl">{title}</h5>
          <span className=" bg-blue-500 text-white px-2 py-1 rounded">
            Rs {price}
          </span>
        </header>
        <p className="item-text font-light ">{description}</p>
  
  <div className="options">
    {items.length > 0 ? (
      items.map((item) => (
        <div key={item.item_type} className="mb-2 text-center">
          <strong>{item.item_type}</strong>
          {item.item_type === "Sauce" || (title === "Menu 3" && category === "Barat / Walima" && item.item_type === "Dessert") ? (
            <div className="ml-2">
              {item.options.map((option, index) => (
                <div key={index}>{option}</div>
              ))}
            </div>
          ) : (
            item.options.length > 0 && (
              <div className="mt-1">
                {item.options.join(" / ")}
              </div>
            )
          )}
        </div>
      ))
    ) : (
      <div>No items available</div>
    )}
  </div>
  
  
      </div>
    </div>
  </article>
  
      </>
    );
  };
  
  export default MenuItem;
  