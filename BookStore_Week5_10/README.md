# BookStore Online - Tuần 5 đến Tuần 10

## 1. Cài đặt
```bash
npm install
```

## 2. Chạy API giả lập
Mở terminal 1:
```bash
npm run server
```
API chạy cổng `3001`.

- Android Emulator: giữ `API_BASE_URL = http://10.0.2.2:3001`.
- Expo Go trên điện thoại thật: sửa `src/config/api.ts` thành IP LAN của máy tính, ví dụ `http://192.168.1.10:3001`.

## 3. Chạy Expo
Mở terminal 2:
```bash
npx expo start
```

Tài khoản demo: `demo@book.vn` / `123456`.

## Nội dung đã bao phủ
- Tuần 5: Stack + Bottom Tabs custom, Home -> Detail, Cart -> Checkout, Redux store cart/auth/wishlist.
- Tuần 6: json-server, Axios instance, service layer, Promise.all, loading/error, tìm kiếm debounce, lọc category, empty state.
- Tuần 7: đăng nhập/đăng ký, validate, AsyncStorage auto-login, bảo vệ Checkout, review + RatingStars.
- Tuần 8: tăng/giảm số lượng giới hạn tồn kho, debounce cập nhật, xóa có Alert, persist cart/wishlist, wishlist đồng bộ Grid/Detail.
- Tuần 9: checkout, COD/chuyển khoản UI, POST order, xóa giỏ sau thành công, danh sách/chi tiết đơn, sửa hồ sơ.
- Tuần 10: thông báo đọc/chưa đọc, pull-to-refresh Home, cấu hình app và luồng demo end-to-end.
