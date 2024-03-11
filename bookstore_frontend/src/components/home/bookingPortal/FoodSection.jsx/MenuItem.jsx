

const MenuItem = ({ _id,title, price, description, items,setMenuCustomization,setCustomizeMenuId }) => {

   const handleClick =(_id)=>{
    setMenuCustomization(true)
    setCustomizeMenuId(_id)
    console.log(_id);
  
   }
  return (
    <>
        <article className="menu-item bg-red rounded">

          <div className=" p-6">
            <header className="flex justify-between flex-wrap gap-4 mb-4">
              <h5 className="font-bold text-xl">{title}</h5>
              <span className=" bg-blue-500 text-white px-2 py-1 rounded">
                Rs {price}
              </span>
            </header>
            <p className="item-text">{description}</p>
            <div className="options">
              {items.length > 0 ? (
                items.map((item) => (
                  <div key={item.item_type} className="mb-2">
                    <strong>{item.item_type}</strong>
                    {item.options.length > 0 && (
                      <>: {item.options.join(" / ")}</>
                    )}
                  </div>
                ))
              ) : (
                <div>No items available</div>
              )}

              <button onClick={() =>handleClick(_id)}>
                Customize
              </button>
            </div>
          </div>
        </article>
    </>
  );
};

export default MenuItem;
