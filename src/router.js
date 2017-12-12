import Index from './views/Index.vue'
import Module from './views/UserMgt/Module.vue'
import Role from './views/UserMgt/Role.vue'
import UserInfo from './views/UserMgt/UserInfo.vue'

const routers = [
    { path: '/', name: 'Default', component: Index },
    { path: '/Index', name: 'Index', component: Index },
    { path: '/UserMgt/Module', name: 'Module', component: Module },
    { path: '/UserMgt/Role', name: 'Role', component: Role },
    { path: '/UserMgt/UserInfo', name: 'UserInfo', component: UserInfo },
];
export default routers;