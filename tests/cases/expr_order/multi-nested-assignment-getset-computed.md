# Preval test case

# multi-nested-assignment-getset-computed.md

> Expr order > Multi-nested-assignment-getset-computed
>
> Check whether transform is correct even with multiple nesting levels. The runtime expects to call abcde in that order. Using getters and setters for maximal carnage.

This test needs to compare the call args of $ to confirm the same input/output.

It will test the order of calling an object, property, and rhs when assigning a complex value to a complex member expression with computed property.

## Input

`````js filename=intro
function $$(...a) { $(['$:', a, b, c, d, e, obja, objb, objc, objd, obje, '::', ...a]); return a[0]; }
var obja = {get a(){ $$('a.get'); return 110; }, set a(x) { $$('a.set', x); return 1000; } };
var objb = {get b(){ $$('b.get'); a = 210; return 100; }, set b(x) { $$('b.set', x); a = 2100; return 2000; } };
var objc = {get c(){ $$('c.get'); a = 310; b = 320; return 100; }, set c(x) { $$('c.set', x); a = 3100; b = 3200; return 3000; } };
var objd = {get d(){ $$('d.get'); a = 410; b = 420; c = 430; return 100; }, set d(x) { $$('d.set', x); a = 4100; b = 4200; c = 4300; return 4000; } };
var obje = {get e(){ $$('e.get'); a = 510; b = 520; c = 530; d = 540; return 100; }, set e(x) { $$('e.set', x); a = 5100; b = 5200; c = 5300; d = 5400; return 5000; } };
var a = function(){ $$('a'); return obja; }
var b = function(){ $$('b'); a = 21; return objb; }
var c = function(){ $$('c'); a = 31; b = 32; return objc; }
var d = function(){ $$('d'); a = 41; b = 42; c = 43; return objd; }
var e = function(){ $$('e'); a = 51; b = 52; c = 53; d = 54; return obje }
$$(a()[$$('a')] = b()[$$('b')] = c()[$$('c')] = d()[$$('d')] = e())
$$(a, b, c, d, e);
$$(obja, objb, objc, objd, obje);
`````


## Settled


