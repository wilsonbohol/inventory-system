const isLocal = window.location.hostname === "localhost";
const backendDomain = isLocal
  ? "http://localhost:8080"
  : "http://192.168.100.16:8080";

const SummaryApi = {
    signUp: {
        url :`${backendDomain}/api/register`,
        method: "post",
    },
    signIn:{
        url:`${backendDomain}/api/signin`,
        method: "post"
    },
    currentUser:{
        url: `${backendDomain}/api/user-details`,
        method: "get",
    },
    logout_user:{
        url: `${backendDomain}/api/userLogout`,
        method: "get",
    },
    allUser:{
        url: `${backendDomain}/api/all-user`,
        method: "get"
    },
    updateUser:{
        url: `${backendDomain}/api/update-user`,
        method: "post"
    },
    addCategory:{
        url: `${backendDomain}/api/add-category`,
        method: "post"
    },
    allCategory:{
        url: `${backendDomain}/api/all-category`,
        method: "get"
    },
    allProductsByCategory: (slug) => ({
         url: `${backendDomain}/api/category/${slug}`, // ✅ add slash and use template correctly
         method: "get",
    }),
    addProduct:{
        url: `${backendDomain}/api/add-product`,
        method: "post"
    },
    updateCategory:{
        url:  `${backendDomain}/api/update-category`,
        method: "post"
    },
    updateProduct:{
        url: `${backendDomain}/api/update-product`,
        method: "post"
    },
    deleteUser: (id) => ({
  url: `${backendDomain}/api/delete-user/${id}`,
  method: "delete",
}),
deleteCategory: (id) => ({
  url: `${backendDomain}/api/delete-category/${id}`,
  method: "delete",
}),

deleteProduct: (id) =>({
    url: `${backendDomain}/api/delete-product/${id}`,
    method: "delete",
}

)
        
    


}

export default SummaryApi