const Title = ({ text }) => {
    return (
      <div className='title text-center mb-4'>
        <h2 className='text-3xl font-bold'>{text}</h2>
        <div className='title-underline bg-blue-500 w-28 h-1 mx-auto mt-4'></div>
      </div>
    );
  };
  
  export default Title;