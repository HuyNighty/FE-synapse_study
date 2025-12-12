import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService"; // Import service
import { toast } from "react-toastify";

function Home() {
  const [user, setUser] = useState(null); // Biến lưu thông tin user
  const navigate = useNavigate();

  // useEffect chạy 1 lần duy nhất khi Component được vẽ ra (Mount)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Gọi API lấy thông tin
        const response = await authService.getMyInfo();

        // Lưu thông tin vào State
        setUser(response.result);
      } catch (error) {
        // Nếu lỗi (Token hết hạn hoặc server lỗi) -> Đá về Login
        toast.error("Phiên đăng nhập hết hạn");
        navigate("/login");
      }
    };

    fetchProfile();
  }, []); // [] rỗng nghĩa là chỉ chạy 1 lần

  // Hàm đăng xuất
  const handleLogout = () => {
    authService.logout();
    navigate("/login");
    toast.info("Đã đăng xuất");
  };

  // Nếu chưa có dữ liệu user thì hiện Loading
  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        Đang tải thông tin...
      </div>
    );
  }

  // Khi đã có dữ liệu thì hiển thị ra
  return (
    <div style={{ padding: "20px" }}>
      <h1>Trang chủ 🏠</h1>

      <div className="card" style={{ maxWidth: "400px", margin: "20px auto" }}>
        <h2>Xin chào, {user.username}! 👋</h2>

        <div style={{ textAlign: "left", marginTop: "10px" }}>
          <p>
            <strong>ID:</strong> {user.id}
          </p>
          <p>
            <strong>Họ tên:</strong> {user.firstName} {user.lastName}
          </p>
          <p>
            <strong>Email:</strong> {user.email || "Chưa cập nhật"}
          </p>

          {/* Hiển thị Role nếu có */}
          <p>
            <strong>Vai trò:</strong>{" "}
            {user.roles?.map((role) => role.name).join(", ")}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="btn btn-secondary"
          style={{
            marginTop: "20px",
            backgroundColor: "#dc3545",
            color: "white",
          }}
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
}

export default Home;
