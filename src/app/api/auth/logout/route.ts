import { cookies } from "next/headers";
import { authApiRequest } from "@/apiRequests/auth";
export async function POST(request: Request) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  if (!accessToken || !refreshToken) {
    return Response.json({ message: "Bạn chưa đăng nhập" }, { status: 200 });
  }

  try {
    const result = await authApiRequest.serverLogout({
      accessToken,
      refreshToken,
    });
    return Response.json(result.payload);
  } catch (error) {
    return Response.json(
      { message: "Lỗi khi gọi API đên server backend" },
      { status: 200 }
    );
  }
}
