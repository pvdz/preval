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
function $$(...a) {
  const tmpCallCallee = $;
  const tmpCalleeParam = ['$:', a, b, c, d, e, obja, objb, objc, objd, obje, '::', ...a];
  tmpCallCallee(tmpCalleeParam);
  const tmpReturnArg = a[0];
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
  set b(x) {
    $$('b.set', x);
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
  set c(x) {
    $$('c.set', x);
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
  set d(x) {
    $$('d.set', x);
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
  set e(x) {
    $$('e.set', x);
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
let tmpCalleeParam$1;
const tmpNestedAssignComMemberObj = a();
const tmpNestedAssignComMemberProp = $$('a');
let tmpNestedAssignPropRhs;
const tmpNestedAssignComMemberObj$1 = b();
const tmpNestedAssignComMemberProp$1 = $$('b');
let tmpNestedAssignPropRhs$1;
const tmpNestedAssignComMemberObj$2 = c();
const tmpNestedAssignComMemberProp$2 = $$('c');
let tmpNestedAssignPropRhs$2;
const tmpNestedAssignComMemberObj$3 = d();
const tmpNestedAssignComMemberProp$3 = $$('d');
let tmpNestedAssignPropRhs$3 = e();
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs$3;
tmpNestedAssignComMemberObj$3[tmpNestedAssignComMemberProp$3] = tmpNestedPropAssignRhs;
tmpNestedAssignPropRhs$2 = tmpNestedPropAssignRhs;
const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs$2;
tmpNestedAssignComMemberObj$2[tmpNestedAssignComMemberProp$2] = tmpNestedPropAssignRhs$1;
tmpNestedAssignPropRhs$1 = tmpNestedPropAssignRhs$1;
const tmpNestedPropAssignRhs$2 = tmpNestedAssignPropRhs$1;
tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = tmpNestedPropAssignRhs$2;
tmpNestedAssignPropRhs = tmpNestedPropAssignRhs$2;
const tmpNestedPropAssignRhs$3 = tmpNestedAssignPropRhs;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs$3;
tmpCalleeParam$1 = tmpNestedPropAssignRhs$3;
tmpCallCallee$1(tmpCalleeParam$1);
$$(a, b, c, d, e);
$$(obja, objb, objc, objd, obje);
`````

## Output

`````js filename=intro
function $$(...a) {
  const tmpCallCallee = $;
  const tmpCalleeParam = ['$:', a, b, c, d, e, obja, objb, objc, objd, obje, '::', ...a];
  tmpCallCallee(tmpCalleeParam);
  const tmpReturnArg = a[0];
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
  set b(x) {
    $$('b.set', x);
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
  set c(x) {
    $$('c.set', x);
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
  set d(x) {
    $$('d.set', x);
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
  set e(x) {
    $$('e.set', x);
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
let tmpCalleeParam$1;
const tmpNestedAssignComMemberObj = a();
const tmpNestedAssignComMemberProp = $$('a');
let tmpNestedAssignPropRhs;
const tmpNestedAssignComMemberObj$1 = b();
const tmpNestedAssignComMemberProp$1 = $$('b');
let tmpNestedAssignPropRhs$1;
const tmpNestedAssignComMemberObj$2 = c();
const tmpNestedAssignComMemberProp$2 = $$('c');
let tmpNestedAssignPropRhs$2;
const tmpNestedAssignComMemberObj$3 = d();
const tmpNestedAssignComMemberProp$3 = $$('d');
let tmpNestedAssignPropRhs$3 = e();
const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs$3;
tmpNestedAssignComMemberObj$3[tmpNestedAssignComMemberProp$3] = tmpNestedPropAssignRhs;
tmpNestedAssignPropRhs$2 = tmpNestedPropAssignRhs;
const tmpNestedPropAssignRhs$1 = tmpNestedAssignPropRhs$2;
tmpNestedAssignComMemberObj$2[tmpNestedAssignComMemberProp$2] = tmpNestedPropAssignRhs$1;
tmpNestedAssignPropRhs$1 = tmpNestedPropAssignRhs$1;
const tmpNestedPropAssignRhs$2 = tmpNestedAssignPropRhs$1;
tmpNestedAssignComMemberObj$1[tmpNestedAssignComMemberProp$1] = tmpNestedPropAssignRhs$2;
tmpNestedAssignPropRhs = tmpNestedPropAssignRhs$2;
const tmpNestedPropAssignRhs$3 = tmpNestedAssignPropRhs;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs$3;
tmpCalleeParam$1 = tmpNestedPropAssignRhs$3;
tmpCallCallee$1(tmpCalleeParam$1);
$$(a, b, c, d, e);
$$(obja, objb, objc, objd, obje);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
