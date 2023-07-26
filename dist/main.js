'use strict';

require('reflect-metadata');
var ct = require('typedi');
var nodeFetch = require('node-fetch');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var ct__default = /*#__PURE__*/_interopDefault(ct);

var G=Object.defineProperty,j=Object.defineProperties,J=Object.getOwnPropertyDescriptor,q=Object.getOwnPropertyDescriptors;var L=Object.getOwnPropertySymbols;var Y=Object.prototype.hasOwnProperty,Q=Object.prototype.propertyIsEnumerable;var b=(s,t,e)=>t in s?G(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e,p=(s,t)=>{for(var e in t||(t={}))Y.call(t,e)&&b(s,e,t[e]);if(L)for(var e of L(t))Q.call(t,e)&&b(s,e,t[e]);return s},O=(s,t)=>j(s,q(t));var l=(s,t,e,r)=>{for(var a=r>1?void 0:r?J(t,e):t,d=s.length-1,m;d>=0;d--)(m=s[d])&&(a=(r?m(t,e,a):m(a))||a);return r&&a&&G(t,e,a),a};var o=(s,t,e)=>new Promise((r,a)=>{var d=g=>{try{k(e.next(g));}catch(w){a(w);}},m=g=>{try{k(e.throw(g));}catch(w){a(w);}},k=g=>g.done?r(g.value):Promise.resolve(g.value).then(d,m);k((e=e.apply(s,t)).next());});var M="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",i={API_VERSION:"/v1",LOGIN:"/auth/login",REGISTER:"/auth/create-account",ACCOUNT_VERIFY:"/auth/account/verify",RESEND_VERIFY_LINK:"/auth/account/verify",VALIDATE_PASSWORD_TOKEN:"/auth/validate/password",RESET_PASSWORD:"/auth/password/reset",CHANGE_PASSWORD:"/auth/password/change",COLLECTION:"/collection",COLLECTION_TYPE:"/collection-type",COLLECTION_MANY:"/collection/many",BOOKMARK:"/bookmark",NOTIFICATION_FETCH:"/notifications/",NOTIFICATION_MARK_ALL:"/notifications/mark/all",NOTIFICATION_MARK_ONE:"/notifications/mark",ACCOUNT:"/account",ACCOUNT_ONBOARD:"/account/onboard",ACCOUNT_PASSWORD:"/account/password/change",ACCOUNT_TWO_INIT:"/account/initiate/2fa",ACCOUNT_TWO_ACTIVATE:"/account/activate/2fa",ACCOUNT_TWO_DEACTIVATE:"/account/deactivate/2fa",ACCOUNT_LOGOUT:"/account/logout",WALLET_TRANSACTIONS:"/wallet/transactions",A_WALLET_TRANSACTION:"/wallet/transaction",WALLET_EXCHANGE:"/wallet/exchange",WALLET_DATA:"/wallet/data",WALLET_STATS:"/wallet/stats",WALLET_AGGREGATE_STATS:"/wallet/aggregate/stats",WALLETS:"/wallet",SINGLE_WALLET:"/wallet/coin",FILE_UPLOAD:"/upload/",ADD_REVIEW:"/reviews/",CREATE_WITHDRAWAL:"/withdrawals/",FETCH_WITHDRAWALS:"/withdrawals/"};var I=new ct.Token("PAKT_CONFIG"),_=new ct.Token("AUTH_TOKEN"),S=new ct.Token("TEMP_TOKEN");var K="0.1.6";var X=(e=>(e.SUCCESS="SUCCESS",e.ERROR="ERROR",e))(X||{}),n={tryFail:s=>o(void 0,null,function*(){try{return {data:yield s(),status:"SUCCESS"}}catch(t){let e=n.toErrorWithMessage(t);return {data:null,status:"ERROR",message:e?e.message:["Internal Server Error"],code:e.code}}}),formatErrorMsg:s=>s.replace("attr.",""),toErrorWithMessage:s=>{var t;if(typeof s=="string")try{let e=JSON.parse(s);return e.data instanceof Array&&e.data.length>0?{message:e.data.map(r=>n.formatErrorMsg(r)),code:e.errorCode}:{message:[(t=e.message)!=null?t:s],code:e.errorCode}}catch(e){}if(n.isErrorWithMessage(s))return {message:[s.message]};try{return {message:[JSON.stringify(s,null,2)]}}catch(e){return {message:[String(s)]}}},isErrorWithMessage(s){return typeof s=="object"&&s!==null&&"message"in s&&typeof s.message=="string"}},u=(s,t)=>{let e="?";return Object.keys(t).map(r=>{e=e+`${r}=${t[r]}&`;}),s+e};var tt=(s,t)=>import('node-fetch').then(({default:e})=>e(s,t)),c=class{constructor(t){this.id=t;}get(t){return o(this,null,function*(){return this.request(O(p({},t),{method:"GET"}))})}post(t){return o(this,null,function*(){return this.request(O(p({},t),{method:"POST"}))})}put(t){return o(this,null,function*(){return this.request(O(p({},t),{method:"PUT"}))})}delete(t){return o(this,null,function*(){return this.request(O(p({},t),{method:"DELETE"}))})}request(k){return o(this,arguments,function*({path:t,params:e,body:r,method:a},d=0,m){let{verbose:g}=ct.Container.of(this.id).get(I),w=m||this.getUrl({path:t,params:e}),x={headers:yield this.headers(d),method:a,body:r?JSON.stringify(r):void 0},B=Date.now();g&&console.debug(new Date().toISOString(),"SDK Request: ",x.method,w,x.body);try{return yield tt(w,x).then(f=>o(this,null,function*(){let H=Date.now()-B;g&&console.log(new Date().toISOString(),`SDK Response received in ${H}ms: `,f.status,yield f.clone().text());let V=yield f.json();return O(p({},V),{code:f.status})}))}catch(f){return g&&console.warn(new Date().toISOString(),"Error: ",f),Promise.reject(f)}})}getUrl({path:t,params:e}){let r=ct.Container.of(this.id).get(I),a=i.API_VERSION+t,d=new URL(a||"",r.baseUrl);return console.log(a,d),e&&Object.keys(e).filter(m=>!!e[m]).forEach(m=>d.searchParams.append(m,`${e[m]}`)),r.testnet&&d.searchParams.append("type","testnet"),d.toString()}headers(t){return o(this,null,function*(){let e={},r=ct.Container.of(this.id).get(I),a=ct.Container.of(this.id).get(_);a&&(e={Authorization:`Bearer ${a}`});let d=new nodeFetch.Headers(p({"Content-Type":"application/json","x-pkt-sdk-version":K,"x-pkt-sdk-product":"JS","x-pkt-testnet":`${r.testnet}`,"x-pkt-sdk-retry":`${t}`},e));return r.token&&d.append("x-api-key",r.token),d})}};c=l([ct.Service({factory:s=>new c(s.id),transient:!0})],c);exports.AccountModule=class T{constructor(t){this.id=t,this.connector=ct.Container.of(this.id).get(c);}getUser(){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){return (yield this.connector.get({path:i.ACCOUNT})).data}))})}onboardEndpoint(t,e,r){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){let a={skillCategory:t,profileImage:e,type:r};return (yield this.connector.post({path:i.ACCOUNT_ONBOARD,body:a})).data}))})}updateAccount(t){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){let e=p({},t);return (yield this.connector.post({path:i.ACCOUNT_ONBOARD,body:e})).data}))})}changePassword(t,e){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){let r={oldPassword:t,newPassword:e};return (yield this.connector.put({path:i.ACCOUNT_PASSWORD,body:r})).data}))})}initate2FA(t){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){let e={type:t};return (yield this.connector.post({path:i.ACCOUNT_PASSWORD,body:e})).data}))})}active2FA(t){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){let e={code:t};return (yield this.connector.post({path:i.ACCOUNT_TWO_ACTIVATE,body:e})).data}))})}deactive2FA(t){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){let e={code:t};return (yield this.connector.post({path:i.ACCOUNT_TWO_DEACTIVATE,body:e})).data}))})}logout(){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){return (yield this.connector.post({path:i.ACCOUNT_LOGOUT})).data}))})}};exports.AccountModule=l([ct.Service({factory:s=>new exports.AccountModule(s.id),transient:!0})],exports.AccountModule);exports.AuthenticationModule=class h{constructor(t){this.id=t,this.connector=ct.Container.of(this.id).get(c);}login(t,e){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){let r={email:t,password:e},a=yield this.connector.post({path:i.LOGIN,body:r});return a.data.tempToken?ct.Container.of(this.id).set(S,a.data.tempToken.token):ct.Container.of(this.id).set(_,a.data.token),a.data}))})}register(t,e,r,a){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){let d={firstName:t,lastName:e,email:r,password:a},m=yield this.connector.post({path:i.REGISTER,body:d});return m.data.tempToken.token&&ct.Container.of(this.id).set(S,m.data.tempToken.token),m.data}))})}verifyAccount(t,e){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){let r={tempToken:t,token:e};return yield this.connector.post({path:i.ACCOUNT_VERIFY,body:r})}))})}resendVerifyLink(t){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){let e={email:t},r=yield this.connector.post({path:i.RESET_PASSWORD,body:e});return r.data.tempToken&&ct.Container.of(this.id).set(S,r.data.tempToken.token),r.data}))})}resetPassword(t){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){let e={email:t};return (yield this.connector.post({path:i.RESET_PASSWORD,body:e})).data}))})}changePassword(t,e){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){let r={token:t,password:e};return (yield this.connector.post({path:i.CHANGE_PASSWORD,body:r})).data}))})}validatePasswordToken(t){return n.tryFail(()=>o(this,null,function*(){let e={token:t};return (yield this.connector.post({path:i.VALIDATE_PASSWORD_TOKEN,body:e})).data}))}};exports.AuthenticationModule=l([ct.Service({factory:s=>new exports.AuthenticationModule(s.id),transient:!0})],exports.AuthenticationModule);exports.CollectionModule=class A{constructor(t){this.id=t,this.connector=ct.Container.of(this.id).get(c);}getAll(t){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){let e=u(i.COLLECTION,t);return (yield this.connector.get({path:e})).data}))})}getById(t,e){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){let r=u(i.COLLECTION+"/"+t,e);return (yield this.connector.get({path:r})).data}))})}getTypes(t){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){let e=u(i.COLLECTION_TYPE,t);return (yield this.connector.get({path:e})).data}))})}create(t){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){let e=p({},t);return (yield this.connector.post({path:i.COLLECTION,body:e})).data}))})}createMany(t){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){let e=p({},t);return (yield this.connector.post({path:i.COLLECTION,body:e})).data}))})}};exports.CollectionModule=l([ct.Service({factory:s=>new exports.CollectionModule(s.id),transient:!0})],exports.CollectionModule);exports.NotificationModule=class y{constructor(t){this.id=t,this.connector=ct.Container.of(this.id).get(c);}getAll(t){return o(this,null,function*(){let e=u(i.NOTIFICATION_FETCH,t);return n.tryFail(()=>o(this,null,function*(){return (yield this.connector.get({path:e})).data}))})}markAll(){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){return (yield this.connector.post({path:i.NOTIFICATION_MARK_ALL})).data}))})}markOneAsRead(t){return o(this,null,function*(){let e=u(i.NOTIFICATION_MARK_ONE+"/"+t,null);return n.tryFail(()=>o(this,null,function*(){return (yield this.connector.post({path:e})).data}))})}};exports.NotificationModule=l([ct.Service({factory:s=>new exports.NotificationModule(s.id),transient:!0})],exports.NotificationModule);exports.UploadModule=class R{constructor(t){this.id=t,this.connector=ct__default.default.of(this.id).get(c);}fileUpload(t){let e=p({},t);return n.tryFail(()=>o(this,null,function*(){return (yield this.connector.post({path:i.FILE_UPLOAD,body:e})).data}))}};exports.UploadModule=l([ct.Service({factory:s=>new exports.UploadModule(s.id),transient:!0})],exports.UploadModule);exports.WalletModule=class E{constructor(t,e){this.id=t,this.connector=ct__default.default.of(this.id).get(c),this.coin=e;}getTransactions(){return n.tryFail(()=>o(this,null,function*(){return (yield this.connector.get({path:i.WALLET_TRANSACTIONS})).data}))}getATransaction(t){let e=u(i.A_WALLET_TRANSACTION+"/"+t,null);return n.tryFail(()=>o(this,null,function*(){return (yield this.connector.get({path:e})).data}))}getTransactionStats(){return n.tryFail(()=>o(this,null,function*(){return (yield this.connector.get({path:i.WALLET_STATS})).data}))}getAggregateTransactionStats(){return n.tryFail(()=>o(this,null,function*(){return (yield this.connector.get({path:i.WALLET_AGGREGATE_STATS})).data}))}getWalletData(){return n.tryFail(()=>o(this,null,function*(){return (yield this.connector.get({path:i.WALLET_AGGREGATE_STATS})).data}))}getWallets(){return n.tryFail(()=>o(this,null,function*(){return (yield this.connector.get({path:i.WALLETS})).data}))}getSingleWallet(t){let e=u(i.SINGLE_WALLET+"/"+t,null);return n.tryFail(()=>o(this,null,function*(){return (yield this.connector.get({path:e})).data}))}getExchange(){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){return (yield this.connector.get({path:i.WALLET_EXCHANGE})).data}))})}};exports.WalletModule=l([ct.Service({factory:s=>new exports.WalletModule(s.id,s.coin)})],exports.WalletModule);exports.WithdrawalModule=class C{constructor(t){this.id=t,this.connector=ct__default.default.of(this.id).get(c);}createWithdrawal(t){return n.tryFail(()=>o(this,null,function*(){let e=p({},t);return (yield this.connector.post({path:i.CREATE_WITHDRAWAL,body:e})).data}))}fetchWithdrawal(t){let e=u(i.FETCH_WITHDRAWALS,t);return n.tryFail(()=>o(this,null,function*(){return (yield this.connector.get({path:e})).data}))}};exports.WithdrawalModule=l([ct.Service({factory:s=>new exports.WithdrawalModule(s.id)})],exports.WithdrawalModule);exports.BookMarkModule=class W{constructor(t){this.id=t,this.connector=ct.Container.of(this.id).get(c);}getAll(t){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){let e=u(i.BOOKMARK,t);return (yield this.connector.get({path:e})).data}))})}getById(t,e){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){let r=u(i.BOOKMARK+"/"+t,e);return (yield this.connector.get({path:r})).data}))})}create(t){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){let e=p({},t);return (yield this.connector.post({path:i.BOOKMARK,body:e})).data}))})}delete(t){return o(this,null,function*(){return n.tryFail(()=>o(this,null,function*(){return (yield this.connector.delete({path:i.BOOKMARK+"/"+t})).data}))})}};exports.BookMarkModule=l([ct.Service({factory:s=>new exports.BookMarkModule(s.id),transient:!0})],exports.BookMarkModule);exports.ReviewModule=class F{constructor(t){this.id=t,this.connector=ct__default.default.of(this.id).get(c);}addReview(t){let e=p({},t);return n.tryFail(()=>o(this,null,function*(){return (yield this.connector.post({path:i.ADD_REVIEW,body:e})).data}))}};exports.ReviewModule=l([ct.Service({factory:s=>new exports.ReviewModule(s.id),transient:!0})],exports.ReviewModule);exports.PaktSDK=class P{constructor(t){this.auth=ct.Container.of(t).get(exports.AuthenticationModule),this.collection=ct.Container.of(t).get(exports.CollectionModule),this.account=ct.Container.of(t).get(exports.AccountModule),this.notifications=ct.Container.of(t).get(exports.NotificationModule),this.file=ct.Container.of(t).get(exports.UploadModule),this.wallet=ct.Container.of(t).get(exports.WalletModule),this.withdrawal=ct.Container.of(t).get(exports.WithdrawalModule);}static init(t){return o(this,null,function*(){let e=p({},t),r=exports.PaktSDK.generateRandomString();return ct.Container.of(r).set(I,e),ct.Container.of(r).set(_,""),ct.Container.of(r).set(S,""),new exports.PaktSDK(r)})}static generateRandomString(){let t=M,e="";for(let r=0;r<60;r++)e+=t.charAt(Math.floor(Math.random()*t.length));return e}};exports.PaktSDK=l([ct.Service({transient:!0})],exports.PaktSDK);

exports.API_PATHS = i;
exports.AUTH_TOKEN = _;
exports.CHARACTERS = M;
exports.ErrorUtils = n;
exports.PAKT_CONFIG = I;
exports.Status = X;
exports.TEMP_TOKEN = S;
exports.parseUrlWithQUery = u;