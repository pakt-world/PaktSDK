'use strict';

require('reflect-metadata');
var ut = require('typedi');
var nodeFetch = require('node-fetch');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var ut__default = /*#__PURE__*/_interopDefault(ut);

var $=Object.defineProperty,Z=Object.defineProperties,X=Object.getOwnPropertyDescriptor,z=Object.getOwnPropertyDescriptors;var H=Object.getOwnPropertySymbols;var tt=Object.prototype.hasOwnProperty,et=Object.prototype.propertyIsEnumerable;var K=(i,t,e)=>t in i?$(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e,p=(i,t)=>{for(var e in t||(t={}))tt.call(t,e)&&K(i,e,t[e]);if(H)for(var e of H(t))et.call(t,e)&&K(i,e,t[e]);return i},g=(i,t)=>Z(i,z(t));var u=(i,t,e,o)=>{for(var a=o>1?void 0:o?X(t,e):t,c=i.length-1,E;c>=0;c--)(E=i[c])&&(a=(o?E(t,e,a):E(a))||a);return o&&a&&$(t,e,a),a};var r=(i,t,e)=>new Promise((o,a)=>{var c=D=>{try{G(e.next(D));}catch(b){a(b);}},E=D=>{try{G(e.throw(D));}catch(b){a(b);}},G=D=>D.done?o(D.value):Promise.resolve(D.value).then(c,E);G((e=e.apply(i,t)).next());});var J="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",s={API_VERSION:"/v1",LOGIN:"/auth/login",REGISTER:"/auth/create-account",ACCOUNT_VERIFY:"/auth/account/verify",RESEND_VERIFY_LINK:"/auth/account/verify",VALIDATE_PASSWORD_TOKEN:"/auth/validate/password",RESET_PASSWORD:"/auth/password/reset",CHANGE_PASSWORD:"/auth/password/change",COLLECTION:"/collection",COLLECTION_TYPE:"/collection-type",COLLECTION_MANY:"/collection/many",COLLECTION_UPDATE:"/collection",BOOKMARK:"/bookmark",NOTIFICATION_FETCH:"/notifications/",NOTIFICATION_MARK_ALL:"/notifications/mark/all",NOTIFICATION_MARK_ONE:"/notifications/mark",ACCOUNT:"/account",ACCOUNT_ONBOARD:"/account/onboard",ACCOUNT_UPDATE:"/account/update",ACCOUNT_PASSWORD:"/account/password/change",ACCOUNT_TWO_INIT:"/account/initiate/2fa",ACCOUNT_TWO_ACTIVATE:"/account/activate/2fa",ACCOUNT_TWO_DEACTIVATE:"/account/deactivate/2fa",ACCOUNT_FETCH_ALL:"/account/user",ACCOUNT_FETCH_SINGLE:"/account/user/",ACCOUNT_LOGOUT:"/account/logout",ACCOUNT_SEND_EMAIL_TWO_FA:"/account/2fa/email",WALLET_TRANSACTIONS:"/transaction/",A_WALLET_TRANSACTION:"/transaction",WALLET_EXCHANGE:"/wallet/exchange",WALLET_DATA:"/wallet/data",WALLET_STATS:"/wallet/stats",WALLET_AGGREGATE_STATS:"/wallet/aggregate/stats",WALLETS:"/wallet",SINGLE_WALLET:"/wallet/coin",FILE_UPLOAD:"/upload/",ADD_REVIEW:"/reviews/",GET_REVIEW:"/reviews/",CREATE_WITHDRAWAL:"/withdrawals/",FETCH_WITHDRAWALS:"/withdrawals/",CREATE_SESSION:"/user-verification/veriff/session/new",SEND_SESSION_MEDIA:"/user-verification/veriff/session/media",SESSION_ATTEMPTS:"/user-verification/veriff/session/attempts",USER_VERIFICATION:"/user-verification/user",DELETE_SESSION:"/user-verification/veriff/session/delete",GET_USER_MESSAGES:"/chat/",CREATE_CONNECTION_FILTER:"/conn-filter/",GET_CONNECTION_FILTER:"/conn-filter/user",UPDATE_CONNECTION_FILTER:"/conn-filter/",SEND_INVITE:"/invite/",ACCEPT_INVITE:"/invite",DECLINE_INVITE:"/invite",VIEW_ALL_INVITE:"/invite/",VIEW_A_INVITE:"/invite/",FEEDS:"/feeds",FEEDS_DISMISS_ONE:"/dismiss",FEEDS_DISMISS_ALL:"/feeds/dismiss/all"};var W=new ut.Token("PAKT_CONFIG"),f=new ut.Token("AUTH_TOKEN"),k=new ut.Token("TEMP_TOKEN");var q="0.1.26";var R=(e=>(e.SUCCESS="SUCCESS",e.ERROR="ERROR",e))(R||{}),n={tryFail:i=>r(void 0,null,function*(){try{return {data:yield i(),status:"SUCCESS"}}catch(t){let e=n.toErrorWithMessage(t);return {data:null,status:"ERROR",message:e?e.message:["Internal Server Error"],code:e.code}}}),formatErrorMsg:i=>i.replace("attr.",""),toErrorWithMessage:i=>{var t;if(typeof i=="string")try{let e=JSON.parse(i);return e.data instanceof Array&&e.data.length>0?{message:e.data.map(o=>n.formatErrorMsg(o)),code:e.errorCode}:{message:[(t=e.message)!=null?t:i],code:e.errorCode}}catch(e){}if(n.isErrorWithMessage(i))return {message:[i.message]};try{return {message:[JSON.stringify(i,null,2)]}}catch(e){return {message:[String(i)]}}},isErrorWithMessage(i){return typeof i=="object"&&i!==null&&"message"in i&&typeof i.message=="string"}},m=(i,t)=>{let e="?";return Object.keys(t).map(o=>{e=e+`${o}=${t[o]}&`;}),i+e};var nt=(i,t)=>import('node-fetch').then(({default:e})=>e(i,t)),d=class{constructor(t){this.id=t;}get(t){return r(this,null,function*(){return this.request(g(p({},t),{method:"GET"}))})}post(t){return r(this,null,function*(){return this.request(g(p({},t),{method:"POST"}))})}patch(t){return r(this,null,function*(){return this.request(g(p({},t),{method:"PATCH"}))})}put(t){return r(this,null,function*(){return this.request(g(p({},t),{method:"PUT"}))})}delete(t){return r(this,null,function*(){return this.request(g(p({},t),{method:"DELETE"}))})}request(G){return r(this,arguments,function*({path:t,params:e,body:o,method:a},c=0,E){let{verbose:D}=ut.Container.of(this.id).get(W),b=E||this.getUrl({path:t,params:e}),V={headers:yield this.headers(c),method:a,body:o?JSON.stringify(o):void 0},j=Date.now();D&&console.debug(new Date().toISOString(),"SDK Request: ",V.method,b,V.body);try{return yield nt(b,V).then(h=>r(this,null,function*(){let Y=Date.now()-j;D&&console.log(new Date().toISOString(),`SDK Response received in ${Y}ms: `,h.status,yield h.clone().text());let Q=yield h.json();return g(p({},Q),{code:h.status})}))}catch(h){return D&&console.warn(new Date().toISOString(),"Error: ",h),Promise.reject(h)}})}getUrl({path:t,params:e}){let o=ut.Container.of(this.id).get(W),a=s.API_VERSION+t,c=new URL(a||"",o.baseUrl);return console.log(a,c),e&&Object.keys(e).filter(E=>!!e[E]).forEach(E=>c.searchParams.append(E,`${e[E]}`)),o.testnet&&c.searchParams.append("type","testnet"),c.toString()}headers(t){return r(this,null,function*(){let e={},o=ut.Container.of(this.id).get(W),a=ut.Container.of(this.id).get(f);a&&(e={Authorization:`Bearer ${a}`});let c=new nodeFetch.Headers(p({"Content-Type":"application/json","x-pkt-sdk-version":q,"x-pkt-sdk-product":"JS","x-pkt-testnet":`${o.testnet}`,"x-pkt-sdk-retry":`${t}`},e));return o.token&&c.append("x-api-key",o.token),c})}};d=u([ut.Service({factory:i=>new d(i.id),transient:!0})],d);exports.AccountModule=class T{constructor(t){this.id=t,this.connector=ut.Container.of(this.id).get(d);}getUser(){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let t=yield this.connector.get({path:s.ACCOUNT});if(Number(t.statusCode||t.code)>226||t.status==="ERROR")throw new Error(t.message);return t.data}))})}onboardEndpoint(t,e,o){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let a={skillCategory:t,profileImage:e,type:o},c=yield this.connector.post({path:s.ACCOUNT_ONBOARD,body:a});if(Number(c.statusCode||c.code)>226||c.status==="ERROR")throw new Error(c.message);return c.data}))})}updateAccount(t){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let e=p({},t),o=yield this.connector.patch({path:s.ACCOUNT_UPDATE,body:e});if(Number(o.statusCode||o.code)>226||o.status==="ERROR")throw new Error(o.message);return o.data}))})}changePassword(t,e){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let o={oldPassword:t,newPassword:e},a=yield this.connector.put({path:s.ACCOUNT_PASSWORD,body:o});if(Number(a.statusCode||a.code)>226||a.status==="ERROR")throw new Error(a.message);return a.data}))})}initate2FA(t){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let e={type:t},o=yield this.connector.post({path:s.ACCOUNT_PASSWORD,body:e});if(Number(o.statusCode||o.code)>226||o.status==="ERROR")throw new Error(o.message);return o.data}))})}activate2FA(t){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let e={code:t},o=yield this.connector.post({path:s.ACCOUNT_TWO_ACTIVATE,body:e});if(Number(o.statusCode||o.code)>226||o.status==="ERROR")throw new Error(o.message);return o.data}))})}deactivate2FA(t){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let e={code:t},o=yield this.connector.post({path:s.ACCOUNT_TWO_DEACTIVATE,body:e});if(Number(o.statusCode||o.code)>226||o.status==="ERROR")throw new Error(o.message);return o.data}))})}sendEmailTwoFA(){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let t=yield this.connector.post({path:s.ACCOUNT_SEND_EMAIL_TWO_FA});if(Number(t.statusCode||t.code)>226||t.status==="ERROR")throw new Error(t.message);return t.data}))})}getAUser(t){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let e=yield this.connector.get({path:`${s.ACCOUNT_FETCH_SINGLE}${t}`});if(Number(e.statusCode||e.code)>226||e.status==="ERROR")throw new Error(e.message);return e.data}))})}getUsers(t){return r(this,null,function*(){if(t){let e=m(s.ACCOUNT_FETCH_ALL,p({},t));return console.log({query:e}),n.tryFail(()=>r(this,null,function*(){let o=yield this.connector.get({path:e});if(Number(o.statusCode||o.code)>226||o.status==="ERROR")throw new Error(o.message);return o.data}))}return n.tryFail(()=>r(this,null,function*(){let e=yield this.connector.get({path:s.ACCOUNT_FETCH_ALL});if(Number(e.statusCode||e.code)>226||e.status==="ERROR")throw new Error(e.message);return e.data}))})}logout(){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){return (yield this.connector.post({path:s.ACCOUNT_LOGOUT})).data}))})}};exports.AccountModule=u([ut.Service({factory:i=>new exports.AccountModule(i.id),transient:!0})],exports.AccountModule);exports.AuthenticationModule=class C{constructor(t){this.id=t,this.connector=ut.Container.of(this.id).get(d);}login(t,e){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let o={email:t,password:e},a=yield this.connector.post({path:s.LOGIN,body:o});if(Number(a.statusCode||a.code)>226||a.status==="ERROR")throw new Error(a.message);return a.data.tempToken?ut.Container.of(this.id).set(k,a.data.tempToken.token):ut.Container.of(this.id).set(f,a.data.token),a.data}))})}register(t){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let e=p({},t),o=yield this.connector.post({path:s.REGISTER,body:e});if(Number(o.statusCode||o.code)>226||o.status==="ERROR")throw new Error(o.message);return o.data.tempToken.token&&ut.Container.of(this.id).set(k,o.data.tempToken.token),o.data}))})}verifyAccount(t,e){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let o={tempToken:t,token:e},a=yield this.connector.post({path:s.ACCOUNT_VERIFY,body:o});if(Number(a.statusCode||a.code)>226||a.status==="ERROR")throw new Error(a.message);return ut.Container.of(this.id).set(f,a.data.token),a.data}))})}resendVerifyLink(t){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let e={email:t},o=yield this.connector.post({path:s.RESET_PASSWORD,body:e});if(Number(o.statusCode||o.code)>226||o.status==="ERROR")throw new Error(o.message);return o.data.tempToken&&ut.Container.of(this.id).set(k,o.data.tempToken.token),o.data}))})}resetPassword(t){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let e={email:t},o=yield this.connector.post({path:s.RESET_PASSWORD,body:e});if(Number(o.statusCode||o.code)>226||o.status==="ERROR")throw new Error(o.message);return o.data}))})}changePassword(t,e,o){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let a={token:t,tempToken:e,password:o},c=yield this.connector.post({path:s.CHANGE_PASSWORD,body:a});if(Number(c.statusCode||c.code)>226||c.status==="ERROR")throw new Error(c.message);return c.data}))})}validatePasswordToken(t,e){return n.tryFail(()=>r(this,null,function*(){let o={token:t,tempToken:e},a=yield this.connector.post({path:`${s.VALIDATE_PASSWORD_TOKEN}/${t}`,body:o});if(Number(a.statusCode||a.code)>226||a.status==="ERROR")throw new Error(a.message);return a.data}))}};exports.AuthenticationModule=u([ut.Service({factory:i=>new exports.AuthenticationModule(i.id),transient:!0})],exports.AuthenticationModule);exports.BookMarkModule=class y{constructor(t){this.id=t,this.connector=ut.Container.of(this.id).get(d);}getAll(t){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let e=m(s.BOOKMARK,t);return (yield this.connector.get({path:e})).data}))})}getById(t,e){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let o=m(s.BOOKMARK+"/"+t,e);return (yield this.connector.get({path:o})).data}))})}create(t){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let e=p({},t);return (yield this.connector.post({path:s.BOOKMARK,body:e})).data}))})}delete(t){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){return (yield this.connector.delete({path:s.BOOKMARK+"/"+t})).data}))})}};exports.BookMarkModule=u([ut.Service({factory:i=>new exports.BookMarkModule(i.id),transient:!0})],exports.BookMarkModule);exports.ChatModule=class A{constructor(t){this.id=t,this.connector=ut__default.default.of(this.id).get(d);}getUserMessages(){return n.tryFail(()=>r(this,null,function*(){let t=yield this.connector.get({path:s.GET_USER_MESSAGES});if(Number(t.statusCode||t.code)>226||t.status==="ERROR")throw new Error(t.message);return t.data}))}};exports.ChatModule=u([ut.Service({factory:i=>new exports.ChatModule(i.id),transient:!0})],exports.ChatModule);exports.CollectionModule=class w{constructor(t){this.id=t,this.connector=ut.Container.of(this.id).get(d);}getAll(t){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let e=t||{},o=m(s.COLLECTION+"/",e),a=t?s.COLLECTION:o,c=yield this.connector.get({path:a});if(Number(c.statusCode||c.code)>226||c.status==="ERROR")throw new Error(c.message);return c.data}))})}getById(t){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let e=s.COLLECTION+"/"+t,o=yield this.connector.get({path:e});if(Number(o.statusCode||o.code)>226||o.status==="ERROR")throw new Error(o.message);return o.data}))})}getTypes(t){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let e=m(s.COLLECTION_TYPE,t),o=yield this.connector.get({path:e});if(Number(o.statusCode||o.code)>226||o.status==="ERROR")throw new Error(o.message);return o.data}))})}create(t){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let e=p({},t),o=yield this.connector.post({path:s.COLLECTION,body:e});if(Number(o.statusCode||o.code)>226||o.status==="ERROR")throw new Error(o.message);return o.data}))})}createMany(t){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let e=p({},t),o=yield this.connector.post({path:s.COLLECTION,body:e});if(Number(o.statusCode||o.code)>226||o.status==="ERROR")throw new Error(o.message);return o.data}))})}updateCollection(t,e){return n.tryFail(()=>r(this,null,function*(){let o=`${s.COLLECTION_UPDATE}/${t}`,a=p({},e),c=yield this.connector.patch({path:o,body:a});if(Number(c.statusCode||c.code)>226||c.status==="ERROR")throw new Error(c.message);return c.data}))}getACollectionType(t){return n.tryFail(()=>r(this,null,function*(){let e=m(`${s.COLLECTION_TYPE}/${t}`,{id:t});console.log({fetchUrl:e});let o=yield this.connector.get({path:e});if(Number(o.statusCode||o.code)>226||o.status==="ERROR")throw new Error(o.message);return o.data}))}deleteACollection(t){return n.tryFail(()=>r(this,null,function*(){let e=yield this.connector.delete({path:`${s.COLLECTION}/${t}`});if(Number(e.statusCode||e.code)>226||e.status==="ERROR")throw new Error(e.message);return e.data}))}updateManyCollections(t){return n.tryFail(()=>r(this,null,function*(){let e=yield this.connector.patch({path:`${s.COLLECTION}/many/update`,body:{collections:t}});if(Number(e.statusCode||e.code)>226||e.status==="ERROR")throw new Error(e.message);return e.data}))}};exports.CollectionModule=u([ut.Service({factory:i=>new exports.CollectionModule(i.id),transient:!0})],exports.CollectionModule);exports.ConnectionFilterModule=class I{constructor(t){this.id=t,this.connector=ut__default.default.of(this.id).get(d);}create(t){return n.tryFail(()=>r(this,null,function*(){let e=p({},t),o=yield this.connector.post({path:s.CREATE_CONNECTION_FILTER,body:e});if(Number(o.statusCode||o.code)>226||o.status==="ERROR")throw new Error(o.message);return o.data}))}update(t){return n.tryFail(()=>r(this,null,function*(){let e=p({},t),o=yield this.connector.patch({path:s.UPDATE_CONNECTION_FILTER,body:e});if(Number(o.statusCode||o.code)>226||o.status==="ERROR")throw new Error(o.message);return o.data}))}getForAUser(){return n.tryFail(()=>r(this,null,function*(){let t=yield this.connector.get({path:s.GET_CONNECTION_FILTER});if(Number(t.statusCode||t.code)>226||t.status==="ERROR")throw new Error(t.message);return t.data}))}};exports.ConnectionFilterModule=u([ut.Service({factory:i=>new exports.ConnectionFilterModule(i.id),transient:!0})],exports.ConnectionFilterModule);exports.FeedModule=class O{constructor(t){this.id=t,this.connector=ut.Container.of(this.id).get(d);}create(t){return n.tryFail(()=>r(this,null,function*(){let e=p({},t),o=yield this.connector.post({path:`${s.FEEDS}/`,body:e});if(Number(o.statusCode||o.code)>226||o.status==="ERROR")throw new Error(o.message);return o.data}))}getAll(t){return n.tryFail(()=>r(this,null,function*(){let e=t?g(p({},t),{isOwner:!0}):{isOwner:!0},o=m(`${s.FEEDS}/`,p({},e)),a=yield this.connector.get({path:o});if(Number(a.statusCode||a.code)>226||a.status==="ERROR")throw new Error(a.message);return a.data}))}getById(t){return n.tryFail(()=>r(this,null,function*(){let e=yield this.connector.get({path:`${s.FEEDS}/${t}`});if(Number(e.statusCode||e.code)>226||e.status==="ERROR")throw new Error(e.message);return e.data}))}dismissAllFeeds(){return n.tryFail(()=>r(this,null,function*(){let t=yield this.connector.put({path:`${s.FEEDS_DISMISS_ALL}`});if(Number(t.statusCode||t.code)>226||t.status==="ERROR")throw new Error(t.message);return t.data}))}dismissAFeed(t){return n.tryFail(()=>r(this,null,function*(){let e=yield this.connector.put({path:`${s.FEEDS}/${t}/dismiss`});if(Number(e.statusCode||e.code)>226||e.status==="ERROR")throw new Error(e.message);return e.data}))}};exports.FeedModule=u([ut.Service({factory:i=>new exports.FeedModule(i.id),transient:!0})],exports.FeedModule);exports.InviteModule=class S{constructor(t){this.id=t,this.connector=ut__default.default.of(this.id).get(d);}sendInvite(t){return n.tryFail(()=>r(this,null,function*(){let e=`${s.SEND_INVITE}`,o=p({},t),a=yield this.connector.post({path:e,body:o});if(Number(a.statusCode||a.code)>226||a.status==="ERROR")throw new Error(a.message);return a.data}))}acceptInvite(t){return n.tryFail(()=>r(this,null,function*(){let e=`${s.ACCEPT_INVITE}/${t}/accept`,o=yield this.connector.post({path:e});if(Number(o.statusCode||o.code)>226||o.status==="ERROR")throw new Error(o.message);return o.data}))}declineInvite(t){return n.tryFail(()=>r(this,null,function*(){let e=`${s.DECLINE_INVITE}/${t}/decline`,o=yield this.connector.post({path:e});if(Number(o.statusCode||o.code)>226||o.status==="ERROR")throw new Error(o.message);return o.data}))}getAll(t){return n.tryFail(()=>r(this,null,function*(){let e=m(s.VIEW_ALL_INVITE,t),o=yield this.connector.get({path:e});if(Number(o.statusCode||o.code)>226||o.status==="ERROR")throw new Error(o.message);return o.data}))}getAnInvite(t){return n.tryFail(()=>r(this,null,function*(){let e=`${s.VIEW_A_INVITE}/${t}`,o=yield this.connector.get({path:e});if(Number(o.statusCode||o.code)>226||o.status==="ERROR")throw new Error(o.message);return o.data}))}};exports.InviteModule=u([ut.Service({factory:i=>new exports.InviteModule(i.id),transient:!0})],exports.InviteModule);exports.NotificationModule=class N{constructor(t){this.id=t,this.connector=ut.Container.of(this.id).get(d);}getAll(t){return r(this,null,function*(){let e=m(s.NOTIFICATION_FETCH,t);return n.tryFail(()=>r(this,null,function*(){let o=yield this.connector.get({path:e});if(Number(o.statusCode||o.code)>226||o.status==="ERROR")throw new Error(o.message);return o.data}))})}markAll(){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let t=yield this.connector.post({path:s.NOTIFICATION_MARK_ALL});if(Number(t.statusCode||t.code)>226||t.status==="ERROR")throw new Error(t.message);return t.data}))})}markOneAsRead(t){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let e=yield this.connector.post({path:s.NOTIFICATION_MARK_ONE+"/"+t});if(Number(e.statusCode||e.code)>226||e.status==="ERROR")throw new Error(e.message);return e.data}))})}};exports.NotificationModule=u([ut.Service({factory:i=>new exports.NotificationModule(i.id),transient:!0})],exports.NotificationModule);exports.ReviewModule=class P{constructor(t){this.id=t,this.connector=ut__default.default.of(this.id).get(d);}viewAll(t){return n.tryFail(()=>r(this,null,function*(){let e=t||{},o=m(s.GET_REVIEW,e),a=t?s.GET_REVIEW:o,c=yield this.connector.get({path:a});if(Number(c.statusCode||c.code)>226||c.status==="ERROR")throw new Error(c.message);return c.data}))}viewAReview(t){return n.tryFail(()=>r(this,null,function*(){let e=yield this.connector.get({path:`${s.GET_REVIEW}${t}`});if(Number(e.statusCode||e.code)>226||e.status==="ERROR")throw new Error(e.message);return e.data}))}addReview(t){let e=p({},t);return n.tryFail(()=>r(this,null,function*(){let o=yield this.connector.post({path:s.ADD_REVIEW,body:e});if(Number(o.statusCode||o.code)>226||o.status==="ERROR")throw new Error(o.message);return o.data}))}};exports.ReviewModule=u([ut.Service({factory:i=>new exports.ReviewModule(i.id),transient:!0})],exports.ReviewModule);exports.UploadModule=class F{constructor(t){this.id=t,this.connector=ut__default.default.of(this.id).get(d);}fileUpload(t){let e=p({},t);return n.tryFail(()=>r(this,null,function*(){let o=yield this.connector.post({path:s.FILE_UPLOAD,body:e});if(Number(o.statusCode||o.code)>226||o.status==="ERROR")throw new Error(o.message);return o.data}))}getFileUploads(t){return n.tryFail(()=>r(this,null,function*(){let e=t||{},o=m(s.FILE_UPLOAD,e),a=t?s.GET_REVIEW:o,c=yield this.connector.get({path:a});if(Number(c.statusCode||c.code)>226||c.status==="ERROR")throw new Error(c.message);return c.data}))}getAFileUpload(t){return n.tryFail(()=>r(this,null,function*(){let e=yield this.connector.get({path:`${s.FILE_UPLOAD}${t}`});if(Number(e.statusCode||e.code)>226||e.status==="ERROR")throw new Error(e.message);return e.data}))}};exports.UploadModule=u([ut.Service({factory:i=>new exports.UploadModule(i.id),transient:!0})],exports.UploadModule);exports.UserVerificationModule=class _{constructor(t){this.id=t,this.connector=ut__default.default.of(this.id).get(d);}createSession(t){let e=p({},t);return n.tryFail(()=>r(this,null,function*(){let o=yield this.connector.post({path:s.CREATE_SESSION,body:e});if(Number(o.statusCode||o.code)>226||o.status==="ERROR")throw new Error(o.message);return o.data}))}sendSessionMedia(t){let e=p({},t);return n.tryFail(()=>r(this,null,function*(){let o=yield this.connector.post({path:s.SEND_SESSION_MEDIA,body:e});if(Number(o.statusCode||o.code)>226||o.status==="ERROR")throw new Error(o.message);return o.data}))}getSessionAttempts(){let t=m(s.SESSION_ATTEMPTS,null);return n.tryFail(()=>r(this,null,function*(){let e=yield this.connector.get({path:t});if(Number(e.statusCode||e.code)>226||e.status==="ERROR")throw new Error(e.message);return e.data}))}getUserVerifications(){let t=m(s.USER_VERIFICATION,null);return n.tryFail(()=>r(this,null,function*(){let e=yield this.connector.get({path:t});if(Number(e.statusCode||e.code)>226||e.status==="ERROR")throw new Error(e.message);return e.data}))}};exports.UserVerificationModule=u([ut.Service({factory:i=>new exports.UserVerificationModule(i.id),transient:!0})],exports.UserVerificationModule);exports.WalletModule=class U{constructor(t,e){this.id=t,this.connector=ut__default.default.of(this.id).get(d),this.coin=e;}getTransactions(){return n.tryFail(()=>r(this,null,function*(){let t=yield this.connector.get({path:s.WALLET_TRANSACTIONS});if(Number(t.statusCode||t.code)>226||t.status==="ERROR")throw new Error(t.message);return t.data}))}getATransaction(t){return n.tryFail(()=>r(this,null,function*(){let e=yield this.connector.get({path:`${s.A_WALLET_TRANSACTION}/${t}`});if(Number(e.statusCode||e.code)>226||e.status==="ERROR")throw new Error(e.message);return e.data}))}getTransactionStats(){return n.tryFail(()=>r(this,null,function*(){let t=yield this.connector.get({path:s.WALLET_STATS});if(Number(t.statusCode||t.code)>226||t.status==="ERROR")throw new Error(t.message);return t.data}))}getAggregateTransactionStats(){return n.tryFail(()=>r(this,null,function*(){let t=yield this.connector.get({path:s.WALLET_AGGREGATE_STATS});if(Number(t.statusCode||t.code)>226||t.status==="ERROR")throw new Error(t.message);return t.data}))}getWalletData(){return n.tryFail(()=>r(this,null,function*(){let t=yield this.connector.get({path:s.WALLET_AGGREGATE_STATS});if(Number(t.statusCode||t.code)>226||t.status==="ERROR")throw new Error(t.message);return t.data}))}getWallets(){return n.tryFail(()=>r(this,null,function*(){let t=yield this.connector.get({path:s.WALLETS});if(Number(t.statusCode||t.code)>226||t.status==="ERROR")throw new Error(t.message);return t.data}))}getSingleWallet(t){return n.tryFail(()=>r(this,null,function*(){let e=yield this.connector.get({path:s.SINGLE_WALLET+"/"+t});if(Number(e.statusCode||e.code)>226||e.status==="ERROR")throw new Error(e.message);return e.data}))}getExchange(){return r(this,null,function*(){return n.tryFail(()=>r(this,null,function*(){let t=yield this.connector.get({path:s.WALLET_EXCHANGE});if(Number(t.statusCode||t.code)>226||t.status==="ERROR")throw new Error(t.message);return t.data}))})}};exports.WalletModule=u([ut.Service({factory:i=>new exports.WalletModule(i.id,i.coin)})],exports.WalletModule);exports.WithdrawalModule=class v{constructor(t){this.id=t,this.connector=ut__default.default.of(this.id).get(d);}createWithdrawal(t){return n.tryFail(()=>r(this,null,function*(){let e=p({},t);return (yield this.connector.post({path:s.CREATE_WITHDRAWAL,body:e})).data}))}fetchWithdrawal(t){let e=m(s.FETCH_WITHDRAWALS,t);return n.tryFail(()=>r(this,null,function*(){let o=yield this.connector.get({path:e});if(Number(o.statusCode||o.code)>226||o.status==="ERROR")throw new Error(o.message);return o.data}))}};exports.WithdrawalModule=u([ut.Service({factory:i=>new exports.WithdrawalModule(i.id)})],exports.WithdrawalModule);exports.PaktSDK=class L{constructor(t){this.auth=ut.Container.of(t).get(exports.AuthenticationModule),this.collection=ut.Container.of(t).get(exports.CollectionModule),this.account=ut.Container.of(t).get(exports.AccountModule),this.notifications=ut.Container.of(t).get(exports.NotificationModule),this.file=ut.Container.of(t).get(exports.UploadModule),this.wallet=ut.Container.of(t).get(exports.WalletModule),this.withdrawal=ut.Container.of(t).get(exports.WithdrawalModule),this.review=ut.Container.of(t).get(exports.ReviewModule),this.bookmark=ut.Container.of(t).get(exports.BookMarkModule),this.userVerification=ut.Container.of(t).get(exports.UserVerificationModule),this.chat=ut.Container.of(t).get(exports.ChatModule),this.connectionFilter=ut.Container.of(t).get(exports.ConnectionFilterModule),this.invite=ut.Container.of(t).get(exports.InviteModule),this.feed=ut.Container.of(t).get(exports.FeedModule);}static init(t){return r(this,null,function*(){let e=p({},t),o=exports.PaktSDK.generateRandomString();return ut.Container.of(o).set(W,e),ut.Container.of(o).set(f,""),ut.Container.of(o).set(k,""),new exports.PaktSDK(o)})}static generateRandomString(){let t=J,e="";for(let o=0;o<60;o++)e+=t.charAt(Math.floor(Math.random()*t.length));return e}};exports.PaktSDK=u([ut.Service({transient:!0})],exports.PaktSDK);

exports.API_PATHS = s;
exports.AUTH_TOKEN = f;
exports.CHARACTERS = J;
exports.ErrorUtils = n;
exports.PAKT_CONFIG = W;
exports.Status = R;
exports.TEMP_TOKEN = k;
exports.parseUrlWithQuery = m;
