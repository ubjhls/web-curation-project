

import Login from './views/user/Login.vue'
import Join from './views/user/Join.vue'
import FindPassword from './views/user/FindPassword.vue'
import FindPasswordSendEmail from './views/user/FindPasswordSendEmail.vue'
import FindPasswordReSendEmail from './views/user/FindPasswordReSendEmail.vue'
import SendEmail from './views/user/SendEmail.vue'
import ReSendEmail from './views/user/ReSendEmail.vue'
import PageNotFound from './views/error/PageNotFound.vue'
import ErrorPage from './views/error/ErrorPage.vue'
import Components from './views/Components.vue'

export default [
    {
        path : '/',
        name : 'Login',
        component : Login,
        props: true
    },
    {
        path : '/user/join',
        name : 'Join',
        component : Join,
        props: true
    },
    {
        path : '/user/FindPassword',
        name : 'FindPassword',
        component : FindPassword,
        props: true
    },
    {
        path : '/user/FindPasswordSendEmail',
        name : 'FindPasswordSendEmail',
        component : FindPasswordSendEmail,
        props: true
    },
    {
        path : '/user/FindPasswordReSendEmail',
        name : 'FindPasswordReSendEmail',
        component : FindPasswordReSendEmail,
        props: true
    },
    {
        path : '/user/SendEmail',
        name : 'SendEmail',
        component : SendEmail,
        props: true
    },
    {
        path : '/user/ReSendEmail',
        name : 'ReSendEmail',
        component : ReSendEmail,
        props: true
    },
    {
        path : '/components',
        name : 'Components',
        component : Components
    },
    {
        path:'*',
        redirect:'/404'
    
    },
    {
        path:'/404',
        component : PageNotFound
    },
    {
        path : '/error/ErrorPage',
        name : 'ErrorPage',
        component : ErrorPage,
        props:true
        
    }

]
