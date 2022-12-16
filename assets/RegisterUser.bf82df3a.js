import{_ as f,o as n,c as d,a as x,r as i,b as a,w as C,d as s,t as b,e as p,n as M,p as k,f as y,g as L,h as B,i as R}from"./index.9d69cd3f.js";import{F as $,a as S,E as I}from"./vee-validate.esm.e15efe48.js";import{c as G,a as u,b as W}from"./object.b44e062b.js";import{R as T,r as K,l as N}from"./firebaseAuth.b4c589c3.js";import"./fdb.62b7fc96.js";const q="/IBS-Fysiotherapy-FE/assets/g-logo.d2e3b7fa.png";const D={},O={class:"g-sign-in-button"},U=x('<div class="content-wrapper" data-v-051459a0><div class="logo-wrapper" data-v-051459a0><img alt="google logo" src="'+q+'" data-v-051459a0></div><span class="text-container" data-v-051459a0><span class="text" data-v-051459a0>Log in met Google</span></span></div>',1),V=[U];function j(e,o){return n(),d("div",O,V)}const z=f(D,[["render",j],["__scopeId","data-v-051459a0"]]),P="/IBS-Fysiotherapy-FE/assets/output-onlinepngtools.c10dfe69.png";const H={},A={class:"g-sign-in-button"},J=x('<div class="content-wrapper" data-v-c019080b><div class="logo-wrapper" data-v-c019080b><img alt="envelop" src="'+P+'" data-v-c019080b></div><span class="text-container" data-v-c019080b><span class="text" data-v-c019080b>Log in met email</span></span></div>',1),Q=[J];function X(e,o){return n(),d("div",A,Q)}const Y=f(H,[["render",X],["__scopeId","data-v-c019080b"]]);const Z={name:"RegisterForm",components:{Form:$,Field:S,ErrorMessage:I},props:{firebaseError:{type:String,default:""}},emits:["close","send"],data(){const e=G().shape({email:u().required("Dit veld is verplicht").email("Email is ongeldig").max(50,"Karakter limiet bereikt"),password:u().required("Dit veld is verplicht").min(6,"Wachtwoord moet minimaal 6 karakters zijn").max(40,"Karakter limiet bereikt"),passwordConfirmation:u().oneOf([W("password"),null],"Wachtwoord komt niet overeen").required("Dit veld is verplicht")});return{successful:!1,loading:!1,message:"",schema:e}},methods:{handleRegister(e){this.message="",this.successful=!1,this.loading=!0,this.$emit("send",e),this.successful=!0,this.loading=!1},goBackToRegister(){this.$emit("close")}}},_=e=>(k("data-v-08c5a499"),e=e(),y(),e),ee={class:"form"},se=_(()=>s("h3",null,[s("b",null,"Registreer met email")],-1)),oe={class:"form-group"},te=_(()=>s("label",{for:"email",style:{"font-weight":"bold"}},"Email",-1)),re={class:"form-group"},ae=_(()=>s("label",{for:"password",style:{"font-weight":"bold"}},"Wachtwoord",-1)),ie={class:"form-group"},ne=_(()=>s("label",{for:"passwordConfirmation",style:{"font-weight":"bold"}}," Herhaal wachtwoord",-1)),ce=_(()=>s("div",{id:"submit_btn_cover"},[s("button",{class:"registerButton"},[s("b",null,"Registreer")])],-1)),le=_(()=>s("b",null,"Terug",-1)),de=[le],me={key:0,id:"errorText"};function _e(e,o,m,E,r,t){const c=i("Field"),l=i("ErrorMessage"),g=i("Form");return n(),d("form",ee,[se,a(g,{"validation-schema":r.schema,onSubmit:t.handleRegister},{default:C(()=>[s("div",oe,[te,a(c,{name:"email",class:"form-control"}),a(l,{name:"email",class:"error-feedback"})]),s("div",re,[ae,a(c,{name:"password",type:"password",class:"form-control"}),a(l,{name:"password",class:"error-feedback"})]),s("div",ie,[ne,a(c,{name:"passwordConfirmation",type:"password",class:"form-control"}),a(l,{name:"passwordConfirmation",class:"error-feedback"})]),ce]),_:1},8,["validation-schema","onSubmit"]),s("button",{class:"returnButton",onClick:o[0]||(o[0]=F=>t.goBackToRegister())},de),m.firebaseError!==""?(n(),d("div",me,b(m.firebaseError),1)):p("",!0),r.message?(n(),d("div",{key:1,class:M(["alert",r.successful?"alert-success":"alert-danger"])},b(r.message),3)):p("",!0)])}const ge=f(Z,[["render",_e],["__scopeId","data-v-08c5a499"]]);const he={name:"LoginForm",components:{Form:$,Field:S,ErrorMessage:I},props:{errorMessage:{type:String,required:!0}},emits:["send","close"],data(){const e=G().shape({email:u().required("Dit veld is verplicht").email("Email is ongeldig"),password:u().required("Dit veld is verplicht").min(6,"Wachtwoord moet minimaal 6 karakters zijn").max(40,"Karakter limiet bereikt")});return{successful:!1,loading:!1,message:"",schema:e}},methods:{handleLogin(e){this.message="",this.successful=!1,this.loading=!0,this.$emit("send",e),this.successful=!0,this.loading=!1},goBackToRegister(){this.$emit("close")}}},v=e=>(k("data-v-34622df4"),e=e(),y(),e),ue={class:"form"},pe=v(()=>s("h3",null,[s("b",null,"Log in met email")],-1)),fe={class:"form-group"},ve=v(()=>s("label",{for:"email",style:{"font-weight":"bold"}},"Email",-1)),we={class:"form-group"},Fe=v(()=>s("label",{for:"password",style:{"font-weight":"bold"}},"Wachtwoord",-1)),be={key:0,id:"errorText"},ke={id:"submit_btn_cover"},ye=v(()=>s("button",{class:"logInButton",type:"submit"},"Login",-1));function Ee(e,o,m,E,r,t){const c=i("Field"),l=i("ErrorMessage"),g=i("Form");return n(),d("form",ue,[pe,a(g,{onSubmit:t.handleLogin,"validation-schema":r.schema},{default:C(()=>[s("div",fe,[ve,a(c,{name:"email",class:"form-control"}),a(l,{name:"email",class:"error-feedback"})]),s("div",we,[Fe,a(c,{name:"password",type:"password",class:"form-control"}),a(l,{name:"password",class:"error-feedback"})]),m.errorMessage!==""?(n(),d("div",be,b(m.errorMessage),1)):p("",!0),s("div",ke,[ye,s("button",{class:"returnButton",onClick:o[0]||(o[0]=F=>t.goBackToRegister())},"Terug")])]),_:1},8,["onSubmit","validation-schema"])])}const Le=f(he,[["render",Ee],["__scopeId","data-v-34622df4"]]),Be="/IBS-Fysiotherapy-FE/assets/huImage.74ce04ea.jpg",Re="/IBS-Fysiotherapy-FE/assets/logo.e2fe44a6.png";const xe={name:"RegisterUser",components:{GoogleLoginButton:z,EmailLoginButton:Y,RegisterForm:ge,LoginForm:Le},data(){return{showForm:!1,showLoginForm:!1,showGoogleForm:!1,user:null,errorMessage:"",registerMessage:"",authenticationErrorFromRegister:""}},methods:{showLogForm(e){!this.showForm&&!this.showGoogleForm&&(e.stopPropagation(),this.showLoginForm=!0)},showRegisterForm(e){!this.showLoginForm&&!this.showGoogleForm&&(e.stopPropagation(),this.showForm=!0)},closeForm(){this.showForm=!1,this.showLoginForm=!1,this.errorMessage=""},checkClickOutside(e){e.target.closest(".form")||this.closeForm()},RegisterWithGoogle(){!this.showLoginForm&&!this.showForm&&(this.showGoogleForm=!0,T())},registerWithEmail(e){K(e).then(()=>{L.push({path:"/patients"})})},login(e){N(e).then(()=>{L.push({path:"/patients"})}).catch(o=>{window.alert(o.error)})}}},w=e=>(k("data-v-3d63e7f8"),e=e(),y(),e),Ce=w(()=>s("div",{class:"background"},[s("img",{class:"background-image",alt:"hogeschool utrecht achtergrond",src:Be})],-1)),$e={class:"registerButtons"},Se=w(()=>s("img",{class:"logo",alt:"hogeschool utrecht logo",src:Re},null,-1)),Ie=w(()=>s("p",{class:"main-text"},"Sensor technologie voor de fysiotherapeut",-1)),Ge=w(()=>s("p",{class:"acountText"},"HEB JE NOG GEEN ACCOUNT?",-1)),Me=["disabled"];function We(e,o,m,E,r,t){const c=i("GoogleLoginButton"),l=i("EmailLoginButton"),g=i("RegisterForm"),F=i("LoginForm");return n(),d("div",{class:"fullPage",onClick:o[3]||(o[3]=(...h)=>t.checkClickOutside&&t.checkClickOutside(...h))},[Ce,s("div",$e,[Se,Ie,a(c,{tabindex:"0",onKeyup:o[0]||(o[0]=B(h=>t.RegisterWithGoogle(),["enter"])),onClick:o[1]||(o[1]=h=>t.RegisterWithGoogle())}),a(l,{tabindex:"0",onKeyup:B(t.showLogForm,["enter"]),onClick:t.showLogForm},null,8,["onKeyup","onClick"]),Ge,s("p",null,[s("button",{disabled:r.showForm||r.showLoginForm,class:"registerBtn",onClick:o[2]||(o[2]=(...h)=>t.showRegisterForm&&t.showRegisterForm(...h))}," Registreer ",8,Me)]),r.showForm&&!r.showLoginForm?(n(),R(g,{key:0,firebaseError:r.authenticationErrorFromRegister,onSend:t.registerWithEmail,onClose:t.closeForm},null,8,["firebaseError","onSend","onClose"])):p("",!0),r.showLoginForm?(n(),R(F,{key:1,"error-message":r.errorMessage,onSend:t.login,onClose:t.closeForm},null,8,["error-message","onSend","onClose"])):p("",!0)])])}const Oe=f(xe,[["render",We],["__scopeId","data-v-3d63e7f8"]]);export{Oe as default};