`````js filename=intro
const tmp /*:(array)=>unknown*/ = function (...$$0 /*:array*/) {
  const a$1 /*:array*/ /*truthy*/ = $$0;
  debugger;
  const tmpCalleeParam /*:array*/ /*truthy*/ = [`\$:`, a$1, b, c, d, e, obja, objb, objc, objd, obje, `::`, ...a$1];
  $(tmpCalleeParam);
  const tmpReturnArg /*:unknown*/ = a$1[0];
  return tmpReturnArg;
};
const obja /*:object*/ /*truthy*/ = {
  get a() {
    debugger;
    tmp(`a.get`);
    return 110;
  },
  set a($$0) {
    const x /*:unknown*/ = $$0;
    debugger;
    tmp(`a.set`, x);
    return 1000;
  },
};
const objb /*:object*/ /*truthy*/ = {
  get b() {
    debugger;
    tmp(`b.get`);
    a = 210;
    return 100;
  },
  set b($$0) {
    const x$1 /*:unknown*/ = $$0;
    debugger;
    tmp(`b.set`, x$1);
    a = 2100;
    return 2000;
  },
};
const objc /*:object*/ /*truthy*/ = {
  get c() {
    debugger;
    tmp(`c.get`);
    a = 310;
    b = 320;
    return 100;
  },
  set c($$0) {
    const x$3 /*:unknown*/ = $$0;
    debugger;
    tmp(`c.set`, x$3);
    a = 3100;
    b = 3200;
    return 3000;
  },
};
const objd /*:object*/ /*truthy*/ = {
  get d() {
    debugger;
    tmp(`d.get`);
    a = 410;
    b = 420;
    c = 430;
    return 100;
  },
  set d($$0) {
    const x$5 /*:unknown*/ = $$0;
    debugger;
    tmp(`d.set`, x$5);
    a = 4100;
    b = 4200;
    c = 4300;
    return 4000;
  },
};
const obje /*:object*/ /*truthy*/ = {
  get e() {
    debugger;
    tmp(`e.get`);
    a = 510;
    b = 520;
    c = 530;
    d = 540;
    return 100;
  },
  set e($$0) {
    const x$7 /*:unknown*/ = $$0;
    debugger;
    tmp(`e.set`, x$7);
    a = 5100;
    b = 5200;
    c = 5300;
    d = 5400;
    return 5000;
  },
};
let a /*:()=>unknown*/ = function () {
  debugger;
  tmp(`a`);
  return obja;
};
let b /*:()=>unknown*/ = function () {
  debugger;
  tmp(`b`);
  a = 21;
  return objb;
};
let c /*:()=>unknown*/ = function () {
  debugger;
  tmp(`c`);
  a = 31;
  b = 32;
  return objc;
};
let d /*:()=>unknown*/ = function () {
  debugger;
  tmp(`d`);
  a = 41;
  b = 42;
  c = 43;
  return objd;
};
const e /*:()=>object*/ = function () {
  debugger;
  tmp(`e`);
  a = 51;
  b = 52;
  c = 53;
  d = 54;
  return obje;
};
const tmpInitAssignLhsComputedObj /*:unknown*/ = a();
const tmpInitAssignLhsComputedProp /*:unknown*/ = tmp(`a`);
const tmpInitAssignLhsComputedObj$1 /*:unknown*/ = b();
const tmpInitAssignLhsComputedProp$1 /*:unknown*/ = tmp(`b`);
const tmpInitAssignLhsComputedObj$3 /*:unknown*/ = c();
const tmpInitAssignLhsComputedProp$3 /*:unknown*/ = tmp(`c`);
const tmpInitAssignLhsComputedObj$5 /*:unknown*/ = d();
const tmpInitAssignLhsComputedProp$5 /*:unknown*/ = tmp(`d`);
e();
tmpInitAssignLhsComputedObj$5[tmpInitAssignLhsComputedProp$5] = obje;
tmpInitAssignLhsComputedObj$3[tmpInitAssignLhsComputedProp$3] = obje;
tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = obje;
tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = obje;
tmp(obje);
tmp(a, b, c, d, e);
tmp(obja, objb, objc, objd, obje);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmp = function (...$$0 /*:array*/) {
  const a$1 = $$0;
  $([`\$:`, a$1, b, c, d, e, obja, objb, objc, objd, obje, `::`, ...a$1]);
  const tmpReturnArg = a$1[0];
  return tmpReturnArg;
};
const obja = {
  get a() {
    tmp(`a.get`);
    return 110;
  },
  set a(x) {
    tmp(`a.set`, x);
    return 1000;
  },
};
const objb = {
  get b() {
    tmp(`b.get`);
    a = 210;
    return 100;
  },
  set b(x$1) {
    tmp(`b.set`, x$1);
    a = 2100;
    return 2000;
  },
};
const objc = {
  get c() {
    tmp(`c.get`);
    a = 310;
    b = 320;
    return 100;
  },
  set c(x$3) {
    tmp(`c.set`, x$3);
    a = 3100;
    b = 3200;
    return 3000;
  },
};
const objd = {
  get d() {
    tmp(`d.get`);
    a = 410;
    b = 420;
    c = 430;
    return 100;
  },
  set d(x$5) {
    tmp(`d.set`, x$5);
    a = 4100;
    b = 4200;
    c = 4300;
    return 4000;
  },
};
const obje = {
  get e() {
    tmp(`e.get`);
    a = 510;
    b = 520;
    c = 530;
    d = 540;
    return 100;
  },
  set e(x$7) {
    tmp(`e.set`, x$7);
    a = 5100;
    b = 5200;
    c = 5300;
    d = 5400;
    return 5000;
  },
};
let a = function () {
  tmp(`a`);
  return obja;
};
let b = function () {
  tmp(`b`);
  a = 21;
  return objb;
};
let c = function () {
  tmp(`c`);
  a = 31;
  b = 32;
  return objc;
};
let d = function () {
  tmp(`d`);
  a = 41;
  b = 42;
  c = 43;
  return objd;
};
const e = function () {
  tmp(`e`);
  a = 51;
  b = 52;
  c = 53;
  d = 54;
  return obje;
};
const tmpInitAssignLhsComputedObj = a();
const tmpInitAssignLhsComputedProp = tmp(`a`);
const tmpInitAssignLhsComputedObj$1 = b();
const tmpInitAssignLhsComputedProp$1 = tmp(`b`);
const tmpInitAssignLhsComputedObj$3 = c();
const tmpInitAssignLhsComputedProp$3 = tmp(`c`);
const tmpInitAssignLhsComputedObj$5 = d();
const tmpInitAssignLhsComputedProp$5 = tmp(`d`);
e();
tmpInitAssignLhsComputedObj$5[tmpInitAssignLhsComputedProp$5] = obje;
tmpInitAssignLhsComputedObj$3[tmpInitAssignLhsComputedProp$3] = obje;
tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = obje;
tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = obje;
tmp(obje);
tmp(a, b, c, d, e);
tmp(obja, objb, objc, objd, obje);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  const c = [ "$:", b, d, e, f, g, h, i, j, k, l, "::", ...b ];
  $( c );
  const m = b[ 0 ];
  return m;
};
const h = {
  get a() {
    debugger;
    a( "a.get" );
    return 110;
  },
  set a( $$0 ) {
    const n = $$0;
    debugger;
    a( "a.set", n );
    return 1000;
  },
};
const i = {
  get b() {
    debugger;
    a( "b.get" );
    o = 210;
    return 100;
  },
  set b( $$0 ) {
    const p = $$0;
    debugger;
    a( "b.set", p );
    o = 2100;
    return 2000;
  },
};
const j = {
  get c() {
    debugger;
    a( "c.get" );
    o = 310;
    d = 320;
    return 100;
  },
  set c( $$0 ) {
    const q = $$0;
    debugger;
    a( "c.set", q );
    o = 3100;
    d = 3200;
    return 3000;
  },
};
const k = {
  get d() {
    debugger;
    a( "d.get" );
    o = 410;
    d = 420;
    e = 430;
    return 100;
  },
  set d( $$0 ) {
    const r = $$0;
    debugger;
    a( "d.set", r );
    o = 4100;
    d = 4200;
    e = 4300;
    return 4000;
  },
};
const l = {
  get e() {
    debugger;
    a( "e.get" );
    o = 510;
    d = 520;
    e = 530;
    f = 540;
    return 100;
  },
  set e( $$0 ) {
    const s = $$0;
    debugger;
    a( "e.set", s );
    o = 5100;
    d = 5200;
    e = 5300;
    f = 5400;
    return 5000;
  },
};
let o = function() {
  debugger;
  a( "a" );
  return h;
};
let d = function() {
  debugger;
  a( "b" );
  o = 21;
  return i;
};
let e = function() {
  debugger;
  a( "c" );
  o = 31;
  d = 32;
  return j;
};
let f = function() {
  debugger;
  a( "d" );
  o = 41;
  d = 42;
  e = 43;
  return k;
};
const g = function() {
  debugger;
  a( "e" );
  o = 51;
  d = 52;
  e = 53;
  f = 54;
  return l;
};
const t = o();
const u = a( "a" );
const v = d();
const w = a( "b" );
const x = e();
const y = a( "c" );
const z = f();
const ba = a( "d" );
g();
z[ba] = l;
x[y] = l;
v[w] = l;
t[u] = l;
a( l );
a( o, d, e, f, g );
a( h, i, j, k, l );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = undefined;
let b = undefined;
let c = undefined;
let d = undefined;
let e = undefined;
let obja = undefined;
let objb = undefined;
let objc = undefined;
let objd = undefined;
let obje = undefined;
let tmp = function (...$$0 /*:array*/) {
  let a$1 = $$0;
  debugger;
  let tmpCalleeParam = [`\$:`, a$1, b, c, d, e, obja, objb, objc, objd, obje, `::`, ...a$1];
  $(tmpCalleeParam);
  const tmpReturnArg = a$1[0];
  return tmpReturnArg;
};
obja = {
  get a() {
    debugger;
    tmp(`a.get`);
    return 110;
  },
  set a($$0) {
    let x = $$0;
    debugger;
    tmp(`a.set`, x);
    return 1000;
  },
};
objb = {
  get b() {
    debugger;
    tmp(`b.get`);
    a = 210;
    return 100;
  },
  set b($$0) {
    let x$1 = $$0;
    debugger;
    tmp(`b.set`, x$1);
    a = 2100;
    return 2000;
  },
};
objc = {
  get c() {
    debugger;
    tmp(`c.get`);
    a = 310;
    b = 320;
    return 100;
  },
  set c($$0) {
    let x$3 = $$0;
    debugger;
    tmp(`c.set`, x$3);
    a = 3100;
    b = 3200;
    return 3000;
  },
};
objd = {
  get d() {
    debugger;
    tmp(`d.get`);
    a = 410;
    b = 420;
    c = 430;
    return 100;
  },
  set d($$0) {
    let x$5 = $$0;
    debugger;
    tmp(`d.set`, x$5);
    a = 4100;
    b = 4200;
    c = 4300;
    return 4000;
  },
};
obje = {
  get e() {
    debugger;
    tmp(`e.get`);
    a = 510;
    b = 520;
    c = 530;
    d = 540;
    return 100;
  },
  set e($$0) {
    let x$7 = $$0;
    debugger;
    tmp(`e.set`, x$7);
    a = 5100;
    b = 5200;
    c = 5300;
    d = 5400;
    return 5000;
  },
};
a = function () {
  debugger;
  tmp(`a`);
  return obja;
};
b = function () {
  debugger;
  tmp(`b`);
  a = 21;
  return objb;
};
c = function () {
  debugger;
  tmp(`c`);
  a = 31;
  b = 32;
  return objc;
};
d = function () {
  debugger;
  tmp(`d`);
  a = 41;
  b = 42;
  c = 43;
  return objd;
};
e = function () {
  debugger;
  tmp(`e`);
  a = 51;
  b = 52;
  c = 53;
  d = 54;
  return obje;
};
const tmpCallCallee = tmp;
const tmpInitAssignLhsComputedObj = a();
const tmpInitAssignLhsComputedProp = tmp(`a`);
const tmpInitAssignLhsComputedObj$1 = b();
const tmpInitAssignLhsComputedProp$1 = tmp(`b`);
const tmpInitAssignLhsComputedObj$3 = c();
const tmpInitAssignLhsComputedProp$3 = tmp(`c`);
const tmpInitAssignLhsComputedObj$5 = d();
const tmpInitAssignLhsComputedProp$5 = tmp(`d`);
const tmpInitAssignLhsComputedRhs$5 = e();
tmpInitAssignLhsComputedObj$5[tmpInitAssignLhsComputedProp$5] = tmpInitAssignLhsComputedRhs$5;
const tmpInitAssignLhsComputedRhs$3 = tmpInitAssignLhsComputedRhs$5;
tmpInitAssignLhsComputedObj$3[tmpInitAssignLhsComputedProp$3] = tmpInitAssignLhsComputedRhs$3;
const tmpInitAssignLhsComputedRhs$1 = tmpInitAssignLhsComputedRhs$3;
tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = tmpInitAssignLhsComputedRhs$1;
const tmpInitAssignLhsComputedRhs = tmpInitAssignLhsComputedRhs$1;
tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs;
let tmpCalleeParam$1 = tmpInitAssignLhsComputedRhs;
tmp(tmpInitAssignLhsComputedRhs);
tmp(a, b, c, d, e);
tmp(obja, objb, objc, objd, obje);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
  [
    '$:',
    ['a'],
    '<function>',
    '<function>',
    '<function>',
    '<function>',
    { a: '<get/set>' },
    { b: '<get/set>' },
    { c: '<get/set>' },
    { d: '<get/set>' },
    { e: '<get/set>' },
    '::',
    'a',
  ],

 - 2: 
  [
    '$:',
    ['a'],
    '<function>',
    '<function>',
    '<function>',
    '<function>',
    { a: '<get/set>' },
    { b: '<get/set>' },
    { c: '<get/set>' },
    { d: '<get/set>' },
    { e: '<get/set>' },
    '::',
    'a',
  ],

 - 3: 
  [
    '$:',
    ['b'],
    '<function>',
    '<function>',
    '<function>',
    '<function>',
    { a: '<get/set>' },
    { b: '<get/set>' },
    { c: '<get/set>' },
    { d: '<get/set>' },
    { e: '<get/set>' },
    '::',
    'b',
  ],

 - 4: 
  [
    '$:',
    ['b'],
    '<function>',
    '<function>',
    '<function>',
    '<function>',
    { a: '<get/set>' },
    { b: '<get/set>' },
    { c: '<get/set>' },
    { d: '<get/set>' },
    { e: '<get/set>' },
    '::',
    'b',
  ],

 - 5: 
  [
    '$:',
    ['c'],
    '<function>',
    '<function>',
    '<function>',
    '<function>',
    { a: '<get/set>' },
    { b: '<get/set>' },
    { c: '<get/set>' },
    { d: '<get/set>' },
    { e: '<get/set>' },
    '::',
    'c',
  ],

 - 6: 
  [
    '$:',
    ['c'],
    32,
    '<function>',
    '<function>',
    '<function>',
    { a: '<get/set>' },
    { b: '<get/set>' },
    { c: '<get/set>' },
    { d: '<get/set>' },
    { e: '<get/set>' },
    '::',
    'c',
  ],

 - 7: 
  [
    '$:',
    ['d'],
    32,
    '<function>',
    '<function>',
    '<function>',
    { a: '<get/set>' },
    { b: '<get/set>' },
    { c: '<get/set>' },
    { d: '<get/set>' },
    { e: '<get/set>' },
    '::',
    'd',
  ],

 - 8: 
  [
    '$:',
    ['d'],
    42,
    43,
    '<function>',
    '<function>',
    { a: '<get/set>' },
    { b: '<get/set>' },
    { c: '<get/set>' },
    { d: '<get/set>' },
    { e: '<get/set>' },
    '::',
    'd',
  ],

 - 9: 
  [
    '$:',
    ['e'],
    42,
    43,
    '<function>',
    '<function>',
    { a: '<get/set>' },
    { b: '<get/set>' },
    { c: '<get/set>' },
    { d: '<get/set>' },
    { e: '<get/set>' },
    '::',
    'e',
  ],

 - 10: 
  [
    '$:',
    ['d.set', { e: '<get/set>' }],
    52,
    53,
    54,
    '<function>',
    { a: '<get/set>' },
    { b: '<get/set>' },
    { c: '<get/set>' },
    { d: '<get/set>' },
    { e: '<get/set>' },
    '::',
    'd.set',
    { e: '<get/set>' },
  ],

 - 11: 
  [
    '$:',
    ['c.set', { e: '<get/set>' }],
    4200,
    4300,
    54,
    '<function>',
    { a: '<get/set>' },
    { b: '<get/set>' },
    { c: '<get/set>' },
    { d: '<get/set>' },
    { e: '<get/set>' },
    '::',
    'c.set',
    { e: '<get/set>' },
  ],

 - 12: 
  [
    '$:',
    ['b.set', { e: '<get/set>' }],
    3200,
    4300,
    54,
    '<function>',
    { a: '<get/set>' },
    { b: '<get/set>' },
    { c: '<get/set>' },
    { d: '<get/set>' },
    { e: '<get/set>' },
    '::',
    'b.set',
    { e: '<get/set>' },
  ],

 - 13: 
  [
    '$:',
    ['a.set', { e: '<get/set>' }],
    3200,
    4300,
    54,
    '<function>',
    { a: '<get/set>' },
    { b: '<get/set>' },
    { c: '<get/set>' },
    { d: '<get/set>' },
    { e: '<get/set>' },
    '::',
    'a.set',
    { e: '<get/set>' },
  ],

 - 14: 
  [
    '$:',
    [{ e: '<get/set>' }],
    3200,
    4300,
    54,
    '<function>',
    { a: '<get/set>' },
    { b: '<get/set>' },
    { c: '<get/set>' },
    { d: '<get/set>' },
    { e: '<get/set>' },
    '::',
    { e: '<get/set>' },
  ],

 - 15: 
  [
    '$:',
    [2100, 3200, 4300, 54, '<function>'],
    3200,
    4300,
    54,
    '<function>',
    { a: '<get/set>' },
    { b: '<get/set>' },
    { c: '<get/set>' },
    { d: '<get/set>' },
    { e: '<get/set>' },
    '::',
    2100,
    3200,
    4300,
    54,
    '<function>',
  ],

 - 16: 
  [
    '$:',
    [{ a: '<get/set>' }, { b: '<get/set>' }, { c: '<get/set>' }, { d: '<get/set>' }, { e: '<get/set>' }],
    3200,
    4300,
    54,
    '<function>',
    { a: '<get/set>' },
    { b: '<get/set>' },
    { c: '<get/set>' },
    { d: '<get/set>' },
    { e: '<get/set>' },
    '::',
    { a: '<get/set>' },
    { b: '<get/set>' },
    { c: '<get/set>' },
    { d: '<get/set>' },
    { e: '<get/set>' },
  ],

 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
