'use strict';

require('reflect-metadata');
var dt = require('typedi');
var nodeFetch = require('node-fetch');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var dt__default = /*#__PURE__*/_interopDefault(dt);

var G=Object.defineProperty,j=Object.defineProperties,Y=Object.getOwnPropertyDescriptor,q=Object.getOwnPropertyDescriptors;var M=Object.getOwnPropertySymbols;var Z=Object.prototype.hasOwnProperty,Q=Object.prototype.propertyIsEnumerable;var b=(s,t,e)=>t in s?G(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e,c=(s,t)=>{for(var e in t||(t={}))Z.call(t,e)&&b(s,e,t[e]);if(M)for(var e of M(t))Q.call(t,e)&&b(s,e,t[e]);return s},f=(s,t)=>j(s,q(t));var l=(s,t,e,r)=>{for(var a=r>1?void 0:r?Y(t,e):t,d=s.length-1,u;d>=0;d--)(u=s[d])&&(a=(r?u(t,e,a):u(a))||a);return r&&a&&G(t,e,a),a};var o=(s,t,e)=>new Promise((r,a)=>{var d=T=>{try{k(e.next(T));}catch(N){a(N);}},u=T=>{try{k(e.throw(T));}catch(N){a(N);}},k=T=>T.done?r(T.value):Promise.resolve(T.value).then(d,u);k((e=e.apply(s,t)).next());});var B="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",i={API_VERSION:"/v1",LOGIN:"/auth/login",REGISTER:"/auth/create-account",ACCOUNT_VERIFY:"/auth/account/verify",RESEND_VERIFY_LINK:"/auth/account/verify",VALIDATE_PASSWORD_TOKEN:"/auth/validate/password",RESET_PASSWORD:"/auth/password/reset",CHANGE_PASSWORD:"/auth/password/change",COLLECTION:"/collection",COLLECTION_TYPE:"/collection-type",COLLECTION_MANY:"/collection/many",BOOKMARK:"/bookmark",NOTIFICATION_FETCH:"/notifications/",NOTIFICATION_MARK_ALL:"/notifications/mark/all",NOTIFICATION_MARK_ONE:"/notifications/mark",ACCOUNT:"/account",ACCOUNT_ONBOARD:"/account/onboard",ACCOUNT_UPDATE:"/account/update",ACCOUNT_PASSWORD:"/account/password/change",ACCOUNT_TWO_INIT:"/account/initiate/2fa",ACCOUNT_TWO_ACTIVATE:"/account/activate/2fa",ACCOUNT_TWO_DEACTIVATE:"/account/deactivate/2fa",ACCOUNT_LOGOUT:"/account/logout",WALLET_TRANSACTIONS:"/wallet/transactions",A_WALLET_TRANSACTION:"/wallet/transaction",WALLET_EXCHANGE:"/wallet/exchange",WALLET_DATA:"/wallet/data",WALLET_STATS:"/wallet/stats",WALLET_AGGREGATE_STATS:"/wallet/aggregate/stats",WALLETS:"/wallet",SINGLE_WALLET:"/wallet/coin",FILE_UPLOAD:"/upload/",ADD_REVIEW:"/reviews/",CREATE_WITHDRAWAL:"/withdrawals/",FETCH_WITHDRAWALS:"/withdrawals/",CREATE_SESSION:"/user-verification/veriff/session/new",SEND_SESSION_MEDIA:"/user-verification/veriff/session/media",SESSION_ATTEMPTS:"/user-verification/veriff/session/attempts",USER_VERIFICATION:"/user-verification/user",DELETE_SESSION:"/user-verification/veriff/session/delete"};var _=new dt.Token("PAKT_CONFIG"),U=new dt.Token("AUTH_TOKEN"),W=new dt.Token("TEMP_TOKEN");var K="0.1.10";var $=(e=>(e.SUCCESS="SUCCESS",e.ERROR="ERROR",e))($||{}),n={tryFail:s=>o(void 0,null,function*(){try{return {data:yield s(),status:"SUCCESS"}}catch(t){let e=n.toErrorWithMessage(t);return {data:null,status:"ERROR",message:e?e.message:["Internal Server Error"],code:e.code}}}),formatErrorMsg:s=>s.replace("attr.",""),toErrorWithMessage:s=>{var t;if(typeof s=="string")try{let e=JSON.parse(s);return e.data instanceof Array&&e.data.length>0?{message:e.data.map(r=>n.formatErrorMsg(r)),code:e.errorCode}:{message:[(t=e.message)!=null?t:s],code:e.errorCode}}catch(e){}if(n.isErrorWithMessage(s))return {message:[s.message]};try{return {message:[JSON.stringify(s,null,2)]}}catch(e){return {message:[String(s)]}}},isErrorWithMessage(s){return typeof s=="object"&&s!==null&&"message"in s&&typeof s.message=="string"}},m=(s,t)=>{let e="?";return Object.keys(t).map(r=>{e=e+`${r}=${t[r]}&`;}),s+e};var et=(s,t)=>import('node-fetch').then(({default:e})=>e(s,t)),p=class{constructor(t){this.id=t;}get(t){return o(this,null,function*(){return this.request(f(c({},t),{method:"GET"}))})}post(t){return o(this,null,function*(){return this.request(f(c({},t),{method:"POST"}))})}patch(t){return o(this,null,function*(){return this.request(f(c({},t),{method:"PATCH"}))})}put(t){return o(this,null,function*(){return this.request(f(c({},t),{method:"PUT"}))})}delete(t){return o(this,null,function*(){return this.request(f(c({},t),{method:"DELETE"}))})}request(k){return o(this,arguments,function*({path:t,params:e,body:r,method:a},d=0,u){let{verbose:T}=dt.Container.of(this.id).get(_),N=u||this.getUrl({path:t,params:e}),v={headers:yield this.headers(d),method:a,body:r?JSON.stringify(r):void 0},V=Date.now();T&&console.debug(new Date().toISOString(),"SDK Request: ",v.method,N,v.body);try{return yield et(N,v).then(g=>o(this,null,function*(){let H=Date.now()-V;T&&console.log(new Date().toISOString(),`SDK Response received in ${H}ms: `,g.status,yield g.clone().text());let J=yield g.json();return f(c({},J),{code:g.status})}))}catch(g){return T&&console.warn(new Date().toISOString(),"Error: ",g),Promise.reject(g)}})}getUrl({path:t,params:e}){let r=dt.Container.of(this.id).get(_),a=i.API_VERSION+t,d=new URL(a||"",r.baseUrl);return console.log(a,d),e&&Object.keys(e).filter(u=>!!e[u]).forEach(u=>d.searchParams.append(u,`${e[u]}`)),r.testnet&&d.searchParams.append("type","testnet"),d.toString()}headers(t){return o(this,null,function*(){let e={},r=dt.Container.of(this.id).get(_),a=dt.Container.of(this.id).get(U);a&&(e={Authorization:`Bearer ${a}`});let d=new nodeFetch.Headers(c({"Content-Type":"application/json","x-pkt-sdk-version":K,"x-pkt-sdk-product":"JS","x-pkt-testnet":`${r.testnet}`,"x-pkt-sdk-retry":`${t}`},e));return r.token&&d.append("x-api-key",r.token),d})}};p=l([dt.Service({factory:s=>new p(s.id),transient:!0})],p);exports.AccountModule=class A{constructor(t){this.id=t,this.connector=dt.Container.of(this.id).get(p);}getUser(){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){return (yield this.connector.get({path:i.ACCOUNT})).data}))})}onboardEndpoint(t,e,r){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){let a={skillCategory:t,profileImage:e,type:r};return (yield this.connector.post({path:i.ACCOUNT_ONBOARD,body:a})).data}))})}updateAccount(t){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){let e=c({},t);return (yield this.connector.patch({path:i.ACCOUNT_UPDATE,body:e})).data}))})}changePassword(t,e){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){let r={oldPassword:t,newPassword:e};return (yield this.connector.put({path:i.ACCOUNT_PASSWORD,body:r})).data}))})}initate2FA(t){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){let e={type:t};return (yield this.connector.post({path:i.ACCOUNT_PASSWORD,body:e})).data}))})}active2FA(t){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){let e={code:t};return (yield this.connector.post({path:i.ACCOUNT_TWO_ACTIVATE,body:e})).data}))})}deactive2FA(t){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){let e={code:t};return (yield this.connector.post({path:i.ACCOUNT_TWO_DEACTIVATE,body:e})).data}))})}logout(){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){return (yield this.connector.post({path:i.ACCOUNT_LOGOUT})).data}))})}};exports.AccountModule=l([dt.Service({factory:s=>new exports.AccountModule(s.id),transient:!0})],exports.AccountModule);exports.AuthenticationModule=class h{constructor(t){this.id=t,this.connector=dt.Container.of(this.id).get(p);}login(t,e){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){let r={email:t,password:e},a=yield this.connector.post({path:i.LOGIN,body:r});return a.data.tempToken?dt.Container.of(this.id).set(W,a.data.tempToken.token):dt.Container.of(this.id).set(U,a.data.token),a.data}))})}register(t,e,r,a){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){let d={firstName:t,lastName:e,email:r,password:a},u=yield this.connector.post({path:i.REGISTER,body:d});return u.data.tempToken.token&&dt.Container.of(this.id).set(W,u.data.tempToken.token),u.data}))})}verifyAccount(t,e){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){let r={tempToken:t,token:e};return yield this.connector.post({path:i.ACCOUNT_VERIFY,body:r})}))})}resendVerifyLink(t){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){let e={email:t},r=yield this.connector.post({path:i.RESET_PASSWORD,body:e});return r.data.tempToken&&dt.Container.of(this.id).set(W,r.data.tempToken.token),r.data}))})}resetPassword(t){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){let e={email:t};return (yield this.connector.post({path:i.RESET_PASSWORD,body:e})).data}))})}changePassword(t,e){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){let r={token:t,password:e};return (yield this.connector.post({path:i.CHANGE_PASSWORD,body:r})).data}))})}validatePasswordToken(t){return n.tryFail(()=>o(this,null,function*(){let e={token:t};return (yield this.connector.post({path:i.VALIDATE_PASSWORD_TOKEN,body:e})).data}))}};exports.AuthenticationModule=l([dt.Service({factory:s=>new exports.AuthenticationModule(s.id),transient:!0})],exports.AuthenticationModule);exports.BookMarkModule=class R{constructor(t){this.id=t,this.connector=dt.Container.of(this.id).get(p);}getAll(t){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){let e=m(i.BOOKMARK,t);return (yield this.connector.get({path:e})).data}))})}getById(t,e){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){let r=m(i.BOOKMARK+"/"+t,e);return (yield this.connector.get({path:r})).data}))})}create(t){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){let e=c({},t);return (yield this.connector.post({path:i.BOOKMARK,body:e})).data}))})}delete(t){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){return (yield this.connector.delete({path:i.BOOKMARK+"/"+t})).data}))})}};exports.BookMarkModule=l([dt.Service({factory:s=>new exports.BookMarkModule(s.id),transient:!0})],exports.BookMarkModule);exports.CollectionModule=class y{constructor(t){this.id=t,this.connector=dt.Container.of(this.id).get(p);}getAll(t){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){let e=m(i.COLLECTION,t);return (yield this.connector.get({path:e})).data}))})}getById(t,e){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){let r=m(i.COLLECTION+"/"+t,e);return (yield this.connector.get({path:r})).data}))})}getTypes(t){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){let e=m(i.COLLECTION_TYPE,t);return (yield this.connector.get({path:e})).data}))})}create(t){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){let e=c({},t);return (yield this.connector.post({path:i.COLLECTION,body:e})).data}))})}createMany(t){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){let e=c({},t);return (yield this.connector.post({path:i.COLLECTION,body:e})).data}))})}};exports.CollectionModule=l([dt.Service({factory:s=>new exports.CollectionModule(s.id),transient:!0})],exports.CollectionModule);exports.NotificationModule=class E{constructor(t){this.id=t,this.connector=dt.Container.of(this.id).get(p);}getAll(t){return o(this,null,function*(){let e=m(i.NOTIFICATION_FETCH,t);return n.tryFail(()=>o(this,null,function*(){return (yield this.connector.get({path:e})).data}))})}markAll(){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){return (yield this.connector.post({path:i.NOTIFICATION_MARK_ALL})).data}))})}markOneAsRead(t){return o(this,null,function*(){let e=m(i.NOTIFICATION_MARK_ONE+"/"+t,null);return n.tryFail(()=>o(this,null,function*(){return (yield this.connector.post({path:e})).data}))})}};exports.NotificationModule=l([dt.Service({factory:s=>new exports.NotificationModule(s.id),transient:!0})],exports.NotificationModule);exports.ReviewModule=class C{constructor(t){this.id=t,this.connector=dt__default.default.of(this.id).get(p);}addReview(t){let e=c({},t);return n.tryFail(()=>o(this,null,function*(){return (yield this.connector.post({path:i.ADD_REVIEW,body:e})).data}))}};exports.ReviewModule=l([dt.Service({factory:s=>new exports.ReviewModule(s.id),transient:!0})],exports.ReviewModule);exports.UploadModule=class S{constructor(t){this.id=t,this.connector=dt__default.default.of(this.id).get(p);}fileUpload(t){let e=c({},t);return n.tryFail(()=>o(this,null,function*(){return (yield this.connector.post({path:i.FILE_UPLOAD,body:e})).data}))}};exports.UploadModule=l([dt.Service({factory:s=>new exports.UploadModule(s.id),transient:!0})],exports.UploadModule);exports.UserVerificationModule=class P{constructor(t){this.id=t,this.connector=dt__default.default.of(this.id).get(p);}createSession(t){let e=c({},t);return n.tryFail(()=>o(this,null,function*(){return (yield this.connector.post({path:i.CREATE_SESSION,body:e})).data}))}sendSessionMedia(t){let e=c({},t);return n.tryFail(()=>o(this,null,function*(){return (yield this.connector.post({path:i.SEND_SESSION_MEDIA,body:e})).data}))}getSessionAttempts(){let t=m(i.SESSION_ATTEMPTS,null);return n.tryFail(()=>o(this,null,function*(){return (yield this.connector.get({path:t})).data}))}getUserVerifications(){let t=m(i.USER_VERIFICATION,null);return n.tryFail(()=>o(this,null,function*(){return (yield this.connector.get({path:t})).data}))}};exports.UserVerificationModule=l([dt.Service({factory:s=>new exports.UserVerificationModule(s.id),transient:!0})],exports.UserVerificationModule);exports.WalletModule=class I{constructor(t,e){this.id=t,this.connector=dt__default.default.of(this.id).get(p),this.coin=e;}getTransactions(){return n.tryFail(()=>o(this,null,function*(){return (yield this.connector.get({path:i.WALLET_TRANSACTIONS})).data}))}getATransaction(t){let e=m(i.A_WALLET_TRANSACTION+"/"+t,null);return n.tryFail(()=>o(this,null,function*(){return (yield this.connector.get({path:e})).data}))}getTransactionStats(){return n.tryFail(()=>o(this,null,function*(){return (yield this.connector.get({path:i.WALLET_STATS})).data}))}getAggregateTransactionStats(){return n.tryFail(()=>o(this,null,function*(){return (yield this.connector.get({path:i.WALLET_AGGREGATE_STATS})).data}))}getWalletData(){return n.tryFail(()=>o(this,null,function*(){return (yield this.connector.get({path:i.WALLET_AGGREGATE_STATS})).data}))}getWallets(){return n.tryFail(()=>o(this,null,function*(){return (yield this.connector.get({path:i.WALLETS})).data}))}getSingleWallet(t){let e=m(i.SINGLE_WALLET+"/"+t,null);return n.tryFail(()=>o(this,null,function*(){return (yield this.connector.get({path:e})).data}))}getExchange(){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){return (yield this.connector.get({path:i.WALLET_EXCHANGE})).data}))})}};exports.WalletModule=l([dt.Service({factory:s=>new exports.WalletModule(s.id,s.coin)})],exports.WalletModule);exports.WithdrawalModule=class O{constructor(t){this.id=t,this.connector=dt__default.default.of(this.id).get(p);}createWithdrawal(t){return n.tryFail(()=>o(this,null,function*(){let e=c({},t);return (yield this.connector.post({path:i.CREATE_WITHDRAWAL,body:e})).data}))}fetchWithdrawal(t){let e=m(i.FETCH_WITHDRAWALS,t);return n.tryFail(()=>o(this,null,function*(){return (yield this.connector.get({path:e})).data}))}};exports.WithdrawalModule=l([dt.Service({factory:s=>new exports.WithdrawalModule(s.id)})],exports.WithdrawalModule);exports.PaktSDK=class w{constructor(t){this.auth=dt.Container.of(t).get(exports.AuthenticationModule),this.collection=dt.Container.of(t).get(exports.CollectionModule),this.account=dt.Container.of(t).get(exports.AccountModule),this.notifications=dt.Container.of(t).get(exports.NotificationModule),this.file=dt.Container.of(t).get(exports.UploadModule),this.wallet=dt.Container.of(t).get(exports.WalletModule),this.withdrawal=dt.Container.of(t).get(exports.WithdrawalModule),this.review=dt.Container.of(t).get(exports.ReviewModule),this.bookmark=dt.Container.of(t).get(exports.BookMarkModule),this.userVerification=dt.Container.of(t).get(exports.UserVerificationModule);}static init(t){return o(this,null,function*(){let e=c({},t),r=exports.PaktSDK.generateRandomString();return dt.Container.of(r).set(_,e),dt.Container.of(r).set(U,""),dt.Container.of(r).set(W,""),new exports.PaktSDK(r)})}static generateRandomString(){let t=B,e="";for(let r=0;r<60;r++)e+=t.charAt(Math.floor(Math.random()*t.length));return e}};exports.PaktSDK=l([dt.Service({transient:!0})],exports.PaktSDK);

exports.API_PATHS = i;
exports.AUTH_TOKEN = U;
exports.CHARACTERS = B;
exports.ErrorUtils = n;
exports.PAKT_CONFIG = _;
exports.Status = $;
exports.TEMP_TOKEN = W;
exports.parseUrlWithQUery = m;
