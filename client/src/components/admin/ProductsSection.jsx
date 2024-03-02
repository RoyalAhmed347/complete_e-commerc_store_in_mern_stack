import { useEffect, useState } from "react";
import PageTitle from "./PageTitle";
import { Link } from "react-router-dom";
import FormatePrice from "../../Helper/FormatePrice";
import { FaPlus } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { useAdminProductHook } from "../../context/AdminProductsContext";

const ProductsSection = () => {
  const { tempProduct, onScarch } = useAdminProductHook();

  // useEffect(() => {

  // }, [search]);

  const [cruntPage, setCruntPage] = useState(1);

  const recodePerPage = 10;
  const lastIndex = recodePerPage * cruntPage;
  const firstIndex = lastIndex - recodePerPage;
  const npages = Math.ceil(tempProduct.length / recodePerPage);
  const numbers = [...Array(npages + 1).keys()].slice(1);
  const newRecords = tempProduct.slice(firstIndex, lastIndex);

  const nextPage = () => {
    if (cruntPage !== npages) {
      setCruntPage(cruntPage + 1);
      // createPagination();
    }
  };

  const changePage = (id) => {
    setCruntPage(id);
    // createPagination();
  };
  const prevPage = () => {
    if (cruntPage !== 1) {
      setCruntPage(cruntPage - 1);
      // createPagination();
    }
  };

  return (
    <>
      <section className="w-full p-4">
        <PageTitle />
        <div className="w-full h-20 px-8 bg-white mt-3 flex justify-between items-center">
          <div className="">
            <Link to='/admin/create_product'>
              <button className="btn">
                <FaPlus />
              </button>
            </Link>
          </div>
          <div className=" flex justify-center items-center border-2">
            <input
              type="search"
              onChange={(e) => onScarch(e.target.value)}
              className=" focus:border-blue outline-none  px-2 py-1"
            />
            <IoSearch size={22} className="mr-1 text-blue cursor-pointer" />
          </div>
        </div>
        <div className="w-full mt-2 bg-white">
          <div className="relative overflow-x-auto p-1">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="w-full text-xs text-white uppercase bg-blue  ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Product image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product name
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
              <>
                {newRecords ? (
                  <tbody>
                    {newRecords.map((elem, index) => {
                      return (
                        <tr className="bg-white border-b " key={index}>
                          <td className="px- py-4">
                            <div className="">
                              <img
                                src={`http://localhost:3002/${elem.thumbnail}`}
                                className="w-16 max-h-16 "
                                alt="img"
                              />
                            </div>
                          </td>
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                          >
                            {elem.title}
                          </th>
                          <td className="px-6 py-4 h-full ">
                            <div className="flex gap-1 justify-start  items-center">
                              {elem.colors.map((e, i) => {
                                return (
                                  <div
                                    key={i}
                                    className="h-3 w-3 rounded-full cursor-pointer "
                                    style={{ backgroundColor: e }}
                                  ></div>
                                );
                              })}
                            </div>
                          </td>
                          <td className="px-6 py-4">{elem.category}</td>
                          <td className="px-6 py-4">
                            <FormatePrice price={elem.price} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                ) : null}
              </>
            </table>
            {!newRecords && (
              <div className="w-full text-center py-3">
                <p>Data not found</p>
              </div>
            )}
          </div>
        </div>
        <nav className="mt-4 flex items-center justify-items-start gap-3">
          <li>
            <button className="btn" onClick={() => prevPage()}>
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
            <button className="btn " onClick={() => nextPage()}>
              next
            </button>
          </li>
        </nav>
      </section>
    </>
  );
};

export default ProductsSection;
