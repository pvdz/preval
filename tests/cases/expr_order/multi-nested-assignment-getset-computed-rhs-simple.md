# Preval test case

# multi-nested-assignment-getset-computed-rhs-simple.md

> Expr order > Multi-nested-assignment-getset-computed-rhs-simple
>
> Check whether transform is correct even with multiple nesting levels. The runtime expects to call abcde in that order. Using getters and setters for maximal carnage.

This test needs to compare the call args of $ to confirm the same input/output.

It will test whether any step can affect the value of `e` before it is used as the value to update all the properties.

#TODO

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
let tmp = function (...$$0) {
  let a$1 = $$0;
  debugger;
  $(['$:', a$1, b, c, d, e, obja, objb, objc, objd, '::', ...a$1]);
  return a$1[0];
};
obja = {
  get a() {
    debugger;
    tmp('a.get');
    return 110;
  },
  set a($$0) {
    let x = $$0;
    debugger;
    tmp('a.set', x);
    e = 'faila';
    return 1000;
  },
};
objb = {
  get b() {
    debugger;
    tmp('b.get');
    a = 210;
    return 100;
  },
  set b($$0) {
    let x$1 = $$0;
    debugger;
    tmp('b.set', x$1);
    a = 2100;
    e = 'failb';
    return 2000;
  },
};
objc = {
  get c() {
    debugger;
    tmp('c.get');
    a = 310;
    b = 320;
    return 100;
  },
  set c($$0) {
    let x$3 = $$0;
    debugger;
    tmp('c.set', x$3);
    a = 3100;
    b = 3200;
    e = 'failc';
    return 3000;
  },
};
objd = {
  get d() {
    debugger;
    tmp('d.get');
    a = 410;
    b = 420;
    c = 430;
    return 100;
  },
  set d($$0) {
    let x$5 = $$0;
    debugger;
    tmp('d.set', x$5);
    a = 4100;
    b = 4200;
    c = 4300;
    e = 'faild';
    return 4000;
  },
};
a = function () {
  debugger;
  tmp('a');
  return obja;
};
b = function () {
  debugger;
  tmp('b');
  a = 21;
  return objb;
};
c = function () {
  debugger;
  tmp('c');
  a = 31;
  b = 32;
  return objc;
};
d = function () {
  debugger;
  tmp('d');
  a = 41;
  b = 42;
  c = 43;
  return objd;
};
e = 12345;
tmp((a()[tmp('a')] = b()[tmp('b')] = c()[tmp('c')] = d()[tmp('d')] = e));
tmp(a, b, c, d, e);
tmp(obja, objb, objc, objd);
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
let tmp = function (...$$0) {
  let a$1 = $$0;
  debugger;
  const tmpCallCallee = $;
  const tmpCalleeParam = ['$:', a$1, b, c, d, e, obja, objb, objc, objd, '::', ...a$1];
  tmpCallCallee(tmpCalleeParam);
  const tmpReturnArg = a$1[0];
  return tmpReturnArg;
};
obja = {
  get a() {
    debugger;
    tmp('a.get');
    return 110;
  },
  set a($$0) {
    let x = $$0;
    debugger;
    tmp('a.set', x);
    e = 'faila';
    return 1000;
  },
};
objb = {
  get b() {
    debugger;
    tmp('b.get');
    a = 210;
    return 100;
  },
  set b($$0) {
    let x$1 = $$0;
    debugger;
    tmp('b.set', x$1);
    a = 2100;
    e = 'failb';
    return 2000;
  },
};
objc = {
  get c() {
    debugger;
    tmp('c.get');
    a = 310;
    b = 320;
    return 100;
  },
  set c($$0) {
    let x$3 = $$0;
    debugger;
    tmp('c.set', x$3);
    a = 3100;
    b = 3200;
    e = 'failc';
    return 3000;
  },
};
objd = {
  get d() {
    debugger;
    tmp('d.get');
    a = 410;
    b = 420;
    c = 430;
    return 100;
  },
  set d($$0) {
    let x$5 = $$0;
    debugger;
    tmp('d.set', x$5);
    a = 4100;
    b = 4200;
    c = 4300;
    e = 'faild';
    return 4000;
  },
};
a = function () {
  debugger;
  tmp('a');
  return obja;
};
b = function () {
  debugger;
  tmp('b');
  a = 21;
  return objb;
};
c = function () {
  debugger;
  tmp('c');
  a = 31;
  b = 32;
  return objc;
};
d = function () {
  debugger;
  tmp('d');
  a = 41;
  b = 42;
  c = 43;
  return objd;
};
e = 12345;
const tmpCallCallee$1 = tmp;
const varInitAssignLhsComputedObj = a();
const varInitAssignLhsComputedProp = tmp('a');
const varInitAssignLhsComputedObj$1 = b();
const varInitAssignLhsComputedProp$1 = tmp('b');
const varInitAssignLhsComputedObj$3 = c();
const varInitAssignLhsComputedProp$3 = tmp('c');
const varInitAssignLhsComputedObj$5 = d();
const varInitAssignLhsComputedProp$5 = tmp('d');
const varInitAssignLhsComputedRhs$5 = e;
varInitAssignLhsComputedObj$5[varInitAssignLhsComputedProp$5] = varInitAssignLhsComputedRhs$5;
const varInitAssignLhsComputedRhs$3 = varInitAssignLhsComputedRhs$5;
varInitAssignLhsComputedObj$3[varInitAssignLhsComputedProp$3] = varInitAssignLhsComputedRhs$3;
const varInitAssignLhsComputedRhs$1 = varInitAssignLhsComputedRhs$3;
varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
const tmpCalleeParam$1 = varInitAssignLhsComputedRhs;
tmpCallCallee$1(tmpCalleeParam$1);
tmp(a, b, c, d, e);
tmp(obja, objb, objc, objd);
`````

## Output

`````js filename=intro
const tmp = function (...$$0) {
  const a$1 = $$0;
  debugger;
  const tmpCalleeParam = [
    '$:',
    a$1,
    tmpSSA_b,
    tmpSSA_c,
    tmpSSA_d,
    tmpSSA_e,
    tmpSSA_obja,
    tmpSSA_objb,
    tmpSSA_objc,
    tmpSSA_objd,
    '::',
    ...a$1,
  ];
  $(tmpCalleeParam);
  const tmpReturnArg = a$1[0];
  return tmpReturnArg;
};
const tmpSSA_obja = {
  get a() {
    debugger;
    tmp('a.get');
    return 110;
  },
  set a($$0) {
    const x = $$0;
    debugger;
    tmp('a.set', x);
    tmpSSA_e = 'faila';
    return 1000;
  },
};
const tmpSSA_objb = {
  get b() {
    debugger;
    tmp('b.get');
    tmpSSA_a = 210;
    return 100;
  },
  set b($$0) {
    const x$1 = $$0;
    debugger;
    tmp('b.set', x$1);
    tmpSSA_a = 2100;
    tmpSSA_e = 'failb';
    return 2000;
  },
};
const tmpSSA_objc = {
  get c() {
    debugger;
    tmp('c.get');
    tmpSSA_a = 310;
    tmpSSA_b = 320;
    return 100;
  },
  set c($$0) {
    const x$3 = $$0;
    debugger;
    tmp('c.set', x$3);
    tmpSSA_a = 3100;
    tmpSSA_b = 3200;
    tmpSSA_e = 'failc';
    return 3000;
  },
};
const tmpSSA_objd = {
  get d() {
    debugger;
    tmp('d.get');
    tmpSSA_a = 410;
    tmpSSA_b = 420;
    tmpSSA_c = 430;
    return 100;
  },
  set d($$0) {
    const x$5 = $$0;
    debugger;
    tmp('d.set', x$5);
    tmpSSA_a = 4100;
    tmpSSA_b = 4200;
    tmpSSA_c = 4300;
    tmpSSA_e = 'faild';
    return 4000;
  },
};
let tmpSSA_a = function () {
  debugger;
  tmp('a');
  return tmpSSA_obja;
};
let tmpSSA_b = function () {
  debugger;
  tmp('b');
  tmpSSA_a = 21;
  return tmpSSA_objb;
};
let tmpSSA_c = function () {
  debugger;
  tmp('c');
  tmpSSA_a = 31;
  tmpSSA_b = 32;
  return tmpSSA_objc;
};
const tmpSSA_d = function () {
  debugger;
  tmp('d');
  tmpSSA_a = 41;
  tmpSSA_b = 42;
  tmpSSA_c = 43;
  return tmpSSA_objd;
};
let tmpSSA_e = 12345;
const varInitAssignLhsComputedObj = tmpSSA_a();
const varInitAssignLhsComputedProp = tmp('a');
const varInitAssignLhsComputedObj$1 = tmpSSA_b();
const varInitAssignLhsComputedProp$1 = tmp('b');
const varInitAssignLhsComputedObj$3 = tmpSSA_c();
const varInitAssignLhsComputedProp$3 = tmp('c');
const varInitAssignLhsComputedObj$5 = tmpSSA_d();
const varInitAssignLhsComputedProp$5 = tmp('d');
const varInitAssignLhsComputedRhs$5 = tmpSSA_e;
varInitAssignLhsComputedObj$5[varInitAssignLhsComputedProp$5] = varInitAssignLhsComputedRhs$5;
varInitAssignLhsComputedObj$3[varInitAssignLhsComputedProp$3] = varInitAssignLhsComputedRhs$5;
varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$5;
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs$5;
tmp(varInitAssignLhsComputedRhs$5);
tmp(tmpSSA_a, tmpSSA_b, tmpSSA_c, tmpSSA_d, tmpSSA_e);
tmp(tmpSSA_obja, tmpSSA_objb, tmpSSA_objc, tmpSSA_objd);
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

Final output calls: Same
