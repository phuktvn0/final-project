import app from "../../server";
import request from "supertest";
import * as helper from "../../helper";

// beforeAll(); chạy 1 lần trước chạy test, dùng để setup dữ liệu trước khi chạy test
// beforeEach(); chạy mỗi lần trước khi chạy test
// afterEach();
// afterAll(); clean dữ liệu

// Post

describe("Posts", () => {
  beforeAll(() => {
    jest
      .spyOn(helper, "getCurrentDate")
      .mockReturnValue(new Date("2022-12-12T00:00:00.000Z"));
  });
  test("POST /user --> create new user", async () => {
    const { body } = await request(app)
      .post("/user")
      .send({
        email: "test@gmail.com",
        password: "123",
        repeat_password: "123",
        name: "test",
        phone: "321",
        address: "01 HBT",
        province: "Bạc Liêu",
      })
      .expect(200);

    expect(body).toEqual({
      data: {
        message: "Create User Successfully!",
        user: {
          email: "test1@gmail.com",
          password: "123",
          name: "test1",
          phone: "321",
          address: "01 HBT",
          province: "Bạc Liêu",
          _id: expect.any(String),
          __v: 0,
          createdAt: "2022-12-12T00:00:00.000Z",
          updatedAt: "2022-12-12T00:00:00.000Z",
          isDelete: false,
        },
      },
    });
  });
  
  test("POST /user --> missing data", async () => {
    const { body } = await request(app).post("/user").send({}).expect(400);

    expect(body).toEqual({
      message:
        '"email" is required. "password" is required. "name" is required. "phone" is required. "address" is required. "province" is required',
    });
  });
  test("POST /user --> wrong password", async () => {
    const { body } = await request(app)
      .post("/user")
      .send({
        email: "phuktvn@gmail.com",
        password: "123",
        repeat_password: "1233",
        name: "phu",
        phone: "0326858179",
        address: "01HBT",
        province: "Kon Tum",
      })
      .expect(400);

    expect(body).toEqual({
      message: '"repeat_password" must be [ref:password]',
    });
  });
  test("POST /user --> wrong province", async () => {
    const { body } = await request(app)
      .post("/user")
      .send({
        email: "phuktvn@gmail.com",
        password: "123",
        repeat_password: "123",
        name: "phu",
        phone: "0326858179",
        address: "01HBT",
        province: "KonTum",
      })
      .expect(400);

    expect(body).toEqual({
      message:
        '"province" must be one of [An Giang, Kiên Giang, Bà Rịa - Vũng Tàu, Kon Tum, Bắc Giang, Lai Châu, Bắc Kạn, Lâm Đồng, Bạc Liêu, Lạng Sơn, Bắc Ninh, Lào Cai, Bến Tre, Long An, Bình Định, Nam Định, Bình Dương, Nghệ An, Bình Phước, Ninh Bình, Bình Thuận, Ninh Thuận, Cà Mau, Phú Thọ, Cần Thơ, Phú Yên, Cao Bằng, Quảng Bình, Đà Nẵng, Quảng Nam, Đắk Lắk, Quảng Ngãi, Đắk Nông, Quảng Ninh, Điện Biên, Quảng Trị, Đồng Nai, Sóc Trăng, Đồng Tháp, Sơn La, Gia Lai, Tây Ninh, Hà Giang, Thái Bình, Hà Nam, Thái Nguyên, Hà Nội, Thanh Hóa, Hà Tĩnh, Thừa Thiên Huế, Hải Dương, Tiền Giang, Hải Phòng, TP Hồ Chí Minh, Hậu Giang, Trà Vinh, Hòa Bình, Tuyên Quang, Hưng Yên, Vĩnh Long, Khánh Hòa, Vĩnh Phúc, Yên Bái]',
    });
  });
  afterAll(async () => {
    helper.disconnect();
  });
});
