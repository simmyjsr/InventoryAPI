export const APIEndpoints = {
   
    //Category
    AllCategory: "/Category",

//product
AllProduct: "/Product/AllProduct",
GetProductById: "/Product", 
CreateProduct: "/Product",
//UpdateProduct: (id) => `/Product/${id}`,
UpdateProduct:  "/Product",
DeleteProduct: "/Product",
SearchallProduct: (search) => `/Product/search?search=${encodeURIComponent(search)}`,
GetBrands: "/Product/GetAllBrands",

    //supplier
    AllActiveSupplier: "/Supplier/GetAllActiveSupplier",
    GetSupplierById: "/Supplier",
    CreateSupplier: "/Supplier",
    UpdateSupplier: "/Supplier",
    DeleteSupplier: "/Supplier",

    //Auth
    Login: "/Account/login",

    SignUp1: "/auth/register",

    VerifyOTp: "/auth/verify-otp",
    ResendOTp: "/auth/resend-otp",
    SignUpStep1: "/auth/signup/step-one",
    SignUpStep2: "/auth/signup/step-two",
    GetItems: "/topic/get-all",
    SignUpStep3: "/auth/signup/step-three",
    SignUpStep4: "/auth/signup/step-four",
    SignUpStep5: "/auth/signup/step-five",

    LoginOtp1: "/auth/login-otp",
    hubsocialCategory: "coursecategory/get-by-slug",
    crucialHub: "crucialskillset/get",
    crucialHubAll: "crucialskillset/get-title",
    hubAllCategory: "coursecategory/get-all",
    faqAll: "faqs/get-all",
    topic: "topic/get-all",
    timeComplete: "time/get-all",
    type: "type/get-all",
    goal: "goal/get-all",
    productSocial: "product/get-all",
    exploreCollection: "coursecategory/get-all-with-product-count",
    relatedBlog: "blog/get-all",
    productCourse: "product/get-by-slug",
    courseKordie: "whytakecourse/get-all",
    hubKordie: "learnwithkordie/get-all",
    learnKordieKey: "learnwithkordie/get",
    industry: "industry/get-all",
    interest: "interest/get-all",
    categoryAll: "coursecategory/get-all",
    courseAll: "product/get-all",
    productCourseSingle: "whytakecourse/get-single",
    teams:"course_enrollment_enquiry",
    

    //Impact
    Impact: "impact/get-all",

    //policy
    policy: "content/content-url",

    //about
    about: "about/get-all",

    //Forget Paswoord

    ForgetPassword: "/auth/forget-password",

    Subscribe: "/newsletter",
    ResetPassword: "/auth/reset-password",


    // Why Kordie

    WhyKordie: "/whykordie",

    //plan
    planList: "subscription_plan/get",
    planStripe: "payment/checkout",
    planUserStripe: "payment/checkout-user",
    //user
    userView: "product/recently-viewed",


    //USER
    GetUser:"/auth/profile",
    GetCource:"/product/recently-viewed",
    paymentHistory:"payment/user-payment",
    currentPlan:"user/get-plan",
    enroll:"product/enrolled-course",
    guest:"payment/checkout-guest",
    coursePurchase:"payment/checkout-course",
    UpdateUser:"/auth/profile",
    UploadePic:"/content/upload",
    PaymentMethod:"/payment/user-payment",
    //BUSINESS
    GetBusiness:"/bussiness/get-all",

};