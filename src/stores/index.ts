/**
 * 创建pinia实例并导出
 */
import { createPinia } from 'pinia'
// 导入持久化插件
//import persisted from 'pinia-plugin-persistedstate'
//1.创建pinia实例
const pinia = createPinia()
// 注册持久化插件
//pinia.use(persisted)
//2.导出pinia实例
export default pinia
// 模块统一导出
export * from '../stores/modules/user'
export * from '../stores/modules/consult'
