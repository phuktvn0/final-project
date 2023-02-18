import Joi from 'joi';

export const getAllUsersQuerySchema = Joi.object({
  page: Joi.number().default(1),
  limit: Joi.number().default(10),
  isDelete: Joi.boolean().default(false),
  name: Joi.string().trim(),
  _id: Joi.string().hex().length(24),
  email: Joi.string().trim(),
});

export const loginUserBodySchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .trim()
    .required(),
  isDelete: Joi.boolean().default(false),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

export const createUserBodySchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .trim()
    .required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  repeat_password: Joi.ref('password'),
  name: Joi.string().trim().required(),
  _id: Joi.string().hex().length(24),
  phone: Joi.string().trim().required(),
  address: Joi.string().trim().required(),
  province: Joi.string()
    .trim()
    .valid(
      'An Giang',
      'Kiên Giang',
      'Bà Rịa - Vũng Tàu',
      'Kon Tum',
      'Bắc Giang',
      'Lai Châu',
      'Bắc Kạn',
      'Lâm Đồng',
      'Bạc Liêu',
      'Lạng Sơn',
      'Bắc Ninh',
      'Lào Cai',
      'Bến Tre',
      'Long An',
      'Bình Định',
      'Nam Định',
      'Bình Dương',
      'Nghệ An',
      'Bình Phước',
      'Ninh Bình',
      'Bình Thuận',
      'Ninh Thuận',
      'Cà Mau',
      'Phú Thọ',
      'Cần Thơ',
      'Phú Yên',
      'Cao Bằng',
      'Quảng Bình',
      'Đà Nẵng',
      'Quảng Nam',
      'Đắk Lắk',
      'Quảng Ngãi',
      'Đắk Nông',
      'Quảng Ninh',
      'Điện Biên',
      'Quảng Trị',
      'Đồng Nai',
      'Sóc Trăng',
      'Đồng Tháp',
      'Sơn La',
      'Gia Lai',
      'Tây Ninh',
      'Hà Giang',
      'Thái Bình',
      'Hà Nam',
      'Thái Nguyên',
      'Hà Nội',
      'Thanh Hóa',
      'Hà Tĩnh',
      'Thừa Thiên Huế',
      'Hải Dương',
      'Tiền Giang',
      'Hải Phòng',
      'TP Hồ Chí Minh',
      'Hậu Giang',
      'Trà Vinh',
      'Hòa Bình',
      'Tuyên Quang',
      'Hưng Yên',
      'Vĩnh Long',
      'Khánh Hòa',
      'Vĩnh Phúc',
      'Yên Bái',
    )
    .required(),
  isDelete: Joi.boolean().default(false),
});

export const userIdParamSchema = Joi.object({
  _id: Joi.string().hex().length(24),
  isDelete: Joi.boolean().default(false),
});
