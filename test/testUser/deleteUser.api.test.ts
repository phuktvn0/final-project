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
        name: "test 01",
      })
      .expect(200);

    expect(body).toEqual({
      data: {
        message: "Create User Successfully!",
        user: {
          name: "TEST 01",
          _id: expect.any(String),
          __v: 0,
          createdAt: "2022-12-12T00:00:00.000Z",
          updatedAt: "2022-12-12T00:00:00.000Z",
        },
      },
    });
  });
});

// describe("Get", () => {
//   test("GET /user --> get list of user", async () => {
//     const { status, body } = await request(app).get("/user?name=test 1");

//     expect(status).toEqual(200);
//     expect(body).toEqual({
//       data: {
//         message: "Get User List Successfully!",
//         user: [
//           {
//             name: "TEST 1",
//           },
//         ],
//       },
//     });
//   });
// });

// describe("Put", () => {
//   test("PUT /user --> update data of user", async () => {
//     const { status, body } = await request(app).put("/user").send({
//       name: "test 011",
//     });

//     expect(status).toEqual(200);
//     expect(body).toEqual({
//       data: {
//         message: "Update User Successfully!",
//         user: {
//           name: "TEST 011",
//         },
//       },
//     });
//   });
// });

// describe("Delete", () => {
//   test("DELETE /user --> delete a user", async () => {
//     const { status, body } = await request(app).delete("/user").send({});

//     expect(status).toEqual(200);
//     expect(body).toEqual({
//       data: {
//         message: "Delete User Successfully!",
//         user: {
//           name: "TEST 011",
//         },
//       },
//     });
//   });
// });

// get user beforAll cần
