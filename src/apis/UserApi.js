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
const requestCheckNick = (data, callback, errorCallback) => {
    //백앤드와 닉네임 중복체크 통신하는 부분

    let form = new FormData();
    form.append('nickname', data.nickName);
    
    return Axios.post('http://192.168.31.103:8080/account/checkNick', 
    form).then( response => {
            callback(response.data.status);
            console.log('response', response.data);
        }).catch( error => {
            errorCallback();
            console.log('failed', error);
        });
}
const requestCheckEmail= (data, callback, errorCallback) => {
    //백앤드와 닉네임 중복체크 통신하는 부분

    let form = new FormData();
    form.append('email', data.email);
    
    return Axios.post('http://192.168.31.103:8080/account/checkEmail', 
    form).then( response => {
            callback(response.data.status);
            console.log('response', response.data);
        }).catch( error => {
            errorCallback();
            console.log('failed', error);
        });
}
const requestJoin = (data,callback,errorCallback) => {
    Axios.post("http://192.168.31.103:8080/account/signUp", {
        email:data.email,
        nickname:data.nickName,
        name:data.name,
        password:data.password,
        intro:data.intro,
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
    requestCheckNick:(data,callback,errorCallback)=>requestCheckNick(data,callback,errorCallback),
    requestCheckEmail:(data,callback,errorCallback)=>requestCheckEmail(data,callback,errorCallback),
}

export default UserApi