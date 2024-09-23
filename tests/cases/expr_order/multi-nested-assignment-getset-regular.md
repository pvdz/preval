# Preval test case

# multi-nested-assignment-getset-regular.md

> Expr order > Multi-nested-assignment-getset-regular
>
> Check whether transform is correct even with multiple nesting levels. The runtime expects to call abcde in that order. Using getters and setters for maximal carnage.

This test needs to compare the call args of $ to confirm the same input/output.

It will test the order of calling an object, property, and rhs when assigning a complex value to a complex member expression with regular property.

## Input

`````js filename=intro
function $$(...a) { $(['$:', a, b, c, d, e, obja, objb, objc, objd, obje, '::', ...a], {depth: null}); return a[0]; }
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
$$(a().a = b().b = c().c = d().d = e())
$$(a, b, c, d, e);
$$(obja, objb, objc, objd, obje);
`````

## Pre Normal


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
let tmp = function (...$$0) {
  let a$1 = $$0;
  debugger;
  $([`\$:`, a$1, b, c, d, e, obja, objb, objc, objd, obje, `::`, ...a$1], { depth: null });
  return a$1[0];
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
tmp((a().a = b().b = c().c = d().d = e()));
tmp(a, b, c, d, e);
tmp(obja, objb, objc, objd, obje);
`````

## Normalized


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
let tmp = function (...$$0) {
  let a$1 = $$0;
  debugger;
  const tmpCallCallee = $;
  const tmpCalleeParam = [`\$:`, a$1, b, c, d, e, obja, objb, objc, objd, obje, `::`, ...a$1];
  const tmpCalleeParam$1 = { depth: null };
  tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
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
const tmpCallCallee$1 = tmp;
const varInitAssignLhsComputedObj = a();
const varInitAssignLhsComputedObj$1 = b();
const varInitAssignLhsComputedObj$3 = c();
const varInitAssignLhsComputedObj$5 = d();
const varInitAssignLhsComputedRhs$5 = e();
varInitAssignLhsComputedObj$5.d = varInitAssignLhsComputedRhs$5;
const varInitAssignLhsComputedRhs$3 = varInitAssignLhsComputedRhs$5;
varInitAssignLhsComputedObj$3.c = varInitAssignLhsComputedRhs$3;
const varInitAssignLhsComputedRhs$1 = varInitAssignLhsComputedRhs$3;
varInitAssignLhsComputedObj$1.b = varInitAssignLhsComputedRhs$1;
const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
varInitAssignLhsComputedObj.a = varInitAssignLhsComputedRhs;
const tmpCalleeParam$3 = varInitAssignLhsComputedRhs;
tmpCallCallee$1(tmpCalleeParam$3);
tmp(a, b, c, d, e);
tmp(obja, objb, objc, objd, obje);
`````

## Output


`````js filename=intro
const tmp /*:(unknown)=>*/ = function (...$$0) {
  const a$1 = $$0;
  debugger;
  const tmpCalleeParam /*:array*/ = [`\$:`, a$1, b, c, d, e, obja, objb, objc, objd, obje, `::`, ...a$1];
  const tmpCalleeParam$1 /*:object*/ = { depth: null };
  $(tmpCalleeParam, tmpCalleeParam$1);
  a$1[0];
  return undefined;
};
const obja /*:object*/ = {
  get a() {
    debugger;
    tmp(`a.get`);
    return 110;
  },
  set a($$0) {
    const x = $$0;
    debugger;
    tmp(`a.set`, x);
    return 1000;
  },
};
const objb /*:object*/ = {
  get b() {
    debugger;
    tmp(`b.get`);
    a = 210;
    return 100;
  },
  set b($$0) {
    const x$1 = $$0;
    debugger;
    tmp(`b.set`, x$1);
    a = 2100;
    return 2000;
  },
};
const objc /*:object*/ = {
  get c() {
    debugger;
    tmp(`c.get`);
    a = 310;
    b = 320;
    return 100;
  },
  set c($$0) {
    const x$3 = $$0;
    debugger;
    tmp(`c.set`, x$3);
    a = 3100;
    b = 3200;
    return 3000;
  },
};
const objd /*:object*/ = {
  get d() {
    debugger;
    tmp(`d.get`);
    a = 410;
    b = 420;
    c = 430;
    return 100;
  },
  set d($$0) {
    const x$5 = $$0;
    debugger;
    tmp(`d.set`, x$5);
    a = 4100;
    b = 4200;
    c = 4300;
    return 4000;
  },
};
const obje /*:object*/ = {
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
    const x$7 = $$0;
    debugger;
    tmp(`e.set`, x$7);
    a = 5100;
    b = 5200;
    c = 5300;
    d = 5400;
    return 5000;
  },
};
let a /*:()=>*/ = function () {
  debugger;
  tmp(`a`);
  return obja;
};
let b /*:()=>*/ = function () {
  debugger;
  tmp(`b`);
  a = 21;
  return objb;
};
let c /*:()=>*/ = function () {
  debugger;
  tmp(`c`);
  a = 31;
  b = 32;
  return objc;
};
let d /*:()=>*/ = function () {
  debugger;
  tmp(`d`);
  a = 41;
  b = 42;
  c = 43;
  return objd;
};
const e /*:()=>*/ = function () {
  debugger;
  tmp(`e`);
  a = 51;
  b = 52;
  c = 53;
  d = 54;
  return obje;
};
const varInitAssignLhsComputedObj = a();
const varInitAssignLhsComputedObj$1 = b();
const varInitAssignLhsComputedObj$3 = c();
const varInitAssignLhsComputedObj$5 = d();
e();
varInitAssignLhsComputedObj$5.d = obje;
varInitAssignLhsComputedObj$3.c = obje;
varInitAssignLhsComputedObj$1.b = obje;
varInitAssignLhsComputedObj.a = obje;
tmp(obje);
tmp(a, b, c, d, e);
tmp(obja, objb, objc, objd, obje);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = c;
  debugger;
  const d = [ "$:", b, e, f, g, h, i, j, k, l, m, "::", ...b ];
  const n = { depth: null };
  $( d, n );
  b[ 0 ];
  return undefined;
};
const i = {
  get a() {
    debugger;
    a( "a.get" );
    return 110;
  },
  set a( $$0 ) {
    const o = c;
    debugger;
    a( "a.set", o );
    return 1000;
  },
};
const j = {
  get b() {
    debugger;
    a( "b.get" );
    p = 210;
    return 100;
  },
  set b( $$0 ) {
    const q = c;
    debugger;
    a( "b.set", q );
    p = 2100;
    return 2000;
  },
};
const k = {
  get c() {
    debugger;
    a( "c.get" );
    p = 310;
    e = 320;
    return 100;
  },
  set c( $$0 ) {
    const r = c;
    debugger;
    a( "c.set", r );
    p = 3100;
    e = 3200;
    return 3000;
  },
};
const l = {
  get d() {
    debugger;
    a( "d.get" );
    p = 410;
    e = 420;
    f = 430;
    return 100;
  },
  set d( $$0 ) {
    const s = c;
    debugger;
    a( "d.set", s );
    p = 4100;
    e = 4200;
    f = 4300;
    return 4000;
  },
};
const m = {
  get e() {
    debugger;
    a( "e.get" );
    p = 510;
    e = 520;
    f = 530;
    g = 540;
    return 100;
  },
  set e( $$0 ) {
    const t = c;
    debugger;
    a( "e.set", t );
    p = 5100;
    e = 5200;
    f = 5300;
    g = 5400;
    return 5000;
  },
};
let p = function() {
  debugger;
  a( "a" );
  return i;
};
let e = function() {
  debugger;
  a( "b" );
  p = 21;
  return j;
};
let f = function() {
  debugger;
  a( "c" );
  p = 31;
  e = 32;
  return k;
};
let g = function() {
  debugger;
  a( "d" );
  p = 41;
  e = 42;
  f = 43;
  return l;
};
const h = function() {
  debugger;
  a( "e" );
  p = 51;
  e = 52;
  f = 53;
  g = 54;
  return m;
};
const u = p();
const v = e();
const w = f();
const x = g();
h();
x.d = m;
w.c = m;
v.b = m;
u.a = m;
a( m );
a( p, e, f, g, h );
a( i, j, k, l, m );
`````

## Globals

None

## Result

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
  { depth: 'null' },

 - 2: 
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
  { depth: 'null' },

 - 3: 
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
  { depth: 'null' },

 - 4: 
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
  { depth: 'null' },

 - 5: 
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
  { depth: 'null' },

 - 6: 
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
  { depth: 'null' },

 - 7: 
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
  { depth: 'null' },

 - 8: 
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
  { depth: 'null' },

 - 9: 
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
  { depth: 'null' },

 - 10: 
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
  { depth: 'null' },

 - 11: 
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
  { depth: 'null' },

 - 12: 
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
  { depth: 'null' },

 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
