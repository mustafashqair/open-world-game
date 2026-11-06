import{DepthStencilFormat as Ul,DepthTexture as Ll,FloatType as Bl,LinearFilter as Fl,SRGBColorSpace as Hl,UnsignedByteType as Gl,UnsignedInt248Type as zl,Vector2 as kl,WebGLRenderTarget as Wl}from"three";import{BasicDepthPacking as nn,BufferAttribute as si,BufferGeometry as sn,Material as on,Mesh as cn,OrthographicCamera as ln,Scene as oi,Texture as un,WebGLRenderTarget as hn}from"three";import{LinearFilter as Ql,SRGBColorSpace as Xl,UnsignedByteType as jl,WebGLRenderTarget as Kl}from"three";import{AlwaysDepth as ql,NoBlending as Jl,ShaderMaterial as $l,Uniform as eu}from"three";import{Color as ru}from"three";import{LinearSRGBColorSpace as fn}from"three";import{BackSide as su,DoubleSide as ou,FrontSide as cu,ShaderMaterial as lu}from"three";import{EventDispatcher as pn,Vector2 as nr}from"three";import{EventDispatcher as gn,Uniform as vn}from"three";import{Color as fu,Uniform as mu,Vector2 as pu,Vector4 as gu}from"three";import{CanvasTexture as Au,RepeatWrapping as Tu}from"three";import{BasicDepthPacking as Jn,EventDispatcher as $n,LinearSRGBColorSpace as es,Material as ts,NoColorSpace as rs,Texture as is,WebGLRenderTarget as as}from"three";import{SRGBColorSpace as Eu,Uniform as wu,WebGLRenderTarget as yu}from"three";import{SRGBColorSpace as Cu,UnsignedByteType as Ru,WebGLRenderTarget as _u}from"three";import{NoBlending as Mu,ShaderMaterial as Pu,Uniform as Nu,Vector4 as bu}from"three";import{UnsignedByteType as Lu,WebGLRenderTarget as Bu}from"three";import{NoBlending as Hu,REVISION as Gu,ShaderMaterial as zu,Uniform as ku}from"three";import{SRGBColorSpace as Vu,UnsignedByteType as Yu,Vector2 as Qu,WebGLRenderTarget as Xu}from"three";import{NoBlending as Ku,ShaderMaterial as Zu,Uniform as qu,Vector2 as Ju}from"three";import{NoBlending as eh,ShaderMaterial as th,Uniform as rh,Vector2 as ih}from"three";import{Uniform as nh}from"three";import{SRGBColorSpace as oh,Uniform as ch}from"three";import{Uniform as uh}from"three";import{Uniform as dh,Vector2 as fh}from"three";import{BasicDepthPacking as ph,SRGBColorSpace as gh,Uniform as vh,UnsignedByteType as Ah,Vector3 as Th,WebGLRenderTarget as Sh}from"three";import{NoBlending as Eh,ShaderMaterial as wh,Uniform as yh,Vector2 as Dh}from"three";import{BasicDepthPacking as Rh,NoBlending as _h,PerspectiveCamera as Ih,ShaderMaterial as Mh,Uniform as Ph}from"three";import{NoBlending as bh,ShaderMaterial as Oh,Uniform as Uh,UnsignedByteType as Lh}from"three";import{UnsignedByteType as ns}from"three";import{Uniform as Hh,Vector2 as Gh}from"three";import{Uniform as kh}from"three";import{NearestFilter as Vh,RepeatWrapping as Yh,RGBAFormat as Qh,Uniform as Xh,Vector2 as jh}from"three";import{DataTexture as Zh,RedFormat as qh,RGFormat as Jh,RGBAFormat as $h,UnsignedByteType as ed}from"three";import{BasicDepthPacking as rd,DepthTexture as id,Matrix4 as ad,Scene as nd,SRGBColorSpace as sd,Uniform as od,Vector2 as cd,Vector3 as ld,Vector4 as ud,WebGLRenderTarget as hd}from"three";import{NoBlending as fd,ShaderMaterial as md,Uniform as pd}from"three";import{Uniform as vd,Vector2 as Ad}from"three";import{Uniform as Sd,Vector3 as xd}from"three";import{Uniform as wd,Vector2 as yd}from"three";import{FloatType as Cd,HalfFloatType as Rd,Uniform as _d}from"three";import{Data3DTexture as Md,FloatType as Pd,HalfFloatType as Nd,LinearFilter as bd,NearestFilter as Od,SRGBColorSpace as Ud,Uniform as Ld,Vector3 as Bd}from"three";import{Color as Hd,ClampToEdgeWrapping as Gd,DataTexture as zd,Data3DTexture as kd,FloatType as Wd,LinearFilter as Vd,LinearSRGBColorSpace as Yd,RGBAFormat as Qd,SRGBColorSpace as Xd,UnsignedByteType as jd,Vector3 as Kd}from"three";import{Color as qd,RepeatWrapping as Jd,Uniform as $d,UnsignedByteType as ef,WebGLRenderTarget as tf}from"three";import{NoBlending as af,PerspectiveCamera as nf,RGBADepthPacking as sf,ShaderMaterial as of,Uniform as cf}from"three";import{NoBlending as uf,ShaderMaterial as hf,Uniform as df,Vector2 as ff}from"three";import{Color as pf,MeshDepthMaterial as gf,NearestFilter as vf,RGBADepthPacking as Af,WebGLRenderTarget as Tf}from"three";import{Uniform as xf,Vector2 as Ef,Vector4 as wf}from"three";import{Uniform as Df,Vector4 as Cf}from"three";import{Uniform as _f,Vector2 as If}from"three";import{Uniform as Pf,Vector2 as Nf,Vector3 as bf}from"three";import{BasicDepthPacking as Lf,Color as Bf,NotEqualDepth as Ff,EqualDepth as Hf,RGBADepthPacking as Gf,SRGBColorSpace as zf,WebGLRenderTarget as kf}from"three";import{AlwaysDepth as Vf,BasicDepthPacking as Yf,EqualDepth as Qf,GreaterDepth as Xf,GreaterEqualDepth as jf,LessDepth as Kf,LessEqualDepth as Zf,NeverDepth as qf,NoBlending as Jf,NotEqualDepth as $f,PerspectiveCamera as em,ShaderMaterial as tm,Uniform as rm,Vector2 as im}from"three";import{Uniform as nm,Vector3 as sm}from"three";import{BasicDepthPacking as cm,Color as lm,LinearFilter as um,LoadingManager as hm,NearestFilter as dm,Texture as fm,Uniform as mm,WebGLRenderTarget as pm}from"three";import{BasicDepthPacking as vm,NoBlending as Am,REVISION as Tm,ShaderMaterial as Sm,Uniform as xm,Vector2 as Em}from"three";import{NoBlending as ym,ShaderMaterial as Dm,Uniform as Cm,Vector2 as Rm}from"three";import{BasicDepthPacking as Im,Color as Mm,RepeatWrapping as Pm,RGBAFormat as Nm,Uniform as bm,WebGLRenderTarget as Om}from"three";import{BasicDepthPacking as Lm,Matrix4 as Bm,NoBlending as Fm,PerspectiveCamera as Hm,ShaderMaterial as Gm,Uniform as zm,Vector2 as km}from"three";import{BasicDepthPacking as Vm,FloatType as Ym,NearestFilter as Qm,WebGLRenderTarget as Xm}from"three";import{BasicDepthPacking as Km,NoBlending as Zm,ShaderMaterial as qm,Uniform as Jm,Vector2 as $m}from"three";import{Uniform as t0,UnsignedByteType as r0}from"three";import{SRGBColorSpace as a0,Uniform as n0,Vector2 as s0,WebGLRenderTarget as o0}from"three";import{Uniform as l0,Vector2 as u0,Vector4 as h0}from"three";import{LinearMipmapLinearFilter as f0,REVISION as m0,Uniform as p0,WebGLRenderTarget as g0}from"three";import{NearestFilter as A0,WebGLRenderTarget as T0}from"three";import{NoBlending as x0,ShaderMaterial as E0,Uniform as w0}from"three";import{Uniform as D0}from"three";import{FileLoader as R0,Loader as _0,LoadingManager as I0}from"three";import{FileLoader as P0,Loader as N0,LoadingManager as b0,Vector3 as O0}from"three";import{Loader as L0,LoadingManager as B0}from"three";import{NoBlending as H0,PerspectiveCamera as G0,ShaderMaterial as z0,Uniform as k0,Vector2 as W0}from"three";import{BasicDepthPacking as Y0,NoBlending as Q0,ShaderMaterial as X0,Uniform as j0,Vector2 as K0}from"three";import{BasicDepthPacking as ss,NoBlending as os,PerspectiveCamera as cs,REVISION as ls,ShaderMaterial as us,Uniform as Te,Vector2 as ci}from"three";import{NoBlending as J0,ShaderMaterial as $0,Uniform as ep,Vector2 as tp}from"three";import{BasicDepthPacking as ip,SRGBColorSpace as ap,UnsignedByteType as np,WebGLRenderTarget as sp}from"three";import{BasicDepthPacking as cp,FloatType as lp,REVISION as ms,RGBADepthPacking as up}from"three";import{BasicDepthPacking as dp,FloatType as fp,NearestFilter as mp,RGBADepthPacking as pp,UnsignedByteType as gp,WebGLRenderTarget as vp}from"three";import{BasicDepthPacking as ps,NoColorSpace as gs,SRGBColorSpace as ui,UnsignedByteType as vs}from"three";import{SRGBColorSpace as wp,UnsignedByteType as yp,WebGLRenderTarget as Dp}from"three";import{Color as Rp,MeshNormalMaterial as _p,NearestFilter as Ip,WebGLRenderTarget as Mp}from"three";import{LoadingManager as Gp}from"three";var dn=(()=>{let t=new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),e=new Float32Array([0,0,2,0,0,2]),r=new sn;return r.setAttribute("position",new si(t,3)),r.setAttribute("uv",new si(e,2)),r})(),_e=class or{static get fullscreenGeometry(){return dn}constructor(e="Pass",r=new oi,i=new ln){this.name=e,this.renderer=null,this.scene=r,this.camera=i,this.screen=null,this.rtt=!0,this.needsSwap=!0,this.needsDepthBlit=!1,this.needsDepthTexture=!1,this.enabled=!0}get renderToScreen(){return!this.rtt}set renderToScreen(e){if(this.rtt===e){let r=this.fullscreenMaterial;r!==null&&(r.needsUpdate=!0),this.rtt=!e}}set mainScene(e){}set mainCamera(e){}setRenderer(e){this.renderer=e}isEnabled(){return this.enabled}setEnabled(e){this.enabled=e}get fullscreenMaterial(){return this.screen!==null?this.screen.material:null}set fullscreenMaterial(e){let r=this.screen;r!==null?r.material=e:(r=new cn(or.fullscreenGeometry,e),r.frustumCulled=!1,this.scene===null&&(this.scene=new oi),this.scene.add(r),this.screen=r)}getFullscreenMaterial(){return this.fullscreenMaterial}setFullscreenMaterial(e){this.fullscreenMaterial=e}getDepthTexture(){return null}setDepthTexture(e,r=nn){}render(e,r,i,a,n){throw new Error("Render method not implemented!")}setSize(e,r){}initialize(e,r,i){}dispose(){for(let e of Object.keys(this)){let r=this[e];(r instanceof hn||r instanceof on||r instanceof un||r instanceof or)&&this[e].dispose()}this.fullscreenMaterial!==null&&this.fullscreenMaterial.dispose()}};var iu=1/1e3;var K={NONE:0,DEPTH:1,CONVOLUTION:2},T={FRAGMENT_HEAD:"FRAGMENT_HEAD",FRAGMENT_MAIN_UV:"FRAGMENT_MAIN_UV",FRAGMENT_MAIN_IMAGE:"FRAGMENT_MAIN_IMAGE",VERTEX_HEAD:"VERTEX_HEAD",VERTEX_MAIN_SUPPORT:"VERTEX_MAIN_SUPPORT"},mn=class{constructor(){this.shaderParts=new Map([[T.FRAGMENT_HEAD,null],[T.FRAGMENT_MAIN_UV,null],[T.FRAGMENT_MAIN_IMAGE,null],[T.VERTEX_HEAD,null],[T.VERTEX_MAIN_SUPPORT,null]]),this.defines=new Map,this.uniforms=new Map,this.blendModes=new Map,this.extensions=new Set,this.attributes=K.NONE,this.varyings=new Set,this.uvTransformation=!1,this.readDepth=!1,this.colorSpace=fn}};var Ae=-1,wt=class extends pn{constructor(t=null,e=Ae,r=Ae,i=1){super(),t!==null&&this.addEventListener("change",()=>t.setSize(this.baseSize.width,this.baseSize.height)),this.baseSize=new nr(1,1),this.preferredSize=new nr(e,r),this.target=this.preferredSize,this.s=i,this.effectiveSize=new nr,this.addEventListener("change",()=>this.updateEffectiveSize()),this.updateEffectiveSize()}updateEffectiveSize(){let t=this.baseSize,e=this.preferredSize,r=this.effectiveSize,i=this.scale;e.width!==Ae?r.width=e.width:e.height!==Ae?r.width=Math.round(e.height*(t.width/Math.max(t.height,1))):r.width=Math.round(t.width*i),e.height!==Ae?r.height=e.height:e.width!==Ae?r.height=Math.round(e.width/Math.max(t.width/Math.max(t.height,1),1)):r.height=Math.round(t.height*i)}get width(){return this.effectiveSize.width}set width(t){this.preferredWidth=t}get height(){return this.effectiveSize.height}set height(t){this.preferredHeight=t}getWidth(){return this.width}getHeight(){return this.height}get scale(){return this.s}set scale(t){this.s!==t&&(this.s=t,this.preferredSize.setScalar(Ae),this.dispatchEvent({type:"change"}))}getScale(){return this.scale}setScale(t){this.scale=t}get baseWidth(){return this.baseSize.width}set baseWidth(t){this.baseSize.width!==t&&(this.baseSize.width=t,this.dispatchEvent({type:"change"}))}getBaseWidth(){return this.baseWidth}setBaseWidth(t){this.baseWidth=t}get baseHeight(){return this.baseSize.height}set baseHeight(t){this.baseSize.height!==t&&(this.baseSize.height=t,this.dispatchEvent({type:"change"}))}getBaseHeight(){return this.baseHeight}setBaseHeight(t){this.baseHeight=t}setBaseSize(t,e){(this.baseSize.width!==t||this.baseSize.height!==e)&&(this.baseSize.set(t,e),this.dispatchEvent({type:"change"}))}get preferredWidth(){return this.preferredSize.width}set preferredWidth(t){this.preferredSize.width!==t&&(this.preferredSize.width=t,this.dispatchEvent({type:"change"}))}getPreferredWidth(){return this.preferredWidth}setPreferredWidth(t){this.preferredWidth=t}get preferredHeight(){return this.preferredSize.height}set preferredHeight(t){this.preferredSize.height!==t&&(this.preferredSize.height=t,this.dispatchEvent({type:"change"}))}getPreferredHeight(){return this.preferredHeight}setPreferredHeight(t){this.preferredHeight=t}setPreferredSize(t,e){(this.preferredSize.width!==t||this.preferredSize.height!==e)&&(this.preferredSize.set(t,e),this.dispatchEvent({type:"change"}))}copy(t){this.s=t.scale,this.baseSize.set(t.baseWidth,t.baseHeight),this.preferredSize.set(t.preferredWidth,t.preferredHeight),this.dispatchEvent({type:"change"})}static get AUTO_SIZE(){return Ae}};var g={SKIP:9,SET:30,ADD:0,ALPHA:1,AVERAGE:2,COLOR:3,COLOR_BURN:4,COLOR_DODGE:5,DARKEN:6,DIFFERENCE:7,DIVIDE:8,DST:9,EXCLUSION:10,HARD_LIGHT:11,HARD_MIX:12,HUE:13,INVERT:14,INVERT_RGB:15,LIGHTEN:16,LINEAR_BURN:17,LINEAR_DODGE:18,LINEAR_LIGHT:19,LUMINOSITY:20,MULTIPLY:21,NEGATION:22,NORMAL:23,OVERLAY:24,PIN_LIGHT:25,REFLECT:26,SATURATION:27,SCREEN:28,SOFT_LIGHT:29,SRC:30,SUBTRACT:31,VIVID_LIGHT:32},An="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb+src.rgb;return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Tn="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){return mix(dst,src,src.a*opacity);}",Sn="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=(dst.rgb+src.rgb)*0.5;return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",xn="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=RGBToHSL(dst.rgb);vec3 b=RGBToHSL(src.rgb);vec3 c=HSLToRGB(vec3(b.xy,a.z));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",En="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=dst.rgb,b=src.rgb;vec3 c=mix(step(0.0,b)*(1.0-min(vec3(1.0),(1.0-a)/max(b,1e-9))),vec3(1.0),step(1.0,a));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",wn="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=dst.rgb,b=src.rgb;vec3 c=step(0.0,a)*mix(min(vec3(1.0),a/max(1.0-b,1e-9)),vec3(1.0),step(1.0,b));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",yn="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=min(dst.rgb,src.rgb);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Dn="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=abs(dst.rgb-src.rgb);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Cn="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb/max(src.rgb,1e-9);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Rn="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb+src.rgb-2.0*dst.rgb*src.rgb;return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",_n="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=min(dst.rgb,1.0);vec3 b=min(src.rgb,1.0);vec3 c=mix(2.0*a*b,1.0-2.0*(1.0-a)*(1.0-b),step(0.5,b));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",In="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=step(1.0,dst.rgb+src.rgb);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Mn="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=RGBToHSL(dst.rgb);vec3 b=RGBToHSL(src.rgb);vec3 c=HSLToRGB(vec3(b.x,a.yz));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Pn="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=max(1.0-src.rgb,0.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Nn="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=src.rgb*max(1.0-dst.rgb,0.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",bn="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=max(dst.rgb,src.rgb);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",On="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=clamp(src.rgb+dst.rgb-1.0,0.0,1.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Un="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=min(dst.rgb+src.rgb,1.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Ln="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=clamp(2.0*src.rgb+dst.rgb-1.0,0.0,1.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Bn="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=RGBToHSL(dst.rgb);vec3 b=RGBToHSL(src.rgb);vec3 c=HSLToRGB(vec3(a.xy,b.z));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Fn="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb*src.rgb;return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Hn="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=max(1.0-abs(1.0-dst.rgb-src.rgb),0.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Gn="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){return mix(dst,src,opacity);}",zn="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=2.0*src.rgb*dst.rgb;vec3 b=1.0-2.0*(1.0-src.rgb)*(1.0-dst.rgb);vec3 c=mix(a,b,step(0.5,dst.rgb));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",kn="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 src2=2.0*src.rgb;vec3 c=mix(mix(src2,dst.rgb,step(0.5*dst.rgb,src.rgb)),max(src2-1.0,vec3(0.0)),step(dst.rgb,src2-1.0));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Wn="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=min(dst.rgb*dst.rgb/max(1.0-src.rgb,1e-9),1.0);vec3 c=mix(a,src.rgb,step(1.0,src.rgb));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Vn="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=RGBToHSL(dst.rgb);vec3 b=RGBToHSL(src.rgb);vec3 c=HSLToRGB(vec3(a.x,b.y,a.z));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Yn="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb+src.rgb-min(dst.rgb*src.rgb,1.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Qn="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 src2=2.0*src.rgb;vec3 d=dst.rgb+(src2-1.0);vec3 w=step(0.5,src.rgb);vec3 a=dst.rgb-(1.0-src2)*dst.rgb*(1.0-dst.rgb);vec3 b=mix(d*(sqrt(dst.rgb)-dst.rgb),d*dst.rgb*((16.0*dst.rgb-12.0)*dst.rgb+3.0),w*(1.0-step(0.25,dst.rgb)));vec3 c=mix(a,b,w);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Xn="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){return src;}",jn="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=max(dst.rgb-src.rgb,0.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Kn="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=mix(max(1.0-min((1.0-dst.rgb)/(2.0*src.rgb),1.0),0.0),min(dst.rgb/(2.0*(1.0-src.rgb)),1.0),step(0.5,src.rgb));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Zn=new Map([[g.ADD,An],[g.ALPHA,Tn],[g.AVERAGE,Sn],[g.COLOR,xn],[g.COLOR_BURN,En],[g.COLOR_DODGE,wn],[g.DARKEN,yn],[g.DIFFERENCE,Dn],[g.DIVIDE,Cn],[g.DST,null],[g.EXCLUSION,Rn],[g.HARD_LIGHT,_n],[g.HARD_MIX,In],[g.HUE,Mn],[g.INVERT,Pn],[g.INVERT_RGB,Nn],[g.LIGHTEN,bn],[g.LINEAR_BURN,On],[g.LINEAR_DODGE,Un],[g.LINEAR_LIGHT,Ln],[g.LUMINOSITY,Bn],[g.MULTIPLY,Fn],[g.NEGATION,Hn],[g.NORMAL,Gn],[g.OVERLAY,zn],[g.PIN_LIGHT,kn],[g.REFLECT,Wn],[g.SATURATION,Vn],[g.SCREEN,Yn],[g.SOFT_LIGHT,Qn],[g.SRC,Xn],[g.SUBTRACT,jn],[g.VIVID_LIGHT,Kn]]),qn=class extends gn{constructor(t,e=1){super(),this._blendFunction=t,this.opacity=new vn(e)}getOpacity(){return this.opacity.value}setOpacity(t){this.opacity.value=t}get blendFunction(){return this._blendFunction}set blendFunction(t){this._blendFunction=t,this.dispatchEvent({type:"change"})}getBlendFunction(){return this.blendFunction}setBlendFunction(t){this.blendFunction=t}getShaderCode(){return Zn.get(this.blendFunction)}};var Ze=class extends $n{constructor(t,e,{attributes:r=K.NONE,blendFunction:i=g.NORMAL,defines:a=new Map,uniforms:n=new Map,extensions:s=null,vertexShader:o=null}={}){super(),this.name=t,this.renderer=null,this.attributes=r,this.fragmentShader=e,this.vertexShader=o,this.defines=a,this.uniforms=n,this.extensions=s,this.blendMode=new qn(i),this.blendMode.addEventListener("change",c=>this.setChanged()),this._inputColorSpace=es,this._outputColorSpace=rs}get inputColorSpace(){return this._inputColorSpace}set inputColorSpace(t){this._inputColorSpace=t,this.setChanged()}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t,this.setChanged()}set mainScene(t){}set mainCamera(t){}getName(){return this.name}setRenderer(t){this.renderer=t}getDefines(){return this.defines}getUniforms(){return this.uniforms}getExtensions(){return this.extensions}getBlendMode(){return this.blendMode}getAttributes(){return this.attributes}setAttributes(t){this.attributes=t,this.setChanged()}getFragmentShader(){return this.fragmentShader}setFragmentShader(t){this.fragmentShader=t,this.setChanged()}getVertexShader(){return this.vertexShader}setVertexShader(t){this.vertexShader=t,this.setChanged()}setChanged(){this.dispatchEvent({type:"change"})}setDepthTexture(t,e=Jn){}update(t,e,r){}setSize(t,e){}initialize(t,e,r){}dispose(){for(let t of Object.keys(this)){let e=this[t];(e instanceof as||e instanceof ts||e instanceof is||e instanceof _e)&&this[t].dispose()}}};var Ou=[new Float32Array([0,0]),new Float32Array([0,1,1]),new Float32Array([0,1,1,2]),new Float32Array([0,1,2,2,3]),new Float32Array([0,1,2,3,4,4,5]),new Float32Array([0,1,2,3,4,5,7,8,9,10])];var qe=class extends _e{constructor(t,e="inputBuffer"){super("ShaderPass"),this.fullscreenMaterial=t,this.input=e}setInput(t){this.input=t}render(t,e,r,i,a){let n=this.fullscreenMaterial.uniforms;e!==null&&n!==void 0&&n[this.input]!==void 0&&(n[this.input].value=e.texture),t.setRenderTarget(this.renderToScreen?null:r),t.render(this.scene,this.camera)}initialize(t,e,r){r!==void 0&&r!==ns&&(this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}};var Of=Math.PI*.5;var hs=`#include <common>
#include <packing>
#include <dithering_pars_fragment>
#define packFloatToRGBA(v) packDepthToRGBA(v)
#define unpackRGBAToFloat(v) unpackRGBAToDepth(v)
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#if DEPTH_PACKING == 3201
uniform lowp sampler2D depthBuffer;
#elif defined(GL_FRAGMENT_PRECISION_HIGH)
uniform highp sampler2D depthBuffer;
#else
uniform mediump sampler2D depthBuffer;
#endif
uniform vec2 resolution;uniform vec2 texelSize;uniform float cameraNear;uniform float cameraFar;uniform float aspect;uniform float time;varying vec2 vUv;vec4 sRGBToLinear(const in vec4 value){return vec4(mix(pow(value.rgb*0.9478672986+vec3(0.0521327014),vec3(2.4)),value.rgb*0.0773993808,vec3(lessThanEqual(value.rgb,vec3(0.04045)))),value.a);}float readDepth(const in vec2 uv){
#if DEPTH_PACKING == 3201
float depth=unpackRGBAToDepth(texture2D(depthBuffer,uv));
#else
float depth=texture2D(depthBuffer,uv).r;
#endif
#if defined(USE_LOGARITHMIC_DEPTH_BUFFER) || defined(LOG_DEPTH)
float d=pow(2.0,depth*log2(cameraFar+1.0))-1.0;float a=cameraFar/(cameraFar-cameraNear);float b=cameraFar*cameraNear/(cameraNear-cameraFar);depth=a+b/d;
#elif defined(USE_REVERSED_DEPTH_BUFFER)
depth=1.0-depth;
#endif
return depth;}float getViewZ(const in float depth){
#ifdef PERSPECTIVE_CAMERA
return perspectiveDepthToViewZ(depth,cameraNear,cameraFar);
#else
return orthographicDepthToViewZ(depth,cameraNear,cameraFar);
#endif
}vec3 RGBToHCV(const in vec3 RGB){vec4 P=mix(vec4(RGB.bg,-1.0,2.0/3.0),vec4(RGB.gb,0.0,-1.0/3.0),step(RGB.b,RGB.g));vec4 Q=mix(vec4(P.xyw,RGB.r),vec4(RGB.r,P.yzx),step(P.x,RGB.r));float C=Q.x-min(Q.w,Q.y);float H=abs((Q.w-Q.y)/(6.0*C+EPSILON)+Q.z);return vec3(H,C,Q.x);}vec3 RGBToHSL(const in vec3 RGB){vec3 HCV=RGBToHCV(RGB);float L=HCV.z-HCV.y*0.5;float S=HCV.y/(1.0-abs(L*2.0-1.0)+EPSILON);return vec3(HCV.x,S,L);}vec3 HueToRGB(const in float H){float R=abs(H*6.0-3.0)-1.0;float G=2.0-abs(H*6.0-2.0);float B=2.0-abs(H*6.0-4.0);return clamp(vec3(R,G,B),0.0,1.0);}vec3 HSLToRGB(const in vec3 HSL){vec3 RGB=HueToRGB(HSL.x);float C=(1.0-abs(2.0*HSL.z-1.0))*HSL.y;return(RGB-0.5)*C+HSL.z;}FRAGMENT_HEAD void main(){FRAGMENT_MAIN_UV vec4 color0=texture2D(inputBuffer,UV);vec4 color1=vec4(0.0);FRAGMENT_MAIN_IMAGE color0.a=clamp(color0.a,0.0,1.0);gl_FragColor=color0;
#ifdef ENCODE_OUTPUT
#include <colorspace_fragment>
#endif
#include <dithering_fragment>
}`,ds="uniform vec2 resolution;uniform vec2 texelSize;uniform float cameraNear;uniform float cameraFar;uniform float aspect;uniform float time;varying vec2 vUv;VERTEX_HEAD void main(){vUv=position.xy*0.5+0.5;VERTEX_MAIN_SUPPORT gl_Position=vec4(position.xy,1.0,1.0);}",fs=class extends us{constructor(t,e,r,i,a=!1){super({name:"EffectMaterial",defines:{THREE_REVISION:ls.replace(/\D+/g,""),DEPTH_PACKING:"0",ENCODE_OUTPUT:"1"},uniforms:{inputBuffer:new Te(null),depthBuffer:new Te(null),resolution:new Te(new ci),texelSize:new Te(new ci),cameraNear:new Te(.3),cameraFar:new Te(1e3),aspect:new Te(1),time:new Te(0)},blending:os,toneMapped:!1,depthWrite:!1,depthTest:!1,dithering:a}),t&&this.setShaderParts(t),e&&this.setDefines(e),r&&this.setUniforms(r),this.copyCameraSettings(i)}set inputBuffer(t){this.uniforms.inputBuffer.value=t}setInputBuffer(t){this.uniforms.inputBuffer.value=t}get depthBuffer(){return this.uniforms.depthBuffer.value}set depthBuffer(t){this.uniforms.depthBuffer.value=t}get depthPacking(){return Number(this.defines.DEPTH_PACKING)}set depthPacking(t){this.defines.DEPTH_PACKING=t.toFixed(0),this.needsUpdate=!0}setDepthBuffer(t,e=ss){this.depthBuffer=t,this.depthPacking=e}setShaderData(t){this.setShaderParts(t.shaderParts),this.setDefines(t.defines),this.setUniforms(t.uniforms),this.setExtensions(t.extensions)}setShaderParts(t){return this.fragmentShader=hs.replace(T.FRAGMENT_HEAD,t.get(T.FRAGMENT_HEAD)||"").replace(T.FRAGMENT_MAIN_UV,t.get(T.FRAGMENT_MAIN_UV)||"").replace(T.FRAGMENT_MAIN_IMAGE,t.get(T.FRAGMENT_MAIN_IMAGE)||""),this.vertexShader=ds.replace(T.VERTEX_HEAD,t.get(T.VERTEX_HEAD)||"").replace(T.VERTEX_MAIN_SUPPORT,t.get(T.VERTEX_MAIN_SUPPORT)||""),this.needsUpdate=!0,this}setDefines(t){for(let e of t.entries())this.defines[e[0]]=e[1];return this.needsUpdate=!0,this}setUniforms(t){for(let e of t.entries())this.uniforms[e[0]]=e[1];return this}setExtensions(t){this.extensions={};for(let e of t)this.extensions[e]=!0;return this}get encodeOutput(){return this.defines.ENCODE_OUTPUT!==void 0}set encodeOutput(t){this.encodeOutput!==t&&(t?this.defines.ENCODE_OUTPUT="1":delete this.defines.ENCODE_OUTPUT,this.needsUpdate=!0)}isOutputEncodingEnabled(t){return this.encodeOutput}setOutputEncodingEnabled(t){this.encodeOutput=t}get time(){return this.uniforms.time.value}set time(t){this.uniforms.time.value=t}setDeltaTime(t){this.uniforms.time.value+=t}adoptCameraSettings(t){this.copyCameraSettings(t)}copyCameraSettings(t){t&&(this.uniforms.cameraNear.value=t.near,this.uniforms.cameraFar.value=t.far,t instanceof cs?this.defines.PERSPECTIVE_CAMERA="1":delete this.defines.PERSPECTIVE_CAMERA,this.needsUpdate=!0)}setSize(t,e){let r=this.uniforms;r.resolution.value.set(t,e),r.texelSize.value.set(1/t,1/e),r.aspect.value=t/e}static get Section(){return T}};var Ap=Number(ms.replace(/\D+/g,"")),ye=255/256,Tp=new Float32Array([ye/256**3,ye/256**2,ye/256,ye]),Sp=new Float32Array([ye,ye/256,ye/256**2,1/256**3]);function li(t,e,r){for(let i of e){let a="$1"+t+i.charAt(0).toUpperCase()+i.slice(1),n=new RegExp("([^\\.])(\\b"+i+"\\b)","g");for(let s of r.entries())s[1]!==null&&r.set(s[0],s[1].replace(n,a))}}function As(t,e,r){let i=e.getFragmentShader(),a=e.getVertexShader(),n=i!==void 0&&/mainImage/.test(i),s=i!==void 0&&/mainUv/.test(i);if(r.attributes|=e.getAttributes(),i===void 0)throw new Error(`Missing fragment shader (${e.name})`);if(s&&(r.attributes&K.CONVOLUTION)!==0)throw new Error(`Effects that transform UVs are incompatible with convolution effects (${e.name})`);if(!n&&!s)throw new Error(`Could not find mainImage or mainUv function (${e.name})`);{let o=/\w+\s+(\w+)\([\w\s,]*\)\s*{/g,c=r.shaderParts,u=c.get(T.FRAGMENT_HEAD)||"",h=c.get(T.FRAGMENT_MAIN_UV)||"",f=c.get(T.FRAGMENT_MAIN_IMAGE)||"",A=c.get(T.VERTEX_HEAD)||"",w=c.get(T.VERTEX_MAIN_SUPPORT)||"",b=new Set,D=new Set;if(s&&(h+=`	${t}MainUv(UV);
`,r.uvTransformation=!0),a!==null&&/mainSupport/.test(a)){let I=/mainSupport *\([\w\s]*?uv\s*?\)/.test(a);w+=`	${t}MainSupport(`,w+=I?`vUv);
`:`);
`;for(let R of a.matchAll(/(?:varying\s+\w+\s+([\S\s]*?);)/g))for(let H of R[1].split(/\s*,\s*/))r.varyings.add(H),b.add(H),D.add(H);for(let R of a.matchAll(o))D.add(R[1])}for(let I of i.matchAll(o))D.add(I[1]);for(let I of e.defines.keys())D.add(I.replace(/\([\w\s,]*\)/g,""));for(let I of e.uniforms.keys())D.add(I);D.delete("while"),D.delete("for"),D.delete("if"),e.uniforms.forEach((I,R)=>r.uniforms.set(t+R.charAt(0).toUpperCase()+R.slice(1),I)),e.defines.forEach((I,R)=>r.defines.set(t+R.charAt(0).toUpperCase()+R.slice(1),I));let W=new Map([["fragment",i],["vertex",a]]);li(t,D,r.defines),li(t,D,W),i=W.get("fragment"),a=W.get("vertex");let V=e.blendMode;if(r.blendModes.set(V.blendFunction,V),n){e.inputColorSpace!==null&&e.inputColorSpace!==r.colorSpace&&(f+=e.inputColorSpace===ui?`color0 = sRGBTransferOETF(color0);
	`:`color0 = sRGBToLinear(color0);
	`),e.outputColorSpace!==gs?r.colorSpace=e.outputColorSpace:e.inputColorSpace!==null&&(r.colorSpace=e.inputColorSpace);let I=/MainImage *\([\w\s,]*?depth[\w\s,]*?\)/;f+=`${t}MainImage(color0, UV, `,(r.attributes&K.DEPTH)!==0&&I.test(i)&&(f+="depth, ",r.readDepth=!0),f+=`color1);
	`;let R=t+"BlendOpacity";r.uniforms.set(R,V.opacity),f+=`color0 = blend${V.blendFunction}(color0, color1, ${R});

	`,u+=`uniform float ${R};

`}if(u+=i+`
`,a!==null&&(A+=a+`
`),c.set(T.FRAGMENT_HEAD,u),c.set(T.FRAGMENT_MAIN_UV,h),c.set(T.FRAGMENT_MAIN_IMAGE,f),c.set(T.VERTEX_HEAD,A),c.set(T.VERTEX_MAIN_SUPPORT,w),e.extensions!==null)for(let I of e.extensions)r.extensions.add(I)}}var Ts=class extends _e{constructor(t,...e){super("EffectPass"),this.fullscreenMaterial=new fs(null,null,null,t),this.listener=r=>this.handleEvent(r),this.effects=[],this.setEffects(e),this.skipRendering=!1,this.minTime=1,this.maxTime=Number.POSITIVE_INFINITY,this.timeScale=1}set mainScene(t){for(let e of this.effects)e.mainScene=t}set mainCamera(t){this.fullscreenMaterial.copyCameraSettings(t);for(let e of this.effects)e.mainCamera=t}get encodeOutput(){return this.fullscreenMaterial.encodeOutput}set encodeOutput(t){this.fullscreenMaterial.encodeOutput=t}get dithering(){return this.fullscreenMaterial.dithering}set dithering(t){let e=this.fullscreenMaterial;e.dithering=t,e.needsUpdate=!0}setEffects(t){for(let e of this.effects)e.removeEventListener("change",this.listener);this.effects=t.sort((e,r)=>r.attributes-e.attributes);for(let e of this.effects)e.addEventListener("change",this.listener)}updateMaterial(){let t=new mn,e=0;for(let s of this.effects)if(s.blendMode.blendFunction===g.DST)t.attributes|=s.getAttributes()&K.DEPTH;else{if((t.attributes&s.getAttributes()&K.CONVOLUTION)!==0)throw new Error(`Convolution effects cannot be merged (${s.name})`);As("e"+e++,s,t)}let r=t.shaderParts.get(T.FRAGMENT_HEAD),i=t.shaderParts.get(T.FRAGMENT_MAIN_IMAGE),a=t.shaderParts.get(T.FRAGMENT_MAIN_UV),n=/\bblend\b/g;for(let s of t.blendModes.values())r+=s.getShaderCode().replace(n,`blend${s.blendFunction}`)+`
`;(t.attributes&K.DEPTH)!==0?(t.readDepth&&(i=`float depth = readDepth(UV);

	`+i),this.needsDepthTexture=this.getDepthTexture()===null):this.needsDepthTexture=!1,t.colorSpace===ui&&(i+=`color0 = sRGBToLinear(color0);
	`),t.uvTransformation?(a=`vec2 transformedUv = vUv;
`+a,t.defines.set("UV","transformedUv")):t.defines.set("UV","vUv"),t.shaderParts.set(T.FRAGMENT_HEAD,r),t.shaderParts.set(T.FRAGMENT_MAIN_IMAGE,i),t.shaderParts.set(T.FRAGMENT_MAIN_UV,a);for(let[s,o]of t.shaderParts)o!==null&&t.shaderParts.set(s,o.trim().replace(/^#/,`
#`));this.skipRendering=e===0,this.needsSwap=!this.skipRendering,this.fullscreenMaterial.setShaderData(t)}recompile(){this.updateMaterial()}getDepthTexture(){return this.fullscreenMaterial.depthBuffer}setDepthTexture(t,e=ps){this.fullscreenMaterial.depthBuffer=t,this.fullscreenMaterial.depthPacking=e;for(let r of this.effects)r.setDepthTexture(t,e)}render(t,e,r,i,a){for(let n of this.effects)n.update(t,e,i);if(!this.skipRendering||this.renderToScreen){let n=this.fullscreenMaterial;n.inputBuffer=e.texture,n.time+=i*this.timeScale,t.setRenderTarget(this.renderToScreen?null:r),t.render(this.scene,this.camera)}}setSize(t,e){this.fullscreenMaterial.setSize(t,e);for(let r of this.effects)r.setSize(t,e)}initialize(t,e,r){this.renderer=t;for(let i of this.effects)i.initialize(t,e,r);this.updateMaterial(),r!==void 0&&r!==vs&&(this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}dispose(){super.dispose();for(let t of this.effects)t.removeEventListener("change",this.listener),t.dispose()}handleEvent(t){t.type==="change"&&this.recompile()}};var Pp=[new Float32Array(3),new Float32Array(3)],Np=[new Float32Array(3),new Float32Array(3),new Float32Array(3),new Float32Array(3)],bp=[[new Float32Array([0,0,0]),new Float32Array([1,0,0]),new Float32Array([1,1,0]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([1,0,0]),new Float32Array([1,0,1]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([0,0,1]),new Float32Array([1,0,1]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([0,1,0]),new Float32Array([1,1,0]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([0,1,0]),new Float32Array([0,1,1]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([0,0,1]),new Float32Array([0,1,1]),new Float32Array([1,1,1])]];var Op=[new Float32Array(2),new Float32Array(2)];var Up=new Float32Array([0,-.25,.25,-.125,.125,-.375,.375]),Lp=[new Float32Array([0,0]),new Float32Array([.25,-.25]),new Float32Array([-.25,.25]),new Float32Array([.125,-.125]),new Float32Array([-.125,.125])],Bp=[new Uint8Array([0,0]),new Uint8Array([3,0]),new Uint8Array([0,3]),new Uint8Array([3,3]),new Uint8Array([1,0]),new Uint8Array([4,0]),new Uint8Array([1,3]),new Uint8Array([4,3]),new Uint8Array([0,1]),new Uint8Array([3,1]),new Uint8Array([0,4]),new Uint8Array([3,4]),new Uint8Array([1,1]),new Uint8Array([4,1]),new Uint8Array([1,4]),new Uint8Array([4,4])],Fp=[new Uint8Array([0,0]),new Uint8Array([1,0]),new Uint8Array([0,2]),new Uint8Array([1,2]),new Uint8Array([2,0]),new Uint8Array([3,0]),new Uint8Array([2,2]),new Uint8Array([3,2]),new Uint8Array([0,1]),new Uint8Array([1,1]),new Uint8Array([0,3]),new Uint8Array([1,3]),new Uint8Array([2,1]),new Uint8Array([3,1]),new Uint8Array([2,3]),new Uint8Array([3,3])];var zp=new Map([[z(0,0,0,0),new Float32Array([0,0,0,0])],[z(0,0,0,1),new Float32Array([0,0,0,1])],[z(0,0,1,0),new Float32Array([0,0,1,0])],[z(0,0,1,1),new Float32Array([0,0,1,1])],[z(0,1,0,0),new Float32Array([0,1,0,0])],[z(0,1,0,1),new Float32Array([0,1,0,1])],[z(0,1,1,0),new Float32Array([0,1,1,0])],[z(0,1,1,1),new Float32Array([0,1,1,1])],[z(1,0,0,0),new Float32Array([1,0,0,0])],[z(1,0,0,1),new Float32Array([1,0,0,1])],[z(1,0,1,0),new Float32Array([1,0,1,0])],[z(1,0,1,1),new Float32Array([1,0,1,1])],[z(1,1,0,0),new Float32Array([1,1,0,0])],[z(1,1,0,1),new Float32Array([1,1,0,1])],[z(1,1,1,0),new Float32Array([1,1,1,0])],[z(1,1,1,1),new Float32Array([1,1,1,1])]]);function sr(t,e,r){return t+(e-t)*r}function z(t,e,r,i){let a=sr(t,e,.75),n=sr(r,i,1-.25);return sr(a,n,1-.125)}import{Vector3 as _,Color as Ra,Uniform as d,Camera as sc,Vector2 as _a,Matrix4 as J,RawShaderMaterial as oc,Quaternion as Zg,HalfFloatType as va,MeshBasicMaterial as qg,DepthTexture as Jg,UnsignedIntType as $g,WebGLRenderTarget as e1,RedFormat as t1,RGBADepthPacking as r1,LessEqualDepth as i1,BasicDepthPacking as a1,Matrix3 as n1,Mesh as s1,PlaneGeometry as o1,Scene as c1,FloatType as Aa,GLSL3 as Ia,CustomBlending as l1,NoBlending as u1,AddEquation as h1,OneFactor as d1,RGBAFormat as f1,LinearFilter as Ta,ClampToEdgeWrapping as m1,NoColorSpace as p1,WebGL3DRenderTarget as g1,Loader as cc,Data3DTexture as Vr,DataTexture as Sa,LightProbe as v1,BufferGeometry as A1,InterleavedBuffer as T1,InterleavedBufferAttribute as S1,Sphere as x1,DirectionalLight as E1}from"three";import{Loader as st,FileLoader as _s,BufferGeometry as fg,BufferAttribute as mg,Box3 as pg,Vector3 as gg,Sphere as vg,WebGLRenderer as Is,LinearFilter as Ti,RGBAFormat as Ms,ByteType as Ps,UnsignedByteType as Si,ShortType as Ns,UnsignedShortType as bs,IntType as Os,UnsignedIntType as Us,HalfFloatType as Ls,FloatType as xi,MathUtils as re,Material as Lt,Data3DTexture as Bs,DataTexture as Fs,Quaternion as Ag,Matrix4 as Tg,Ray as Sg,Vector2 as xg}from"three";var Ss=!0,cr="Invariant failed";function Se(t,e){if(!t){if(Ss)throw new Error(cr);var r=typeof e=="function"?e():e,i=r?"".concat(cr,": ").concat(r):cr;throw new Error(i)}}import{BufferGeometry as Jp,Sphere as $p,Vector3 as eg,Float32BufferAttribute as tg,Loader as xs,Data3DTexture as Es,FileLoader as ws,UnsignedByteType as ys,RedFormat as Ds,NearestFilter as hi,RepeatWrapping as lr}from"three";var di=128,fi=128,mi=64,Cs="9627216cc50057994c98a2118f3c4a23765d43b9",pi=`https://media.githubusercontent.com/media/takram-design-engineering/three-geospatial/${Cs}/packages/core/assets/stbn.bin`;var yt=class extends xs{load(e,r,i,a){let n=new Es,s=new ws(this.manager);return s.setPath(this.path),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials),s.setResponseType("arraybuffer"),s.load(e,o=>{Se(o instanceof ArrayBuffer),n.image.data=new Uint8Array(o),n.image.width=di,n.image.height=fi,n.image.depth=mi,n.type=ys,n.format=Ds,n.minFilter=hi,n.magFilter=hi,n.wrapS=lr,n.wrapT=lr,n.wrapR=lr,n.needsUpdate=!0,r?.(n)},i,a),n}};import{Vector3 as O,Matrix4 as gi,BufferGeometry as ng,BufferAttribute as sg}from"three";var Rs=new O;function Ai(t,e,r=new O,i){let{x:a,y:n,z:s}=t,o=e.x,c=e.y,u=e.z,h=a*a*o,f=n*n*c,A=s*s*u,w=h+f+A,b=Math.sqrt(1/w);if(!Number.isFinite(b))return;let D=Rs.copy(t).multiplyScalar(b);if(w<(i?.centerTolerance??.1))return r.copy(D);let W=D.multiply(e).multiplyScalar(2),V=(1-b)*t.length()/(W.length()/2),I=0,R,H,G,ve;do{V-=I,R=1/(1+V*o),H=1/(1+V*c),G=1/(1+V*u);let Ee=R*R,we=H*H,se=G*G,rr=Ee*R,ir=we*H,ar=se*G;ve=h*Ee+f*we+A*se-1,I=ve/((h*rr*o+f*ir*c+A*ar*u)*-2)}while(Math.abs(ve)>1e-12);return r.set(a*R,n*H,s*G)}var Ie=new O,ur=new O,hr=new O,dr=class{constructor(e,r,i){this.radii=new O(e,r,i)}get minimumRadius(){return Math.min(this.radii.x,this.radii.y,this.radii.z)}get maximumRadius(){return Math.max(this.radii.x,this.radii.y,this.radii.z)}get flattening(){return 1-this.minimumRadius/this.maximumRadius}get eccentricity(){return Math.sqrt(this.eccentricitySquared)}get eccentricitySquared(){let e=this.maximumRadius**2,r=this.minimumRadius**2;return(e-r)/e}reciprocalRadii(e=new O){let{x:r,y:i,z:a}=this.radii;return e.set(1/r,1/i,1/a)}reciprocalRadiiSquared(e=new O){let{x:r,y:i,z:a}=this.radii;return e.set(1/r**2,1/i**2,1/a**2)}projectOnSurface(e,r=new O,i){return Ai(e,this.reciprocalRadiiSquared(),r,i)}getSurfaceNormal(e,r=new O){return r.multiplyVectors(this.reciprocalRadiiSquared(Ie),e).normalize()}getEastNorthUpVectors(e,r=new O,i=new O,a=new O){this.getSurfaceNormal(e,a),r.set(-e.y,e.x,0).normalize(),i.crossVectors(a,r).normalize()}getEastNorthUpFrame(e,r=new gi){let i=Ie,a=ur,n=hr;return this.getEastNorthUpVectors(e,i,a,n),r.makeBasis(i,a,n).setPosition(e)}getNorthUpEastFrame(e,r=new gi){let i=Ie,a=ur,n=hr;return this.getEastNorthUpVectors(e,i,a,n),r.makeBasis(a,n,i).setPosition(e)}getIntersection(e,r=new O){let i=this.reciprocalRadii(Ie),a=ur.copy(i).multiply(e.origin),n=hr.copy(i).multiply(e.direction),s=a.lengthSq(),o=n.lengthSq(),c=a.dot(n),u=c**2-o*(s-1);if(s===1)return r.copy(e.origin);if(s>1){if(c>=0||u<0)return;let h=Math.sqrt(u),f=(-c-h)/o,A=(-c+h)/o;return e.at(Math.min(f,A),r)}if(s<1){let h=c**2-o*(s-1),f=Math.sqrt(h),A=(-c+f)/o;return e.at(A,r)}if(c<0)return e.at(-c/o,r)}getOsculatingSphereCenter(e,r,i=new O){Se(this.radii.x===this.radii.y);let a=this.radii.x**2,n=this.radii.z**2,s=Ie.set(e.x/a,e.y/a,e.z/n).normalize();return i.copy(s.multiplyScalar(-r).add(e))}getNormalAtHorizon(e,r,i=new O){Se(this.radii.x===this.radii.y);let a=this.radii.x**2,n=this.radii.z**2,s=e,o=r,c=(s.x*o.x+s.y*o.y)/a+s.z*o.z/n;c/=(s.x**2+s.y**2)/a+s.z**2/n;let u=Ie.copy(o).multiplyScalar(-c).add(e);return i.set(u.x/a,u.y/a,u.z/n).normalize()}};dr.WGS84=new dr(6378137,6378137,6356752314245179e-9);var oe=dr;var Dt=new O,vi=new O,Je=class fr{constructor(e=0,r=0,i=0){this.longitude=e,this.latitude=r,this.height=i}set(e,r,i){return this.longitude=e,this.latitude=r,i!=null&&(this.height=i),this}clone(){return new fr(this.longitude,this.latitude,this.height)}copy(e){return this.longitude=e.longitude,this.latitude=e.latitude,this.height=e.height,this}equals(e){return e.longitude===this.longitude&&e.latitude===this.latitude&&e.height===this.height}setLongitude(e){return this.longitude=e,this}setLatitude(e){return this.latitude=e,this}setHeight(e){return this.height=e,this}normalize(){return this.longitude<fr.MIN_LONGITUDE&&(this.longitude+=Math.PI*2),this}setFromECEF(e,r){let i=(r?.ellipsoid??oe.WGS84).reciprocalRadiiSquared(Dt),a=Ai(e,i,vi,r);if(a==null)throw new Error(`Could not project position to ellipsoid surface: ${e.toArray()}`);let n=Dt.multiplyVectors(a,i).normalize();this.longitude=Math.atan2(n.y,n.x),this.latitude=Math.asin(n.z);let s=Dt.subVectors(e,a);return this.height=Math.sign(s.dot(e))*s.length(),this}toECEF(e=new O,r){let i=r?.ellipsoid??oe.WGS84,a=Dt.multiplyVectors(i.radii,i.radii),n=Math.cos(this.latitude),s=vi.set(n*Math.cos(this.longitude),n*Math.sin(this.longitude),Math.sin(this.latitude)).normalize();return e.multiplyVectors(a,s),e.divideScalar(Math.sqrt(s.dot(e))).add(s.multiplyScalar(this.height))}fromArray(e,r=0){return this.longitude=e[r],this.latitude=e[r+1],this.height=e[r+2],this}toArray(e=[],r=0){return e[r]=this.longitude,e[r+1]=this.latitude,e[r+2]=this.height,e}*[Symbol.iterator](){yield this.longitude,yield this.latitude,yield this.height}};Je.MIN_LONGITUDE=-Math.PI,Je.MAX_LONGITUDE=Math.PI,Je.MIN_LATITUDE=-Math.PI/2,Je.MAX_LATITUDE=Math.PI/2;var $=Je;import{EXRLoader as Gi}from"three/addons/loaders/EXRLoader.js";var Ar=class extends st{load(e,r,i,a){let n=new _s(this.manager);n.setResponseType("arraybuffer"),n.setRequestHeader(this.requestHeader),n.setPath(this.path),n.setWithCredentials(this.withCredentials),n.load(e,s=>{Se(s instanceof ArrayBuffer);try{r(s)}catch(o){a!=null?a(o):console.error(o),this.manager.itemError(e)}},i,a)}};function zi(t){return t instanceof Is?t.getContext().getExtension("OES_texture_float_linear")!=null:t.backend.hasFeature?.("float32-filterable")??!1}var Hs="This is not an object",Gs="This is not a Float16Array object",Ei="This constructor is not a subclass of Float16Array",ki="The constructor property value is not an object",zs="Species constructor didn't return TypedArray object",ks="Derived constructor created TypedArray object which was too small length",rt="Attempting to access detached ArrayBuffer",Tr="Cannot convert undefined or null to object",Sr="Cannot mix BigInt and other types, use explicit conversions",wi="@@iterator property is not callable",yi="Reduce of empty array with no initial value",Ws="The comparison function must be either a function or undefined",mr="Offset is out of bounds";function y(t){return(e,...r)=>Y(t,e,r)}function Ue(t,e){return y(Pe(t,e).get)}var{apply:Y,construct:et,defineProperty:Vs,get:pr,getOwnPropertyDescriptor:Pe,getPrototypeOf:ot,has:xr,ownKeys:Wi,set:Di,setPrototypeOf:Vi}=Reflect,Ys=Proxy,{EPSILON:Qs,MAX_SAFE_INTEGER:Ci,isFinite:Yi,isNaN:Ne}=Number,{iterator:ae,species:Xs,toStringTag:Rr,for:js}=Symbol,be=Object,{create:Bt,defineProperty:ct,freeze:Ks,is:Ri}=be,Er=be.prototype,Zs=Er.__lookupGetter__?y(Er.__lookupGetter__):(t,e)=>{if(t==null)throw C(Tr);let r=be(t);do{let i=Pe(r,e);if(i!==void 0)return le(i,"get")?i.get:void 0}while((r=ot(r))!==null)},le=be.hasOwn||y(Er.hasOwnProperty),Qi=Array,Xi=Qi.isArray,Ft=Qi.prototype,qs=y(Ft.join),Js=y(Ft.push),$s=y(Ft.toLocaleString),_r=Ft[ae],eo=y(_r),{abs:to,trunc:ji}=Math,Ht=ArrayBuffer,ro=Ht.isView,Ki=Ht.prototype,io=y(Ki.slice),ao=Ue(Ki,"byteLength"),wr=typeof SharedArrayBuffer<"u"?SharedArrayBuffer:null,no=wr&&Ue(wr.prototype,"byteLength"),Ir=ot(Uint8Array),so=Ir.from,B=Ir.prototype,oo=B[ae],co=y(B.keys),lo=y(B.values),uo=y(B.entries),ho=y(B.set),_i=y(B.reverse),fo=y(B.fill),mo=y(B.copyWithin),Ii=y(B.sort),$e=y(B.slice),po=y(B.subarray),L=Ue(B,"buffer"),De=Ue(B,"byteOffset"),x=Ue(B,"length"),Zi=Ue(B,Rr),go=Uint8Array,j=Uint16Array,Mi=(...t)=>Y(so,j,t),Mr=Uint32Array,vo=Float32Array,Ce=ot([][ae]()),Gt=y(Ce.next),Ao=y((function*(){})().next),To=ot(Ce),So=DataView.prototype,xo=y(So.getUint16),C=TypeError,gr=RangeError,qi=WeakSet,Ji=qi.prototype,Eo=y(Ji.add),wo=y(Ji.has),zt=WeakMap,Pr=zt.prototype,Mt=y(Pr.get),yo=y(Pr.has),Nr=y(Pr.set),$i=new zt,Do=Bt(null,{next:{value:function(){let t=Mt($i,this);return Gt(t)}},[ae]:{value:function(){return this}}});function tt(t){if(t[ae]===_r&&Ce.next===Gt)return t;let e=Bt(Do);return Nr($i,e,eo(t)),e}var ea=new zt,ta=Bt(To,{next:{value:function(){let t=Mt(ea,this);return Ao(t)},writable:!0,configurable:!0}});for(let t of Wi(Ce))t!=="next"&&ct(ta,t,Pe(Ce,t));function Pi(t){let e=Bt(ta);return Nr(ea,e,t),e}function Pt(t){return t!==null&&typeof t=="object"||typeof t=="function"}function Ni(t){return t!==null&&typeof t=="object"}function Nt(t){return Zi(t)!==void 0}function yr(t){let e=Zi(t);return e==="BigInt64Array"||e==="BigUint64Array"}function Co(t){try{return Xi(t)?!1:(ao(t),!0)}catch{return!1}}function ra(t){if(wr===null)return!1;try{return no(t),!0}catch{return!1}}function Ro(t){return Co(t)||ra(t)}function bi(t){return Xi(t)?t[ae]===_r&&Ce.next===Gt:!1}function _o(t){return Nt(t)?t[ae]===oo&&Ce.next===Gt:!1}function Ct(t){if(typeof t!="string")return!1;let e=+t;return t!==e+""||!Yi(e)?!1:e===ji(e)}var bt=js("__Float16Array__");function Io(t){if(!Ni(t))return!1;let e=ot(t);if(!Ni(e))return!1;let r=e.constructor;if(r===void 0)return!1;if(!Pt(r))throw C(ki);return xr(r,bt)}var Dr=1/Qs;function Mo(t){return t+Dr-Dr}var ia=6103515625e-14,Po=65504,aa=.0009765625,Oi=aa*ia,No=aa*Dr;function bo(t){let e=+t;if(!Yi(e)||e===0)return e;let r=e>0?1:-1,i=to(e);if(i<ia)return r*Mo(i/Oi)*Oi;let a=(1+No)*i,n=a-(a-i);return n>Po||Ne(n)?r*(1/0):r*n}var na=new Ht(4),sa=new vo(na),oa=new Mr(na),ee=new j(512),te=new go(512);for(let t=0;t<256;++t){let e=t-127;e<-24?(ee[t]=0,ee[t|256]=32768,te[t]=24,te[t|256]=24):e<-14?(ee[t]=1024>>-e-14,ee[t|256]=1024>>-e-14|32768,te[t]=-e-1,te[t|256]=-e-1):e<=15?(ee[t]=e+15<<10,ee[t|256]=e+15<<10|32768,te[t]=13,te[t|256]=13):e<128?(ee[t]=31744,ee[t|256]=64512,te[t]=24,te[t|256]=24):(ee[t]=31744,ee[t|256]=64512,te[t]=13,te[t|256]=13)}function ie(t){sa[0]=bo(t);let e=oa[0],r=e>>23&511;return ee[r]+((e&8388607)>>te[r])}var br=new Mr(2048);for(let t=1;t<1024;++t){let e=t<<13,r=0;for(;(e&8388608)===0;)e<<=1,r-=8388608;e&=-8388609,r+=947912704,br[t]=e|r}for(let t=1024;t<2048;++t)br[t]=939524096+(t-1024<<13);var Le=new Mr(64);for(let t=1;t<31;++t)Le[t]=t<<23;Le[31]=1199570944;Le[32]=2147483648;for(let t=33;t<63;++t)Le[t]=2147483648+(t-32<<23);Le[63]=3347054592;var ca=new j(64);for(let t=1;t<64;++t)t!==32&&(ca[t]=1024);function E(t){let e=t>>10;return oa[0]=br[ca[e]+(t&1023)]+Le[e],sa[0]}function ce(t){let e=+t;return Ne(e)||e===0?0:ji(e)}function vr(t){let e=ce(t);return e<0?0:e<Ci?e:Ci}function Rt(t,e){if(!Pt(t))throw C(Hs);let r=t.constructor;if(r===void 0)return e;if(!Pt(r))throw C(ki);return r[Xs]??e}function it(t){if(ra(t))return!1;try{return io(t,0,0),!1}catch{}return!0}function Ui(t,e){let r=Ne(t),i=Ne(e);if(r&&i)return 0;if(r)return 1;if(i||t<e)return-1;if(t>e)return 1;if(t===0&&e===0){let a=Ri(t,0),n=Ri(e,0);if(!a&&n)return-1;if(a&&!n)return 1}return 0}var Or=2,Ot=new zt;function Me(t){return yo(Ot,t)||!ro(t)&&Io(t)}function S(t){if(!Me(t))throw C(Gs)}function _t(t,e){let r=Me(t),i=Nt(t);if(!r&&!i)throw C(zs);if(typeof e=="number"){let a;if(r){let n=p(t);a=x(n)}else a=x(t);if(a<e)throw C(ks)}if(yr(t))throw C(Sr)}function p(t){let e=Mt(Ot,t);if(e!==void 0){let a=L(e);if(it(a))throw C(rt);return e}let r=t.buffer;if(it(r))throw C(rt);let i=et(Z,[r,t.byteOffset,t.length],t.constructor);return Mt(Ot,i)}function Li(t){let e=x(t),r=[];for(let i=0;i<e;++i)r[i]=E(t[i]);return r}var la=new qi;for(let t of Wi(B)){if(t===Rr)continue;let e=Pe(B,t);le(e,"get")&&typeof e.get=="function"&&Eo(la,e.get)}var Oo=Ks({get(t,e,r){return Ct(e)&&le(t,e)?E(pr(t,e)):wo(la,Zs(t,e))?pr(t,e):pr(t,e,r)},set(t,e,r,i){return Ct(e)&&le(t,e)?Di(t,e,ie(r)):Di(t,e,r,i)},getOwnPropertyDescriptor(t,e){if(Ct(e)&&le(t,e)){let r=Pe(t,e);return r.value=E(r.value),r}return Pe(t,e)},defineProperty(t,e,r){return Ct(e)&&le(t,e)&&le(r,"value")&&(r.value=ie(r.value)),Vs(t,e,r)}}),Z=class t{constructor(e,r,i){let a;if(Me(e))a=et(j,[p(e)],new.target);else if(Pt(e)&&!Ro(e)){let s,o;if(Nt(e)){s=e,o=x(e);let c=L(e);if(it(c))throw C(rt);if(yr(e))throw C(Sr);let u=new Ht(o*Or);a=et(j,[u],new.target)}else{let c=e[ae];if(c!=null&&typeof c!="function")throw C(wi);c!=null?bi(e)?(s=e,o=e.length):(s=[...e],o=s.length):(s=e,o=vr(s.length)),a=et(j,[o],new.target)}for(let c=0;c<o;++c)a[c]=ie(s[c])}else a=et(j,arguments,new.target);let n=new Ys(a,Oo);return Nr(Ot,n,a),n}static from(e,...r){let i=this;if(!xr(i,bt))throw C(Ei);if(i===t){if(Me(e)&&r.length===0){let h=p(e),f=new j(L(h),De(h),x(h));return new t(L($e(f)))}if(r.length===0)return new t(L(Mi(e,ie)));let c=r[0],u=r[1];return new t(L(Mi(e,function(h,...f){return ie(Y(c,this,[h,...tt(f)]))},u)))}let a,n,s=e[ae];if(s!=null&&typeof s!="function")throw C(wi);if(s!=null)bi(e)?(a=e,n=e.length):_o(e)?(a=e,n=x(e)):(a=[...e],n=a.length);else{if(e==null)throw C(Tr);a=be(e),n=vr(a.length)}let o=new i(n);if(r.length===0)for(let c=0;c<n;++c)o[c]=a[c];else{let c=r[0],u=r[1];for(let h=0;h<n;++h)o[h]=Y(c,u,[a[h],h])}return o}static of(...e){let r=this;if(!xr(r,bt))throw C(Ei);let i=e.length;if(r===t){let n=new t(i),s=p(n);for(let o=0;o<i;++o)s[o]=ie(e[o]);return n}let a=new r(i);for(let n=0;n<i;++n)a[n]=e[n];return a}keys(){S(this);let e=p(this);return co(e)}values(){S(this);let e=p(this);return Pi((function*(){for(let r of lo(e))yield E(r)})())}entries(){S(this);let e=p(this);return Pi((function*(){for(let[r,i]of uo(e))yield[r,E(i)]})())}at(e){S(this);let r=p(this),i=x(r),a=ce(e),n=a>=0?a:i+a;if(!(n<0||n>=i))return E(r[n])}with(e,r){S(this);let i=p(this),a=x(i),n=ce(e),s=n>=0?n:a+n,o=+r;if(s<0||s>=a)throw gr(mr);let c=new j(L(i),De(i),x(i)),u=new t(L($e(c))),h=p(u);return h[s]=ie(o),u}map(e,...r){S(this);let i=p(this),a=x(i),n=r[0],s=Rt(i,t);if(s===t){let c=new t(a),u=p(c);for(let h=0;h<a;++h){let f=E(i[h]);u[h]=ie(Y(e,n,[f,h,this]))}return c}let o=new s(a);_t(o,a);for(let c=0;c<a;++c){let u=E(i[c]);o[c]=Y(e,n,[u,c,this])}return o}filter(e,...r){S(this);let i=p(this),a=x(i),n=r[0],s=[];for(let u=0;u<a;++u){let h=E(i[u]);Y(e,n,[h,u,this])&&Js(s,h)}let o=Rt(i,t),c=new o(s);return _t(c),c}reduce(e,...r){S(this);let i=p(this),a=x(i);if(a===0&&r.length===0)throw C(yi);let n,s;r.length===0?(n=E(i[0]),s=1):(n=r[0],s=0);for(let o=s;o<a;++o)n=e(n,E(i[o]),o,this);return n}reduceRight(e,...r){S(this);let i=p(this),a=x(i);if(a===0&&r.length===0)throw C(yi);let n,s;r.length===0?(n=E(i[a-1]),s=a-2):(n=r[0],s=a-1);for(let o=s;o>=0;--o)n=e(n,E(i[o]),o,this);return n}forEach(e,...r){S(this);let i=p(this),a=x(i),n=r[0];for(let s=0;s<a;++s)Y(e,n,[E(i[s]),s,this])}find(e,...r){S(this);let i=p(this),a=x(i),n=r[0];for(let s=0;s<a;++s){let o=E(i[s]);if(Y(e,n,[o,s,this]))return o}}findIndex(e,...r){S(this);let i=p(this),a=x(i),n=r[0];for(let s=0;s<a;++s){let o=E(i[s]);if(Y(e,n,[o,s,this]))return s}return-1}findLast(e,...r){S(this);let i=p(this),a=x(i),n=r[0];for(let s=a-1;s>=0;--s){let o=E(i[s]);if(Y(e,n,[o,s,this]))return o}}findLastIndex(e,...r){S(this);let i=p(this),a=x(i),n=r[0];for(let s=a-1;s>=0;--s){let o=E(i[s]);if(Y(e,n,[o,s,this]))return s}return-1}every(e,...r){S(this);let i=p(this),a=x(i),n=r[0];for(let s=0;s<a;++s)if(!Y(e,n,[E(i[s]),s,this]))return!1;return!0}some(e,...r){S(this);let i=p(this),a=x(i),n=r[0];for(let s=0;s<a;++s)if(Y(e,n,[E(i[s]),s,this]))return!0;return!1}set(e,...r){S(this);let i=p(this),a=ce(r[0]);if(a<0)throw gr(mr);if(e==null)throw C(Tr);if(yr(e))throw C(Sr);if(Me(e))return ho(p(this),p(e),a);if(Nt(e)){let c=L(e);if(it(c))throw C(rt)}let n=x(i),s=be(e),o=vr(s.length);if(a===1/0||o+a>n)throw gr(mr);for(let c=0;c<o;++c)i[c+a]=ie(s[c])}reverse(){S(this);let e=p(this);return _i(e),this}toReversed(){S(this);let e=p(this),r=new j(L(e),De(e),x(e)),i=new t(L($e(r))),a=p(i);return _i(a),i}fill(e,...r){S(this);let i=p(this);return fo(i,ie(e),...tt(r)),this}copyWithin(e,r,...i){S(this);let a=p(this);return mo(a,e,r,...tt(i)),this}sort(e){S(this);let r=p(this),i=e!==void 0?e:Ui;return Ii(r,(a,n)=>i(E(a),E(n))),this}toSorted(e){S(this);let r=p(this);if(e!==void 0&&typeof e!="function")throw new C(Ws);let i=e!==void 0?e:Ui,a=new j(L(r),De(r),x(r)),n=new t(L($e(a))),s=p(n);return Ii(s,(o,c)=>i(E(o),E(c))),n}slice(e,r){S(this);let i=p(this),a=Rt(i,t);if(a===t){let b=new j(L(i),De(i),x(i));return new t(L($e(b,e,r)))}let n=x(i),s=ce(e),o=r===void 0?n:ce(r),c;s===-1/0?c=0:s<0?c=n+s>0?n+s:0:c=n<s?n:s;let u;o===-1/0?u=0:o<0?u=n+o>0?n+o:0:u=n<o?n:o;let h=u-c>0?u-c:0,f=new a(h);if(_t(f,h),h===0)return f;let A=L(i);if(it(A))throw C(rt);let w=0;for(;c<u;)f[w]=E(i[c]),++c,++w;return f}subarray(e,r){S(this);let i=p(this),a=Rt(i,t),n=new j(L(i),De(i),x(i)),s=po(n,e,r),o=new a(L(s),De(s),x(s));return _t(o),o}indexOf(e,...r){S(this);let i=p(this),a=x(i),n=ce(r[0]);if(n===1/0)return-1;n<0&&(n+=a,n<0&&(n=0));for(let s=n;s<a;++s)if(le(i,s)&&E(i[s])===e)return s;return-1}lastIndexOf(e,...r){S(this);let i=p(this),a=x(i),n=r.length>=1?ce(r[0]):a-1;if(n===-1/0)return-1;n>=0?n=n<a-1?n:a-1:n+=a;for(let s=n;s>=0;--s)if(le(i,s)&&E(i[s])===e)return s;return-1}includes(e,...r){S(this);let i=p(this),a=x(i),n=ce(r[0]);if(n===1/0)return!1;n<0&&(n+=a,n<0&&(n=0));let s=Ne(e);for(let o=n;o<a;++o){let c=E(i[o]);if(s&&Ne(c)||c===e)return!0}return!1}join(e){S(this);let r=p(this),i=Li(r);return qs(i,e)}toLocaleString(...e){S(this);let r=p(this),i=Li(r);return $s(i,...tt(e))}get[Rr](){if(Me(this))return"Float16Array"}};ct(Z,"BYTES_PER_ELEMENT",{value:Or});ct(Z,bt,{});Vi(Z,Ir);var Ut=Z.prototype;ct(Ut,"BYTES_PER_ELEMENT",{value:Or});ct(Ut,ae,{value:Ut.values,writable:!0,configurable:!0});Vi(Ut,B);function Uo(t,e,...r){return E(xo(t,e,...tt(r)))}var Cr=class extends st{constructor(e,r){super(r),this.parser=e}load(e,r,i,a){let n=new Ar(this.manager);n.setRequestHeader(this.requestHeader),n.setPath(this.path),n.setWithCredentials(this.withCredentials),n.load(e,s=>{try{r(this.parser(s))}catch(o){a!=null?a(o):console.error(o),this.manager.itemError(e)}},i,a)}};function Lo(t){let e=t instanceof Int8Array?Ps:t instanceof Uint8Array?Si:t instanceof Uint8ClampedArray?Si:t instanceof Int16Array?Ns:t instanceof Uint16Array?bs:t instanceof Int32Array?Os:t instanceof Uint32Array?Us:t instanceof Z?Ls:t instanceof Float32Array?xi:t instanceof Float64Array?xi:null;return Se(e!=null),e}var ue=class extends st{constructor(e,r,i={},a){super(a),this.textureClass=e,this.parser=r,this.options={format:Ms,minFilter:Ti,magFilter:Ti,...i}}load(e,r,i,a){let n=new this.textureClass,s=new Cr(this.parser,this.manager);return s.setRequestHeader(this.requestHeader),s.setPath(this.path),s.setWithCredentials(this.withCredentials),s.load(e,o=>{n.image.data=o instanceof Z?new Uint16Array(o.buffer):o;let{width:c,height:u,depth:h,...f}=this.options;c!=null&&(n.image.width=c),u!=null&&(n.image.height=u),"depth"in n.image&&h!=null&&(n.image.depth=h),n.type=Lo(o),Object.assign(n,f),n.needsUpdate=!0,r?.(n)},i,a),n}},at=re.clamp,Rg=re.euclideanModulo,_g=re.inverseLerp,Ur=re.lerp,Lr=re.degToRad,Ig=re.radToDeg,Mg=re.isPowerOfTwo,Pg=re.ceilPowerOfTwo,Ng=re.floorPowerOfTwo,bg=re.normalize;function ua(t,e,r,i=0,a=1){return re.mapLinear(t,e,r,i,a)}function ha(t){return Math.min(Math.max(t,0),1)}function v(t){return(e,r)=>{e instanceof Lt?Object.defineProperty(e,r,{enumerable:!0,get(){return this.defines?.[t]!=null},set(i){i!==this[r]&&(i?(this.defines??={},this.defines[t]="1"):delete this.defines?.[t],this.needsUpdate=!0)}}):Object.defineProperty(e,r,{enumerable:!0,get(){return this.defines.has(t)},set(i){i!==this[r]&&(i?this.defines.set(t,"1"):this.defines.delete(t),this.setChanged())}})}}function Bi(t){return typeof t=="number"?Math.floor(t):typeof t=="string"?parseInt(t,10):typeof t=="boolean"?+t:0}function he(t,{min:e=Number.MIN_SAFE_INTEGER,max:r=Number.MAX_SAFE_INTEGER}={}){return(i,a)=>{i instanceof Lt?Object.defineProperty(i,a,{enumerable:!0,get(){let n=this.defines?.[t];return n!=null?Bi(n):0},set(n){let s=this[a];n!==s&&(this.defines??={},this.defines[t]=at(n,e,r).toFixed(0),this.needsUpdate=!0)}}):Object.defineProperty(i,a,{enumerable:!0,get(){let n=this.defines.get(t);return n!=null?Bi(n):0},set(n){let s=this[a];n!==s&&(this.defines.set(t,at(n,e,r).toFixed(0)),this.setChanged())}})}}function Fi(t){return typeof t=="number"?t:typeof t=="string"?parseFloat(t):typeof t=="boolean"?+t:0}function kt(t,{min:e=-1/0,max:r=1/0,precision:i=7}={}){return(a,n)=>{a instanceof Lt?Object.defineProperty(a,n,{enumerable:!0,get(){let s=this.defines?.[t];return s!=null?Fi(s):0},set(s){let o=this[n];s!==o&&(this.defines??={},this.defines[t]=at(s,e,r).toFixed(i),this.needsUpdate=!0)}}):Object.defineProperty(a,n,{enumerable:!0,get(){let s=this.defines.get(t);return s!=null?Fi(s):0},set(s){let o=this[n];s!==o&&(this.defines.set(t,at(s,e,r).toFixed(i)),this.setChanged())}})}}function Br(t,{validate:e}={}){return(r,i)=>{r instanceof Lt?Object.defineProperty(r,i,{enumerable:!0,get(){return this.defines?.[t]},set(a){if(a!==this[i]){if(e?.(a)===!1){console.error(`Expression validation failed: ${a}`);return}this.defines??={},this.defines[t]=a,this.needsUpdate=!0}}}):Object.defineProperty(r,i,{enumerable:!0,get(){return this.defines.get(t)},set(a){if(a!==this[i]){if(e?.(a)===!1){console.error(`Expression validation failed: ${a}`);return}this.defines.set(t,a),this.setChanged()}}})}}function Fr(t,...e){let r={};for(let i=0;i<e.length;i+=2){let a=e[i],n=e[i+1];for(let s of n)r[s]={enumerable:!0,get:()=>a[s],set:o=>{a[s]=o}}}return Object.defineProperties(t,r),t}function Hr(t,e,r){let i={};for(let a of r)i[a]={enumerable:!0,get:()=>e.uniforms[a].value,set:n=>{e.uniforms[a].value=n}};return Object.defineProperties(t,i),t}var Oe=class extends st{constructor(e={},r){super(r),this.options=e}load(e,r,i,a){let{width:n,height:s,depth:o}=this.options,c=new Bs(null,n,s,o),u=new Gi(this.manager);return u.setRequestHeader(this.requestHeader),u.setPath(this.path),u.setWithCredentials(this.withCredentials),u.load(e,h=>{let{image:f}=h;c.image={data:f.data,width:n??f.width,height:s??f.height,depth:o??Math.sqrt(f.height)},c.type=h.type,c.format=h.format,c.colorSpace=h.colorSpace,c.needsUpdate=!0;try{r?.(c)}catch(A){a!=null?a(A):console.error(A),this.manager.itemError(e)}},i,a),c}},nt=class extends st{constructor(e={},r){super(r),this.options=e}load(e,r,i,a){let{width:n,height:s}=this.options,o=new Fs(null,n,s),c=new Gi(this.manager);return c.setRequestHeader(this.requestHeader),c.setPath(this.path),c.setWithCredentials(this.withCredentials),c.load(e,u=>{let{image:h}=u;o.image={data:h.data,width:n??h.width,height:s??h.height},o.type=u.type,o.format=u.format,o.colorSpace=u.colorSpace,o.needsUpdate=!0;try{r?.(o)}catch(f){a!=null?a(f):console.error(f),this.manager.itemError(e)}},i,a),o}};var Hi=class da{constructor(e=0,r=0,i=0,a=0){this.west=e,this.south=r,this.east=i,this.north=a}get width(){let e=this.east;return e<this.west&&(e+=Math.PI*2),e-this.west}get height(){return this.north-this.south}set(e,r,i,a){return this.west=e,this.south=r,this.east=i,this.north=a,this}clone(){return new da(this.west,this.south,this.east,this.north)}copy(e){return this.west=e.west,this.south=e.south,this.east=e.east,this.north=e.north,this}equals(e){return e.west===this.west&&e.south===this.south&&e.east===this.east&&e.north===this.north}at(e,r,i=new $){return i.set(this.west+(this.east-this.west)*e,this.north+(this.south-this.north)*r)}fromArray(e,r=0){return this.west=e[r],this.south=e[r+1],this.east=e[r+2],this.north=e[r+3],this}toArray(e=[],r=0){return e[r]=this.west,e[r+1]=this.south,e[r+2]=this.east,e[r+3]=this.north,e}*[Symbol.iterator](){yield this.west,yield this.south,yield this.east,yield this.north}};Hi.MAX=new Hi($.MIN_LONGITUDE,$.MIN_LATITUDE,$.MAX_LONGITUDE,$.MAX_LATITUDE);var Bo=/^[ \t]*#include +"([\w\d./]+)"/gm;function q(t,e){return t.replace(Bo,(r,i)=>{let a=i.split("/").reduce((n,s)=>typeof n!="string"&&n!=null?n[s]:void 0,e);if(typeof a!="string")throw new Error(`Could not find include for ${i}.`);return q(a,e)})}var It;function Fo(){if(It!=null)return It;let t=new Uint32Array([268435456]);return It=new Uint8Array(t.buffer,t.byteOffset,t.byteLength)[0]===0,It}function Ho(t,e,r,i=!0){if(i===Fo())return new e(t);let a=Object.assign(new DataView(t),{getFloat16(s,o){return Uo(this,s,o)}}),n=new e(a.byteLength/e.BYTES_PER_ELEMENT);for(let s=0,o=0;s<n.length;++s,o+=e.BYTES_PER_ELEMENT)n[s]=a[r](o,i);return n}var Go=t=>new Uint8Array(t);var Be=(t,e)=>Ho(t,Z,"getFloat16",e);var zo=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*(?:i\s*\+\+|\+\+\s*i)\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ko(t,e,r,i){let a="";for(let n=parseInt(e,10);n<parseInt(r,10);++n)a+=i.replace(/\[\s*i\s*\]/g,`[${n}]`).replace(/UNROLLED_LOOP_INDEX/g,`${n}`);return a}function Re(t){return t.replace(zo,ko)}var Wo=`// Reference: https://github.com/mrdoob/three.js/blob/r171/examples/jsm/csm/CSMShader.js

#ifndef SHADOW_CASCADE_COUNT
#error "SHADOW_CASCADE_COUNT macro must be defined."
#endif // SHADOW_CASCADE_COUNT

int getCascadeIndex(
  const mat4 viewMatrix,
  const vec3 worldPosition,
  const vec2 intervals[SHADOW_CASCADE_COUNT],
  const float near,
  const float far
) {
  vec4 viewPosition = viewMatrix * vec4(worldPosition, 1.0);
  float depth = viewZToOrthographicDepth(viewPosition.z, near, far);
  vec2 interval;
  #pragma unroll_loop_start
  for (int i = 0; i < 4; ++i) {
    #if UNROLLED_LOOP_INDEX < SHADOW_CASCADE_COUNT
    interval = intervals[i];
    if (depth >= interval.x && depth < interval.y) {
      return UNROLLED_LOOP_INDEX;
    }
    #endif // UNROLLED_LOOP_INDEX < SHADOW_CASCADE_COUNT
  }
  #pragma unroll_loop_end
  return SHADOW_CASCADE_COUNT - 1;
}

int getFadedCascadeIndex(
  const mat4 viewMatrix,
  const vec3 worldPosition,
  const vec2 intervals[SHADOW_CASCADE_COUNT],
  const float near,
  const float far,
  const float jitter
) {
  vec4 viewPosition = viewMatrix * vec4(worldPosition, 1.0);
  float depth = viewZToOrthographicDepth(viewPosition.z, near, far);

  vec2 interval;
  float intervalCenter;
  float closestEdge;
  float margin;
  int nextIndex = -1;
  int prevIndex = -1;
  float alpha;

  #pragma unroll_loop_start
  for (int i = 0; i < 4; ++i) {
    #if UNROLLED_LOOP_INDEX < SHADOW_CASCADE_COUNT
    interval = intervals[i];
    intervalCenter = (interval.x + interval.y) * 0.5;
    closestEdge = depth < intervalCenter ? interval.x : interval.y;
    margin = closestEdge * closestEdge * 0.5;
    interval += margin * vec2(-0.5, 0.5);

    #if UNROLLED_LOOP_INDEX < SHADOW_CASCADE_COUNT - 1
    if (depth >= interval.x && depth < interval.y) {
      prevIndex = nextIndex;
      nextIndex = UNROLLED_LOOP_INDEX;
      alpha = saturate(min(depth - interval.x, interval.y - depth) / margin);
    }
    #else // UNROLLED_LOOP_INDEX < SHADOW_CASCADE_COUNT - 1
    // Don't fade out the last cascade.
    if (depth >= interval.x) {
      prevIndex = nextIndex;
      nextIndex = UNROLLED_LOOP_INDEX;
      alpha = saturate((depth - interval.x) / margin);
    }
    #endif // UNROLLED_LOOP_INDEX < SHADOW_CASCADE_COUNT - 1
    #endif // UNROLLED_LOOP_INDEX < SHADOW_CASCADE_COUNT
  }
  #pragma unroll_loop_end

  return jitter <= alpha
    ? nextIndex
    : prevIndex;
}
`,Vo=`// cSpell:words logdepthbuf

#ifdef DEPTH_PACKING
float readDepthValue(const sampler2D depthBuffer, const vec2 uv) {
  #if DEPTH_PACKING == 3201
  return unpackRGBAToDepth(texture(depthBuffer, uv));
  #else // DEPTH_PACKING == 3201
  return texture(depthBuffer, uv).r;
  #endif // DEPTH_PACKING == 3201
}
#endif // DEPTH_PACKING

float reverseLogDepth(const float depth, const float near, const float far) {
  #if defined(USE_LOGDEPTHBUF) || defined(USE_LOGARITHMIC_DEPTH_BUFFER)
  float d = pow(2.0, depth * log2(far + 1.0)) - 1.0;
  float a = far / (far - near);
  float b = far * near / (near - far);
  return a + b / d;
  #else // defined(USE_LOGARITHMIC_DEPTH_BUFFER) || defined(USE_LOGARITHMIC_DEPTH_BUFFER)
  return depth;
  #endif // defined(USE_LOGARITHMIC_DEPTH_BUFFER) || defined(USE_LOGARITHMIC_DEPTH_BUFFER)
}

float linearizeDepth(const float depth, const float near, const float far) {
  float ndc = depth * 2.0 - 1.0;
  return 2.0 * near * far / (far + near - ndc * (far - near));
}
`,Yo=`float checker(const vec2 uv, const vec2 repeats) {
  vec2 c = floor(repeats * uv);
  float result = mod(c.x + c.y, 2.0);
  return sign(result);
}

float checker(const vec2 uv, const float repeats) {
  return checker(uv, vec2(repeats));
}
`,Qo=`// Reference: https://advances.realtimerendering.com/s2014/index.html#_NEXT_GENERATION_POST

float interleavedGradientNoise(const vec2 coord) {
  const vec3 magic = vec3(0.06711056, 0.00583715, 52.9829189);
  return fract(magic.z * fract(dot(coord, magic.xy)));
}
`,Xo=`#if !defined(saturate)
#define saturate(a) clamp(a, 0.0, 1.0)
#endif // !defined(saturate)

float remap(const float x, const float min1, const float max1, const float min2, const float max2) {
  return min2 + (x - min1) / (max1 - min1) * (max2 - min2);
}

vec2 remap(const vec2 x, const vec2 min1, const vec2 max1, const vec2 min2, const vec2 max2) {
  return min2 + (x - min1) / (max1 - min1) * (max2 - min2);
}

vec3 remap(const vec3 x, const vec3 min1, const vec3 max1, const vec3 min2, const vec3 max2) {
  return min2 + (x - min1) / (max1 - min1) * (max2 - min2);
}

vec4 remap(const vec4 x, const vec4 min1, const vec4 max1, const vec4 min2, const vec4 max2) {
  return min2 + (x - min1) / (max1 - min1) * (max2 - min2);
}

float remapClamped(
  const float x,
  const float min1,
  const float max1,
  const float min2,
  const float max2
) {
  return clamp(min2 + (x - min1) / (max1 - min1) * (max2 - min2), min2, max2);
}

vec2 remapClamped(
  const vec2 x,
  const vec2 min1,
  const vec2 max1,
  const vec2 min2,
  const vec2 max2
) {
  return clamp(min2 + (x - min1) / (max1 - min1) * (max2 - min2), min2, max2);
}

vec3 remapClamped(
  const vec3 x,
  const vec3 min1,
  const vec3 max1,
  const vec3 min2,
  const vec3 max2
) {
  return clamp(min2 + (x - min1) / (max1 - min1) * (max2 - min2), min2, max2);
}

vec4 remapClamped(
  const vec4 x,
  const vec4 min1,
  const vec4 max1,
  const vec4 min2,
  const vec4 max2
) {
  return clamp(min2 + (x - min1) / (max1 - min1) * (max2 - min2), min2, max2);
}

// Implicitly remap to 0 and 1
float remap(const float x, const float min1, const float max1) {
  return (x - min1) / (max1 - min1);
}

vec2 remap(const vec2 x, const vec2 min1, const vec2 max1) {
  return (x - min1) / (max1 - min1);
}

vec3 remap(const vec3 x, const vec3 min1, const vec3 max1) {
  return (x - min1) / (max1 - min1);
}

vec4 remap(const vec4 x, const vec4 min1, const vec4 max1) {
  return (x - min1) / (max1 - min1);
}

float remapClamped(const float x, const float min1, const float max1) {
  return saturate((x - min1) / (max1 - min1));
}

vec2 remapClamped(const vec2 x, const vec2 min1, const vec2 max1) {
  return saturate((x - min1) / (max1 - min1));
}

vec3 remapClamped(const vec3 x, const vec3 min1, const vec3 max1) {
  return saturate((x - min1) / (max1 - min1));
}

vec4 remapClamped(const vec4 x, const vec4 min1, const vec4 max1) {
  return saturate((x - min1) / (max1 - min1));
}
`,jo=`// Reference: https://jcgt.org/published/0003/02/01/paper.pdf

vec2 signNotZero(vec2 v) {
  return vec2(v.x >= 0.0 ? 1.0 : -1.0, v.y >= 0.0 ? 1.0 : -1.0);
}

vec2 packNormalToVec2(vec3 v) {
  vec2 p = v.xy * (1.0 / (abs(v.x) + abs(v.y) + abs(v.z)));
  return v.z <= 0.0
    ? (1.0 - abs(p.yx)) * signNotZero(p)
    : p;
}

vec3 unpackVec2ToNormal(vec2 e) {
  vec3 v = vec3(e.xy, 1.0 - abs(e.x) - abs(e.y));
  if (v.z < 0.0) {
    v.xy = (1.0 - abs(v.yx)) * signNotZero(v.xy);
  }
  return normalize(v);
}
`,Ko=`float raySphereFirstIntersection(
  const vec3 origin,
  const vec3 direction,
  const vec3 center,
  const float radius
) {
  vec3 a = origin - center;
  float b = 2.0 * dot(direction, a);
  float c = dot(a, a) - radius * radius;
  float discriminant = b * b - 4.0 * c;
  return discriminant < 0.0
    ? -1.0
    : (-b - sqrt(discriminant)) * 0.5;
}

float raySphereFirstIntersection(const vec3 origin, const vec3 direction, const float radius) {
  return raySphereFirstIntersection(origin, direction, vec3(0.0), radius);
}

vec4 raySphereFirstIntersection(
  const vec3 origin,
  const vec3 direction,
  const vec3 center,
  const vec4 radius
) {
  vec3 a = origin - center;
  float b = 2.0 * dot(direction, a);
  vec4 c = dot(a, a) - radius * radius;
  vec4 discriminant = b * b - 4.0 * c;
  vec4 mask = step(discriminant, vec4(0.0));
  return mix((-b - sqrt(max(vec4(0.0), discriminant))) * 0.5, vec4(-1.0), mask);
}

vec4 raySphereFirstIntersection(const vec3 origin, const vec3 direction, const vec4 radius) {
  return raySphereFirstIntersection(origin, direction, vec3(0.0), radius);
}

float raySphereSecondIntersection(
  const vec3 origin,
  const vec3 direction,
  const vec3 center,
  const float radius
) {
  vec3 a = origin - center;
  float b = 2.0 * dot(direction, a);
  float c = dot(a, a) - radius * radius;
  float discriminant = b * b - 4.0 * c;
  return discriminant < 0.0
    ? -1.0
    : (-b + sqrt(discriminant)) * 0.5;
}

float raySphereSecondIntersection(const vec3 origin, const vec3 direction, const float radius) {
  return raySphereSecondIntersection(origin, direction, vec3(0.0), radius);
}

vec4 raySphereSecondIntersection(
  const vec3 origin,
  const vec3 direction,
  const vec3 center,
  const vec4 radius
) {
  vec3 a = origin - center;
  float b = 2.0 * dot(direction, a);
  vec4 c = dot(a, a) - radius * radius;
  vec4 discriminant = b * b - 4.0 * c;
  vec4 mask = step(discriminant, vec4(0.0));
  return mix((-b + sqrt(max(vec4(0.0), discriminant))) * 0.5, vec4(-1.0), mask);
}

vec4 raySphereSecondIntersection(const vec3 origin, const vec3 direction, const vec4 radius) {
  return raySphereSecondIntersection(origin, direction, vec3(0.0), radius);
}

void raySphereIntersections(
  const vec3 origin,
  const vec3 direction,
  const vec3 center,
  const float radius,
  out float intersection1,
  out float intersection2
) {
  vec3 a = origin - center;
  float b = 2.0 * dot(direction, a);
  float c = dot(a, a) - radius * radius;
  float discriminant = b * b - 4.0 * c;
  if (discriminant < 0.0) {
    intersection1 = -1.0;
    intersection2 = -1.0;
    return;
  } else {
    float Q = sqrt(discriminant);
    intersection1 = (-b - Q) * 0.5;
    intersection2 = (-b + Q) * 0.5;
  }
}

void raySphereIntersections(
  const vec3 origin,
  const vec3 direction,
  const float radius,
  out float intersection1,
  out float intersection2
) {
  raySphereIntersections(origin, direction, vec3(0.0), radius, intersection1, intersection2);
}

void raySphereIntersections(
  const vec3 origin,
  const vec3 direction,
  const vec3 center,
  const vec4 radius,
  out vec4 intersection1,
  out vec4 intersection2
) {
  vec3 a = origin - center;
  float b = 2.0 * dot(direction, a);
  vec4 c = dot(a, a) - radius * radius;
  vec4 discriminant = b * b - 4.0 * c;
  vec4 mask = step(discriminant, vec4(0.0));
  vec4 Q = sqrt(max(vec4(0.0), discriminant));
  intersection1 = mix((-b - Q) * 0.5, vec4(-1.0), mask);
  intersection2 = mix((-b + Q) * 0.5, vec4(-1.0), mask);
}

void raySphereIntersections(
  const vec3 origin,
  const vec3 direction,
  const vec4 radius,
  out vec4 intersection1,
  out vec4 intersection2
) {
  raySphereIntersections(origin, direction, vec3(0.0), radius, intersection1, intersection2);
}
`,Zo=`vec3 screenToView(
  const vec2 uv,
  const float depth,
  const float viewZ,
  const mat4 projectionMatrix,
  const mat4 inverseProjectionMatrix
) {
  vec4 clip = vec4(vec3(uv, depth) * 2.0 - 1.0, 1.0);
  float clipW = projectionMatrix[2][3] * viewZ + projectionMatrix[3][3];
  clip *= clipW;
  return (inverseProjectionMatrix * clip).xyz;
}
`,qo=`// A fifth-order polynomial approximation of Turbo color map.
// See: https://observablehq.com/@mbostock/turbo
// prettier-ignore
vec3 turbo(const float x) {
  float r = 0.1357 + x * (4.5974 - x * (42.3277 - x * (130.5887 - x * (150.5666 - x * 58.1375))));
  float g = 0.0914 + x * (2.1856 + x * (4.8052 - x * (14.0195 - x * (4.2109 + x * 2.7747))));
  float b = 0.1067 + x * (12.5925 - x * (60.1097 - x * (109.0745 - x * (88.5066 - x * 26.8183))));
  return vec3(r, g, b);
}
`,Jo=`// Reference: https://www.gamedev.net/tutorials/programming/graphics/contact-hardening-soft-shadows-made-fast-r4906/

vec2 vogelDisk(const int index, const int sampleCount, const float phi) {
  const float goldenAngle = 2.39996322972865332;
  float r = sqrt(float(index) + 0.5) / sqrt(float(sampleCount));
  float theta = float(index) * goldenAngle + phi;
  return r * vec2(cos(theta), sin(theta));
}
`,Wt=Wo,Vt=Vo,fa=Yo,Yt=Qo,Fe=Xo,ma=jo,He=Ko,pa=Zo,Gr=qo,Qt=Jo;import{Matrix3 as Bg,Vector3 as $o}from"three";var ga="eac103980f20c0956f2d3215833e73514be08462",ec=`https://media.githubusercontent.com/media/takram-design-engineering/three-geospatial/${ga}/packages/atmosphere/assets`,tc=`https://media.githubusercontent.com/media/takram-design-engineering/three-geospatial/${ga}/packages/atmosphere/assets/stars.bin`,lt=64,ut=16,ht=32,dt=128,ft=32,mt=8,zr=mt*ft,kr=dt,Wr=ht,pt=256,gt=64,Ge=1/1e3;var rc=new $o;function ze(t,e,r,i){let a=r.projectOnSurface(t,rc);return a!=null?r.getOsculatingSphereCenter(a,e,i).negate():i.setScalar(0)}var ic=typeof window<"u"&&window.requestIdleCallback!=null?window.requestIdleCallback:function(t,e={}){let r=e.timeout??1,i=performance.now();return setTimeout(()=>{t({get didTimeout(){return e.timeout!=null?!1:performance.now()-i-1>r},timeRemaining(){return Math.max(0,1+(performance.now()-i))}})},1)};var ke=`// Based on: https://github.com/ebruneton/precomputed_atmospheric_scattering/blob/master/atmosphere/functions.glsl

/**
 * Copyright (c) 2017 Eric Bruneton
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 * 3. Neither the name of the copyright holders nor the names of its
 *    contributors may be used to endorse or promote products derived from
 *    this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
 * THE POSSIBILITY OF SUCH DAMAGE.
 *
 * Precomputed Atmospheric Scattering
 * Copyright (c) 2008 INRIA
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 * 3. Neither the name of the copyright holders nor the names of its
 *    contributors may be used to endorse or promote products derived from
 *    this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
 * THE POSSIBILITY OF SUCH DAMAGE.
 */

Number ClampCosine(const Number mu) {
  return clamp(mu, Number(-1.0), Number(1.0));
}

Length ClampDistance(const Length d) {
  return max(d, 0.0 * m);
}

Length ClampRadius(const AtmosphereParameters atmosphere, const Length r) {
  return clamp(r, atmosphere.bottom_radius, atmosphere.top_radius);
}

Length SafeSqrt(const Area a) {
  return sqrt(max(a, 0.0 * m2));
}

Length DistanceToTopAtmosphereBoundary(const AtmosphereParameters atmosphere,
    const Length r, const Number mu) {
  assert(r <= atmosphere.top_radius);
  assert(mu >= -1.0 && mu <= 1.0);
  Area discriminant = r * r * (mu * mu - 1.0) +
      atmosphere.top_radius * atmosphere.top_radius;
  return ClampDistance(-r * mu + SafeSqrt(discriminant));
}

Length DistanceToBottomAtmosphereBoundary(const AtmosphereParameters atmosphere,
    const Length r, const Number mu) {
  assert(r >= atmosphere.bottom_radius);
  assert(mu >= -1.0 && mu <= 1.0);
  Area discriminant = r * r * (mu * mu - 1.0) +
      atmosphere.bottom_radius * atmosphere.bottom_radius;
  return ClampDistance(-r * mu - SafeSqrt(discriminant));
}

bool RayIntersectsGround(const AtmosphereParameters atmosphere,
    const Length r, const Number mu) {
  assert(r >= atmosphere.bottom_radius);
  assert(mu >= -1.0 && mu <= 1.0);
  return mu < 0.0 && r * r * (mu * mu - 1.0) +
      atmosphere.bottom_radius * atmosphere.bottom_radius >= 0.0 * m2;
}

Number GetTextureCoordFromUnitRange(const Number x, const int texture_size) {
  return 0.5 / Number(texture_size) + x * (1.0 - 1.0 / Number(texture_size));
}

vec2 GetTransmittanceTextureUvFromRMu(const AtmosphereParameters atmosphere,
    const Length r, const Number mu) {
  assert(r >= atmosphere.bottom_radius && r <= atmosphere.top_radius);
  assert(mu >= -1.0 && mu <= 1.0);
  // Distance to top atmosphere boundary for a horizontal ray at ground level.
  Length H = sqrt(atmosphere.top_radius * atmosphere.top_radius -
      atmosphere.bottom_radius * atmosphere.bottom_radius);
  // Distance to the horizon.
  Length rho =
      SafeSqrt(r * r - atmosphere.bottom_radius * atmosphere.bottom_radius);
  // Distance to the top atmosphere boundary for the ray (r,mu), and its minimum
  // and maximum values over all mu - obtained for (r,1) and (r,mu_horizon).
  Length d = DistanceToTopAtmosphereBoundary(atmosphere, r, mu);
  Length d_min = atmosphere.top_radius - r;
  Length d_max = rho + H;
  Number x_mu = (d - d_min) / (d_max - d_min);
  Number x_r = rho / H;
  return vec2(GetTextureCoordFromUnitRange(x_mu, TRANSMITTANCE_TEXTURE_WIDTH),
              GetTextureCoordFromUnitRange(x_r, TRANSMITTANCE_TEXTURE_HEIGHT));
}

DimensionlessSpectrum GetTransmittanceToTopAtmosphereBoundary(
    const AtmosphereParameters atmosphere,
    const TransmittanceTexture transmittance_texture,
    const Length r, const Number mu) {
  assert(r >= atmosphere.bottom_radius && r <= atmosphere.top_radius);
  vec2 uv = GetTransmittanceTextureUvFromRMu(atmosphere, r, mu);
  // @shotamatsuda: Added for the precomputation stage in half-float precision.
  #ifdef TRANSMITTANCE_PRECISION_LOG
  // Manually interpolate the transmittance instead of the optical depth.
  const vec2 size = vec2(TRANSMITTANCE_TEXTURE_WIDTH, TRANSMITTANCE_TEXTURE_HEIGHT);
  const vec3 texel_size = vec3(1.0 / size, 0.0);
  vec2 coord = (uv * size) - 0.5;
  vec2 i = (floor(coord) + 0.5) * texel_size.xy;
  vec2 f = fract(coord);
  vec4 t1 = exp(-texture(transmittance_texture, i));
  vec4 t2 = exp(-texture(transmittance_texture, i + texel_size.xz));
  vec4 t3 = exp(-texture(transmittance_texture, i + texel_size.zy));
  vec4 t4 = exp(-texture(transmittance_texture, i + texel_size.xy));
  return DimensionlessSpectrum(mix(mix(t1, t2, f.x), mix(t3, t4, f.x), f.y));
  #else // TRANSMITTANCE_PRECISION_LOG
  return DimensionlessSpectrum(texture(transmittance_texture, uv));
  #endif // TRANSMITTANCE_PRECISION_LOG
}

DimensionlessSpectrum GetTransmittance(
    const AtmosphereParameters atmosphere,
    const TransmittanceTexture transmittance_texture,
    const Length r, const Number mu, const Length d,
    const bool ray_r_mu_intersects_ground) {
  assert(r >= atmosphere.bottom_radius && r <= atmosphere.top_radius);
  assert(mu >= -1.0 && mu <= 1.0);
  assert(d >= 0.0 * m);

  Length r_d = ClampRadius(atmosphere, sqrt(d * d + 2.0 * r * mu * d + r * r));
  Number mu_d = ClampCosine((r * mu + d) / r_d);

  if (ray_r_mu_intersects_ground) {
    return min(
        GetTransmittanceToTopAtmosphereBoundary(
            atmosphere, transmittance_texture, r_d, -mu_d) /
        GetTransmittanceToTopAtmosphereBoundary(
            atmosphere, transmittance_texture, r, -mu),
        DimensionlessSpectrum(1.0));
  } else {
    return min(
        GetTransmittanceToTopAtmosphereBoundary(
            atmosphere, transmittance_texture, r, mu) /
        GetTransmittanceToTopAtmosphereBoundary(
            atmosphere, transmittance_texture, r_d, mu_d),
        DimensionlessSpectrum(1.0));
  }
}

DimensionlessSpectrum GetTransmittanceToSun(
    const AtmosphereParameters atmosphere,
    const TransmittanceTexture transmittance_texture,
    const Length r, const Number mu_s) {
  Number sin_theta_h = atmosphere.bottom_radius / r;
  Number cos_theta_h = -sqrt(max(1.0 - sin_theta_h * sin_theta_h, 0.0));
  return GetTransmittanceToTopAtmosphereBoundary(
          atmosphere, transmittance_texture, r, mu_s) *
      smoothstep(-sin_theta_h * atmosphere.sun_angular_radius / rad,
                 sin_theta_h * atmosphere.sun_angular_radius / rad,
                 mu_s - cos_theta_h);
}

InverseSolidAngle RayleighPhaseFunction(const Number nu) {
  InverseSolidAngle k = 3.0 / (16.0 * PI * sr);
  return k * (1.0 + nu * nu);
}

InverseSolidAngle MiePhaseFunction(const Number g, const Number nu) {
  InverseSolidAngle k = 3.0 / (8.0 * PI * sr) * (1.0 - g * g) / (2.0 + g * g);
  return k * (1.0 + nu * nu) / pow(1.0 + g * g - 2.0 * g * nu, 1.5);
}

vec4 GetScatteringTextureUvwzFromRMuMuSNu(const AtmosphereParameters atmosphere,
    const Length r, const Number mu, const Number mu_s, const Number nu,
    const bool ray_r_mu_intersects_ground) {
  assert(r >= atmosphere.bottom_radius && r <= atmosphere.top_radius);
  assert(mu >= -1.0 && mu <= 1.0);
  assert(mu_s >= -1.0 && mu_s <= 1.0);
  assert(nu >= -1.0 && nu <= 1.0);

  // Distance to top atmosphere boundary for a horizontal ray at ground level.
  Length H = sqrt(atmosphere.top_radius * atmosphere.top_radius -
      atmosphere.bottom_radius * atmosphere.bottom_radius);
  // Distance to the horizon.
  Length rho =
      SafeSqrt(r * r - atmosphere.bottom_radius * atmosphere.bottom_radius);
  Number u_r = GetTextureCoordFromUnitRange(rho / H, SCATTERING_TEXTURE_R_SIZE);

  // Discriminant of the quadratic equation for the intersections of the ray
  // (r,mu) with the ground (see RayIntersectsGround).
  Length r_mu = r * mu;
  Area discriminant =
      r_mu * r_mu - r * r + atmosphere.bottom_radius * atmosphere.bottom_radius;
  Number u_mu;
  if (ray_r_mu_intersects_ground) {
    // Distance to the ground for the ray (r,mu), and its minimum and maximum
    // values over all mu - obtained for (r,-1) and (r,mu_horizon).
    Length d = -r_mu - SafeSqrt(discriminant);
    Length d_min = r - atmosphere.bottom_radius;
    Length d_max = rho;
    u_mu = 0.5 - 0.5 * GetTextureCoordFromUnitRange(d_max == d_min ? 0.0 :
        (d - d_min) / (d_max - d_min), SCATTERING_TEXTURE_MU_SIZE / 2);
  } else {
    // Distance to the top atmosphere boundary for the ray (r,mu), and its
    // minimum and maximum values over all mu - obtained for (r,1) and
    // (r,mu_horizon).
    Length d = -r_mu + SafeSqrt(discriminant + H * H);
    Length d_min = atmosphere.top_radius - r;
    Length d_max = rho + H;
    u_mu = 0.5 + 0.5 * GetTextureCoordFromUnitRange(
        (d - d_min) / (d_max - d_min), SCATTERING_TEXTURE_MU_SIZE / 2);
  }

  Length d = DistanceToTopAtmosphereBoundary(
      atmosphere, atmosphere.bottom_radius, mu_s);
  Length d_min = atmosphere.top_radius - atmosphere.bottom_radius;
  Length d_max = H;
  Number a = (d - d_min) / (d_max - d_min);
  Length D = DistanceToTopAtmosphereBoundary(
      atmosphere, atmosphere.bottom_radius, atmosphere.mu_s_min);
  Number A = (D - d_min) / (d_max - d_min);
  // An ad-hoc function equal to 0 for mu_s = mu_s_min (because then d = D and
  // thus a = A), equal to 1 for mu_s = 1 (because then d = d_min and thus
  // a = 0), and with a large slope around mu_s = 0, to get more texture
  // samples near the horizon.
  Number u_mu_s = GetTextureCoordFromUnitRange(
      max(1.0 - a / A, 0.0) / (1.0 + a), SCATTERING_TEXTURE_MU_S_SIZE);

  Number u_nu = (nu + 1.0) / 2.0;
  return vec4(u_nu, u_mu_s, u_mu, u_r);
}

vec2 GetIrradianceTextureUvFromRMuS(const AtmosphereParameters atmosphere,
    const Length r, const Number mu_s) {
  assert(r >= atmosphere.bottom_radius && r <= atmosphere.top_radius);
  assert(mu_s >= -1.0 && mu_s <= 1.0);
  Number x_r = (r - atmosphere.bottom_radius) /
      (atmosphere.top_radius - atmosphere.bottom_radius);
  Number x_mu_s = mu_s * 0.5 + 0.5;
  return vec2(GetTextureCoordFromUnitRange(x_mu_s, IRRADIANCE_TEXTURE_WIDTH),
              GetTextureCoordFromUnitRange(x_r, IRRADIANCE_TEXTURE_HEIGHT));
}

IrradianceSpectrum GetIrradiance(
    const AtmosphereParameters atmosphere,
    const IrradianceTexture irradiance_texture,
    const Length r, const Number mu_s) {
  vec2 uv = GetIrradianceTextureUvFromRMuS(atmosphere, r, mu_s);
  return IrradianceSpectrum(texture(irradiance_texture, uv));
}
`,We=`// Based on: https://github.com/ebruneton/precomputed_atmospheric_scattering/blob/master/atmosphere/definitions.glsl

/**
 * Copyright (c) 2017 Eric Bruneton
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 * 3. Neither the name of the copyright holders nor the names of its
 *    contributors may be used to endorse or promote products derived from
 *    this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
 * THE POSSIBILITY OF SUCH DAMAGE.
 */

#define assert(x)

#define Length float
#define Wavelength float
#define Angle float
#define SolidAngle float
#define Power float
#define LuminousPower float

#define Number float
#define InverseLength float
#define Area float
#define Volume float
#define NumberDensity float
#define Irradiance float
#define Radiance float
#define SpectralPower float
#define SpectralIrradiance float
#define SpectralRadiance float
#define SpectralRadianceDensity float
#define ScatteringCoefficient float
#define InverseSolidAngle float
#define LuminousIntensity float
#define Luminance float
#define Illuminance float

// A generic function from Wavelength to some other type.
#define AbstractSpectrum vec3
// A function from Wavelength to Number.
#define DimensionlessSpectrum vec3
// A function from Wavelength to SpectralPower.
#define PowerSpectrum vec3
// A function from Wavelength to SpectralIrradiance.
#define IrradianceSpectrum vec3
// A function from Wavelength to SpectralRadiance.
#define RadianceSpectrum vec3
// A function from Wavelength to SpectralRadianceDensity.
#define RadianceDensitySpectrum vec3
// A function from Wavelength to ScatteringCoefficient.
#define ScatteringSpectrum vec3

// A position in 3D (3 length values).
#define Position vec3
// A unit direction vector in 3D (3 unit-less values).
#define Direction vec3
// A vector of 3 luminance values.
#define Luminance3 vec3
// A vector of 3 illuminance values.
#define Illuminance3 vec3

#define TransmittanceTexture sampler2D
#define AbstractScatteringTexture sampler3D
#define ReducedScatteringTexture sampler3D
#define ScatteringTexture sampler3D
#define ScatteringDensityTexture sampler3D
#define IrradianceTexture sampler2D

const Length m = 1.0;
const Wavelength nm = 1.0;
const Angle rad = 1.0;
const SolidAngle sr = 1.0;
const Power watt = 1.0;
const LuminousPower lm = 1.0;

#if !defined(PI)
const float PI = 3.14159265358979323846;
#endif // !defined(PI)

const Length km = 1000.0 * m;
const Area m2 = m * m;
const Volume m3 = m * m * m;
const Angle pi = PI * rad;
const Angle deg = pi / 180.0;
const Irradiance watt_per_square_meter = watt / m2;
const Radiance watt_per_square_meter_per_sr = watt / (m2 * sr);
const SpectralIrradiance watt_per_square_meter_per_nm = watt / (m2 * nm);
const SpectralRadiance watt_per_square_meter_per_sr_per_nm = watt / (m2 * sr * nm);
const SpectralRadianceDensity watt_per_cubic_meter_per_sr_per_nm = watt / (m3 * sr * nm);
const LuminousIntensity cd = lm / sr;
const LuminousIntensity kcd = 1000.0 * cd;
const Luminance cd_per_square_meter = cd / m2;
const Luminance kcd_per_square_meter = kcd / m2;

struct DensityProfileLayer {
  Length width;
  Number exp_term;
  InverseLength exp_scale;
  InverseLength linear_term;
  Number constant_term;
};

struct DensityProfile {
  DensityProfileLayer layers[2];
};

// See AtmosphereParameter.ts for further details.
struct AtmosphereParameters {
  IrradianceSpectrum solar_irradiance;
  Angle sun_angular_radius;
  Length bottom_radius;
  Length top_radius;
  DensityProfile rayleigh_density;
  ScatteringSpectrum rayleigh_scattering;
  DensityProfile mie_density;
  ScatteringSpectrum mie_scattering;
  ScatteringSpectrum mie_extinction;
  Number mie_phase_function_g;
  DensityProfile absorption_density;
  ScatteringSpectrum absorption_extinction;
  DimensionlessSpectrum ground_albedo;
  Number mu_s_min;
};
`,Ve=`// Based on: https://github.com/ebruneton/precomputed_atmospheric_scattering/blob/master/atmosphere/functions.glsl

/**
 * Copyright (c) 2017 Eric Bruneton
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 * 3. Neither the name of the copyright holders nor the names of its
 *    contributors may be used to endorse or promote products derived from
 *    this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
 * THE POSSIBILITY OF SUCH DAMAGE.
 *
 * Precomputed Atmospheric Scattering
 * Copyright (c) 2008 INRIA
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 * 3. Neither the name of the copyright holders nor the names of its
 *    contributors may be used to endorse or promote products derived from
 *    this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
 * THE POSSIBILITY OF SUCH DAMAGE.
 */

#ifdef COMBINED_SCATTERING_TEXTURES
vec3 GetExtrapolatedSingleMieScattering(
    const AtmosphereParameters atmosphere, const vec4 scattering) {
  // Algebraically this can never be negative, but rounding errors can produce
  // that effect for sufficiently short view rays.
  // @shotamatsuda: Avoid division by infinitesimal values.
  // See https://github.com/takram-design-engineering/three-geospatial/issues/47
  if (scattering.r < 1e-5) {
    return vec3(0.0);
  }
  return scattering.rgb * scattering.a / scattering.r *
	    (atmosphere.rayleigh_scattering.r / atmosphere.mie_scattering.r) *
	    (atmosphere.mie_scattering / atmosphere.rayleigh_scattering);
}
#endif // COMBINED_SCATTERING_TEXTURES

IrradianceSpectrum GetCombinedScattering(
    const AtmosphereParameters atmosphere,
    const ReducedScatteringTexture scattering_texture,
    const ReducedScatteringTexture single_mie_scattering_texture,
    const Length r, const Number mu, const Number mu_s, const Number nu,
    const bool ray_r_mu_intersects_ground,
    out IrradianceSpectrum single_mie_scattering) {
  vec4 uvwz = GetScatteringTextureUvwzFromRMuMuSNu(
      atmosphere, r, mu, mu_s, nu, ray_r_mu_intersects_ground);
  Number tex_coord_x = uvwz.x * Number(SCATTERING_TEXTURE_NU_SIZE - 1);
  Number tex_x = floor(tex_coord_x);
  Number lerp = tex_coord_x - tex_x;
  vec3 uvw0 = vec3((tex_x + uvwz.y) / Number(SCATTERING_TEXTURE_NU_SIZE),
      uvwz.z, uvwz.w);
  vec3 uvw1 = vec3((tex_x + 1.0 + uvwz.y) / Number(SCATTERING_TEXTURE_NU_SIZE),
      uvwz.z, uvwz.w);
#ifdef COMBINED_SCATTERING_TEXTURES
  vec4 combined_scattering =
      texture(scattering_texture, uvw0) * (1.0 - lerp) +
      texture(scattering_texture, uvw1) * lerp;
  IrradianceSpectrum scattering = IrradianceSpectrum(combined_scattering);
  single_mie_scattering =
      GetExtrapolatedSingleMieScattering(atmosphere, combined_scattering);
#else // COMBINED_SCATTERING_TEXTURES
  IrradianceSpectrum scattering = IrradianceSpectrum(
      texture(scattering_texture, uvw0) * (1.0 - lerp) +
      texture(scattering_texture, uvw1) * lerp);
  single_mie_scattering = IrradianceSpectrum(
      texture(single_mie_scattering_texture, uvw0) * (1.0 - lerp) +
      texture(single_mie_scattering_texture, uvw1) * lerp);
#endif // COMBINED_SCATTERING_TEXTURES
  return scattering;
}

// @shotamatsuda: Added for reading higher-order scattering texture.
#ifdef HAS_HIGHER_ORDER_SCATTERING_TEXTURE
IrradianceSpectrum GetScattering(
    const AtmosphereParameters atmosphere,
    const ReducedScatteringTexture scattering_texture,
    const Length r, const Number mu, const Number mu_s, const Number nu,
    const bool ray_r_mu_intersects_ground) {
  vec4 uvwz = GetScatteringTextureUvwzFromRMuMuSNu(
      atmosphere, r, mu, mu_s, nu, ray_r_mu_intersects_ground);
  Number tex_coord_x = uvwz.x * Number(SCATTERING_TEXTURE_NU_SIZE - 1);
  Number tex_x = floor(tex_coord_x);
  Number lerp = tex_coord_x - tex_x;
  vec3 uvw0 = vec3((tex_x + uvwz.y) / Number(SCATTERING_TEXTURE_NU_SIZE),
      uvwz.z, uvwz.w);
  vec3 uvw1 = vec3((tex_x + 1.0 + uvwz.y) / Number(SCATTERING_TEXTURE_NU_SIZE),
      uvwz.z, uvwz.w);
  IrradianceSpectrum scattering = IrradianceSpectrum(
      texture(scattering_texture, uvw0) * (1.0 - lerp) +
      texture(scattering_texture, uvw1) * lerp);
  return scattering;
}
#endif // HAS_HIGHER_ORDER_SCATTERING_TEXTURE

RadianceSpectrum GetSkyRadiance(
    const AtmosphereParameters atmosphere,
    const TransmittanceTexture transmittance_texture,
    const ReducedScatteringTexture scattering_texture,
    const ReducedScatteringTexture single_mie_scattering_texture,
    Position camera, const Direction view_ray, const Length shadow_length,
    const Direction sun_direction,
    out DimensionlessSpectrum transmittance) {
  // Compute the distance to the top atmosphere boundary along the view ray,
  // assuming the viewer is in space (or NaN if the view ray does not intersect
  // the atmosphere).
  Length r = length(camera);
  Length rmu = dot(camera, view_ray);
  // @shotamatsuda: Use SafeSqrt instead.
  // See: https://github.com/takram-design-engineering/three-geospatial/pull/26
  Length distance_to_top_atmosphere_boundary = -rmu -
      SafeSqrt(rmu * rmu - r * r +
          atmosphere.top_radius * atmosphere.top_radius);
  // If the viewer is in space and the view ray intersects the atmosphere, move
  // the viewer to the top atmosphere boundary (along the view ray):
  if (distance_to_top_atmosphere_boundary > 0.0 * m) {
    camera = camera + view_ray * distance_to_top_atmosphere_boundary;
    r = atmosphere.top_radius;
    rmu += distance_to_top_atmosphere_boundary;
  } else if (r > atmosphere.top_radius) {
    // If the view ray does not intersect the atmosphere, simply return 0.
    transmittance = DimensionlessSpectrum(1.0);
    return RadianceSpectrum(0.0 * watt_per_square_meter_per_sr_per_nm);
  }
  // Compute the r, mu, mu_s and nu parameters needed for the texture lookups.
  Number mu = rmu / r;
  Number mu_s = dot(camera, sun_direction) / r;
  Number nu = dot(view_ray, sun_direction);

  // @shotamatsuda: For rendering points below the bottom atmosphere.
  #ifdef GROUND
  bool ray_r_mu_intersects_ground = RayIntersectsGround(atmosphere, r, mu);
  #else // GROUND
  bool ray_r_mu_intersects_ground = false;
  #endif // GROUND

  transmittance = ray_r_mu_intersects_ground ? DimensionlessSpectrum(0.0) :
      GetTransmittanceToTopAtmosphereBoundary(
          atmosphere, transmittance_texture, r, mu);
  IrradianceSpectrum single_mie_scattering;
  IrradianceSpectrum scattering;
  if (shadow_length == 0.0 * m) {
    scattering = GetCombinedScattering(
        atmosphere, scattering_texture, single_mie_scattering_texture,
        r, mu, mu_s, nu, ray_r_mu_intersects_ground,
        single_mie_scattering);
  } else {
    // Case of light shafts (shadow_length is the total length noted l in our
    // paper): we omit the scattering between the camera and the point at
    // distance l, by implementing Eq. (18) of the paper (shadow_transmittance
    // is the T(x,x_s) term, scattering is the S|x_s=x+lv term).
    Length d = shadow_length;
    Length r_p =
        ClampRadius(atmosphere, sqrt(d * d + 2.0 * r * mu * d + r * r));
    Number mu_p = (r * mu + d) / r_p;
    Number mu_s_p = (r * mu_s + d * nu) / r_p;

    scattering = GetCombinedScattering(
        atmosphere, scattering_texture, single_mie_scattering_texture,
        r_p, mu_p, mu_s_p, nu, ray_r_mu_intersects_ground,
        single_mie_scattering);
    DimensionlessSpectrum shadow_transmittance =
        GetTransmittance(atmosphere, transmittance_texture,
            r, mu, shadow_length, ray_r_mu_intersects_ground);
    // @shotamatsuda: Occlude only single Rayleigh scattering by the shadow.
#ifdef HAS_HIGHER_ORDER_SCATTERING_TEXTURE
    IrradianceSpectrum higher_order_scattering = GetScattering(
        atmosphere, higher_order_scattering_texture,
        r_p, mu_p, mu_s_p, nu, ray_r_mu_intersects_ground);
    IrradianceSpectrum single_scattering = scattering - higher_order_scattering;
    scattering = single_scattering * shadow_transmittance + higher_order_scattering;
#else // HAS_HIGHER_ORDER_SCATTERING_TEXTURE
    scattering = scattering * shadow_transmittance;
#endif // HAS_HIGHER_ORDER_SCATTERING_TEXTURE
    single_mie_scattering = single_mie_scattering * shadow_transmittance;
  }
  return scattering * RayleighPhaseFunction(nu) + single_mie_scattering *
      MiePhaseFunction(atmosphere.mie_phase_function_g, nu);
}

// @shotamatsuda: Returns the point on the ray closest to the origin.
vec3 ClosestPointOnRay(const Position camera, const Position point) {
  Position ray = point - camera;
  Number t = clamp(-dot(camera, ray) / dot(ray, ray), 0.0, 1.0);
  return camera + t * ray;
}

vec2 RaySphereIntersections(
    const Position camera, const Direction direction, const Length radius) {
  float b = 2.0 * dot(direction, camera);
  float c = dot(camera, camera) - radius * radius;
  float discriminant = b * b - 4.0 * c;
  float Q = sqrt(discriminant);
  return vec2(-b - Q, -b + Q) * 0.5;
}

// @shotamatsuda: Clip the view ray at the bottom atmosphere boundary.
bool ClipAtBottomAtmosphere(
    const AtmosphereParameters atmosphere,
    const Direction view_ray, inout Position camera, inout Position point) {
  const Length eps = 0.0;
  Length bottom_radius = atmosphere.bottom_radius + eps;
  Length r_camera = length(camera);
  Length r_point = length(point);
  bool camera_below = r_camera < bottom_radius;
  bool point_below = r_point < bottom_radius;

  vec2 t = RaySphereIntersections(camera, view_ray, bottom_radius);
  Position intersection = camera + view_ray * (camera_below ? t.y : t.x);
  camera = camera_below ? intersection : camera;
  point = point_below ? intersection : point;

  return camera_below && point_below;
}

RadianceSpectrum GetSkyRadianceToPoint(
    const AtmosphereParameters atmosphere,
    const TransmittanceTexture transmittance_texture,
    const ReducedScatteringTexture scattering_texture,
    const ReducedScatteringTexture single_mie_scattering_texture,
    Position camera, Position point, const Length shadow_length,
    const Direction sun_direction, out DimensionlessSpectrum transmittance) {
  // @shotamatsuda: Avoid artifacts when the ray does not intersect the top
  // atmosphere boundary.
  if (length(ClosestPointOnRay(camera, point)) > atmosphere.top_radius) {
    transmittance = vec3(1.0);
    return vec3(0.0);
  }

  Direction view_ray = normalize(point - camera);
  if (ClipAtBottomAtmosphere(atmosphere, view_ray, camera, point)) {
    transmittance = vec3(1.0);
    return vec3(0.0);
  }

  // Compute the distance to the top atmosphere boundary along the view ray,
  // assuming the viewer is in space (or NaN if the view ray does not intersect
  // the atmosphere).
  Length r = length(camera);
  Length rmu = dot(camera, view_ray);
  // @shotamatsuda: Use SafeSqrt instead.
  // See: https://github.com/takram-design-engineering/three-geospatial/pull/26
  Length distance_to_top_atmosphere_boundary = -rmu -
      SafeSqrt(rmu * rmu - r * r +
          atmosphere.top_radius * atmosphere.top_radius);
  // If the viewer is in space and the view ray intersects the atmosphere, move
  // the viewer to the top atmosphere boundary (along the view ray):
  if (distance_to_top_atmosphere_boundary > 0.0 * m) {
    camera = camera + view_ray * distance_to_top_atmosphere_boundary;
    r = atmosphere.top_radius;
    rmu += distance_to_top_atmosphere_boundary;
  }

  // Compute the r, mu, mu_s and nu parameters for the first texture lookup.
  Number mu = rmu / r;
  Number mu_s = dot(camera, sun_direction) / r;
  Number nu = dot(view_ray, sun_direction);
  Length d = length(point - camera);
  bool ray_r_mu_intersects_ground = RayIntersectsGround(atmosphere, r, mu);

  // @shotamatsuda: Hack to avoid rendering artifacts near the horizon, due to
  // finite atmosphere texture resolution and finite floating point precision.
  // See: https://github.com/ebruneton/precomputed_atmospheric_scattering/pull/32
  if (!ray_r_mu_intersects_ground) {
    Number mu_horizon = -SafeSqrt(1.0 -
        (atmosphere.bottom_radius * atmosphere.bottom_radius) / (r * r));
    const Number eps = 0.004;
    mu = max(mu, mu_horizon + eps);
  }

  transmittance = GetTransmittance(atmosphere, transmittance_texture,
      r, mu, d, ray_r_mu_intersects_ground);

  IrradianceSpectrum single_mie_scattering;
  IrradianceSpectrum scattering = GetCombinedScattering(
      atmosphere, scattering_texture, single_mie_scattering_texture,
      r, mu, mu_s, nu, ray_r_mu_intersects_ground,
      single_mie_scattering);

  // Compute the r, mu, mu_s and nu parameters for the second texture lookup.
  // If shadow_length is not 0 (case of light shafts), we want to ignore the
  // scattering along the last shadow_length meters of the view ray, which we
  // do by subtracting shadow_length from d (this way scattering_p is equal to
  // the S|x_s=x_0-lv term in Eq. (17) of our paper).
  d = max(d - shadow_length, 0.0 * m);
  Length r_p = ClampRadius(atmosphere, sqrt(d * d + 2.0 * r * mu * d + r * r));
  Number mu_p = (r * mu + d) / r_p;
  Number mu_s_p = (r * mu_s + d * nu) / r_p;

  IrradianceSpectrum single_mie_scattering_p;
  IrradianceSpectrum scattering_p = GetCombinedScattering(
      atmosphere, scattering_texture, single_mie_scattering_texture,
      r_p, mu_p, mu_s_p, nu, ray_r_mu_intersects_ground,
      single_mie_scattering_p);

  // Combine the lookup results to get the scattering between camera and point.
  DimensionlessSpectrum shadow_transmittance = transmittance;
  if (shadow_length > 0.0 * m) {
    // This is the T(x,x_s) term in Eq. (17) of our paper, for light shafts.
    shadow_transmittance = GetTransmittance(atmosphere, transmittance_texture,
        r, mu, d, ray_r_mu_intersects_ground);
  }
  // @shotamatsuda: Occlude only single Rayleigh scattering by the shadow.
#ifdef HAS_HIGHER_ORDER_SCATTERING_TEXTURE
  IrradianceSpectrum higher_order_scattering = GetScattering(
      atmosphere, higher_order_scattering_texture,
      r, mu, mu_s, nu, ray_r_mu_intersects_ground);
  IrradianceSpectrum single_scattering = scattering - higher_order_scattering;
  IrradianceSpectrum higher_order_scattering_p = GetScattering(
      atmosphere, higher_order_scattering_texture,
      r_p, mu_p, mu_s_p, nu, ray_r_mu_intersects_ground);
  IrradianceSpectrum single_scattering_p =
      scattering_p - higher_order_scattering_p;
  scattering =
      single_scattering - shadow_transmittance * single_scattering_p +
      higher_order_scattering - transmittance * higher_order_scattering_p;
#else // HAS_HIGHER_ORDER_SCATTERING_TEXTURE
  scattering = scattering - shadow_transmittance * scattering_p;
#endif // HAS_HIGHER_ORDER_SCATTERING_TEXTURE

  single_mie_scattering =
      single_mie_scattering - shadow_transmittance * single_mie_scattering_p;
#ifdef COMBINED_SCATTERING_TEXTURES
  single_mie_scattering = GetExtrapolatedSingleMieScattering(
      atmosphere, vec4(scattering, single_mie_scattering.r));
#endif // COMBINED_SCATTERING_TEXTURES

  // Hack to avoid rendering artifacts when the sun is below the horizon.
  single_mie_scattering = single_mie_scattering *
      smoothstep(Number(0.0), Number(0.01), mu_s);

  return scattering * RayleighPhaseFunction(nu) + single_mie_scattering *
      MiePhaseFunction(atmosphere.mie_phase_function_g, nu);
}

IrradianceSpectrum GetSunAndSkyIrradiance(
    const AtmosphereParameters atmosphere,
    const TransmittanceTexture transmittance_texture,
    const IrradianceTexture irradiance_texture,
    const Position point, const Direction normal, const Direction sun_direction,
    out IrradianceSpectrum sky_irradiance) {
  Length r = length(point);
  Number mu_s = dot(point, sun_direction) / r;

  // Indirect irradiance (approximated if the surface is not horizontal).
  sky_irradiance = GetIrradiance(atmosphere, irradiance_texture, r, mu_s) *
      (1.0 + dot(normal, point) / r) * 0.5;

  // Direct irradiance.
  return atmosphere.solar_irradiance *
      GetTransmittanceToSun(
          atmosphere, transmittance_texture, r, mu_s) *
      max(dot(normal, sun_direction), 0.0);
}

// @shotamatsuda: Added for the clouds.
IrradianceSpectrum GetSunAndSkyScalarIrradiance(
    const AtmosphereParameters atmosphere,
    const TransmittanceTexture transmittance_texture,
    const IrradianceTexture irradiance_texture,
    const Position point, const Direction sun_direction,
    out IrradianceSpectrum sky_irradiance) {
  Length r = length(point);
  Number mu_s = dot(point, sun_direction) / r;

  // Indirect irradiance. Integral over sphere yields 2\u03C0.
  sky_irradiance = GetIrradiance(atmosphere, irradiance_texture, r, mu_s) *
      2.0 * PI;

  // Direct irradiance. Omit the cosine term.
  return atmosphere.solar_irradiance *
      GetTransmittanceToSun(atmosphere, transmittance_texture, r, mu_s);
}

Luminance3 GetSolarLuminance() {
  return ATMOSPHERE.solar_irradiance /
      (PI * ATMOSPHERE.sun_angular_radius * ATMOSPHERE.sun_angular_radius) *
      SUN_SPECTRAL_RADIANCE_TO_LUMINANCE;
}

Luminance3 GetSkyLuminance(
    const Position camera, Direction view_ray, const Length shadow_length,
    const Direction sun_direction, out DimensionlessSpectrum transmittance) {
  return GetSkyRadiance(ATMOSPHERE, transmittance_texture,
      scattering_texture, single_mie_scattering_texture,
      camera, view_ray, shadow_length, sun_direction,
      transmittance) * SKY_SPECTRAL_RADIANCE_TO_LUMINANCE;
}

Luminance3 GetSkyLuminanceToPoint(
    const Position camera, const Position point, const Length shadow_length,
    const Direction sun_direction, out DimensionlessSpectrum transmittance) {
  return GetSkyRadianceToPoint(ATMOSPHERE, transmittance_texture,
      scattering_texture, single_mie_scattering_texture,
      camera, point, shadow_length, sun_direction, transmittance) *
      SKY_SPECTRAL_RADIANCE_TO_LUMINANCE;
}

Illuminance3 GetSunAndSkyIlluminance(
    const Position p, const Direction normal, const Direction sun_direction,
    out IrradianceSpectrum sky_irradiance) {
  IrradianceSpectrum sun_irradiance = GetSunAndSkyIrradiance(
      ATMOSPHERE, transmittance_texture, irradiance_texture, p, normal,
      sun_direction, sky_irradiance);
  sky_irradiance *= SKY_SPECTRAL_RADIANCE_TO_LUMINANCE;
  return sun_irradiance * SUN_SPECTRAL_RADIANCE_TO_LUMINANCE;
}

// @shotamatsuda: Added for the clouds.
Illuminance3 GetSunAndSkyScalarIlluminance(
    const Position p, const Direction sun_direction,
    out IrradianceSpectrum sky_irradiance) {
  IrradianceSpectrum sun_irradiance = GetSunAndSkyScalarIrradiance(
      ATMOSPHERE, transmittance_texture, irradiance_texture, p,
      sun_direction, sky_irradiance);
  sky_irradiance *= SKY_SPECTRAL_RADIANCE_TO_LUMINANCE;
  return sun_irradiance * SUN_SPECTRAL_RADIANCE_TO_LUMINANCE;
}

#define GetSolarRadiance GetSolarLuminance
#define GetSkyRadiance GetSkyLuminance
#define GetSkyRadianceToPoint GetSkyLuminanceToPoint
#define GetSunAndSkyIrradiance GetSunAndSkyIlluminance
#define GetSunAndSkyScalarIrradiance GetSunAndSkyScalarIlluminance
`;var lc=new _(.2126,.7152,.0722),uc=["solarIrradiance","sunAngularRadius","bottomRadius","topRadius","rayleighDensity","rayleighScattering","mieDensity","mieScattering","mieExtinction","miePhaseFunctionG","absorptionDensity","absorptionExtinction","groundAlbedo","muSMin","skyRadianceToLuminance","sunRadianceToLuminance"];function hc(t,e){if(e!=null)for(let r of uc){let i=e[r];i!=null&&(t[r]instanceof _?t[r].copy(i):t[r]=i)}}var de=class{constructor(e,r,i,a,n){this.width=e,this.expTerm=r,this.expScale=i,this.linearTerm=a,this.constantTerm=n}toUniform(){return new d({width:this.width,exp_term:this.expTerm,exp_scale:this.expScale,linear_term:this.linearTerm,constant_term:this.constantTerm})}},Yr=class{constructor(e){this.solarIrradiance=new _(1.474,1.8504,1.91198),this.sunAngularRadius=.004675,this.bottomRadius=636e4,this.topRadius=642e4,this.rayleighDensity=[new de(0,0,0,0,0),new de(0,1,-.125,0,0)],this.rayleighScattering=new _(.005802,.013558,.0331),this.mieDensity=[new de(0,0,0,0,0),new de(0,1,-.833333,0,0)],this.mieScattering=new _(.003996,.003996,.003996),this.mieExtinction=new _(.00444,.00444,.00444),this.miePhaseFunctionG=.8,this.absorptionDensity=[new de(25,0,0,1/15,-2/3),new de(0,0,0,-1/15,8/3)],this.absorptionExtinction=new _(65e-5,.001881,85e-6),this.groundAlbedo=new Ra().setScalar(.1),this.muSMin=Math.cos(Lr(120)),this.sunRadianceToLuminance=new _(98242.786222,69954.398112,66475.012354),this.skyRadianceToLuminance=new _(114974.916437,71305.954816,65310.548555),this.sunRadianceToRelativeLuminance=new _,this.skyRadianceToRelativeLuminance=new _,hc(this,e);let r=lc.dot(this.sunRadianceToLuminance);this.sunRadianceToRelativeLuminance.copy(this.sunRadianceToLuminance).divideScalar(r),this.skyRadianceToRelativeLuminance.copy(this.skyRadianceToLuminance).divideScalar(r)}toUniform(){return new d({solar_irradiance:this.solarIrradiance,sun_angular_radius:this.sunAngularRadius,bottom_radius:this.bottomRadius*Ge,top_radius:this.topRadius*Ge,rayleigh_density:{layers:this.rayleighDensity.map(e=>e.toUniform().value)},rayleigh_scattering:this.rayleighScattering,mie_density:{layers:this.mieDensity.map(e=>e.toUniform().value)},mie_scattering:this.mieScattering,mie_extinction:this.mieExtinction,mie_phase_function_g:this.miePhaseFunctionG,absorption_density:{layers:this.absorptionDensity.map(e=>e.toUniform().value)},absorption_extinction:this.absorptionExtinction,ground_albedo:this.groundAlbedo,mu_s_min:this.muSMin})}};Yr.DEFAULT=new Yr;var Xe=Yr,dc=`precision highp sampler2DArray;

#include "core/depth"
#include "core/math"
#include "core/packing"
#include "core/transform"
#ifdef HAS_SHADOW
#include "core/raySphereIntersection"
#include "core/cascadedShadowMaps"
#include "core/interleavedGradientNoise"
#include "core/vogelDisk"
#endif // HAS_SHADOW

#include "bruneton/definitions"

uniform AtmosphereParameters ATMOSPHERE;
uniform vec3 SUN_SPECTRAL_RADIANCE_TO_LUMINANCE;
uniform vec3 SKY_SPECTRAL_RADIANCE_TO_LUMINANCE;

uniform sampler2D transmittance_texture;
uniform sampler3D scattering_texture;
uniform sampler2D irradiance_texture;
uniform sampler3D single_mie_scattering_texture;
uniform sampler3D higher_order_scattering_texture;

#include "bruneton/common"
#include "bruneton/runtime"

uniform sampler2D normalBuffer;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 inverseProjectionMatrix;
uniform mat4 inverseViewMatrix;
uniform float bottomRadius;
uniform mat4 worldToECEFMatrix;
uniform float geometricErrorCorrectionAmount;
uniform vec3 sunDirection;
uniform float cosSunAngularRadius;
uniform vec3 moonDirection;
uniform float moonAngularRadius;
uniform float lunarRadianceScale;
uniform float albedoScale;

#include "sky"

#ifdef HAS_LIGHTING_MASK
uniform sampler2D lightingMaskBuffer;
#endif // HAS_LIGHTING_MASK

// prettier-ignore
#define LIGHTING_MASK_CHANNEL_ LIGHTING_MASK_CHANNEL

#ifdef HAS_OVERLAY
uniform sampler2D overlayBuffer;
#endif // HAS_OVERLAY

#ifdef HAS_SHADOW
uniform sampler2DArray shadowBuffer;
uniform vec2 shadowIntervals[SHADOW_CASCADE_COUNT];
uniform mat4 shadowMatrices[SHADOW_CASCADE_COUNT];
uniform mat4 inverseShadowMatrices[SHADOW_CASCADE_COUNT];
uniform float shadowFar;
uniform float shadowTopHeight;
uniform float shadowRadius;
uniform sampler3D stbnTexture;
uniform int frame;
#endif // HAS_SHADOW

#ifdef HAS_SHADOW_LENGTH
uniform sampler2D shadowLengthBuffer;
#endif // HAS_SHADOW_LENGTH

varying vec3 vCameraPosition;
varying vec3 vRayDirection;
varying vec3 vGeometryAltitudeCorrection;
varying vec3 vEllipsoidRadiiSquared;

vec3 readNormal(const vec2 uv, out bool degenerate) {
  vec3 normal = texture(normalBuffer, uv).xyz;
  degenerate = normal == vec3(0.0);
  #ifdef OCT_ENCODED_NORMAL
  return unpackVec2ToNormal(normal.xy);
  #else // OCT_ENCODED_NORMAL
  return 2.0 * normal - 1.0;
  #endif // OCT_ENCODED_NORMAL
}

void correctGeometricError(inout vec3 positionECEF, inout vec3 normalECEF) {
  // TODO: The error is pronounced at the edge of the ellipsoid due to the
  // large difference between the sphere position and the unprojected position
  // at the current fragment. Calculating the sphere position from the fragment
  // UV may resolve this.

  // Correct way is slerp, but this will be small-angle interpolation anyways.
  vec3 sphereNormal = normalize(positionECEF / vEllipsoidRadiiSquared);
  vec3 spherePosition = ATMOSPHERE.bottom_radius * sphereNormal;
  normalECEF = mix(normalECEF, sphereNormal, geometricErrorCorrectionAmount);
  positionECEF = mix(positionECEF, spherePosition, geometricErrorCorrectionAmount);
}

#if defined(SUN_LIGHT) || defined(SKY_LIGHT)

vec3 getSunSkyIrradiance(
  const vec3 positionECEF,
  const vec3 normal,
  const vec3 inputColor,
  const float sunTransmittance
) {
  // Assume lambertian BRDF. If both SUN_LIGHT and SKY_LIGHT are not defined,
  // regard the inputColor as radiance at the texel.
  vec3 diffuse = inputColor * albedoScale * RECIPROCAL_PI;
  vec3 skyIrradiance;
  vec3 sunIrradiance = GetSunAndSkyIrradiance(positionECEF, normal, sunDirection, skyIrradiance);

  #ifdef HAS_SHADOW
  sunIrradiance *= sunTransmittance;
  #endif // HAS_SHADOW

  #if defined(SUN_LIGHT) && defined(SKY_LIGHT)
  return diffuse * (sunIrradiance + skyIrradiance);
  #elif defined(SUN_LIGHT)
  return diffuse * sunIrradiance;
  #elif defined(SKY_LIGHT)
  return diffuse * skyIrradiance;
  #endif // defined(SUN_LIGHT) && defined(SKY_LIGHT)
}

#endif // defined(SUN_LIGHT) || defined(SKY_LIGHT)

#if defined(TRANSMITTANCE) || defined(INSCATTER)

void applyTransmittanceInscatter(const vec3 positionECEF, float shadowLength, inout vec3 radiance) {
  vec3 transmittance;
  vec3 inscatter = GetSkyRadianceToPoint(
    vCameraPosition,
    positionECEF,
    shadowLength,
    sunDirection,
    transmittance
  );
  #ifdef TRANSMITTANCE
  radiance = radiance * transmittance;
  #endif // TRANSMITTANCE
  #ifdef INSCATTER
  radiance = radiance + inscatter;
  #endif // INSCATTER
}

#endif // defined(TRANSMITTANCE) || defined(INSCATTER)

#ifdef HAS_SHADOW

float getSTBN() {
  ivec3 size = textureSize(stbnTexture, 0);
  vec3 scale = 1.0 / vec3(size);
  return texture(stbnTexture, vec3(gl_FragCoord.xy, float(frame % size.z)) * scale).r;
}

vec2 getShadowUv(const vec3 worldPosition, const int cascadeIndex) {
  vec4 clip = shadowMatrices[cascadeIndex] * vec4(worldPosition, 1.0);
  clip /= clip.w;
  return clip.xy * 0.5 + 0.5;
}

float getDistanceToShadowTop(const vec3 positionECEF) {
  // Distance to the top of the shadows along the sun direction, which matches
  // the ray origin of BSM.
  return raySphereSecondIntersection(
    positionECEF / METER_TO_LENGTH_UNIT, // TODO: Make units consistent
    sunDirection,
    vec3(0.0),
    bottomRadius + shadowTopHeight
  );
}

float readShadowOpticalDepth(const vec2 uv, const float distanceToTop, const int cascadeIndex) {
  // r: frontDepth, g: meanExtinction, b: maxOpticalDepth, a: maxOpticalDepthTail
  vec4 shadow = texture(shadowBuffer, vec3(uv, float(cascadeIndex)));
  // Omit adding maxOpticalDepthTail to avoid pronounced aliasing. Ground
  // shadow will be attenuated by inscatter anyways.
  return min(shadow.b, shadow.g * max(0.0, distanceToTop - shadow.r));
}

float sampleShadowOpticalDepthPCF(
  const vec3 worldPosition,
  const float distanceToTop,
  const float radius,
  const int cascadeIndex
) {
  vec2 uv = getShadowUv(worldPosition, cascadeIndex);
  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
    return 0.0;
  }

  vec2 texelSize = vec2(1.0) / vec2(textureSize(shadowBuffer, 0).xy);
  float sum = 0.0;
  vec2 offset;
  #pragma unroll_loop_start
  for (int i = 0; i < 16; ++i) {
    #if UNROLLED_LOOP_INDEX < SHADOW_SAMPLE_COUNT
    offset = vogelDisk(
      UNROLLED_LOOP_INDEX,
      SHADOW_SAMPLE_COUNT,
      interleavedGradientNoise(gl_FragCoord.xy) * PI2
    );
    sum += readShadowOpticalDepth(uv + offset * radius * texelSize, distanceToTop, cascadeIndex);
    #endif // UNROLLED_LOOP_INDEX < SHADOW_SAMPLE_COUNT
  }
  #pragma unroll_loop_end
  return sum / float(SHADOW_SAMPLE_COUNT);
}

float sampleShadowOpticalDepth(
  const vec3 worldPosition,
  const vec3 positionECEF,
  const float radius,
  const float jitter
) {
  float distanceToTop = getDistanceToShadowTop(positionECEF);
  if (distanceToTop <= 0.0) {
    return 0.0;
  }
  int cascadeIndex = getFadedCascadeIndex(
    viewMatrix,
    worldPosition,
    shadowIntervals,
    cameraNear,
    shadowFar,
    jitter
  );
  return cascadeIndex >= 0
    ? sampleShadowOpticalDepthPCF(worldPosition, distanceToTop, radius, cascadeIndex)
    : 0.0;
}

float getShadowRadius(const vec3 worldPosition) {
  vec4 clip = shadowMatrices[0] * vec4(worldPosition, 1.0);
  clip /= clip.w;

  // Offset by 1px in each direction in shadow's clip coordinates.
  vec2 shadowSize = vec2(textureSize(shadowBuffer, 0));
  vec3 offset = vec3(2.0 / shadowSize, 0.0);
  vec4 clipX = clip + offset.xzzz;
  vec4 clipY = clip + offset.zyzz;

  // Convert back to world space.
  vec4 worldX = inverseShadowMatrices[0] * clipX;
  vec4 worldY = inverseShadowMatrices[0] * clipY;

  // Project into the main camera's clip space.
  mat4 viewProjectionMatrix = projectionMatrix * viewMatrix;
  vec4 projected = viewProjectionMatrix * vec4(worldPosition, 1.0);
  vec4 projectedX = viewProjectionMatrix * worldX;
  vec4 projectedY = viewProjectionMatrix * worldY;
  projected /= projected.w;
  projectedX /= projectedX.w;
  projectedY /= projectedY.w;

  // Take the mean of pixel sizes.
  vec2 center = (projected.xy * 0.5 + 0.5) * resolution;
  vec2 offsetX = (projectedX.xy * 0.5 + 0.5) * resolution;
  vec2 offsetY = (projectedY.xy * 0.5 + 0.5) * resolution;
  float size = max(length(offsetX - center), length(offsetY - center));

  return remapClamped(size, 10.0, 50.0, 0.0, shadowRadius);
}

#endif // HAS_SHADOW

void mainImage(const vec4 inputColor, const vec2 uv, out vec4 outputColor) {
  #if defined(HAS_LIGHTING_MASK) && defined(DEBUG_SHOW_LIGHTING_MASK)
  outputColor.rgb = vec3(texture(lightingMaskBuffer, uv).LIGHTING_MASK_CHANNEL_);
  outputColor.a = 1.0;
  return;
  #endif // defined(HAS_LIGHTING_MASK) && defined(DEBUG_SHOW_LIGHTING_MASK)

  float shadowLength = 0.0;
  #ifdef HAS_SHADOW_LENGTH
  shadowLength = texture(shadowLengthBuffer, uv).r;
  #endif // HAS_SHADOW_LENGTH

  #ifdef HAS_OVERLAY
  vec4 overlay = texture(overlayBuffer, uv);
  if (any(isnan(overlay)) || any(isinf(overlay))) overlay = vec4(0.0); /*V41NAN*/
  if (overlay.a == 1.0) {
    outputColor = overlay;
    return;
  }
  #endif // HAS_OVERLAY

  vec3 rayDirection = normalize(vRayDirection);
  vec3 dRDdx = dFdx(rayDirection);
  vec3 dRDdy = dFdy(rayDirection);
  float fragmentAngle = length(dRDdx + dRDdy) / length(rayDirection);

  float depth = readDepthValue(depthBuffer, uv);
  if (depth >= 1.0 - 1e-8) {
    #ifdef SKY
    outputColor.rgb = getSkyRadiance(
      vCameraPosition,
      rayDirection,
      shadowLength,
      sunDirection,
      moonDirection,
      moonAngularRadius,
      lunarRadianceScale,
      fragmentAngle
    );
    outputColor.a = 1.0;
    #else // SKY
    outputColor = inputColor;
    #endif // SKY

    #ifdef HAS_OVERLAY
    outputColor.rgb = outputColor.rgb * (1.0 - overlay.a) + overlay.rgb;
    #endif // HAS_OVERLAY
    return;
  }
  depth = reverseLogDepth(depth, cameraNear, cameraFar);

  // Reconstruct position and normal in world space.
  vec3 viewPosition = screenToView(
    uv,
    depth,
    getViewZ(depth),
    projectionMatrix,
    inverseProjectionMatrix
  );
  vec3 worldPosition = (inverseViewMatrix * vec4(viewPosition, 1.0)).xyz;
  vec3 positionECEF = (worldToECEFMatrix * vec4(worldPosition, 1.0)).xyz;
  positionECEF = positionECEF * METER_TO_LENGTH_UNIT + vGeometryAltitudeCorrection;

  vec3 viewNormal;
  bool degenerateNormal = false;
  #ifdef RECONSTRUCT_NORMAL
  vec3 dVPdx = dFdx(viewPosition);
  vec3 dVPdy = dFdy(viewPosition);
  viewNormal = normalize(cross(dVPdx, dVPdy));
  #elif defined(HAS_NORMALS)
  viewNormal = readNormal(uv, degenerateNormal);
  #endif // defined(HAS_NORMALS)

  #if defined(RECONSTRUCT_NORMAL) || defined(HAS_NORMALS)
  vec3 worldNormal = (inverseViewMatrix * vec4(viewNormal, 0.0)).xyz;
  vec3 normalECEF = (worldToECEFMatrix * vec4(worldNormal, 0.0)).xyz;
  #else // defined(RECONSTRUCT_NORMAL) || defined(HAS_NORMALS)
  vec3 normalECEF = normalize(positionECEF);
  #endif // defined(RECONSTRUCT_NORMAL) || defined(HAS_NORMALS)

  #ifdef CORRECT_GEOMETRIC_ERROR
  correctGeometricError(positionECEF, normalECEF);
  #endif // CORRECT_GEOMETRIC_ERROR

  #ifdef HAS_SHADOW
  float stbn = getSTBN();
  float radius = getShadowRadius(worldPosition);
  float opticalDepth = sampleShadowOpticalDepth(worldPosition, positionECEF, radius, stbn);
  float sunTransmittance = exp(-opticalDepth);
  #else // HAS_SHADOW
  float sunTransmittance = 1.0;
  #endif // HAS_SHADOW

  vec3 radiance;
  #if defined(SUN_LIGHT) || defined(SKY_LIGHT)
  // WORKAROUND: When both post-process lighting and sky options are enabled,
  // stars have degenerate normals. We use this to disable irradiance, which is
  // irrelevant for them.
  if (!degenerateNormal) {
    radiance = getSunSkyIrradiance(positionECEF, normalECEF, inputColor.rgb, sunTransmittance);
  } else {
    radiance = inputColor.rgb;
  }
  #ifdef HAS_LIGHTING_MASK
  float lightingMask = texture(lightingMaskBuffer, uv).LIGHTING_MASK_CHANNEL_;
  radiance = mix(inputColor.rgb, radiance, lightingMask);
  #endif // HAS_LIGHTING_MASK
  #else // defined(SUN_LIGHT) || defined(SKY_LIGHT)
  radiance = inputColor.rgb;
  #endif // defined(SUN_LIGHT) || defined(SKY_LIGHT)

  #if defined(TRANSMITTANCE) || defined(INSCATTER)
  applyTransmittanceInscatter(positionECEF, shadowLength, radiance);
  #endif // defined(TRANSMITTANCE) || defined(INSCATTER)

  outputColor = vec4(radiance, inputColor.a);

  #ifdef HAS_OVERLAY
  outputColor.rgb = outputColor.rgb * (1.0 - overlay.a) + overlay.rgb;
  #endif // HAS_OVERLAY
}
`,fc=`uniform mat4 inverseViewMatrix;
uniform mat4 inverseProjectionMatrix;
uniform vec3 cameraPosition;
uniform mat4 worldToECEFMatrix;
uniform vec3 altitudeCorrection;
uniform float geometricErrorCorrectionAmount;
uniform vec3 ellipsoidRadii;

varying vec3 vCameraPosition;
varying vec3 vRayDirection;
varying vec3 vGeometryAltitudeCorrection;
varying vec3 vEllipsoidRadiiSquared;

void getCameraRay(out vec3 origin, out vec3 direction) {
  bool isPerspective = inverseProjectionMatrix[2][3] != 0.0; // 4th entry in the 3rd column

  if (isPerspective) {
    // Calculate the camera ray for a perspective camera.
    vec4 viewPosition = inverseProjectionMatrix * vec4(position, 1.0);
    vec4 worldDirection = inverseViewMatrix * vec4(viewPosition.xyz, 0.0);
    origin = cameraPosition;
    direction = worldDirection.xyz;
  } else {
    // Unprojected points to calculate direction.
    vec4 nearPoint = inverseProjectionMatrix * vec4(position.xy, -1.0, 1.0);
    vec4 farPoint = inverseProjectionMatrix * vec4(position.xy, -0.9, 1.0);
    nearPoint /= nearPoint.w;
    farPoint /= farPoint.w;

    // Calculate world values.
    vec4 worldDirection = inverseViewMatrix * vec4(farPoint.xyz - nearPoint.xyz, 0.0);
    vec4 worldOrigin = inverseViewMatrix * nearPoint;

    // Outputs
    direction = worldDirection.xyz;
    origin = worldOrigin.xyz;
  }
}

void mainSupport() {
  vec3 direction, origin;
  getCameraRay(origin, direction);

  vec3 cameraPositionECEF = (worldToECEFMatrix * vec4(origin, 1.0)).xyz;
  vCameraPosition = (cameraPositionECEF + altitudeCorrection) * METER_TO_LENGTH_UNIT;
  vRayDirection = (worldToECEFMatrix * vec4(direction, 0.0)).xyz;

  vGeometryAltitudeCorrection = altitudeCorrection * METER_TO_LENGTH_UNIT;
  // Gradually turn off the altitude correction on geometries as the geometric
  // error correction takes effect, because that on the ideal sphere will be
  // over corrected.
  // See: https://github.com/takram-design-engineering/three-geospatial/pull/23#issuecomment-2542914656
  #ifdef CORRECT_GEOMETRIC_ERROR
  vGeometryAltitudeCorrection *= 1.0 - geometricErrorCorrectionAmount;
  #endif // CORRECT_GEOMETRIC_ERROR

  vec3 radii = ellipsoidRadii * METER_TO_LENGTH_UNIT;
  vEllipsoidRadiiSquared = radii * radii;
}
`,Ma=`vec3 getLunarRadiance(const float moonAngularRadius) {
  // Not a physical number but the order of 10^-6 relative to the sun may fit.
  vec3 radiance =
    ATMOSPHERE.solar_irradiance *
    0.000002 /
    (PI * moonAngularRadius * moonAngularRadius) *
    SUN_SPECTRAL_RADIANCE_TO_LUMINANCE;
  return radiance;
}

float intersectSphere(const vec3 ray, const vec3 point, const float radius) {
  vec3 P = -point;
  float PoR = dot(P, ray);
  float D = dot(P, P) - radius * radius;
  return -PoR - sqrt(PoR * PoR - D);
}

float orenNayarDiffuse(const vec3 L, const vec3 V, const vec3 N) {
  float NoL = dot(N, L);
  float NoV = dot(N, V);
  float s = dot(L, V) - NoL * NoV;
  float t = mix(1.0, max(NoL, NoV), step(0.0, s));
  return max(0.0, NoL) * (0.62406015 + 0.41284404 * s / t);
}

vec3 getSkyRadiance(
  const vec3 cameraPosition,
  const vec3 rayDirection,
  const float shadowLength,
  const vec3 sunDirection,
  const vec3 moonDirection,
  const float moonAngularRadius,
  const float lunarRadianceScale,
  const float fragmentAngle
) {
  vec3 transmittance;
  vec3 radiance = GetSkyRadiance(
    cameraPosition,
    rayDirection,
    shadowLength,
    sunDirection,
    transmittance
  );

  // Rendering celestial objects without perspective doesn't make sense.
  #ifdef PERSPECTIVE_CAMERA

  #ifdef SUN
  float viewDotSun = dot(rayDirection, sunDirection);
  if (viewDotSun > cosSunAngularRadius) {
    float angle = acos(clamp(viewDotSun, -1.0, 1.0));
    float antialias = smoothstep(
      ATMOSPHERE.sun_angular_radius,
      ATMOSPHERE.sun_angular_radius - fragmentAngle,
      angle
    );
    radiance += transmittance * GetSolarRadiance() * antialias;
  }
  #endif // SUN

  #ifdef MOON
  float intersection = intersectSphere(rayDirection, moonDirection, moonAngularRadius);
  if (intersection > 0.0) {
    vec3 normal = normalize(moonDirection - rayDirection * intersection);
    float diffuse = orenNayarDiffuse(-sunDirection, rayDirection, normal);
    float viewDotMoon = dot(rayDirection, moonDirection);
    float angle = acos(clamp(viewDotMoon, -1.0, 1.0));
    float antialias = smoothstep(moonAngularRadius, moonAngularRadius - fragmentAngle, angle);
    radiance +=
      transmittance *
      getLunarRadiance(moonAngularRadius) *
      lunarRadianceScale *
      diffuse *
      antialias;
  }
  #endif // MOON

  #endif // PERSPECTIVE_CAMERA

  return radiance;
}
`,mc=Object.defineProperty,k=(t,e,r,i)=>{for(var a=void 0,n=t.length-1,s;n>=0;n--)(s=t[n])&&(a=s(e,r,a)||a);return a&&mc(e,r,a),a},pc=new _,gc=new _,vc=new $,Pa={blendFunction:g.NORMAL,octEncodedNormal:!1,reconstructNormal:!1,ellipsoid:oe.WGS84,correctAltitude:!0,correctGeometricError:!0,sunLight:!1,skyLight:!1,transmittance:!0,inscatter:!0,albedoScale:1,sky:!1,sun:!0,moon:!0,moonAngularRadius:.0045,lunarRadianceScale:1,ground:!0},U=class extends Ze{constructor(e=new sc,r,i=Xe.DEFAULT){let{blendFunction:a,normalBuffer:n=null,octEncodedNormal:s,reconstructNormal:o,irradianceTexture:c=null,scatteringTexture:u=null,transmittanceTexture:h=null,singleMieScatteringTexture:f=null,higherOrderScatteringTexture:A=null,ellipsoid:w,correctAltitude:b,correctGeometricError:D,sunDirection:W,sunLight:V,skyLight:I,transmittance:R,inscatter:H,albedoScale:G,sky:ve,sun:Ee,moon:we,moonDirection:se,moonAngularRadius:rr,lunarRadianceScale:ir,ground:ar}={...Pa,...r};super("AerialPerspectiveEffect",Re(q(dc,{core:{depth:Vt,packing:ma,math:Fe,transform:pa,raySphereIntersection:He,cascadedShadowMaps:Wt,interleavedGradientNoise:Yt,vogelDisk:Qt},bruneton:{common:ke,definitions:We,runtime:Ve},sky:Ma})),{blendFunction:a,vertexShader:fc,attributes:K.DEPTH,uniforms:new Map(Object.entries({normalBuffer:new d(n),projectionMatrix:new d(new J),viewMatrix:new d(new J),inverseProjectionMatrix:new d(new J),inverseViewMatrix:new d(new J),cameraPosition:new d(new _),bottomRadius:new d(i.bottomRadius),ellipsoidRadii:new d(new _),worldToECEFMatrix:new d(new J),altitudeCorrection:new d(new _),geometricErrorCorrectionAmount:new d(0),sunDirection:new d(W?.clone()??new _),cosSunAngularRadius:new d(i.sunAngularRadius),albedoScale:new d(G),moonDirection:new d(se?.clone()??new _),moonAngularRadius:new d(rr),lunarRadianceScale:new d(ir),overlayBuffer:new d(null),shadowBuffer:new d(null),shadowMapSize:new d(new _a),shadowIntervals:new d([]),shadowMatrices:new d([]),inverseShadowMatrices:new d([]),shadowFar:new d(0),shadowTopHeight:new d(0),shadowRadius:new d(3),stbnTexture:new d(null),frame:new d(0),shadowLengthBuffer:new d(null),lightingMaskBuffer:new d(null),ATMOSPHERE:i.toUniform(),SUN_SPECTRAL_RADIANCE_TO_LUMINANCE:new d(i.sunRadianceToRelativeLuminance),SKY_SPECTRAL_RADIANCE_TO_LUMINANCE:new d(i.skyRadianceToRelativeLuminance),irradiance_texture:new d(c),scattering_texture:new d(u),transmittance_texture:new d(h),single_mie_scattering_texture:new d(null),higher_order_scattering_texture:new d(null)})),defines:new Map([["TRANSMITTANCE_TEXTURE_WIDTH",pt.toFixed(0)],["TRANSMITTANCE_TEXTURE_HEIGHT",gt.toFixed(0)],["SCATTERING_TEXTURE_R_SIZE",ht.toFixed(0)],["SCATTERING_TEXTURE_MU_SIZE",dt.toFixed(0)],["SCATTERING_TEXTURE_MU_S_SIZE",ft.toFixed(0)],["SCATTERING_TEXTURE_NU_SIZE",mt.toFixed(0)],["IRRADIANCE_TEXTURE_WIDTH",lt.toFixed(0)],["IRRADIANCE_TEXTURE_HEIGHT",ut.toFixed(0)],["METER_TO_LENGTH_UNIT",Ge.toFixed(7)]])}),this.camera=e,this.atmosphere=i,this.overlay=null,this.shadow=null,this.shadowLength=null,this.lightingMask=null,this.hasNormals=!1,this.combinedScatteringTextures=!1,this.hasHigherOrderScatteringTexture=!1,this.shadowSampleCount=8,this.octEncodedNormal=s,this.reconstructNormal=o,this.singleMieScatteringTexture=f,this.higherOrderScatteringTexture=A,this.ellipsoid=w,this.correctAltitude=b,this.correctGeometricError=D,this.sunLight=V,this.skyLight=I,this.transmittance=R,this.inscatter=H,this.sky=ve,this.sun=Ee,this.moon=we,this.ground=ar}get mainCamera(){return this.camera}set mainCamera(e){this.camera=e}copyCameraSettings(e){let{projectionMatrix:r,matrixWorldInverse:i,projectionMatrixInverse:a,matrixWorld:n}=e,s=this.uniforms;s.get("projectionMatrix").value.copy(r),s.get("viewMatrix").value.copy(i),s.get("inverseProjectionMatrix").value.copy(a),s.get("inverseViewMatrix").value.copy(n);let o=e.getWorldPosition(s.get("cameraPosition").value),c=s.get("worldToECEFMatrix").value,u=pc.copy(o).applyMatrix4(c);try{let f=vc.setFromECEF(u).height,A=gc.set(0,this.ellipsoid.maximumRadius,-Math.max(0,f)).applyMatrix4(r);s.get("geometricErrorCorrectionAmount").value=ha(ua(A.y,41.5,13.8,0,1))}catch{return}let h=s.get("altitudeCorrection");this.correctAltitude?ze(u,this.atmosphere.bottomRadius,this.ellipsoid,h.value):h.value.setScalar(0)}updateOverlay(){let e=!1,{uniforms:r,defines:i,overlay:a}=this,n=i.has("HAS_OVERLAY"),s=a!=null;return s!==n&&(s?i.set("HAS_OVERLAY","1"):(i.delete("HAS_OVERLAY"),r.get("overlayBuffer").value=null),e=!0),s&&(r.get("overlayBuffer").value=a.map),e}updateShadow(){let e=!1,{uniforms:r,defines:i,shadow:a}=this,n=i.has("HAS_SHADOW"),s=a!=null;if(s!==n&&(s?i.set("HAS_SHADOW","1"):(i.delete("HAS_SHADOW"),r.get("shadowBuffer").value=null),e=!0),s){let o=i.get("SHADOW_CASCADE_COUNT"),c=`${a.cascadeCount}`;o!==c&&(i.set("SHADOW_CASCADE_COUNT",a.cascadeCount.toFixed(0)),e=!0),r.get("shadowBuffer").value=a.map,r.get("shadowMapSize").value=a.mapSize,r.get("shadowIntervals").value=a.intervals,r.get("shadowMatrices").value=a.matrices,r.get("inverseShadowMatrices").value=a.inverseMatrices,r.get("shadowFar").value=a.far,r.get("shadowTopHeight").value=a.topHeight}return e}updateShadowLength(){let e=!1,{uniforms:r,defines:i,shadowLength:a}=this,n=i.has("HAS_SHADOW_LENGTH"),s=a!=null;return s!==n&&(s?i.set("HAS_SHADOW_LENGTH","1"):(i.delete("HAS_SHADOW_LENGTH"),r.get("shadowLengthBuffer").value=null),e=!0),s&&(r.get("shadowLengthBuffer").value=a.map),e}updateLightingMask(){let e=!1,{uniforms:r,defines:i,lightingMask:a}=this,n=i.has("HAS_LIGHTING_MASK"),s=a!=null;if(s!==n&&(s?i.set("HAS_LIGHTING_MASK","1"):(i.delete("HAS_LIGHTING_MASK"),r.get("lightingMaskBuffer").value=null),e=!0),s){r.get("lightingMaskBuffer").value=a.map;let o=i.get("LIGHTING_MASK_CHANNEL"),c=a.channel;c!==o&&(/^[rgba]$/.test(c)?(i.set("LIGHTING_MASK_CHANNEL",c),e=!0):console.error(`Expression validation failed: ${c}`))}return e}update(e,r,i){this.copyCameraSettings(this.camera);let a=!1;a||=this.updateOverlay(),a||=this.updateShadow(),a||=this.updateShadowLength(),a||=this.updateLightingMask(),a&&this.setChanged(),++this.uniforms.get("frame").value}get normalBuffer(){return this.uniforms.get("normalBuffer").value}set normalBuffer(e){this.uniforms.get("normalBuffer").value=e,this.hasNormals=e!=null}get irradianceTexture(){return this.uniforms.get("irradiance_texture").value}set irradianceTexture(e){this.uniforms.get("irradiance_texture").value=e}get scatteringTexture(){return this.uniforms.get("scattering_texture").value}set scatteringTexture(e){this.uniforms.get("scattering_texture").value=e}get transmittanceTexture(){return this.uniforms.get("transmittance_texture").value}set transmittanceTexture(e){this.uniforms.get("transmittance_texture").value=e}get singleMieScatteringTexture(){return this.uniforms.get("single_mie_scattering_texture").value}set singleMieScatteringTexture(e){this.uniforms.get("single_mie_scattering_texture").value=e,this.combinedScatteringTextures=e==null}get higherOrderScatteringTexture(){return this.uniforms.get("higher_order_scattering_texture").value}set higherOrderScatteringTexture(e){this.uniforms.get("higher_order_scattering_texture").value=e,this.hasHigherOrderScatteringTexture=e!=null}get ellipsoid(){return this._ellipsoid}set ellipsoid(e){this._ellipsoid=e,this.uniforms.get("ellipsoidRadii").value.copy(e.radii)}get worldToECEFMatrix(){return this.uniforms.get("worldToECEFMatrix").value}get sunDirection(){return this.uniforms.get("sunDirection").value}get sunAngularRadius(){return this.uniforms.get("ATMOSPHERE").value.sun_angular_radius}set sunAngularRadius(e){this.uniforms.get("ATMOSPHERE").value.sun_angular_radius=e,this.uniforms.get("cosSunAngularRadius").value=Math.cos(e)}get albedoScale(){return this.uniforms.get("albedoScale").value}set albedoScale(e){this.uniforms.get("albedoScale").value=e}get moonDirection(){return this.uniforms.get("moonDirection").value}get moonAngularRadius(){return this.uniforms.get("moonAngularRadius").value}set moonAngularRadius(e){this.uniforms.get("moonAngularRadius").value=e}get lunarRadianceScale(){return this.uniforms.get("lunarRadianceScale").value}set lunarRadianceScale(e){this.uniforms.get("lunarRadianceScale").value=e}get stbnTexture(){return this.uniforms.get("stbnTexture").value}set stbnTexture(e){this.uniforms.get("stbnTexture").value=e}get shadowRadius(){return this.uniforms.get("shadowRadius").value}set shadowRadius(e){this.uniforms.get("shadowRadius").value=e}};k([v("OCT_ENCODED_NORMAL")],U.prototype,"octEncodedNormal");k([v("RECONSTRUCT_NORMAL")],U.prototype,"reconstructNormal");k([v("HAS_NORMALS")],U.prototype,"hasNormals");k([v("COMBINED_SCATTERING_TEXTURES")],U.prototype,"combinedScatteringTextures");k([v("HAS_HIGHER_ORDER_SCATTERING_TEXTURE")],U.prototype,"hasHigherOrderScatteringTexture");k([v("CORRECT_GEOMETRIC_ERROR")],U.prototype,"correctGeometricError");k([v("SUN_LIGHT")],U.prototype,"sunLight");k([v("SKY_LIGHT")],U.prototype,"skyLight");k([v("TRANSMITTANCE")],U.prototype,"transmittance");k([v("INSCATTER")],U.prototype,"inscatter");k([v("SKY")],U.prototype,"sky");k([v("SUN")],U.prototype,"sun");k([v("MOON")],U.prototype,"moon");k([v("GROUND")],U.prototype,"ground");k([he("SHADOW_SAMPLE_COUNT",{min:1,max:16})],U.prototype,"shadowSampleCount");var Ac=Object.defineProperty,Na=(t,e,r,i)=>{for(var a=void 0,n=t.length-1,s;n>=0;n--)(s=t[n])&&(a=s(e,r,a)||a);return a&&Ac(e,r,a),a},Tc=new _;function Sc(t,e){let r="",i="";for(let a=1;a<e;++a)r+=`layout(location = ${a}) out float renderTarget${a};
`,i+=`renderTarget${a} = 0.0;
`;return t.replace("#include <mrt_layout>",r).replace("#include <mrt_output>",i)}var jt={ellipsoid:oe.WGS84,correctAltitude:!0,renderTargetCount:1},fe=class extends oc{constructor(e,r=Xe.DEFAULT){let{irradianceTexture:i=null,scatteringTexture:a=null,transmittanceTexture:n=null,singleMieScatteringTexture:s=null,higherOrderScatteringTexture:o=null,ellipsoid:c,correctAltitude:u,sunDirection:h,sunAngularRadius:f,renderTargetCount:A,...w}={...jt,...e};super({toneMapped:!1,depthWrite:!1,depthTest:!1,...w,uniforms:{cameraPosition:new d(new _),worldToECEFMatrix:new d(new J),altitudeCorrection:new d(new _),sunDirection:new d(h?.clone()??new _),cosSunAngularRadius:new d(r.sunAngularRadius),ATMOSPHERE:r.toUniform(),SUN_SPECTRAL_RADIANCE_TO_LUMINANCE:new d(r.sunRadianceToRelativeLuminance),SKY_SPECTRAL_RADIANCE_TO_LUMINANCE:new d(r.skyRadianceToRelativeLuminance),irradiance_texture:new d(i),scattering_texture:new d(a),transmittance_texture:new d(n),single_mie_scattering_texture:new d(null),higher_order_scattering_texture:new d(null),...w.uniforms},defines:{PI:`${Math.PI}`,TRANSMITTANCE_TEXTURE_WIDTH:pt.toFixed(0),TRANSMITTANCE_TEXTURE_HEIGHT:gt.toFixed(0),SCATTERING_TEXTURE_R_SIZE:ht.toFixed(0),SCATTERING_TEXTURE_MU_SIZE:dt.toFixed(0),SCATTERING_TEXTURE_MU_S_SIZE:ft.toFixed(0),SCATTERING_TEXTURE_NU_SIZE:mt.toFixed(0),IRRADIANCE_TEXTURE_WIDTH:lt.toFixed(0),IRRADIANCE_TEXTURE_HEIGHT:ut.toFixed(0),METER_TO_LENGTH_UNIT:Ge.toFixed(7),...w.defines}}),this.atmosphere=r,this.combinedScatteringTextures=!1,this.hasHigherOrderScatteringTexture=!1,this.singleMieScatteringTexture=s,this.higherOrderScatteringTexture=o,this.ellipsoid=c,this.correctAltitude=u,f!=null&&(this.sunAngularRadius=f),this.renderTargetCount=A}copyCameraSettings(e){let r=this.uniforms,i=e.getWorldPosition(r.cameraPosition.value),a=Tc.copy(i).applyMatrix4(r.worldToECEFMatrix.value),n=r.altitudeCorrection.value;this.correctAltitude?ze(a,this.atmosphere.bottomRadius,this.ellipsoid,n):n.setScalar(0)}onBeforeCompile(e,r){e.fragmentShader=Sc(e.fragmentShader,this.renderTargetCount)}onBeforeRender(e,r,i,a,n,s){this.copyCameraSettings(i)}get irradianceTexture(){return this.uniforms.irradiance_texture.value}set irradianceTexture(e){this.uniforms.irradiance_texture.value=e}get scatteringTexture(){return this.uniforms.scattering_texture.value}set scatteringTexture(e){this.uniforms.scattering_texture.value=e}get transmittanceTexture(){return this.uniforms.transmittance_texture.value}set transmittanceTexture(e){this.uniforms.transmittance_texture.value=e}get singleMieScatteringTexture(){return this.uniforms.single_mie_scattering_texture.value}set singleMieScatteringTexture(e){this.uniforms.single_mie_scattering_texture.value=e,this.combinedScatteringTextures=e==null}get higherOrderScatteringTexture(){return this.uniforms.higher_order_scattering_texture.value}set higherOrderScatteringTexture(e){this.uniforms.higher_order_scattering_texture.value=e,this.hasHigherOrderScatteringTexture=e!=null}get worldToECEFMatrix(){return this.uniforms.worldToECEFMatrix.value}get sunDirection(){return this.uniforms.sunDirection.value}get sunAngularRadius(){return this.uniforms.ATMOSPHERE.value.sun_angular_radius}set sunAngularRadius(e){this.uniforms.ATMOSPHERE.value.sun_angular_radius=e,this.uniforms.cosSunAngularRadius.value=Math.cos(e)}get renderTargetCount(){return this._renderTargetCount}set renderTargetCount(e){e!==this.renderTargetCount&&(this._renderTargetCount=e,this.needsUpdate=!0)}};Na([v("COMBINED_SCATTERING_TEXTURES")],fe.prototype,"combinedScatteringTextures");Na([v("HAS_HIGHER_ORDER_SCATTERING_TEXTURE")],fe.prototype,"hasHigherOrderScatteringTexture");var ba=14959787069098932e-8;var _1=2*Math.PI,I1=3600*(180/Math.PI);var xc=10800*60,M1=2*xc,Ec=6378.1366,P1=Ec/ba;var ne;(function(t){t.Sun="Sun",t.Moon="Moon",t.Mercury="Mercury",t.Venus="Venus",t.Earth="Earth",t.Mars="Mars",t.Jupiter="Jupiter",t.Saturn="Saturn",t.Uranus="Uranus",t.Neptune="Neptune",t.Pluto="Pluto",t.SSB="SSB",t.EMB="EMB",t.Star1="Star1",t.Star2="Star2",t.Star3="Star3",t.Star4="Star4",t.Star5="Star5",t.Star6="Star6",t.Star7="Star7",t.Star8="Star8"})(ne||(ne={}));var N1=[ne.Star1,ne.Star2,ne.Star3,ne.Star4,ne.Star5,ne.Star6,ne.Star7,ne.Star8];var xa;(function(t){t[t.From2000=0]="From2000",t[t.Into2000=1]="Into2000"})(xa||(xa={}));var Ea;(function(t){t[t.Pericenter=0]="Pericenter",t[t.Apocenter=1]="Apocenter"})(Ea||(Ea={}));var wa;(function(t){t.Penumbral="penumbral",t.Partial="partial",t.Annular="annular",t.Total="total"})(wa||(wa={}));var ya;(function(t){t[t.Invalid=0]="Invalid",t[t.Ascending=1]="Ascending",t[t.Descending=-1]="Descending"})(ya||(ya={}));var b1=.001/ba;function wc(t){var e=[];if(t.length===0)return"";if(typeof t[0]!="string")throw new TypeError("Url must be a string. Received "+t[0]);if(t[0].match(/^[^/:]+:\/*$/)&&t.length>1){var r=t.shift();t[0]=r+t[0]}t[0].match(/^file:\/\/\//)?t[0]=t[0].replace(/^([^/:]+):\/*/,"$1:///"):t[0]=t[0].replace(/^([^/:]+):\/*/,"$1://");for(var i=0;i<t.length;i++){var a=t[i];if(typeof a!="string")throw new TypeError("Url must be a string. Received "+a);a!==""&&(i>0&&(a=a.replace(/^[\/]+/,"")),i<t.length-1?a=a.replace(/[\/]+$/,""):a=a.replace(/[\/]+$/,"/"),e.push(a))}var n=e.join("/");n=n.replace(/\/(\?|&|#[^!])/g,"$1");var s=n.split("?");return n=s.shift()+(s.length>0?"?":"")+s.join("&"),n}function yc(){var t;return typeof arguments[0]=="object"?t=arguments[0]:t=[].slice.call(arguments),wc(t)}var Da={width:pt,height:gt},Ye={width:zr,height:kr,depth:Wr},Ca={width:lt,height:ut},Xt=class extends cc{constructor({format:e="exr",type:r=va,combinedScattering:i=!0,higherOrderScattering:a=!0}={},n){super(n),this.format=e,this.type=r,this.combinedScattering=i,this.higherOrderScattering=a}setType(e){return this.type=zi(e)?Aa:va,this}load(e,r,i,a){let n={},s=({key:o,loader:c,path:u})=>(c.setRequestHeader(this.requestHeader),c.setPath(this.path),c.setWithCredentials(this.withCredentials),c.load(yc(e,u),h=>{h.type=this.type,this.type===Aa&&(h.image,h.image.data!=null&&(h.image.data=new Float32Array(new Z(h.image.data?.buffer)))),h.minFilter=Ta,h.magFilter=Ta,n[`${o}Texture`]=h,n.irradianceTexture!=null&&n.scatteringTexture!=null&&n.transmittanceTexture!=null&&(this.combinedScattering||n.singleMieScatteringTexture!=null)&&(!this.higherOrderScattering||n.higherOrderScatteringTexture!=null)&&r?.(n)},i,a));return this.format==="exr"?{transmittanceTexture:s({key:"transmittance",loader:new nt(Da,this.manager),path:"transmittance.exr"}),scatteringTexture:s({key:"scattering",loader:new Oe(Ye,this.manager),path:"scattering.exr"}),irradianceTexture:s({key:"irradiance",loader:new nt(Ca,this.manager),path:"irradiance.exr"}),singleMieScatteringTexture:this.combinedScattering?void 0:s({key:"singleMieScattering",loader:new Oe(Ye,this.manager),path:"single_mie_scattering.exr"}),higherOrderScatteringTexture:this.higherOrderScattering?s({key:"higherOrderScattering",loader:new Oe(Ye,this.manager),path:"higher_order_scattering.exr"}):void 0}:{transmittanceTexture:s({key:"transmittance",loader:new ue(Sa,Be,Da,this.manager),path:"transmittance.bin"}),scatteringTexture:s({key:"scattering",loader:new ue(Vr,Be,Ye,this.manager),path:"scattering.bin"}),irradianceTexture:s({key:"irradiance",loader:new ue(Sa,Be,Ca,this.manager),path:"irradiance.bin"}),singleMieScatteringTexture:this.combinedScattering?void 0:s({key:"singleMieScattering",loader:new ue(Vr,Be,Ye,this.manager),path:"single_mie_scattering.bin"}),higherOrderScatteringTexture:this.higherOrderScattering?s({key:"higherOrderScattering",loader:new ue(Vr,Be,Ye,this.manager),path:"higher_order_scattering.bin"}):void 0}}};var O1=1/Math.sqrt(Math.PI),U1=Math.sqrt(3)/(2*Math.sqrt(Math.PI));var Dc={ellipsoid:oe.WGS84,correctAltitude:!0};var Cc=`precision highp float;
precision highp sampler3D;

#define RECIPROCAL_PI 0.3183098861837907

#include "core/raySphereIntersection"

#include "bruneton/definitions"

uniform AtmosphereParameters ATMOSPHERE;
uniform vec3 SUN_SPECTRAL_RADIANCE_TO_LUMINANCE;
uniform vec3 SKY_SPECTRAL_RADIANCE_TO_LUMINANCE;

uniform sampler2D transmittance_texture;
uniform sampler3D scattering_texture;
uniform sampler2D irradiance_texture;
uniform sampler3D single_mie_scattering_texture;
uniform sampler3D higher_order_scattering_texture;

#include "bruneton/common"
#include "bruneton/runtime"

uniform vec3 sunDirection;
uniform float cosSunAngularRadius;
uniform vec3 moonDirection;
uniform float moonAngularRadius;
uniform float lunarRadianceScale;
uniform vec3 groundAlbedo;

#include "sky"

#ifdef HAS_SHADOW_LENGTH
uniform sampler2D shadowLengthBuffer;
#endif // HAS_SHADOW_LENGTH

in vec2 vUv;
in vec3 vCameraPosition;
in vec3 vRayDirection;

layout(location = 0) out vec4 outputColor;

#include <mrt_layout>

void main() {
  float shadowLength = 0.0;
  #ifdef HAS_SHADOW_LENGTH
  shadowLength = texture(shadowLengthBuffer, vUv).r;
  #endif // HAS_SHADOW_LENGTH

  vec3 cameraPosition = vCameraPosition;
  vec3 rayDirection = normalize(vRayDirection);
  vec3 dRDdx = dFdx(rayDirection);
  vec3 dRDdy = dFdy(rayDirection);
  float fragmentAngle = length(dRDdx + dRDdy) / length(rayDirection);

  #ifdef GROUND_ALBEDO

  float r = length(cameraPosition);
  float mu = dot(cameraPosition, rayDirection) / r;
  bool intersectsGround = RayIntersectsGround(ATMOSPHERE, r, mu);
  if (intersectsGround) {
    float distanceToGround = raySphereFirstIntersection(
      cameraPosition,
      rayDirection,
      ATMOSPHERE.bottom_radius
    );
    vec3 groundPosition = rayDirection * distanceToGround + cameraPosition;
    vec3 surfaceNormal = normalize(groundPosition);
    vec3 skyIrradiance;
    vec3 sunIrradiance = GetSunAndSkyIrradiance(
      cameraPosition,
      surfaceNormal,
      sunDirection,
      skyIrradiance
    );
    vec3 transmittance;
    vec3 inscatter = GetSkyRadianceToPoint(
      cameraPosition,
      ATMOSPHERE.bottom_radius * surfaceNormal,
      shadowLength,
      sunDirection,
      transmittance
    );
    vec3 radiance = groundAlbedo * RECIPROCAL_PI * (sunIrradiance + skyIrradiance);
    outputColor.rgb = radiance * transmittance + inscatter;
  } else {
    outputColor.rgb = getSkyRadiance(
      cameraPosition,
      rayDirection,
      shadowLength,
      sunDirection,
      moonDirection,
      moonAngularRadius,
      lunarRadianceScale,
      fragmentAngle
    );
  }

  #else // GROUND_ALBEDO

  outputColor.rgb = getSkyRadiance(
    cameraPosition,
    rayDirection,
    shadowLength,
    sunDirection,
    moonDirection,
    moonAngularRadius,
    lunarRadianceScale,
    fragmentAngle
  );

  #endif // GROUND_ALBEDO

  outputColor.a = 1.0;

  #include <mrt_output>
}
`,Rc=`precision highp float;
precision highp sampler3D;

uniform mat4 inverseProjectionMatrix;
uniform mat4 inverseViewMatrix;
uniform vec3 cameraPosition;
uniform mat4 worldToECEFMatrix;
uniform vec3 altitudeCorrection;

layout(location = 0) in vec3 position;

out vec2 vUv;
out vec3 vCameraPosition;
out vec3 vRayDirection;

void getCameraRay(out vec3 origin, out vec3 direction) {
  bool isPerspective = inverseProjectionMatrix[2][3] != 0.0; // 4th entry in the 3rd column

  if (isPerspective) {
    // Calculate the camera ray for a perspective camera.
    vec4 viewPosition = inverseProjectionMatrix * vec4(position, 1.0);
    vec4 worldDirection = inverseViewMatrix * vec4(viewPosition.xyz, 0.0);
    origin = cameraPosition;
    direction = worldDirection.xyz;
  } else {
    // Unprojected points to calculate direction.
    vec4 nearPoint = inverseProjectionMatrix * vec4(position.xy, -1.0, 1.0);
    vec4 farPoint = inverseProjectionMatrix * vec4(position.xy, -0.9, 1.0);
    nearPoint /= nearPoint.w;
    farPoint /= farPoint.w;

    // Calculate world values
    vec4 worldDirection = inverseViewMatrix * vec4(farPoint.xyz - nearPoint.xyz, 0.0);
    vec4 worldOrigin = inverseViewMatrix * nearPoint;

    // Outputs
    direction = worldDirection.xyz;
    origin = worldOrigin.xyz;
  }
}

void main() {
  vUv = position.xy * 0.5 + 0.5;

  vec3 direction, origin;
  getCameraRay(origin, direction);

  vec3 cameraPositionECEF = (worldToECEFMatrix * vec4(origin, 1.0)).xyz;
  vCameraPosition = (cameraPositionECEF + altitudeCorrection) * METER_TO_LENGTH_UNIT;
  vRayDirection = (worldToECEFMatrix * vec4(direction, 0.0)).xyz;

  gl_Position = vec4(position.xy, 1.0, 1.0);
}
`,_c=Object.defineProperty,Qr=(t,e,r,i)=>{for(var a=void 0,n=t.length-1,s;n>=0;n--)(s=t[n])&&(a=s(e,r,a)||a);return a&&_c(e,r,a),a},Oa={...jt,sun:!0,moon:!0,moonAngularRadius:.0045,lunarRadianceScale:1,ground:!0,groundAlbedo:new Ra(0)},Qe=class extends fe{constructor(e){let{sun:r,moon:i,moonDirection:a,moonAngularRadius:n,lunarRadianceScale:s,ground:o,groundAlbedo:c,...u}={...Oa,...e};super({name:"SkyMaterial",glslVersion:Ia,vertexShader:Rc,fragmentShader:q(Cc,{core:{raySphereIntersection:He},bruneton:{common:ke,definitions:We,runtime:Ve},sky:Ma}),...u,uniforms:{inverseProjectionMatrix:new d(new J),inverseViewMatrix:new d(new J),moonDirection:new d(a?.clone()??new _),moonAngularRadius:new d(n),lunarRadianceScale:new d(s),groundAlbedo:new d(c.clone()),shadowLengthBuffer:new d(null),...u.uniforms},defines:{PERSPECTIVE_CAMERA:"1"},depthWrite:!1,depthTest:!0}),this.shadowLength=null,this.sun=r,this.moon=i,this.ground=o}onBeforeRender(e,r,i,a,n,s){super.onBeforeRender(e,r,i,a,n,s);let{uniforms:o,defines:c}=this;o.inverseProjectionMatrix.value.copy(i.projectionMatrixInverse),o.inverseViewMatrix.value.copy(i.matrixWorld);let u=c.PERSPECTIVE_CAMERA!=null,h=i.isPerspectiveCamera===!0;h!==u&&(h?c.PERSPECTIVE_CAMERA="1":delete c.PERSPECTIVE_CAMERA,this.needsUpdate=!0);let f=this.groundAlbedo,A=c.GROUND_ALBEDO!=null,w=f.r!==0||f.g!==0||f.b!==0;w!==A&&(w?this.defines.GROUND_ALBEDO="1":delete this.defines.GROUND_ALBEDO,this.needsUpdate=!0);let b=this.shadowLength,D=c.HAS_SHADOW_LENGTH!=null,W=b!=null;W!==D&&(W?c.HAS_SHADOW_LENGTH="1":(delete c.HAS_SHADOW_LENGTH,o.shadowLengthBuffer.value=null),this.needsUpdate=!0),W&&(o.shadowLengthBuffer.value=b.map)}get moonDirection(){return this.uniforms.moonDirection.value}get moonAngularRadius(){return this.uniforms.moonAngularRadius.value}set moonAngularRadius(e){this.uniforms.moonAngularRadius.value=e}get lunarRadianceScale(){return this.uniforms.lunarRadianceScale.value}set lunarRadianceScale(e){this.uniforms.lunarRadianceScale.value=e}get groundAlbedo(){return this.uniforms.groundAlbedo.value}};Qr([v("SUN")],Qe.prototype,"sun");Qr([v("MOON")],Qe.prototype,"moon");Qr([v("GROUND")],Qe.prototype,"ground");var Ic=`precision highp float;
precision highp sampler3D;

#include "bruneton/definitions"

uniform AtmosphereParameters ATMOSPHERE;
uniform vec3 SUN_SPECTRAL_RADIANCE_TO_LUMINANCE;
uniform vec3 SKY_SPECTRAL_RADIANCE_TO_LUMINANCE;

uniform sampler2D transmittance_texture;
uniform sampler3D scattering_texture;
uniform sampler2D irradiance_texture;
uniform sampler3D single_mie_scattering_texture;
uniform sampler3D higher_order_scattering_texture;

#include "bruneton/common"
#include "bruneton/runtime"

uniform vec3 sunDirection;

in vec3 vCameraPosition;
in vec3 vRayDirection;

layout(location = 0) out vec4 outputColor;

#include <mrt_layout>

in vec3 vColor;

void main() {
  #if !defined(PERSPECTIVE_CAMERA)
  outputColor = vec4(0.0);
  discard; // Rendering celestial objects without perspective doesn't make sense.
  #endif // !defined(PERSPECTIVE_CAMERA)

  #ifdef BACKGROUND
  vec3 rayDirection = normalize(vRayDirection);
  float r = length(vCameraPosition);
  float mu = dot(vCameraPosition, rayDirection) / r;

  if (RayIntersectsGround(ATMOSPHERE, r, mu)) {
    discard;
  }

  vec3 transmittance;
  vec3 radiance = GetSkyRadiance(
    vCameraPosition,
    normalize(vRayDirection),
    0.0, // Shadow length
    sunDirection,
    transmittance
  );
  radiance += transmittance * vColor;
  outputColor = vec4(radiance, 1.0);
  #else // BACKGROUND
  outputColor = vec4(vColor, 1.0);
  #endif // BACKGROUND

  #include <mrt_output>
}
`,Mc=`precision highp float;
precision highp sampler3D;

#define saturate(x) clamp(x, 0.0, 1.0)

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 viewMatrix;
uniform mat4 matrixWorld;
uniform vec3 cameraPosition;
uniform float cameraFar;
uniform mat4 worldToECEFMatrix;
uniform vec3 altitudeCorrection;
uniform float pointSize;
uniform vec2 magnitudeRange;
uniform float intensity;

layout(location = 0) in vec3 position;
layout(location = 1) in float magnitude;
layout(location = 2) in vec3 color;

out vec3 vCameraPosition;
out vec3 vRayDirection;
out vec3 vEllipsoidCenter;
out vec3 vColor;

void main() {
  // Magnitude is stored between 0 to 1 within the given range.
  float m = mix(magnitudeRange.x, magnitudeRange.y, magnitude);
  vec3 v = pow(vec3(10.0), -vec3(magnitudeRange, m) / 2.5);
  vColor = vec3(intensity * color);
  vColor *= saturate((v.z - v.y) / (v.x - v.y));

  #ifdef BACKGROUND
  vec3 worldDirection = normalize(matrixWorld * vec4(position, 1.0)).xyz;
  vec3 cameraPositionECEF = (worldToECEFMatrix * vec4(cameraPosition, 1.0)).xyz;
  vCameraPosition = (cameraPositionECEF + altitudeCorrection) * METER_TO_LENGTH_UNIT;
  vRayDirection = (worldToECEFMatrix * vec4(worldDirection, 0.0)).xyz;
  gl_Position =
    projectionMatrix * viewMatrix * vec4(cameraPosition + worldDirection * cameraFar, 1.0);
  #else // BACKGROUND
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  #endif // BACKGROUND

  gl_PointSize = pointSize;
}
`,Pc=Object.defineProperty,Ua=(t,e,r,i)=>{for(var a=void 0,n=t.length-1,s;n>=0;n--)(s=t[n])&&(a=s(e,r,a)||a);return a&&Pc(e,r,a),a},La={...jt,pointSize:1,intensity:1,background:!0,ground:!0},vt=class extends fe{constructor(e){let{pointSize:r,intensity:i,background:a,ground:n,...s}={...La,...e};super({name:"StarsMaterial",glslVersion:Ia,vertexShader:Mc,fragmentShader:q(Ic,{bruneton:{common:ke,definitions:We,runtime:Ve}}),...s,uniforms:{projectionMatrix:new d(new J),modelViewMatrix:new d(new J),viewMatrix:new d(new J),matrixWorld:new d(new J),cameraFar:new d(0),pointSize:new d(0),magnitudeRange:new d(new _a(-2,8)),intensity:new d(i),...s.uniforms},defines:{PERSPECTIVE_CAMERA:"1"},depthWrite:!0,depthTest:!0}),this.pointSize=r,this.background=a,this.ground=n}onBeforeRender(e,r,i,a,n,s){super.onBeforeRender(e,r,i,a,n,s);let o=this.uniforms;o.projectionMatrix.value.copy(i.projectionMatrix),o.modelViewMatrix.value.copy(i.modelViewMatrix),o.viewMatrix.value.copy(i.matrixWorldInverse),o.matrixWorld.value.copy(n.matrixWorld),o.cameraFar.value=i.far,o.pointSize.value=this.pointSize*e.getPixelRatio();let c=i.isPerspectiveCamera===!0;this.defines.PERSPECTIVE_CAMERA!=null!==c&&(c?this.defines.PERSPECTIVE_CAMERA="1":delete this.defines.PERSPECTIVE_CAMERA,this.needsUpdate=!0)}get magnitudeRange(){return this.uniforms.magnitudeRange.value}get intensity(){return this.uniforms.intensity.value}set intensity(e){this.uniforms.intensity.value=e}};Ua([v("BACKGROUND")],vt.prototype,"background");Ua([v("GROUND")],vt.prototype,"ground");var Nc={ellipsoid:oe.WGS84,correctAltitude:!0,distance:1};import{Vector3 as M,Vector2 as P,Matrix4 as N,Object3D as Ba,Box3 as bc,Uniform as l,GLSL3 as er,Vector4 as Q,RawShaderMaterial as ni,Camera as Ya,WebGLRenderTarget as Oc,HalfFloatType as Qa,LinearFilter as Kt,RedFormat as Uc,WebGLArrayRenderTarget as Lc,EventDispatcher as Bc,Matrix3 as Fc,Texture as Fa,Data3DTexture as Ha}from"three";var Xr=Ve,jr=ke,Kr=We;var St=class t{constructor(e=0,r=0,i=0,a=0){this.expTerm=e,this.exponent=r,this.linearTerm=i,this.constantTerm=a}set(e=0,r=0,i=0,a=0){return this.expTerm=e,this.exponent=r,this.linearTerm=i,this.constantTerm=a,this}clone(){return new t(this.expTerm,this.exponent,this.linearTerm,this.constantTerm)}copy(e){return this.expTerm=e.expTerm,this.exponent=e.exponent,this.linearTerm=e.linearTerm,this.constantTerm=e.constantTerm,this}},Hc=["channel","altitude","height","densityScale","shapeAmount","shapeDetailAmount","weatherExponent","shapeAlteringBias","coverageFilterWidth","shadow","densityProfile"];function Gc(t,e){if(e!=null)for(let r of Hc){let i=e[r];i!=null&&(t[r]instanceof St?t[r].copy(i):t[r]=i)}}var $r=class Xa{constructor(e){this.channel="r",this.altitude=0,this.height=0,this.densityScale=.2,this.shapeAmount=1,this.shapeDetailAmount=1,this.weatherExponent=1,this.shapeAlteringBias=.35,this.coverageFilterWidth=.6,this.densityProfile=new St(0,0,.75,.25),this.shadow=!1,this.set(e)}set(e){return Gc(this,e),this}clone(){return new Xa(this)}copy(e){return this.channel=e.channel,this.altitude=e.altitude,this.height=e.height,this.densityScale=e.densityScale,this.shapeAmount=e.shapeAmount,this.shapeDetailAmount=e.shapeDetailAmount,this.weatherExponent=e.weatherExponent,this.shapeAlteringBias=e.shapeAlteringBias,this.coverageFilterWidth=e.coverageFilterWidth,this.densityProfile.copy(e.densityProfile),this.shadow=e.shadow,this}};$r.DEFAULT=new $r;var pe=$r,je=Array.from({length:8},()=>({value:0,flag:0})),At=Array.from({length:3},()=>({min:0,max:0}));function zc(t,e){return t.value!==e.value?t.value-e.value:t.flag-e.flag}var ei=class ja extends Array{constructor(e){super(new pe(e?.[0]),new pe(e?.[1]),new pe(e?.[2]),new pe(e?.[3]))}set(e){return this[0].set(e?.[0]),this[1].set(e?.[1]),this[2].set(e?.[2]),this[3].set(e?.[3]),this}reset(){return this[0].copy(pe.DEFAULT),this[1].copy(pe.DEFAULT),this[2].copy(pe.DEFAULT),this[3].copy(pe.DEFAULT),this}clone(){return new ja(this)}copy(e){return this[0].copy(e[0]),this[1].copy(e[1]),this[2].copy(e[2]),this[3].copy(e[3]),this}get localWeatherChannels(){return this[0].channel+this[1].channel+this[2].channel+this[3].channel}packValues(e,r){return r.set(this[0][e],this[1][e],this[2][e],this[3][e])}packSums(e,r,i){return i.set(this[0][e]+this[0][r],this[1][e]+this[1][r],this[2][e]+this[2][r],this[3][e]+this[3][r])}packDensityProfiles(e,r){return r.set(this[0].densityProfile[e],this[1].densityProfile[e],this[2].densityProfile[e],this[3].densityProfile[e])}packIntervalHeights(e,r){for(let s=0;s<4;++s){let o=this[s],c=je[s];c.value=o.altitude,c.flag=0,c=je[s+4],c.value=o.altitude+o.height,c.flag=1}je.sort(zc);let i=0,a=0;for(let s=0;s<je.length;++s){let{value:o,flag:c}=je[s];if(a===0&&s>0){let u=At[i++];u.min=je[s-1].value,u.max=o}a+=c===0?1:-1}for(;i<3;++i){let s=At[i];s.min=0,s.max=0}let n=At[0];e.x=n.min,r.x=n.max,n=At[1],e.y=n.min,r.y=n.max,n=At[2],e.z=n.min,r.z=n.max}};ei.DEFAULT=new ei([{channel:"r",altitude:750,height:650,densityScale:.2,shapeAmount:1,shapeDetailAmount:1,weatherExponent:1,shapeAlteringBias:.35,coverageFilterWidth:.6,shadow:!0},{channel:"g",altitude:1e3,height:1200,densityScale:.2,shapeAmount:1,shapeDetailAmount:1,weatherExponent:1,shapeAlteringBias:.35,coverageFilterWidth:.6,shadow:!0},{channel:"b",altitude:7500,height:500,densityScale:.003,shapeAmount:.4,shapeDetailAmount:0,weatherExponent:1,shapeAlteringBias:.35,coverageFilterWidth:.5},{channel:"a"}]);var Ka=ei,kc=!0,Ga="Invariant failed";function xe(t,e){if(!t){if(kc)throw new Error(Ga);var r=Ga;throw new Error(r)}}var Zt=class t{constructor(e,r){this.near=[new M,new M,new M,new M],this.far=[new M,new M,new M,new M],e!=null&&r!=null&&this.setFromCamera(e,r)}clone(){return new t().copy(this)}copy(e){for(let r=0;r<4;++r)this.near[r].copy(e.near[r]),this.far[r].copy(e.far[r]);return this}setFromCamera(e,r){let i=e.isOrthographicCamera===!0,a=e.projectionMatrixInverse;this.near[0].set(1,1,-1),this.near[1].set(1,-1,-1),this.near[2].set(-1,-1,-1),this.near[3].set(-1,1,-1);for(let n=0;n<4;++n)this.near[n].applyMatrix4(a);this.far[0].set(1,1,1),this.far[1].set(1,-1,1),this.far[2].set(-1,-1,1),this.far[3].set(-1,1,1);for(let n=0;n<4;++n){let s=this.far[n];s.applyMatrix4(a);let o=Math.abs(s.z);i?s.z*=Math.min(r/o,1):s.multiplyScalar(Math.min(r/o,1))}return this}split(e,r=[]){for(let i=0;i<e.length;++i){let a=r[i]??=new t;if(i===0)for(let n=0;n<4;++n)a.near[n].copy(this.near[n]);else for(let n=0;n<4;++n)a.near[n].lerpVectors(this.near[n],this.far[n],e[i-1]);if(i===e.length-1)for(let n=0;n<4;++n)a.far[n].copy(this.far[n]);else for(let n=0;n<4;++n)a.far[n].lerpVectors(this.near[n],this.far[n],e[i])}return r.length=e.length,r}applyMatrix4(e){for(let r=0;r<4;++r)this.near[r].applyMatrix4(e),this.far[r].applyMatrix4(e);return this}},Wc={uniform:(t,e,r,i,a=[])=>{for(let n=0;n<t;++n)a[n]=(e+(r-e)*(n+1)/t)/r;return a.length=t,a},logarithmic:(t,e,r,i,a=[])=>{for(let n=0;n<t;++n)a[n]=e*(r/e)**((n+1)/t)/r;return a.length=t,a},practical:(t,e,r,i=.5,a=[])=>{for(let n=0;n<t;++n){let s=(e+(r-e)*(n+1)/t)/r,o=e*(r/e)**((n+1)/t)/r;a[n]=Ur(s,o,i)}return a.length=t,a}};function Vc(t,e,r,i,a,n=[]){return Wc[t](e,r,i,a,n)}var za=new M,ka=new M,Yc=new N,Wa=new N,Qc=new Zt,Xc=new bc,jc={maxFar:null,farScale:1,splitMode:"practical",splitLambda:.5,margin:0,fade:!0},ti=class{constructor(e){this.cascades=[],this.mapSize=new P,this.cameraFrustum=new Zt,this.frusta=[],this.splits=[],this._far=0;let{cascadeCount:r,mapSize:i,maxFar:a,farScale:n,splitMode:s,splitLambda:o,margin:c,fade:u}={...jc,...e};this.cascadeCount=r,this.mapSize.copy(i),this.maxFar=a,this.farScale=n,this.splitMode=s,this.splitLambda=o,this.margin=c,this.fade=u}get cascadeCount(){return this.cascades.length}set cascadeCount(e){if(e!==this.cascadeCount){for(let r=0;r<e;++r)this.cascades[r]??={interval:new P,matrix:new N,inverseMatrix:new N,projectionMatrix:new N,inverseProjectionMatrix:new N,viewMatrix:new N,inverseViewMatrix:new N};this.cascades.length=e}}get far(){return this._far}updateIntervals(e){let r=this.cascadeCount,i=this.splits,a=this.far;Vc(this.splitMode,r,e.near,a,this.splitLambda,i),this.cameraFrustum.setFromCamera(e,a),this.cameraFrustum.split(i,this.frusta);let n=this.cascades;for(let s=0;s<r;++s)n[s].interval.set(i[s-1]??0,i[s]??0)}getFrustumRadius(e,r){let i=r.near,a=r.far,n=Math.max(a[0].distanceTo(a[2]),a[0].distanceTo(i[2]));if(this.fade){let s=e.near,o=this.far,c=a[0].z/(o-s);n+=.25*c**2*(o-s)}return n*.5}updateMatrices(e,r,i=1){let a=Yc.lookAt(za.setScalar(0),ka.copy(r).multiplyScalar(-1),Ba.DEFAULT_UP),n=Wa.multiplyMatrices(Wa.copy(a).invert(),e.matrixWorld),s=this.frusta,o=this.cascades;xe(s.length===o.length);let c=this.margin,u=this.mapSize;for(let h=0;h<s.length;++h){let f=s[h],A=o[h],w=this.getFrustumRadius(e,s[h]),b=-w,D=w,W=w,V=-w;A.projectionMatrix.makeOrthographic(b,D,W,V,-this.margin,w*2+this.margin);let{near:I,far:R}=Qc.copy(f).applyMatrix4(n),H=Xc.makeEmpty();for(let se=0;se<4;se++)H.expandByPoint(I[se]),H.expandByPoint(R[se]);let G=H.getCenter(za);G.z=H.max.z+c;let ve=(D-b)/u.width,Ee=(W-V)/u.height;G.x=Math.round(G.x/ve)*ve,G.y=Math.round(G.y/Ee)*Ee,G.applyMatrix4(a);let we=ka.copy(r).multiplyScalar(i).add(G);A.inverseViewMatrix.lookAt(G,we,Ba.DEFAULT_UP).setPosition(we)}}update(e,r,i){this._far=this.maxFar!=null?Math.min(this.maxFar,e.far*this.farScale):e.far*this.farScale,this.updateIntervals(e),this.updateMatrices(e,r,i);let a=this.cascades,n=this.cascadeCount;for(let s=0;s<n;++s){let{matrix:o,inverseMatrix:c,projectionMatrix:u,inverseProjectionMatrix:h,viewMatrix:f,inverseViewMatrix:A}=a[s];h.copy(u).invert(),f.copy(A).invert(),o.copy(u).multiply(f),c.copy(A).multiply(h)}}},Va=[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5],Za=Va.reduce((t,e,r)=>{let i=new P;for(let a=0;a<16;++a)if(Va[a]===r){i.set((a%4+.5)/4,(Math.floor(a/4)+.5)/4);break}return[...t,i]},[]),Kc={resolutionScale:1,lightShafts:!0,shapeDetail:!0,turbulence:!0,haze:!0,clouds:{multiScatteringOctaves:8,accurateSunSkyLight:!0,accuratePhaseFunction:!1,maxIterationCount:500,minStepSize:50,maxStepSize:1e3,maxRayDistance:2e5,perspectiveStepScale:1.01,minDensity:1e-5,minExtinction:1e-5,minTransmittance:.01,maxIterationCountToGround:3,maxIterationCountToSun:2,minSecondaryStepSize:100,secondaryStepScale:2,maxShadowLengthIterationCount:500,minShadowLengthStepSize:50,maxShadowLengthRayDistance:2e5},shadow:{cascadeCount:3,mapSize:new P(512,512),maxIterationCount:50,minStepSize:100,maxStepSize:1e3,minDensity:1e-5,minExtinction:1e-5,minTransmittance:1e-4}},m=Kc,Zc={low:{...m,lightShafts:!1,shapeDetail:!1,turbulence:!1,clouds:{...m.clouds,accurateSunSkyLight:!1,maxIterationCount:200,minStepSize:100,maxRayDistance:1e5,minDensity:1e-4,minExtinction:1e-4,minTransmittance:.1,maxIterationCountToGround:0,maxIterationCountToSun:1},shadow:{...m.shadow,maxIterationCount:25,minDensity:1e-4,minExtinction:1e-4,minTransmittance:.01,cascadeCount:2,mapSize:new P(256,256)}},medium:{...m,lightShafts:!1,turbulence:!1,clouds:{...m.clouds,minDensity:1e-4,minExtinction:1e-4,accurateSunSkyLight:!1,maxIterationCountToSun:2,maxIterationCountToGround:1},shadow:{...m.shadow,minDensity:1e-4,minExtinction:1e-4,mapSize:new P(256,256)}},high:m,ultra:{...m,clouds:{...m.clouds,minStepSize:10},shadow:{...m.shadow,mapSize:new P(1024,1024)}}},qc=`precision highp float;
precision highp sampler3D;
precision highp sampler2DArray;

#include <common>
#include <packing>

#include "core/depth"
#include "core/math"
#include "core/turbo"
#include "core/generators"
#include "core/raySphereIntersection"
#include "core/cascadedShadowMaps"
#include "core/interleavedGradientNoise"
#include "core/vogelDisk"

#include "atmosphere/bruneton/definitions"

uniform AtmosphereParameters ATMOSPHERE;
uniform vec3 SUN_SPECTRAL_RADIANCE_TO_LUMINANCE;
uniform vec3 SKY_SPECTRAL_RADIANCE_TO_LUMINANCE;

uniform sampler2D transmittance_texture;
uniform sampler3D scattering_texture;
uniform sampler2D irradiance_texture;
uniform sampler3D single_mie_scattering_texture;
uniform sampler3D higher_order_scattering_texture;

#include "atmosphere/bruneton/common"
#include "atmosphere/bruneton/runtime"

#include "types"
#include "parameters"
#include "clouds"

#if !defined(RECIPROCAL_PI4)
#define RECIPROCAL_PI4 0.07957747154594767
#endif // !defined(RECIPROCAL_PI4)

uniform sampler2D depthBuffer;
uniform mat4 viewMatrix;
uniform mat4 reprojectionMatrix;
uniform mat4 viewReprojectionMatrix;
uniform float cameraNear;
uniform float cameraFar;
uniform float cameraHeight;
uniform vec2 temporalJitter;
uniform vec2 targetUvScale;
uniform float mipLevelScale;

// Scattering
const vec2 scatterAnisotropy = vec2(SCATTER_ANISOTROPY_1, SCATTER_ANISOTROPY_2);
const float scatterAnisotropyMix = SCATTER_ANISOTROPY_MIX;
uniform float skyLightScale;
uniform float groundBounceScale;
uniform float powderScale;
uniform float powderExponent;

// Primary raymarch
uniform int maxIterationCount;
uniform float minStepSize;
uniform float maxStepSize;
uniform float maxRayDistance;
uniform float perspectiveStepScale;

// Secondary raymarch
uniform int maxIterationCountToSun;
uniform int maxIterationCountToGround;
uniform float minSecondaryStepSize;
uniform float secondaryStepScale;

// Beer shadow map
uniform sampler2DArray shadowBuffer;
uniform vec2 shadowTexelSize;
uniform vec2 shadowIntervals[SHADOW_CASCADE_COUNT];
uniform mat4 shadowMatrices[SHADOW_CASCADE_COUNT];
uniform float shadowFar;
uniform float maxShadowFilterRadius;

// Shadow length
#ifdef SHADOW_LENGTH
uniform int maxShadowLengthIterationCount;
uniform float minShadowLengthStepSize;
uniform float maxShadowLengthRayDistance;
#endif // SHADOW_LENGTH

in vec2 vUv;
in vec3 vCameraPosition;
in vec3 vCameraDirection; // Direction to the center of screen
in vec3 vRayDirection; // Direction to the texel
in vec3 vViewPosition;
in GroundIrradiance vGroundIrradiance;
in CloudsIrradiance vCloudsIrradiance;

layout(location = 0) out vec4 outputColor;
layout(location = 1) out vec3 outputDepthVelocity;
#ifdef SHADOW_LENGTH
layout(location = 2) out float outputShadowLength;
#endif // SHADOW_LENGTH

float getViewZ(const float depth) {
  #ifdef PERSPECTIVE_CAMERA
  return perspectiveDepthToViewZ(depth, cameraNear, cameraFar);
  #else // PERSPECTIVE_CAMERA
  return orthographicDepthToViewZ(depth, cameraNear, cameraFar);
  #endif // PERSPECTIVE_CAMERA
}

vec3 ecefToWorld(const vec3 positionECEF) {
  return (ecefToWorldMatrix * vec4(positionECEF - altitudeCorrection, 1.0)).xyz;
}

vec2 getShadowUv(const vec3 worldPosition, const int cascadeIndex) {
  vec4 clip = shadowMatrices[cascadeIndex] * vec4(worldPosition, 1.0);
  clip /= clip.w;
  return clip.xy * 0.5 + 0.5;
}

float getDistanceToShadowTop(const vec3 rayPosition) {
  // Distance to the top of the shadows along the sun direction, which matches
  // the ray origin of BSM.
  return raySphereSecondIntersection(
    rayPosition,
    sunDirection,
    vec3(0.0),
    bottomRadius + shadowTopHeight
  );
}

#ifdef DEBUG_SHOW_CASCADES

const vec3 cascadeColors[4] = vec3[4](
  vec3(1.0, 0.0, 0.0),
  vec3(0.0, 1.0, 0.0),
  vec3(0.0, 0.0, 1.0),
  vec3(1.0, 1.0, 0.0)
);

vec3 getCascadeColor(const vec3 rayPosition) {
  vec3 worldPosition = ecefToWorld(rayPosition);
  int cascadeIndex = getCascadeIndex(
    viewMatrix,
    worldPosition,
    shadowIntervals,
    cameraNear,
    shadowFar
  );
  vec2 uv = getShadowUv(worldPosition, cascadeIndex);
  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
    return vec3(1.0);
  }
  return cascadeColors[cascadeIndex];
}

vec3 getFadedCascadeColor(const vec3 rayPosition, const float jitter) {
  vec3 worldPosition = ecefToWorld(rayPosition);
  int cascadeIndex = getFadedCascadeIndex(
    viewMatrix,
    worldPosition,
    shadowIntervals,
    cameraNear,
    shadowFar,
    jitter
  );
  return cascadeIndex >= 0
    ? cascadeColors[cascadeIndex]
    : vec3(1.0);
}

#endif // DEBUG_SHOW_CASCADES

float readShadowOpticalDepth(
  const vec2 uv,
  const float distanceToTop,
  const float distanceOffset,
  const int cascadeIndex
) {
  // r: frontDepth, g: meanExtinction, b: maxOpticalDepth, a: maxOpticalDepthTail
  // Also see the discussion here: https://x.com/shotamatsuda/status/1885322308908442106
  vec4 shadow = texture(shadowBuffer, vec3(uv, float(cascadeIndex)));
  float distanceToFront = max(0.0, distanceToTop - distanceOffset - shadow.r);
  return min(shadow.b + shadow.a, shadow.g * distanceToFront);
}

float sampleShadowOpticalDepthPCF(
  const vec3 worldPosition,
  const float distanceToTop,
  const float distanceOffset,
  const float radius,
  const int cascadeIndex
) {
  vec2 uv = getShadowUv(worldPosition, cascadeIndex);
  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
    return 0.0;
  }
  if (radius < 0.1) {
    return readShadowOpticalDepth(uv, distanceToTop, distanceOffset, cascadeIndex);
  }
  float sum = 0.0;
  vec2 offset;
  #pragma unroll_loop_start
  for (int i = 0; i < 16; ++i) {
    #if UNROLLED_LOOP_INDEX < SHADOW_SAMPLE_COUNT
    offset = vogelDisk(
      UNROLLED_LOOP_INDEX,
      SHADOW_SAMPLE_COUNT,
      interleavedGradientNoise(gl_FragCoord.xy + temporalJitter * resolution) * PI2
    );
    sum += readShadowOpticalDepth(
      uv + offset * radius * shadowTexelSize,
      distanceToTop,
      distanceOffset,
      cascadeIndex
    );
    #endif // UNROLLED_LOOP_INDEX < SHADOW_SAMPLE_COUNT
  }
  #pragma unroll_loop_end
  return sum / float(SHADOW_SAMPLE_COUNT);
}

float sampleShadowOpticalDepth(
  const vec3 rayPosition,
  const float distanceOffset,
  const float radius,
  const float jitter
) {
  float distanceToTop = getDistanceToShadowTop(rayPosition);
  if (distanceToTop <= 0.0) {
    return 0.0;
  }
  vec3 worldPosition = ecefToWorld(rayPosition);
  int cascadeIndex = getFadedCascadeIndex(
    viewMatrix,
    worldPosition,
    shadowIntervals,
    cameraNear,
    shadowFar,
    jitter
  );
  return cascadeIndex >= 0
    ? sampleShadowOpticalDepthPCF(
      worldPosition,
      distanceToTop,
      distanceOffset,
      radius,
      cascadeIndex
    )
    : 0.0;
}

#ifdef DEBUG_SHOW_SHADOW_MAP
vec4 getCascadedShadowMaps(vec2 uv) {
  vec4 coord = vec4(vUv, vUv - 0.5) * 2.0;
  vec4 shadow = vec4(0.0);
  if (uv.y > 0.5) {
    if (uv.x < 0.5) {
      shadow = texture(shadowBuffer, vec3(coord.xw, 0.0));
    } else {
      #if SHADOW_CASCADE_COUNT > 1
      shadow = texture(shadowBuffer, vec3(coord.zw, 1.0));
      #endif // SHADOW_CASCADE_COUNT > 1
    }
  } else {
    if (uv.x < 0.5) {
      #if SHADOW_CASCADE_COUNT > 2
      shadow = texture(shadowBuffer, vec3(coord.xy, 2.0));
      #endif // SHADOW_CASCADE_COUNT > 2
    } else {
      #if SHADOW_CASCADE_COUNT > 3
      shadow = texture(shadowBuffer, vec3(coord.zy, 3.0));
      #endif // SHADOW_CASCADE_COUNT > 3
    }
  }

  #if !defined(DEBUG_SHOW_SHADOW_MAP_TYPE)
  #define DEBUG_SHOW_SHADOW_MAP_TYPE 0
  #endif // !defined(DEBUG_SHOW_SHADOW_MAP_TYPE

  const float frontDepthScale = 1e-5;
  const float meanExtinctionScale = 10.0;
  const float maxOpticalDepthScale = 0.01;
  vec3 color;
  #if DEBUG_SHOW_SHADOW_MAP_TYPE == 1
  color = vec3(shadow.r * frontDepthScale);
  #elif DEBUG_SHOW_SHADOW_MAP_TYPE == 2
  color = vec3(shadow.g * meanExtinctionScale);
  #elif DEBUG_SHOW_SHADOW_MAP_TYPE == 3
  color = vec3((shadow.b + shadow.a) * maxOpticalDepthScale);
  #else // DEBUG_SHOW_SHADOW_MAP_TYPE
  color =
    (shadow.rgb + vec3(0.0, 0.0, shadow.a)) *
    vec3(frontDepthScale, meanExtinctionScale, maxOpticalDepthScale);
  #endif // DEBUG_SHOW_SHADOW_MAP_TYPE
  return vec4(color, 1.0);
}
#endif // DEBUG_SHOW_SHADOW_MAP

vec2 henyeyGreenstein(const vec2 g, const float cosTheta) {
  vec2 g2 = g * g;
  // prettier-ignore
  return RECIPROCAL_PI4 *
    ((1.0 - g2) / max(vec2(1e-7), pow(1.0 + g2 - 2.0 * g * cosTheta, vec2(1.5))));
}

#ifdef ACCURATE_PHASE_FUNCTION

float draine(float u, float g, float a) {
  float g2 = g * g;
  // prettier-ignore
  return (1.0 - g2) *
    (1.0 + a * u * u) /
    (4.0 * (1.0 + a * (1.0 + 2.0 * g2) / 3.0) * PI * pow(1.0 + g2 - 2.0 * g * u, 1.5));
}

// Numerically-fitted large particles (d=10) phase function It won't be
// plausible without a more precise multiple scattering.
// Reference: https://research.nvidia.com/labs/rtr/approximate-mie/
float phaseFunction(const float cosTheta, const float attenuation) {
  const float gHG = 0.988176691700256; // exp(-0.0990567/(d-1.67154))
  const float gD = 0.5556712547839497; // exp(-2.20679/(d+3.91029) - 0.428934)
  const float alpha = 21.995520856274638; // exp(3.62489 - 8.29288/(d+5.52825))
  const float weight = 0.4819554318404214; // exp(-0.599085/(d-0.641583)-0.665888)
  return mix(
    henyeyGreenstein(vec2(gHG) * attenuation, cosTheta).x,
    draine(cosTheta, gD * attenuation, alpha),
    weight
  );
}

#else // ACCURATE_PHASE_FUNCTION

float phaseFunction(const float cosTheta, const float attenuation) {
  const vec2 g = scatterAnisotropy;
  const vec2 weights = vec2(1.0 - scatterAnisotropyMix, scatterAnisotropyMix);
  // A similar approximation is described in the Frostbite's paper, where phase
  // angle is attenuated instead of anisotropy.
  return dot(henyeyGreenstein(g * attenuation, cosTheta), weights);
}

#endif // ACCURATE_PHASE_FUNCTION

float phaseFunction(const float cosTheta) {
  return phaseFunction(cosTheta, 1.0);
}

float marchOpticalDepth(
  const vec3 rayOrigin,
  const vec3 rayDirection,
  const int maxIterationCount,
  const float mipLevel,
  const float jitter,
  out float rayDistance
) {
  int iterationCount = int(
    max(0.0, remap(mipLevel, 0.0, 1.0, float(maxIterationCount + 1), 1.0) - jitter)
  );
  if (iterationCount == 0) {
    // Fudge factor to approximate the mean optical depth.
    // TODO: Remove it.
    return 0.5;
  }
  float stepSize = minSecondaryStepSize / float(iterationCount);
  float nextDistance = stepSize * jitter;
  float opticalDepth = 0.0;
  for (int i = 0; i < iterationCount; ++i) {
    rayDistance = nextDistance;
    vec3 position = rayDistance * rayDirection + rayOrigin;
    vec2 uv = getGlobeUv(position);
    float height = length(position) - bottomRadius;
    WeatherSample weather = sampleWeather(uv, height, mipLevel);
    MediaSample media = sampleMedia(weather, position, uv, mipLevel, jitter);
    opticalDepth += media.extinction * stepSize;
    nextDistance += stepSize;
    stepSize *= secondaryStepScale;
  }
  return opticalDepth;
}

float marchOpticalDepth(
  const vec3 rayOrigin,
  const vec3 rayDirection,
  const int maxIterationCount,
  const float mipLevel,
  const float jitter
) {
  float rayDistance;
  return marchOpticalDepth(
    rayOrigin,
    rayDirection,
    maxIterationCount,
    mipLevel,
    jitter,
    rayDistance
  );
}

float approximateMultipleScattering(const float opticalDepth, const float cosTheta) {
  // Multiple scattering approximation
  // See: https://fpsunflower.github.io/ckulla/data/oz_volumes.pdf
  // a: attenuation, b: contribution, c: phase attenuation
  vec3 coeffs = vec3(1.0); // [a, b, c]
  const vec3 attenuation = vec3(0.5, 0.5, 0.5); // Should satisfy a <= b
  float scattering = 0.0;
  float beerLambert;
  #pragma unroll_loop_start
  for (int i = 0; i < 12; ++i) {
    #if UNROLLED_LOOP_INDEX < MULTI_SCATTERING_OCTAVES
    beerLambert = exp(-opticalDepth * coeffs.y);
    scattering += coeffs.x * beerLambert * phaseFunction(cosTheta, coeffs.z);
    coeffs *= attenuation;
    #endif // UNROLLED_LOOP_INDEX < MULTI_SCATTERING_OCTAVES
  }
  #pragma unroll_loop_end
  return scattering;
}

// TODO: Construct spherical harmonics of degree 2 using 2 sample points
// positioned near the horizon occlusion points on the sun direction plane.
vec3 getGroundSunSkyIrradiance(
  const vec3 position,
  const vec3 surfaceNormal,
  const float height,
  out vec3 skyIrradiance
) {
  #ifdef ACCURATE_SUN_SKY_LIGHT
  return GetSunAndSkyIrradiance(
    (position - surfaceNormal * height) * METER_TO_LENGTH_UNIT,
    surfaceNormal,
    sunDirection,
    skyIrradiance
  );
  #else // ACCURATE_SUN_SKY_LIGHT
  skyIrradiance = vGroundIrradiance.sky;
  return vGroundIrradiance.sun;
  #endif // ACCURATE_SUN_SKY_LIGHT
}

vec3 getCloudsSunSkyIrradiance(const vec3 position, const float height, out vec3 skyIrradiance) {
  #ifdef ACCURATE_SUN_SKY_LIGHT
  return GetSunAndSkyScalarIrradiance(position * METER_TO_LENGTH_UNIT, sunDirection, skyIrradiance);
  #else // ACCURATE_SUN_SKY_LIGHT
  float alpha = remapClamped(height, minHeight, maxHeight);
  skyIrradiance = mix(vCloudsIrradiance.minSky, vCloudsIrradiance.maxSky, alpha);
  return mix(vCloudsIrradiance.minSun, vCloudsIrradiance.maxSun, alpha);
  #endif // ACCURATE_SUN_SKY_LIGHT
}

#ifdef GROUND_BOUNCE
vec3 approximateRadianceFromGround(
  const vec3 position,
  const vec3 surfaceNormal,
  const float height,
  const float mipLevel,
  const float jitter
) {
  float opticalDepthToGround = marchOpticalDepth(
    position,
    -surfaceNormal,
    maxIterationCountToGround,
    mipLevel,
    jitter
  );
  vec3 skyIrradiance;
  vec3 sunIrradiance = getGroundSunSkyIrradiance(position, surfaceNormal, height, skyIrradiance);
  const float groundAlbedo = 0.3;
  vec3 groundIrradiance = skyIrradiance + (1.0 - coverage) * sunIrradiance;
  vec3 bouncedRadiance = groundAlbedo * RECIPROCAL_PI * groundIrradiance;
  return bouncedRadiance * exp(-opticalDepthToGround);
}
#endif // GROUND_BOUNCE

vec4 marchClouds(
  const vec3 rayOrigin,
  const vec3 rayDirection,
  const vec2 rayNearFar,
  const float cosTheta,
  const float jitter,
  const float rayStartTexelsPerPixel,
  out float frontDepth,
  out ivec3 sampleCount
) {
  vec3 radianceIntegral = vec3(0.0);
  float transmittanceIntegral = 1.0;
  float weightedDistanceSum = 0.0;
  float transmittanceSum = 0.0;

  float maxRayDistance = rayNearFar.y - rayNearFar.x;
  float stepSize = minStepSize + (perspectiveStepScale - 1.0) * rayNearFar.x;
  // I don't understand why spatial aliasing remains unless doubling the jitter.
  float rayDistance = stepSize * jitter * 2.0;

  for (int i = 0; i < maxIterationCount; ++i) {
    if (rayDistance > maxRayDistance) {
      break; // Termination
    }

    vec3 position = rayDistance * rayDirection + rayOrigin;
    float height = length(position) - bottomRadius;
    float mipLevel = log2(max(1.0, rayStartTexelsPerPixel + rayDistance * 1e-5));

    #if !defined(DEBUG_MARCH_INTERVALS)
    if (insideLayerIntervals(height)) {
      stepSize *= perspectiveStepScale;
      rayDistance += mix(stepSize, maxStepSize, min(1.0, mipLevel));
      continue;
    }
    #endif // !defined(DEBUG_MARCH_INTERVALS)

    // Sample rough weather.
    vec2 uv = getGlobeUv(position);
    WeatherSample weather = sampleWeather(uv, height, mipLevel);

    #ifdef DEBUG_SHOW_SAMPLE_COUNT
    ++sampleCount.x;
    #endif // DEBUG_SHOW_SAMPLE_COUNT

    if (!any(greaterThan(weather.density, vec4(minDensity)))) {
      // Step longer in empty space.
      // TODO: This produces banding artifacts.
      // Possible improvement: Binary search refinement
      stepSize *= perspectiveStepScale;
      rayDistance += mix(stepSize, maxStepSize, min(1.0, mipLevel));
      continue;
    }

    // Sample detailed participating media.
    MediaSample media = sampleMedia(weather, position, uv, mipLevel, jitter, sampleCount);

    if (media.extinction > minExtinction) {
      vec3 skyIrradiance;
      vec3 sunIrradiance = getCloudsSunSkyIrradiance(position, height, skyIrradiance);
      vec3 surfaceNormal = normalize(position);

      // March optical depth to the sun for finer details, which BSM lacks.
      float sunRayDistance = 0.0;
      float opticalDepth = marchOpticalDepth(
        position,
        sunDirection,
        maxIterationCountToSun,
        mipLevel,
        jitter,
        sunRayDistance
      );

      if (height < shadowTopHeight) {
        // Obtain the optical depth from BSM at the ray position.
        opticalDepth += sampleShadowOpticalDepth(
          position,
          // Take account of only positions further than the marched ray
          // distance.
          sunRayDistance,
          // Apply PCF only when the sun is close to the horizon.
          maxShadowFilterRadius * remapClamped(dot(sunDirection, surfaceNormal), 0.1, 0.0),
          jitter
        );
      }

      vec3 radiance = sunIrradiance * approximateMultipleScattering(opticalDepth, cosTheta);

      #ifdef GROUND_BOUNCE
      // Fudge factor for the irradiance from ground.
      if (height < shadowTopHeight && mipLevel < 0.5) {
        vec3 groundRadiance = approximateRadianceFromGround(
          position,
          surfaceNormal,
          height,
          mipLevel,
          jitter
        );
        radiance += groundRadiance * RECIPROCAL_PI4 * groundBounceScale;
      }
      #endif // GROUND_BOUNCE

      // Crude approximation of sky gradient. Better than none in the shadows.
      float skyGradient = dot(weather.heightFraction * 0.5 + 0.5, media.weight);
      radiance += skyIrradiance * RECIPROCAL_PI4 * skyGradient * skyLightScale;

      // Finally multiply by scattering.
      radiance *= media.scattering;

      #ifdef POWDER
      radiance *= 1.0 - powderScale * exp(-media.extinction * powderExponent);
      #endif // POWDER

      #ifdef DEBUG_SHOW_CASCADES
      if (height < shadowTopHeight) {
        radiance = 1e-3 * getFadedCascadeColor(position, jitter);
      }
      #endif // DEBUG_SHOW_CASCADES

      // Energy-conserving analytical integration of scattered light
      // See 5.6.3 in https://media.contentapi.ea.com/content/dam/eacom/frostbite/files/s2016-pbs-frostbite-sky-clouds-new.pdf
      float transmittance = exp(-media.extinction * stepSize);
      float clampedExtinction = max(media.extinction, 1e-7);
      vec3 scatteringIntegral = (radiance - radiance * transmittance) / clampedExtinction;
      radianceIntegral += transmittanceIntegral * scatteringIntegral;
      transmittanceIntegral *= transmittance;

      // Aerial perspective affecting clouds
      // See 5.9.1 in https://media.contentapi.ea.com/content/dam/eacom/frostbite/files/s2016-pbs-frostbite-sky-clouds-new.pdf
      weightedDistanceSum += rayDistance * transmittanceIntegral;
      transmittanceSum += transmittanceIntegral;
    }

    if (transmittanceIntegral <= minTransmittance) {
      break; // Early termination
    }

    // Take a shorter step because we've already hit the clouds.
    stepSize *= perspectiveStepScale;
    rayDistance += stepSize;
  }

  // The final product of 5.9.1 and we'll evaluate this in aerial perspective.
  frontDepth = transmittanceSum > 0.0 ? weightedDistanceSum / transmittanceSum : -1.0;

  return vec4(radianceIntegral, remapClamped(transmittanceIntegral, 1.0, minTransmittance));
}

#ifdef SHADOW_LENGTH

float marchShadowLength(
  const vec3 rayOrigin,
  const vec3 rayDirection,
  const vec2 rayNearFar,
  const float jitter
) {
  float shadowLength = 0.0;
  float maxRayDistance = rayNearFar.y - rayNearFar.x;
  float stepSize = minShadowLengthStepSize;
  float rayDistance = stepSize * jitter;
  const float attenuationFactor = 1.0 - 5e-4;
  float attenuation = 1.0;

  // TODO: This march is closed, and sample resolution can be much lower.
  // Refining the termination by binary search will make it much more efficient.
  for (int i = 0; i < maxShadowLengthIterationCount; ++i) {
    if (rayDistance > maxRayDistance) {
      break; // Termination
    }
    vec3 position = rayDistance * rayDirection + rayOrigin;
    float opticalDepth = sampleShadowOpticalDepth(position, 0.0, 0.0, jitter);
    shadowLength += (1.0 - exp(-opticalDepth)) * stepSize * attenuation;
    stepSize *= perspectiveStepScale;
    rayDistance += stepSize;
  }
  return shadowLength;
}

#endif // SHADOW_LENGTH

#ifdef HAZE

vec4 approximateHaze(
  const vec3 rayOrigin,
  const vec3 rayDirection,
  const float maxRayDistance,
  const float cosTheta,
  const float shadowLength
) {
  float modulation = remapClamped(coverage, 0.2, 0.4);
  if (cameraHeight * modulation < 0.0) {
    return vec4(0.0);
  }
  float density = modulation * hazeDensityScale * exp(-cameraHeight * hazeExponent);
  if (density < 1e-7) {
    return vec4(0.0); // Prevent artifact in views from space
  }

  // Blend two normals by the difference in angle so that normal near the
  // ground becomes that of the origin, and in the sky that of the horizon.
  vec3 normalAtOrigin = normalize(rayOrigin);
  vec3 normalAtHorizon = (rayOrigin - dot(rayOrigin, rayDirection) * rayDirection) / bottomRadius;
  float alpha = remapClamped(dot(normalAtOrigin, normalAtHorizon), 0.9, 1.0);
  vec3 normal = mix(normalAtOrigin, normalAtHorizon, alpha);

  // Analytical optical depth where density exponentially decreases with height.
  // Based on: https://iquilezles.org/articles/fog/
  float angle = max(dot(normal, rayDirection), 1e-5);
  float exponent = angle * hazeExponent;
  float linearTerm = density / hazeExponent / angle;

  // Derive the optical depths separately for with and without shadow length.
  float expTerm = 1.0 - exp(-maxRayDistance * exponent);
  float shadowExpTerm = 1.0 - exp(-min(maxRayDistance, shadowLength) * exponent);
  float opticalDepth = expTerm * linearTerm;
  float shadowOpticalDepth = max((expTerm - shadowExpTerm) * linearTerm, 0.0);
  float transmittance = saturate(1.0 - exp(-opticalDepth));
  float shadowTransmittance = saturate(1.0 - exp(-shadowOpticalDepth));

  vec3 skyIrradiance = vGroundIrradiance.sky;
  vec3 sunIrradiance = vGroundIrradiance.sun;
  vec3 inscatter = sunIrradiance * phaseFunction(cosTheta) * shadowTransmittance;
  inscatter += skyIrradiance * RECIPROCAL_PI4 * skyLightScale * transmittance;
  inscatter *= hazeScatteringCoefficient / (hazeAbsorptionCoefficient + hazeScatteringCoefficient);
  return vec4(inscatter, transmittance);
}

#endif // HAZE

void applyAerialPerspective(
  const vec3 cameraPosition,
  const vec3 frontPosition,
  const float shadowLength,
  inout vec4 color
) {
  vec3 transmittance;
  vec3 inscatter = GetSkyRadianceToPoint(
    cameraPosition * METER_TO_LENGTH_UNIT,
    frontPosition * METER_TO_LENGTH_UNIT,
    shadowLength * METER_TO_LENGTH_UNIT,
    sunDirection,
    transmittance
  );
  color.rgb = color.rgb * transmittance + inscatter * color.a;
}

bool rayIntersectsGround(const vec3 cameraPosition, const vec3 rayDirection) {
  float r = length(cameraPosition);
  float mu = dot(cameraPosition, rayDirection) / r;
  return mu < 0.0 && r * r * (mu * mu - 1.0) + bottomRadius * bottomRadius >= 0.0;
}

struct IntersectionResult {
  bool ground;
  vec4 first;
  vec4 second;
};

IntersectionResult getIntersections(const vec3 cameraPosition, const vec3 rayDirection) {
  IntersectionResult intersections;
  intersections.ground = rayIntersectsGround(cameraPosition, rayDirection);
  raySphereIntersections(
    cameraPosition,
    rayDirection,
    bottomRadius + vec4(0.0, minHeight, maxHeight, shadowTopHeight),
    intersections.first,
    intersections.second
  );
  return intersections;
}

vec2 getRayNearFar(const IntersectionResult intersections) {
  vec2 nearFar;
  if (cameraHeight < minHeight) {
    // View below the clouds
    if (intersections.ground) {
      nearFar = vec2(-1.0); // No clouds to the ground
    } else {
      nearFar = vec2(intersections.second.y, intersections.second.z);
      nearFar.y = min(nearFar.y, maxRayDistance);
    }
  } else if (cameraHeight < maxHeight) {
    // View inside the total cloud layer
    if (intersections.ground) {
      nearFar = vec2(cameraNear, intersections.first.y);
    } else {
      nearFar = vec2(cameraNear, intersections.second.z);
    }
  } else {
    // View above the clouds
    nearFar = vec2(intersections.first.z, intersections.second.z);
    if (intersections.ground) {
      // Clamp the ray at the min height.
      nearFar.y = intersections.first.y;
    }
  }
  return nearFar;
}

#ifdef SHADOW_LENGTH
vec2 getShadowRayNearFar(const IntersectionResult intersections) {
  vec2 nearFar;
  if (cameraHeight < shadowTopHeight) {
    if (intersections.ground) {
      nearFar = vec2(cameraNear, intersections.first.x);
    } else {
      nearFar = vec2(cameraNear, intersections.second.w);
    }
  } else {
    nearFar = vec2(intersections.first.w, intersections.second.w);
    if (intersections.ground) {
      // Clamp the ray at the ground.
      nearFar.y = intersections.first.x;
    }
  }
  nearFar.y = min(nearFar.y, maxShadowLengthRayDistance);
  return nearFar;
}
#endif // SHADOW_LENGTH

#ifdef HAZE
vec2 getHazeRayNearFar(const IntersectionResult intersections) {
  vec2 nearFar;
  if (cameraHeight < maxHeight) {
    if (intersections.ground) {
      nearFar = vec2(cameraNear, intersections.first.x);
    } else {
      nearFar = vec2(cameraNear, intersections.second.z);
    }
  } else {
    nearFar = vec2(cameraNear, intersections.second.z);
    if (intersections.ground) {
      // Clamp the ray at the ground.
      nearFar.y = intersections.first.x;
    }
  }
  return nearFar;
}
#endif // HAZE

float getRayDistanceToScene(const vec3 rayDirection, out float viewZ) {
  float depth = readDepthValue(depthBuffer, vUv * targetUvScale + temporalJitter);
  if (depth < 1.0 - 1e-7) {
    depth = reverseLogDepth(depth, cameraNear, cameraFar);
    viewZ = getViewZ(depth);
    return -viewZ / dot(rayDirection, vCameraDirection);
  }
  viewZ = 0.0;
  return 0.0;
}

void main() {
  #ifdef DEBUG_SHOW_SHADOW_MAP
  outputColor = getCascadedShadowMaps(vUv);
  outputDepthVelocity = vec3(0.0);
  #ifdef SHADOW_LENGTH
  outputShadowLength = 0.0;
  #endif // SHADOW_LENGTH
  return;
  #endif // DEBUG_SHOW_SHADOW_MAP

  vec3 cameraPosition = vCameraPosition + altitudeCorrection;
  vec3 rayDirection = normalize(vRayDirection);
  float cosTheta = dot(sunDirection, rayDirection);

  IntersectionResult intersections = getIntersections(cameraPosition, rayDirection);
  vec2 rayNearFar = getRayNearFar(intersections);
  #ifdef SHADOW_LENGTH
  vec2 shadowRayNearFar = getShadowRayNearFar(intersections);
  #endif // SHADOW_LENGTH
  #ifdef HAZE
  vec2 hazeRayNearFar = getHazeRayNearFar(intersections);
  #endif // HAZE

  float sceneViewZ;
  float rayDistanceToScene = getRayDistanceToScene(rayDirection, sceneViewZ);
  if (rayDistanceToScene > 0.0) {
    rayNearFar.y = min(rayNearFar.y, rayDistanceToScene);
    #ifdef SHADOW_LENGTH
    shadowRayNearFar.y = min(shadowRayNearFar.y, rayDistanceToScene);
    #endif // SHADOW_LENGTH
    #ifdef HAZE
    hazeRayNearFar.y = min(hazeRayNearFar.y, rayDistanceToScene);
    #endif // HAZE
  }

  bool intersectsGround = any(lessThan(rayNearFar, vec2(0.0)));
  bool intersectsScene = rayNearFar.y < rayNearFar.x;

  float stbn = getSTBN();

  vec4 color = vec4(0.0);
  float frontDepth = rayNearFar.y;
  vec3 depthVelocity = vec3(0.0);
  float shadowLength = 0.0;
  bool hitClouds = false;

  if (!intersectsGround && !intersectsScene) {
    vec3 rayOrigin = rayNearFar.x * rayDirection + cameraPosition;

    vec2 globeUv = getGlobeUv(rayOrigin);
    #ifdef DEBUG_SHOW_UV
    outputColor = vec4(vec3(checker(globeUv, localWeatherRepeat + localWeatherOffset)), 1.0);
    outputDepthVelocity = vec3(0.0);
    #ifdef SHADOW_LENGTH
    outputShadowLength = 0.0;
    #endif // SHADOW_LENGTH
    return;
    #endif // DEBUG_SHOW_UV

    float mipLevel = getMipLevel(globeUv * localWeatherRepeat) * mipLevelScale;
    mipLevel = mix(0.0, mipLevel, min(1.0, 0.2 * cameraHeight / maxHeight));

    float marchedFrontDepth;
    ivec3 sampleCount = ivec3(0);
    color = marchClouds(
      rayOrigin,
      rayDirection,
      rayNearFar,
      cosTheta,
      stbn,
      pow(2.0, mipLevel),
      marchedFrontDepth,
      sampleCount
    );

    #ifdef DEBUG_SHOW_SAMPLE_COUNT
    outputColor = vec4(vec3(sampleCount) / vec3(500.0, 5.0, 5.0), 1.0);
    outputDepthVelocity = vec3(0.0);
    #ifdef SHADOW_LENGTH
    outputShadowLength = 0.0;
    #endif // SHADOW_LENGTH
    return;
    #endif // DEBUG_SHOW_SAMPLE_COUNT

    // Front depth will be -1.0 when no samples are accumulated.
    hitClouds = marchedFrontDepth >= 0.0;
    if (hitClouds) {
      frontDepth = rayNearFar.x + marchedFrontDepth;

      #ifdef SHADOW_LENGTH
      // Clamp the shadow length ray at the clouds.
      shadowRayNearFar.y = mix(
        shadowRayNearFar.y,
        min(frontDepth, shadowRayNearFar.y),
        color.a // Interpolate by the alpha for smoother edges.
      );

      // Shadow length must be computed before applying aerial perspective.
      if (all(greaterThanEqual(shadowRayNearFar, vec2(0.0)))) {
        shadowLength = marchShadowLength(
          shadowRayNearFar.x * rayDirection + cameraPosition,
          rayDirection,
          shadowRayNearFar,
          stbn
        );
      }
      #endif // SHADOW_LENGTH

      #ifdef HAZE
      // Clamp the haze ray at the clouds.
      hazeRayNearFar.y = mix(
        hazeRayNearFar.y,
        min(frontDepth, hazeRayNearFar.y),
        color.a // Interpolate by the alpha for smoother edges.
      );
      #endif // HAZE

      // Apply aerial perspective.
      vec3 frontPosition = cameraPosition + frontDepth * rayDirection;
      applyAerialPerspective(cameraPosition, frontPosition, shadowLength, color);

      // Velocity for temporal resolution.
      vec3 frontPositionWorld = ecefToWorld(frontPosition);
      vec4 prevClip = reprojectionMatrix * vec4(frontPositionWorld, 1.0);
      prevClip /= prevClip.w;
      vec2 prevUv = prevClip.xy * 0.5 + 0.5;
      vec2 velocity = vUv - prevUv;
      depthVelocity = vec3(frontDepth, velocity);
    }
  }

  if (!hitClouds) {
    #ifdef SHADOW_LENGTH
    if (all(greaterThanEqual(shadowRayNearFar, vec2(0.0)))) {
      shadowLength = marchShadowLength(
        shadowRayNearFar.x * rayDirection + cameraPosition,
        rayDirection,
        shadowRayNearFar,
        stbn
      );
    }
    #endif // SHADOW_LENGTH

    // Velocity for temporal resolution. Here reproject in the view space for
    // greatly reducing the precision errors.
    frontDepth = sceneViewZ < 0.0 ? -sceneViewZ : cameraFar;
    vec3 frontView = vViewPosition * frontDepth;
    vec4 prevClip = viewReprojectionMatrix * vec4(frontView, 1.0);
    prevClip /= prevClip.w;
    vec2 prevUv = prevClip.xy * 0.5 + 0.5;
    vec2 velocity = vUv - prevUv;
    depthVelocity = vec3(frontDepth, velocity);
  }

  #ifdef DEBUG_SHOW_FRONT_DEPTH
  outputColor = vec4(turbo(frontDepth / maxRayDistance), 1.0);
  outputDepthVelocity = vec3(0.0);
  #ifdef SHADOW_LENGTH
  outputShadowLength = 0.0;
  #endif // SHADOW_LENGTH
  return;
  #endif // DEBUG_SHOW_FRONT_DEPTH

  #ifdef HAZE
  vec4 haze = approximateHaze(
    cameraNear * rayDirection + cameraPosition,
    rayDirection,
    hazeRayNearFar.y - hazeRayNearFar.x,
    cosTheta,
    shadowLength
  );
  color.rgb = mix(color.rgb, haze.rgb, haze.a);
  color.a = color.a * (1.0 - haze.a) + haze.a;
  #endif // HAZE

  outputColor = color;
  outputDepthVelocity = depthVelocity;
  #ifdef SHADOW_LENGTH
  outputShadowLength = shadowLength * METER_TO_LENGTH_UNIT;
  #endif // SHADOW_LENGTH
}
`,qa=`float getSTBN() {
  ivec3 size = textureSize(stbnTexture, 0);
  vec3 scale = 1.0 / vec3(size);
  return texture(stbnTexture, vec3(gl_FragCoord.xy, float(frame % size.z)) * scale).r;
}

// Straightforward spherical mapping
vec2 getSphericalUv(const vec3 position) {
  vec2 st = normalize(position.yx);
  float phi = atan(st.x, st.y);
  float theta = asin(normalize(position).z);
  return vec2(phi * RECIPROCAL_PI2 + 0.5, theta * RECIPROCAL_PI + 0.5);
}

vec2 getCubeSphereUv(const vec3 position) {
  // Cube-sphere relaxation by: http://mathproofs.blogspot.com/2005/07/mapping-cube-to-sphere.html
  // TODO: Tile and fix seams.
  // Possible improvements:
  // https://iquilezles.org/articles/texturerepetition/
  // https://gamedev.stackexchange.com/questions/184388/fragment-shader-map-dot-texture-repeatedly-over-the-sphere
  // https://github.com/mmikk/hextile-demo

  vec3 n = normalize(position);
  vec3 f = abs(n);
  vec3 c = n / max(f.x, max(f.y, f.z));
  vec2 m;
  if (all(greaterThan(f.yy, f.xz))) {
    m = c.y > 0.0 ? vec2(-n.x, n.z) : n.xz;
  } else if (all(greaterThan(f.xx, f.yz))) {
    m = c.x > 0.0 ? n.yz : vec2(-n.y, n.z);
  } else {
    m = c.z > 0.0 ? n.xy : vec2(n.x, -n.y);
  }

  vec2 m2 = m * m;
  float q = dot(m2.xy, vec2(-2.0, 2.0)) - 3.0;
  float q2 = q * q;
  vec2 uv;
  uv.x = sqrt(1.5 + m2.x - m2.y - 0.5 * sqrt(-24.0 * m2.x + q2)) * (m.x > 0.0 ? 1.0 : -1.0);
  uv.y = sqrt(6.0 / (3.0 - uv.x * uv.x)) * m.y;
  return uv * 0.5 + 0.5;
}

vec2 getGlobeUv(const vec3 position) {
  return getCubeSphereUv(position);
}

float getMipLevel(const vec2 uv) {
  const float mipLevelScale = 0.1;
  vec2 coord = uv * resolution;
  vec2 ddx = dFdx(coord);
  vec2 ddy = dFdy(coord);
  float deltaMaxSqr = max(dot(ddx, ddx), dot(ddy, ddy)) * mipLevelScale;
  return max(0.0, 0.5 * log2(max(1.0, deltaMaxSqr)));
}

bool insideLayerIntervals(const float height) {
  bvec3 gt = greaterThan(vec3(height), minIntervalHeights);
  bvec3 lt = lessThan(vec3(height), maxIntervalHeights);
  return any(bvec3(gt.x && lt.x, gt.y && lt.y, gt.z && lt.z));
}

struct WeatherSample {
  vec4 heightFraction; // Normalized height of each layer
  vec4 density;
};

vec4 shapeAlteringFunction(const vec4 heightFraction, const vec4 bias) {
  // Apply a semi-circle transform to round the clouds towards the top.
  vec4 biased = pow(heightFraction, bias);
  vec4 x = clamp(biased * 2.0 - 1.0, -1.0, 1.0);
  return 1.0 - x * x;
}

WeatherSample sampleWeather(const vec2 uv, const float height, const float mipLevel) {
  WeatherSample weather;
  weather.heightFraction = remapClamped(vec4(height), minLayerHeights, maxLayerHeights);

  vec4 localWeather = pow(
    textureLod(
      localWeatherTexture,
      uv * localWeatherRepeat + localWeatherOffset,
      mipLevel
    ).LOCAL_WEATHER_CHANNELS,
    weatherExponents
  );
  #ifdef SHADOW
  localWeather *= shadowLayerMask;
  #endif // SHADOW

  vec4 heightScale = shapeAlteringFunction(weather.heightFraction, shapeAlteringBiases);

  // Modulation to control weather by coverage parameter.
  // Reference: https://github.com/Prograda/Skybolt/blob/master/Assets/Core/Shaders/Clouds.h#L63
  vec4 factor = 1.0 - coverage * heightScale;
  weather.density = remapClamped(
    mix(localWeather, vec4(1.0), coverageFilterWidths),
    factor,
    factor + coverageFilterWidths
  );

  return weather;
}

vec4 getLayerDensity(const vec4 heightFraction) {
  // prettier-ignore
  return densityProfile.expTerms * exp(densityProfile.exponents * heightFraction) +
    densityProfile.linearTerms * heightFraction +
    densityProfile.constantTerms;
}

struct MediaSample {
  float density;
  vec4 weight;
  float scattering;
  float extinction;
};

MediaSample sampleMedia(
  const WeatherSample weather,
  const vec3 position,
  const vec2 uv,
  const float mipLevel,
  const float jitter,
  out ivec3 sampleCount
) {
  vec4 density = weather.density;

  // TODO: Define in physical length.
  vec3 surfaceNormal = normalize(position);
  float localWeatherSpeed = length(localWeatherOffset);
  vec3 evolution = -surfaceNormal * localWeatherSpeed * 2e4;

  vec3 turbulence = vec3(0.0);
  #ifdef TURBULENCE
  vec2 turbulenceUv = uv * localWeatherRepeat * turbulenceRepeat;
  turbulence =
    turbulenceDisplacement *
    (texture(turbulenceTexture, turbulenceUv).rgb * 2.0 - 1.0) *
    dot(density, remapClamped(weather.heightFraction, vec4(0.3), vec4(0.0)));
  #endif // TURBULENCE

  vec3 shapePosition = (position + evolution + turbulence) * shapeRepeat + shapeOffset;
  float shape = texture(shapeTexture, shapePosition).r;
  density = remapClamped(density, vec4(1.0 - shape) * shapeAmounts, vec4(1.0));

  #ifdef DEBUG_SHOW_SAMPLE_COUNT
  ++sampleCount.y;
  #endif // DEBUG_SHOW_SAMPLE_COUNT

  #ifdef SHAPE_DETAIL
  if (mipLevel * 0.5 + (jitter - 0.5) * 0.5 < 0.5) {
    vec3 detailPosition = (position + turbulence) * shapeDetailRepeat + shapeDetailOffset;
    float detail = texture(shapeDetailTexture, detailPosition).r;
    // Fluffy at the top and whippy at the bottom.
    vec4 modifier = mix(
      vec4(pow(detail, 6.0)),
      vec4(1.0 - detail),
      remapClamped(weather.heightFraction, vec4(0.2), vec4(0.4))
    );
    modifier = mix(vec4(0.0), modifier, shapeDetailAmounts);
    density = remapClamped(density * 2.0, vec4(modifier * 0.5), vec4(1.0));

    #ifdef DEBUG_SHOW_SAMPLE_COUNT
    ++sampleCount.z;
    #endif // DEBUG_SHOW_SAMPLE_COUNT
  }
  #endif // SHAPE_DETAIL

  // Apply the density profiles.
  density = saturate(density * densityScales * getLayerDensity(weather.heightFraction));

  MediaSample media;
  float densitySum = density.x + density.y + density.z + density.w;
  media.weight = density / densitySum;
  media.scattering = densitySum * scatteringCoefficient;
  media.extinction = densitySum * absorptionCoefficient + media.scattering;
  return media;
}

MediaSample sampleMedia(
  const WeatherSample weather,
  const vec3 position,
  const vec2 uv,
  const float mipLevel,
  const float jitter
) {
  ivec3 sampleCount;
  return sampleMedia(weather, position, uv, mipLevel, jitter, sampleCount);
}
`,Jc=`precision highp float;
precision highp sampler3D;

#include "atmosphere/bruneton/definitions"

uniform AtmosphereParameters ATMOSPHERE;
uniform vec3 SUN_SPECTRAL_RADIANCE_TO_LUMINANCE;
uniform vec3 SKY_SPECTRAL_RADIANCE_TO_LUMINANCE;

uniform sampler2D transmittance_texture;
uniform sampler3D scattering_texture;
uniform sampler2D irradiance_texture;
uniform sampler3D single_mie_scattering_texture;
uniform sampler3D higher_order_scattering_texture;

#include "atmosphere/bruneton/common"
#include "atmosphere/bruneton/runtime"

#include "types"

uniform mat4 inverseProjectionMatrix;
uniform mat4 inverseViewMatrix;
uniform vec3 cameraPosition;
uniform mat4 worldToECEFMatrix;
uniform vec3 altitudeCorrection;

// Atmosphere
uniform float bottomRadius;
uniform vec3 sunDirection;

// Cloud layers
uniform float minHeight;
uniform float maxHeight;

layout(location = 0) in vec3 position;

out vec2 vUv;
out vec3 vCameraPosition;
out vec3 vCameraDirection; // Direction to the center of screen
out vec3 vRayDirection; // Direction to the texel
out vec3 vViewPosition;

out GroundIrradiance vGroundIrradiance;
out CloudsIrradiance vCloudsIrradiance;

void sampleSunSkyIrradiance(const vec3 positionECEF) {
  vGroundIrradiance.sun = GetSunAndSkyScalarIrradiance(
    positionECEF * METER_TO_LENGTH_UNIT,
    sunDirection,
    vGroundIrradiance.sky
  );

  vec3 surfaceNormal = normalize(positionECEF);
  vec2 radii = (bottomRadius + vec2(minHeight, maxHeight)) * METER_TO_LENGTH_UNIT;
  vCloudsIrradiance.minSun = GetSunAndSkyScalarIrradiance(
    surfaceNormal * radii.x,
    sunDirection,
    vCloudsIrradiance.minSky
  );
  vCloudsIrradiance.maxSun = GetSunAndSkyScalarIrradiance(
    surfaceNormal * radii.y,
    sunDirection,
    vCloudsIrradiance.maxSky
  );
}

void main() {
  vUv = position.xy * 0.5 + 0.5;

  vec3 viewPosition = (inverseProjectionMatrix * vec4(position, 1.0)).xyz;
  vec3 worldDirection = (inverseViewMatrix * vec4(viewPosition.xyz, 0.0)).xyz;
  vec3 cameraDirection = normalize((inverseViewMatrix * vec4(0.0, 0.0, -1.0, 0.0)).xyz);
  vCameraPosition = (worldToECEFMatrix * vec4(cameraPosition, 1.0)).xyz;
  vCameraDirection = (worldToECEFMatrix * vec4(cameraDirection, 0.0)).xyz;
  vRayDirection = (worldToECEFMatrix * vec4(worldDirection, 0.0)).xyz;
  vViewPosition = viewPosition;

  sampleSunSkyIrradiance(vCameraPosition + altitudeCorrection);

  gl_Position = vec4(position.xy, 1.0, 1.0);
}
`,Ja=`uniform vec2 resolution;
uniform int frame;
uniform sampler3D stbnTexture;

// Atmosphere
uniform float bottomRadius;
uniform mat4 worldToECEFMatrix;
uniform mat4 ecefToWorldMatrix;
uniform vec3 altitudeCorrection;
uniform vec3 sunDirection;

// Participating medium
uniform float scatteringCoefficient;
uniform float absorptionCoefficient;

// Primary raymarch
uniform float minDensity;
uniform float minExtinction;
uniform float minTransmittance;

// Shape and weather
uniform sampler2D localWeatherTexture;
uniform vec2 localWeatherRepeat;
uniform vec2 localWeatherOffset;
uniform float coverage;
uniform sampler3D shapeTexture;
uniform vec3 shapeRepeat;
uniform vec3 shapeOffset;

#ifdef SHAPE_DETAIL
uniform sampler3D shapeDetailTexture;
uniform vec3 shapeDetailRepeat;
uniform vec3 shapeDetailOffset;
#endif // SHAPE_DETAIL

#ifdef TURBULENCE
uniform sampler2D turbulenceTexture;
uniform vec2 turbulenceRepeat;
uniform float turbulenceDisplacement;
#endif // TURBULENCE

// Haze
#ifdef HAZE
uniform float hazeDensityScale;
uniform float hazeExponent;
uniform float hazeScatteringCoefficient;
uniform float hazeAbsorptionCoefficient;
#endif // HAZE

// Cloud layers
uniform vec4 minLayerHeights;
uniform vec4 maxLayerHeights;
uniform vec3 minIntervalHeights;
uniform vec3 maxIntervalHeights;
uniform vec4 densityScales;
uniform vec4 shapeAmounts;
uniform vec4 shapeDetailAmounts;
uniform vec4 weatherExponents;
uniform vec4 shapeAlteringBiases;
uniform vec4 coverageFilterWidths;
uniform float minHeight;
uniform float maxHeight;
uniform float shadowTopHeight;
uniform float shadowBottomHeight;
uniform vec4 shadowLayerMask;
uniform CloudDensityProfile densityProfile;
`,ri=`struct GroundIrradiance {
  vec3 sun;
  vec3 sky;
};

struct CloudsIrradiance {
  vec3 minSun;
  vec3 minSky;
  vec3 maxSun;
  vec3 maxSky;
};

struct CloudDensityProfile {
  vec4 expTerms;
  vec4 exponents;
  vec4 linearTerms;
  vec4 constantTerms;
};
`,$c=Object.defineProperty,X=(t,e,r,i)=>{for(var a=void 0,n=t.length-1,s;n>=0;n--)(s=t[n])&&(a=s(e,r,a)||a);return a&&$c(e,r,a),a},el=new M,tl=new $,F=class extends fe{constructor({parameterUniforms:e,layerUniforms:r,atmosphereUniforms:i},a=Xe.DEFAULT){super({name:"CloudsMaterial",glslVersion:er,vertexShader:q(Jc,{atmosphere:{bruneton:{common:jr,definitions:Kr,runtime:Xr}},types:ri}),fragmentShader:Re(q(qc,{core:{depth:Vt,math:Fe,turbo:Gr,generators:fa,raySphereIntersection:He,cascadedShadowMaps:Wt,interleavedGradientNoise:Yt,vogelDisk:Qt},atmosphere:{bruneton:{common:jr,definitions:Kr,runtime:Xr}},types:ri,parameters:Ja,clouds:qa})),uniforms:{...e,...r,...i,depthBuffer:new l(null),viewMatrix:new l(new N),inverseProjectionMatrix:new l(new N),inverseViewMatrix:new l(new N),reprojectionMatrix:new l(new N),viewReprojectionMatrix:new l(new N),resolution:new l(new P),cameraNear:new l(0),cameraFar:new l(0),cameraHeight:new l(0),frame:new l(0),temporalJitter:new l(new P),targetUvScale:new l(new P),mipLevelScale:new l(1),stbnTexture:new l(null),skyLightScale:new l(1),groundBounceScale:new l(1),powderScale:new l(.8),powderExponent:new l(150),maxIterationCount:new l(m.clouds.maxIterationCount),minStepSize:new l(m.clouds.minStepSize),maxStepSize:new l(m.clouds.maxStepSize),maxRayDistance:new l(m.clouds.maxRayDistance),perspectiveStepScale:new l(m.clouds.perspectiveStepScale),minDensity:new l(m.clouds.minDensity),minExtinction:new l(m.clouds.minExtinction),minTransmittance:new l(m.clouds.minTransmittance),maxIterationCountToSun:new l(m.clouds.maxIterationCountToSun),maxIterationCountToGround:new l(m.clouds.maxIterationCountToGround),minSecondaryStepSize:new l(m.clouds.minSecondaryStepSize),secondaryStepScale:new l(m.clouds.secondaryStepScale),shadowBuffer:new l(null),shadowTexelSize:new l(new P),shadowIntervals:new l(Array.from({length:4},()=>new P)),shadowMatrices:new l(Array.from({length:4},()=>new N)),shadowFar:new l(0),maxShadowFilterRadius:new l(6),shadowLayerMask:new l(new Q().setScalar(1)),maxShadowLengthIterationCount:new l(m.clouds.maxShadowLengthIterationCount),minShadowLengthStepSize:new l(m.clouds.minShadowLengthStepSize),maxShadowLengthRayDistance:new l(m.clouds.maxShadowLengthRayDistance),hazeDensityScale:new l(3e-5),hazeExponent:new l(.001),hazeScatteringCoefficient:new l(.9),hazeAbsorptionCoefficient:new l(.5)}},a),this.temporalUpscale=!0,this.depthPacking=0,this.localWeatherChannels="rgba",this.shapeDetail=m.shapeDetail,this.turbulence=m.turbulence,this.shadowLength=m.lightShafts,this.haze=m.haze,this.multiScatteringOctaves=m.clouds.multiScatteringOctaves,this.accurateSunSkyLight=m.clouds.accurateSunSkyLight,this.accuratePhaseFunction=m.clouds.accuratePhaseFunction,this.shadowCascadeCount=m.shadow.cascadeCount,this.shadowSampleCount=8,this.scatterAnisotropy1=.7,this.scatterAnisotropy2=-.2,this.scatterAnisotropyMix=.5}onBeforeRender(e,r,i,a,n,s){let o=this.defines.USE_LOGARITHMIC_DEPTH_BUFFER!=null,c=e.capabilities.logarithmicDepthBuffer;c!==o&&(c?this.defines.USE_LOGARITHMIC_DEPTH_BUFFER="1":delete this.defines.USE_LOGARITHMIC_DEPTH_BUFFER);let u=this.defines.POWDER!=null,h=this.uniforms.powderScale.value>0;h!==u&&(h?this.defines.POWDER="1":delete this.defines.POWDER,this.needsUpdate=!0);let f=this.defines.GROUND_BOUNCE!=null;(this.uniforms.groundBounceScale.value>0&&this.uniforms.maxIterationCountToGround.value>0)!==f&&(h?this.defines.GROUND_BOUNCE="1":delete this.defines.GROUND_BOUNCE,this.needsUpdate=!0)}copyCameraSettings(e){e.isPerspectiveCamera===!0?this.defines.PERSPECTIVE_CAMERA!=="1"&&(this.defines.PERSPECTIVE_CAMERA="1",this.needsUpdate=!0):this.defines.PERSPECTIVE_CAMERA!=null&&(delete this.defines.PERSPECTIVE_CAMERA,this.needsUpdate=!0);let r=this.uniforms;r.viewMatrix.value.copy(e.matrixWorldInverse),r.inverseViewMatrix.value.copy(e.matrixWorld);let i=this.previousProjectionMatrix??e.projectionMatrix,a=this.previousViewMatrix??e.matrixWorldInverse,n=r.inverseProjectionMatrix.value,s=r.inverseViewMatrix.value,o=r.reprojectionMatrix.value,c=r.viewReprojectionMatrix.value;if(this.temporalUpscale){let f=r.frame.value%16,A=r.resolution.value,w=Za[f],b=(w.x-.5)/A.x*4,D=(w.y-.5)/A.y*4;r.temporalJitter.value.set(b,D),r.mipLevelScale.value=.25,n.copy(e.projectionMatrix),n.elements[8]+=b*2,n.elements[9]+=D*2,n.invert(),o.copy(i),o.elements[8]+=b*2,o.elements[9]+=D*2,o.multiply(a),c.copy(o).multiply(s)}else r.temporalJitter.value.setScalar(0),r.mipLevelScale.value=1,n.copy(e.projectionMatrixInverse),o.copy(i).multiply(a),c.copy(o).multiply(s);r.cameraNear.value=e.near,r.cameraFar.value=e.far;let u=e.getWorldPosition(r.cameraPosition.value),h=el.copy(u).applyMatrix4(r.worldToECEFMatrix.value);try{r.cameraHeight.value=tl.setFromECEF(h).height}catch{}}copyReprojectionMatrix(e){this.previousProjectionMatrix??=new N,this.previousViewMatrix??=new N,this.previousProjectionMatrix.copy(e.projectionMatrix),this.previousViewMatrix.copy(e.matrixWorldInverse)}setSize(e,r,i,a){this.uniforms.resolution.value.set(e,r),i!=null&&a!=null?this.uniforms.targetUvScale.value.set(e/i,r/a):this.uniforms.targetUvScale.value.setScalar(1),this.previousProjectionMatrix=void 0,this.previousViewMatrix=void 0}setShadowSize(e,r){this.uniforms.shadowTexelSize.value.set(1/e,1/r)}get depthBuffer(){return this.uniforms.depthBuffer.value}set depthBuffer(e){this.uniforms.depthBuffer.value=e}};X([he("DEPTH_PACKING")],F.prototype,"depthPacking");X([Br("LOCAL_WEATHER_CHANNELS",{validate:t=>/^[rgba]{4}$/.test(t)})],F.prototype,"localWeatherChannels");X([v("SHAPE_DETAIL")],F.prototype,"shapeDetail");X([v("TURBULENCE")],F.prototype,"turbulence");X([v("SHADOW_LENGTH")],F.prototype,"shadowLength");X([v("HAZE")],F.prototype,"haze");X([he("MULTI_SCATTERING_OCTAVES",{min:1,max:12})],F.prototype,"multiScatteringOctaves");X([v("ACCURATE_SUN_SKY_LIGHT")],F.prototype,"accurateSunSkyLight");X([v("ACCURATE_PHASE_FUNCTION")],F.prototype,"accuratePhaseFunction");X([he("SHADOW_CASCADE_COUNT",{min:1,max:4})],F.prototype,"shadowCascadeCount");X([he("SHADOW_SAMPLE_COUNT",{min:1,max:16})],F.prototype,"shadowSampleCount");X([kt("SCATTER_ANISOTROPY_1")],F.prototype,"scatterAnisotropy1");X([kt("SCATTER_ANISOTROPY_2")],F.prototype,"scatterAnisotropy2");X([kt("SCATTER_ANISOTROPY_MIX")],F.prototype,"scatterAnisotropyMix");var rl=`// Taken from https://gist.github.com/TheRealMJP/c83b8c0f46b63f3a88a5986f4fa982b1
// TODO: Use 5-taps version: https://www.shadertoy.com/view/MtVGWz
// Or even 4 taps (requires preprocessing in the input buffer):
// https://www.shadertoy.com/view/4tyGDD

/**
 * MIT License
 *
 * Copyright (c) 2019 MJP
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

vec4 textureCatmullRom(sampler2D tex, vec2 uv) {
  vec2 texSize = vec2(textureSize(tex, 0));

  // We're going to sample a a 4x4 grid of texels surrounding the target UV
  // coordinate. We'll do this by rounding down the sample location to get the
  // exact center of our "starting" texel. The starting texel will be at
  // location [1, 1] in the grid, where [0, 0] is the top left corner.
  vec2 samplePos = uv * texSize;
  vec2 texPos1 = floor(samplePos - 0.5) + 0.5;

  // Compute the fractional offset from our starting texel to our original
  // sample location, which we'll feed into the Catmull-Rom spline function to
  // get our filter weights.
  vec2 f = samplePos - texPos1;

  // Compute the Catmull-Rom weights using the fractional offset that we
  // calculated earlier. These equations are pre-expanded based on our knowledge
  // of where the texels will be located, which lets us avoid having to evaluate
  // a piece-wise function.
  vec2 w0 = f * (-0.5 + f * (1.0 - 0.5 * f));
  vec2 w1 = 1.0 + f * f * (-2.5 + 1.5 * f);
  vec2 w2 = f * (0.5 + f * (2.0 - 1.5 * f));
  vec2 w3 = f * f * (-0.5 + 0.5 * f);

  // Work out weighting factors and sampling offsets that will let us use
  // bilinear filtering to simultaneously evaluate the middle 2 samples from the
  // 4x4 grid.
  vec2 w12 = w1 + w2;
  vec2 offset12 = w2 / (w1 + w2);

  // Compute the final UV coordinates we'll use for sampling the texture
  vec2 texPos0 = texPos1 - 1.0;
  vec2 texPos3 = texPos1 + 2.0;
  vec2 texPos12 = texPos1 + offset12;

  texPos0 /= texSize;
  texPos3 /= texSize;
  texPos12 /= texSize;

  vec4 result = vec4(0.0);
  result += texture(tex, vec2(texPos0.x, texPos0.y)) * w0.x * w0.y;
  result += texture(tex, vec2(texPos12.x, texPos0.y)) * w12.x * w0.y;
  result += texture(tex, vec2(texPos3.x, texPos0.y)) * w3.x * w0.y;

  result += texture(tex, vec2(texPos0.x, texPos12.y)) * w0.x * w12.y;
  result += texture(tex, vec2(texPos12.x, texPos12.y)) * w12.x * w12.y;
  result += texture(tex, vec2(texPos3.x, texPos12.y)) * w3.x * w12.y;

  result += texture(tex, vec2(texPos0.x, texPos3.y)) * w0.x * w3.y;
  result += texture(tex, vec2(texPos12.x, texPos3.y)) * w12.x * w3.y;
  result += texture(tex, vec2(texPos3.x, texPos3.y)) * w3.x * w3.y;

  return result;
}

vec4 textureCatmullRom(sampler2DArray tex, vec3 uv) {
  vec2 texSize = vec2(textureSize(tex, 0));
  vec2 samplePos = uv.xy * texSize;
  vec2 texPos1 = floor(samplePos - 0.5) + 0.5;
  vec2 f = samplePos - texPos1;
  vec2 w0 = f * (-0.5 + f * (1.0 - 0.5 * f));
  vec2 w1 = 1.0 + f * f * (-2.5 + 1.5 * f);
  vec2 w2 = f * (0.5 + f * (2.0 - 1.5 * f));
  vec2 w3 = f * f * (-0.5 + 0.5 * f);
  vec2 w12 = w1 + w2;
  vec2 offset12 = w2 / (w1 + w2);
  vec2 texPos0 = texPos1 - 1.0;
  vec2 texPos3 = texPos1 + 2.0;
  vec2 texPos12 = texPos1 + offset12;
  texPos0 /= texSize;
  texPos3 /= texSize;
  texPos12 /= texSize;
  vec4 result = vec4(0.0);
  result += texture(tex, vec3(texPos0.x, texPos0.y, uv.z)) * w0.x * w0.y;
  result += texture(tex, vec3(texPos12.x, texPos0.y, uv.z)) * w12.x * w0.y;
  result += texture(tex, vec3(texPos3.x, texPos0.y, uv.z)) * w3.x * w0.y;
  result += texture(tex, vec3(texPos0.x, texPos12.y, uv.z)) * w0.x * w12.y;
  result += texture(tex, vec3(texPos12.x, texPos12.y, uv.z)) * w12.x * w12.y;
  result += texture(tex, vec3(texPos3.x, texPos12.y, uv.z)) * w3.x * w12.y;
  result += texture(tex, vec3(texPos0.x, texPos3.y, uv.z)) * w0.x * w3.y;
  result += texture(tex, vec3(texPos12.x, texPos3.y, uv.z)) * w12.x * w3.y;
  result += texture(tex, vec3(texPos3.x, texPos3.y, uv.z)) * w3.x * w3.y;
  return result;
}
`,il=`precision highp float;
precision highp sampler2DArray;

#include "core/turbo"
#include "catmullRomSampling"
#include "varianceClipping"

uniform sampler2D colorBuffer;
uniform sampler2D depthVelocityBuffer;
uniform sampler2D colorHistoryBuffer;

#ifdef SHADOW_LENGTH
uniform sampler2D shadowLengthBuffer;
uniform sampler2D shadowLengthHistoryBuffer;
#endif // SHADOW_LENGTH

uniform vec2 texelSize;
uniform int frame;
uniform float varianceGamma;
uniform float temporalAlpha;
uniform vec2 jitterOffset;

in vec2 vUv;

layout(location = 0) out vec4 outputColor;
#ifdef SHADOW_LENGTH
layout(location = 1) out float outputShadowLength;
#endif // SHADOW_LENGTH

const ivec2 neighborOffsets[9] = ivec2[9](
  ivec2(-1, -1),
  ivec2(-1, 0),
  ivec2(-1, 1),
  ivec2(0, -1),
  ivec2(0, 0),
  ivec2(0, 1),
  ivec2(1, -1),
  ivec2(1, 0),
  ivec2(1, 1)
);

const ivec4[4] bayerIndices = ivec4[4](
  ivec4(0, 12, 3, 15),
  ivec4(8, 4, 11, 7),
  ivec4(2, 14, 1, 13),
  ivec4(10, 6, 9, 5)
);

vec4 getClosestFragment(const ivec2 coord) {
  vec4 result = vec4(1e7, 0.0, 0.0, 0.0);
  vec4 neighbor;
  #pragma unroll_loop_start
  for (int i = 0; i < 9; ++i) {
    neighbor = texelFetchOffset(depthVelocityBuffer, coord, 0, neighborOffsets[i]);
    if (neighbor.r < result.r) {
      result = neighbor;
    }
  }
  #pragma unroll_loop_end
  return result;
}

void temporalUpscale(
  const ivec2 coord,
  const ivec2 lowResCoord,
  const bool currentFrame,
  out vec4 outputColor,
  out float outputShadowLength
) {
  vec4 currentColor = texelFetch(colorBuffer, lowResCoord, 0);
  if (any(isnan(currentColor)) || any(isinf(currentColor))) currentColor = vec4(0.0); /*V41NAN*/
  #ifdef SHADOW_LENGTH
  vec4 currentShadowLength = vec4(texelFetch(shadowLengthBuffer, lowResCoord, 0).rgb, 1.0);
  #endif // SHADOW_LENGTH

  if (currentFrame) {
    // Use the texel just rendered without any accumulation.
    outputColor = currentColor;
    #ifdef SHADOW_LENGTH
    outputShadowLength = currentShadowLength.r;
    #endif // SHADOW_LENGTH
    return;
  }

  vec4 depthVelocity = getClosestFragment(lowResCoord);
  vec2 velocity = depthVelocity.gb;
  vec2 prevUv = vUv - velocity;
  if (prevUv.x < 0.0 || prevUv.x > 1.0 || prevUv.y < 0.0 || prevUv.y > 1.0) {
    outputColor = currentColor;
    #ifdef SHADOW_LENGTH
    outputShadowLength = currentShadowLength.r;
    #endif // SHADOW_LENGTH
    return; // Rejection
  }

  // Variance clipping with a large variance gamma seems to work fine for
  // upsampling. This increases ghosting, of course, but it's hard to notice on
  // clouds.
  // vec4 historyColor = textureCatmullRom(colorHistoryBuffer, prevUv);
  vec4 historyColor = texture(colorHistoryBuffer, prevUv);
  if (any(isnan(historyColor)) || any(isinf(historyColor))) historyColor = vec4(0.0); /*V41NAN*/
  vec4 clippedColor = varianceClipping(colorBuffer, vUv, currentColor, historyColor, varianceGamma);
  outputColor = clippedColor;

  #ifdef SHADOW_LENGTH
  // Sampling the shadow length history using scene depth doesn't make much
  // sense, but it's too hard to derive it properly. At least this approach
  // resolves the edges of scene objects.
  // vec4 historyShadowLength = vec4(textureCatmullRom(shadowLengthHistoryBuffer, prevUv).rgb, 1.0);
  vec4 historyShadowLength = vec4(texture(shadowLengthHistoryBuffer, prevUv).rgb, 1.0);
  vec4 clippedShadowLength = varianceClipping(
    shadowLengthBuffer,
    vUv,
    currentShadowLength,
    historyShadowLength,
    varianceGamma
  );
  outputShadowLength = clippedShadowLength.r;
  #endif // SHADOW_LENGTH
}

void temporalAntialiasing(const ivec2 coord, out vec4 outputColor, out float outputShadowLength) {
  vec4 currentColor = texelFetch(colorBuffer, coord, 0);
  if (any(isnan(currentColor)) || any(isinf(currentColor))) currentColor = vec4(0.0); /*V41NAN*/
  #ifdef SHADOW_LENGTH
  vec4 currentShadowLength = vec4(texelFetch(shadowLengthBuffer, coord, 0).rgb, 1.0);
  #endif // SHADOW_LENGTH

  vec4 depthVelocity = getClosestFragment(coord);
  vec2 velocity = depthVelocity.gb;

  vec2 prevUv = vUv - velocity;
  if (prevUv.x < 0.0 || prevUv.x > 1.0 || prevUv.y < 0.0 || prevUv.y > 1.0) {
    outputColor = currentColor;
    #ifdef SHADOW_LENGTH
    outputShadowLength = currentShadowLength.r;
    #endif // SHADOW_LENGTH
    return; // Rejection
  }

  vec4 historyColor = texture(colorHistoryBuffer, prevUv);
  if (any(isnan(historyColor)) || any(isinf(historyColor))) historyColor = vec4(0.0); /*V41NAN*/
  vec4 clippedColor = varianceClipping(colorBuffer, coord, currentColor, historyColor);
  outputColor = mix(clippedColor, currentColor, temporalAlpha);

  #ifdef SHADOW_LENGTH
  vec4 historyShadowLength = vec4(texture(shadowLengthHistoryBuffer, prevUv).rgb, 1.0);
  vec4 clippedShadowLength = varianceClipping(
    shadowLengthBuffer,
    coord,
    currentShadowLength,
    historyShadowLength
  );
  outputShadowLength = mix(clippedShadowLength.r, currentShadowLength.r, temporalAlpha);
  #endif // SHADOW_LENGTH
}

void main() {
  ivec2 coord = ivec2(gl_FragCoord.xy);

  #if !defined(SHADOW_LENGTH)
  float outputShadowLength;
  #endif // !defined(SHADOW_LENGTH)

  #ifdef TEMPORAL_UPSCALE
  ivec2 lowResCoord = coord / 4;
  int bayerValue = bayerIndices[coord.x % 4][coord.y % 4];
  bool currentFrame = bayerValue == frame % 16;
  temporalUpscale(coord, lowResCoord, currentFrame, outputColor, outputShadowLength);
  #else // TEMPORAL_UPSCALE
  temporalAntialiasing(coord, outputColor, outputShadowLength);
  #endif // TEMPORAL_UPSCALE

  #if defined(SHADOW_LENGTH) && defined(DEBUG_SHOW_SHADOW_LENGTH)
  outputColor = vec4(turbo(outputShadowLength * 0.05), 1.0);
  #endif // defined(SHADOW_LENGTH) && defined(DEBUG_SHOW_SHADOW_LENGTH)

  #ifdef DEBUG_SHOW_VELOCITY
  outputColor.rgb = outputColor.rgb + vec3(abs(texture(depthVelocityBuffer, vUv).gb) * 10.0, 0.0);
  #endif // DEBUG_SHOW_VELOCITY
}
`,al=`precision highp float;

layout(location = 0) in vec3 position;

out vec2 vUv;

void main() {
  vUv = position.xy * 0.5 + 0.5;
  gl_Position = vec4(position.xy, 1.0, 1.0);
}
`,$a=`#ifdef VARIANCE_9_SAMPLES
#define VARIANCE_OFFSET_COUNT 8
const ivec2 varianceOffsets[8] = ivec2[8](
  ivec2(-1, -1),
  ivec2(-1, 1),
  ivec2(1, -1),
  ivec2(1, 1),
  ivec2(1, 0),
  ivec2(0, -1),
  ivec2(0, 1),
  ivec2(-1, 0)
);
#else // VARIANCE_9_SAMPLES
#define VARIANCE_OFFSET_COUNT 4
const ivec2 varianceOffsets[4] = ivec2[4](ivec2(1, 0), ivec2(0, -1), ivec2(0, 1), ivec2(-1, 0));
#endif // VARIANCE_9_SAMPLES

// Reference: https://github.com/playdeadgames/temporal
vec4 clipAABB(const vec4 current, const vec4 history, const vec4 minColor, const vec4 maxColor) {
  vec3 pClip = 0.5 * (maxColor.rgb + minColor.rgb);
  vec3 eClip = 0.5 * (maxColor.rgb - minColor.rgb) + 1e-7;
  vec4 vClip = history - vec4(pClip, current.a);
  vec3 vUnit = vClip.xyz / eClip;
  vec3 aUnit = abs(vUnit);
  float maUnit = max(aUnit.x, max(aUnit.y, aUnit.z));
  if (maUnit > 1.0) {
    return vec4(pClip, current.a) + vClip / maUnit;
  }
  return history;
}

#ifdef VARIANCE_SAMPLER_ARRAY
#define VARIANCE_SAMPLER sampler2DArray
#define VARIANCE_SAMPLER_COORD ivec3
#else // VARIANCE_SAMPLER_ARRAY
#define VARIANCE_SAMPLER sampler2D
#define VARIANCE_SAMPLER_COORD ivec2
#endif // VARIANCE_SAMPLER_ARRAY

// Variance clipping
// Reference: https://developer.download.nvidia.com/gameworks/events/GDC2016/msalvi_temporal_supersampling.pdf
vec4 varianceClipping(
  const VARIANCE_SAMPLER inputBuffer,
  const VARIANCE_SAMPLER_COORD coord,
  const vec4 current,
  const vec4 history,
  const float gamma
) {
  vec4 moment1 = current;
  vec4 moment2 = current * current;
  vec4 neighbor;
  #pragma unroll_loop_start
  for (int i = 0; i < 8; ++i) {
    #if UNROLLED_LOOP_INDEX < VARIANCE_OFFSET_COUNT
    neighbor = texelFetchOffset(inputBuffer, coord, 0, varianceOffsets[i]);
    moment1 += neighbor;
    moment2 += neighbor * neighbor;
    #endif // UNROLLED_LOOP_INDEX < VARIANCE_OFFSET_COUNT
  }
  #pragma unroll_loop_end

  const float N = float(VARIANCE_OFFSET_COUNT + 1);
  vec4 mean = moment1 / N;
  vec4 varianceGamma = sqrt(max(moment2 / N - mean * mean, 0.0)) * gamma;
  vec4 minColor = mean - varianceGamma;
  vec4 maxColor = mean + varianceGamma;
  return clipAABB(clamp(mean, minColor, maxColor), history, minColor, maxColor);
}

vec4 varianceClipping(
  const VARIANCE_SAMPLER inputBuffer,
  const VARIANCE_SAMPLER_COORD coord,
  const vec4 current,
  const vec4 history
) {
  return varianceClipping(inputBuffer, coord, current, history, 1.0);
}

vec4 varianceClipping(
  const sampler2D inputBuffer,
  const vec2 coord,
  const vec4 current,
  const vec4 history,
  const float gamma
) {
  vec4 moment1 = current;
  vec4 moment2 = current * current;
  vec4 neighbor;
  #pragma unroll_loop_start
  for (int i = 0; i < 8; ++i) {
    #if UNROLLED_LOOP_INDEX < VARIANCE_OFFSET_COUNT
    neighbor = textureOffset(inputBuffer, coord, varianceOffsets[i]);
    moment1 += neighbor;
    moment2 += neighbor * neighbor;
    #endif // UNROLLED_LOOP_INDEX < VARIANCE_OFFSET_COUNT
  }
  #pragma unroll_loop_end

  const float N = float(VARIANCE_OFFSET_COUNT + 1);
  vec4 mean = moment1 / N;
  vec4 varianceGamma = sqrt(max(moment2 / N - mean * mean, 0.0)) * gamma;
  vec4 minColor = mean - varianceGamma;
  vec4 maxColor = mean + varianceGamma;
  return clipAABB(clamp(mean, minColor, maxColor), history, minColor, maxColor);
}

vec4 varianceClipping(
  const sampler2D inputBuffer,
  const vec2 coord,
  const vec4 current,
  const vec4 history
) {
  return varianceClipping(inputBuffer, coord, current, history, 1.0);
}
`,nl=Object.defineProperty,en=(t,e,r,i)=>{for(var a=void 0,n=t.length-1,s;n>=0;n--)(s=t[n])&&(a=s(e,r,a)||a);return a&&nl(e,r,a),a},xt=class extends ni{constructor({colorBuffer:e=null,depthVelocityBuffer:r=null,shadowLengthBuffer:i=null,colorHistoryBuffer:a=null,shadowLengthHistoryBuffer:n=null}={}){super({name:"CloudsResolveMaterial",glslVersion:er,vertexShader:al,fragmentShader:Re(q(il,{core:{turbo:Gr},catmullRomSampling:rl,varianceClipping:$a})),uniforms:{colorBuffer:new l(e),depthVelocityBuffer:new l(r),shadowLengthBuffer:new l(i),colorHistoryBuffer:new l(a),shadowLengthHistoryBuffer:new l(n),texelSize:new l(new P),frame:new l(0),jitterOffset:new l(new P),varianceGamma:new l(2),temporalAlpha:new l(.1)}}),this.temporalUpscale=!0,this.shadowLength=!0}setSize(e,r){this.uniforms.texelSize.value.set(1/e,1/r)}onBeforeRender(e,r,i,a,n,s){let o=this.uniforms.frame.value%16,c=Za[o],u=(c.x-.5)*4,h=(c.y-.5)*4;this.uniforms.jitterOffset.value.set(u,h)}};en([v("TEMPORAL_UPSCALE")],xt.prototype,"temporalUpscale");en([v("SHADOW_LENGTH")],xt.prototype,"shadowLength");var qt=class extends _e{constructor(e,r){super(e),this._mainCamera=new Ya;let{shadow:i}=r;this.shadow=i}get mainCamera(){return this._mainCamera}set mainCamera(e){this._mainCamera=e}};function Zr(t,{depthVelocity:e,shadowLength:r}){let i=new Oc(1,1,{depthBuffer:!1,type:Qa});i.texture.minFilter=Kt,i.texture.magFilter=Kt,i.texture.name=t;let a;e&&(a=i.texture.clone(),a.isRenderTargetTexture=!0,i.depthVelocity=a,i.textures.push(a));let n;return r&&(n=i.texture.clone(),n.isRenderTargetTexture=!0,n.format=Uc,i.shadowLength=n,i.textures.push(n)),Object.assign(i,{depthVelocity:a??null,shadowLength:n??null})}var ii=class extends qt{constructor({parameterUniforms:e,layerUniforms:r,atmosphereUniforms:i,...a},n){super("CloudsPass",a),this.atmosphere=n,this.width=0,this.height=0,this.currentMaterial=new F({parameterUniforms:e,layerUniforms:r,atmosphereUniforms:i},n),this.currentPass=new qe(this.currentMaterial),this.resolveMaterial=new xt,this.resolvePass=new qe(this.resolveMaterial),this.initRenderTargets({depthVelocity:!0,shadowLength:m.lightShafts})}copyCameraSettings(e){this.currentMaterial.copyCameraSettings(e)}initialize(e,r,i){this.currentPass.initialize(e,r,i),this.resolvePass.initialize(e,r,i)}initRenderTargets(e){this.currentRenderTarget?.dispose(),this.resolveRenderTarget?.dispose(),this.historyRenderTarget?.dispose();let r=Zr("Clouds",e),i=Zr("Clouds.A",{...e,depthVelocity:!1}),a=Zr("Clouds.B",{...e,depthVelocity:!1});this.currentRenderTarget=r,this.resolveRenderTarget=i,this.historyRenderTarget=a;let n=this.resolveMaterial.uniforms;n.colorBuffer.value=r.texture,n.depthVelocityBuffer.value=r.depthVelocity,n.shadowLengthBuffer.value=r.shadowLength,n.colorHistoryBuffer.value=a.texture,n.shadowLengthHistoryBuffer.value=a.shadowLength}copyShadow(){let e=this.shadow,r=this.currentMaterial.uniforms;for(let i=0;i<e.cascadeCount;++i){let a=e.cascades[i];r.shadowIntervals.value[i].copy(a.interval),r.shadowMatrices.value[i].copy(a.matrix)}r.shadowFar.value=e.far}copyReprojection(){this.currentMaterial.copyReprojectionMatrix(this.mainCamera)}swapBuffers(){let e=this.historyRenderTarget,r=this.resolveRenderTarget;this.resolveRenderTarget=e,this.historyRenderTarget=r;let i=this.resolveMaterial.uniforms;i.colorHistoryBuffer.value=r.texture,i.shadowLengthHistoryBuffer.value=r.shadowLength}update(e,r,i){this.currentMaterial.uniforms.frame.value=r,this.resolveMaterial.uniforms.frame.value=r,this.copyCameraSettings(this.mainCamera),this.copyShadow(),this.currentPass.render(e,null,this.currentRenderTarget),this.resolvePass.render(e,null,this.resolveRenderTarget),this.copyReprojection(),this.swapBuffers()}setSize(e,r){if(this.width=e,this.height=r,this.temporalUpscale){let i=Math.ceil(e/4),a=Math.ceil(r/4);this.currentRenderTarget.setSize(i,a),this.currentMaterial.setSize(i*4,a*4,e,r)}else this.currentRenderTarget.setSize(e,r),this.currentMaterial.setSize(e,r);this.resolveRenderTarget.setSize(e,r),this.resolveMaterial.setSize(e,r),this.historyRenderTarget.setSize(e,r)}setShadowSize(e,r,i){this.currentMaterial.shadowCascadeCount=i,this.currentMaterial.setShadowSize(e,r)}setDepthTexture(e,r){this.currentMaterial.depthBuffer=e,this.currentMaterial.depthPacking=r??0}get outputBuffer(){return this.historyRenderTarget.texture}get shadowBuffer(){return this.currentMaterial.uniforms.shadowBuffer.value}set shadowBuffer(e){this.currentMaterial.uniforms.shadowBuffer.value=e}get shadowLengthBuffer(){return this.historyRenderTarget.shadowLength}get temporalUpscale(){return this.currentMaterial.temporalUpscale}set temporalUpscale(e){e!==this.temporalUpscale&&(this.currentMaterial.temporalUpscale=e,this.resolveMaterial.temporalUpscale=e,this.setSize(this.width,this.height))}get lightShafts(){return this.currentMaterial.shadowLength}set lightShafts(e){e!==this.lightShafts&&(this.currentMaterial.shadowLength=e,this.resolveMaterial.shadowLength=e,this.initRenderTargets({depthVelocity:!0,shadowLength:e}),this.setSize(this.width,this.height))}};function sl(t,e){let r=t.properties.get(e.texture).__webglTexture,i=t.getContext();xe(i instanceof WebGL2RenderingContext),t.setRenderTarget(e);let a=[];if(r!=null)for(let n=0;n<e.depth;++n)i.framebufferTextureLayer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+n,r,0,n),a.push(i.COLOR_ATTACHMENT0+n);i.drawBuffers(a)}var Jt=class extends qe{render(e,r,i,a,n){let s=this.fullscreenMaterial.uniforms;r!==null&&s?.[this.input]!=null&&(s[this.input].value=r.texture),sl(e,i),e.render(this.scene,this.camera)}},ol=`precision highp float;
precision highp sampler3D;

#include <common>

#include "core/math"
#include "core/raySphereIntersection"
#include "types"
#include "parameters"
#include "structuredSampling"
#include "clouds"

uniform mat4 inverseShadowMatrices[CASCADE_COUNT];
uniform mat4 reprojectionMatrices[CASCADE_COUNT];

// Primary raymarch
uniform int maxIterationCount;
uniform float minStepSize;
uniform float maxStepSize;
uniform float opticalDepthTailScale;

in vec2 vUv;

layout(location = 0) out vec4 outputColor[CASCADE_COUNT];

// Redundant notation for prettier.
#if CASCADE_COUNT == 1
layout(location = 1) out vec3 outputDepthVelocity[CASCADE_COUNT];
#elif CASCADE_COUNT == 2
layout(location = 2) out vec3 outputDepthVelocity[CASCADE_COUNT];
#elif CASCADE_COUNT == 3
layout(location = 3) out vec3 outputDepthVelocity[CASCADE_COUNT];
#elif CASCADE_COUNT == 4
layout(location = 4) out vec3 outputDepthVelocity[CASCADE_COUNT];
#endif // CASCADE_COUNT

vec4 marchClouds(
  const vec3 rayOrigin,
  const vec3 rayDirection,
  const float maxRayDistance,
  const float jitter,
  const float mipLevel
) {
  // Setup structured volume sampling (SVS).
  // While SVS introduces spatial aliasing, it is indeed temporally stable,
  // which is important for lower-resolution shadow maps where a flickering
  // single pixel can be highly noticeable.
  vec3 normal = getStructureNormal(rayDirection, jitter);
  float rayDistance;
  float stepSize;
  intersectStructuredPlanes(
    normal,
    rayOrigin,
    rayDirection,
    clamp(maxRayDistance / float(maxIterationCount), minStepSize, maxStepSize),
    rayDistance,
    stepSize
  );

  #ifdef TEMPORAL_JITTER
  rayDistance -= stepSize * jitter;
  #endif // TEMPORAL_JITTER

  float extinctionSum = 0.0;
  float maxOpticalDepth = 0.0;
  float maxOpticalDepthTail = 0.0;
  float transmittanceIntegral = 1.0;
  float weightedDistanceSum = 0.0;
  float transmittanceSum = 0.0;

  int sampleCount = 0;
  for (int i = 0; i < maxIterationCount; ++i) {
    if (rayDistance > maxRayDistance) {
      break; // Termination
    }

    vec3 position = rayDistance * rayDirection + rayOrigin;
    float height = length(position) - bottomRadius;

    #if !defined(DEBUG_MARCH_INTERVALS)
    if (insideLayerIntervals(height)) {
      rayDistance += stepSize;
      continue;
    }
    #endif // !defined(DEBUG_MARCH_INTERVALS)

    // Sample rough weather.
    vec2 uv = getGlobeUv(position);
    WeatherSample weather = sampleWeather(uv, height, mipLevel);

    if (any(greaterThan(weather.density, vec4(minDensity)))) {
      // Sample detailed participating media.
      // Note this assumes an homogeneous medium.
      MediaSample media = sampleMedia(weather, position, uv, mipLevel, jitter);
      if (media.extinction > minExtinction) {
        extinctionSum += media.extinction;
        maxOpticalDepth += media.extinction * stepSize;
        transmittanceIntegral *= exp(-media.extinction * stepSize);
        weightedDistanceSum += rayDistance * transmittanceIntegral;
        transmittanceSum += transmittanceIntegral;
        ++sampleCount;
      }
    }

    if (transmittanceIntegral <= minTransmittance) {
      // A large amount of optical depth accumulates in the tail, beyond the
      // point of minimum transmittance. The expected optical depth seems to
      // decrease exponentially with the number of samples taken before reaching
      // the minimum transmittance.
      // See the discussion here: https://x.com/shotamatsuda/status/1886259549931520437
      maxOpticalDepthTail = min(
        opticalDepthTailScale * stepSize * exp(float(1 - sampleCount)),
        stepSize * 0.5 // Excessive optical depth only introduces aliasing.
      );
      break; // Early termination
    }
    rayDistance += stepSize;
  }

  if (sampleCount == 0) {
    return vec4(maxRayDistance, 0.0, 0.0, 0.0);
  }
  float frontDepth = min(weightedDistanceSum / transmittanceSum, maxRayDistance);
  float meanExtinction = extinctionSum / float(sampleCount);
  return vec4(frontDepth, meanExtinction, maxOpticalDepth, maxOpticalDepthTail);
}

void getRayNearFar(
  const vec3 sunPosition,
  const vec3 rayDirection,
  out float rayNear,
  out float rayFar
) {
  vec4 firstIntersections = raySphereFirstIntersection(
    sunPosition,
    rayDirection,
    vec3(0.0),
    bottomRadius + vec4(shadowTopHeight, shadowBottomHeight, 0.0, 0.0)
  );
  rayNear = max(0.0, firstIntersections.x);
  rayFar = firstIntersections.y;
  if (rayFar < 0.0) {
    rayFar = 1e6;
  }
}

void cascade(
  const int cascadeIndex,
  const float mipLevel,
  out vec4 outputColor,
  out vec3 outputDepthVelocity
) {
  vec2 clip = vUv * 2.0 - 1.0;
  vec4 point = inverseShadowMatrices[cascadeIndex] * vec4(clip.xy, -1.0, 1.0);
  point /= point.w;
  vec3 sunPosition = (worldToECEFMatrix * vec4(point.xyz, 1.0)).xyz + altitudeCorrection;

  vec3 rayDirection = normalize(-sunDirection);
  float rayNear;
  float rayFar;
  getRayNearFar(sunPosition, rayDirection, rayNear, rayFar);

  vec3 rayOrigin = rayNear * rayDirection + sunPosition;
  float stbn = getSTBN();
  vec4 color = marchClouds(rayOrigin, rayDirection, rayFar - rayNear, stbn, mipLevel);
  outputColor = color;

  // Velocity for temporal resolution.
  #ifdef TEMPORAL_PASS
  vec3 frontPosition = color.x * rayDirection + rayOrigin;
  vec3 frontPositionWorld = (ecefToWorldMatrix * vec4(frontPosition - altitudeCorrection, 1.0)).xyz;
  vec4 prevClip = reprojectionMatrices[cascadeIndex] * vec4(frontPositionWorld, 1.0);
  prevClip /= prevClip.w;
  vec2 prevUv = prevClip.xy * 0.5 + 0.5;
  vec2 velocity = (vUv - prevUv) * resolution;
  outputDepthVelocity = vec3(color.x, velocity);
  #else // TEMPORAL_PASS
  outputDepthVelocity = vec3(0.0);
  #endif // TEMPORAL_PASS
}

// TODO: Calculate from the main camera frustum perhaps?
const float mipLevels[4] = float[4](0.0, 0.5, 1.0, 2.0);

void main() {
  #pragma unroll_loop_start
  for (int i = 0; i < 4; ++i) {
    #if UNROLLED_LOOP_INDEX < CASCADE_COUNT
    cascade(UNROLLED_LOOP_INDEX, mipLevels[i], outputColor[i], outputDepthVelocity[i]);
    #endif // UNROLLED_LOOP_INDEX < CASCADE_COUNT
  }
  #pragma unroll_loop_end
}
`,cl=`precision highp float;

layout(location = 0) in vec3 position;

out vec2 vUv;

void main() {
  vUv = position.xy * 0.5 + 0.5;
  gl_Position = vec4(position.xy, 1.0, 1.0);
}
`,ll=`// Implements Structured Volume Sampling in fragment shader:
// https://github.com/huwb/volsample
// Implementation reference:
// https://www.shadertoy.com/view/ttVfDc

void getIcosahedralVertices(const vec3 direction, out vec3 v1, out vec3 v2, out vec3 v3) {
  // Normalization scalers to fit dodecahedron to unit sphere.
  const float a = 0.85065080835204; // phi / sqrt(2 + phi)
  const float b = 0.5257311121191336; // 1 / sqrt(2 + phi)

  // Derive the vertices of icosahedron where triangle intersects the direction.
  // See: https://www.ppsloan.org/publications/AmbientDice.pdf
  const float kT = 0.6180339887498948; // 1 / phi
  const float kT2 = 0.38196601125010515; // 1 / phi^2
  vec3 absD = abs(direction);
  float selector1 = dot(absD, vec3(1.0, kT2, -kT));
  float selector2 = dot(absD, vec3(-kT, 1.0, kT2));
  float selector3 = dot(absD, vec3(kT2, -kT, 1.0));
  v1 = selector1 > 0.0 ? vec3(a, b, 0.0) : vec3(-b, 0.0, a);
  v2 = selector2 > 0.0 ? vec3(0.0, a, b) : vec3(a, -b, 0.0);
  v3 = selector3 > 0.0 ? vec3(b, 0.0, a) : vec3(0.0, a, -b);
  vec3 octantSign = sign(direction);
  v1 *= octantSign;
  v2 *= octantSign;
  v3 *= octantSign;
}

void swapIfBigger(inout vec4 a, inout vec4 b) {
  if (a.w > b.w) {
    vec4 t = a;
    a = b;
    b = t;
  }
}

void sortVertices(inout vec3 a, inout vec3 b, inout vec3 c) {
  const vec3 base = vec3(0.5, 0.5, 1.0);
  vec4 aw = vec4(a, dot(a, base));
  vec4 bw = vec4(b, dot(b, base));
  vec4 cw = vec4(c, dot(c, base));
  swapIfBigger(aw, bw);
  swapIfBigger(bw, cw);
  swapIfBigger(aw, bw);
  a = aw.xyz;
  b = bw.xyz;
  c = cw.xyz;
}

vec3 getPentagonalWeights(const vec3 direction, const vec3 v1, const vec3 v2, const vec3 v3) {
  float d1 = dot(v1, direction);
  float d2 = dot(v2, direction);
  float d3 = dot(v3, direction);
  vec3 w = exp(vec3(d1, d2, d3) * 40.0);
  return w / (w.x + w.y + w.z);
}

vec3 getStructureNormal(
  const vec3 direction,
  const float jitter,
  out vec3 a,
  out vec3 b,
  out vec3 c,
  out vec3 weights
) {
  getIcosahedralVertices(direction, a, b, c);
  sortVertices(a, b, c);
  weights = getPentagonalWeights(direction, a, b, c);
  return jitter < weights.x
    ? a
    : jitter < weights.x + weights.y
      ? b
      : c;
}

vec3 getStructureNormal(const vec3 direction, const float jitter) {
  vec3 a, b, c, weights;
  return getStructureNormal(direction, jitter, a, b, c, weights);
}

// Reference: https://github.com/huwb/volsample/blob/master/src/unity/Assets/Shaders/RayMarchCore.cginc
void intersectStructuredPlanes(
  const vec3 normal,
  const vec3 rayOrigin,
  const vec3 rayDirection,
  const float samplePeriod,
  out float stepOffset,
  out float stepSize
) {
  float NoD = dot(rayDirection, normal);
  stepSize = samplePeriod / abs(NoD);

  // Skips leftover bit to get from rayOrigin to first strata plane.
  stepOffset = -mod(dot(rayOrigin, normal), samplePeriod) / NoD;

  // mod() gives different results depending on if the arg is negative or
  // positive. This line makes it consistent, and ensures the first sample is in
  // front of the viewer.
  if (stepOffset < 0.0) {
    stepOffset += stepSize;
  }
}
`,ul=Object.defineProperty,Ke=(t,e,r,i)=>{for(var a=void 0,n=t.length-1,s;n>=0;n--)(s=t[n])&&(a=s(e,r,a)||a);return a&&ul(e,r,a),a},ge=class extends ni{constructor({parameterUniforms:e,layerUniforms:r,atmosphereUniforms:i}){super({name:"ShadowMaterial",glslVersion:er,vertexShader:cl,fragmentShader:Re(q(ol,{core:{math:Fe,raySphereIntersection:He},types:ri,parameters:Ja,structuredSampling:ll,clouds:qa})),uniforms:{...e,...r,...i,inverseShadowMatrices:new l(Array.from({length:4},()=>new N)),reprojectionMatrices:new l(Array.from({length:4},()=>new N)),resolution:new l(new P),frame:new l(0),stbnTexture:new l(null),maxIterationCount:new l(m.shadow.maxIterationCount),minStepSize:new l(m.shadow.minStepSize),maxStepSize:new l(m.shadow.maxStepSize),minDensity:new l(m.shadow.minDensity),minExtinction:new l(m.shadow.minExtinction),minTransmittance:new l(m.shadow.minTransmittance),opticalDepthTailScale:new l(2)},defines:{SHADOW:"1",TEMPORAL_PASS:"1",TEMPORAL_JITTER:"1"}}),this.localWeatherChannels="rgba",this.cascadeCount=m.shadow.cascadeCount,this.temporalPass=!0,this.temporalJitter=!0,this.shapeDetail=m.shapeDetail,this.turbulence=m.turbulence,this.cascadeCount=m.shadow.cascadeCount}setSize(e,r){this.uniforms.resolution.value.set(e,r)}};Ke([Br("LOCAL_WEATHER_CHANNELS",{validate:t=>/^[rgba]{4}$/.test(t)})],ge.prototype,"localWeatherChannels");Ke([he("CASCADE_COUNT",{min:1,max:4})],ge.prototype,"cascadeCount");Ke([v("TEMPORAL_PASS")],ge.prototype,"temporalPass");Ke([v("TEMPORAL_JITTER")],ge.prototype,"temporalJitter");Ke([v("SHAPE_DETAIL")],ge.prototype,"shapeDetail");Ke([v("TURBULENCE")],ge.prototype,"turbulence");var hl=`precision highp float;
precision highp sampler2DArray;

#define VARIANCE_9_SAMPLES 1
#define VARIANCE_SAMPLER_ARRAY 1

#include "varianceClipping"

uniform sampler2DArray inputBuffer;
uniform sampler2DArray historyBuffer;

uniform vec2 texelSize;
uniform float varianceGamma;
uniform float temporalAlpha;

in vec2 vUv;

layout(location = 0) out vec4 outputColor[CASCADE_COUNT];

const ivec2 neighborOffsets[9] = ivec2[9](
  ivec2(-1, -1),
  ivec2(-1, 0),
  ivec2(-1, 1),
  ivec2(0, -1),
  ivec2(0, 0),
  ivec2(0, 1),
  ivec2(1, -1),
  ivec2(1, 0),
  ivec2(1, 1)
);

vec4 getClosestFragment(const ivec3 coord) {
  vec4 result = vec4(1e7, 0.0, 0.0, 0.0);
  vec4 neighbor;
  #pragma unroll_loop_start
  for (int i = 0; i < 9; ++i) {
    neighbor = texelFetchOffset(
      inputBuffer,
      coord + ivec3(0, 0, CASCADE_COUNT),
      0,
      neighborOffsets[i]
    );
    if (neighbor.r < result.r) {
      result = neighbor;
    }
  }
  #pragma unroll_loop_end
  return result;
}

void cascade(const int cascadeIndex, out vec4 outputColor) {
  ivec3 coord = ivec3(gl_FragCoord.xy, cascadeIndex);
  vec4 current = texelFetch(inputBuffer, coord, 0);

  vec4 depthVelocity = getClosestFragment(coord);
  vec2 velocity = depthVelocity.gb * texelSize;
  vec2 prevUv = vUv - velocity;
  if (prevUv.x < 0.0 || prevUv.x > 1.0 || prevUv.y < 0.0 || prevUv.y > 1.0) {
    outputColor = current;
    return; // Rejection
  }

  vec4 history = texture(historyBuffer, vec3(prevUv, float(cascadeIndex)));
  vec4 clippedHistory = varianceClipping(inputBuffer, coord, current, history, varianceGamma);
  outputColor = mix(clippedHistory, current, temporalAlpha);
}

void main() {
  #pragma unroll_loop_start
  for (int i = 0; i < 4; ++i) {
    #if UNROLLED_LOOP_INDEX < CASCADE_COUNT
    cascade(UNROLLED_LOOP_INDEX, outputColor[i]);
    #endif // UNROLLED_LOOP_INDEX < CASCADE_COUNT
  }
  #pragma unroll_loop_end
}
`,dl=`precision highp float;

layout(location = 0) in vec3 position;

out vec2 vUv;

void main() {
  vUv = position.xy * 0.5 + 0.5;
  gl_Position = vec4(position.xy, 1.0, 1.0);
}
`,fl=Object.defineProperty,ml=(t,e,r,i)=>{for(var a=void 0,n=t.length-1,s;n>=0;n--)(s=t[n])&&(a=s(e,r,a)||a);return a&&fl(e,r,a),a},$t=class extends ni{constructor({inputBuffer:e=null,historyBuffer:r=null}={}){super({name:"ShadowResolveMaterial",glslVersion:er,vertexShader:dl,fragmentShader:Re(q(hl,{varianceClipping:$a})),uniforms:{inputBuffer:new l(e),historyBuffer:new l(r),texelSize:new l(new P),varianceGamma:new l(1),temporalAlpha:new l(.01)},defines:{}}),this.cascadeCount=m.shadow.cascadeCount}setSize(e,r){this.uniforms.texelSize.value.set(1/e,1/r)}};ml([he("CASCADE_COUNT",{min:1,max:4})],$t.prototype,"cascadeCount");function qr(t){let e=new Lc(1,1,1,{depthBuffer:!1});return e.texture.type=Qa,e.texture.minFilter=Kt,e.texture.magFilter=Kt,e.texture.name=t,e}var ai=class extends qt{constructor({parameterUniforms:e,layerUniforms:r,atmosphereUniforms:i,...a}){super("ShadowPass",a),this.width=0,this.height=0,this.currentMaterial=new ge({parameterUniforms:e,layerUniforms:r,atmosphereUniforms:i}),this.currentPass=new Jt(this.currentMaterial),this.resolveMaterial=new $t,this.resolvePass=new Jt(this.resolveMaterial),this.initRenderTargets()}initialize(e,r,i){this.currentPass.initialize(e,r,i),this.resolvePass.initialize(e,r,i)}initRenderTargets(){this.currentRenderTarget?.dispose(),this.resolveRenderTarget?.dispose(),this.historyRenderTarget?.dispose();let e=qr("Shadow"),r=this.temporalPass?qr("Shadow.A"):null,i=this.temporalPass?qr("Shadow.B"):null;this.currentRenderTarget=e,this.resolveRenderTarget=r,this.historyRenderTarget=i;let a=this.resolveMaterial.uniforms;a.inputBuffer.value=e.texture,a.historyBuffer.value=i?.texture??null}copyShadow(){let e=this.shadow,r=this.currentMaterial.uniforms;for(let i=0;i<e.cascadeCount;++i){let a=e.cascades[i];r.inverseShadowMatrices.value[i].copy(a.inverseMatrix)}}copyReprojection(){let e=this.shadow,r=this.currentMaterial.uniforms;for(let i=0;i<e.cascadeCount;++i){let a=e.cascades[i];r.reprojectionMatrices.value[i].copy(a.matrix)}}swapBuffers(){xe(this.historyRenderTarget!=null),xe(this.resolveRenderTarget!=null);let e=this.historyRenderTarget,r=this.resolveRenderTarget;this.resolveRenderTarget=e,this.historyRenderTarget=r,this.resolveMaterial.uniforms.historyBuffer.value=r.texture}update(e,r,i){this.currentMaterial.uniforms.frame.value=r,this.copyShadow(),this.currentPass.render(e,null,this.currentRenderTarget),this.temporalPass&&(xe(this.resolveRenderTarget!=null),this.resolvePass.render(e,null,this.resolveRenderTarget),this.copyReprojection(),this.swapBuffers())}setSize(e,r,i=this.shadow.cascadeCount){this.width=e,this.height=r,this.currentMaterial.cascadeCount=i,this.resolveMaterial.cascadeCount=i,this.currentMaterial.setSize(e,r),this.resolveMaterial.setSize(e,r),this.currentRenderTarget.setSize(e,r,this.temporalPass?i*2:i),this.resolveRenderTarget?.setSize(e,r,i),this.historyRenderTarget?.setSize(e,r,i)}get outputBuffer(){return this.temporalPass?(xe(this.historyRenderTarget!=null),this.historyRenderTarget.texture):this.currentRenderTarget.texture}get temporalPass(){return this.currentMaterial.temporalPass}set temporalPass(e){e!==this.temporalPass&&(this.currentMaterial.temporalPass=e,this.initRenderTargets(),this.setSize(this.width,this.height))}};function pl(t){return{scatteringCoefficient:new l(1),absorptionCoefficient:new l(0),coverage:new l(.3),localWeatherTexture:new l(t.localWeatherTexture),localWeatherRepeat:new l(t.localWeatherRepeat),localWeatherOffset:new l(t.localWeatherOffset),shapeTexture:new l(t.shapeTexture),shapeRepeat:new l(t.shapeRepeat),shapeOffset:new l(t.shapeOffset),shapeDetailTexture:new l(t.shapeDetailTexture),shapeDetailRepeat:new l(t.shapeDetailRepeat),shapeDetailOffset:new l(t.shapeDetailOffset),turbulenceTexture:new l(t.turbulenceTexture),turbulenceRepeat:new l(t.turbulenceRepeat),turbulenceDisplacement:new l(350)}}function gl(){return{minLayerHeights:new l(new Q),maxLayerHeights:new l(new Q),minIntervalHeights:new l(new M),maxIntervalHeights:new l(new M),densityScales:new l(new Q),shapeAmounts:new l(new Q),shapeDetailAmounts:new l(new Q),weatherExponents:new l(new Q),shapeAlteringBiases:new l(new Q),coverageFilterWidths:new l(new Q),minHeight:new l(0),maxHeight:new l(0),shadowTopHeight:new l(0),shadowBottomHeight:new l(0),shadowLayerMask:new l(new Q),densityProfile:new l({expTerms:new Q,exponents:new Q,linearTerms:new Q,constantTerms:new Q})}}var Jr=[0,0,0,0];function vl(t,e){e.packValues("altitude",t.minLayerHeights.value),e.packSums("altitude","height",t.maxLayerHeights.value),e.packIntervalHeights(t.minIntervalHeights.value,t.maxIntervalHeights.value),e.packValues("densityScale",t.densityScales.value),e.packValues("shapeAmount",t.shapeAmounts.value),e.packValues("shapeDetailAmount",t.shapeDetailAmounts.value),e.packValues("weatherExponent",t.weatherExponents.value),e.packValues("shapeAlteringBias",t.shapeAlteringBiases.value),e.packValues("coverageFilterWidth",t.coverageFilterWidths.value);let r=t.densityProfile.value;e.packDensityProfiles("expTerm",r.expTerms),e.packDensityProfiles("exponent",r.exponents),e.packDensityProfiles("linearTerm",r.linearTerms),e.packDensityProfiles("constantTerm",r.constantTerms);let i=1/0,a=0,n=1/0,s=0;Jr.fill(0);for(let o=0;o<e.length;++o){let{altitude:c,height:u,shadow:h}=e[o],f=c+u;u>0&&(c<i&&(i=c),h&&c<n&&(n=c),f>a&&(a=f),h&&f>s&&(s=f)),Jr[o]=h?1:0}i!==1/0?(t.minHeight.value=i,t.maxHeight.value=a):(xe(a===0),t.minHeight.value=0),n!==1/0?(t.shadowBottomHeight.value=n,t.shadowTopHeight.value=s):(xe(s===0),t.shadowBottomHeight.value=0),t.shadowLayerMask.value.fromArray(Jr)}function Al(t,e){return{bottomRadius:new l(t.bottomRadius),topRadius:new l(t.topRadius),worldToECEFMatrix:new l(e.worldToECEFMatrix),ecefToWorldMatrix:new l(e.ecefToWorldMatrix),altitudeCorrection:new l(e.altitudeCorrection),sunDirection:new l(e.sunDirection)}}var Tl=`uniform sampler2D cloudsBuffer;

void mainImage(const vec4 inputColor, const vec2 uv, out vec4 outputColor) {
  #ifdef SKIP_RENDERING
  outputColor = inputColor;
  #else // SKIP_RENDERING
  vec4 clouds = texture(cloudsBuffer, uv);
  outputColor.rgb = inputColor.rgb * (1.0 - clouds.a) + clouds.rgb;
  outputColor.a = inputColor.a * (1.0 - clouds.a) + clouds.a;
  #endif // SKIP_RENDERING
}
`,Sl=Object.defineProperty,xl=(t,e,r,i)=>{for(var a=void 0,n=t.length-1,s;n>=0;n--)(s=t[n])&&(a=s(e,r,a)||a);return a&&Sl(e,r,a),a},Tt=new M,El=new P,wl=new Fc,yl=["maxIterationCount","minStepSize","maxStepSize","maxRayDistance","perspectiveStepScale","minDensity","minExtinction","minTransmittance","maxIterationCountToSun","maxIterationCountToGround","minSecondaryStepSize","secondaryStepScale","maxShadowFilterRadius","maxShadowLengthIterationCount","minShadowLengthStepSize","maxShadowLengthRayDistance","hazeDensityScale","hazeExponent","hazeScatteringCoefficient","hazeAbsorptionCoefficient"],Dl=["multiScatteringOctaves","accurateSunSkyLight","accuratePhaseFunction"],Cl=["maxIterationCount","minStepSize","maxStepSize","minDensity","minExtinction","minTransmittance","opticalDepthTailScale"],Rl=["temporalJitter"],_l=["temporalPass"],Il=["cascadeCount","mapSize","maxFar","farScale","splitMode","splitLambda"],me={type:"change"},tn={resolutionScale:m.resolutionScale,width:wt.AUTO_SIZE,height:wt.AUTO_SIZE},Et=class extends Ze{constructor(e=new Ya,r,i=Xe.DEFAULT){super("CloudsEffect",Tl,{attributes:K.DEPTH,uniforms:new Map([["cloudsBuffer",new l(null)]])}),this.camera=e,this.atmosphere=i,this.cloudLayers=Ka.DEFAULT.clone(),this.correctAltitude=!0,this.localWeatherRepeat=new P().setScalar(100),this.localWeatherOffset=new P,this.shapeRepeat=new M().setScalar(3e-4),this.shapeOffset=new M,this.shapeDetailRepeat=new M().setScalar(.006),this.shapeDetailOffset=new M,this.turbulenceRepeat=new P().setScalar(20),this.worldToECEFMatrix=new N,this.ecefToWorldMatrix=new N,this.altitudeCorrection=new M,this.sunDirection=new M,this.localWeatherVelocity=new P,this.shapeVelocity=new M,this.shapeDetailVelocity=new M,this._atmosphereOverlay=null,this._atmosphereShadow=null,this._atmosphereShadowLength=null,this.events=new Bc,this.frame=0,this.shadowCascadeCount=0,this.shadowMapSize=new P,this.onResolutionChange=()=>{this.setSize(this.resolution.baseWidth,this.resolution.baseHeight)},this.skipRendering=!0;let{resolutionScale:a,width:n,height:s,resolutionX:o=n,resolutionY:c=s}={...tn,...r};this.shadowMaps=new ti({cascadeCount:m.shadow.cascadeCount,mapSize:m.shadow.mapSize,splitLambda:.6}),this.parameterUniforms=pl({localWeatherTexture:this.proceduralLocalWeather?.texture??null,localWeatherRepeat:this.localWeatherRepeat,localWeatherOffset:this.localWeatherOffset,shapeTexture:this.proceduralShape?.texture??null,shapeRepeat:this.shapeRepeat,shapeOffset:this.shapeOffset,shapeDetailTexture:this.proceduralShapeDetail?.texture??null,shapeDetailRepeat:this.shapeDetailRepeat,shapeDetailOffset:this.shapeDetailOffset,turbulenceTexture:this.proceduralTurbulence?.texture??null,turbulenceRepeat:this.turbulenceRepeat}),this.layerUniforms=gl(),this.atmosphereUniforms=Al(i,{worldToECEFMatrix:this.worldToECEFMatrix,ecefToWorldMatrix:this.ecefToWorldMatrix,altitudeCorrection:this.altitudeCorrection,sunDirection:this.sunDirection});let u={shadow:this.shadowMaps,parameterUniforms:this.parameterUniforms,layerUniforms:this.layerUniforms,atmosphereUniforms:this.atmosphereUniforms};this.shadowPass=new ai(u),this.shadowPass.mainCamera=e,this.cloudsPass=new ii(u,i),this.cloudsPass.mainCamera=e,this.clouds=Fr(Hr({},this.cloudsPass.currentMaterial,yl),this.cloudsPass.currentMaterial,Dl),this.shadow=Fr(Hr({},this.shadowPass.currentMaterial,Cl),this.shadowPass.currentMaterial,Rl,this.shadowPass,_l,this.shadowMaps,Il),this.resolution=new wt(this,o,c,a),this.resolution.addEventListener("change",this.onResolutionChange)}get mainCamera(){return this.camera}set mainCamera(e){this.camera=e,this.shadowPass.mainCamera=e,this.cloudsPass.mainCamera=e}initialize(e,r,i){this.shadowPass.initialize(e,r,i),this.cloudsPass.initialize(e,r,i)}updateSharedUniforms(e){vl(this.layerUniforms,this.cloudLayers);let{parameterUniforms:r}=this;r.localWeatherOffset.value.add(El.copy(this.localWeatherVelocity).multiplyScalar(e)),r.shapeOffset.value.add(Tt.copy(this.shapeVelocity).multiplyScalar(e)),r.shapeDetailOffset.value.add(Tt.copy(this.shapeDetailVelocity).multiplyScalar(e));let i=this.worldToECEFMatrix;this.ecefToWorldMatrix.copy(i).invert();let a=this.camera.getWorldPosition(Tt).applyMatrix4(this.worldToECEFMatrix),n=this.altitudeCorrection;this.correctAltitude?ze(a,this.atmosphere.bottomRadius,this.ellipsoid,n):n.setScalar(0);let s=this.ellipsoid.getSurfaceNormal(a,Tt),o=this.sunDirection.dot(s),c=Ur(1e6,1e3,o),u=wl.setFromMatrix4(i).transpose();this.shadowMaps.update(this.camera,Tt.copy(this.sunDirection).applyMatrix3(u),c)}updateWeatherTextureChannels(){let e=this.cloudLayers.localWeatherChannels;this.cloudsPass.currentMaterial.localWeatherChannels=e,this.shadowPass.currentMaterial.localWeatherChannels=e}updateAtmosphereComposition(){let{shadowMaps:e,shadowPass:r,cloudsPass:i}=this,a=r.currentMaterial.uniforms,n=i.currentMaterial.uniforms,s=this._atmosphereOverlay,o=Object.assign(this._atmosphereOverlay??{},{map:i.outputBuffer});s!==o&&(this._atmosphereOverlay=o,me.target=this,me.property="atmosphereOverlay",this.events.dispatchEvent(me));let c=this._atmosphereShadow,u=Object.assign(this._atmosphereShadow??{},{map:r.outputBuffer,mapSize:e.mapSize,cascadeCount:e.cascadeCount,intervals:n.shadowIntervals.value,matrices:n.shadowMatrices.value,inverseMatrices:a.inverseShadowMatrices.value,far:e.far,topHeight:n.shadowTopHeight.value});c!==u&&(this._atmosphereShadow=u,me.target=this,me.property="atmosphereShadow",this.events.dispatchEvent(me));let h=this._atmosphereShadowLength,f=i.shadowLengthBuffer!=null?Object.assign(this._atmosphereShadowLength??{},{map:i.shadowLengthBuffer}):null;h!==f&&(this._atmosphereShadowLength=f,me.target=this,me.property="atmosphereShadowLength",this.events.dispatchEvent(me))}update(e,r,i=0){let{shadowMaps:a,shadowPass:n,cloudsPass:s}=this;if(a.cascadeCount!==this.shadowCascadeCount||!a.mapSize.equals(this.shadowMapSize)){let{width:o,height:c}=a.mapSize,u=a.cascadeCount;this.shadowMapSize.set(o,c),this.shadowCascadeCount=u,n.setSize(o,c,u),s.setShadowSize(o,c,u)}this.proceduralLocalWeather?.render(e,i),this.proceduralShape?.render(e,i),this.proceduralShapeDetail?.render(e,i),this.proceduralTurbulence?.render(e,i),++this.frame,this.updateSharedUniforms(i),this.updateWeatherTextureChannels(),n.update(e,this.frame,i),s.shadowBuffer=n.outputBuffer,s.update(e,this.frame,i),this.updateAtmosphereComposition(),this.uniforms.get("cloudsBuffer").value=this.cloudsPass.outputBuffer}setSize(e,r){let{resolution:i}=this;i.setBaseSize(e,r);let{width:a,height:n}=i;this.cloudsPass.setSize(a,n)}setDepthTexture(e,r){this.shadowPass.setDepthTexture(e,r),this.cloudsPass.setDepthTexture(e,r)}set qualityPreset(e){let{clouds:r,shadow:i,...a}=Zc[e];Object.assign(this,a),Object.assign(this.clouds,r),Object.assign(this.shadow,i)}get localWeatherTexture(){return this.proceduralLocalWeather??this.parameterUniforms.localWeatherTexture.value}set localWeatherTexture(e){e instanceof Fa||e==null?(this.proceduralLocalWeather=void 0,this.parameterUniforms.localWeatherTexture.value=e):(this.proceduralLocalWeather=e,this.parameterUniforms.localWeatherTexture.value=e.texture)}get shapeTexture(){return this.proceduralShape??this.parameterUniforms.shapeTexture.value}set shapeTexture(e){e instanceof Ha||e==null?(this.proceduralShape=void 0,this.parameterUniforms.shapeTexture.value=e):(this.proceduralShape=e,this.parameterUniforms.shapeTexture.value=e.texture)}get shapeDetailTexture(){return this.proceduralShapeDetail??this.parameterUniforms.shapeDetailTexture.value}set shapeDetailTexture(e){e instanceof Ha||e==null?(this.proceduralShapeDetail=void 0,this.parameterUniforms.shapeDetailTexture.value=e):(this.proceduralShapeDetail=e,this.parameterUniforms.shapeDetailTexture.value=e.texture)}get turbulenceTexture(){return this.proceduralTurbulence??this.parameterUniforms.turbulenceTexture.value}set turbulenceTexture(e){e instanceof Fa||e==null?(this.proceduralTurbulence=void 0,this.parameterUniforms.turbulenceTexture.value=e):(this.proceduralTurbulence=e,this.parameterUniforms.turbulenceTexture.value=e.texture)}get stbnTexture(){return this.cloudsPass.currentMaterial.uniforms.stbnTexture.value}set stbnTexture(e){this.cloudsPass.currentMaterial.uniforms.stbnTexture.value=e,this.shadowPass.currentMaterial.uniforms.stbnTexture.value=e}get resolutionScale(){return this.resolution.scale}set resolutionScale(e){this.resolution.scale=e}get temporalUpscale(){return this.cloudsPass.temporalUpscale}set temporalUpscale(e){this.cloudsPass.temporalUpscale=e}get lightShafts(){return this.cloudsPass.lightShafts}set lightShafts(e){this.cloudsPass.lightShafts=e}get shapeDetail(){return this.cloudsPass.currentMaterial.shapeDetail}set shapeDetail(e){this.cloudsPass.currentMaterial.shapeDetail=e,this.shadowPass.currentMaterial.shapeDetail=e}get turbulence(){return this.cloudsPass.currentMaterial.turbulence}set turbulence(e){this.cloudsPass.currentMaterial.turbulence=e,this.shadowPass.currentMaterial.turbulence=e}get haze(){return this.cloudsPass.currentMaterial.haze}set haze(e){this.cloudsPass.currentMaterial.haze=e}get scatteringCoefficient(){return this.parameterUniforms.scatteringCoefficient.value}set scatteringCoefficient(e){this.parameterUniforms.scatteringCoefficient.value=e}get absorptionCoefficient(){return this.parameterUniforms.absorptionCoefficient.value}set absorptionCoefficient(e){this.parameterUniforms.absorptionCoefficient.value=e}get coverage(){return this.parameterUniforms.coverage.value}set coverage(e){this.parameterUniforms.coverage.value=e}get turbulenceDisplacement(){return this.parameterUniforms.turbulenceDisplacement.value}set turbulenceDisplacement(e){this.parameterUniforms.turbulenceDisplacement.value=e}get scatterAnisotropy1(){return this.cloudsPass.currentMaterial.scatterAnisotropy1}set scatterAnisotropy1(e){this.cloudsPass.currentMaterial.scatterAnisotropy1=e}get scatterAnisotropy2(){return this.cloudsPass.currentMaterial.scatterAnisotropy2}set scatterAnisotropy2(e){this.cloudsPass.currentMaterial.scatterAnisotropy2=e}get scatterAnisotropyMix(){return this.cloudsPass.currentMaterial.scatterAnisotropyMix}set scatterAnisotropyMix(e){this.cloudsPass.currentMaterial.scatterAnisotropyMix=e}get skyLightScale(){return this.cloudsPass.currentMaterial.uniforms.skyLightScale.value}set skyLightScale(e){this.cloudsPass.currentMaterial.uniforms.skyLightScale.value=e}get groundBounceScale(){return this.cloudsPass.currentMaterial.uniforms.groundBounceScale.value}set groundBounceScale(e){this.cloudsPass.currentMaterial.uniforms.groundBounceScale.value=e}get powderScale(){return this.cloudsPass.currentMaterial.uniforms.powderScale.value}set powderScale(e){this.cloudsPass.currentMaterial.uniforms.powderScale.value=e}get powderExponent(){return this.cloudsPass.currentMaterial.uniforms.powderExponent.value}set powderExponent(e){this.cloudsPass.currentMaterial.uniforms.powderExponent.value=e}get atmosphereOverlay(){return this._atmosphereOverlay}get atmosphereShadow(){return this._atmosphereShadow}get atmosphereShadowLength(){return this._atmosphereShadowLength}get irradianceTexture(){return this.cloudsPass.currentMaterial.irradianceTexture}set irradianceTexture(e){this.cloudsPass.currentMaterial.irradianceTexture=e}get scatteringTexture(){return this.cloudsPass.currentMaterial.scatteringTexture}set scatteringTexture(e){this.cloudsPass.currentMaterial.scatteringTexture=e}get transmittanceTexture(){return this.cloudsPass.currentMaterial.transmittanceTexture}set transmittanceTexture(e){this.cloudsPass.currentMaterial.transmittanceTexture=e}get singleMieScatteringTexture(){return this.cloudsPass.currentMaterial.singleMieScatteringTexture}set singleMieScatteringTexture(e){this.cloudsPass.currentMaterial.singleMieScatteringTexture=e}get higherOrderScatteringTexture(){return this.cloudsPass.currentMaterial.higherOrderScatteringTexture}set higherOrderScatteringTexture(e){this.cloudsPass.currentMaterial.higherOrderScatteringTexture=e}get ellipsoid(){return this.cloudsPass.currentMaterial.ellipsoid}set ellipsoid(e){this.cloudsPass.currentMaterial.ellipsoid=e}get sunAngularRadius(){return this.cloudsPass.currentMaterial.sunAngularRadius}set sunAngularRadius(e){this.cloudsPass.currentMaterial.sunAngularRadius=e}};xl([v("SKIP_RENDERING")],Et.prototype,"skipRendering");var rn=128,an=32,tr="45a1c6c1bb9fd38b3680fd120795ff4c32df68ff",Ml=`https://media.githubusercontent.com/media/takram-design-engineering/three-geospatial/${tr}/packages/clouds/assets/local_weather.png`,Pl=`https://media.githubusercontent.com/media/takram-design-engineering/three-geospatial/${tr}/packages/clouds/assets/shape.bin`,Nl=`https://media.githubusercontent.com/media/takram-design-engineering/three-geospatial/${tr}/packages/clouds/assets/shape_detail.bin`,bl=`https://media.githubusercontent.com/media/takram-design-engineering/three-geospatial/${tr}/packages/clouds/assets/turbulence.png`;import{Camera as vv,RawShaderMaterial as Av,Uniform as Tv,GLSL3 as Sv,Mesh as xv,PlaneGeometry as Ev,WebGL3DRenderTarget as wv,RedFormat as yv,LinearFilter as Dv,RepeatWrapping as Cv,NoColorSpace as Rv,WebGLRenderTarget as _v,RGBAFormat as Iv,LinearMipMapLinearFilter as Mv}from"three";export{U as AerialPerspectiveEffect,g as BlendFunction,an as CLOUD_SHAPE_DETAIL_TEXTURE_SIZE,rn as CLOUD_SHAPE_TEXTURE_SIZE,Et as CloudsEffect,pi as DEFAULT_STBN_URL,ue as DataTextureLoader,Ze as Effect,K as EffectAttribute,Ts as EffectPass,oe as Ellipsoid,$ as Geodetic,Xt as PrecomputedTexturesLoader,yt as STBNLoader,Go as parseUint8Array,Lr as radians};
/*! Bundled license information:

postprocessing/build/index.js:
  (**
   * postprocessing v6.39.5 build Wed Sep 09 2026
   * https://github.com/pmndrs/postprocessing
   * Copyright 2015-2026 Raoul van Rüschen
   * @license Zlib
   *)

@takram/three-atmosphere/build/shared.js:
  (**
      @preserve
  
      Astronomy library for JavaScript (browser and Node.js).
      https://github.com/cosinekitty/astronomy
  
      MIT License
  
      Copyright (c) 2019-2023 Don Cross <cosinekitty@gmail.com>
  
      Permission is hereby granted, free of charge, to any person obtaining a copy
      of this software and associated documentation files (the "Software"), to deal
      in the Software without restriction, including without limitation the rights
      to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
      copies of the Software, and to permit persons to whom the Software is
      furnished to do so, subject to the following conditions:
  
      The above copyright notice and this permission notice shall be included in all
      copies or substantial portions of the Software.
  
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
      OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
  *)
  (**
   * @fileoverview Astronomy calculation library for browser scripting and Node.js.
   * @author Don Cross <cosinekitty@gmail.com>
   * @license MIT
   *)
*/
