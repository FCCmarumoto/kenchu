/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.97
 *
 * Copyright 2011-2022 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/main/LICENSE.md for full licensing details.
 */
define(["./arrayRemoveDuplicates-7ccf3114","./Transforms-0c3fa360","./Matrix2-276d97d2","./ComponentDatatype-7f6d9570","./PolylineVolumeGeometryLibrary-d8099b25","./CorridorGeometryLibrary-7c96afff","./defaultValue-a6eb9f34","./GeometryAttribute-54019f82","./GeometryAttributes-aff51037","./GeometryOffsetAttribute-102da468","./IndexDatatype-856d3a0c","./PolygonPipeline-1667c4fc","./VertexFormat-31cdbccc","./_commonjsHelpers-89c9b271","./combine-7cf28d88","./RuntimeError-07496d94","./WebGLConstants-d81b330d","./EllipsoidTangentPlane-30c83574","./AxisAlignedBoundingBox-646dc833","./IntersectionTests-fbcff83c","./Plane-17fe9d66","./PolylinePipeline-f9c3fc71","./EllipsoidGeodesic-3107c30b","./EllipsoidRhumbLine-f1dbc710"],(function(t,e,r,a,i,o,n,s,l,d,u,c,m,f,y,p,g,h,C,b,A,_,w,v){"use strict";const T=new r.Cartesian3,G=new r.Cartesian3,E=new r.Cartesian3,V=new r.Cartesian3,x=new r.Cartesian3,L=new r.Cartesian3,P=new r.Cartesian3,F=new r.Cartesian3;function N(t,e){for(let r=0;r<t.length;r++)t[r]=e.scaleToGeodeticSurface(t[r],t[r]);return t}function D(t,e,a,i,n,s){const l=t.normals,d=t.tangents,u=t.bitangents,c=r.Cartesian3.normalize(r.Cartesian3.cross(a,e,P),P);s.normal&&o.CorridorGeometryLibrary.addAttribute(l,e,i,n),s.tangent&&o.CorridorGeometryLibrary.addAttribute(d,c,i,n),s.bitangent&&o.CorridorGeometryLibrary.addAttribute(u,a,i,n)}function M(t,e,i){const d=t.positions,c=t.corners,m=t.endPositions,f=t.lefts,y=t.normals,p=new l.GeometryAttributes;let g,h,C,b=0,A=0,_=0;for(h=0;h<d.length;h+=2)C=d[h].length-3,b+=C,_+=2*C,A+=d[h+1].length-3;for(b+=3,A+=3,h=0;h<c.length;h++){g=c[h];const t=c[h].leftPositions;n.defined(t)?(C=t.length,b+=C,_+=C):(C=c[h].rightPositions.length,A+=C,_+=C)}const w=n.defined(m);let v;w&&(v=m[0].length-3,b+=v,A+=v,v/=3,_+=6*v);const x=b+A,N=new Float64Array(x),M={normals:e.normal?new Float32Array(x):void 0,tangents:e.tangent?new Float32Array(x):void 0,bitangents:e.bitangent?new Float32Array(x):void 0};let O,I,S,R,k,H,z=0,B=x-1,U=T,Y=G;const W=v/2,q=u.IndexDatatype.createTypedArray(x/3,_);let j=0;if(w){H=E,k=V;const t=m[0];for(U=r.Cartesian3.fromArray(y,0,U),Y=r.Cartesian3.fromArray(f,0,Y),h=0;h<W;h++)H=r.Cartesian3.fromArray(t,3*(W-1-h),H),k=r.Cartesian3.fromArray(t,3*(W+h),k),o.CorridorGeometryLibrary.addAttribute(N,k,z),o.CorridorGeometryLibrary.addAttribute(N,H,void 0,B),D(M,U,Y,z,B,e),I=z/3,R=I+1,O=(B-2)/3,S=O-1,q[j++]=O,q[j++]=I,q[j++]=S,q[j++]=S,q[j++]=I,q[j++]=R,z+=3,B-=3}let J,K,Q=0,X=0,Z=d[Q++],$=d[Q++];for(N.set(Z,z),N.set($,B-$.length+1),Y=r.Cartesian3.fromArray(f,X,Y),C=$.length-3,h=0;h<C;h+=3)J=i.geodeticSurfaceNormal(r.Cartesian3.fromArray(Z,h,P),P),K=i.geodeticSurfaceNormal(r.Cartesian3.fromArray($,C-h,F),F),U=r.Cartesian3.normalize(r.Cartesian3.add(J,K,U),U),D(M,U,Y,z,B,e),I=z/3,R=I+1,O=(B-2)/3,S=O-1,q[j++]=O,q[j++]=I,q[j++]=S,q[j++]=S,q[j++]=I,q[j++]=R,z+=3,B-=3;for(J=i.geodeticSurfaceNormal(r.Cartesian3.fromArray(Z,C,P),P),K=i.geodeticSurfaceNormal(r.Cartesian3.fromArray($,C,F),F),U=r.Cartesian3.normalize(r.Cartesian3.add(J,K,U),U),X+=3,h=0;h<c.length;h++){let t;g=c[h];const a=g.leftPositions,s=g.rightPositions;let l,u,m=L,p=E,b=V;if(U=r.Cartesian3.fromArray(y,X,U),n.defined(a)){for(D(M,U,Y,void 0,B,e),B-=3,l=R,u=S,t=0;t<a.length/3;t++)m=r.Cartesian3.fromArray(a,3*t,m),q[j++]=l,q[j++]=u-t-1,q[j++]=u-t,o.CorridorGeometryLibrary.addAttribute(N,m,void 0,B),p=r.Cartesian3.fromArray(N,3*(u-t-1),p),b=r.Cartesian3.fromArray(N,3*l,b),Y=r.Cartesian3.normalize(r.Cartesian3.subtract(p,b,Y),Y),D(M,U,Y,void 0,B,e),B-=3;m=r.Cartesian3.fromArray(N,3*l,m),p=r.Cartesian3.subtract(r.Cartesian3.fromArray(N,3*u,p),m,p),b=r.Cartesian3.subtract(r.Cartesian3.fromArray(N,3*(u-t),b),m,b),Y=r.Cartesian3.normalize(r.Cartesian3.add(p,b,Y),Y),D(M,U,Y,z,void 0,e),z+=3}else{for(D(M,U,Y,z,void 0,e),z+=3,l=S,u=R,t=0;t<s.length/3;t++)m=r.Cartesian3.fromArray(s,3*t,m),q[j++]=l,q[j++]=u+t,q[j++]=u+t+1,o.CorridorGeometryLibrary.addAttribute(N,m,z),p=r.Cartesian3.fromArray(N,3*l,p),b=r.Cartesian3.fromArray(N,3*(u+t),b),Y=r.Cartesian3.normalize(r.Cartesian3.subtract(p,b,Y),Y),D(M,U,Y,z,void 0,e),z+=3;m=r.Cartesian3.fromArray(N,3*l,m),p=r.Cartesian3.subtract(r.Cartesian3.fromArray(N,3*(u+t),p),m,p),b=r.Cartesian3.subtract(r.Cartesian3.fromArray(N,3*u,b),m,b),Y=r.Cartesian3.normalize(r.Cartesian3.negate(r.Cartesian3.add(b,p,Y),Y),Y),D(M,U,Y,void 0,B,e),B-=3}for(Z=d[Q++],$=d[Q++],Z.splice(0,3),$.splice($.length-3,3),N.set(Z,z),N.set($,B-$.length+1),C=$.length-3,X+=3,Y=r.Cartesian3.fromArray(f,X,Y),t=0;t<$.length;t+=3)J=i.geodeticSurfaceNormal(r.Cartesian3.fromArray(Z,t,P),P),K=i.geodeticSurfaceNormal(r.Cartesian3.fromArray($,C-t,F),F),U=r.Cartesian3.normalize(r.Cartesian3.add(J,K,U),U),D(M,U,Y,z,B,e),R=z/3,I=R-1,S=(B-2)/3,O=S+1,q[j++]=O,q[j++]=I,q[j++]=S,q[j++]=S,q[j++]=I,q[j++]=R,z+=3,B-=3;z-=3,B+=3}if(U=r.Cartesian3.fromArray(y,y.length-3,U),D(M,U,Y,z,B,e),w){z+=3,B-=3,H=E,k=V;const t=m[1];for(h=0;h<W;h++)H=r.Cartesian3.fromArray(t,3*(v-h-1),H),k=r.Cartesian3.fromArray(t,3*h,k),o.CorridorGeometryLibrary.addAttribute(N,H,void 0,B),o.CorridorGeometryLibrary.addAttribute(N,k,z),D(M,U,Y,z,B,e),R=z/3,I=R-1,S=(B-2)/3,O=S+1,q[j++]=O,q[j++]=I,q[j++]=S,q[j++]=S,q[j++]=I,q[j++]=R,z+=3,B-=3}if(p.position=new s.GeometryAttribute({componentDatatype:a.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:N}),e.st){const t=new Float32Array(x/3*2);let e,r,i=0;if(w){b/=3,A/=3;const o=Math.PI/(v+1);let n;r=1/(b-v+1),e=1/(A-v+1);const s=v/2;for(h=s+1;h<v+1;h++)n=a.CesiumMath.PI_OVER_TWO+o*h,t[i++]=e*(1+Math.cos(n)),t[i++]=.5*(1+Math.sin(n));for(h=1;h<A-v+1;h++)t[i++]=h*e,t[i++]=0;for(h=v;h>s;h--)n=a.CesiumMath.PI_OVER_TWO-h*o,t[i++]=1-e*(1+Math.cos(n)),t[i++]=.5*(1+Math.sin(n));for(h=s;h>0;h--)n=a.CesiumMath.PI_OVER_TWO-o*h,t[i++]=1-r*(1+Math.cos(n)),t[i++]=.5*(1+Math.sin(n));for(h=b-v;h>0;h--)t[i++]=h*r,t[i++]=1;for(h=1;h<s+1;h++)n=a.CesiumMath.PI_OVER_TWO+o*h,t[i++]=r*(1+Math.cos(n)),t[i++]=.5*(1+Math.sin(n))}else{for(b/=3,A/=3,r=1/(b-1),e=1/(A-1),h=0;h<A;h++)t[i++]=h*e,t[i++]=0;for(h=b;h>0;h--)t[i++]=(h-1)*r,t[i++]=1}p.st=new s.GeometryAttribute({componentDatatype:a.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:t})}return e.normal&&(p.normal=new s.GeometryAttribute({componentDatatype:a.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:M.normals})),e.tangent&&(p.tangent=new s.GeometryAttribute({componentDatatype:a.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:M.tangents})),e.bitangent&&(p.bitangent=new s.GeometryAttribute({componentDatatype:a.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:M.bitangents})),{attributes:p,indices:q}}function O(t,e,r){r[e++]=t[0],r[e++]=t[1],r[e++]=t[2];for(let a=3;a<t.length;a+=3){const i=t[a],o=t[a+1],n=t[a+2];r[e++]=i,r[e++]=o,r[e++]=n,r[e++]=i,r[e++]=o,r[e++]=n}return r[e++]=t[0],r[e++]=t[1],r[e++]=t[2],r}function I(t,e){const i=new m.VertexFormat({position:e.position,normal:e.normal||e.bitangent||t.shadowVolume,tangent:e.tangent,bitangent:e.normal||e.bitangent,st:e.st}),l=t.ellipsoid,f=M(o.CorridorGeometryLibrary.computePositions(t),i,l),y=t.height,p=t.extrudedHeight;let g=f.attributes;const h=f.indices;let C=g.position.values,b=C.length;const A=new Float64Array(6*b);let _=new Float64Array(b);_.set(C);let w,v=new Float64Array(4*b);C=c.PolygonPipeline.scaleToGeodeticHeight(C,y,l),v=O(C,0,v),_=c.PolygonPipeline.scaleToGeodeticHeight(_,p,l),v=O(_,2*b,v),A.set(C),A.set(_,b),A.set(v,2*b),g.position.values=A,g=function(t,e){if(!(e.normal||e.tangent||e.bitangent||e.st))return t;const a=t.position.values;let i,n;(e.normal||e.bitangent)&&(i=t.normal.values,n=t.bitangent.values);const s=t.position.values.length/18,l=3*s,d=2*s,u=2*l;let c;if(e.normal||e.bitangent||e.tangent){const s=e.normal?new Float32Array(6*l):void 0,d=e.tangent?new Float32Array(6*l):void 0,m=e.bitangent?new Float32Array(6*l):void 0;let f=T,y=G,p=E,g=V,h=x,C=L,b=u;for(c=0;c<l;c+=3){const t=b+u;f=r.Cartesian3.fromArray(a,c,f),y=r.Cartesian3.fromArray(a,c+l,y),p=r.Cartesian3.fromArray(a,(c+3)%l,p),y=r.Cartesian3.subtract(y,f,y),p=r.Cartesian3.subtract(p,f,p),g=r.Cartesian3.normalize(r.Cartesian3.cross(y,p,g),g),e.normal&&(o.CorridorGeometryLibrary.addAttribute(s,g,t),o.CorridorGeometryLibrary.addAttribute(s,g,t+3),o.CorridorGeometryLibrary.addAttribute(s,g,b),o.CorridorGeometryLibrary.addAttribute(s,g,b+3)),(e.tangent||e.bitangent)&&(C=r.Cartesian3.fromArray(i,c,C),e.bitangent&&(o.CorridorGeometryLibrary.addAttribute(m,C,t),o.CorridorGeometryLibrary.addAttribute(m,C,t+3),o.CorridorGeometryLibrary.addAttribute(m,C,b),o.CorridorGeometryLibrary.addAttribute(m,C,b+3)),e.tangent&&(h=r.Cartesian3.normalize(r.Cartesian3.cross(C,g,h),h),o.CorridorGeometryLibrary.addAttribute(d,h,t),o.CorridorGeometryLibrary.addAttribute(d,h,t+3),o.CorridorGeometryLibrary.addAttribute(d,h,b),o.CorridorGeometryLibrary.addAttribute(d,h,b+3))),b+=6}if(e.normal){for(s.set(i),c=0;c<l;c+=3)s[c+l]=-i[c],s[c+l+1]=-i[c+1],s[c+l+2]=-i[c+2];t.normal.values=s}else t.normal=void 0;if(e.bitangent?(m.set(n),m.set(n,l),t.bitangent.values=m):t.bitangent=void 0,e.tangent){const e=t.tangent.values;d.set(e),d.set(e,l),t.tangent.values=d}}if(e.st){const e=t.st.values,r=new Float32Array(6*d);r.set(e),r.set(e,d);let a=2*d;for(let t=0;t<2;t++){for(r[a++]=e[0],r[a++]=e[1],c=2;c<d;c+=2){const t=e[c],i=e[c+1];r[a++]=t,r[a++]=i,r[a++]=t,r[a++]=i}r[a++]=e[0],r[a++]=e[1]}t.st.values=r}return t}(g,e);const P=b/3;if(t.shadowVolume){const t=g.normal.values;b=t.length;let r=new Float32Array(6*b);for(w=0;w<b;w++)t[w]=-t[w];r.set(t,b),r=O(t,4*b,r),g.extrudeDirection=new s.GeometryAttribute({componentDatatype:a.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:r}),e.normal||(g.normal=void 0)}if(n.defined(t.offsetAttribute)){let e=new Uint8Array(6*P);if(t.offsetAttribute===d.GeometryOffsetAttribute.TOP)e=e.fill(1,0,P).fill(1,2*P,4*P);else{const r=t.offsetAttribute===d.GeometryOffsetAttribute.NONE?0:1;e=e.fill(r)}g.applyOffset=new s.GeometryAttribute({componentDatatype:a.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:e})}const F=h.length,N=P+P,D=u.IndexDatatype.createTypedArray(A.length/3,2*F+3*N);D.set(h);let I,S,R,k,H=F;for(w=0;w<F;w+=3){const t=h[w],e=h[w+1],r=h[w+2];D[H++]=r+P,D[H++]=e+P,D[H++]=t+P}for(w=0;w<N;w+=2)I=w+N,S=I+N,R=I+1,k=S+1,D[H++]=I,D[H++]=S,D[H++]=R,D[H++]=R,D[H++]=S,D[H++]=k;return{attributes:g,indices:D}}const S=new r.Cartesian3,R=new r.Cartesian3,k=new r.Cartographic;function H(t,e,a,i,o,n){const s=r.Cartesian3.subtract(e,t,S);r.Cartesian3.normalize(s,s);const l=a.geodeticSurfaceNormal(t,R),d=r.Cartesian3.cross(s,l,S);r.Cartesian3.multiplyByScalar(d,i,d);let u=o.latitude,c=o.longitude,m=n.latitude,f=n.longitude;r.Cartesian3.add(t,d,R),a.cartesianToCartographic(R,k);let y=k.latitude,p=k.longitude;u=Math.min(u,y),c=Math.min(c,p),m=Math.max(m,y),f=Math.max(f,p),r.Cartesian3.subtract(t,d,R),a.cartesianToCartographic(R,k),y=k.latitude,p=k.longitude,u=Math.min(u,y),c=Math.min(c,p),m=Math.max(m,y),f=Math.max(f,p),o.latitude=u,o.longitude=c,n.latitude=m,n.longitude=f}const z=new r.Cartesian3,B=new r.Cartesian3,U=new r.Cartographic,Y=new r.Cartographic;function W(e,a,o,s,l){e=N(e,a);const d=t.arrayRemoveDuplicates(e,r.Cartesian3.equalsEpsilon),u=d.length;if(u<2||o<=0)return new r.Rectangle;const c=.5*o;let m,f;if(U.latitude=Number.POSITIVE_INFINITY,U.longitude=Number.POSITIVE_INFINITY,Y.latitude=Number.NEGATIVE_INFINITY,Y.longitude=Number.NEGATIVE_INFINITY,s===i.CornerType.ROUNDED){const t=d[0];r.Cartesian3.subtract(t,d[1],z),r.Cartesian3.normalize(z,z),r.Cartesian3.multiplyByScalar(z,c,z),r.Cartesian3.add(t,z,B),a.cartesianToCartographic(B,k),m=k.latitude,f=k.longitude,U.latitude=Math.min(U.latitude,m),U.longitude=Math.min(U.longitude,f),Y.latitude=Math.max(Y.latitude,m),Y.longitude=Math.max(Y.longitude,f)}for(let t=0;t<u-1;++t)H(d[t],d[t+1],a,c,U,Y);const y=d[u-1];r.Cartesian3.subtract(y,d[u-2],z),r.Cartesian3.normalize(z,z),r.Cartesian3.multiplyByScalar(z,c,z),r.Cartesian3.add(y,z,B),H(y,B,a,c,U,Y),s===i.CornerType.ROUNDED&&(a.cartesianToCartographic(B,k),m=k.latitude,f=k.longitude,U.latitude=Math.min(U.latitude,m),U.longitude=Math.min(U.longitude,f),Y.latitude=Math.max(Y.latitude,m),Y.longitude=Math.max(Y.longitude,f));const p=n.defined(l)?l:new r.Rectangle;return p.north=Y.latitude,p.south=U.latitude,p.east=Y.longitude,p.west=U.longitude,p}function q(t){const e=(t=n.defaultValue(t,n.defaultValue.EMPTY_OBJECT)).positions,o=t.width,s=n.defaultValue(t.height,0),l=n.defaultValue(t.extrudedHeight,s);this._positions=e,this._ellipsoid=r.Ellipsoid.clone(n.defaultValue(t.ellipsoid,r.Ellipsoid.WGS84)),this._vertexFormat=m.VertexFormat.clone(n.defaultValue(t.vertexFormat,m.VertexFormat.DEFAULT)),this._width=o,this._height=Math.max(s,l),this._extrudedHeight=Math.min(s,l),this._cornerType=n.defaultValue(t.cornerType,i.CornerType.ROUNDED),this._granularity=n.defaultValue(t.granularity,a.CesiumMath.RADIANS_PER_DEGREE),this._shadowVolume=n.defaultValue(t.shadowVolume,!1),this._workerName="createCorridorGeometry",this._offsetAttribute=t.offsetAttribute,this._rectangle=void 0,this.packedLength=1+e.length*r.Cartesian3.packedLength+r.Ellipsoid.packedLength+m.VertexFormat.packedLength+7}q.pack=function(t,e,a){a=n.defaultValue(a,0);const i=t._positions,o=i.length;e[a++]=o;for(let t=0;t<o;++t,a+=r.Cartesian3.packedLength)r.Cartesian3.pack(i[t],e,a);return r.Ellipsoid.pack(t._ellipsoid,e,a),a+=r.Ellipsoid.packedLength,m.VertexFormat.pack(t._vertexFormat,e,a),a+=m.VertexFormat.packedLength,e[a++]=t._width,e[a++]=t._height,e[a++]=t._extrudedHeight,e[a++]=t._cornerType,e[a++]=t._granularity,e[a++]=t._shadowVolume?1:0,e[a]=n.defaultValue(t._offsetAttribute,-1),e};const j=r.Ellipsoid.clone(r.Ellipsoid.UNIT_SPHERE),J=new m.VertexFormat,K={positions:void 0,ellipsoid:j,vertexFormat:J,width:void 0,height:void 0,extrudedHeight:void 0,cornerType:void 0,granularity:void 0,shadowVolume:void 0,offsetAttribute:void 0};return q.unpack=function(t,e,a){e=n.defaultValue(e,0);const i=t[e++],o=new Array(i);for(let a=0;a<i;++a,e+=r.Cartesian3.packedLength)o[a]=r.Cartesian3.unpack(t,e);const s=r.Ellipsoid.unpack(t,e,j);e+=r.Ellipsoid.packedLength;const l=m.VertexFormat.unpack(t,e,J);e+=m.VertexFormat.packedLength;const d=t[e++],u=t[e++],c=t[e++],f=t[e++],y=t[e++],p=1===t[e++],g=t[e];return n.defined(a)?(a._positions=o,a._ellipsoid=r.Ellipsoid.clone(s,a._ellipsoid),a._vertexFormat=m.VertexFormat.clone(l,a._vertexFormat),a._width=d,a._height=u,a._extrudedHeight=c,a._cornerType=f,a._granularity=y,a._shadowVolume=p,a._offsetAttribute=-1===g?void 0:g,a):(K.positions=o,K.width=d,K.height=u,K.extrudedHeight=c,K.cornerType=f,K.granularity=y,K.shadowVolume=p,K.offsetAttribute=-1===g?void 0:g,new q(K))},q.computeRectangle=function(t,e){const a=(t=n.defaultValue(t,n.defaultValue.EMPTY_OBJECT)).positions,o=t.width;return W(a,n.defaultValue(t.ellipsoid,r.Ellipsoid.WGS84),o,n.defaultValue(t.cornerType,i.CornerType.ROUNDED),e)},q.createGeometry=function(i){let l=i._positions;const u=i._width,m=i._ellipsoid;l=N(l,m);const f=t.arrayRemoveDuplicates(l,r.Cartesian3.equalsEpsilon);if(f.length<2||u<=0)return;const y=i._height,p=i._extrudedHeight,g=!a.CesiumMath.equalsEpsilon(y,p,0,a.CesiumMath.EPSILON2),h=i._vertexFormat,C={ellipsoid:m,positions:f,width:u,cornerType:i._cornerType,granularity:i._granularity,saveAttributes:!0};let b;if(g)C.height=y,C.extrudedHeight=p,C.shadowVolume=i._shadowVolume,C.offsetAttribute=i._offsetAttribute,b=I(C,h);else{if(b=M(o.CorridorGeometryLibrary.computePositions(C),h,m),b.attributes.position.values=c.PolygonPipeline.scaleToGeodeticHeight(b.attributes.position.values,y,m),n.defined(i._offsetAttribute)){const t=i._offsetAttribute===d.GeometryOffsetAttribute.NONE?0:1,e=b.attributes.position.values.length,r=new Uint8Array(e/3).fill(t);b.attributes.applyOffset=new s.GeometryAttribute({componentDatatype:a.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:r})}}const A=b.attributes,_=e.BoundingSphere.fromVertices(A.position.values,void 0,3);return h.position||(b.attributes.position.values=void 0),new s.Geometry({attributes:A,indices:b.indices,primitiveType:s.PrimitiveType.TRIANGLES,boundingSphere:_,offsetAttribute:i._offsetAttribute})},q.createShadowVolume=function(t,e,r){const a=t._granularity,i=t._ellipsoid,o=e(a,i),n=r(a,i);return new q({positions:t._positions,width:t._width,cornerType:t._cornerType,ellipsoid:i,granularity:a,extrudedHeight:o,height:n,vertexFormat:m.VertexFormat.POSITION_ONLY,shadowVolume:!0})},Object.defineProperties(q.prototype,{rectangle:{get:function(){return n.defined(this._rectangle)||(this._rectangle=W(this._positions,this._ellipsoid,this._width,this._cornerType)),this._rectangle}},textureCoordinateRotationPoints:{get:function(){return[0,0,0,1,1,0]}}}),function(t,e){return n.defined(e)&&(t=q.unpack(t,e)),t._ellipsoid=r.Ellipsoid.clone(t._ellipsoid),q.createGeometry(t)}}));
