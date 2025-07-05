# Preval test case

# multi-nested-assignment-getset-computed-rhs-simple.md

> Expr order > Multi-nested-assignment-getset-computed-rhs-simple
>
> Check whether transform is correct even with multiple nesting levels. The runtime expects to call abcde in that order. Using getters and setters for maximal carnage.

This test needs to compare the call args of $ to confirm the same input/output.

It will test whether any step can affect the value of `e` before it is used as the value to update all the properties.

## Input

`````js filename=intro
function $$(...a) { $(['$:', a, b, c, d, e, obja, objb, objc, objd, '::', ...a]); return a[0]; }
var obja = {get a(){ $$('a.get'); return 110; }, set a(x) { $$('a.set', x); e = 'faila'; return 1000; } };
var objb = {get b(){ $$('b.get'); a = 210; return 100; }, set b(x) { $$('b.set', x); a = 2100; e = 'failb'; return 2000; } };
var objc = {get c(){ $$('c.get'); a = 310; b = 320; return 100; }, set c(x) { $$('c.set', x); a = 3100; b = 3200; e = 'failc'; return 3000; } };
var objd = {get d(){ $$('d.get'); a = 410; b = 420; c = 430; return 100; }, set d(x) { $$('d.set', x); a = 4100; b = 4200; c = 4300; e = 'faild'; return 4000; } };
var a = function(){ $$('a'); return obja; }
var b = function(){ $$('b'); a = 21; return objb; }
var c = function(){ $$('c'); a = 31; b = 32; return objc; }
var d = function(){ $$('d'); a = 41; b = 42; c = 43; return objd; }
var e = 12345;
$$(a()[$$('a')] = b()[$$('b')] = c()[$$('c')] = d()[$$('d')] = e)
$$(a, b, c, d, e);
$$(obja, objb, objc, objd);
`````


## Settled


