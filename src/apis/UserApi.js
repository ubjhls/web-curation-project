import Axios from "axios";

/*
 User API 예시
 */
const requestLogin = (data,callback,errorCallback) => {
    //백앤드와 로그인 통신하는 부분
    let form = new FormData()
    form.append('email', data.email)
    form.append('password', data.password)
    
    Axios.post("http://192.168.31.103:8080/account/login", form)
        .then(Response => {
            console.log("response : ", JSON.stringify(Response, null, 2));
            if(Response.data.data == "success"){
                callback("success", callback);
            } else {
                callback("failed", callback);
            }
        })
        .catch(Error => {
            console.log("failed", errorCallback);
            errorCallback();
        })
}

const requestJoin = (data,callback,errorCallback) => {
    Axios.post("http://192.168.31.103:8080/account/signup", {
        nickname:data.nickName,
        email:data.email,
        password:data.password
    })
        .then(Response => {
            console.log("response : ", JSON.stringify(Response, null, 2));
            if(Response.data.data == "hasNick") {
                callback("hasNick", callback);
            } else if(Response.data.data == "hasEmail") {
                callback("hasEmail", callback);
            } else if(Response.data.data == "success") {
                callback("success", callback);
            } else {
                callback("failed", callback);
            }
        })
        .catch(Error => {
            console.log("failed", errorCallback);
            errorCallback();
        })
}

const requestFindPassword = (data,callback,errorCallback) => {
        let form = new FormData()
        form.append('email', data)
        Axios.post("http://192.168.31.103:8080/account/findPassword", form)
        .then(Response => {
            console.log("response : ", JSON.stringify(Response, null, 2));
            if(Response.data.data == "success"){
                callback("success", callback);
            } else {
                callback("failed", callback);
            }
        })
        .catch(Error => {
            console.log("failed", errorCallback);
            errorCallback();
        })
}

const UserApi = {
    requestLogin:(data,callback,errorCallback)=>requestLogin(data,callback,errorCallback),
    requestJoin:(data,callback,errorCallback)=>requestJoin(data,callback,errorCallback),
    requestFindPassword:(data,callback,errorCallback)=>requestFindPassword(data,callback,errorCallback),

}

export default UserApi