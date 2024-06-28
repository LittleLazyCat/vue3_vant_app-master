import router from "@/router"
import { defineStore } from "pinia"


type User = {
    username: string
    password: string | number
}

type RS = {
    code: number
    msg: string
    data: any
    token: string
}



export const useUserStore = defineStore('User', {
    // id: 'user',
    state: () => {
        return {
            username: '',
            token: 'is me',
            theme: "light",
            isShowBar: true

        }
    },
    getters: {
        getToken: state => state.token,
        getBar: state => state.isShowBar,

        getTheme(): string {
            return this.theme
        }

    },
    actions: {

        async login(userinfo: User) {

            let result: any = 'fny'
            // console.log(res, 'login');
            if (result && result.code == 200) {
                // console.log(result.token, 'user')
                this.token = result.token
                this.username = result.data.username


                router.push('/')
            } else {

            }

        },
        setBar(path: string) {
            const list = ['/home', '/search', '/collection', '/personal']
            if (list.includes(path)) {  // 检查是否在列表中，如果在则显示，否则隐藏
                this.isShowBar = true;
            } else {
                this.isShowBar = false;
            }
            //bar显示/隐藏
        },
        changeTheme(value: string) {
            this.theme = value
        },

        clear() {
            this.token = ''

        }

    },
    persist: {
        enabled: true,

        strategies: [
            {
                key: 'user_info',
                storage: localStorage,
                // paths: ['token']  // 指定对哪些数据进行缓存
            }
        ]

    }
})
