import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./AuthLayout.module.scss";
import { FaGlobe, FaQuestionCircle, FaQuoteLeft } from "react-icons/fa";

const cx = classNames.bind(styles);

const AuthLayout = () => {
  const location = useLocation();
  const isRegister = location.pathname === "/register";

  return (
    <div className={cx("wrapper")}>
      <div className={cx("decorativeElements")}>
        <div className={cx("element")}></div>
        <div className={cx("element")}></div>
      </div>

      <div className={cx("cardContainer", { registerMode: isRegister })}>
        <div className={cx("leftSection")}>
          <div className={cx("imageWrapper")}></div>

          <div className={cx("contentWrapper")}>
            <div className={cx("brand")}>
              <FaQuoteLeft /> Synapse Moments
            </div>

            <div className={cx("quote")}>
              "Kết nối tri thức,
              <br /> kiến tạo tương lai."
            </div>

            <div className={cx("userInfo")}>
              <div className={cx("avatar")}></div>
              <div className={cx("userDetails")}>
                <h3>Huy Nguyen</h3>
                <p>Intern</p>
              </div>
            </div>
          </div>
        </div>

        <div className={cx("rightSection")}>
          <div className={cx("formContainer")}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
