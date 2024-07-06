/**
 * 问诊仓库
 */
import type { ConsultType } from '@/enums'
import type { PartialConsult, illnessType } from '@/types/consult'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConsultStore = defineStore(
  'cp-consult',
  () => {
    /**
     * 定义全局共享数据
     */
    // 1.问诊记录数据，创建订单使用
    const consult = ref<PartialConsult>({})
    // 2.修改问诊类型type方法：1找医生 2极速问诊 3开药问诊
    const setType = (type: ConsultType) => (consult.value.type = type)
    // 3.修改极速问诊类型illnessType方法：0普通 1三甲
    const setIllnessType = (type: 0 | 1) => (consult.value.illnessType = type)
    // 4.修改科室id方法
    const setDep = (id: string) => (consult.value.depId = id)
    // 5.修改病情描述相关信息方法：illnessDesc、illnessTime、consultFlag、pictures
    const setIllness = (illness: illnessType) => {
      consult.value.illnessDesc = illness.illnessDesc
      consult.value.illnessTime = illness.illnessTime
      consult.value.consultFlag = illness.consultFlag
      consult.value.pictures = illness.pictures
    }
    // 6.修改患者patientId的方法
    const setPatient = (id: string) => (consult.value.patientId = id)
    // 7.修改优惠卷couponId的方法
    const setCoupon = (id?: string) => (consult.value.couponId = id)
    // 8.清空问诊记录方法
    const clear = () => (consult.value = {})
    return { consult, setType, setIllnessType, setDep, setIllness, setPatient, setCoupon, clear }
  },
  {
    persist: true
  }
)
