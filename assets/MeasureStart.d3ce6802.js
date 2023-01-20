import{N as k}from"./NavBarTop.88e93e96.js";import{j as v,d as M}from"./fdb.e5d05fe7.js";import{_ as S,ak as B,r as p,o as h,c as _,b as g,d as s,ah as f,ai as w,al as c,am as d,t as u,p as T,f as y}from"./index.8d753396.js";import{f as C}from"./AgeCalculator.549f26af.js";import{B as I}from"./BackButton.111526ce.js";import"./firebaseAuth.1a1df05b.js";const l={"elleboog-flexie-extensie":{man:{"2-8":153.6,"9-19":153.6,"20-44":145.8,"45+":142.8},vrouw:{"2-8":159.7,"9-19":156.1,"20-44":154.7,"45+":151.9}},"heup-extensie":{man:{"2-8":28.3,"9-19":18.2,"20-44":17.4,"45+":13.5},vrouw:{"2-8":26.2,"9-19":20.5,"20-44":18.1,"45+":16.7}},"heup-flexie":{man:{"2-8":131.1,"9-19":135.2,"20-44":130.4,"45+":127.2},vrouw:{"2-8":140.8,"9-19":134.9,"20-44":133.8,"45+":130.8}},"knie-extensie":{man:{"2-8":149.4,"9-19":144,"20-44":138.7,"45+":133.4},vrouw:{"2-8":158,"9-19":144.7,"20-44":143.5,"45+":139}},"enkel-dorsaalflexie":{man:{"2-8":22.8,"9-19":16.3,"20-44":12.7,"45+":11.9},vrouw:{"2-8":24.8,"9-19":17.3,"20-44":13.8,"45+":11.6}},"elleboog-supinatie":{man:{"2-8":86.4,"9-19":87.8,"20-44":85,"45+":82.4},vrouw:{"2-8":93.7,"9-19":90,"20-44":90.6,"45+":87.2}},"elleboog-pronatie":{man:{"2-8":79.6,"9-19":79.8,"20-44":76.9,"45+":77.7},vrouw:{"2-8":84.6,"9-19":81.2,"20-44":82,"45+":80.8}},"shouder-flexie":{man:{"2-8":177.8,"9-19":170.9,"20-44":168.8,"45+":164},vrouw:{"2-8":178.6,"9-19":171.8,"20-44":172,"45+":168.1}},"enkel-plantairflexie":{man:{"2-8":55.8,"9-19":52.8,"20-44":54.6,"45+":49.4},vrouw:{"2-8":67.1,"9-19":57.3,"20-44":62.1,"45+":56.5}}};const P={name:"MeasureStart",components:{NavBarTop:k,BackButton:I},inject:["sensorHandler"],data(){return{miliseconds:0,seconds:0,minutes:0,route:B(),patient:null,sensorMeasurements:[],measureState:"idle",timer:null}},created(){this.setSensorMeasurement()},methods:{setSensorMeasurement(){this.sensorMeasurements=[];let t=this.$store.getters.getSelectedSensors;for(let e=0;e<t.length;e++){const n={};n.device_name=t[e],n.max_angle=0,n.norm=0,this.sensorMeasurements.push(n)}},updateMeasuredData(t){for(let e=0;e<this.sensorMeasurements.length;e++){const n=this.sensorHandler.getSensor(this.sensorMeasurements[e].device_name);this.sensorMeasurements[e].max_angle=n.max_angle,this.sensorMeasurements[e].norm=(n.max_angle/t*100).toFixed(2)}},getMeasurements(){let t=[];for(let e=0;e<this.sensorMeasurements.length;e++){let n={max_angle:this.sensorMeasurements[e].max_angle,norm:this.sensorMeasurements[e].norm};t.push(n)}return t},async saveMeasurement(){let t=this.route.params.name,e=this.route.params.category;await v(t,e,this.getMeasurements()),this.$router.push({name:"exerciseResults",params:{}})},deleteMeasurement(){this.$router.push({name:"exerciseResults",params:{}})},updateTimer(){(this.miliseconds+=10)==1e3&&(this.miliseconds=0,this.seconds++),this.seconds==60&&(this.seconds=0,this.minutes++)},getPatientAge(t){let e=C(t.dateOfBirth);return e<=8?"2-8":e<=19?"9-19":e<=44?"20-44":"45+"},async calculateTMPnorm(){let t=await M(this.route.params.name);console.log(t);let e=0,n=this.getPatientAge(t),r=String(t.gender).toLocaleLowerCase();switch(this.route.params.category){case"elleboog-flexie-extensie-rechts":case"elleboog-flexie-extensie-links":e=l["elleboog-flexie-extensie"][r][n];break;case"heup-extensie-links":case"heup-extensie-rechts":e=l["heup-extensie"][r][n];break;case"heup-flexie-links":case"heup-flexie-rechts":e=l["heup-flexie"][r][n];break;case"knie-extensie-flexie-links":case"knie-extensie-flexie-rechts":e=l["knie-extensie"][r][n];break;case"enkel-dorsaalflexie-links":case"enkel-dorsaalflexie-rechts":e=l["enkel-dorsaalflexie"][r][n];break;case"enkel-plantairflexie-links":case"enkel-plantairflexie-rechts":e=l["enkel-plantairflexie"][r][n];break;case"shouder-flexie-links":case"shouder-flexie-rechts":e=l["shouder-flexie"][r][n];break;case"elleboog-pronatie-links":case"elleboog-pronatie-rechts":e=l["elleboog-pronatie"][r][n];break;case"elleboog-supinatie-links":case"elleboog-supinatie-rechts":e=l["elleboog-supinatie"][r][n];break}return e},async measure(){if(this.measureState=="idle")this.setSensorMeasurement(),this.sensorHandler.streamMultipleSensors(this.sensorMeasurements),clearInterval(this.timer),this.timer=setInterval(()=>{this.updateTimer()},10),this.measureState="measuring";else if(this.measureState=="measuring"){clearInterval(this.timer),this.measureState="results",await this.sensorHandler.stopStreamMultipleSensors(this.sensorMeasurements);let t=0;await this.calculateTMPnorm().then(e=>{t=e}),this.updateMeasuredData(t)}else this.measureState=="results"&&(this.miliseconds=0,this.seconds=0,this.minutes=0,clearInterval(this.timer),this.setSensorMeasurement(),this.measureState="idle")}}},a=t=>(T("data-v-9af02484"),t=t(),y(),t),D=a(()=>s("h1",{class:"title"},"Meet",-1)),N={class:"info_container"},R=a(()=>s("b",null,"Meet resultaten",-1)),j=a(()=>s("td",{class:"header_name"},[s("b",null,"Device name")],-1)),H={class:"table_data"},A=a(()=>s("td",{class:"header_name"},[s("b",{class:"table_content"},"Tijd (m:s:ms) ")],-1)),L={id:"minutes"},V={id:"seconds"},F={id:"milliseconds"},E=a(()=>s("td",{class:"header_name"},[s("b",null,"Beweging (graden) ")],-1)),O=a(()=>s("td",{class:"header_name"},[s("b",null,"Procent van de norm ")],-1)),q=a(()=>s("b",null,"Start meting",-1)),z=[q],G=a(()=>s("b",null,"Stop meting",-1)),J=[G],K=a(()=>s("b",null,"Begin opnieuw",-1)),Q=[K],U=a(()=>s("b",null,"Sla meting op",-1)),W=[U],X=a(()=>s("b",null,"Verwijder meting",-1)),Y=[X];function Z(t,e,n,r,o,m){const x=p("NavBarTop"),b=p("BackButton");return h(),_(f,null,[g(x),s("main",null,[D,s("div",N,[R,(h(!0),_(f,null,w(o.sensorMeasurements,i=>(h(),_("div",{key:i,class:"sensorCard"},[s("table",null,[s("tr",null,[j,s("td",null,[s("div",H,u(i.device_name),1)])]),s("tr",null,[A,s("td",null,[s("span",L,u(o.minutes)+":",1),s("span",V,u(o.seconds)+":",1),s("span",F,u(o.miliseconds),1)])]),s("tr",null,[E,s("td",null,u(i.max_angle)+"\xB0",1)]),s("tr",null,[O,s("td",null,u(i.norm)+"%",1)])])]))),128)),c(s("button",{id:"button1",class:"measureButtonBlue",onClick:e[0]||(e[0]=i=>m.measure())},z,512),[[d,o.measureState=="idle"]]),c(s("button",{class:"measureButtonRed",onClick:e[1]||(e[1]=i=>m.measure())},J,512),[[d,o.measureState=="measuring"]]),c(s("button",{class:"measureButtonBlue",onClick:e[2]||(e[2]=i=>m.measure())},Q,512),[[d,o.measureState=="results"]]),c(s("button",{id:"button2",class:"measureButtonBlue",onClick:e[3]||(e[3]=i=>m.saveMeasurement())},W,512),[[d,o.measureState=="results"]]),c(s("button",{id:"button3",class:"measureButtonRed",onClick:e[4]||(e[4]=i=>m.deleteMeasurement())},Y,512),[[d,o.measureState=="results"]])])]),s("footer",null,[g(b)])],64)}const re=S(P,[["render",Z],["__scopeId","data-v-9af02484"]]);export{re as default};
