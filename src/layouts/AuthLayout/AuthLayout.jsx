import React from "react";
import { Outlet, Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./AuthLayout.module.scss";
import { FaGlobe, FaQuestionCircle, FaQuoteLeft } from "react-icons/fa";

const cx = classNames.bind(styles);

const AuthLayout = () => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("cardContainer")}>
        <div className={cx("leftSection")}>
          <div className={cx("imageWrapper")}></div>

          <div className={cx("waveDivider")}>
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            ></svg>
          </div>

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
