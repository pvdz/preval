# Preval test case

# base.md

> Lock this > Base
>
> Basic structure of the lockThis pattern

## Options

Preval goes apeshit if you allow it
- unroll: 0
- loopProtectLimit: 100

## Input

`````js filename=intro
function d(this_is_e) { this_is_e(); } // indirect call. happens a few times, down a rabbit hole.
function e() { $('Hello from e'); }
const A = function(callback) {
  this.expando = callback;
  this.d = d;
  this.e = e;
  return undefined;
};
const f = function() {
  debugger;
  const x = this.p;               // read more proto/this props on A instance and do stuff
  const y = this.q;               // (these props are explicitly set in the constructor or on its proto)
  const z = x + y;
  $(z);
  // etc. then calls into another function, sometimes passing in a method from the instance as arg, for indirect calls
  const e = this.e;
  const ret = this.d(e);          // A as context again, might do b.call(a) etc
  return ret;
};
function start(p, q) {
  const proto = A.prototype;
  proto.a = p;
  const proto2 = A.prototype;
  proto.b = q;
  const inst = new A(f);
  const tmp = inst.expando;       // This is `f`
  $dotCall(tmp, inst, `expando`);
}
$(start(100, 200));
$(start);
`````


## Settled


`````js filename=intro
const d /*:(unknown)=>undefined*/ = function $pcompiled($$0) {
  const this_is_e /*:unknown*/ = $$0;
  debugger;
  this_is_e();
  return undefined;
};
const e /*:()=>undefined*/ = function () {
  debugger;
  $(`Hello from e`);
  return undefined;
};
const start /*:(unknown, unknown)=>undefined*/ = function ($$0, $$1) {
  const p /*:unknown*/ = $$0;
  const q /*:unknown*/ = $$1;
  debugger;
  const proto /*:unknown*/ = A.prototype;
  proto.a = p;
  A.prototype;
  proto.b = q;
  const inst /*:object*/ /*truthy*/ = new A(f);
  const tmp /*:unknown*/ = inst.expando;
  $dotCall(tmp, inst, `expando`);
  return undefined;
};
const A /*:(unknown)=>undefined*/ = function ($$0 /*uses this*/) {
  const tmpPrevalAliasThis /*:unknown*/ = this;
  const callback /*:unknown*/ = $$0;
  debugger;
  tmpPrevalAliasThis.expando = callback;
  tmpPrevalAliasThis.d = d;
  tmpPrevalAliasThis.e = e;
  return undefined;
};
const f /*:()=>unknown*/ = function (/*uses this*/) {
  const tmpPrevalAliasThis$1 /*:unknown*/ = this;
  debugger;
  const x /*:unknown*/ = tmpPrevalAliasThis$1.p;
  const y /*:unknown*/ = tmpPrevalAliasThis$1.q;
  const z /*:primitive*/ = x + y;
  $(z);
  const e$1 /*:unknown*/ = tmpPrevalAliasThis$1.e;
  const tmpMCF /*:unknown*/ = tmpPrevalAliasThis$1.d;
  const ret /*:unknown*/ = $dotCall(tmpMCF, tmpPrevalAliasThis$1, `d`, e$1);
  return ret;
};
start(100, 200);
$(undefined);
$(start);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const d = function $pcompiled(this_is_e) {
  this_is_e();
};
const e = function () {
  $(`Hello from e`);
};
const start = function (p, q) {
  const proto = A.prototype;
  proto.a = p;
  A.prototype;
  proto.b = q;
  const inst = new A(f);
  inst.expando();
};
const A = function (callback) {
  const tmpPrevalAliasThis = this;
  tmpPrevalAliasThis.expando = callback;
  tmpPrevalAliasThis.d = d;
  tmpPrevalAliasThis.e = e;
};
const f = function () {
  const tmpPrevalAliasThis$1 = this;
  const x = tmpPrevalAliasThis$1.p;
  $(x + tmpPrevalAliasThis$1.q);
  const ret = tmpPrevalAliasThis$1.d(tmpPrevalAliasThis$1.e);
  return ret;
};
start(100, 200);
$(undefined);
$(start);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function $pcompiled($$0 ) {
  const b = $$0;
  debugger;
  b();
  return undefined;
};
const c = function() {
  debugger;
  $( "Hello from e" );
  return undefined;
};
const d = function($$0,$$1 ) {
  const e = $$0;
  const f = $$1;
  debugger;
  const g = h.prototype;
  g.a = e;
  h.prototype;
  g.b = f;
  const i = new h( j );
  const k = i.expando;
  $dotCall( k, i, "expando" );
  return undefined;
};
const h = function($$0 ) {
  const l = this;
  const m = $$0;
  debugger;
  l.expando = m;
  l.d = a;
  l.e = c;
  return undefined;
};
const j = function() {
  const n = this;
  debugger;
  const o = n.p;
  const p = n.q;
  const q = o + p;
  $( q );
  const r = n.e;
  const s = n.d;
  const t = $dotCall( s, n, "d", r );
  return t;
};
d( 100, 200 );
$( undefined );
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let d = function ($$0) {
  let this_is_e = $$0;
  debugger;
  this_is_e();
  return undefined;
};
let e = function () {
  debugger;
  $(`Hello from e`);
  return undefined;
};
let start = function ($$0, $$1) {
  let p = $$0;
  let q = $$1;
  debugger;
  const proto = A.prototype;
  proto.a = p;
  const proto2 = A.prototype;
  proto.b = q;
  const inst = new A(f);
  const tmp = inst.expando;
  $dotCall(tmp, inst, `expando`);
  return undefined;
};
const A = function ($$0) {
  const tmpPrevalAliasThis = this;
  let callback = $$0;
  debugger;
  tmpPrevalAliasThis.expando = callback;
  tmpPrevalAliasThis.d = d;
  tmpPrevalAliasThis.e = e;
  return undefined;
};
const f = function () {
  const tmpPrevalAliasThis$1 = this;
  debugger;
  const x = tmpPrevalAliasThis$1.p;
  const y = tmpPrevalAliasThis$1.q;
  const z = x + y;
  $(z);
  const e$1 = tmpPrevalAliasThis$1.e;
  const tmpMCF = tmpPrevalAliasThis$1.d;
  const ret = $dotCall(tmpMCF, tmpPrevalAliasThis$1, `d`, e$1);
  return ret;
};
let tmpCalleeParam = start(100, 200);
$(tmpCalleeParam);
$(start);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: NaN
 - 2: 'Hello from e'
 - 3: undefined
 - 4: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
