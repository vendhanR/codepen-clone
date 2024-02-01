import React, { useState } from "react";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { Link, Route, Routes } from "react-router-dom";
import { logo } from "../asset";
import { IoMdHome } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import {Projects,SignUp} from '../container'
import { useDispatch, useSelector } from "react-redux";
import UserProfileDetails from "../component/UserProfileDetails";
import { setSearchTerm } from "../store/slices/searchSlice";

const Home = () => {
  const [isSideMenu, setSideMenu] = useState(false);
  const user = useSelector(state => state.user.user);
  const searchTerm = useSelector((state) => state.searchTerm?.searchTerm);

  const dispatch = useDispatch();


  return (
    <>
      <div
        className={`bg-dark position-relative  min-vh-100 mix-vh-100 text-light d-flex align-items-center flex-column px-1 py-2`}
        style={{
          width: isSideMenu ? "0.4rem" : "13rem",
          transition: "all 0.5s",
        }}
      >
        {/* anchor */}
        <div
          className="position-absolute top-0 start-100 bg-dark mt-2 rounded-right "
          onClick={() => setSideMenu(!isSideMenu)}
        >
          <MdKeyboardDoubleArrowLeft className="text-light " />
        </div>

        <div className="overflow-hidden w-100 d-flex flex-column align-items-center ">
          {/* logo */}
          <Link to={"/home"}>
            <img className="w-100" src={logo} alt="logo" />
          </Link>
          {/* start coding button */}
            <Link to={"/newProject"}
              className=" bg-dark text-white text-opacity-75 text-decoration-none">
          <div className="mt-4 mb-1 border border-light rounded border-opacity-75 px-4 py-1">
              
              start coding
          </div>
            </Link>
          {/* home nav */}
          {user && (
            <div className="mt-4 ">
              <Link
                to={"/home"}
                className="text-white text-opacity-75 text-decoration-none "
              >
                <IoMdHome className="text-white text-opacity-75 mb-1 mx-2" />
                Home
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* right side section */}
      <div className="d-flex  min-vh-100 overflow-overflow-y-auto h-100 flex-column align-content-start justify-content-start px-4 py-4 flex-grow-1">
        {/* top section */}
        <div className="w-100 d-flex mb-3 align-items-center justify-content-between gap-3">
          {/* search */}
          <div className="w-100 d-flex align-items-center justify-content-between  bg-dark px-2 py-2 rounded">
            <FaSearch className="text-white  opacity-75" />
            <input
              type="text"
              className="bg-transparent flex-grow-1 px-4 py-1 border-0 text-white w-100 opacity-75"
              placeholder="Search here..."
              style={{ outline: "none" }}
              value={searchTerm}
              onChange={(e)=>dispatch(setSearchTerm(e.target.value))}
            />
          </div>
          {/* profile section */}
          {!user && (
              <Link
                to={"/home/auth"}
                className="text-white opacity-75 text-decoration-none bg-success p-2 rounded"
              >
                SignUp
              </Link>
          )}
          {user && <div>
            <UserProfileDetails/>
            </div>}
        </div>
        {/* bottom section  */}
        <Routes>
          <Route path="/auth" element={<SignUp />}/>
          <Route path="/*" element={<Projects />}/>
        </Routes>
      </div>
    </>
  );
};

export default Home;
