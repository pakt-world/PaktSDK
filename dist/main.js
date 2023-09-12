'use strict';

require('reflect-metadata');
var lt = require('typedi');
var nodeFetch = require('node-fetch');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var lt__default = /*#__PURE__*/_interopDefault(lt);

var J=Object.defineProperty,Z=Object.defineProperties,X=Object.getOwnPropertyDescriptor,z=Object.getOwnPropertyDescriptors;var K=Object.getOwnPropertySymbols;var tt=Object.prototype.hasOwnProperty,et=Object.prototype.propertyIsEnumerable;var H=(s,t,o)=>t in s?J(s,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):s[t]=o,c=(s,t)=>{for(var o in t||(t={}))tt.call(t,o)&&H(s,o,t[o]);if(K)for(var o of K(t))et.call(t,o)&&H(s,o,t[o]);return s},T=(s,t)=>Z(s,z(t));var l=(s,t,o,e)=>{for(var a=e>1?void 0:e?X(t,o):t,p=s.length-1,u;p>=0;p--)(u=s[p])&&(a=(e?u(t,o,a):u(a))||a);return e&&a&&J(t,o,a),a};var r=(s,t,o)=>new Promise((e,a)=>{var p=E=>{try{x(o.next(E));}catch(f){a(f);}},u=E=>{try{x(o.throw(E));}catch(f){a(f);}},x=E=>E.done?e(E.value):Promise.resolve(E.value).then(p,u);x((o=o.apply(s,t)).next());});var j="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",i={API_VERSION:"/v1",LOGIN:"/auth/login",REGISTER:"/auth/create-account",ACCOUNT_VERIFY:"/auth/account/verify",RESEND_VERIFY_LINK:"/auth/account/verify",VALIDATE_PASSWORD_TOKEN:"/auth/validate/password",RESET_PASSWORD:"/auth/password/reset",CHANGE_PASSWORD:"/auth/password/change",COLLECTION:"/collection",COLLECTION_TYPE:"/collection-type",COLLECTION_MANY:"/collection/many",COLLECTION_UPDATE:"/collection/update",BOOKMARK:"/bookmark",NOTIFICATION_FETCH:"/notifications/",NOTIFICATION_MARK_ALL:"/notifications/mark/all",NOTIFICATION_MARK_ONE:"/notifications/mark",ACCOUNT:"/account",ACCOUNT_ONBOARD:"/account/onboard",ACCOUNT_UPDATE:"/account/update",ACCOUNT_PASSWORD:"/account/password/change",ACCOUNT_TWO_INIT:"/account/initiate/2fa",ACCOUNT_TWO_ACTIVATE:"/account/activate/2fa",ACCOUNT_TWO_DEACTIVATE:"/account/deactivate/2fa",ACCOUNT_FETCH_ALL:"/account/user",ACCOUNT_FETCH_SINGLE:"/account/user/",ACCOUNT_LOGOUT:"/account/logout",ACCOUNT_SEND_EMAIL_TWO_FA:"/account/2fa/email",WALLET_TRANSACTIONS:"/wallet/transactions",A_WALLET_TRANSACTION:"/wallet/transaction",WALLET_EXCHANGE:"/wallet/exchange",WALLET_DATA:"/wallet/data",WALLET_STATS:"/wallet/stats",WALLET_AGGREGATE_STATS:"/wallet/aggregate/stats",WALLETS:"/wallet",SINGLE_WALLET:"/wallet/coin",FILE_UPLOAD:"/upload/",ADD_REVIEW:"/reviews/",GET_REVIEW:"/reviews/",CREATE_WITHDRAWAL:"/withdrawals/",FETCH_WITHDRAWALS:"/withdrawals/",CREATE_SESSION:"/user-verification/veriff/session/new",SEND_SESSION_MEDIA:"/user-verification/veriff/session/media",SESSION_ATTEMPTS:"/user-verification/veriff/session/attempts",USER_VERIFICATION:"/user-verification/user",DELETE_SESSION:"/user-verification/veriff/session/delete",GET_USER_MESSAGES:"/chat/",CREATE_CONNECTION_FILTER:"/conn-filter/",GET_CONNECTION_FILTER:"/conn-filter/user",UPDATE_CONNECTION_FILTER:"/conn-filter/",SEND_INVITE:"/invite/",ACCEPT_INVITE:"/invite",DECLINE_INVITE:"/invite",VIEW_ALL_INVITE:"/invite/",VIEW_A_INVITE:"/invite/"};var W=new lt.Token("PAKT_CONFIG"),b=new lt.Token("AUTH_TOKEN"),k=new lt.Token("TEMP_TOKEN");var q="0.1.16";var g=(o=>(o.SUCCESS="SUCCESS",o.ERROR="ERROR",o))(g||{}),n={tryFail:s=>r(void 0,null,function*(){try{return {data:yield s(),status:"SUCCESS"}}catch(t){let o=n.toErrorWithMessage(t);return {data:null,status:"ERROR",message:o?o.message:["Internal Server Error"],code:o.code}}}),formatErrorMsg:s=>s.replace("attr.",""),toErrorWithMessage:s=>{var t;if(typeof s=="string")try{let o=JSON.parse(s);return o.data instanceof Array&&o.data.length>0?{message:o.data.map(e=>n.formatErrorMsg(e)),code:o.errorCode}:{message:[(t=o.message)!=null?t:s],code:o.errorCode}}catch(o){}if(n.isErrorWithMessage(s))return {message:[s.message]};try{return {message:[JSON.stringify(s,null,2)]}}catch(o){return {message:[String(s)]}}},isErrorWithMessage(s){return typeof s=="object"&&s!==null&&"message"in s&&typeof s.message=="string"}},m=(s,t)=>{let o="?";return Object.keys(t).map(e=>{o=o+`${e}=${t[e]}&`;}),s+o};var nt=(s,t)=>import('node-fetch').then(({default:o})=>o(s,t)),d=class{constructor(t){this.id=t;}get(t){return r(this,null,function*(){return this.request(T(c({},t),{method:"GET"}))})}post(t){return r(this,null,function*(){return this.request(T(c({},t),{method:"POST"}))})}patch(t){return r(this,null,function*(){return this.request(T(c({},t),{method:"PATCH"}))})}put(t){return r(this,null,function*(){return this.request(T(c({},t),{method:"PUT"}))})}delete(t){return r(this,null,function*(){return this.request(T(c({},t),{method:"DELETE"}))})}request(x){return r(this,arguments,function*({path:t,params:o,body:e,method:a},p=0,u){let{verbose:E}=lt.Container.of(this.id).get(W),f=u||this.getUrl({path:t,params:o}),V={headers:yield this.headers(p),method:a,body:e?JSON.stringify(e):void 0},Y=Date.now();E&&console.debug(new Date().toISOString(),"SDK Request: ",V.method,f,V.body);try{return yield nt(f,V).then(D=>r(this,null,function*(){let $=Date.now()-Y;E&&console.log(new Date().toISOString(),`SDK Response received in ${$}ms: `,D.status,yield D.clone().text());let Q=yield D.json();return T(c({},Q),{code:D.status})}))}catch(D){return E&&console.warn(new Date().toISOString(),"Error: ",D),Promise.reject(D)}})}getUrl({path:t,params:o}){let e=lt.Container.of(this.id).get(W),a=i.API_VERSION+t,p=new URL(a||"",e.baseUrl);return console.log(a,p),o&&Object.keys(o).filter(u=>!!o[u]).forEach(u=>p.searchParams.append(u,`${o[u]}`)),e.testnet&&p.searchParams.append("type","testnet"),p.toString()}headers(t){return r(this,null,function*(){let o={},e=lt.Container.of(this.id).get(W),a=lt.Container.of(this.id).get(b);a&&(o={Authorization:`Bearer ${a}`});let p=new nodeFetch.Headers(c({"Content-Type":"application/json","x-pkt-sdk-version":q,"x-pkt-sdk-product":"JS","x-pkt-testnet":`${e.testnet}`,"x-pkt-sdk-retry":`${t}`},o));return e.token&&p.append("x-api-key",e.token),p})}};d=l([lt.Service({factory:s=>new d(s.id),transient:!0})],d);exports.AccountModule=class h{constructor(t){this.id=t,this.connector=lt.Container.of(this.id).get(d);}getUser(){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let t=yield this.connector.get({path:i.ACCOUNT});if(Number(t.statusCode||t.code)>226||t.status==="ERROR")throw new Error(t.message);return t.data}))})}onboardEndpoint(t,o,e){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let a={skillCategory:t,profileImage:o,type:e},p=yield this.connector.post({path:i.ACCOUNT_ONBOARD,body:a});if(Number(p.statusCode||p.code)>226||p.status==="ERROR")throw new Error(p.message);return p.data}))})}updateAccount(t){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let o=c({},t),e=yield this.connector.patch({path:i.ACCOUNT_UPDATE,body:o});if(Number(e.statusCode||e.code)>226||e.status==="ERROR")throw new Error(e.message);return e.data}))})}changePassword(t,o){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let e={oldPassword:t,newPassword:o},a=yield this.connector.put({path:i.ACCOUNT_PASSWORD,body:e});if(Number(a.statusCode||a.code)>226||a.status==="ERROR")throw new Error(a.message);return a.data}))})}initate2FA(t){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let o={type:t},e=yield this.connector.post({path:i.ACCOUNT_PASSWORD,body:o});if(Number(e.statusCode||e.code)>226||e.status==="ERROR")throw new Error(e.message);return e.data}))})}activate2FA(t){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let o={code:t},e=yield this.connector.post({path:i.ACCOUNT_TWO_ACTIVATE,body:o});if(Number(e.statusCode||e.code)>226||e.status==="ERROR")throw new Error(e.message);return e.data}))})}deactivate2FA(t){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let o={code:t},e=yield this.connector.post({path:i.ACCOUNT_TWO_DEACTIVATE,body:o});if(Number(e.statusCode||e.code)>226||e.status==="ERROR")throw new Error(e.message);return e.data}))})}sendEmailTwoFA(){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let t=yield this.connector.post({path:i.ACCOUNT_SEND_EMAIL_TWO_FA});if(Number(t.statusCode||t.code)>226||t.status==="ERROR")throw new Error(t.message);return t.data}))})}getAUser(t){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let o=yield this.connector.get({path:`${i.ACCOUNT_FETCH_ALL}${t}`});if(Number(o.statusCode||o.code)>226||o.status==="ERROR")throw new Error(o.message);return o.data}))})}getUsers(t){return r(this,null,function*(){if(t){let{tags:o,type:e,search:a,sort:p,range:u}=t,x=u==null?void 0:u.join(","),E=o==null?void 0:o.join(","),f=m(i.ACCOUNT_FETCH_ALL,{tags:E,range:x,type:e,search:a,sort:p});return n.tryFail(()=>r(this,null,function*(){let L=yield this.connector.get({path:f});if(Number(L.statusCode||L.code)>226||L.status==="ERROR")throw new Error(L.message);return L.data}))}return n.tryFail(()=>r(this,null,function*(){let o=yield this.connector.get({path:i.ACCOUNT_FETCH_ALL});if(Number(o.statusCode||o.code)>226||o.status==="ERROR")throw new Error(o.message);return o.data}))})}logout(){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){return (yield this.connector.post({path:i.ACCOUNT_LOGOUT})).data}))})}};exports.AccountModule=l([lt.Service({factory:s=>new exports.AccountModule(s.id),transient:!0})],exports.AccountModule);exports.AuthenticationModule=class C{constructor(t){this.id=t,this.connector=lt.Container.of(this.id).get(d);}login(t,o){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let e={email:t,password:o},a=yield this.connector.post({path:i.LOGIN,body:e});if(Number(a.statusCode||a.code)>226||a.status==="ERROR")throw new Error(a.message);return a.data.tempToken?lt.Container.of(this.id).set(k,a.data.tempToken.token):lt.Container.of(this.id).set(b,a.data.token),a.data}))})}register(t,o,e,a){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let p={firstName:t,lastName:o,email:e,password:a},u=yield this.connector.post({path:i.REGISTER,body:p});if(Number(u.statusCode||u.code)>226||u.status==="ERROR")throw new Error(u.message);return u.data.tempToken.token&&lt.Container.of(this.id).set(k,u.data.tempToken.token),u.data}))})}verifyAccount(t,o){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let e={tempToken:t,token:o},a=yield this.connector.post({path:i.ACCOUNT_VERIFY,body:e});if(Number(a.statusCode||a.code)>226||a.status==="ERROR")throw new Error(a.message);return a.data}))})}resendVerifyLink(t){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let o={email:t},e=yield this.connector.post({path:i.RESET_PASSWORD,body:o});if(Number(e.statusCode||e.code)>226||e.status==="ERROR")throw new Error(e.message);return e.data.tempToken&&lt.Container.of(this.id).set(k,e.data.tempToken.token),e.data}))})}resetPassword(t){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let o={email:t};return (yield this.connector.post({path:i.RESET_PASSWORD,body:o})).data}))})}changePassword(t,o){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let e={token:t,password:o};return (yield this.connector.post({path:i.CHANGE_PASSWORD,body:e})).data}))})}validatePasswordToken(t){return n.tryFail(()=>r(this,null,function*(){let o={token:t};return (yield this.connector.post({path:i.VALIDATE_PASSWORD_TOKEN,body:o})).data}))}};exports.AuthenticationModule=l([lt.Service({factory:s=>new exports.AuthenticationModule(s.id),transient:!0})],exports.AuthenticationModule);exports.BookMarkModule=class y{constructor(t){this.id=t,this.connector=lt.Container.of(this.id).get(d);}getAll(t){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let o=m(i.BOOKMARK,t);return (yield this.connector.get({path:o})).data}))})}getById(t,o){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let e=m(i.BOOKMARK+"/"+t,o);return (yield this.connector.get({path:e})).data}))})}create(t){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let o=c({},t);return (yield this.connector.post({path:i.BOOKMARK,body:o})).data}))})}delete(t){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){return (yield this.connector.delete({path:i.BOOKMARK+"/"+t})).data}))})}};exports.BookMarkModule=l([lt.Service({factory:s=>new exports.BookMarkModule(s.id),transient:!0})],exports.BookMarkModule);exports.ChatModule=class A{constructor(t){this.id=t,this.connector=lt__default.default.of(this.id).get(d);}getUserMessages(){return n.tryFail(()=>r(this,null,function*(){let t=yield this.connector.get({path:i.GET_USER_MESSAGES});if(Number(t.statusCode||t.code)>226||t.status==="ERROR")throw new Error(t.message);return t.data}))}};exports.ChatModule=l([lt.Service({factory:s=>new exports.ChatModule(s.id),transient:!0})],exports.ChatModule);exports.CollectionModule=class w{constructor(t){this.id=t,this.connector=lt.Container.of(this.id).get(d);}getAll(t){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let o=m(i.COLLECTION,t),e=yield this.connector.get({path:o});if(Number(e.statusCode||e.code)>226||e.status==="ERROR")throw new Error(e.message);return e.data}))})}getById(t,o){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let e=m(i.COLLECTION+"/"+t,o),a=yield this.connector.get({path:e});if(Number(a.statusCode||a.code)>226||a.status==="ERROR")throw new Error(a.message);return a.data}))})}getTypes(t){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let o=m(i.COLLECTION_TYPE,t),e=yield this.connector.get({path:o});if(Number(e.statusCode||e.code)>226||e.status==="ERROR")throw new Error(e.message);return e.data}))})}create(t){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let o=c({},t),e=yield this.connector.post({path:i.COLLECTION,body:o});if(Number(e.statusCode||e.code)>226||e.status==="ERROR")throw new Error(e.message);return e.data}))})}createMany(t){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let o=c({},t),e=yield this.connector.post({path:i.COLLECTION,body:o});if(Number(e.statusCode||e.code)>226||e.status==="ERROR")throw new Error(e.message);return e.data}))})}updateCollection(t,o){return n.tryFail(()=>r(this,null,function*(){let e=m(i.COLLECTION_UPDATE,{id:t}),a=c({},o),p=yield this.connector.patch({path:e,body:a});if(Number(p.statusCode||p.code)>226||p.status==="ERROR")throw new Error(p.message);return p.data}))}getACollectionType(t){return n.tryFail(()=>r(this,null,function*(){let o=yield this.connector.get({path:i.COLLECTION_TYPE+`/${t}`});if(Number(o.statusCode||o.code)>226||o.status==="ERROR")throw new Error(o.message);return o.data}))}};exports.CollectionModule=l([lt.Service({factory:s=>new exports.CollectionModule(s.id),transient:!0})],exports.CollectionModule);exports.ConnectionFilterModule=class I{constructor(t){this.id=t,this.connector=lt__default.default.of(this.id).get(d);}create(t){return n.tryFail(()=>r(this,null,function*(){let o=c({},t),e=yield this.connector.post({path:i.CREATE_CONNECTION_FILTER,body:o});if(Number(e.statusCode||e.code)>226||e.status==="ERROR")throw new Error(e.message);return e.data}))}update(t){return n.tryFail(()=>r(this,null,function*(){let o=c({},t),e=yield this.connector.patch({path:i.UPDATE_CONNECTION_FILTER,body:o});if(Number(e.statusCode||e.code)>226||e.status==="ERROR")throw new Error(e.message);return e.data}))}getForAUser(){return n.tryFail(()=>r(this,null,function*(){let t=yield this.connector.get({path:i.GET_CONNECTION_FILTER});if(Number(t.statusCode||t.code)>226||t.status==="ERROR")throw new Error(t.message);return t.data}))}};exports.ConnectionFilterModule=l([lt.Service({factory:s=>new exports.ConnectionFilterModule(s.id),transient:!0})],exports.ConnectionFilterModule);exports.InviteModule=class S{constructor(t){this.id=t,this.connector=lt__default.default.of(this.id).get(d);}sendInvite(t){return n.tryFail(()=>r(this,null,function*(){let o=`${i.SEND_INVITE}`,e=c({},t),a=yield this.connector.post({path:o,body:e});if(Number(a.statusCode||a.code)>226||a.status==="ERROR")throw new Error(a.message);return a.data}))}acceptInvite(t){return n.tryFail(()=>r(this,null,function*(){let o=`${i.ACCEPT_INVITE}/${t}/accept`,e=yield this.connector.post({path:o});if(Number(e.statusCode||e.code)>226||e.status==="ERROR")throw new Error(e.message);return e.data}))}declineInvite(t){return n.tryFail(()=>r(this,null,function*(){let o=`${i.DECLINE_INVITE}/${t}/accept`,e=yield this.connector.post({path:o});if(Number(e.statusCode||e.code)>226||e.status==="ERROR")throw new Error(e.message);return e.data}))}getAll(t){return n.tryFail(()=>r(this,null,function*(){let o=m(i.VIEW_ALL_INVITE,t),e=yield this.connector.get({path:o});if(Number(e.statusCode||e.code)>226||e.status==="ERROR")throw new Error(e.message);return e.data}))}getAnInvite(t){return n.tryFail(()=>r(this,null,function*(){let o=`${i.VIEW_A_INVITE}/${t}`,e=yield this.connector.get({path:o});if(Number(e.statusCode||e.code)>226||e.status==="ERROR")throw new Error(e.message);return e.data}))}};exports.InviteModule=l([lt.Service({factory:s=>new exports.InviteModule(s.id),transient:!0})],exports.InviteModule);exports.NotificationModule=class O{constructor(t){this.id=t,this.connector=lt.Container.of(this.id).get(d);}getAll(t){return r(this,null,function*(){let o=m(i.NOTIFICATION_FETCH,t);return n.tryFail(()=>r(this,null,function*(){let e=yield this.connector.get({path:o});if(Number(e.statusCode||e.code)>226||e.status==="ERROR")throw new Error(e.message);return e.data}))})}markAll(){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let t=yield this.connector.post({path:i.NOTIFICATION_MARK_ALL});if(Number(t.statusCode||t.code)>226||t.status==="ERROR")throw new Error(t.message);return t.data}))})}markOneAsRead(t){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let o=yield this.connector.post({path:i.NOTIFICATION_MARK_ONE+"/"+t});if(Number(o.statusCode||o.code)>226||o.status==="ERROR")throw new Error(o.message);return o.data}))})}};exports.NotificationModule=l([lt.Service({factory:s=>new exports.NotificationModule(s.id),transient:!0})],exports.NotificationModule);exports.ReviewModule=class N{constructor(t){this.id=t,this.connector=lt__default.default.of(this.id).get(d);}viewAll(t){return n.tryFail(()=>r(this,null,function*(){let o=m(i.GET_REVIEW,t),e=yield this.connector.get({path:o});if(Number(e.statusCode||e.code)>226||e.status==="ERROR")throw new Error(e.message);return e.data}))}viewAReview(t){return n.tryFail(()=>r(this,null,function*(){let o=yield this.connector.get({path:`${i.GET_REVIEW}${t}`});if(Number(o.statusCode||o.code)>226||o.status==="ERROR")throw new Error(o.message);return o.data}))}addReview(t){let o=c({},t);return n.tryFail(()=>r(this,null,function*(){let e=yield this.connector.post({path:i.ADD_REVIEW,body:o});if(Number(e.statusCode||e.code)>226||e.status==="ERROR")throw new Error(e.message);return e.data}))}};exports.ReviewModule=l([lt.Service({factory:s=>new exports.ReviewModule(s.id),transient:!0})],exports.ReviewModule);exports.UploadModule=class P{constructor(t){this.id=t,this.connector=lt__default.default.of(this.id).get(d);}fileUpload(t){let o=c({},t);return n.tryFail(()=>r(this,null,function*(){let e=yield this.connector.post({path:i.FILE_UPLOAD,body:o});if(Number(e.statusCode||e.code)>226||e.status==="ERROR")throw new Error(e.message);return e.data}))}};exports.UploadModule=l([lt.Service({factory:s=>new exports.UploadModule(s.id),transient:!0})],exports.UploadModule);exports.UserVerificationModule=class _{constructor(t){this.id=t,this.connector=lt__default.default.of(this.id).get(d);}createSession(t){let o=c({},t);return n.tryFail(()=>r(this,null,function*(){let e=yield this.connector.post({path:i.CREATE_SESSION,body:o});if(Number(e.statusCode||e.code)>226||e.status==="ERROR")throw new Error(e.message);return e.data}))}sendSessionMedia(t){let o=c({},t);return n.tryFail(()=>r(this,null,function*(){let e=yield this.connector.post({path:i.SEND_SESSION_MEDIA,body:o});if(Number(e.statusCode||e.code)>226||e.status==="ERROR")throw new Error(e.message);return e.data}))}getSessionAttempts(){let t=m(i.SESSION_ATTEMPTS,null);return n.tryFail(()=>r(this,null,function*(){let o=yield this.connector.get({path:t});if(Number(o.statusCode||o.code)>226||o.status==="ERROR")throw new Error(o.message);return o.data}))}getUserVerifications(){let t=m(i.USER_VERIFICATION,null);return n.tryFail(()=>r(this,null,function*(){let o=yield this.connector.get({path:t});if(Number(o.statusCode||o.code)>226||o.status==="ERROR")throw new Error(o.message);return o.data}))}};exports.UserVerificationModule=l([lt.Service({factory:s=>new exports.UserVerificationModule(s.id),transient:!0})],exports.UserVerificationModule);exports.WalletModule=class F{constructor(t,o){this.id=t,this.connector=lt__default.default.of(this.id).get(d),this.coin=o;}getTransactions(){return n.tryFail(()=>r(this,null,function*(){return (yield this.connector.get({path:i.WALLET_TRANSACTIONS})).data}))}getATransaction(t){let o=m(i.A_WALLET_TRANSACTION+"/"+t,null);return n.tryFail(()=>r(this,null,function*(){return (yield this.connector.get({path:o})).data}))}getTransactionStats(){return n.tryFail(()=>r(this,null,function*(){return (yield this.connector.get({path:i.WALLET_STATS})).data}))}getAggregateTransactionStats(){return n.tryFail(()=>r(this,null,function*(){return (yield this.connector.get({path:i.WALLET_AGGREGATE_STATS})).data}))}getWalletData(){return n.tryFail(()=>r(this,null,function*(){return (yield this.connector.get({path:i.WALLET_AGGREGATE_STATS})).data}))}getWallets(){return n.tryFail(()=>r(this,null,function*(){return (yield this.connector.get({path:i.WALLETS})).data}))}getSingleWallet(t){return n.tryFail(()=>r(this,null,function*(){let o=yield this.connector.get({path:i.SINGLE_WALLET+"/"+t});if(Number(o.statusCode||o.code)>226||o.status==="ERROR")throw new Error(o.message);return o.data}))}getExchange(){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let t=yield this.connector.get({path:i.WALLET_EXCHANGE});if(Number(t.statusCode||t.code)>226||t.status==="ERROR")throw new Error(t.message);return t.data}))})}};exports.WalletModule=l([lt.Service({factory:s=>new exports.WalletModule(s.id,s.coin)})],exports.WalletModule);exports.WithdrawalModule=class v{constructor(t){this.id=t,this.connector=lt__default.default.of(this.id).get(d);}createWithdrawal(t){return n.tryFail(()=>r(this,null,function*(){let o=c({},t);return (yield this.connector.post({path:i.CREATE_WITHDRAWAL,body:o})).data}))}fetchWithdrawal(t){let o=m(i.FETCH_WITHDRAWALS,t);return n.tryFail(()=>r(this,null,function*(){let e=yield this.connector.get({path:o});if(Number(e.statusCode||e.code)>226||e.status==="ERROR")throw new Error(e.message);return e.data}))}};exports.WithdrawalModule=l([lt.Service({factory:s=>new exports.WithdrawalModule(s.id)})],exports.WithdrawalModule);exports.PaktSDK=class U{constructor(t){this.auth=lt.Container.of(t).get(exports.AuthenticationModule),this.collection=lt.Container.of(t).get(exports.CollectionModule),this.account=lt.Container.of(t).get(exports.AccountModule),this.notifications=lt.Container.of(t).get(exports.NotificationModule),this.file=lt.Container.of(t).get(exports.UploadModule),this.wallet=lt.Container.of(t).get(exports.WalletModule),this.withdrawal=lt.Container.of(t).get(exports.WithdrawalModule),this.review=lt.Container.of(t).get(exports.ReviewModule),this.bookmark=lt.Container.of(t).get(exports.BookMarkModule),this.userVerification=lt.Container.of(t).get(exports.UserVerificationModule),this.chat=lt.Container.of(t).get(exports.ChatModule),this.connectionFilter=lt.Container.of(t).get(exports.ConnectionFilterModule),this.invite=lt.Container.of(t).get(exports.InviteModule);}static init(t){return r(this,null,function*(){let o=c({},t),e=exports.PaktSDK.generateRandomString();return lt.Container.of(e).set(W,o),lt.Container.of(e).set(b,""),lt.Container.of(e).set(k,""),new exports.PaktSDK(e)})}static generateRandomString(){let t=j,o="";for(let e=0;e<60;e++)o+=t.charAt(Math.floor(Math.random()*t.length));return o}};exports.PaktSDK=l([lt.Service({transient:!0})],exports.PaktSDK);

exports.API_PATHS = i;
exports.AUTH_TOKEN = b;
exports.CHARACTERS = j;
exports.ErrorUtils = n;
exports.PAKT_CONFIG = W;
exports.Status = g;
exports.TEMP_TOKEN = k;
exports.parseUrlWithQuery = m;
