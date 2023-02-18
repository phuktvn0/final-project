import app from '../../server';
import request from 'supertest';
import * as helper from '../../helper';
import User from '../../models/User';

// beforeAll(); chạy 1 lần trước chạy test, dùng để setup dữ liệu trước khi chạy test
// beforeEach(); chạy mỗi lần trước khi chạy test
// afterEach();
// afterAll(); clean dữ liệu

describe('Get', () => {
  beforeAll(async () => {
    try {
      jest
        .spyOn(helper, 'getCurrentDate')
        .mockReturnValue(new Date('2022-12-12T00:00:00.000Z'));
      const testData = await User.insertMany([
        {
          email: 'test1@gmail.com',
          password: '123',
          name: 'test1',
          phone: '321',
          address: '01 HBT',
          province: 'Bạc Liêu',
          _id: '63eb3f7f60a1ebd0927255d6',
          __v: 0,
          createdAt: '2022-12-12T00:00:00.000Z',
          updatedAt: '2022-12-12T00:00:00.000Z',
          isDelete: false,
        },
        {
          email: 'test2@gmail.com',
          password: '123',
          name: 'test2',
          phone: '321',
          address: '02 HBT',
          province: 'Lào Cai',
          _id: '63eb3f7f60a1ebd0927255d7',
          __v: 0,
          createdAt: '2022-12-12T00:00:00.000Z',
          updatedAt: '2022-12-12T00:00:00.000Z',
          isDelete: false,
        },
        {
          email: 'test3@gmail.net',
          password: '123',
          name: 'test3',
          phone: '321',
          address: '03 HBT',
          province: 'Lâm Đồng',
          _id: '63eb3f7f60a1ebd0927255d8',
          __v: 0,
          createdAt: '2022-12-12T00:00:00.000Z',
          updatedAt: '2022-12-12T00:00:00.000Z',
          isDelete: true,
        },
      ]);
      // console.log(testData);
    } catch (error) {
      console.log(error);
    }
  });

  test('Get /user --> Get all user', async () => {
    const { body } = await request(app).get('/user').expect(200);

    expect(body).toEqual({
      data: {
        message: 'Get User List Successfully!',
        user: [
          {
            email: 'test1@gmail.com',
            password: '123',
            name: 'test1',
            phone: '321',
            address: '01 HBT',
            province: 'Bạc Liêu',
            _id: '63eb3f7f60a1ebd0927255d6',
            __v: 0,
            createdAt: '2022-12-12T00:00:00.000Z',
            updatedAt: '2022-12-12T00:00:00.000Z',
            isDelete: false,
          },
          {
            email: 'test2@gmail.com',
            password: '123',
            name: 'test2',
            phone: '321',
            address: '02 HBT',
            province: 'Lào Cai',
            _id: '63eb3f7f60a1ebd0927255d7',
            __v: 0,
            createdAt: '2022-12-12T00:00:00.000Z',
            updatedAt: '2022-12-12T00:00:00.000Z',
            isDelete: false,
          },
        ],
        page: 1,
        total: 1,
      },
    });
  });

  test('Get /user/63eb3f7f60a1ebd0927255d7 --> Get user by id', async () => {
    const { body } = await request(app)
      .get('/user/63eb3f7f60a1ebd0927255d7')
      .expect(200);

    expect(body).toEqual({
      data: {
        message: 'Get Info User Successfully!',
        user: {
          email: 'test2@gmail.com',
          password: '123',
          name: 'test2',
          phone: '321',
          address: '02 HBT',
          province: 'Lào Cai',
          _id: '63eb3f7f60a1ebd0927255d7',
          __v: 0,
          createdAt: '2022-12-12T00:00:00.000Z',
          updatedAt: '2022-12-12T00:00:00.000Z',
          isDelete: false,
        },
      },
    });
  });

  test('Get /user/63eb3f7f60a1ebd0927255d8 --> isDelete === true', async () => {
    const { body } = await request(app)
      .get('/user/63eb3f7f60a1ebd0927255d8')
      .expect(404);

    expect(body).toEqual({
      message: 'User not exists!',
    });
  });

  test('Get /user?name=test2 --> find user by name', async () => {
    const { body } = await request(app).get('/user?name=test2').expect(200);

    expect(body).toEqual({
      data: {
        message: 'Get User List Successfully!',
        user: [
          {
            email: 'test2@gmail.com',
            password: '123',
            name: 'test2',
            phone: '321',
            address: '02 HBT',
            province: 'Lào Cai',
            _id: '63eb3f7f60a1ebd0927255d7',
            __v: 0,
            createdAt: '2022-12-12T00:00:00.000Z',
            updatedAt: '2022-12-12T00:00:00.000Z',
            isDelete: false,
          },
        ],
        page: 1,
        total: 1,
      },
    });
  });

  test('Get /user?email=test1@gmail.com --> find user by email', async () => {
    const { body } = await request(app)
      .get('/user?email=test1@gmail.com')
      .expect(200);

    expect(body).toEqual({
      data: {
        message: 'Get User List Successfully!',
        user: [
          {
            email: 'test1@gmail.com',
            password: '123',
            name: 'test1',
            phone: '321',
            address: '01 HBT',
            province: 'Bạc Liêu',
            _id: '63eb3f7f60a1ebd0927255d6',
            __v: 0,
            createdAt: '2022-12-12T00:00:00.000Z',
            updatedAt: '2022-12-12T00:00:00.000Z',
            isDelete: false,
          },
        ],
        page: 1,
        total: 1,
      },
    });
  });

  afterAll(async () => {
    helper.disconnect();
  });
});

// get user beforAll cần
