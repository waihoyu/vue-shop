<template>
<div class="login_container">
    <div class="login_box">
        <div class="avatar_box">
            <img src="../assets/logo.jpg" alt="">
        </div>
        <el-form  ref="loginFormRef" :model="loginForm" :rules="rules" label-width="0px" class="login_form">
            <el-form-item prop="username">
                <el-input v-model="loginForm.username" prefix-icon="iconfont iconyonghu"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input type="password" v-model="loginForm.password" prefix-icon="iconfont iconsuo"></el-input>
            </el-form-item>
            <el-form-item class="btns">
                <el-button type="primary" @click="login">登陆</el-button>
                <el-button type="info" @click="resetLoginForm">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</div>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            loginForm: {
                username: '',
                password: ""
            },
            rules: {
                username: [{
                        required: true,
                        message: '请输入登陆名称',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 5,
                        message: '长度在 3 到 5 个字符',
                        trigger: 'blur'
                    }
                ],
            }
        }
    },
    methods: {
        //点击重置按钮
        resetLoginForm(){
            this.$refs.loginFormRef.resetFields();
        },
        login(){
           this.$refs.loginFormRef.validate( async(value)=>{
               if (!value) {
                     return   
               }
               const {data:res} =  await this.$http.post('login',this.loginForm)
            //    if (res.meta.status !== 200) {
            //         return this.$message.error('失败');
            //    }
               this.$message.success('登陆成功');
                window.sessionStorage.setItem('token',res.data);
               this.$router.push('/home');
           }) 
        }
    },
}
</script>

<style lang="less" scoped>
.login_container {
    background-color: red;
    height: 100%;
}

.login_box {
    width: 450px;
    height: 300px;
    background-color: #Fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .avatar_box {
        height: 130px;
        width: 130px;
        border: solid 1px #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0px 10px #ddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #Fff;

        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }
}

.login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}

.btns {
    display: flex;
    justify-content: flex-end;
    // align-items: right;
}
</style>
