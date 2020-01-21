<template>
    <div class="user" id="login">
        <div class="wrapC">
            <h1>환영합니다</h1>
            <div class="input-with-label">
                <input
                    v-model="email"
                    v-bind:class="{error : error.email, complete:!error.email&&email.length!==0}"
                    @keyup.enter="login"
                    id="email"
                    placeholder="이메일 주소 입력"
                    type="text"/>
                <label for="email">이메일</label>
                <div class="error-text" v-if="error.email">
                    {{error.email}}
                </div>
            </div>

            <div class="input-with-label">
                <input
                    v-model="password"
                    type="password"
                    v-bind:class="{error : error.password, complete:!error.password&&password.length!==0}"
                    id="password"
                    @keyup.enter="login"
                    placeholder="비밀번호 입력"/>
                <label for="password">비밀번호</label>
                <div class="error-text" v-if="error.password">
                    {{error.password}}

                </div>
            </div>
            <div class="wrap">
                <div style="text-align: right">
                    <router-link v-bind:to="{name:'FindPassword'}" class="btn--text">비밀번호 찾기</router-link>
                </div>
            </div>
            <button
                class="btn btn--back btn--login"
                v-on:click="login"
                :disabled="!isSubmit"
                :class="{disabled : !isSubmit}">
                로그인
            </button>
            <div class="sns-login" style="text-align: center">
                <div class="text">
                    <div class="bar"></div>
                    <div class="p">
                        <kakaoLogin :component="component"/>
                        <GoogleLogin :component="component"/>
                    </div>
                </div>
            </div>
            <div class="add-option">
                <div class="text">
                    <div class="bar"></div>
                </div>

                <div class="wrap" style="text-align: center">
                    <p>아직 회원이 아니신가요?
                    </p>
                    <router-link
                        v-bind:to="{name:'Join'}"
                        class="btn--text"
                        style="text-algin:center">회원가입</router-link>
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
    import KakaoLogin from '../../components/user/snsLogin/Kakao.vue'
    import GoogleLogin from '../../components/user/snsLogin/Google.vue'
    import UserApi from '../../apis/UserApi'

    export default {
        components: {
            KakaoLogin,
            GoogleLogin
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
            }
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