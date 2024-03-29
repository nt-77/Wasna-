const DecorItem = ({item}) => {
    console.log("item",item);

    return (
        <article className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 pl-4">
        {item && item.images && item.images.length > 0 ? (
          item.images.map((image, index) => (
            <img
              key={index}
              src={image.img_url} // Assuming you have an 'img_url' property in your image object
              className=" rounded border-2 rounded-lg w-[450px] m-4 relative shadow-lg p-3 flex flex-col justify-between hover:shadow-xl"
              alt={`Decor Image ${index}`}
            />
          ))
        ) : (
          <p>No images available</p>
        )}
      </article>
    );
  };
//       <article className='menu-item'>
// {item.images.map((image, index) => (
//   <img key={index} src={image.img_url} className='rounded border-2 rounded-lg w-[350px] m-4 relative shadow-lg' />
// ))}
//         {/* <div className='item-info'>
//           <header>
//             <h5>{title}</h5>
//             <span className='item-price'>${price}</span>
//           </header>
//           <p className='item-text'>{desc}</p>
//         </div> */}
//       </article>
//     );
//   };
  export default DecorItem;

  //className="rounded border-2 rounded-lg w-[350px] m-4 relative shadow-lg"

  // className="  p-6 flex flex-col justify-between  "
  