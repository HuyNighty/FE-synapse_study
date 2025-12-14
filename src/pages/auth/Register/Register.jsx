import { useState } from "react";
import classNames from "classnames/bind";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaIdCard,
  FaSpinner,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import styles from "./Register.module.scss";
import authService from "../../../services/authService";
import Button from "../../../components/common/Button";

const cx = classNames.bind(styles);

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      await authService.register({
        username: data.username,
        password: data.password,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      });

      navigate("/login");
    } catch (error) {
      const msg =
        error.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại.";
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

  return (
    <div style={{ width: "100%" }}>
      <div className={`${cx("container")} animate-scaleIn`}>
        <div className={cx("header")}>
          <h1 className="animate-fadeSlideDown">Tạo tài khoản</h1>
          <p className="animate-fadeSlideDown delay-100">
            Tham gia cộng đồng Synapse ngay
          </p>
        </div>

        <form onSubmit={handleSafeSubmit}>
          <div
            style={{ display: "flex", gap: "15px" }}
            className="animate-fadeUp delay-200"
          >
            <div className={cx("formGroup")} style={{ flex: 1 }}>
              <label>Họ</label>
              <div className={cx("inputWrapper")}>
                <FaUser className={cx("icon")} />
                <input
                  type="text"
                  placeholder="Họ"
                  className={errors.lastName ? cx("inputError") : ""}
                  {...register("lastName", { required: "Bắt buộc" })}
                />
              </div>
              {errors.lastName && (
                <span className={cx("errorMsg")}>
                  {errors.lastName.message}
                </span>
              )}
            </div>

            <div className={cx("formGroup")} style={{ flex: 1 }}>
              <label>Tên</label>
              <div className={cx("inputWrapper")}>
                <FaUser className={cx("icon")} />
                <input
                  type="text"
                  placeholder="Tên"
                  className={errors.firstName ? cx("inputError") : ""}
                  {...register("firstName", { required: "Bắt buộc" })}
                />
              </div>
              {errors.firstName && (
                <span className={cx("errorMsg")}>
                  {errors.firstName.message}
                </span>
              )}
            </div>
          </div>

          <div className={`${cx("formGroup")} animate-fadeUp delay-300`}>
            <label>Email</label>
            <div className={cx("inputWrapper")}>
              <FaEnvelope className={cx("icon")} />
              <input
                type="email"
                placeholder="example@gmail.com"
                className={errors.email ? cx("inputError") : ""}
                {...register("email", {
                  required: "Vui lòng nhập email",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Email không hợp lệ",
                  },
                })}
              />
            </div>
            {errors.email && (
              <span className={`${cx("errorMsg")} animate-shake`}>
                {errors.email.message}
              </span>
            )}
          </div>

          <div className={`${cx("formGroup")} animate-fadeUp delay-400`}>
            <label>Tên đăng nhập</label>
            <div className={cx("inputWrapper")}>
              <FaIdCard className={cx("icon")} />
              <input
                type="text"
                placeholder="Chọn tên tài khoản"
                className={errors.username ? cx("inputError") : ""}
                {...register("username", {
                  required: "Vui lòng nhập tên tài khoản",
                  minLength: { value: 3, message: "Tối thiểu 3 ký tự" },
                })}
              />
            </div>
            {errors.username && (
              <span className={`${cx("errorMsg")} animate-shake`}>
                {errors.username.message}
              </span>
            )}
          </div>

          <div className={`${cx("formGroup")} animate-fadeUp delay-500`}>
            <label>Mật khẩu</label>
            <div className={cx("inputWrapper")}>
              <FaLock className={cx("icon")} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Tối thiểu 8 ký tự"
                className={errors.password ? cx("inputError") : ""}
                {...register("password", {
                  required: "Vui lòng nhập mật khẩu",
                  minLength: {
                    value: 8,
                    message: "Mật khẩu phải có ít nhất 8 ký tự",
                  },
                })}
              />
              <button
                type="button"
                className={cx("togglePasswordBtn")}
                onClick={() => setShowPassword(!showPassword)}
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

          <div className={`${cx("formGroup")} animate-fadeUp delay-600`}>
            <label>Nhập lại mật khẩu</label>
            <div className={cx("inputWrapper")}>
              <FaLock className={cx("icon")} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Xác nhận mật khẩu"
                className={errors.confirmPassword ? cx("inputError") : ""}
                {...register("confirmPassword", {
                  required: "Vui lòng xác nhận mật khẩu",
                  validate: (val) => val === password || "Mật khẩu không khớp",
                })}
              />
              <button
                type="button"
                className={cx("togglePasswordBtn")}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={
                  showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"
                }
              >
                {showConfirmPassword ? (
                  <FaEye className={cx("toggleIcon")} />
                ) : (
                  <FaEyeSlash className={cx("toggleIcon")} />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className={`${cx("errorMsg")} animate-shake`}>
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          {errors.root && (
            <div
              className={`${cx("errorMsg")} animate-shake`}
              style={{ textAlign: "center", marginBottom: "1rem" }}
            >
              {errors.root.message}
            </div>
          )}

          <div className="animate-fadeUp delay-700">
            <Button
              primary
              shine
              scale
              width="100%"
              large
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <FaSpinner className="spin-loading" />
              ) : (
                "Đăng Ký Tài Khoản"
              )}
            </Button>
          </div>
        </form>

        <div className={`${cx("footer")} animate-fadeIn delay-800`}>
          Đã có tài khoản?
          <Button text to="/login" style={{ padding: 0, marginLeft: "5px" }}>
            Đăng nhập ngay
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Register;