`````js filename=intro
const tmp /*:(array)=>unknown*/ = function (...$$0 /*:array*/) {
  const a$1 /*:array*/ /*truthy*/ = $$0;
  debugger;
  const tmpCalleeParam /*:array*/ /*truthy*/ = [`\$:`, a$1, b, c, d, e, obja, objb, objc, objd, `::`, ...a$1];
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
    e = `faila`;
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
    e = `failb`;
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
    e = `failc`;
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
    e = `faild`;
    return 4000;
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
const d /*:()=>object*/ = function () {
  debugger;
  tmp(`d`);
  a = 41;
  b = 42;
  c = 43;
  return objd;
};
let e /*:primitive*/ /*truthy*/ = 12345;
const tmpInitAssignLhsComputedObj /*:unknown*/ = a();
const tmpInitAssignLhsComputedProp /*:unknown*/ = tmp(`a`);
const tmpInitAssignLhsComputedObj$1 /*:unknown*/ = b();
const tmpInitAssignLhsComputedProp$1 /*:unknown*/ = tmp(`b`);
const tmpInitAssignLhsComputedObj$3 /*:unknown*/ = c();
const tmpInitAssignLhsComputedProp$3 /*:unknown*/ = tmp(`c`);
d();
const tmpInitAssignLhsComputedProp$5 /*:unknown*/ = tmp(`d`);
const tmpInitAssignLhsComputedRhs$5 /*:primitive*/ /*truthy*/ = e;
objd[tmpInitAssignLhsComputedProp$5] = tmpInitAssignLhsComputedRhs$5;
tmpInitAssignLhsComputedObj$3[tmpInitAssignLhsComputedProp$3] = tmpInitAssignLhsComputedRhs$5;
tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = tmpInitAssignLhsComputedRhs$5;
tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs$5;
tmp(tmpInitAssignLhsComputedRhs$5);
tmp(a, b, c, d, e);
tmp(obja, objb, objc, objd);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmp = function (...$$0 /*:array*/) {
  const a$1 = $$0;
  $([`\$:`, a$1, b, c, d, e, obja, objb, objc, objd, `::`, ...a$1]);
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
    e = `faila`;
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
    e = `failb`;
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
    e = `failc`;
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
    e = `faild`;
    return 4000;
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
const d = function () {
  tmp(`d`);
  a = 41;
  b = 42;
  c = 43;
  return objd;
};
let e = 12345;
const tmpInitAssignLhsComputedObj = a();
const tmpInitAssignLhsComputedProp = tmp(`a`);
const tmpInitAssignLhsComputedObj$1 = b();
const tmpInitAssignLhsComputedProp$1 = tmp(`b`);
const tmpInitAssignLhsComputedObj$3 = c();
const tmpInitAssignLhsComputedProp$3 = tmp(`c`);
d();
const tmpInitAssignLhsComputedProp$5 = tmp(`d`);
const tmpInitAssignLhsComputedRhs$5 = e;
objd[tmpInitAssignLhsComputedProp$5] = tmpInitAssignLhsComputedRhs$5;
tmpInitAssignLhsComputedObj$3[tmpInitAssignLhsComputedProp$3] = tmpInitAssignLhsComputedRhs$5;
tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = tmpInitAssignLhsComputedRhs$5;
tmpInitAssignLhsComputedObj[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs$5;
tmp(tmpInitAssignLhsComputedRhs$5);
tmp(a, b, c, d, e);
tmp(obja, objb, objc, objd);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  const c = [ "$:", b, d, e, f, g, h, i, j, k, "::", ...b ];
  $( c );
  const l = b[ 0 ];
  return l;
};
const h = {
  get a() {
    debugger;
    a( "a.get" );
    return 110;
  },
  set a( $$0 ) {
    const m = $$0;
    debugger;
    a( "a.set", m );
    g = "faila";
    return 1000;
  },
};
const i = {
  get b() {
    debugger;
    a( "b.get" );
    n = 210;
    return 100;
  },
  set b( $$0 ) {
    const o = $$0;
    debugger;
    a( "b.set", o );
    n = 2100;
    g = "failb";
    return 2000;
  },
};
const j = {
  get c() {
    debugger;
    a( "c.get" );
    n = 310;
    d = 320;
    return 100;
  },
  set c( $$0 ) {
    const p = $$0;
    debugger;
    a( "c.set", p );
    n = 3100;
    d = 3200;
    g = "failc";
    return 3000;
  },
};
const k = {
  get d() {
    debugger;
    a( "d.get" );
    n = 410;
    d = 420;
    e = 430;
    return 100;
  },
  set d( $$0 ) {
    const q = $$0;
    debugger;
    a( "d.set", q );
    n = 4100;
    d = 4200;
    e = 4300;
    g = "faild";
    return 4000;
  },
};
let n = function() {
  debugger;
  a( "a" );
  return h;
};
let d = function() {
  debugger;
  a( "b" );
  n = 21;
  return i;
};
let e = function() {
  debugger;
  a( "c" );
  n = 31;
  d = 32;
  return j;
};
const f = function() {
  debugger;
  a( "d" );
  n = 41;
  d = 42;
  e = 43;
  return k;
};
let g = 12345;
const r = n();
const s = a( "a" );
const t = d();
const u = a( "b" );
const v = e();
const w = a( "c" );
f();
const x = a( "d" );
const y = g;
k[x] = y;
v[w] = y;
t[u] = y;
r[s] = y;
a( y );
a( n, d, e, f, g );
a( h, i, j, k );
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
let tmp = function (...$$0 /*:array*/) {
  let a$1 = $$0;
  debugger;
  let tmpCalleeParam = [`\$:`, a$1, b, c, d, e, obja, objb, objc, objd, `::`, ...a$1];
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
    e = `faila`;
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
    e = `failb`;
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
    e = `failc`;
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
    e = `faild`;
    return 4000;
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
e = 12345;
const tmpCallCallee = tmp;
const tmpInitAssignLhsComputedObj = a();
const tmpInitAssignLhsComputedProp = tmp(`a`);
const tmpInitAssignLhsComputedObj$1 = b();
const tmpInitAssignLhsComputedProp$1 = tmp(`b`);
const tmpInitAssignLhsComputedObj$3 = c();
const tmpInitAssignLhsComputedProp$3 = tmp(`c`);
const tmpInitAssignLhsComputedObj$5 = d();
const tmpInitAssignLhsComputedProp$5 = tmp(`d`);
const tmpInitAssignLhsComputedRhs$5 = e;
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
tmp(obja, objb, objc, objd);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support ObjectExpression as var init in let_hoisting noob check


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
    12345,
    { a: '<get/set>' },
    { b: '<get/set>' },
    { c: '<get/set>' },
    { d: '<get/set>' },
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
    12345,
    { a: '<get/set>' },
    { b: '<get/set>' },
    { c: '<get/set>' },
    { d: '<get/set>' },
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
    12345,
    { a: '<get/set>' },
    { b: '<get/set>' },
    { c: '<get/set>' },
    { d: '<get/set>' },
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
    12345,
    { a: '<get/set>' },
    { b: '<get/set>' },
    { c: '<get/set>' },
    { d: '<get/set>' },
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
    12345,
    { a: '<get/set>' },
    { b: '<get/set>' },
    { c: '<get/set>' },
    { d: '<get/set>' },
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
    12345,
    { a: '<get/set>' },
    { b: '<get/set>' },
    { c: '<get/set>' },
    { d: '<get/set>' },
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
    12345,
    { a: '<get/set>' },
    { b: '<get/set>' },
    { c: '<get/set>' },
    { d: '<get/set>' },
    '::',
    'd',
  ],

 - 8: ['$:', ['d'], 42, 43, '<function>', 12345, { a: '<get/set>' }, { b: '<get/set>' }, { c: '<get/set>' }, { d: '<get/set>' }, '::', 'd']
 - 9: 
  [
    '$:',
    ['d.set', 12345],
    42,
    43,
    '<function>',
    12345,
    { a: '<get/set>' },
    { b: '<get/set>' },
    { c: '<get/set>' },
    { d: '<get/set>' },
    '::',
    'd.set',
    12345,
  ],

 - 10: 
  [
    '$:',
    ['c.set', 12345],
    4200,
    4300,
    '<function>',
    'faild',
    { a: '<get/set>' },
    { b: '<get/set>' },
    { c: '<get/set>' },
    { d: '<get/set>' },
    '::',
    'c.set',
    12345,
  ],

 - 11: 
  [
    '$:',
    ['b.set', 12345],
    3200,
    4300,
    '<function>',
    'failc',
    { a: '<get/set>' },
    { b: '<get/set>' },
    { c: '<get/set>' },
    { d: '<get/set>' },
    '::',
    'b.set',
    12345,
  ],

 - 12: 
  [
    '$:',
    ['a.set', 12345],
    3200,
    4300,
    '<function>',
    'failb',
    { a: '<get/set>' },
    { b: '<get/set>' },
    { c: '<get/set>' },
    { d: '<get/set>' },
    '::',
    'a.set',
    12345,
  ],

 - 13: 
  [
    '$:',
    [12345],
    3200,
    4300,
    '<function>',
    'faila',
    { a: '<get/set>' },
    { b: '<get/set>' },
    { c: '<get/set>' },
    { d: '<get/set>' },
    '::',
    12345,
  ],

 - 14: 
  [
    '$:',
    [2100, 3200, 4300, '<function>', 'faila'],
    3200,
    4300,
    '<function>',
    'faila',
    { a: '<get/set>' },
    { b: '<get/set>' },
    { c: '<get/set>' },
    { d: '<get/set>' },
    '::',
    2100,
    3200,
    4300,
    '<function>',
    'faila',
  ],

 - 15: 
  [
    '$:',
    [{ a: '<get/set>' }, { b: '<get/set>' }, { c: '<get/set>' }, { d: '<get/set>' }],
    3200,
    4300,
    '<function>',
    'faila',
    { a: '<get/set>' },
    { b: '<get/set>' },
    { c: '<get/set>' },
    { d: '<get/set>' },
    '::',
    { a: '<get/set>' },
    { b: '<get/set>' },
    { c: '<get/set>' },
    { d: '<get/set>' },
  ],

 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
