import { useState } from "react";
import classNames from "classnames/bind";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./Login.module.scss";
import authService from "../../../services/authService";
import Button from "../../../components/common/Button";

const cx = classNames.bind(styles);

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      const response = await authService.login(data.username, data.password);
      const { token } = response.result;
      localStorage.setItem("accessToken", token);
      navigate("/");
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        "Tài khoản hoặc mật khẩu không chính xác";
      setError("root", {
        type: "manual",
        message: msg,
      });
    }
  };

  const handleSafeSubmit = (e) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={{ width: "100%" }}>
      <div className={`${cx("container")} animate-scaleIn`}>
        <div className={cx("header")}>
          <h1 className="animate-fadeSlideDown">Chào mừng trở lại</h1>
          <p className="animate-fadeSlideDown delay-100">
            Đăng nhập vào Synapse
          </p>
        </div>

        <form onSubmit={handleSafeSubmit}>
          <div className={`${cx("formGroup")} animate-fadeUp delay-200`}>
            <label>Tên tài khoản</label>
            <div className={cx("inputWrapper")}>
              <FaUser className={cx("icon")} />
              <input
                type="text"
                placeholder="Nhập tài khoản hoặc email"
                className={errors.username ? cx("inputError") : ""}
                {...register("username", {
                  required: "Vui lòng nhập tài khoản",
                })}
              />
            </div>
            {errors.username && (
              <span className={`${cx("errorMsg")} animate-shake`}>
                {errors.username.message}
              </span>
            )}
          </div>

          <div className={`${cx("formGroup")} animate-fadeUp delay-300`}>
            <label>Mật khẩu</label>
            <div className={cx("inputWrapper")}>
              <FaLock className={cx("icon")} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu"
                className={errors.password ? cx("inputError") : ""}
                {...register("password", {
                  required: "Vui lòng nhập mật khẩu",
                })}
              />
              <button
                type="button"
                className={cx("togglePasswordBtn")}
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              >
                {showPassword ? (
                  <FaEye className={cx("toggleIcon")} />
                ) : (
                  <FaEyeSlash className={cx("toggleIcon")} />
                )}
              </button>
            </div>
            {errors.password && (
              <span className={`${cx("errorMsg")} animate-shake`}>
                {errors.password.message}
              </span>
            )}
          </div>

          {errors.root && (
            <div
              className={`${cx("errorMsg")} animate-shake`}
              style={{
                textAlign: "center",
                marginBottom: "1rem",
                marginTop: "-0.5rem",
              }}
            >
              {errors.root.message}
            </div>
          )}

          <div className="animate-fadeUp delay-400">
            <Button
              primary
              width="100%"
              shine
              scale
              type="submit"
              small
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <FaSpinner className="spin-loading" />
              ) : (
                "Đăng Nhập"
              )}
            </Button>
          </div>
        </form>

        <div className={`${cx("footer")} animate-fadeIn delay-500`}>
          Chưa có tài khoản?
          <Button small text={1} to="/register" className="hover-scale">
            Đăng ký ngay
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
