const menuCustomization = ({selectedMenu})=>{
    console.log(selectedMenu);

    return(
        <div className="max-w-md mx-auto my-8">
        <h2 className="text-2xl font-bold mb-4">Customizing {selectedMenu[0].title}</h2>
        <form>
          <div className="mb-4">
            {/* <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => handleChange("name", e.target.value)}
              className={`mt-1 p-2 w-full border rounded-md ${
                errors.name && "border-red-500"
              }`}
            /> */}
            
          </div>
          </form>
          </div>
    )

};

export default menuCustomization