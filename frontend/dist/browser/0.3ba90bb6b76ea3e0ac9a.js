(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{FhbL:function(n,l,u){"use strict";u.r(l);var t=u("CcnG"),a=function(){},o=u("pMnS"),i=u("Ip0R"),r=u("eokG"),e=u("AytR"),p=function(){function n(n,l){this.api=n,this.route=l,this.url="/wp-json/wp/v2/posts?slug="}return n.prototype.ngOnInit=function(){var n=this;this.route.params.subscribe(function(l){l.id&&n.api.get(e.a.url+n.url+l.id,l.id).subscribe(function(l){n.post=l[0]})})},n}(),s=u("ZYCi"),c=t.Ha({encapsulation:2,styles:[],data:{}});function f(n){return t.Ua(0,[(n()(),t.Ja(0,0,null,null,3,"div",[],null,null,null,null,null)),(n()(),t.Ja(1,0,null,null,1,"h3",[],null,null,null,null,null)),(n()(),t.Ta(2,null,["",""])),(n()(),t.Ja(3,0,null,null,0,"p",[],[[8,"innerHTML",1]],null,null,null,null))],null,function(n,l){var u=l.component;n(l,2,0,u.post.title.rendered),n(l,3,0,u.post.content.rendered)})}function d(n){return t.Ua(0,[(n()(),t.Ba(16777216,null,null,1,null,f)),t.Ia(1,16384,null,0,i.i,[t.K,t.H],{ngIf:[0,"ngIf"]},null)],function(n,l){n(l,1,0,l.component.post)},null)}var h=t.Fa("app-post",p,function(n){return t.Ua(0,[(n()(),t.Ja(0,0,null,null,1,"app-post",[],null,null,null,d,c)),t.Ia(1,114688,null,0,p,[r.a,s.a],null,null)],function(n,l){n(l,1,0)},null)},{},{},[]);u.d(l,"PostModuleNgFactory",function(){return b});var b=t.Ga(a,[],function(n){return t.Pa([t.Qa(512,t.j,t.W,[[8,[o.a,h]],[3,t.j],t.u]),t.Qa(4608,i.k,i.j,[t.r,[2,i.q]]),t.Qa(1073742336,i.b,i.b,[]),t.Qa(1073742336,s.m,s.m,[[2,s.s],[2,s.k]]),t.Qa(1073742336,a,a,[]),t.Qa(1024,s.i,function(){return[[{path:"",component:p,pathMatch:"full"}]]},[])])})}}]);