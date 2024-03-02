import { useEffect, useState } from "react";
import PageTitle from "./PageTitle";
import { useProductContext } from "../../context/ProductContext";
import { Link } from "react-router-dom";
import FormatePrice from "../../Helper/FormatePrice";
import { FaPlus } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { useAdminUserHook } from "../../context/AdminUsersContext";
const UsersSection = () => {
  const { allUsers, isLoading } = useAdminUserHook();
  const [records, setRecords] = useState([]);

  const [cruntPage, setCruntPage] = useState(1);

  const recodePerPage = 10;
  const lastIndex = recodePerPage * cruntPage;
  const firstIndex = lastIndex - recodePerPage;
  const npages = Math.ceil(allUsers.length / recodePerPage);
  const numbers = [...Array(npages + 1).keys()].slice(1);

  useEffect(() => {
    const newRecords = allUsers.slice(firstIndex, lastIndex);
    setRecords(newRecords);
  }, [cruntPage, allUsers, records]);

  const nextPage = () => {
    if (cruntPage !== npages) {
      setCruntPage(cruntPage + 1);
    }
  };

  const changePage = (id) => {
    setCruntPage(id);
  };
  const prevPage = () => {
    if (cruntPage !== 1) {
      setCruntPage(cruntPage - 1);
    }
  };

  const onSearch = (e) => {
    const tempProduct = allUsers.filter((elem) => {
      return elem.title.toLowerCase().includes(e.target.value);
    });
    setRecords(tempProduct);
  };
  return (
    <>
      {isLoading ? (
        <div className="">
          <p>loading</p>
        </div>
      ) : (
        <section className="w-full p-4">
          <PageTitle />
          <div className="w-full h-20 px-8 bg-white mt-3 flex justify-between items-center">
            <div className="">
              <button className="btn">
                <FaPlus />
              </button>
            </div>
            <div className=" flex justify-center items-center border-2">
              <input
                type="search"
                onChange={onSearch}
                className=" focus:border-blue outline-none  px-2 py-1"
              />
              <IoSearch size={22} className="mr-1 text-blue cursor-pointer" />
            </div>
          </div>
          <div className="w-full mt-2 bg-white">
            <div className="relative overflow-x-auto p-1">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-white uppercase bg-blue  ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      User image
                    </th>
                    <th scope="col" className="px-6 py-3">
                    firstN ame
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Color
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {records &&
                    records.map((elem, index) => {
                      return (
                        <tr className="bg-white border-b " key={index}>
                          <td className="px- py-4">
                            <div className="w-10 h-10 rounded-full overflow-hidden">
                              <img
                                src={`http://localhost:3002/${elem.avtarURL}`}
                                className=" "
                                alt="img"
                              />
                            </div>
                          </td>
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                          >
                            {elem.firstName}
                            {" "}
                            {elem.lastName}
                          </th>
                          <td className="px-6 py-4 h-full ">
{elem.email}
                          </td>
                          <td className="px-6 py-4">{elem.phone}</td>
                          <td className="px-6 py-4">
                            <FormatePrice price={elem.price} />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
          <nav className="mt-4 flex items-center justify-items-start gap-3">
            <li>
              <button className="btn" onClick={prevPage}>
                prev
              </button>
            </li>
            {numbers.map((n, i) => {
              return (
                <li
                  onClick={() => changePage(n)}
                  key={i}
                  className={` h-8 w-8 flex justify-center items-center cursor-pointer hover:bg-blue hover:text-white ${
                    cruntPage !== n ? "bg-slate-300 " : "bg-blue text-white "
                  }`}
                >
                  <Link className=" "> {n}</Link>
                </li>
              );
            })}
            <li>
              <button className="btn " onClick={nextPage}>
                next
              </button>
            </li>
          </nav>
        </section>
      )}
    </>
  );
};

export default UsersSection;
