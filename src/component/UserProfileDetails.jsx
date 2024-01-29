import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { Menus, signOutAction } from "../utils/helpers";
import { Link } from "react-router-dom";

const UserProfileDetails = () => {
  const user = useSelector((state) => state.user.user);
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  return (
    <div className="d-flex justify-content-center align-items-center  gap-2 position-relative ">
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsMenuVisible(!isMenuVisible)}
        className="d-flex justify-content-center align-items-center align-content-center rounded-circle overflow-hidden bg-secondary "
        style={{ width: "3rem", height: "3rem" }}
      >
        {user?.photoURL ? (
          <>
            <img src={user.photoURL} className="object-fit-cover w-100 h-100" />
          </>
        ) : (
          <>
            <p className="text-capitalize text-white d-flex justify-content-center align-items-center pt-3  w-100 h-100">
              <span style={{fontSize:"1.4rem"}}>{user?.email[0]}</span>
            </p>
          </>
        )}
      </motion.div>
      <AnimatePresence>
      {isMenuVisible && 

      <motion.div
        initial={{opacity:0 , y:50}}
        animate={{opacity:1 , y:0}}
        exit={{opacity:0 , y:50}}
        className="bg-dark px-4 py-3 rounded d-flex flex-column shadow-sm  justify-content-between align-items-center bg-dark m-2 rounded-right d-flex z-3"
        style={{ minWidth: "152px",position:'absolute',
        right:'-20px',
        top:'3rem'}}
      >
        {Menus &&
          Menus.map((menu) => (
            <Link to={menu.uri} key={menu.id} className="text-decoration-none text-white-50 py-2 "
            >
              {menu.name}
            </Link>
          ))}
          <motion.p
          onClick={signOutAction}
          whileTap={{scale:0.9}} 
          className="text-white-50 pt-2"
          style={{cursor:'pointer'}}
          >sign out</motion.p>
      </motion.div>}
      </AnimatePresence>
    </div>
  );
};

export default UserProfileDetails;
