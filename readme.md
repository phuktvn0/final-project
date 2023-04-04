## User stories

- Người dùng bình thường:
  tạo tài khoản,
  đăng nhập,
  xem thông tin cá nhân,
  đổi mật khẩu,
  xem các sản phẩm đang bán,
  thêm đồ vào giỏ hàng,
  đặt hàng,
  xem trạng thái đơn hàng,

- Admin:
  xem tất cả đơn hàng,
  cật nhật trạng thái đơn hàng ( thanh toán, giao hàng),
  thêm sản phẩm,
  xóa sản phẩm,
  sửa sản phẩm,
  xem toàn bộ danh sách người dùng,

## Product API /api/products

Get /:id
lấy dữ liệu 1 product

Get /
lấy dữ liệu toàn bộ product

Get /admin/all
lấy dữ liệu toàn bộ product với quyền admin

Post /
tạo product yêu cầu admin

Post /:id/review
đăng review

Put /:id
sửa product yêu cầu admin

Delete /:id
xóa product yêu cầu admin

## User API /api/users

Get /
lấy toàn bộ dữ liệu người dùng

Get /profile/:id
lấy dữ liệu 1 người dùng

Post /
tạo người dùng mới

Post /login
đăng nhập

Put /profile/:id
cập nhật thông tin người dùng

## Order API /api/orders

Get /
lấy toàn bộ dữ liệu order

Get /admin/all
lấy toàn bộ dữ liệu order với quyền admin

Get /:id
lấy dữ liệu 1 order

Post /
tạo order

Put /pay/:id
cập nhật trạng thái thanh toán

Put /delivered/:id
cập nhật trạng thái giao hàng
