<template>
    <div class="user" id="login">
        <div class="wrapC">
            <h1>음.. 아마</h1>
            <h1>스팸함에 들어가 있을지도 몰라요</h1>
            <h1>혹시 확인해 보셨나요?</h1>

            <router-link v-bind:to="{name:'Login'}">
                <button class="btn btn--cancel" style="background-color: green;">
                    로그인 하러 가기
                </button>
            </router-link>
            <button @click="resendgo" class="btn btn--back btn--ok" style="background-color: white; color: black; margin-top:0px">
                정말로 이메일이 도착하지 않았어요
            </button>
        </div>
    </div>
</template>

<script>

    import '../../assets/css/style.scss'
    import '../../assets/css/user.scss'
 
    export default {
        components: {
        
        },
        created(){
    
        },
        watch: {
          
        },
        methods: {
            resendgo(){
                this.email = this.$route.params.email
                this.password = this.$route.params.password
                this.nickName = this.$route.params.nickName
                var router = this.$router;
                router.push({name:"SendEmail",params:{"nickName":this.nickName,
                "email":this.email,
                "password":this.password}});
            }
        },
        data: () => {
            return {
                
                email: "",
                password:"",
                nickName:""

            }
        }

    }

</script>
