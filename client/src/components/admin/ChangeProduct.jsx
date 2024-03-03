import React, { useEffect, useState } from "react";
import PageTitle from "./PageTitle";
import { useAdminAuthHook } from "../../context/AdminAuthContext";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";

import axios from "axios";
import { useParams } from "react-router-dom";
import { useAdminProductHook } from "../../context/AdminProductsContext";

const ChangeProduct = () => {
  const { adminToken } = useAdminAuthHook();
  const { isLoading } = useAdminAuthHook();
  const [images, setImages] = useState({
    date: [],
    pre: [],
  });
  const [productData, setProductData] = useState({});
  const [loadProduct, setLoadProduct] = useState(true);
  const [localImage, setlocalImage] = useState(false);

  const { getSingleProduct, singleProduct } = useAdminProductHook();

  const { id } = useParams();

  useEffect(() => {
    setLoadProduct(true);
    setlocalImage(false);
    getSingleProduct(id).then((res) => {
      setProductData(res.data.Product[0]);

      setImages((prvData) => {
        return {
          ...prvData,
          pre: res.data.Product[0].images,
        };
      });
      setLoadProduct(false);
      setlocalImage(false);
    });
  }, []);

  const inputEvent = (e) => {
    const { value, name } = e.target;
    setProductData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const imageInputEvent = (e) => {
    const allImages = e.target.files;

    const prev = [];
    for (let i = 0; i < e.target.files.length; i++) {
      const element = URL.createObjectURL(e.target.files[i]);
      prev.push({ element });
    }
    setImages(() => {
      return {
        pre: prev,
        date: allImages,
      };
    });
    setlocalImage(true);
  };

  const removeImg = (id) => {
    const newData = [];
    for (let i = 0; i < images.date.length; i++) {
      const element = images.date[i];
      if (id !== i) {
        newData.push(element);
      }
    }
    const newPrev = images.pre.filter((elem, i) => {
      return id !== i;
    });
    setImages((prvData) => {
      return {
        ...prvData,
        pre: newPrev,
        date: newData,
      };
    });
    console.log(images.date);
  };

  const updateImages = async (e) => {
    try {
      const formData = new FormData();

      for (let i = 0; i < images.date.length; i++) {
        const element = images.date[i];
        formData.append("images", element);
      }

      const result = await axios.patch(
        `http://localhost:3002/api/data/updateProduct/${id}`,
        formData,
        {
          headers: {
            Authorization: adminToken,
          },
        }
      );
      toast.success(result.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const createProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      for (let i = 0; i < images.date.length; i++) {
        const element = images.date[i];
        formData.append("images", element);
      }

      for (let key in productData) {
        formData.append(key, productData[key]);
      }

      const result = await axios.post(
        "http://localhost:3002/api/data/add_product",
        formData,
        {
          headers: {
            Authorization: adminToken,
          },
        }
      );
      toast.success(result.data.message);
    } catch (error) {
      toast(
        error.response.data.message
          ? error.response.data.message
          : error.response.data.msg
      );
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="">
          <p>Loading</p>
        </div>
      ) : !loadProduct ? (
        <section className="w-full p-4">
          <PageTitle />
          <form className="w-full bg-white mt-3 p-4" onSubmit={createProduct}>
            <div className="flex flex-col lg:flex-row justify-between">
              <div className="gernel_info f-full lg:w-2/3">
                <h1 className="text-xl font-medium pb-2">Gernal Info</h1>
                <div className="">
                  <label htmlFor="title" className="font-normal text-gray-400">
                    Product Photos
                  </label>
                  <br />
                  <input
                    type="text"
                    name="title"
                    onChange={inputEvent}
                    value={productData.title}
                    id="title"
                    placeholder="My Product"
                    className="border-2 rounded-md py-1 px-2 outline-none w-full lg:w-3/4"
                  />
                </div>
                <div className="mt-3">
                  <label
                    htmlFor="description"
                    className="font-normal text-gray-400"
                  >
                    Description
                  </label>
                  <br />
                  <textarea
                    type="text"
                    name="description"
                    onChange={inputEvent}
                    value={productData.description}
                    id="description"
                    placeholder="My Product"
                    className="border-2 rounded-md py-1 px-2 outline-none w-full lg:w-3/4 h-64 resize-none"
                  />
                </div>
              </div>
              <div className="w-full lg:w-1/3">
                <div className="images  ">
                  <h1 className="text-xl font-medium pb-2">Product Media</h1>
                  <p className="font-normal text-gray-400">Product Photos</p>
                  <label htmlFor="img" onDragOverCapture={imageInputEvent}>
                    <div
                      className="w-w-full h-40 bg-slate-100 border-2 border-dashed border-gray-700 flex flex-col justify-center items-center cursor-pointer"
                      draggable="true"
                      onDrag={imageInputEvent}
                    >
                      <FaCloudUploadAlt size={30} />
                      <p>Drag and drop your files anywhere or</p>
                    </div>
                  </label>
                </div>
                <div className="w-full flex gap-2 border-2 flex-wrap justify-around mt-3">
                  {localImage
                    ? images.pre.map((elem, index) => {
                        return (
                          <div
                            className="group w-20 h-20 overflow-hidden relative"
                            key={index}
                          >
                            <img
                              src={elem.element}
                              alt={index}
                              className="absolute opacity-0:"
                            />
                            <div className="w-full h-full  justify-center items-center absolute z-10 text-white bg-slate-900 bg-opacity-70 hidden group-hover:flex ">
                              <MdDelete
                                size={22}
                                className="cursor-pointer"
                                onClick={() => removeImg(index)}
                              />
                            </div>
                          </div>
                        );
                      })
                    : images.pre.map((elem, index) => {
                        return (
                          <div
                            className="w-20 h-20 overflow-hidden"
                            key={index}
                          >
                            <img
                              src={`http://localhost:3002${elem}`}
                              alt={index}
                            />
                          </div>
                        );
                      })}
                </div>
                {localImage && (
                  <div className="mt-3">
                    <span className="btn" onClick={updateImages}>
                      Update
                    </span>
                  </div>
                )}
              </div>
              <input
                type="file"
                id="img"
                onChange={imageInputEvent}
                className="hidden"
                multiple
                accept="image/*"
              />
            </div>
            <hr />
            <div className="flex justify-between mt-3">
              <div className="gernel_info w-2/3">
                <div className="">
                  <h1 className="text-xl font-medium pb-2">Pricing</h1>
                  <div className="w-full">
                    <div className="w-full flex justify-center items-center">
                      <div className="w-2/4">
                        <label
                          htmlFor="price"
                          className="font-normal text-gray-400"
                        >
                          Base Price
                        </label>
                        <br />
                        <input
                          type="number"
                          id="price"
                          name="price"
                          onChange={inputEvent}
                          value={productData.price}
                          placeholder="1***"
                          min={1}
                          className="border-2 rounded-md py-1 px-2 outline-none w-2/4"
                        />
                      </div>
                      <div className="w-2/4">
                        <label
                          htmlFor="discountPercentage"
                          className="font-normal text-gray-400"
                        >
                          Discount Persentage
                        </label>
                        <br />
                        <input
                          type="number"
                          id="discountPercentage"
                          name="discountPercentage"
                          onChange={inputEvent}
                          value={productData.discountPercentage}
                          min={0}
                          placeholder="5"
                          className="border-2 rounded-md py-1 px-2 outline-none w-2/4"
                        />
                      </div>
                    </div>
                    <div className="w-full mt-3">
                      <div className="w-full ">
                        <label
                          htmlFor="shipping"
                          className="font-normal text-gray-400"
                        >
                          Shipping Charges
                        </label>
                        <br />
                        <select
                          onChange={inputEvent}
                          name="shipping"
                          id="shipping"
                          className="w-3/4 border-2 outline-none"
                        >
                          <option selected disabled defaultValue={0}>
                            Select
                          </option>
                          <option value="0">0</option>
                          <option value="50">50</option>
                          <option value="150">150</option>
                          <option value="200">200</option>
                          <option value="250">250</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <h1 className="text-xl font-medium pb-2">Inventry</h1>
                  <div className="flex justify-center items-center">
                    <div className="w-2/4">
                      <label
                        htmlFor="stock"
                        className="font-normal text-gray-400"
                      >
                        Quantity
                      </label>
                      <br />
                      <input
                        type="number"
                        id="stock"
                        onChange={inputEvent}
                        value={productData.stock}
                        name="stock"
                        placeholder="20"
                        min={1}
                        className="border-2 rounded-md py-1 px-2 outline-none w-2/4"
                      />
                    </div>
                    <div className="w-2/4">
                      <label
                        htmlFor="colors"
                        className="font-normal text-gray-400"
                      >
                        Color
                      </label>
                      <br />
                      <div className="flex gap-8">
                        <input
                          onChange={inputEvent}
                          value={productData.color}
                          type="color"
                          name="colors"
                          id="colors"
                          min={0}
                          placeholder="5"
                          className="border-2 rounded-md py-1 px-2 outline-none w-1/4"
                        />
                        <p className="text-gray-400">{productData.colors}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <button className="btn"> Create </button>
                </div>
              </div>
              <div className=" w-1/3 ">
                <div className="">
                  <h1 className="text-xl font-medium pb-2">Category</h1>
                  <div className="w-full">
                    <label
                      htmlFor="category"
                      className="font-normal text-gray-400"
                    >
                      Product Category
                    </label>
                    <br />
                    <input
                      type="text"
                      id="category"
                      onChange={inputEvent}
                      value={productData.category}
                      name="category"
                      min={0}
                      placeholder="Smart Phone"
                      className="border-2 rounded-md py-1 px-2 outline-none w-3/4"
                    />
                  </div>
                  <div className="w-full mt-3">
                    <label
                      htmlFor="brand"
                      className="font-normal text-gray-400"
                    >
                      Companey
                    </label>
                    <br />
                    <input
                      type="text"
                      id="brand"
                      name="brand"
                      onChange={inputEvent}
                      value={productData.brand}
                      min={0}
                      placeholder="Oppo"
                      className="border-2 rounded-md py-1 px-2 outline-none w-3/4"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </section>
      ) : (
        <div className="w-full h-screen flex justify-center items-center">
          <p>Loading...</p>
        </div>
      )}
    </>
  );
};

export default ChangeProduct;
