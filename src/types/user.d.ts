/**
 * 用户相关的ts类型
 */
// 1.登录接口返回数据类型
export type User = {
  // [x: string]: User
  token: string
  id: string
  account: string
  mobile: string
  avatar: string
}

// 短信验证码类型
export type CodeType = 'login' | 'register'

// == add 个人信息 ==
// Pick从类型对象中取出指定的属性类型
// Omit从类型对象中排出指定的属性类型，得到剩余的属性类型
type OmitUser = Omit<User, 'token'>
export type UserInfo = OmitUser & {
  likeNumber: number
  collectionNumber: number
  score: number
  couponNumber: number
  orderInfo: {
    paidNumber: number
    receivedNumber: number
    shippedNumber: number
    finishedNumber: number
  }
}
// 家庭档案-患者信息
export type Patient = {
  id?: string
  name: string
  idCard: string
  defaultFlag: 0 | 1
  gender: 0 | 1
  genderValue?: string
  age?: number
}

// 家庭档案-患者信息列表
export type PatientList = Patient[]
