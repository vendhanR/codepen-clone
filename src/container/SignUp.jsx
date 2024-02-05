import React, { useState } from "react";
import { UserAuthInput } from "../component";
import { MdEmail } from "react-icons/md";
import { MdPassword } from "react-icons/md";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { SiGithub } from "react-icons/si";
import { signInWithGoogle, signInWithGithub } from "../utils/helpers";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase.config";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [getEmailValidation, setGetEmailValidation] = useState(false);
  const [isLogin, setisLogin] = useState(true);
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const handleSignUp  = async () => {
    if (getEmailValidation) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
          if (userCred) {
            console.log(userCred.user);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const loginWithEmailAndPass = async () => {
    if (getEmailValidation) {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCred) => {
          if (userCred) {
            console.log(userCred.user);
          }
        })
        .catch((err) => {
          setAlert(true);
          setAlertMsg("Invalid email or password");
          setTimeout(() => {
            setAlert(false);
          }, 4000);
        });
    }
  };

  return (
    <div className="w-100 py-2 d-flex">
      <div className="w-100 d-flex align-items-center justify-content-center flex-column ">
        <p className="text-white opacity-50 ">Join With Us! 😊</p>
        <div className="rounded  bg-dark  flex-column align-content-center justify-content-center px-4 py-4">
          {/* email */}
          <UserAuthInput
            label="Email"
            isPass={false}
            placeholder="Email"
            Icon={MdEmail}
            setStateFunction={setEmail}
            setGetEmailValidation={setGetEmailValidation}
          />

          {/* password */}
          <UserAuthInput
            label="Password"
            isPass={true}
            placeholder="Password"
            Icon={MdPassword}
            setStateFunction={setPassword}
          />
          {/* aler section */}
          {alert && (
            <p className="text-danger d-flex justify-content-center">
              {alertMsg}
            </p>
          )}

          {/* login buttion  */}
          {!isLogin && (
            <motion.div
              onClick={handleSignUp }
              whileTap={{ scale: 0.9 }}
              className="w-100 d-flex justify-content-center align-content-center flex-grow-1 py-2 "
            >
              <button className="btn w-100 btn-success">Sign Up</button>
            </motion.div>
          )}
          {isLogin && (
            <motion.div
              onClick={loginWithEmailAndPass}
              whileTap={{ scale: 0.9 }}
              className="w-100 d-flex justify-content-center align-content-center flex-grow-1 py-2 "
            >
              <button className="btn w-100 btn-success">Login</button>
            </motion.div>
          )}

          {/* account text section */}
          {!isLogin && (
            <p
              className="text-light opacity-75 py-3 w-100 d-flex justify-content-center align-content-center"
              style={{ fontSize: "0.8rem" }}
            >
              Already have an account!
              <span
                onClick={() => setisLogin(!isLogin)}
                className="text-success text-decoration-underline px-2"
                style={{ cursor: "pointer" }}
              >
                Login
              </span>
            </p>
          )}
          {isLogin && (
            <p
              className="text-light opacity-75 py-3 w-100 d-flex justify-content-center align-content-center"
              style={{ fontSize: "0.8rem" }}
            >
              Doesn't have an account!
              <span
                onClick={() => setisLogin(!isLogin)}
                className="text-success text-decoration-underline px-2"
                style={{ cursor: "pointer" }}
              >
                create here
              </span>
            </p>
          )}
          {/* or section */}
          <div className="d-flex w-100 text-white justify-content-center align-items-center opacity-25 pb-2">
            <div className="border border-bottom border-white w-25"></div>
            <div className="px-3">or</div>
            <div className="border border-bottom border-white w-25"></div>
          </div>

          {/* google section */}
          <div>

          <motion.button
            onClick={signInWithGoogle}
            whileTap={{ scale: 0.9 }}
            className="w-100 d-flex flex-grow-1 justify-content-center align-items-center align-items-center gap-2 bg-light h-100 rounded px-2 py-1"
          >
            <FcGoogle className="" />{" "}
            <span className="opacity-75">Sign in with Google</span>
          </motion.button>
          </div>
          {/* or section */}
          <div className="d-flex w-100 text-white justify-content-center align-items-center opacity-25 pb-2">
            <div className="border border-bottom border-white w-25"></div>
            <div className="px-3">or</div>
            <div className="border border-bottom border-white w-25"></div>
          </div>

          {/* github */}
          <div>

          <motion.button
            onClick={signInWithGithub}
            whileTap={{ scale: 0.9 }}
            className="w-100 d-flex flex-grow-1 justify-content-center align-items-center align-items-center gap-2 bg-light h-100 rounded px-2 py-1 "
          >
            <SiGithub />
            <span className="opacity-75">Sign in with GitHub</span>
          </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
