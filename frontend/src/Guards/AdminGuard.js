function AdminGuard(to, from, next){
    if(localStorage.getItem("Auth")){
        let AuthData = JSON.parse(localStorage.getItem('Auth'));
        if(AuthData.isAdmin){
            next();
        }
    }else{
        next({path: '/'})
    }
}

export default AdminGuard;