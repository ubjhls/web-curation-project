<template>
    <div class="user" id="login">
        <div class="wrapC">
            <h1>환영합니다</h1>
            <!-- <div class="input-with-label"> -->
            <div>
                <div>
                    <v-text-field label="이메일 주소 입력" hide-details="dd"
                    v-model="email"
                    v-bind:class="{error : error.email, complete:!error.email&&email.length!==0}"
                    @keyup.enter="login"
                    style="color:blue"
                    id="email"></v-text-field>
                </div>
                <div class="error-text" v-if="error.email">
                    {{error.email}}
                </div>
            </div>
            <br>

            <div>
                <div class="password-input">
                    <v-text-field label="비밀번호 입력" hide-details="auto"
                    v-model="password"
                    type="password"
                    v-bind:class="{error : error.password, complete:!error.password&&password.length!==0}"
                    id="password"
                    @keyup.enter="login"
                    style="color:blue"></v-text-field>
                </div>
                <br>
                <div class="error-text" v-if="error.password">
                    {{error.password}}

                </div>
            </div>
            <br>
            <button
                class="btn btn--back btn--ok"
                v-on:click="login"
                :disabled="!isSubmit"
                :class="{disabled : !isSubmit}">
                로 그 인
            </button>
            <div class="sns-login" style="text-align: center">
                <div class="text">
                    <!-- <div class="bar"></div> -->
                    <br><br>
                    <div style="text-align:left">
                        sns 로그인
                    </div>
                    <br>
                    <div class="p">
                        <img src="../../assets/images/naver.png" style="width:100%">
                        <KakaoLogin
                            api-key="SC5eIxqbJLO7c23bwwDTc80XEYY5sh8w"
                            image="kakao_account_login_btn_medium_narrow"
                            :on-success=onSuccess
                            :on-failure=onFailure
                            />
                        <!-- <img src="../../assets/images/kakao.png" style="width:100%"> -->
                        <!-- <kakaoLogin :component="component"/> -->
                        <!-- <GoogleLogin :component="component"/> -->
                    </div>
                </div>
            </div>
            <div class="add-option">
                <div class="text">
                    <!-- <div class="bar"></div> -->
                    <br>
                    <hr>
                </div>

                <div class="wrap" style="text-align: center;">
                    <div style="width:50%; height:100%; float:left; padding-top:5%">
                    <router-link
                        v-bind:to="{name:'Join'}"
                        class="btn--text"
                        style="text-algin:center; width:100%; height:100%">회 원 가 입</router-link>
                    </div>
                    <div style="width:50%; float:left; padding-top:5%">
                    <router-link
                        v-bind:to="{name:'FindPassword'}"
                        class="btn--text"
                        style="text-algin:center">비 밀 번 호 찾 기</router-link>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>

    import '../../assets/css/style.scss'
    import '../../assets/css/user.scss'
    import PV from 'password-validator'
    import * as EmailValidator from 'email-validator';
    import KakaoLogin from 'vue-kakao-login'
    // import KakaoLogin from '../../components/user/snsLogin/Kakao.vue'
    // import GoogleLogin from '../../components/user/snsLogin/Google.vue'
    import UserApi from '../../apis/UserApi'
    //KAKAO
    let onSuccess = (data) => {
        console.log(data)
        console.log("success")
    }
    let onFailure = (data) => {
        console.log(data)
        console.log("failure")
    }
    ///////

    export default {
        components: {
            KakaoLogin
            // GoogleLogin
        },
        created() {
            this.component = this;
            this
                .passwordSchema
                .is().min(8)
                .is().max(100)
                .has()
                .digits()
                .has()
                .letters();

            if(this.$route.params.email != null){
                this.email = this.$route.params.email;
            }
        },
        watch: {
            password: function (v) {
                this.checkForm();
            },
            email: function (v) {
                this.checkForm();
            }
        },
        methods: {
            checkForm() {
                if (this.email.length >= 0 && !EmailValidator.validate(this.email)) 
                    this.error.email = "이메일 형식이 아닙니다."
                else 
                    this.error.email = false;
                
                if (this.password.length >= 0 && !this.passwordSchema.validate(this.password)) 
                    this.error.password = '영문,숫자 포함 8 자리이상이어야 합니다.'
                else 
                    this.error.password = false;
                
                let isSubmit = true;
                Object
                    .values(this.error)
                    .map(v => {
                        if (v) 
                            isSubmit = false;
                        }
                    )
                this.isSubmit = isSubmit;

            },
            login() {
                if (this.isSubmit) {
                    let {email, password} = this;
                    let data = {
                        email,
                        password
                    }
                    if (this.email.charAt(0) >= 'A' && this.email.charAt(0) <= 'Z') {
                        this.email = email.toLowerCase();
                    }
                    console.log(email);
                    console.log(password);
                    //요청 후에는 버튼 비활성화
                    this.isSubmit = false;
                    UserApi.requestLogin(data, res => {
                        if(res == 'success') {
                            alert("로그인에 성공했습니다.");
                        } else {
                            alert("존재하지 않는 아이디거나 비밀번호가 일치하지 않습니다.");
                            this.password = '';
                        }
                        //통신을 통해 전달받은 값 콘솔에 출력 console.log(res); 요청이 끝나면 버튼 활성화
                        this.isSubmit = true;
                    }, error => {
                        this.isSubmit = true;
                        var router = this.$router;
                        router.push({name:"ErrorPage", params:{
                            "email" : this.email,
                            "password" : this.password,
                            "route" : this.$route.name
                        }});
                    })
                    
                }
            },
            onSuccess,
            onFailure
        },
        data: () => {
            return {
                email: '',
                password: '',
                passwordSchema: new PV(),
                error: {
                    email: false,
                    password: false
                },
                isSubmit: false,
                component: this
            }
        }

    }
</script>