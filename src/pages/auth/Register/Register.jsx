import classNames from "classnames/bind";
import styles from "./Login.module.scss"; // Tận dụng lại CSS của Login cho đồng bộ
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaIdCard,
  FaSpinner,
} from "react-icons/fa";
import authService from "../../services/authService";

const cx = classNames.bind(styles);

function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  // Theo dõi giá trị password để check khớp với confirmPassword
  const password = watch("password");

  const onSubmit = async (data) => {
    // Giả lập delay loading
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      await authService.register({
        username: data.username,
        password: data.password,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
      });

      toast.success("Đăng ký thành công! Hãy đăng nhập. 🎉");
      navigate("/login"); // Chuyển về trang Login
    } catch (error) {
      const msg = error.response?.data?.message || "Đăng ký thất bại";
      toast.error(msg);
    }
  };

  return (
    <div className={cx("wrapper")}>
      {/* Container rộng hơn xíu cho form đăng ký */}
      <div
        className={`${cx("container")} animate-scaleIn`}
        style={{ maxWidth: "500px" }}
      >
        <div className={cx("header")}>
          <h1 className="animate-fadeSlideDown">Tạo tài khoản</h1>
          <p className="animate-fadeSlideDown delay-100">
            Tham gia cộng đồng Synapse ngay
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* --- Họ & Tên (Xếp cùng 1 dòng) --- */}
          <div
            style={{ display: "flex", gap: "15px" }}
            className="animate-fadeUp delay-200"
          >
            <div className={cx("formGroup")} style={{ flex: 1 }}>
              <label>Họ</label>
              <div className={cx("inputWrapper")}>
                <FaIdCard className={cx("icon")} />
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
                <FaIdCard className={cx("icon")} />
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

          {/* --- Email --- */}
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

          {/* --- Username --- */}
          <div className={`${cx("formGroup")} animate-fadeUp delay-400`}>
            <label>Tên đăng nhập</label>
            <div className={cx("inputWrapper")}>
              <FaUser className={cx("icon")} />
              <input
                type="text"
                placeholder="Chọn username độc nhất"
                className={errors.username ? cx("inputError") : ""}
                {...register("username", {
                  required: "Vui lòng nhập username",
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

          {/* --- Password --- */}
          <div className={`${cx("formGroup")} animate-fadeUp delay-500`}>
            <label>Mật khẩu</label>
            <div className={cx("inputWrapper")}>
              <FaLock className={cx("icon")} />
              <input
                type="password"
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
            </div>
            {errors.password && (
              <span className={`${cx("errorMsg")} animate-shake`}>
                {errors.password.message}
              </span>
            )}
          </div>

          {/* --- Confirm Password --- */}
          <div className={`${cx("formGroup")} animate-fadeUp delay-600`}>
            <label>Nhập lại mật khẩu</label>
            <div className={cx("inputWrapper")}>
              <FaLock className={cx("icon")} />
              <input
                type="password"
                placeholder="Xác nhận mật khẩu"
                className={errors.confirmPassword ? cx("inputError") : ""}
                {...register("confirmPassword", {
                  required: "Vui lòng xác nhận mật khẩu",
                  validate: (val) => val === password || "Mật khẩu không khớp",
                })}
              />
            </div>
            {errors.confirmPassword && (
              <span className={`${cx("errorMsg")} animate-shake`}>
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          {/* --- Button --- */}
          <div className="animate-fadeUp delay-700">
            <button
              type="submit"
              className={`${cx("btnSubmit")} hover-lift`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <FaSpinner className="spin-loading" />
              ) : (
                "Đăng Ký Tài Khoản"
              )}
            </button>
          </div>
        </form>

        <div className={`${cx("footer")} animate-fadeIn delay-800`}>
          Đã có tài khoản?
          <Link to="/login" className="hover-scale">
            Đăng nhập ngay
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
