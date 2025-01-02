"use client";

import { getAccessTokenFormLocalStorage } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

const menuItems = [
  {
    title: "Món ăn",
    href: "/menu", // authRequired = undefined co nghia la dang nhap hay chua thi van se cho hien thi
  },
  {
    title: "Đơn hàng",
    href: "/orders",
    authRequired: true, // khi true nghia la phai dang nhap moi hien thi
  },
  {
    title: "Đăng nhập",
    href: "/login",
    authRequired: false, // khi false nghia la chua dang nhap se hiển thị
  },
  {
    title: "Quản lý",
    href: "/manage/dashboard",
    authRequired: true, // dang nhap roi moi hien thi
  },
];

// SERVER:  Mon an , dang nhap. Do server khong biet duoc trang thai dang nhap hay chua dang nhap

// CLIENT: dau tien client se hien thi mon an, dang nhap. Khi client dang nhap roi thi se hien thi don hang, quan ly do da check duoc trang thai

export default function NavItems({ className }: { className?: string }) {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    setIsAuth(Boolean(getAccessTokenFormLocalStorage()));
  }, []);

  return menuItems.map((item) => {
    if (
      (item.authRequired === false && isAuth) ||
      (item.authRequired === true && !isAuth)
    )
      return null;
    return (
      <Link href={item.href} key={item.href} className={className}>
        {item.title}
      </Link>
    );
  });
}
