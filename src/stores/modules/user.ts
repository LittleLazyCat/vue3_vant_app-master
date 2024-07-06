import { defineStore } from 'pinia'
import { ref } from 'vue'
// type表明导入的是是ts的类型
import type { User } from '@/types/user'
/**
 * 用户store：存储登录用户相关数据,use×××Store
 */
export const useUserStore = defineStore(
  'consult-user',
  () => {
    // 全局变量1：登录用户
    //空对象的变量通过as类型断言指定类型
    const user = ref({} as User)
    // 方法
    // 1.存储用户信息=>登录成功
    const setUser = (userData: User) => {
      user.value = userData
    }
    // 2.删除用户信息=>退出登录
    const delUser = () => {
      user.value = {} as User
    }
    // 返回变量和方法
    return {
      user,
      setUser,
      delUser
    }
  },
  // 方式1：默认存储所有数据，以store的id作为存储的key
  // {
  //   persist: true //开启数据持久化
  // }

  // 方式2：自定义存储的key，指定存储哪些数据
  {
    persist: {
      key: 'cp-user', //存储的名字
      paths: ['user'] //存储的变量
    }
  }
)
