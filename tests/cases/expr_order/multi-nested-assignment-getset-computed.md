# Preval test case

# multi-nested-assignment-getset.md

> expr_order > multi-nested-assignment-getset
>
> Check whether transform is correct even with multiple nesting levels. The runtime expects to call abcde in that order. Using getters and setters for maximal carnage.

This test needs to compare the call args of $ to confirm the same input/output.

It will test the order of calling an object, property, and rhs when assigning a complex value to a complex member expression with computed property.

#TODO

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

## Normalized

`````js filename=intro
function $$(...a_1) {
  const tmpCallCallee = $;
  const tmpCalleeParam = ['$:', a_1, b, c, d, e, obja, objb, objc, objd, obje, '::', ...a_1];
  tmpCallCallee(tmpCalleeParam);
  const tmpReturnArg = a_1[0];
  return tmpReturnArg;
}
var a;
var b;
var c;
var d;
var e;
var obja;
var objb;
var objc;
var objd;
var obje;
obja = {
  get a() {
    $$('a.get');
    return 110;
  },
  set a(x) {
    $$('a.set', x);
    return 1000;
  },
};
objb = {
  get b() {
    $$('b.get');
    a = 210;
    return 100;
  },
  set b(x_1) {
    $$('b.set', x_1);
    a = 2100;
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
  set c(x_2) {
    $$('c.set', x_2);
    a = 3100;
    b = 3200;
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
  set d(x_3) {
    $$('d.set', x_3);
    a = 4100;
    b = 4200;
    c = 4300;
    return 4000;
  },
};
obje = {
  get e() {
    $$('e.get');
    a = 510;
    b = 520;
    c = 530;
    d = 540;
    return 100;
  },
  set e(x_4) {
    $$('e.set', x_4);
    a = 5100;
    b = 5200;
    c = 5300;
    d = 5400;
    return 5000;
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
e = function () {
  $$('e');
  a = 51;
  b = 52;
  c = 53;
  d = 54;
  return obje;
};
const tmpCallCallee$1 = $$;
const varInitAssignLhsComputedObj = a();
const varInitAssignLhsComputedProp = $$('a');
const varInitAssignLhsComputedObj$1 = b();
const varInitAssignLhsComputedProp$1 = $$('b');
const varInitAssignLhsComputedObj$2 = c();
const varInitAssignLhsComputedProp$2 = $$('c');
const varInitAssignLhsComputedObj$3 = d();
const varInitAssignLhsComputedProp$3 = $$('d');
const varInitAssignLhsComputedRhs$3 = e();
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
$$(obja, objb, objc, objd, obje);
`````

## Output

`````js filename=intro
function $$(...a_1) {
  const tmpCalleeParam = ['$:', a_1, b, c, d, e, obja, objb, objc, objd, obje, '::', ...a_1];
  $(tmpCalleeParam);
  const tmpReturnArg = a_1[0];
  return tmpReturnArg;
}
var a;
var b;
var c;
var d;
var e;
var obja;
var objb;
var objc;
var objd;
var obje;
obja = {
  get a() {
    $$('a.get');
    return 110;
  },
  set a(x) {
    $$('a.set', x);
    return 1000;
  },
};
objb = {
  get b() {
    $$('b.get');
    a = 210;
    return 100;
  },
  set b(x_1) {
    $$('b.set', x_1);
    a = 2100;
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
  set c(x_2) {
    $$('c.set', x_2);
    a = 3100;
    b = 3200;
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
  set d(x_3) {
    $$('d.set', x_3);
    a = 4100;
    b = 4200;
    c = 4300;
    return 4000;
  },
};
obje = {
  get e() {
    $$('e.get');
    a = 510;
    b = 520;
    c = 530;
    d = 540;
    return 100;
  },
  set e(x_4) {
    $$('e.set', x_4);
    a = 5100;
    b = 5200;
    c = 5300;
    d = 5400;
    return 5000;
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
e = function () {
  $$('e');
  a = 51;
  b = 52;
  c = 53;
  d = 54;
  return obje;
};
const varInitAssignLhsComputedObj = a();
const varInitAssignLhsComputedProp = $$('a');
const varInitAssignLhsComputedObj$1 = b();
const varInitAssignLhsComputedProp$1 = $$('b');
const varInitAssignLhsComputedObj$2 = c();
const varInitAssignLhsComputedProp$2 = $$('c');
const varInitAssignLhsComputedObj$3 = d();
const varInitAssignLhsComputedProp$3 = $$('d');
const varInitAssignLhsComputedRhs$3 = e();
varInitAssignLhsComputedObj$3[varInitAssignLhsComputedProp$3] = varInitAssignLhsComputedRhs$3;
varInitAssignLhsComputedObj$2[varInitAssignLhsComputedProp$2] = varInitAssignLhsComputedRhs$3;
varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$3;
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs$3;
$$(varInitAssignLhsComputedRhs$3);
$$(a, b, c, d, e);
$$(obja, objb, objc, objd, obje);
`````

## Result

Should call `$` with:
 - 1: 
  [
    '$:',
    ['a'],
    'function',
    'function',
    'function',
    'function',
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
    'function',
    'function',
    'function',
    'function',
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
    'function',
    'function',
    'function',
    'function',
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
    'function',
    'function',
    'function',
    'function',
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
    'function',
    'function',
    'function',
    'function',
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
    'function',
    'function',
    'function',
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
    'function',
    'function',
    'function',
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
    'function',
    'function',
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
    'function',
    'function',
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
    'function',
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
    'function',
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
    'function',
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
    'function',
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
    'function',
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
    [2100, 3200, 4300, 54, 'function'],
    3200,
    4300,
    54,
    'function',
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
    'function',
  ],

 - 16: 
  [
    '$:',
    [{ a: '<get/set>' }, { b: '<get/set>' }, { c: '<get/set>' }, { d: '<get/set>' }, { e: '<get/set>' }],
    3200,
    4300,
    54,
    'function',
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

Normalized calls: Same

Final output calls: Same
