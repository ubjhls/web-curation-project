<template>
    <div class="user" id="login">
        <div class="wrapC" style="text-align: center">
            <h1>오류 페이지입니다.</h1>
            <h2> 페이지로 이동하여 다시 시도해보세요.</h2>
            <div class="btn_wrap" style="margin-top: 50px">
            <button @click="backgo" class="btn btn--cancel" style="background-color: black;">
                뒤로가기
            </button>
            <button @click="homego" class="btn btn--back btn--ok" style="background-color: white; color: black; margin-top:0px">
                메인 화면으로 이동
            </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => {
            return {
                name:"",
                introduce:"",
                nickName:"",
                email:"",
                password:"",
            }
        },
        created(){
            
        },
        watch: {
          
        },
        methods: {
            homego(){
                var router = this.$router;
                router.push("/");
            },
            backgo(){
                var router = this.$router;
                var route = this.$route.params.route;
                if(route == 'Join') {
                    router.push({name:"Join", params:{
                        "nickName" : this.$route.params.nickName,
                        "email" : this.$route.params.email,
                        "password" : this.$route.params.password,
                        "name": this.$route.params.name,
                        "introduce": this.$route.params.introduce,  
                        "route" : this.$route.name
                    }})
                } else if(route == 'Login'){
                    router.push({name:"Login", params:{
                        "email" : this.$route.params.email,
                        "route" : this.$route.name
                    }})
                } else if(route == 'FindPassword'){
                    router.push({name:"FindPassword", params: {
                        "email" : this.$route.params.email,
                        "route" : this.$route.name
                    }})
                }
                
                else {
                    router.push({name:"Login", params:{
                        "route" : this.$route.name
                    }})
                }
            }
        }

    }
</script>
