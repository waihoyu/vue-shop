<template>
<el-container class="home-container">
    <el-header>
        <div>
            <img src="../assets/logo.jpg" alt="">
            <span>电商后台管理系统</span>
        </div>
        <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
        <el-aside :width="isCollapse?'64px':'200px'">
            <div class="toggle-button" @click="toggleCollapse">
                |||||
            </div>
            <!-- background-color="#333744" -->
            <el-menu :unique-opened="true" class="el-menu-vertical-demo" :collapse="isCollapse" :router="true" :collapse-transition="false"  :default-active="activePath">
                <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>{{item.authName}}</span>
                    </template>
                    <el-menu-item :index="'/' + item.path" v-for="item in item.children" :key="item.id" @click="saveNavState('/' + item.path)">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>{{item.authName}}</span>
                        </template>
                        </el-menu-item>
                </el-submenu>

            </el-menu>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</el-container>
</template>

<script>
export default {
    data() {
        return {
            menuList: [],
            isCollapse: false,
            activePath: '',
        }
    },
    created() {
        this.getMenuList();
        this.activePath = window.sessionStorage.getItem('activePath');
    },
    methods: {
        saveNavState(activePath) {
            window.sessionStorage.setItem('activePath', activePath);
            this.activePath = activePath;
        },
        toggleCollapse() {
            this.isCollapse = !this.isCollapse;
        },
        logout() {
            window.sessionStorage.clear();
            this.$router.push('/login');
        },
        async getMenuList() {
            const {
                data: res
            } = await this.$http.get('menus');
            if (res.meta.status !== 200) {
                //  return  this.$message.error(res.meta.msg);  
            }
            this.menuList = [{
                id: 1,
                authName: "用户管理",
                children: [{
                    id: 0,
                    authName: "用户列表",
                    path: 'users'
                }, {
                    id: 1,
                    authName: "新增用户",
                    path: 'addusers'
                }, {
                    id: 2,
                    authName: "删除用户"
                }, {
                    id: 3,
                    authName: "冻结用户"
                }, {
                    id: 4,
                    authName: "修改用户"
                }]
            }, {
                id: 2,
                authName: "设置管理",
                children: [{
                    id: 1,
                    authName: "原始设置"
                }]
            }];
        }
    },
}
</script>

<style lang="less" scoped>
.el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;

    >div {
        display: flex;
        align-items: center;

        span {
            margin-left: 15px;
        }
    }

    img {
        width: 30px;
        height: 30px;
    }
}

.el-aside {
    background-color: #333744;

    .el-menu {
        border-right: none;
    }
}

.el-main {
    background-color: #eaedf1;
}

.home-container {
    height: 100%;
}

.toggle-button {
    background-color: #4A5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}
</style>
