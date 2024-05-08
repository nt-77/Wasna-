import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
// eslint-disable-next-line react/prop-types
const TableDisplay = ({ books }) => {
  return (
    <table className="w-full border-separate border-spacing-2">
      <thead>
        <tr>
          <th className="border  bg-white border-slate-600 rounded-md">No</th>
          <th className="border bg-white border-slate-600 rounded-md">Name</th>
          <th className="border bg-white border-slate-600 rounded-md max-md:hidden">
            Venue
          </th>
          <th className="border  bg-white border-slate-600 rounded-md max-md:hidden">
           Event Date
          </th> 
          <th className="border  bg-white border-slate-600 rounded-md max-md:hidden">
            Event Time
          </th>
          <th className="border  bg-white border-slate-600 rounded-md">Operations</th>
        </tr>
      </thead>

      <tbody>
        {books.map((book, index) => (
          <tr key={book._id} className="h-8">
            <td className="border  bg-white border-slate-700 rounded-md text-center">
              {index + 1}
            </td>
            <td className="border  bg-white border-slate-700 rounded-md text-center">
              {book.name}
            </td>
            <td className="border  bg-white border-slate-700 rounded-md text-center max-md:hidden">
              {book.venue}
            </td>
            <td className="border  bg-white border-slate-700 rounded-md text-center max-md:hidden">
              {book.eventDate}
            </td>
            <td className="border  bg-white border-slate-700 rounded-md text-center max-md:hidden">
              {book.eventTime}
            </td>
            <td className="border  bg-white border-slate-700 rounded-md text-center">
              <div className="flex justify-center gap-x-4">
                <Link to={`/decor/details/${book._id}`}>
                  <BsInfoCircle className="text-2x1 text-green-800" />
                </Link>
                <Link to={`/decor/edit/:${book._id}`}>
                  <AiOutlineEdit className="text-2x1 text-yellow-800" />
                </Link>
                <Link to={`/event/delete/:${book._id}`}>
                  <MdOutlineDelete className="text-2x1 text-red-800" />
                </Link>
              </div>
            </td>
          </tr>
          // console.log(book);
        ))}
      </tbody>
    </table>
  );
};

export default TableDisplay;
