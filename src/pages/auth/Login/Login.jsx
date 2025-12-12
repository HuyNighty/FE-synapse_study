import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser, FaLock, FaSpinner } from "react-icons/fa";
import authService from "../../../services/authService";

const cx = classNames.bind(styles);

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // 1. Logic xử lý dữ liệu khi form hợp lệ
  const onSubmit = async (data) => {
    // Giả lập delay 800ms để người dùng thấy hiệu ứng xoay (trải nghiệm tốt hơn)
    await new Promise((resolve) => setTimeout(resolve, 800));

    try {
      // Gọi API đăng nhập
      const response = await authService.login(data.username, data.password);

      // Lấy token (đảm bảo backend trả về đúng cấu trúc response.result.token)
      const { token } = response.result;

      // Lưu token
      localStorage.setItem("accessToken", token);

      // Thông báo thành công
      toast.success("Đăng nhập thành công! 🚀");

      // Chuyển hướng về trang chủ
      navigate("/");
    } catch (error) {
      // Xử lý lỗi
      const msg = error.response?.data?.message || "Đăng nhập thất bại";
      toast.error(msg);
    }
  };

  // 2. Hàm bọc để chặn hành vi refresh mặc định của trình duyệt
  const handleSafeSubmit = (e) => {
    e.preventDefault(); // <--- CÂU THẦN CHÚ QUAN TRỌNG NHẤT
    handleSubmit(onSubmit)(e);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={`${cx("container")} animate-scaleIn`}>
        {/* --- Header --- */}
        <div className={cx("header")}>
          <h1 className="animate-fadeSlideDown">Chào mừng trở lại</h1>
          <p className="animate-fadeSlideDown delay-100">
            Đăng nhập vào Synapse
          </p>
        </div>

        {/* --- Form --- */}
        {/* Quan trọng: Gọi handleSafeSubmit ở đây */}
        <form onSubmit={handleSafeSubmit}>
          {/* Username Input */}
          <div className={`${cx("formGroup")} animate-fadeUp delay-200`}>
            <label>Tên tài khoản</label>
            <div className={cx("inputWrapper")}>
              <FaUser className={cx("icon")} />
              <input
                type="text"
                placeholder="Nhập username hoặc email"
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

          {/* Password Input */}
          <div className={`${cx("formGroup")} animate-fadeUp delay-300`}>
            <label>Mật khẩu</label>
            <div className={cx("inputWrapper")}>
              <FaLock className={cx("icon")} />
              <input
                type="password"
                placeholder="Nhập mật khẩu"
                className={errors.password ? cx("inputError") : ""}
                {...register("password", {
                  required: "Vui lòng nhập mật khẩu",
                })}
              />
            </div>
            {errors.password && (
              <span className={`${cx("errorMsg")} animate-shake`}>
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div className="animate-fadeUp delay-400">
            <button
              type="submit"
              className={`${cx("btnSubmit")} hover-lift`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <FaSpinner className="spin-loading" />
              ) : (
                "Đăng Nhập"
              )}
            </button>
          </div>
        </form>

        {/* --- Footer --- */}
        <div className={`${cx("footer")} animate-fadeIn delay-500`}>
          Chưa có tài khoản?{" "}
          <Link to="/register" className="hover-scale">
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
