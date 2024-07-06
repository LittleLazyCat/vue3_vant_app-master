import type {
  KnowledgePage,
  KnowledgeParams,
  DoctorPage,
  PageParams,
  FollowType,
  TopDep,
  Image,
  ConsultOrderPreData,
  ConsultOrderPreParams,
  PartialConsult,
  ConsultOrderItem,
  ConsultOrderListParams,
  ConsultOrderPage
} from '@/types/consult'
import { request } from '@/utils/request'

export const getKnowledgePage = (params: KnowledgeParams) =>
  request.get<any, KnowledgePage>('/patient/home/knowledge', { params })

export const getDoctorPage = (params: PageParams) =>
  request.get<any, DoctorPage>('/home/page/doc', { params })

export const followDoctor = (id: string, type: FollowType = 'doc') =>
  request.post('/like', { id, type })

export const getAllDep = () => request.get<TopDep[]>('/dep/all')

// 上传病情描述图片
export const uploadImage = (file: File) => {
  const fd = new FormData()
  // 说明：formData对象的key属性值后台定义
  fd.append('file', file)
  // =====4.7报错待解析：return request.post<any, Image>('/upload', fd)
  return request.post<Image>('/upload', fd)
}

// 拉取预支付订单信息
export const getConsultOrderPre = (params: ConsultOrderPreParams) =>
  request.get<ConsultOrderPreData>('/patient/consult/order/pre', { params })

// 生成订单
export const createConsultOrder = (data: PartialConsult) =>
  request.post<{ id: string }>('/patient/consult/order', data)

// 获取支付地址  0 是微信  1 支付宝
export const getConsultOrderPayUrl = (data: {
  paymentMethod: 0 | 1
  orderId: string
  payCallback: string
}) => request.post<{ payUrl: string }>('/patient/consult/pay', data)

// 获取订单详情
export const getConsultOrderDetail = (orderId: string) =>
  request.get<any, ConsultOrderItem>('/patient/consult/order/detail', { params: { orderId } })

// 查看处方
export const getPrescriptionPic = (id: string) =>
  request.get<{ url: string }>(`/patient/consult/prescription/${id}`)

// 评价问诊
export const evaluateConsultOrder = (data: {
  docId: string // 医生ID
  orderId: string // 订单ID
  score: number // 评价星级
  content: string // 评价留言
  anonymousFlag: 0 | 1 // 是否匿名评价：1匿名 0实名
}) => request.post('/patient/order/evaluate', data)

// 获取问诊订单记录列表
export const getConsultOrderList = (params: ConsultOrderListParams) =>
  request.get<ConsultOrderPage>('/patient/consult/order/list', { params })

// 取消订单
export const cancelOrder = (id: string) => request.put(`/patient/order/cancel/${id}`)

// 删除订单
export const deleteOrder = (id: string) => request.delete(`/patient/order/${id}`)
