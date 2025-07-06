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
  const red = this.d(e);          // A as context again, might do b.call(a) etc
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
  $dotCall(tmpMCF, tmpPrevalAliasThis$1, `d`, e$1);
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
  tmpPrevalAliasThis$1.d(tmpPrevalAliasThis$1.e);
  return ret;
};
start(100, 200);
$(undefined);
$(start);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function b($$0 ) {
  const c = $$0;
  debugger;
  c();
  return undefined;
};
const d = function() {
  debugger;
  $( "Hello from e" );
  return undefined;
};
const e = function($$0,$$1 ) {
  const f = $$0;
  const g = $$1;
  debugger;
  const h = i.prototype;
  h.a = f;
  i.prototype;
  h.b = g;
  const j = new i( k );
  const l = j.expando;
  $dotCall( l, j, "expando" );
  return undefined;
};
const i = function($$0 ) {
  const m = this;
  const n = $$0;
  debugger;
  m.expando = n;
  m.d = a;
  m.e = d;
  return undefined;
};
const k = function() {
  const o = this;
  debugger;
  const p = o.p;
  const q = o.q;
  const r = p + q;
  $( r );
  const s = o.e;
  const t = o.d;
  $dotCall( t, o, "d", s );
  return ret;
};
e( 100, 200 );
$( undefined );
$( e );
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
  const red = $dotCall(tmpMCF, tmpPrevalAliasThis$1, `d`, e$1);
  return ret;
};
let tmpCalleeParam = start(100, 200);
$(tmpCalleeParam);
$(start);
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

ret


## Runtime Outcome


Should call `$` with:
 - 1: NaN
 - 2: 'Hello from e'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
