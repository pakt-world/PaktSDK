'use strict';

require('reflect-metadata');
var mt = require('typedi');
var nodeFetch = require('node-fetch');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var mt__default = /*#__PURE__*/_interopDefault(mt);

var J=Object.defineProperty,X=Object.defineProperties,z=Object.getOwnPropertyDescriptor,tt=Object.getOwnPropertyDescriptors;var H=Object.getOwnPropertySymbols;var et=Object.prototype.hasOwnProperty,ot=Object.prototype.propertyIsEnumerable;var $=(n,e,t)=>e in n?J(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,p=(n,e)=>{for(var t in e||(e={}))et.call(e,t)&&$(n,t,e[t]);if(H)for(var t of H(e))ot.call(e,t)&&$(n,t,e[t]);return n},T=(n,e)=>X(n,tt(e));var l=(n,e,t,r)=>{for(var o=r>1?void 0:r?z(e,t):e,c=n.length-1,u;c>=0;c--)(u=n[c])&&(o=(r?u(e,t,o):u(o))||o);return r&&o&&J(e,t,o),o};var s=(n,e,t)=>new Promise((r,o)=>{var c=D=>{try{M(t.next(D));}catch(f){o(f);}},u=D=>{try{M(t.throw(D));}catch(f){o(f);}},M=D=>D.done?r(D.value):Promise.resolve(D.value).then(c,u);M((t=t.apply(n,e)).next());});var j="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",a={API_VERSION:"/v1",LOGIN:"/auth/login",REGISTER:"/auth/create-account",ACCOUNT_VERIFY:"/auth/account/verify",RESEND_VERIFY_LINK:"/auth/verify/resend",VALIDATE_PASSWORD_TOKEN:"/auth/validate/password",RESET_PASSWORD:"/auth/password/reset",CHANGE_PASSWORD:"/auth/password/change",VALIDATE_REFERRAL:"/auth/referral/validate/",COLLECTION:"/collection",COLLECTION_TYPE:"/collection-type",COLLECTION_MANY:"/collection/many",COLLECTION_UPDATE:"/collection",BOOKMARK:"/bookmark",NOTIFICATION_FETCH:"/notifications/",NOTIFICATION_MARK_ALL:"/notifications/mark/all",NOTIFICATION_MARK_ONE:"/notifications/mark",ACCOUNT:"/account",ACCOUNT_ONBOARD:"/account/onboard",ACCOUNT_UPDATE:"/account/update",ACCOUNT_PASSWORD:"/account/password/change",ACCOUNT_TWO_INIT:"/account/initiate/2fa",ACCOUNT_TWO_ACTIVATE:"/account/activate/2fa",ACCOUNT_TWO_DEACTIVATE:"/account/deactivate/2fa",ACCOUNT_FETCH_ALL:"/account/user",ACCOUNT_FETCH_SINGLE:"/account/user/",ACCOUNT_LOGOUT:"/account/logout",ACCOUNT_SEND_EMAIL_TWO_FA:"/account/2fa/email",TRANSACTIONS:"/transaction/",A_TRANSACTION:"/transaction",TRANSACTION_STATS:"/transaction/stats",TRANSACTION_AGGREGATE_STATS:"/transaction/aggregate/stats",TRANSACTION_EXCHANGE:"/transaction/exchange",WALLETS:"/wallet",SINGLE_WALLET:"/wallet/coin",FILE_UPLOAD:"/upload/",ADD_REVIEW:"/reviews/",GET_REVIEW:"/reviews/",CREATE_WITHDRAWAL:"/withdrawals/",FETCH_WITHDRAWALS:"/withdrawals/",CREATE_SESSION:"/user-verification/veriff/session/new",SEND_SESSION_MEDIA:"/user-verification/veriff/session/media",SESSION_ATTEMPTS:"/user-verification/veriff/session/attempts",USER_VERIFICATION:"/user-verification/user",DELETE_SESSION:"/user-verification/veriff/session/delete",GET_USER_MESSAGES:"/chat/",CREATE_CONNECTION_FILTER:"/conn-filter/",GET_CONNECTION_FILTER:"/conn-filter/user",UPDATE_CONNECTION_FILTER:"/conn-filter/",SEND_INVITE:"/invite/",ACCEPT_INVITE:"/invite",DECLINE_INVITE:"/invite",VIEW_ALL_INVITE:"/invite/",VIEW_A_INVITE:"/invite/",CANCEL_AN_INVITE:"/invite/",FEEDS:"/feeds",FEEDS_DISMISS_ONE:"/dismiss",FEEDS_DISMISS_ALL:"/feeds/dismiss/all"};var k=new mt.Token("PAKT_CONFIG"),W=new mt.Token("AUTH_TOKEN"),L=new mt.Token("TEMP_TOKEN"),Gt=n=>n==null||typeof n=="object"&&Object.keys(n).length===0||typeof n=="string"&&n===""&&n.trim().length===0||n==="undefined"||n==="null";var q="0.1.36";var g=(t=>(t.SUCCESS="SUCCESS",t.ERROR="ERROR",t))(g||{}),i={tryFail:n=>s(void 0,null,function*(){try{return {data:yield n(),status:"SUCCESS"}}catch(e){let t=i.toErrorWithMessage(e);return {data:null,status:"ERROR",message:t?t.message:["Internal Server Error"],code:t.code}}}),newTryFail:n=>s(void 0,null,function*(){try{let e=yield n();return p({},e)}catch(e){let t=i.toErrorWithMessage(e);return {data:null,status:"ERROR",message:t?t.message:["Internal Server Error"],code:t.code}}}),formatErrorMsg:n=>n.replace("attr.",""),toErrorWithMessage:n=>{var e;if(typeof n=="string")try{let t=JSON.parse(n);return t.data instanceof Array&&t.data.length>0?{message:t.data.map(r=>i.formatErrorMsg(r)),code:t.errorCode}:{message:[(e=t.message)!=null?e:n],code:t.errorCode}}catch(t){}if(i.isErrorWithMessage(n))return {message:[n.message]};try{return {message:[JSON.stringify(n,null,2)]}}catch(t){return {message:[String(n)]}}},isErrorWithMessage(n){return typeof n=="object"&&n!==null&&"message"in n&&typeof n.message=="string"}},m=(n,e)=>{let t="?",r=Object.keys(e||{});return r.length===0?n:(r.map((o,c)=>{let u="&";(o===void 0||o==="undefined"||o===null||o==="null"||o.length===0)&&(t=t),c+1===r.length&&(u=""),t=t+`${o}=${e[o]}${u}`;}),n+t)};var it=(n,e)=>import('node-fetch').then(({default:t})=>t(n,e)),d=class{constructor(e){this.id=e;}get(e){return s(this,null,function*(){return this.request(T(p({},e),{method:"GET"}))})}post(e){return s(this,null,function*(){return this.request(T(p({},e),{method:"POST"}))})}patch(e){return s(this,null,function*(){return this.request(T(p({},e),{method:"PATCH"}))})}put(e){return s(this,null,function*(){return this.request(T(p({},e),{method:"PUT"}))})}delete(e){return s(this,null,function*(){return this.request(T(p({},e),{method:"DELETE"}))})}request(D){return s(this,arguments,function*({path:e,params:t,body:r,method:o,authToken:c},u=0,M){let{verbose:f}=mt.Container.of(this.id).get(k),K=M||this.getUrl({path:e,params:t}),G={headers:yield this.headers(u,c),method:o,body:r?JSON.stringify(r):void 0},Y=Date.now();f&&console.debug(new Date().toISOString(),"SDK Request: ",G.method,K,G.body);try{return yield it(K,G).then(E=>s(this,null,function*(){let Q=Date.now()-Y;f&&console.log(new Date().toISOString(),`SDK Response received in ${Q}ms: `,E.status,yield E.clone().text());let Z=yield E.json();return T(p({},Z),{code:E.status})}))}catch(E){return f&&console.warn(new Date().toISOString(),"Error: ",E),Promise.reject(E)}})}getUrl({path:e,params:t}){let r=mt.Container.of(this.id).get(k),o=a.API_VERSION+e,c=new URL(o||"",r.baseUrl);return console.log(o,c),t&&Object.keys(t).filter(u=>!!t[u]).forEach(u=>c.searchParams.append(u,`${t[u]}`)),r.testnet&&c.searchParams.append("type","testnet"),c.toString()}headers(e,t){return s(this,null,function*(){let r={},o=mt.Container.of(this.id).get(k);t&&(r={Authorization:`Bearer ${t}`});let c=new nodeFetch.Headers(p({"Content-Type":"application/json","x-pkt-sdk-version":q,"x-pkt-sdk-product":"JS","x-pkt-testnet":`${o.testnet}`,"x-pkt-sdk-retry":`${e}`},r));return o.token&&c.append("x-api-key",o.token),c})}};d=l([mt.Service({factory:n=>new d(n.id),transient:!0})],d);exports.AccountModule=class C{constructor(e){this.id=e,this.connector=mt.Container.of(this.id).get(d);}getUser(e){return s(this,null,function*(){return i.tryFail(()=>s(this,null,function*(){let t=yield this.connector.get({path:a.ACCOUNT,authToken:e});if(Number(t.statusCode||t.code)>226||t.status==="ERROR")throw new Error(t.message);return t.data}))})}onboardEndpoint(e,t,r,o){return s(this,null,function*(){return i.tryFail(()=>s(this,null,function*(){let c={skillCategory:e,profileImage:t,type:r},u=yield this.connector.post({path:a.ACCOUNT_ONBOARD,body:c,authToken:o});if(Number(u.statusCode||u.code)>226||u.status==="ERROR")throw new Error(u.message);return u.data}))})}updateAccount(e,t){return s(this,null,function*(){return i.tryFail(()=>s(this,null,function*(){p({},e);let o=yield this.connector.patch({path:a.ACCOUNT_UPDATE,body:e,authToken:t});if(Number(o.statusCode||o.code)>226||o.status==="ERROR")throw new Error(o.message);return o.data}))})}changePassword(e,t,r){return s(this,null,function*(){return i.tryFail(()=>s(this,null,function*(){let o={oldPassword:e,newPassword:t},c=yield this.connector.put({path:a.ACCOUNT_PASSWORD,body:o,authToken:r});if(Number(c.statusCode||c.code)>226||c.status==="ERROR")throw new Error(c.message);return c.data}))})}initate2FA(e,t){return s(this,null,function*(){return i.tryFail(()=>s(this,null,function*(){let r={type:e},o=yield this.connector.post({path:a.ACCOUNT_PASSWORD,body:r,authToken:t});if(Number(o.statusCode||o.code)>226||o.status==="ERROR")throw new Error(o.message);return o.data}))})}activate2FA(e,t){return s(this,null,function*(){return i.newTryFail(()=>s(this,null,function*(){let r={code:e},o=yield this.connector.post({path:a.ACCOUNT_TWO_ACTIVATE,body:r,authToken:t});return Number(o.statusCode||o.code)>226||o.status==="ERROR",o}))})}deactivate2FA(e,t){return s(this,null,function*(){return i.newTryFail(()=>s(this,null,function*(){let r={code:e},o=yield this.connector.post({path:a.ACCOUNT_TWO_DEACTIVATE,body:r,authToken:t});return Number(o.statusCode||o.code)>226||o.status==="ERROR",o}))})}sendEmailTwoFA(e){return s(this,null,function*(){return i.newTryFail(()=>s(this,null,function*(){let t=yield this.connector.post({path:a.ACCOUNT_SEND_EMAIL_TWO_FA,authToken:e});return Number(t.statusCode||t.code)>226||t.status==="ERROR",t}))})}getAUser(e,t){return s(this,null,function*(){return i.newTryFail(()=>s(this,null,function*(){let r=yield this.connector.get({path:`${a.ACCOUNT_FETCH_SINGLE}${e}`,authToken:t});return Number(r.statusCode||r.code)>226||r.status==="ERROR",r}))})}getUsers(e,t){return s(this,null,function*(){if(t){let r=m(a.ACCOUNT_FETCH_ALL,p({},t));return i.newTryFail(()=>s(this,null,function*(){let o=yield this.connector.get({path:r,authToken:e});return Number(o.statusCode||o.code)>226||o.status==="ERROR",o}))}return i.newTryFail(()=>s(this,null,function*(){let r=yield this.connector.get({path:a.ACCOUNT_FETCH_ALL});return Number(r.statusCode||r.code)>226||r.status==="ERROR",r}))})}logout(e){return s(this,null,function*(){return i.newTryFail(()=>s(this,null,function*(){return yield this.connector.post({path:a.ACCOUNT_LOGOUT,authToken:e})}))})}};exports.AccountModule=l([mt.Service({factory:n=>new exports.AccountModule(n.id),transient:!0})],exports.AccountModule);exports.AuthenticationModule=class h{constructor(e){this.id=e,this.connector=mt.Container.of(this.id).get(d);}login(e,t){return s(this,null,function*(){return i.newTryFail(()=>s(this,null,function*(){let r={email:e,password:t},o=yield this.connector.post({path:a.LOGIN,body:r});return Number(o.statusCode||o.code)>226||o.status==="ERROR"||(o.data.tempToken?mt.Container.of(this.id).set(L,o.data.tempToken.token):mt.Container.of(this.id).set(W,o.data.token)),o}))})}register(e){return s(this,null,function*(){return i.newTryFail(()=>s(this,null,function*(){let t=p({},e),r=yield this.connector.post({path:a.REGISTER,body:t});return Number(r.statusCode||r.code)>226||r.status==="ERROR"||r.data.tempToken.token&&mt.Container.of(this.id).set(L,r.data.tempToken.token),r}))})}verifyAccount(e,t){return s(this,null,function*(){return i.newTryFail(()=>s(this,null,function*(){let r={tempToken:e,token:t},o=yield this.connector.post({path:a.ACCOUNT_VERIFY,body:r});return Number(o.statusCode||o.code)>226||o.status==="ERROR"||mt.Container.of(this.id).set(W,o.data.token),o}))})}resendVerifyLink(e){return s(this,null,function*(){return i.newTryFail(()=>s(this,null,function*(){let t={email:e},r=yield this.connector.post({path:a.RESEND_VERIFY_LINK,body:t});return Number(r.statusCode||r.code)>226||r.status==="ERROR"||r.data.tempToken&&mt.Container.of(this.id).set(L,r.data.tempToken.token),r}))})}resetPassword(e){return s(this,null,function*(){return i.newTryFail(()=>s(this,null,function*(){let t={email:e},r=yield this.connector.post({path:a.RESET_PASSWORD,body:t});return Number(r.statusCode||r.code)>226||r.status==="ERROR",r}))})}changePassword(e,t,r){return s(this,null,function*(){return i.newTryFail(()=>s(this,null,function*(){let o={token:e,tempToken:t,password:r},c=yield this.connector.post({path:a.CHANGE_PASSWORD,body:o});return Number(c.statusCode||c.code)>226||c.status==="ERROR",c}))})}validatePasswordToken(e,t){return i.newTryFail(()=>s(this,null,function*(){let r={token:e,tempToken:t},o=yield this.connector.post({path:`${a.VALIDATE_PASSWORD_TOKEN}/${e}`,body:r});return Number(o.statusCode||o.code)>226||o.status==="ERROR",o}))}validateReferral(e){return i.newTryFail(()=>s(this,null,function*(){let t={token:e},r=yield this.connector.post({path:`${a.VALIDATE_REFERRAL}`,body:t});return Number(r.statusCode||r.code)>226||r.status==="ERROR",r}))}};exports.AuthenticationModule=l([mt.Service({factory:n=>new exports.AuthenticationModule(n.id),transient:!0})],exports.AuthenticationModule);var ut=(o=>(o.FEED="feed",o.COLLECTION="collection",o.INVITE="invite",o.USER="user",o))(ut||{});exports.BookMarkModule=class y{constructor(e){this.id=e,this.connector=mt.Container.of(this.id).get(d);}getAll(e,t){return s(this,null,function*(){return i.newTryFail(()=>s(this,null,function*(){let r=m(a.BOOKMARK,t),o=yield this.connector.get({path:r,authToken:e});return Number(o.statusCode||o.code)>226||o.status==="ERROR",o}))})}getById(e,t,r){return s(this,null,function*(){return i.newTryFail(()=>s(this,null,function*(){let o=m(a.BOOKMARK+"/"+t,r),c=yield this.connector.get({path:o,authToken:e});return Number(c.statusCode||c.code)>226||c.status==="ERROR",c}))})}create(e,t){return s(this,null,function*(){return i.newTryFail(()=>s(this,null,function*(){let r=p({},t),o=yield this.connector.post({path:a.BOOKMARK,body:r,authToken:e});return Number(o.statusCode||o.code)>226||o.status==="ERROR",o}))})}delete(e,t){return s(this,null,function*(){return i.newTryFail(()=>s(this,null,function*(){let r=yield this.connector.delete({path:a.BOOKMARK+"/"+t,authToken:e});return Number(r.statusCode||r.code)>226||r.status==="ERROR",r}))})}};exports.BookMarkModule=l([mt.Service({factory:n=>new exports.BookMarkModule(n.id),transient:!0})],exports.BookMarkModule);exports.ChatModule=class A{constructor(e){this.id=e,this.connector=mt__default.default.of(this.id).get(d);}getUserMessages(e){return i.newTryFail(()=>s(this,null,function*(){let t=yield this.connector.get({path:a.GET_USER_MESSAGES,authToken:e});return Number(t.statusCode||t.code)>226||t.status==="ERROR",t}))}};exports.ChatModule=l([mt.Service({factory:n=>new exports.ChatModule(n.id),transient:!0})],exports.ChatModule);exports.CollectionModule=class I{constructor(e){this.id=e,this.connector=mt.Container.of(this.id).get(d);}getAll(e,t){return s(this,null,function*(){return i.newTryFail(()=>s(this,null,function*(){let r=m(`${a.COLLECTION}/`,t),o=yield this.connector.get({path:r,authToken:e});return Number(o.statusCode||o.code)>226||o.status==="ERROR",o}))})}getById(e,t){return s(this,null,function*(){return i.newTryFail(()=>s(this,null,function*(){let r=a.COLLECTION+"/"+t,o=yield this.connector.get({path:r,authToken:e});return Number(o.statusCode||o.code)>226||o.status==="ERROR",o}))})}getTypes(e,t){return s(this,null,function*(){return i.newTryFail(()=>s(this,null,function*(){let r=m(a.COLLECTION_TYPE,t),o=yield this.connector.get({path:r,authToken:e});return Number(o.statusCode||o.code)>226||o.status==="ERROR",o}))})}create(e,t){return s(this,null,function*(){return i.newTryFail(()=>s(this,null,function*(){let r=p({},t),o=yield this.connector.post({path:a.COLLECTION,body:r,authToken:e});return Number(o.statusCode||o.code)>226||o.status==="ERROR",o}))})}createMany(e,t){return s(this,null,function*(){return i.newTryFail(()=>s(this,null,function*(){let r=p({},t),o=yield this.connector.post({path:a.COLLECTION,body:r,authToken:e});return Number(o.statusCode||o.code)>226||o.status==="ERROR",o}))})}updateCollection(e,t,r){return i.newTryFail(()=>s(this,null,function*(){let o=`${a.COLLECTION_UPDATE}/${t}`,c=p({},r),u=yield this.connector.patch({path:o,body:c,authToken:e});return Number(u.statusCode||u.code)>226||u.status==="ERROR",u}))}getACollectionType(e,t){return i.newTryFail(()=>s(this,null,function*(){let r=m(`${a.COLLECTION_TYPE}/${t}`,{id:t}),o=yield this.connector.get({path:r,authToken:e});return Number(o.statusCode||o.code)>226||o.status==="ERROR",o}))}deleteACollection(e,t){return i.newTryFail(()=>s(this,null,function*(){let r=yield this.connector.delete({path:`${a.COLLECTION}/${t}`,authToken:e});return Number(r.statusCode||r.code)>226||r.status==="ERROR",r}))}updateManyCollections(e,t){return i.newTryFail(()=>s(this,null,function*(){let r=yield this.connector.patch({path:`${a.COLLECTION}/many/update`,body:{collections:t},authToken:e});return Number(r.statusCode||r.code)>226||r.status==="ERROR",r}))}};exports.CollectionModule=l([mt.Service({factory:n=>new exports.CollectionModule(n.id),transient:!0})],exports.CollectionModule);exports.ConnectionFilterModule=class N{constructor(e){this.id=e,this.connector=mt__default.default.of(this.id).get(d);}create(e,t){return i.newTryFail(()=>s(this,null,function*(){let r=p({},t),o=yield this.connector.post({path:a.CREATE_CONNECTION_FILTER,body:r,authToken:e});return Number(o.statusCode||o.code)>226||o.status==="ERROR",o}))}update(e,t){return i.newTryFail(()=>s(this,null,function*(){let r=p({},t),o=yield this.connector.patch({path:a.UPDATE_CONNECTION_FILTER,body:r,authToken:e});return Number(o.statusCode||o.code)>226||o.status==="ERROR",o}))}getForAUser(e){return i.newTryFail(()=>s(this,null,function*(){let t=yield this.connector.get({path:a.GET_CONNECTION_FILTER,authToken:e});return Number(t.statusCode||t.code)>226||t.status==="ERROR",t}))}};exports.ConnectionFilterModule=l([mt.Service({factory:n=>new exports.ConnectionFilterModule(n.id),transient:!0})],exports.ConnectionFilterModule);exports.FeedModule=class O{constructor(e){this.id=e,this.connector=mt.Container.of(this.id).get(d);}create(e,t){return i.tryFail(()=>s(this,null,function*(){let r=p({},t),o=yield this.connector.post({path:`${a.FEEDS}/`,body:r,authToken:e});return Number(o.statusCode||o.code)>226||o.status==="ERROR",o}))}getAll(e,t){return i.newTryFail(()=>s(this,null,function*(){let r=t?T(p({},t),{isOwner:!0}):{isOwner:!0},o=m(`${a.FEEDS}/`,p({},r)),c=yield this.connector.get({path:o,authToken:e});return Number(c.statusCode||c.code)>226||c.status==="ERROR",c}))}getById(e,t){return i.newTryFail(()=>s(this,null,function*(){let r=yield this.connector.get({path:`${a.FEEDS}/${t}`,authToken:e});return Number(r.statusCode||r.code)>226||r.status==="ERROR",r}))}dismissAllFeeds(e){return i.newTryFail(()=>s(this,null,function*(){let t=yield this.connector.put({path:`${a.FEEDS_DISMISS_ALL}`,authToken:e});return Number(t.statusCode||t.code)>226||t.status==="ERROR",t}))}dismissAFeed(e,t){return i.newTryFail(()=>s(this,null,function*(){let r=yield this.connector.put({path:`${a.FEEDS}/${t}/dismiss`,authToken:e});return Number(r.statusCode||r.code)>226||r.status==="ERROR",r}))}};exports.FeedModule=l([mt.Service({factory:n=>new exports.FeedModule(n.id),transient:!0})],exports.FeedModule);exports.InviteModule=class w{constructor(e){this.id=e,this.connector=mt__default.default.of(this.id).get(d);}sendInvite(e,t){return i.newTryFail(()=>s(this,null,function*(){let r=`${a.SEND_INVITE}`,o=p({},t),c=yield this.connector.post({path:r,body:o,authToken:e});return Number(c.statusCode||c.code)>226||c.status==="ERROR",c}))}acceptInvite(e,t){return i.newTryFail(()=>s(this,null,function*(){let r=`${a.ACCEPT_INVITE}/${t}/accept`,o=yield this.connector.post({path:r,authToken:e});return Number(o.statusCode||o.code)>226||o.status==="ERROR",o}))}declineInvite(e,t){return i.newTryFail(()=>s(this,null,function*(){let r=`${a.DECLINE_INVITE}/${t}/decline`,o=yield this.connector.post({path:r,authToken:e});return Number(o.statusCode||o.code)>226||o.status==="ERROR",o}))}getAll(e,t){return i.newTryFail(()=>s(this,null,function*(){let r=m(a.VIEW_ALL_INVITE,t),o=yield this.connector.get({path:r,authToken:e});return Number(o.statusCode||o.code)>226||o.status==="ERROR",o}))}getAnInvite(e,t){return i.newTryFail(()=>s(this,null,function*(){let r=`${a.VIEW_A_INVITE}/${t}`,o=yield this.connector.get({path:r,authToken:e});return Number(o.statusCode||o.code)>226||o.status==="ERROR",o}))}cancelInvite(e,t){return i.newTryFail(()=>s(this,null,function*(){let r=`${a.CANCEL_AN_INVITE}/${t}/cancel`,o=yield this.connector.post({path:r,authToken:e});return Number(o.statusCode||o.code)>226||o.status==="ERROR",o}))}};exports.InviteModule=l([mt.Service({factory:n=>new exports.InviteModule(n.id),transient:!0})],exports.InviteModule);exports.NotificationModule=class S{constructor(e){this.id=e,this.connector=mt.Container.of(this.id).get(d);}getAll(e,t){return s(this,null,function*(){let r=m(a.NOTIFICATION_FETCH,t);return i.newTryFail(()=>s(this,null,function*(){let o=yield this.connector.get({path:r,authToken:e});return Number(o.statusCode||o.code)>226||o.status==="ERROR",o}))})}markAll(e){return s(this,null,function*(){return i.newTryFail(()=>s(this,null,function*(){let t=yield this.connector.post({path:a.NOTIFICATION_MARK_ALL,authToken:e});return Number(t.statusCode||t.code)>226||t.status==="ERROR",t}))})}markOneAsRead(e,t){return s(this,null,function*(){return i.newTryFail(()=>s(this,null,function*(){let r=yield this.connector.post({path:a.NOTIFICATION_MARK_ONE+"/"+t,authToken:e});return Number(r.statusCode||r.code)>226||r.status==="ERROR",r}))})}};exports.NotificationModule=l([mt.Service({factory:n=>new exports.NotificationModule(n.id),transient:!0})],exports.NotificationModule);exports.ReviewModule=class P{constructor(e){this.id=e,this.connector=mt__default.default.of(this.id).get(d);}viewAll(e,t){return i.newTryFail(()=>s(this,null,function*(){let r=m(a.GET_REVIEW,t),o=yield this.connector.get({path:r,authToken:e});return Number(o.statusCode||o.code)>226||o.status==="ERROR",o}))}viewAReview(e,t){return i.newTryFail(()=>s(this,null,function*(){let r=yield this.connector.get({path:`${a.GET_REVIEW}${t}`,authToken:e});return Number(r.statusCode||r.code)>226||r.status==="ERROR",r}))}addReview(e,t){let r=p({},t);return i.newTryFail(()=>s(this,null,function*(){let o=yield this.connector.post({path:a.ADD_REVIEW,body:r,authToken:e});return Number(o.statusCode||o.code)>226||o.status==="ERROR",o}))}};exports.ReviewModule=l([mt.Service({factory:n=>new exports.ReviewModule(n.id),transient:!0})],exports.ReviewModule);exports.UploadModule=class F{constructor(e){this.id=e,this.connector=mt__default.default.of(this.id).get(d);}fileUpload(e,t){let r=p({},t);return i.newTryFail(()=>s(this,null,function*(){let o=yield this.connector.post({path:a.FILE_UPLOAD,body:r,authToken:e});return Number(o.statusCode||o.code)>226||o.status==="ERROR",o}))}getFileUploads(e,t){return i.newTryFail(()=>s(this,null,function*(){let r=t||{},o=m(a.FILE_UPLOAD,r),c=t?a.FILE_UPLOAD:o,u=yield this.connector.get({path:c,authToken:e});return Number(u.statusCode||u.code)>226||u.status==="ERROR",u}))}getAFileUpload(e,t){return i.newTryFail(()=>s(this,null,function*(){let r=yield this.connector.get({path:`${a.FILE_UPLOAD}${t}`,authToken:e});return Number(r.statusCode||r.code)>226||r.status==="ERROR",r}))}};exports.UploadModule=l([mt.Service({factory:n=>new exports.UploadModule(n.id),transient:!0})],exports.UploadModule);exports.UserVerificationModule=class _{constructor(e){this.id=e,this.connector=mt__default.default.of(this.id).get(d);}createSession(e,t){let r=p({},t);return i.newTryFail(()=>s(this,null,function*(){let o=yield this.connector.post({path:a.CREATE_SESSION,body:r,authToken:e});return Number(o.statusCode||o.code)>226||o.status==="ERROR",o}))}sendSessionMedia(e,t){let r=p({},t);return i.newTryFail(()=>s(this,null,function*(){let o=yield this.connector.post({path:a.SEND_SESSION_MEDIA,body:r,authToken:e});return Number(o.statusCode||o.code)>226||o.status==="ERROR",o}))}getSessionAttempts(e){let t=m(a.SESSION_ATTEMPTS,null);return i.newTryFail(()=>s(this,null,function*(){let r=yield this.connector.get({path:t,authToken:e});return Number(r.statusCode||r.code)>226||r.status==="ERROR",r}))}getUserVerifications(e){let t=m(a.USER_VERIFICATION,null);return i.newTryFail(()=>s(this,null,function*(){let r=yield this.connector.get({path:t,authToken:e});return Number(r.statusCode||r.code)>226||r.status==="ERROR",r}))}};exports.UserVerificationModule=l([mt.Service({factory:n=>new exports.UserVerificationModule(n.id),transient:!0})],exports.UserVerificationModule);exports.WalletModule=class U{constructor(e,t){this.id=e,this.connector=mt__default.default.of(this.id).get(d),this.coin=t;}getTransactions(e){return i.newTryFail(()=>s(this,null,function*(){let t=yield this.connector.get({path:a.TRANSACTIONS,authToken:e});return Number(t.statusCode||t.code)>226||t.status==="ERROR",t}))}getATransaction(e,t){return i.newTryFail(()=>s(this,null,function*(){let r=yield this.connector.get({path:`${a.A_TRANSACTION}/${t}`,authToken:e});return Number(r.statusCode||r.code)>226||r.status==="ERROR",r}))}getTransactionStats(e){return i.newTryFail(()=>s(this,null,function*(){let t=yield this.connector.get({path:a.TRANSACTION_STATS,authToken:e});return Number(t.statusCode||t.code)>226||t.status==="ERROR",t}))}getAggregateTransactionStats(e){return i.newTryFail(()=>s(this,null,function*(){let t=yield this.connector.get({path:a.TRANSACTION_AGGREGATE_STATS,authToken:e});return Number(t.statusCode||t.code)>226||t.status==="ERROR",t}))}getWallets(e){return i.newTryFail(()=>s(this,null,function*(){let t=yield this.connector.get({path:a.WALLETS,authToken:e});return Number(t.statusCode||t.code)>226||t.status==="ERROR",t}))}getSingleWallet(e,t){return i.newTryFail(()=>s(this,null,function*(){let r=yield this.connector.get({path:a.SINGLE_WALLET+"/"+t,authToken:e});return Number(r.statusCode||r.code)>226||r.status==="ERROR",r}))}getExchange(e){return s(this,null,function*(){return i.newTryFail(()=>s(this,null,function*(){let t=yield this.connector.get({path:a.TRANSACTION_EXCHANGE,authToken:e});return Number(t.statusCode||t.code)>226||t.status==="ERROR",t}))})}};exports.WalletModule=l([mt.Service({factory:n=>new exports.WalletModule(n.id,n.coin)})],exports.WalletModule);exports.WithdrawalModule=class b{constructor(e){this.id=e,this.connector=mt__default.default.of(this.id).get(d);}createWithdrawal(e,t){return i.newTryFail(()=>s(this,null,function*(){let r=p({},t);return yield this.connector.post({path:a.CREATE_WITHDRAWAL,body:r,authToken:e})}))}fetchWithdrawal(e,t){let r=m(a.FETCH_WITHDRAWALS,t);return i.newTryFail(()=>s(this,null,function*(){let o=yield this.connector.get({path:r,authToken:e});return Number(o.statusCode||o.code)>226||o.status==="ERROR",o}))}};exports.WithdrawalModule=l([mt.Service({factory:n=>new exports.WithdrawalModule(n.id)})],exports.WithdrawalModule);exports.PaktSDK=class v{constructor(e){this.auth=mt.Container.of(e).get(exports.AuthenticationModule),this.collection=mt.Container.of(e).get(exports.CollectionModule),this.account=mt.Container.of(e).get(exports.AccountModule),this.notifications=mt.Container.of(e).get(exports.NotificationModule),this.file=mt.Container.of(e).get(exports.UploadModule),this.wallet=mt.Container.of(e).get(exports.WalletModule),this.withdrawal=mt.Container.of(e).get(exports.WithdrawalModule),this.review=mt.Container.of(e).get(exports.ReviewModule),this.bookmark=mt.Container.of(e).get(exports.BookMarkModule),this.userVerification=mt.Container.of(e).get(exports.UserVerificationModule),this.chat=mt.Container.of(e).get(exports.ChatModule),this.connectionFilter=mt.Container.of(e).get(exports.ConnectionFilterModule),this.invite=mt.Container.of(e).get(exports.InviteModule),this.feed=mt.Container.of(e).get(exports.FeedModule);}static init(e){return s(this,null,function*(){let t=p({},e),r=exports.PaktSDK.generateRandomString();return mt.Container.of(r).set(k,t),mt.Container.of(r).set(W,""),mt.Container.of(r).set(L,""),new exports.PaktSDK(r)})}static generateRandomString(){let e=j,t="";for(let r=0;r<60;r++)t+=e.charAt(Math.floor(Math.random()*e.length));return t}};exports.PaktSDK=l([mt.Service({transient:!0})],exports.PaktSDK);

exports.API_PATHS = a;
exports.AUTH_TOKEN = W;
exports.BookmarkEnumType = ut;
exports.CHARACTERS = j;
exports.ErrorUtils = i;
exports.PAKT_CONFIG = k;
exports.Status = g;
exports.TEMP_TOKEN = L;
exports.isEmpty = Gt;
exports.parseUrlWithQuery = m;
