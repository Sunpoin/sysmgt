import Index from './views/Index.vue'
import Module from './views/Workspace/Sys/UserCenter/Module.vue'
import Role from './views/Workspace/Sys/UserCenter/Role.vue'
import Usermgt from './views/Workspace/Sys/UserCenter/Usermgt.vue'

const routers = [
    { path: '/', name: 'Default', component: Index },
    { path: '/Workspace/Sys/UserCenter/Module', name: 'Module', component: Module },
    { path: '/Workspace/Sys/UserCenter/Role', name: 'Role', component: Role },
    { path: '/Workspace/Sys/UserCenter/Usermgt', name: 'Usermgt', component: Usermgt },
];
export default routers;