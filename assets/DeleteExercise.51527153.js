import{q as _,r as h}from"./fdb.c5ed87c8.js";import{_ as p,o,c,d as e,ah as u,ai as m,t as i,p as x,f}from"./index.8494bb84.js";const v={name:"deleteExercise",data(){return{exercises:null,user:{}}},mounted(){this.getExercisesfromFireStore(),this.user=this.$store.getters.getUser.email},methods:{async getExercisesfromFireStore(){await _().then(t=>{this.exercises=t})},confirmDelete(t){window.confirm("Do you really want to delete the Exercise?")&&(h(t),this.exercises.delete(t))},displayDescription(t){window.confirm(t)}}},n=t=>(x("data-v-b6449540"),t=t(),f(),t),E={class:"container"},b=n(()=>e("h1",{class:"title"},"Exercise overzicht",-1)),k=n(()=>e("h2",null,"Exercise",-1)),D={class:"exercise-text-holder"},g={class:"text color-black"},y={class:"text color-black"},S=["onClick"],w={class:"text description color-blue"},B={class:"actionButtons"},C=["onClick"],I=n(()=>e("b",null," Delete ",-1)),$=[I];function F(t,N,q,z,l,r){return o(),c("div",E,[b,e("main",null,[(o(!0),c(u,null,m(l.exercises,([a,s])=>(o(),c("div",{key:s,class:"exercise"},[k,e("div",D,[e("p",g,[e("b",null,"Name: "+i(s.name),1)]),e("p",y," Sensors needed: "+i(s.amountSensor),1),e("a",{onClick:d=>r.displayDescription(s.description)},[e("p",w,i(s.description),1)],8,S)]),e("div",B,[e("button",{class:"fullcolumn button deleteButton",onClick:d=>r.confirmDelete(a)},$,8,C)])]))),128))])])}const U=p(v,[["render",F],["__scopeId","data-v-b6449540"]]);export{U as default};