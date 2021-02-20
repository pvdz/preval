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

## Normalized

`````js filename=intro
var a;
var b;
var c;
var d;
var e;
var obja;
var objb;
var objc;
var objd;
function $$(...a$1) {
  const tmpCallCallee = $;
  const tmpCalleeParam = ['$:', a$1, b, c, d, e, obja, objb, objc, objd, '::', ...a$1];
  tmpCallCallee(tmpCalleeParam);
  const tmpReturnArg = a$1[0];
  return tmpReturnArg;
}
obja = {
  get a() {
    $$('a.get');
    return 110;
  },
  set a(x) {
    $$('a.set', x);
    e = 'faila';
    return 1000;
  },
};
objb = {
  get b() {
    $$('b.get');
    a = 210;
    return 100;
  },
  set b(x$1) {
    $$('b.set', x$1);
    a = 2100;
    e = 'failb';
    return 2000;
  },
};
objc = {
  get c() {
    $$('c.get');
    a = 310;
    b = 320;
    return 100;
  },
  set c(x$2) {
    $$('c.set', x$2);
    a = 3100;
    b = 3200;
    e = 'failc';
    return 3000;
  },
};
objd = {
  get d() {
    $$('d.get');
    a = 410;
    b = 420;
    c = 430;
    return 100;
  },
  set d(x$3) {
    $$('d.set', x$3);
    a = 4100;
    b = 4200;
    c = 4300;
    e = 'faild';
    return 4000;
  },
};
a = function () {
  $$('a');
  return obja;
};
b = function () {
  $$('b');
  a = 21;
  return objb;
};
c = function () {
  $$('c');
  a = 31;
  b = 32;
  return objc;
};
d = function () {
  $$('d');
  a = 41;
  b = 42;
  c = 43;
  return objd;
};
e = 12345;
const tmpCallCallee$1 = $$;
const varInitAssignLhsComputedObj = a();
const varInitAssignLhsComputedProp = $$('a');
const varInitAssignLhsComputedObj$1 = b();
const varInitAssignLhsComputedProp$1 = $$('b');
const varInitAssignLhsComputedObj$2 = c();
const varInitAssignLhsComputedProp$2 = $$('c');
const varInitAssignLhsComputedObj$3 = d();
const varInitAssignLhsComputedProp$3 = $$('d');
const varInitAssignLhsComputedRhs$3 = e;
varInitAssignLhsComputedObj$3[varInitAssignLhsComputedProp$3] = varInitAssignLhsComputedRhs$3;
const varInitAssignLhsComputedRhs$2 = varInitAssignLhsComputedRhs$3;
varInitAssignLhsComputedObj$2[varInitAssignLhsComputedProp$2] = varInitAssignLhsComputedRhs$2;
const varInitAssignLhsComputedRhs$1 = varInitAssignLhsComputedRhs$2;
varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
const tmpCalleeParam$1 = varInitAssignLhsComputedRhs;
tmpCallCallee$1(tmpCalleeParam$1);
$$(a, b, c, d, e);
$$(obja, objb, objc, objd);
`````

## Output

`````js filename=intro
var a;
var b;
var c;
var d;
var e;
var obja;
var objb;
var objc;
var objd;
function $$(...a$1) {
  const tmpCalleeParam = ['$:', a$1, b, c, d, e, obja, objb, objc, objd, '::', ...a$1];
  $(tmpCalleeParam);
  const tmpReturnArg = a$1[0];
  return tmpReturnArg;
}
obja = {
  get a() {
    $$('a.get');
    return 110;
  },
  set a(x) {
    $$('a.set', x);
    e = 'faila';
    return 1000;
  },
};
objb = {
  get b() {
    $$('b.get');
    a = 210;
    return 100;
  },
  set b(x$1) {
    $$('b.set', x$1);
    a = 2100;
    e = 'failb';
    return 2000;
  },
};
objc = {
  get c() {
    $$('c.get');
    a = 310;
    b = 320;
    return 100;
  },
  set c(x$2) {
    $$('c.set', x$2);
    a = 3100;
    b = 3200;
    e = 'failc';
    return 3000;
  },
};
objd = {
  get d() {
    $$('d.get');
    a = 410;
    b = 420;
    c = 430;
    return 100;
  },
  set d(x$3) {
    $$('d.set', x$3);
    a = 4100;
    b = 4200;
    c = 4300;
    e = 'faild';
    return 4000;
  },
};
a = function () {
  $$('a');
  return obja;
};
b = function () {
  $$('b');
  a = 21;
  return objb;
};
c = function () {
  $$('c');
  a = 31;
  b = 32;
  return objc;
};
d = function () {
  $$('d');
  a = 41;
  b = 42;
  c = 43;
  return objd;
};
e = 12345;
const varInitAssignLhsComputedObj = a();
const varInitAssignLhsComputedProp = $$('a');
const varInitAssignLhsComputedObj$1 = b();
const varInitAssignLhsComputedProp$1 = $$('b');
const varInitAssignLhsComputedObj$2 = c();
const varInitAssignLhsComputedProp$2 = $$('c');
const varInitAssignLhsComputedObj$3 = d();
const varInitAssignLhsComputedProp$3 = $$('d');
const varInitAssignLhsComputedRhs$3 = e;
varInitAssignLhsComputedObj$3[varInitAssignLhsComputedProp$3] = varInitAssignLhsComputedRhs$3;
varInitAssignLhsComputedObj$2[varInitAssignLhsComputedProp$2] = varInitAssignLhsComputedRhs$3;
varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$3;
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs$3;
$$(varInitAssignLhsComputedRhs$3);
$$(a, b, c, d, e);
$$(obja, objb, objc, objd);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
  [
    '$:',
    ['a'],
    'function',
    'function',
    'function',
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
    'function',
    'function',
    'function',
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
    'function',
    'function',
    'function',
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
    'function',
    'function',
    'function',
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
    'function',
    'function',
    'function',
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
    'function',
    'function',
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
    'function',
    'function',
    12345,
    { a: '<get/set>' },
    { b: '<get/set>' },
    { c: '<get/set>' },
    { d: '<get/set>' },
    '::',
    'd',
  ],

 - 8: ['$:', ['d'], 42, 43, 'function', 12345, { a: '<get/set>' }, { b: '<get/set>' }, { c: '<get/set>' }, { d: '<get/set>' }, '::', 'd']
 - 9: 
  [
    '$:',
    ['d.set', 12345],
    42,
    43,
    'function',
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
    'function',
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
    'function',
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
    'function',
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
    'function',
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
    [2100, 3200, 4300, 'function', 'faila'],
    3200,
    4300,
    'function',
    'faila',
    { a: '<get/set>' },
    { b: '<get/set>' },
    { c: '<get/set>' },
    { d: '<get/set>' },
    '::',
    2100,
    3200,
    4300,
    'function',
    'faila',
  ],

 - 15: 
  [
    '$:',
    [{ a: '<get/set>' }, { b: '<get/set>' }, { c: '<get/set>' }, { d: '<get/set>' }],
    3200,
    4300,
    'function',
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

Normalized calls: Same

Final output calls: Same
